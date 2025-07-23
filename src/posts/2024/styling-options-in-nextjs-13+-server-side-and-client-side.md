---
title: 'Styling options in NextJS 13+ (Server Side and Client Side)'
date: '2024-05-14'
excerpt: Styling choices in Next.js can be confusing. Some prefer CSS modules, while others opt for the popular Tailwind CSS.
tags:
  - 'NextJS'
---

Styling choices in Next.js can be confusing. Some prefer CSS modules, while others opt for the popular Tailwind CSS.

Next.js 13+ now comes with server-side components, which can cause issues with certain UI libraries that aren't set up for server-side rendering (SSR). Although you can render components on the client side instead, it might not be the best fit for Next.js 13+.

In this article, we'll explore the different styling options Next.js offers out of the box, following their [official recommendations](https://nextjs.org/docs/app/building-your-application/styling).

## CSS modules

In Next.js, CSS modules are seamlessly integrated. You can designate module-specific styles by adding the `.module.css` extension. This feature automatically generates distinct class names tailored to each module, facilitating the use of identical class names across various modules.

For instance, within the `app` directory, importing CSS modules is straightforward, allowing for styling across your project.

```jsx
// app/dashboard/layout.js

import styles from './styles.module.css';

export default function DashboardLayout({children}) {
  return <section className={styles.dashboard}>{children}</section>;
}
```

```css
/* app/dashboard/styles.module.css */

.dashboard {
  padding: 24px;
}
```

## TailwindCSS (recommended)

It's a CSS framework, prioritising utility-first principles, endorsed by the Next.js team. It provides the flexibility to utilize their predefined classes and theme. Additionally, you have the option to customize your theme either by extending the existing classes or substituting them entirely. Setting up Tailwind CSS in your Next.js app is straightforward with guidance available in Next.js' own documentation. [Here's the link](https://nextjs.org/docs/app/building-your-application/styling/tailwind-css).

## Global styles

If you are coming from tradition background and what to stay with but also what to work with NextJS 13. This option is for you.

For example, you can refer to the stylesheet named `app/global.css`

```css
body {
  padding: 20px 40px;
  max-width: 1200px;
  margin: 0 auto;
}
```

Which can further be included one time in the root layout `app/layout.js` and work like traditional applications

```jsx
// These styles apply to every route in the application
import './global.css';

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

## CSS-in-JS (currently not fully supported in SSR)

As per [NextJS documentation](https://nextjs.org/docs/app/building-your-application/styling/css-in-js), CSS-in-JS libraries which require runtime JavaScript are not currently supported in Server Components. However the team to is working on it to make it possible to work in both ways.

I would personally don't recommend since it will bring lot of hassle in production applications and also not good in performance with growing application.

## External StyleSheets

This criteria is useful when you are relying on some third party CSS which has its own style guidelines and can be used by just including them.

```jsx
import 'bootstrap/dist/css/bootstrap.css';

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body className="container">{children}</body>
    </html>
  );
}
```

## SASS

This could be your next go-to option (following Tailwind CSS) if you seek control over your CSS and desire dynamic behavior. It offers the ability to create custom themes, grids, and more. However, it does come with a learning curve, as not everyone may be familiar with SASS.

## References

[NextJS Documentation](https://nextjs.org/docs/app/building-your-application/styling)
