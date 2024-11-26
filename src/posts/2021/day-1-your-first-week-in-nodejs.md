---
title: 'Day 1 - Your first week in NodeJS'
date: 2021-08-03
description: I believe you know something about Node.js before starting this course, just to refresh your memory.
tags:
  - 'NodeJS Beginner Course'
---

I believe you know something about Node.js before starting this course, just to refresh your memory. Node.js is a JavaScript runtime, built on Chrome’s V8 JavaScript engine. Node.js uses an event-driven, non-blocking model that makes it lightweight and efficient.

Node.js package ecosystem, npm, is the largest ecosystem of open source libraries in the world.

**Let’s jump on Day 1 agenda now.**

## 1\. Installation

You can simply go to the [official Node.js website](https://nodejs.org/en/download/) and download the latest stable version (LTS) based on your OS.

![download node](/assets/images/l82jOlmdT.png "download node")

download nodejs page

After the installation, you can simply open your terminal/command prompt, to check if it’s running or not.

```bash
$ node --version
// v14.16.1 (in my case)
```

In addition to the above, you can also go to any editor and create a file `app.js` (or any name).

```js
// app.js
console.log('node is working');
```

Now run this file using Node.js

```bash
$ node app.js
// node is working
```

You have installed Node.js on your machine 🏆

## 2\. Global Objects

After installing Node.js, let’s quickly touch upon **Global objects** which we can use without any objection and third-party imports. These objects/functions are nothing but built-in into Node.js objects. If you are already working on JavaScript you defiantly know about some of these objects like (console, setInterval, setTimeout, etc.).

The main difference between JavaScript (window) vs. Node.js global objects is, you can’t get access to the screen-related function example: scroll, style, etc.

You can try following code examples in Node.js

```js
// app.js
setTimeout(() => {
  console.log("5 seconds have passed");
}, 5000);

// Run this code again
$ node app.js
```

Another useful global object is `process`, we will use this a lot in further lessons. `process` holds the latest state of your Node.js running process. It gives you access to read which environment your server is running or you can set custom environment variables while starting your server.

The common use case is to store credentials inside `process` to later use them in your program.

```bash
// Setting process variable
$ export DB_NAME=demo_db
$ export DB_PASSWORD=yes_you_are_right

// Run your app
$ node app.js

// app.js
const {DB_NAME, DB_PASSWORD} = process.env
console.log(DB_NAME); // demo_db
console.log(DB_PASSWORD); // yes_you_are_right
```

## 3\. Modules + `require()`

So far (above), we wrote everything in a single file, which is good for practice programs and all. If you want to work on a real project where you might have other teams/people surrounding you and working on the same project, then recommended approach is to work with modules.

**Modules** are nothing but an approach to split your code into different-2 re-usable pieces.

It can be a file or a function within the same file, you must have heard of the philosophy of pure-functional programming where every function is responsible to do a single job.

### Let’s take an example, you want to count the `length` of an array.

```js
// Create a new file next to your app.js
// count.js

const count = arr => {
  return arr.length;
};
```

Now you have `count.js` in place, it’s time to make it re-usable for the application.

> Before calling it a module, we need to make some changes to the `count.js` file.

```js
// count.js

const count = arr => {
  return arr.length;
};

module.exports = count; // It will export this component as a module
```

Since we have the `count` module ready to include, let’s call it in `app.js`.

```js
// app.js

const count = require('./count'); // including `count` function as a module
console.log(count([1, 98, 22, 41])); // return: 4
```

You can send multiple modules from your single file.

```js
// utils.js

const add = (a, b) => {
  return a + b;
};

const sub = (a, b) => {
  return a - b;
};

const getDatabaseName = () => process.env.DB_NAME;

module.exports = {
  add,
  sub,
  getDatabaseName
};

// You also change your public function names
module.exports = {
  plus: add,
  minus: sub,
  DBName: getDatabaseName
};
```

```js
// app.js

const utils = require('./utils');

console.log(utils.add(1, 2)); // result: 3
console.log(utils.sub(2, 1)); // result: 1
console.log(utils.getDatabaseName()); // result: demo_db
```

## 4\. Event emitting

Like the above-defined module, we have some built-in core Node.js modules available to use. One of the examples is the `events` module.

Similar to JavaScript `click`/`onChange` events Node.js has the capability to define your own events which can be used when needed.

```js
// custom-events.js

const events = require('events');
const utils = require('./utils');

const eventEmitter = new events.EventEmitter();

eventEmitter.on('showSum', (a, b) => {
  console.log(`Sum is: ${utils.add(a, b)}`);
});

module.exports = eventEmitter;
```

Our event emitter module is now ready, let’s use it in our application.

```js
// app.js

const customEvents = require('./custom-events');
customEvents.emit('showSum', 1, 2); // Sum is: 3
```

## 5\. Read/Write/Steam files

After learning event handling in Node.js let’s do a quick check on file handling with Node.js core module `fs`.

Let’s read the file first in order to try the `fs` module. But first, we need a file to read. Let’s create a file first.

### Read operation ()

```bash
// Inside the same directory
$ touch read.txt
$ vim ./read.text  // Add some content and save the file.
```

```js
// app.js

const fs = require('fs');

const readMeFile = fs.readFileSync('./read.txt', 'utf-8');
console.log(readMeFile); // File contents
```

### Write operation

```js
// app.js

const fs = require('fs');

const readMeFile = fs.readFileSync('./read.txt', 'utf-8');
fs.writeFileSync('./read-new.txt', readMeFile);
```

The above statement will simply read the contents from the `read.txt` file write another file `read-new.txt` with its content.

There are two ways to read/write files, synchronous/asynchronous, we are using sync. method to read the file. It prevents the program execute unless it reads the entire file.

On the other hand, `fs.readFile` can read files asynchronously, sometimes we use this method too.

> Let’s quick touch upon async. file read operation:

```js
const fs = require('fs');

fs.readFile('./read.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error(err);
  }
  console.log(data);
});

console.log('Am I first?');

// Result:
// file content
// Am I first?
```

In the example above you can see, text outside the `readFile` operation logged first. Async. operation is beneficial when your further operations are independent of the file read/write operations.

Hope you like the starting of the series, stay tuned for further posts in this series.

Happy reading!

## Useful Links

- [Install Node.js](https://nodejs.org/en/download/)

- [Global Objects](https://nodejs.org/dist/latest-v14.x/docs/api/globals.html)

- [Events](https://nodejs.org/dist/latest-v14.x/docs/api/events.html)

- [File system](https://nodejs.org/dist/latest-v14.x/docs/api/fs.html)
