---
title: 'Day 2 - Your first week in NodeJS'
date: 2021-08-04
excerpt: I believe you have already read my previous article where I explained, the basics of Node.js
tags:
  - 'NodeJS Beginner Course'
---

## Prerequisite

1. [Day 1 - Your first week in NodeJS](/posts/day-1-your-first-week-in-nodejs/)

I believe you have already read my previous article where I explained, the basics of Node.js, from creating custom modules, event handling, and file read/write operations. Let’s jump on today’s topic and write the code together.

## Creating a Server

In the current world, people are looking for de-coupled systems/architectures solutions where each and every module can run independently and be responsible. These systems can be stateless or stateful (we will read about it later). These servers can be categorized into two segments, **Client** and **Server**.

### Client (front-end)

The client is where we invite end users, it can be a Mobile App or a Website. When someone is hitting `https://google.com` they are looking at the front-end of Google. The client platform is then responsible to get data from Server (backend APIs) or sometimes the backend renders the frontend code (like WordPress does) which we also call Traditional or Monolith structure.

### Server (backend)

Node.js brought a big change in backend systems wherein people are not heading towards micro-service architecture. Servers/APIs are getting powerful and solving a single problem at a time. Headless architecture is one of its kind which can run without and state and gives expected output.

Let’s quickly jump on client-side server creation. We will use the core Node.js module for this server.

We will divide this into two sections, request and response.

![request and response](/assets/images/NRrw-CXTO-1024x538.png "request and response")

Request and Response architecture

#### JSON response example

```js
// app.js

const http = require('http');

const server = http.createServer((request, response) => {
  response.writeHead(200, {'Content-Type': 'application/JSON'});
  response.end(JSON.stringify({name: 'John', employee_id: 'DS123'}));
});

server.listen(3000, '127.0.0.1', () =>
  console.log('Server is started on http://127.0.0.1:3000')
);
```

To run the above file you need to run `$ node app.js` in your console and you will see a response in JSON format.

It is important to understand response headers here, If you check I am sending the request back with the “application/JSON” header but in string. http module only supports string responses but can be distinguished by headers.

> [http://127.0.0.1](http://127.0.0.1) equivalent to [http://localhost](http://localhost), IP is required when you want to run your application on Local Networks.

#### HTML response example

```html
<!-- index.html -->

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome</title>
    <style>
      body {
        background-color: cornflowerblue;
        text-align: center;
        font-size: 16px;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
      }
      h1 {
        font-size: 3rem;
      }
    </style>
  </head>
  <body>
    <h1>Welcome to my webpage</h1>
    <p>This page is running on awesome Node.js sever!</p>
  </body>
</html>
```

```js
// app.js

const http = require('http');
const fs = require('fs');

const server = http.createServer((request, response) => {
  console.log(`request made: ${request.url}`);
  response.writeHead(200, {'Content-Type': 'text/html'});
  const readStream = fs.createReadStream(`${__dirname}/index.html`, 'utf8');
  readStream.pipe(response);
});

server.listen(3000, '127.0.0.1', () =>
  console.log('Server is started on http://127.0.0.1:3000')
);
```

#### Output

![webpage output](/assets/images/4YVWO-UmXp-1024x585.png "webpage output")

homepage

You can see in the above example, we had to add inline styles for the page. We will cover external styles in the next article.

Don’t panic it’s just a start, we will go through more robust and better ways of doing this.

## Routing

I’ll quickly touch upon core `http` module routing since we will read these routes in detail when we get on the express.js topic.

Routing is nothing but letting users redirect from one page to another. It also helps to divide code into authorized vs. non-authorized pages.

We will quickly create another `HTML` page so users can navigate through these two different pages.

```html
<!-- index.html -->
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome</title>
    <style>
      body {
        background-color: cornflowerblue;
        text-align: center;
        font-size: 16px;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
      }
      h1 {
        font-size: 3rem;
      }
      ul li {
        list-style: none;
        display: inline-block;
        margin: 0 10px;
      }
      a {
        font-size: 1.2rem;
        color: white;
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <h1>Welcome to my webpage</h1>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
    <p>This page is running on awesome Node.js sever!</p>
  </body>
</html>
```

```html
<!-- contact.html -->
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Contact</title>
    <style>
      body {
        background-color: cornflowerblue;
        text-align: center;
        font-size: 16px;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
      }
      h1 {
        font-size: 3rem;
      }
      ul li {
        list-style: none;
        display: inline-block;
        margin: 0 10px;
      }
      a {
        font-size: 1.2rem;
        color: white;
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <h1>Contact me on Twitter @gsin11</h1>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
    <p>This page is running on awesome Node.js sever!</p>
  </body>
</html>
```

```js
// app.js

const http = require('http');
const fs = require('fs');

const server = http.createServer((request, response) => {
  let readStream;
  const url = request.url;

  console.log(`request made: ${url}`);
  response.writeHead(200, {'Content-Type': 'text/html'});

  if (url === '/contact') {
    readStream = fs.createReadStream(`${__dirname}/contact.html`, 'utf8');
  } else {
    readStream = fs.createReadStream(`${__dirname}/index.html`, 'utf8');
  }

  readStream.pipe(response);
});

server.listen(3000, '127.0.0.1', () =>
  console.log('Server is started on http://127.0.0.1:3000')
);
```

![home page](/assets/images/pokvIuVoQV-1024x520.png "home page")

homepage

![contact page](/assets/images/4c3Oe6sO0-1024x546.png "contact page")

Contact Page

## Node Package Manager (NPM)

NPM is the world’s largest software registry. Open-source developers from every continent use npm to share and borrow packages, and many organizations use npm to manage private development as well.

NPM comes as the default package manager with Node.js and gives access to install third-party packages.

We will be using an [express](https://www.npmjs.com/package/express) package in order to make our Node.js server better from a routing perspective and well as to keep the code more managed and modular.

To start with `npm` you need to run the `$ npm init -y` command, it will create a file called `package.json` which will keep track of all the packages we install later.

## Installing NodeMon

You have noticed before whenever we were making any changes to our `app.js` file we had to restart our node.js server. Well, this new package [NodeMon](https://www.npmjs.com/package/nodemon) will be able to resolve this problem.

You can install this package with `npm install nodemon` and you will see another directory created with some packages called `node_modules`.

![directory structure](/assets/images/D5gk3lR9A2.png "directory structure")

We will now quickly open our `package.json` file and make the following changes:

```json
{
  "name": "node",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "start": "nodemon app.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "nodemon": "^2.0.12"
  }
}
```

Instead of running your server with `$ node app.js` you can now run `$ npm start`, it will use the `start` command mentioned under `scripts` object in `package.json`.

Now if you make any changes to your `app.js` file it will automatically restart your Node.js server.

## Useful Links

- [Create Server](https://nodejs.org/dist/latest-v14.x/docs/api/http.html#http_http_createserver_options_requestlistener)

- [Node Package Manager](https://www.npmjs.com/)

- [Nodemon](https://www.npmjs.com/package/nodemon)
