---
title: Mono Repo vs. Micro Front-ends with Next.js
date: '2024-07-01'
description: 'In the world of web development, the architecture of your project can significantly influence its scalability, maintainability, and performance.'
tags:
  - 'Tech'
image: './src/assets/images/gallery/christian-stahl-8S96OpxSlvg-unsplash.jpg'
alt: 'A picture of two doors, with number plates on them 31 and 33 respectively'
credit: Photo by Christian Stahl on Unsplash
---

In the world of web development, the architecture of your project can significantly influence its scalability, maintainability, and performance. Two popular approaches in contemporary development are the [mono repo](#mono-repo) and [micro front-ends](#micro-front-ends). Each has its distinct advantages and potential drawbacks, and choosing the right one can be pivotal to the success of your project.

## Mono Repo

A mono repo, short for monolithic repository, is a version control strategy where all the code for multiple projects is stored in a single repository. This approach centralizes code management, making it easier to share code, tools, and libraries across different projects. The mono repo strategy has been famously adopted by large organizations like Google, Facebook, and Microsoft due to its ability to streamline development processes and enhance code reuse.

### When to Choose a Mono Repo?

- **Single App Deployment:** It involves deploying the entire application as a unified entity rather than dividing it into separate apps. This approach simplifies the release process with a single CI/CD pipeline, ensuring consistency across the application and reducing compatibility issues. It enables atomic updates, where all changes are deployed simultaneously, simplifying versioning and ensuring application-wide consistency.[^1]

- **Unified Scaling Needs:** Since we have a single application, it is not possible to scale individual modules separately, such as the catalog flow versus a static page. Instead, everything must be scaled together as one unified application.

- **Change Management:** When your change management strategy fine with deploying the entire application rather than individual modules, single deployment is ideal. This approach ensures that all updates and changes are applied uniformly across the application, maintaining consistency and simplifying version control. It eliminates the need to manage separate deployment processes for different modules, streamlining the release process and reducing the potential for compatibility issues.

- **SPA Behavior:** Next.js ensures a uniform navigation experience throughout the application, contrasting with page refreshes required when switching between different parts of the application.

- **Centralized State Management:** Managing global state and shared resources like authentication state becomes simpler across the entire application.

- **Performance:** Some components, such as Header, Footer, and Navigation, are consistently shared across different parts of the application. This can be achieved by using layouts in Next.js, allowing for dynamic rendering of pages while keeping these common components static.

### Example Architecture of Mono Repo

```lua
my-mono-repo/
├── web-application/
│   ├── app/
│   │   ├── authentication/
│   │   │   ├── page.js
│   │   │   ├── login.js
│   │   │   ├── register.js
│   │   ├── catalog/
│   │   │   ├── page.js
│   │   │   ├── product.js
│   │   ├── static-pages/
│   │   │   ├── page.js
│   │   │   ├── about.js
│   │   ├── layout.js
│   │   ├── page.js
│   ├── public/
│   │   ├── favicon.ico
│   ├── styles/
│   │   ├── globals.css
│   ├── next.config.js
│   ├── package.json
├── packages/
│   ├── package1/
│   │   ├── index.js
│   ├── package2/
│   │   ├── index.js
│   ├── package.json
├── turbo.json
├── package.json
├── README.md
```

**In this structure:**

- `my-mono-repo/` is the root directory.

- `web-application/` contains the `app/` directory, which is part of the Next.js App Router.

  - The `app/` directory includes subdirectories for `authentication/`, `catalog/`, and `static-pages/`, each with their respective files such as `page.js` (required for Next.js pages) and other specific components or pages like `login.js`, `register.js`, `product.js`, etc.

  - `layout.js` is used for layout components.

  - `page.js` in the root of `app/` is the main entry point for the application.

- The `public/` directory is for static assets like `favicon.ico`.

- The `styles/` directory is for global styles, such as `globals.css`.

- `next.config.js` is the configuration file for Next.js.

- `package.json` in `web-application/` is for the web application's dependencies and scripts.

- `packages/` contains subdirectories `package1/` and `package2/`, each with their `index.js` files, and a root `package.json` for package configurations.

- The root directory contains `turbo.json` for Turbo Repo configuration, `package.json` for root dependencies and scripts, and `README.md` for project documentation.

This structure aligns with Next.js conventions and should help you organize your Next.js application within your mono repo setup.

## Micro Front-Ends

Micro front-ends are a front-end development approach where a web application is divided into smaller, independent fragments. Each fragment, or micro front-end, is developed, tested, and deployed independently by different teams. This architecture mirrors the principles of microservices on the backend, aiming to bring modularity, flexibility, and scalability to the front-end. Micro front-ends are particularly beneficial for large-scale applications where different teams need to work on different parts of the application simultaneously without interfering with each other's work.

### When to Choose Micro Front-Ends?

- **Modularity and Independence:** Each micro front-end is developed, tested, and deployed independently, allowing teams to work autonomously without impacting other parts of the application. Teams can choose the best tools and technologies for their specific micro front-end, leading to more innovative and optimized solutions.

- **Scalability:** Different parts of the application can be scaled independently based on demand. For example, the catalog flow can be scaled separately from a static page, optimizing resource utilization. Load times can be improved by delivering only the necessary parts of the application to users, enhancing the overall user experience.

- **Separation of Concerns:** Since each of the application can be managed independently, simplifying maintenance and updates without impacting other parts of the system.

### Example Architecture of Micro Front-Ends

```lua
my-mono-repo/
├── web-application/
│   ├── authentication-app/
│   │   ├── app/
│   │   │   ├── page.js
│   │   │   ├── login.js
│   │   │   ├── register.js
│   │   ├── public/
│   │   │   ├── favicon.ico
│   │   ├── styles/
│   │   │   ├── globals.css
│   │   ├── next.config.js
│   │   ├── package.json
│   ├── catalog-app/
│   │   ├── app/
│   │   │   ├── page.js
│   │   │   ├── product.js
│   │   ├── public/
│   │   │   ├── favicon.ico
│   │   ├── styles/
│   │   │   ├── globals.css
│   │   ├── next.config.js
│   │   ├── package.json
│   ├── static-pages-app/
│   │   ├── app/
│   │   │   ├── page.js
│   │   │   ├── about.js
│   │   ├── public/
│   │   │   ├── favicon.ico
│   │   ├── styles/
│   │   │   ├── globals.css
│   │   ├── next.config.js
│   │   ├── package.json
├── packages/
│   ├── package1/
│   │   ├── index.js
│   ├── package2/
│   │   ├── index.js
│   ├── package.json
├── ingress.yaml
├── turbo.json
├── package.json
├── README.md
```

**In this structure:**

- The `ingress.yaml` file configures an NGINX ingress controller to route traffic to different services based on the URL path.

- Requests to `/authentication-app` are routed to authentication-service.

- Requests to `/catalog-app` are routed to catalog-service.

- Requests to `/static-pages-app` are routed to static-pages-service.

## Conclusion

In summary, it completely depends on project needs like, change management cycles, team structure, etc. to choose one or the other approach. Choosing a single deployment approach ensures simplicity and consistency throughout your application's updates. However, it requires careful coordination and may have limitations in scalability compared to deploying apps separately.

Also, there are other ways exists that can bring all your MF apps together for example: Module federation, shell-app concept.

[^1]: This doesn't mean we are bound to deploy everything together, you can still deploy shared packages separately.
