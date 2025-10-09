---
title: Why companies are moving away from NextJS?
date: '2025-06-16'
description: Companies are shifting away from Next.js because of concerns about increased complexity, vendor lock-in, performance limitations at scale, and the flexibility offered by alternative frameworks like Astro, Remix, or pure React solutions with Vite. While Next.js remains a powerful tool, it's not always the best choice for all projects.
tags:
  - 'Tech'
  - 'Thoughts'
---

## TL;DR

Companies are shifting away from Next.js because of concerns about increased complexity, vendor lock-in, performance limitations at scale, and the flexibility offered by alternative frameworks like Astro, Remix, or pure React solutions with Vite. While Next.js remains a powerful tool, it's not always the best choice for all projects.

## The Rise and (Partial) Fall of Next.js

Next.js has been the darling of the frontend community for years. And why wouldn't it be? It’s easy to use, SEO-friendly, and simplifies tasks like server-side rendering (SSR) and static site generation (SSG). But lately, a surprising number of companies have started exploring or outright migrating to alternatives. What's happening here?

Let's unpack the factors behind this shift.

## Too Much Complexity for Simple Needs?

You know what? Next.js started as a straightforward framework. It was a breath of fresh air: just a `pages` directory and minimal configuration. But things have changed—dramatically. Over the years, Next.js has grown increasingly feature-rich, making it sometimes overly complex for simpler projects.

Companies working with straightforward landing pages or static sites started questioning if they needed the entire Next.js toolset. After all, not every website requires SSR or complex routing. Imagine buying a Swiss Army knife only to use the corkscrew, feels a bit excessive, right?

## The Vendor Lock-in Problem

One significant concern cropping up lately is vendor lock-in. Next.js has increasingly become intertwined with Vercel's ecosystem; it's practically built to run seamlessly on Vercel. Sure, you can run Next.js elsewhere, but you'll often miss out on key optimizations or ease-of-use perks.

This dependence has made some companies wary, especially those who prefer flexibility or have strict vendor policies. They want to know they're not boxed into a single hosting provider if pricing or performance demands shift.

## Performance Concerns at Scale

Let's talk scalability. At small to medium scales, Next.js feels lightning-fast and buttery-smooth. But when you're dealing with hundreds of thousands of pages or heavy workloads, cracks begin to appear. Companies at enterprise scale have reported longer build times, problematic deployments, and diminishing returns on productivity.

Building massive projects in Next.js can lead to slower development cycles and increased complexity when handling build times and incremental static regeneration. This friction has pushed some developers to look elsewhere.

## Alternative Frameworks: Less is Sometimes More

Companies have started noticing other frameworks like Astro, Remix, SolidStart, or pure React setups with Vite. These offer intriguing advantages:

* **Astro** provides unparalleled performance and flexibility by shipping zero JavaScript by default—ideal for content-heavy sites.
* **Remix** shines with its simplicity, predictable routing, and full control over server-side data loading without the heavy overhead.
* **Vite** with vanilla React has gained fans for its sheer simplicity and blazing-fast dev experience, especially when SSR isn't crucial.

The appeal of a leaner, more focused architecture has caught developers' attention, pulling companies away from the heavyweight nature of Next.js.

## Real-World Example: Shopify’s Shift

Take Shopify, for instance. Shopify famously moved their Hydrogen frontend away from Next.js to Remix. The reasoning? Remix offered a simpler, cleaner way to handle dynamic commerce features and a better developer experience at Shopify's scale.

Moves like Shopify’s haven’t gone unnoticed, causing others in similar positions to reconsider their own framework choices.

## When Does Next.js Still Shine?

This doesn't mean Next.js has suddenly become irrelevant—far from it! It still excels in many situations:

* Complex, interactive sites needing SSR and seamless SEO
* Projects tightly coupled with Vercel's deployment platform
* Medium-scale web apps benefiting from Next’s ecosystem of plugins and integrations

But the takeaway here is simple: **Next.js is not the silver bullet it once seemed.**

---

## Wrapping Up: What's Next (Pun Intended)?

Ultimately, deciding whether Next.js is right for your company comes down to your specific needs. But the industry trend is clear—companies crave simplicity, flexibility, and scalability. Next.js might check many boxes, but when it falls short, alternatives are increasingly ready and compelling.

So, honestly, is it time for you to reconsider your frontend choice too?
