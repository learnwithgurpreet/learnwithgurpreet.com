---
title: 'My React Stack for 2021'
date: '2021-05-08'
description: I will showcase what options are available in the market to start on a ReactJS based application.
tags:
  - 'Thoughts'
---

My ReactJS tech stack in which you might be interested. I will showcase what options are available in the market to start on a [ReactJS based application](https://learnwithgurpreet.com/structure-your-frontend-project/).

## ReactJS (with TypeScript)

People often use [create-react-app](https://github.com/facebook/create-react-app) for their ReactJS projects. The default setup comes with ES6 syntax, but you can also switch your default installer to install TypeScript-based ReactJS App.

```bash
# Default install command
$ npx create-react-app my-app

# With typescript
$ npx create-react-app my-app --template typescript
```

It will help you to make your JavaScript code less error-prone since it validates data types and a lot more during the development time.

## React Router

When it comes to developing medium to large-scale applications, I would prefer to use [React Router](https://reactrouter.com/). This helps you to define your routes for your single-page application projects. React Router is a collection of navigational components that compose declaratively with your application. Whether you want to bookmark URLs for your web app or a composable way to navigate in React Native, React Router works wherever React is rendering.

```bash
$ npm i react-router
```

## State Management

There are two kinds of state management we have in ReactJS based applications.

### Component State

It is also known as an internal state of a component, which can be managed by your component itself. For example, you can use the `useState()` react hook to manage the state in a functional component. Similarly, by using _[react lifecycle methods](https://reactjs.org/docs/state-and-lifecycle.html#adding-lifecycle-methods-to-a-class)_ you can manage the state in the `class` component.

### Application State

The application-level state is similar to the component state but works on the application level. For example, if you want to change the shopping cart count when someone adds a product to the cart. You need an application-level shared state which can work as a single source of truth for your application state. There are a couple of options to go with but I prefer using [Redux library](https://redux.js.org/). It is a powerful library to handle a predictable state for your application. You can install this library as the initial setup of your ReactJS project.

```bash
# This command provides react boilerplate with redux
$ npx create-react-app my-app --template redux

# For existing ReactJS projects
$ npm i redux
```

> Tip: You can explore [redux-toolkit](https://redux-toolkit.js.org/) in 2021

## Component Library

An application should have consistent behavior across all the pages. There are a good amount of free/open-source component libraries available in the market, for example, ChakraUI, MaterialUI, or [AntDesign](https://ant.design/docs/react/introduce).

## Form Handling

When it comes to handling user inputs, forms are required. Forms can easily mess up your project. I would suggest carefully choosing form-library in order to add validations and state handlings. There are some form libraries to choose from. I would prefer to go with [React Hook Form](https://react-hook-form.com/) or [Formik](https://formik.org/). Both libraries are very performance-oriented and have good community support. You can easily customize them, and use them as per your needs.

## Testing

One of the most important parts of every project. It’s been a couple of years since I came across [React Testing Library (RTL)](https://testing-library.com/docs/react-testing-library/intro/) which comes as the default testing library inside your create-react-app project. This builds on top of the DOM Testing Library by adding APIs for working with React components.

You can use this library in your old ReactJS project as well

```bash
$ npm i -D @testing-library/react
```

## Storybook

[Storybook](https://storybook.js.org/) is an isolated library that can help to showcase ReactJS based components from the end-user perspective. It simplifies building, documenting, and testing UIs. You can develop presentational components even without having backend services in place.

```bash
# Following command will automatically detect your project type
$ npx sb init
```

## NextJS

[NextJS](https://nextjs.org/) comes with lots of built-in features which will surely take time to build if you want to build them from scratch. It has default support to server-side rendering which helps you to make better SEO-friendly applications. It also has built-in support for TypeScript.

```bash
$ npx create-next-app
```
