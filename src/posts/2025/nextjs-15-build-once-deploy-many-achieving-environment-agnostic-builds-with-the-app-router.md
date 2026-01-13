---
title: "Next.js 15 Build Once, Deploy Many: Achieving Environment-Agnostic Builds with the App Router"
eleventyExcludeFromCollections: true
date: '2026-01-13'
description: Master Next.js 15 App Router deployments. Discover how to avoid NEXT_PUBLIC_ variables, implement runtime config, and purge SSG pages on Azure Web Apps for a faster, more reliable CI/CD pipeline
tags:
  - 'Tech'
  - 'NextJS'
---
In enterprise software engineering, the "Build Once, Deploy Many" philosophy is the gold standard for reliability. The goal is simple: compile your code into a single artifact and move that identical bundle through your testing environments (DEV, SIT) all the way to Production.

In many Next.js setups, developers rebuild the app for every environment to inject different API keys. This is a mistake. It wastes time and introduces the risk that the code you tested in SIT isn't exactly the code you shipped to PROD.

With Next.js 15 and the App Router, we can break this cycle.

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

Moving to a build-once model significantly alters your infrastructure bill, generally leading to a **net reduction in costs**.

1. **CI/CD Compute Savings (Decrease)**: By eliminating redundant builds for SIT and PROD, you drastically reduce the minutes spent on CI/CD runners (like GitHub Actions or Azure DevOps Agents). For large Next.js apps, a build can take 10 minutes. Removing two builds per deployment saves 20 minutes of compute time every single time you push code.

2. **Storage Costs (Slight Increase)**: You will need to store the build artifacts (zip files or Docker images) in a registry or blob storage to facilitate promotion. While this adds a small storage cost, it is usually negligible compared to compute savings.

3. **Server-Side Resource Usage (Neutral to Slight Increase)**: Because we are reading environment variables at runtime via SSR rather than using static inlined strings, there is a micro-cost in CPU cycles on the Azure Web App. However, since `process.env` access in Node.js is extremely fast, this rarely requires a higher App Service Plan tier.

## Outcomes

- **Bit-for-Bit Consistency**: The exact code tested in SIT is what goes to PROD.

- **Rapid Rollbacks**: Since artifacts are versioned and agnostic, rolling back is as simple as re-deploying a previous "known good" artifact.

- **Zero Client Waterfall**: By using SSR for your URLs, the browser doesn't need to make an extra API call just to figure out where the main API is.

## Trade-offs and Risks

| Risk | Mitigation |
| :--- | :--- |
| **Server Load** | Reading from `process.env` is extremely fast in Node.js, but ensure your layout doesn't perform heavy computation on every request. Leverage Next.js caching for data-heavy components. |
| **Security Risk** | Ensure that only "Public-safe" keys (like API URLs or Analytics IDs) are passed to the `ConfigProvider`. Never include sensitive secrets like Database passwords or Private API keys. |
| **Complexity** | Requires a one-time setup of the `ConfigProvider` and the implementation of a secure Revalidation webhook in your CI/CD pipeline. |
| **Waterfall Effect** | If using the client-side fetch fallback, the UI may show a loading state. Using the SSR-first approach mitigates this by injecting the config directly into the initial HTML. |

## Conclusion

Building once and deploying many is more than just a convenience; it is a professional standard that ensures your Next.js 15 applications are robust and predictable. By decoupling your configuration from your build process and prioritizing SSR for environment variables, you create a pipeline that is fast, safe, and truly environment-agnostic.

## Next Steps: Automating the Pipeline

Now that you understand the architecture required for environment-agnostic builds, the next step is implementation. 

Read my follow-up guide: **["Automating Next.js 15 Deployments: A Build Once, Deploy Many GitHub Actions Guide"](/posts/automating-nextjs-15-deployments-a-build-once-deploy-many-github-actions-guide/)** to learn how to configure GitHub Actions and Azure to move your artifacts through DEV, SIT, and PROD seamlessly.