---
title: 'Do we really need class components anymore?'
date: '2021-04-21'
description: ReactJS is a mature enough library that becomes the first choice for developers.
tags:
  - 'Thoughts'
---

ReactJS is a mature enough library that becomes the first choice for developers. When ReactJS got launched it had a strong concept of _class components_. The reason they were popular was because of their life cycle methods. With the ease of these life cycle methods, you can trigger your custom event at the right time.

Before it was clear when you need a stateful component goes with a _class component_ otherwise _functional component_.

In this post, I call it modern React as it changed a lot over the period of time. Don’t go with the assumption of stateful vs. functional components. Functional components can also be stateful components.

Do you want to know why?

## Rendering JSX

```js
import React from 'react';

const FunctionalComponent = () => {
  return <h1>Hello, world!</h1>;
};
```

```js
import React, {Component} from 'react';
class ClassComponent extends Component {
  render() {
    return <h1>Hello, world!</h1>;
  }
}
```

You can see in the above example, we are trying to render a single string which is not a challenge in `FunctionalComponent`. But `ClassComponent` makes it more complex.

## Handling state

When it comes to handling states in ReactJS, it is debatable which type of component to go with. For example, I am working on a legacy project with React 15.x.x then I would definitely go with the class component. Because it gives me ReactJS life cycle methods which help to handle component state.

We can handle the state with **React hooks** since **React 16.8** within functional components.

```js
/* State handling with class component */

import React, {Component} from 'react';

class ClassComponent extends Component {
  constructor(props) {
    super(props);
    // Initial state
    this.state = {
      count: 0
    };
  }
  render() {
    return (
      <div>
        <p>count: {this.state.count} times</p>
        <button onClick={() => this.setState({count: this.state.count + 1})}>
          Click
        </button>
      </div>
    );
  }
}
```

```js
/* State handling with the functional component, using react hooks */

import React, {useState} from 'react';

const FunctionalComponent = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Click</button>
    </div>
  );
};
```

**That was easy, right?**

We can do much more with React hooks. See below:

## Lifecycle Methods

Let’s talk about React lifecycle methods now. These methods are the backbone of ReactJS. I still can recall when someone asked me about these methods in one of the interviews. These methods were only part of React.Component before but now are available with Hooks.

### On Mount (componentDidMount)

```js
/* Class component */

import React, {Component} from 'react';

class ClassComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }
  componentDidMount() {
    fetch('some-api.com/user')
      .then(response => response.json())
      .then(data => this.setState({name: data}));
  }

  render() {
    return <h1>{`Hello, my name is ${this.state.name}`}</h1>;
  }
}
```

```js
/* Functional component, using react hooks */

import React, {useState, useEffect} from 'react';

const FunctionalComponent = () => {
  const [name, setName] = useState('');
  useEffect(() => {
    fetch('some-api.com/user')
      .then(response => response.json())
      .then(data => setName(data));
  }, []);

  return <h1>{`Hello, my name is ${name}`}</h1>;
};
```

See, how easy it is to call an API within a functional component using [useEffect](https://reactjs.org/docs/hooks-reference.html#useeffect).

Note: The second parameter of the `useEffect` hook is basically listening to an array of items on which you want to re-run your hook.

### On Unmounting (componentWillUnmount)

In some instances, where you need to clear your timers and de-allocate memory on the unmount.

```js
/* Class component */

import React, {Component} from 'react';

class ClassComponent extends Component {
  componentDidMount() {
    const element = document.getElementById('someId');
    element.removeEventListener('click', this.onLinkClick);
    element.addEventListener('click', this.onLinkClick);
  }

  componentWillUnmount() {
    const element = document.getElementById('someId');
    element.removeEventListener('click', this.onLinkClick);
  }

  onLinkClick = () => {
    /* Something in this function */
  };

  render() {
    return <button id="someId">I am button</button>;
  }
}
```

```js
/* Functional component, using react hooks */

import React, {useEffect} from 'react';

const FunctionalComponent = () => {
  function onLinkClick() {
    /* Something in this function */
  }

  useEffect(() => {
    element.removeEventListener('click', onLinkClick);
    element.addEventListener('click', onLinkClick);
    return () => {
      element.removeEventListener('click', onLinkClick);
    };
  }, []);

  return <button id="someId">I am button</button>;
};
```

## Conclusion

There are some areas where you might need class components. However, I prefer to go with functional.

In the example above you have seen, we can gain everything by using the functional components. In case your current project is running on class components, don’t worry there is no harm to that. Perhaps, I would recommend using functional components over class.

Nevertheless, the ReactJS community is still supporting class components and there is no hard rule to avoid them.

## Useful links

- [Hooks at a Glance](https://reactjs.org/docs/hooks-overview.html)
- [Introduction to Hooks](https://reactjs.org/docs/hooks-intro.html)
- [Hooks API Reference](https://reactjs.org/docs/hooks-reference.html)
- [Building Your Own Hooks](https://reactjs.org/docs/hooks-custom.html)
