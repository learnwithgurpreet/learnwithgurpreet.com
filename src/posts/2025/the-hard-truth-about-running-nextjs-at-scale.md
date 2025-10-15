---
title: The Hard Truth About Running Next.js at Scale
date: '2025-10-10'
eleventyExcludeFromCollections: false
description: Next.js has quickly become one of the most dominant frameworks for frontend fullstack development. It's great for shipping MVPs fast, but here's the big question, is it equally good for production-grade applications? Let's break it down and talk about the trade-offs you might face when using the Next.js stack.
tags:
  - 'Tech'
---

Next.js has quickly become one of the most dominant frameworks for frontend fullstack development. It's great for shipping MVPs fast, but here's the big question: is it equally good for production-grade applications? Let's break it down and talk about the trade-offs you might face when using the Next.js stack.

> Quick note: this write-up is based on my recent project experience, not ChatGPT or any AI-generated content 😉

## The "Vercel Way"

As you probably know, Next.js is developed and maintained by [Vercel](https://vercel.com/). That means there are areas where Next.js nudges you toward doing things *the Vercel way*. If you don't, well, be ready to spend some time searching (or asking your favorite AI assistant).

Vercel shines when it comes to build performance and caching. It helps you ship projects blazingly fast, with build times that are hard for most competitors to match. But this convenience has a price tag. Hosting large-scale enterprise apps on Vercel can be expensive.

## My Experience

We're building an enterprise application and chose Next.js as our framework. The infrastructure runs on Azure Web Apps. The first deployment taught us an important lesson: Next.js needs to be switched to a **standalone output** build when you're not hosting on Vercel.

Yes, there's a configuration in `next.config.js` that allows you to generate a standalone build instead of the default one tailored for Vercel/Netlify. Once we enabled that, things worked as expected.

Coming from a Java or backend-heavy background, you're probably familiar with the idea of *build once, deploy everywhere*. With Next.js (or React), it works differently.

After scouring forums, I noticed many developers struggling to build Next.js apps outside Vercel. Each environment (DEV/STAGE/PROD) typically requires a rebuild. It's doable, but not exactly the advertised or preferred path.

Still, I decided to give it a shot. Here's what we did:

- Renamed all public environment variables starting with `NEXT_PUBLIC_` to `PUBLIC_` because Next.js inlines `NEXT_PUBLIC_` variables at build time, which makes them static. For example: `process.env.NEXT_PUBLIC_KEY` gets replaced with a fixed value during build.
- Split our env. variables into two categories:
  1. **Public** (`PUBLIC_`)
  2. **Secret** (`SECRET_`)

Now, how do you access `PUBLIC_` variables on the client side?

We solved it by creating an API endpoint that fetches these variables at runtime:

```ts
"use server";

import { NextResponse } from "next/server";

// Example usage: /api/env?key=PUBLIC_API_URL
// Note: Only PUBLIC_ variables are exposed on the client

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");

  if (!key) {
    return NextResponse.json({ error: "Missing query param: key" }, { status: 400 });
  }

  if (!key.startsWith("PUBLIC_")) {
    return NextResponse.json({ error: "Only PUBLIC_ variables are accessible" }, { status: 403 });
  }

  const value = process.env[key];

  if (!value) {
    console.log("env-variable", "GET", "not found", { key });
    return NextResponse.json({ error: `Env variable ${key} not configured` }, { status: 404 });
  }

  return NextResponse.json({ [key]: value });
}
```

With these changes, we were able to generate a `dist` folder (standalone build) that works across multiple environments with runtime variables. No more rebuilding for every environment.

## SSG and SSR Challenges

By default, Next.js pages are **SSR (Server-Side Rendered)**. That was our next challenge. During build time, API calls in `async` components were being executed and responses cached, which caused outdated data issues.

We also had some **SSG (Static Site Generation)** pages facing the same problem, stale content that wouldn't refresh automatically.

Next.js doesn't cache pages as simple HTML. Instead, it stores JSON metadata chunks. To solve this, we added a **post-deployment cache purge strategy**. Basically, we created an API route to call Next.js's internal `revalidatePath` method whenever we needed to refresh cached content.

```ts
// api/revalidate/route.ts

"use server";

import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const secret = process.env.REVALIDATE_SECRET;
    const headersList = await headers();
    const authHeader = headersList.get("authorization");

    if (authHeader !== secret) {
      return NextResponse.json({ error: "Not Authorized" }, { status: 401 });
    }

    const reqBody = await req.json();
    const paths = reqBody.paths || ["/"];

    for (const p of paths) {
      await revalidatePath(p);
    }

    return NextResponse.json({ revalidated: paths });
  } catch (error) {
    console.error("Error parsing request body:", error);
    return NextResponse.json({ error: "Failed to parse request body" }, { status: 400 });
  }
}
```

This gave us a reliable way to control cache invalidation after deployments.

## Bonus tip

Make sure when you are deploying to Azure Web Apps, CDN enablement is not that easy. Since Next.js comes with its own compress policy (gzip) it won't allow you to easily use Azure frontdoor as a CDN solution.

You have to do some tweaks.

```bash
# Create a ruleset in Azure Frontdoor

Name: RuleSetName

IF
  - Condition: Request file extension
  - Operator: Equal
  - Value:
    - js
    - css
    - woff
    - woff2
    - ttf
    - eot
    - otf
    - ico
  - String transform: To lowercase
  
THEN
  - Action: Response header
  - Operator: Append
  - Header name: x-cache-version
  - Header value: v1 (treat it as a version number)
AND THEN
  - Action: Route Configuration Override
  - Override Origin group: no
  - Caching: Enabled
  - Query String caching behavior: Use Query String
  - Compression: Enabled
  - Cache behavior: Override always
  - Days: 1
  - Hours: 0
  - Minutes: 0
  - Seconds: 0
AND THEN
  - Action: Response header
  - Operator: Overwrite
  - Header name: Cache-Control
  - Header value: public, max-age=31536000, immutable
AND THEN
  - Action: Request header
  - Operator: Delete
  - Header name: Accept-Encoding
  
Stop evaluating remaining rules: Checked
```

Above configurations enable caching for all your mentioned files in `IF` condition for 1 year

*I would like to express my gratitude to [Frank Mueller](https://www.linkedin.com/in/frank-mueller-2bbb491b0/) and [Vikas Chawla](https://www.linkedin.com/in/vikas-chawla-94726312/) for their assistance in writing the cache rules.*

## Conclusion

Modern frameworks like Next.js look sleek and make development feel effortless. But once you move into enterprise territory, you'll run into bottlenecks that require extra effort, research, and debugging.

The good news? with the right strategies, like standalone builds, smart env. variable handling, and cache revalidation, you can absolutely make Next.js production ready.
