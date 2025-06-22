---
title: 'Express.js + EJS complete solution'
date: '2021-03-02'
description: People who have less time to invest and are familiar with the Handlebar template engine can quickly set up their website.
tags:
  - 'NodeJS'
---

People who have less time to invest and are familiar with the Handlebar template engine can quickly set up their website.

Let’s directly jump to work!

## Prerequisites

- Up and running [Node.js](https://nodejs.org/en/download/)

## Project structure

```yml
# setup project structure

app
|-- public
- styles.css
|-- views
- index.ejs
-- components
- header.ejs
- footer.ejs
|- app.js
|- data.json
```

Once you create the above file/folder structure we will start configuring our server by installing node modules.

## NPM scripts

```bash
# initialize npm (please follow the steps)
$ npm init
```

After executing the above command you will see the `package.json` file inside the root directory of your project in your case `app/package.json`.

Now we can start installing our node modules.

```bash
$ npm i ejs express
```

After you install the above two modules, your `package.json` file should look like this.

```json
/* package.json */

{
  "name": "expressjs-ejs-project",
  "version": "0.0.1",
  "description": "",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {},
  "dependencies": {
    "ejs": "^3.1.6",
    "express": "^4.17.1"
  }
}
```

## Server setup

```js
/* app.js */

const express = require('express');
const server = express();
const data = require('./data.json');

const PORT = process.env.PORT || 3000;

server.set('view engine', 'ejs');
server.use(express.static(__dirname + '/public'));

server.get('/', (req, res) => {
  res.render('index', {data: {nav: data.nav, page: data.pages.index}});
});

server.get('/contact', (req, res) => {
  res.render('index', {data: {nav: data.nav, page: data.pages.contact}});
});

server.get('/about', (req, res) => {
  res.render('index', {data: {nav: data.nav, page: data.pages.about}});
});

server.listen(PORT, () => {
  console.log(`Sever is started on ${PORT}`);
});
```

```json
/* data.json */

{
  "nav": [
    {
      "label": "Home",
      "url": "/"
    },
    {
      "label": "Contact",
      "url": "/contact"
    },
    {
      "label": "About",
      "url": "/about"
    }
  ],
  "pages": {
    "index": {
      "title": "Welcome to my website",
      "details": "Dummy text: Its function as a filler or as a tool for comparing the visual impression of different typefaces"
    },
    "contact": {
      "title": "Welcome to my website | Contact",
      "details": "The most well-known dummy text is the 'Lorem Ipsum', which is said to have originated in the 16th century."
    },
    "about": {
      "title": "Welcome to my website | About",
      "details": "One disadvantage of Lorum Ipsum is that in Latin certain letters appear more frequently than others - which creates a distinct visual impression."
    }
  }
}
```

```html
<!-- views/index.ejs -->

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><%=data.page.title%></title>
    <link rel="stylesheet" type="text/css" href="css/style.css" />
  </head>

  <body>
    <%- include("components/header"); %>
    <main>
      <h1><%=data.page.title%></h1>
      <p><%=data.page.details%></p>
    </main>
    <%- include("components/footer"); %>
  </body>
</html>
```

```html
<!-- views/conponents/header.ejs -->

<header>
  <ul>
    <% data.nav.forEach((item)=> { %>
    <li><a href="<%= item.url %>"> <%= item.label %> </a></li>
    <% }) %>
  </ul>
</header>
```

```html
<!-- views/conponents/footer.ejs -->

<footer>
  <p>Made with ❤️ and ExpressJS and EJS</p>
</footer>
```

```css
/* public/css/style.css */

body {
  margin: 0 auto;
  padding: 2rem;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

ul li {
  display: inline-block;
  padding: 0.3rem;
}

header,
footer {
  display: flex;
  align-items: center;
  height: 10rem;
}

footer p {
  width: 100%;
  text-align: center;
}
```

## Run your application

After doing all the above stuff, it’s time to run your website on the local machine.

`$ npm start`

After running the above command you will see you’re server has been started on the `3000` port and accessible through `http://localhost:3000/`

Wish you all the best, in case you have any question feel free to drop them below or use my contact page.
