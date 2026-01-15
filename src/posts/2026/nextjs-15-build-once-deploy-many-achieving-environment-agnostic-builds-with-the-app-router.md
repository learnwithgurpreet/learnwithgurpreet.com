---
title: "Next.js 15 Build Once, Deploy Many: Achieving Environment-Agnostic Builds with the App Router"
# eleventyExcludeFromCollections: true
date: '2026-01-15'
description: Master Next.js 15 App Router deployments. Discover how to avoid NEXT_PUBLIC_ variables, implement runtime config, and purge SSG pages on Azure Web Apps for a faster, more reliable CI/CD pipeline
tags:
  - 'Tech'
  - 'NextJS'
---

<iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="allowfullscreen" height="315" src="https://www.youtube-nocookie.com/embed/V9nu-bOwkrE" title="Next.js 15 Build Once, Deploy Many: Achieving Environment-Agnostic Builds with the App Router" width="100%" style="border: 0;"></iframe>

In enterprise software engineering, the "Build Once, Deploy Many" philosophy is the gold standard for reliability. The goal is simple: compile your code into a single artifact and move that identical bundle through your testing environments (DEV, SIT) all the way to Production.

In many Next.js setups, developers rebuild the app for every environment to inject different API keys. This is a mistake. It wastes time and introduces the risk that the code you tested in SIT isn't exactly the code you shipped to PROD.

With Next.js 15 and the App Router, we can break this cycle.

## Strategic Use Case: Market-Specific Scaling

This architecture is particularly powerful for organizations operating across multiple regions or brands.

**The Scenario**: You have a single codebase for a Next.js application that must serve different markets (e.g., UK, USA, and Germany). Each market has its own Azure Web App instance, unique API endpoints, different currency formatting, and localized feature flags.

**The Solution**: Instead of running three separate builds, which would result in three different versions of the truth, you build the application **one time**. You then deploy that same universal artifact to three separate Azure Web Apps. The unique "Market Behavior" is injected via **Azure App Settings** at runtime.

```text
[ Universal Build Artifact ]
           |
           +-----> [ Azure Web App: UK ]  --> Config: GBP, UK-API, Metric
           |
           +-----> [ Azure Web App: USA ] --> Config: USD, US-API, Imperial
           |
           +-----> [ Azure Web App: GER ] --> Config: EUR, DE-API, Metric
```

## Project Architecture and Infrastructure

To manage a "Build Once" workflow effectively, your architecture needs to be modular and your infrastructure needs to support runtime configuration.

### The Foundation: Turborepo

Using Turborepo allows you to manage your Next.js application alongside shared UI libraries and utility packages. It ensures that your builds are fast, but more importantly, it helps you package your application as a standalone workspace that is ready for deployment.

### Infrastructure: Azure Web Apps

For this strategy, we use **Azure Web Apps**. Azure allows us to set "Application Settings" (environment variables) that are injected into the Node.js process at runtime. This is the "hook" we use to change behavior without changing the code.

### Deployment Strategy: The Promotion Pipeline

Instead of building in every stage, we use a linear promotion strategy:

1. **Build**: Create a universal artifact (Docker image or `.next` folder).
2. **Deploy to DEV**: Inject DEV environment variables.
3. **Promote to SIT**: Use the same artifact, but inject SIT variables.
4. **Promote to PROD**: Use the same artifact, but inject PROD variables.

```text
[ Code Push ]
      |
[ CI Build Stage ] -> (Generates 1 Agnostic Artifact)
      |
      +-----> [ Deploy to Azure DEV ] -> (Inject DEV Config)
      |              |
      |       [ QA Approval ]
      |              |
      +-----> [ Promote to Azure SIT ] -> (Inject SIT Config)
      |              |
      |     [ Business Sign-off ]
      |              |
      +-----> [ Promote to Azure PROD ] -> (Inject PROD Config)
```

## How to Avoid `NEXT_PUBLIC_` for Agnostic Builds

The biggest technical hurdle is the `NEXT_PUBLIC_` prefix. Next.js inlines these values during the build process. If you use `NEXT_PUBLIC_API_URL`, that URL is hardcoded into your JavaScript files. You can't change it without rebuilding.

### The SSR-First Approach (Recommended)

In Next.js 15, the most efficient way to handle environment-agnostic URLs is to render them on the server. Since Server Components run on the Node.js runtime, they have direct access to `process.env` at the moment the request happens.

By using SSR, your environment variables are read from the Azure App Service settings at runtime, ensuring the client receives the correct URL without any extra network requests.

```ts
// app/components/ClientRequester.tsx
export default function Page() {
  // This value is read on the server at request time.
  // It is NOT inlined during the build.
  const apiUrl = process.env.API_BASE_URL;

  return (
    <main>
      <h1>Data Dashboard</h1>
      <DataList endpoint={apiUrl} />
    </main>
  );
}
```

