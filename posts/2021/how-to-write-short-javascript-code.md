---
title: 'How to write short JavaScript code?'
date: '2021-07-28'
description: I know some of you have never used short syntax JavaScript statements for example if/else vs. ternary statement.
tags:
  - 'Tech'
---

We have been writing JavaScript for quite a while now, I know some of you have never used short syntax JavaScript statements for example: if/else vs. ternary statement.

In this article, I'll show some shorthand conditional, looping, or operator statements that can be used in your daily coding practices.

## 1\. Empty an array

```js
const arr = ['Charlie', 'John', 'James'];
arr.length = 0; // arr will be []
```

## 2\. Filter odds

```js
// Traditional/Old style
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const arr2 = [];

for (let i = 0; i < arr.length; i = i + 1) {
  if (arr[i] % 2 === 0) {
    arr2.push(arr[i]);
  }
}

console.log(arr2); // [ 2, 4, 6, 8 ]

// New/Better way
arr.filter(value => value % 2 === 0); // [ 2, 4, 6, 8 ]
```

## 3\. Combine arrays

```js
const arr1 = [1, 2, 3, 4];
const arr2 = [5, 6, 7, 8];

[...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6, 7, 8]
```

## 4\. Delete vs. Splice

We often face instances where we need to remove an element from an array. Removing an element from an array can be painful sometimes when you still get the same length of array event after deleting an element.

```js
// delete
const arr = [1, 2, 3, 4];

console.log(arr.length); // 4
console.log(arr); // [1,2,3,4]

delete arr[2];
console.log(arr.length); // 4
console.log(arr); // [1,2,<1 empty slot>,4]

// splice
console.log(arr.length); // 4
console.log(arr); // [1,2,3,4]

arr.splice(2, 1);
console.log(arr.length); // 3
console.log(arr); // [1,2,4]
```

## 5\. Get unique

```js
const arr = [4, 1, 2, 2, 11, 4, 3, 1, 9, 1, 0, 3];

const newArr = [...new Set(array)];
console.log(newArr); // Result: [ 4, 1, 2, 11, 3, 9, 0 ]
```

## 6\. Logical AND/OR

```js
let subscribed = true;
subscribed && 'Yes'; // Result: Yes

subscribed = false;
subscribed || 'No'; // Result: No
```

## 7\. Convert String to Number

```js
// Simply add `+` before writing the variable

const myStringNumber = '5.12';
+myStringNumber + +'5'; // Result: 5.12 // Result: 5
```

## 8\. Condition in chain

```js
const data = {
  name: 'John'
};

console.log(data.name); // Result: John
console.log(data.class); // Result: undefined

// Problem
console.log(data.class.name); // Result: Uncaught Exception TypeError: data.class is undefined

// Solution
console.log(data.class?.name || 'not found'); // Result: not found
```
