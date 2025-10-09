---
title: 'State Handling in React JS'
date: 2024-04-11
description: React's component-based architecture enables developers to create reusable, composable UI elements.
tags:
  - 'Tech'
---

React's component-based architecture enables developers to create reusable, composable UI elements. However, as applications grow in complexity, managing the state of these components becomes crucial for maintaining a predictable and efficient user experience.

In React, state refers to the data that determines a component's behavior and rendering. It encapsulates the current state of a component and influences its appearance and interactions. Understanding how to manage state effectively is fundamental to building robust and scalable React applications.

In this article, we'll dive into the fundamentals of state handling in React, exploring various techniques and best practices for managing state within components. We'll cover local component state, and application level state handling techniques with libraries like Redux, Zustand, and Context API. By the end, you'll have a comprehensive understanding of which path to choose for difference scenarios.

## State Management Flow Chart

<div style="overflow:auto;">
  <table class="striped">
    <thead>
      <tr>
        <th scope="col">Case</th>
        <th scope="col">Use Case</th>
        <th scope="col">Example</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">useState (component)</th>
        <td>Scoped to a single component</td>
        <td><code>selected</code> state in <code>Single Component</code> (product-variations/index.jsx) The property is used only in this component.</td>
      </tr>
      <tr>
        <th scope="row">useState (page)</th>
        <td>Scoped to a single page</td>
        <td><code>isOverlayOpen</code> state in <code>CustomizationContainer</code> (customization-component.js) The property is part of an object that is passed as a prop to AddToCartModalComponent (and no further).</td>
      </tr>
      <tr>
        <th scope="row">Context API</th>
        <td>Prop drill is needed for more than one level</td>
        <td>PDP, where we might have component/page state for "selected option set" and some deep component needs to know about it.</td>
      </tr>
      <tr>
        <th scope="row">Zustand/Redux</th>
        <td>Needed across the application and is based on user action, whether that be: - Direct input (Eg. deliveryInfo.phone) - Selection of explicit options (Eg. fulfillmentDate) - Selection of implicit options (Eg. storeId) - System assigned value that can’t be querieddirectly (Eg. orderId)</td>
        <td>In addition to the use case-specific examples at left, you can find the rest of the global store in /stores</td>
      </tr>
      <tr>
        <th scope="row">SWR Hook</th>
        <td>- Managing data fetching and server managed state - <code>useSWR</code> is able to fetch backend data, as well as manage caching for redundant requests - Supports traditional HTTP requests as well as graphQL queries.</td>
        <td>-</td>
      </tr>
      <tr>
        <th scope="row">URL query params</th>
        <td>When page level state needs to be set from outside of the page.</td>
        <td>Passing an orderId from an email, etc.</td>
      </tr>
    </tbody>
  </table>
</div>

## Application Flow

![Application flow with selection of state management options](/assets/images/blog/state-management.jpg "Application flow with selection of state management options")

With the help of above example, you can decide which path to got with.