## Fallback: The Client-Side Configuration Provider

While SSR is preferred for initial data fetching, you might still need configuration available deep inside interactive Client Components (like a chat widget or analytics script). In these cases, you can use a **Context Provider** to pass server-side values down to the client.

```ts
// components/ConfigProvider.tsx
'use client';

import React, { createContext, useContext } from 'react';

const ConfigContext = createContext({ apiBaseUrl: '' });

export function ConfigProvider({ children, config }) {
  // 'config' is passed from a Server Component to this Client Component
  return (
    <ConfigContext.Provider value={config}>
      {children}
    </ConfigContext.Provider>
  );
}

export const useAppConfig = () => useContext(ConfigContext);
```

You wrap your application in the `layout.tsx`, passing the variables from the server:

```ts
// app/layout.tsx (Server Component)
export default function RootLayout({ children }) {
  const runtimeConfig = {
    apiBaseUrl: process.env.API_BASE_URL,
    analyticsId: process.env.ANALYTICS_ID
  };

  return (
    <html>
      <body>
        <ConfigProvider config={runtimeConfig}>
          {children}
        </ConfigProvider>
      </body>
    </html>
  );
}
```

## Purging SSG Pages After Deployment

Next.js 15 uses Static Site Generation (SSG) to pre-render pages. However, if your SIT environment has different data than PROD, your static pages might show "stale" information after deployment.

To fix this, we use **On-Demand Revalidation**. Your deployment pipeline should trigger a "purge" as its final step to force Next.js to regenerate pages using the new environment's data.

```ts
// app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');

  if (secret !== process.env.REVALIDATION_TOKEN) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  // Force a purge of the entire site cache
  revalidatePath('/', 'layout');
  return NextResponse.json({ revalidated: true });
}
```

## Infrastructure Cost Factors

By shifting to this model, the financial profile of your project changes. While there are slight increases in some areas, the overall ROI is significantly positive.

### CI/CD Compute Savings (Major Decrease)

In a multi-market setup, if you have 10 markets and 3 environments (DEV/SIT/PROD), a traditional model would require **30 separate builds**. With this approach, you run 1 build and 30 simple "copy-paste" deployments. This reduces your CI/CD runner bill (GitHub Actions/Azure DevOps) by up to 90%.

### Market Launch Velocity (Operational Savings)

The cost of "Time to Market" is reduced. Launching in a new country no longer requires a new CI/CD pipeline configuration or a new build process. You simply spin up a new Azure Web App, point it to the existing artifact, and set the App Settings.

### Storage and Registry (Slight Increase)

You will store a single, slightly larger "Standalone" artifact in a registry (like Azure Container Registry or GitHub Packages). However, storing one universal image is often cheaper than storing dozens of environment-specific images that share 99% of the same code.

### Developer Productivity (Hidden Savings)

The "Cost of Debugging" drops. When a bug is reported in the German market but not the UK market, you know with 100% certainty that the code is identical. This allows your team to focus strictly on configuration or data issues, cutting down investigation time.

## Outcomes

- **Market Agnostic Core**: Your core logic remains clean and independent of regional logic.

- **Bit-for-Bit Consistency**: Guaranteed parity across every market and every environment.

- **Rapid Global Rollouts**: Deploy updates to all global markets simultaneously using the same verified artifact.

- **Significant Reduction in CI/CD Spend**: Minimized compute hours for build agents.

## Trade-offs and Risks

| Risk | Mitigation |
| :--- | :--- |
| **Server Load** | Reading from `process.env` is extremely fast in Node.js, but ensure your layout doesn't perform heavy computation on every request. Leverage Next.js caching for data-heavy components. |
| **Security Risk** | Ensure that only "Public-safe" keys (like API URLs or Analytics IDs) are passed to the `ConfigProvider`. Never include sensitive secrets like Database passwords or Private API keys. |
| **Complexity** | Requires a one-time setup of the `ConfigProvider` and the implementation of a secure Revalidation webhook in your CI/CD pipeline. |
| **Waterfall Effect** | If using the client-side fetch fallback, the UI may show a loading state. Using the SSR-first approach mitigates this by injecting the config directly into the initial HTML. |

## Conclusion

Building once and deploying many is more than just a convenience; it is a professional standard that ensures your Next.js 15 applications are robust and predictable. By decoupling your configuration from your build process and prioritizing SSR for environment variables, you create a pipeline that is fast, safe, and truly environment-agnostic.

## Internal Reference

Ready to automate this global rollout? Read my follow-up guide: ["Automating Next.js 15 Deployments: A Build Once, Deploy Many GitHub Actions Guide"](/posts/automating-nextjs-15-deployments-a-build-once-deploy-many-github-actions-guide/) to see how to build the pipeline that handles this multi-market promotion.