---
title: 'Aria is not my thing'
date: '2021-03-27'
excerpt: I am reading a lot about accessibility guidelines and met/working with some people who are responsible to deliver accessible experiences
tags:
  - 'Tech'
---

I am reading a lot about accessibility guidelines and met/working with some people who are responsible to deliver accessible experiences. Accessibility is something that you can’t just archive by adding `aria` attributes to your DOM elements. After all, there is no need to add the `aria` attribute if you are using the correct DOM element while building your website.

## (Mis)use of aria-\* attributes

Web developers often treat accessibility as the last check-in of their component development life cycle. When they test their component in screen readers, they found some unexpected behaviors. To fix these problems they start adding `aria` attributes to their DOM elements which make the entire DOM structure heavier and confusing.

For example, what tag would you prefer to use to define your button?

```html
<!-- with button tag? -->
<button>My button</button>
```

or

```html
<!-- with div tag? -->
<div tabindex="0" role="button" aria-pressed="false">
  My button
  <div></div>
</div>
```

In the above code, you are creating a button with a `div` tag and adding JavaScript overhead to keep track of `aria-pressed` to announce the correct state of the button.

You got it right, the first step to achieving accessibility is your DOM structure. Using semantic HTML tags, you can directly inform the screen readers to read what they are supposed to read. I have also seen developers who are adding `aria-label` to their link tags, which leads screen readers to read the same text twice.

Following are some semantic HTML attributes that behave the way they are defined and you don’t need any extra support for aria tags.

## Examples

```html
<!-- Buttons -->
Bad Practice 🚫
<div tabindex="0" role="button" aria-pressed="false">
  My button
  <div>
    Good Practice ✅
    <button name="submit-btn" type="submit">My button</button>

    <!-- Links -->
    Bad Practice 🚫
    <a href="#" aria-label="Link tag">Link tag</a>

    Good Practice ✅
    <a href="#" aria-label="Click for checkout page">Link tag</a>

    <!-- Checkboxes -->
    Bad Practice 🚫
    <span
      role="checkbox"
      id="chkPref"
      aria-checked="false"
      onclick="changeCheckbox()"
      onKeyPress="changeCheckbox()"
      tabindex="0"
      aria-labelledby="chk1-label"
    >
    </span>
    <label id="chk1-label" onclick="changeCheckbox()" onKeyPress="changeCheckbox()">
      Remember my preferences
    </label>

    Good Practice ✅
    <input type="checkbox" id="chk1-label" />
    <label for="chk1-label">Remember my preferences</label>
  </div>
</div>
```

It is still debatable when it comes to accessibility, there is no wrong/right but there is a balance that you need to maintain to give a better experience to a wide range of users.

## Tips

- Keep your DOM elements semantic
- Avoid using `aria-*` attributes
- Keep logical sequence to your DOM elements
- Don’t hide content unless required
- Keep your layout and fonts responsive in size

Thanks for reading my article!
