---
title: 'GitHub Copilot - Future of Programming?'
date: '2021-07-10'
excerpt: There were a couple of questions that came to my mind when I saw this first.
tags:
  - 'Thoughts'
---

There were a couple of questions that came to my mind when I saw this first. In this article, I’ll go through an example of the **[Copilot](https://copilot.github.com/)** peer programming plugin for VSCode.

## What is GitHub Copilot?

If you have noticed a recent post by Github, Copilot is an AI engine that helps you to write programs. It is a smart autocomplete peer programming bot that can smarty understand simple English and write code.

```bash
// find images without an alt attribute
// and give them a red border
```

The above code will create a program that directly can find missing `alt` attribute images and perform the following action.

```js
// find images without an alt attribute
// and give them a red border
function nonAltImages() {
  const images = document.querySelectorAll('img');
  for (let i = 0; i < images.length; i++) {
    if (!images[i].hasAttribute('alt')) {
      images[i].style.border = '1px solid red';
    }
  }
}
```

```js
import React from 'react';
import {render, fireEvent} from '@testing-library/react';

function Counter() {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <button onClick={() => setCount(currCount => currCount + 1)}>Increment</button>
      <p>Count: {count}</p>
    </div>
  );
}

// a unit test that asserts that count increases when the button is clicked
it('increments count', () => {
  const {getByText} = render(<Counter />);
  const button = getByText('Increment');
  fireEvent.click(button);
  expect(getByText('Count: 1')).toBeInTheDocument();
});
```

## Will AI replace developers?

Alone AIs aren’t capable of anything unless you start teaching them. There is no second thought that Copilot is very powerful and has support for industry-leading frameworks and libraries, but it still can’t replace humans.

## Will you lose your job?

Copilot is very new into the industry and seems very fascinating to see a bot writing code for you, but it has very limited features. It can write simple code snippets for you but for large scale programs, companies still need talent like you :)

## Conclusion

I like new things in the programming or tech world to try, whether it’s a framework, library, or tool like Copilot. This tool can help people in their future project developments, but can’t replace humans. I can see people will defiantly start using this tool in their regular day-2-day work (like we adapt to autocompletion of code syntax tools).
