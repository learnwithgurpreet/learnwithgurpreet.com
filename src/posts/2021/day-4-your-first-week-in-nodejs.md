---
title: 'Day 4 - Your first week in NodeJS'
date: 2021-08-08
description: I believe by now you are already comfortable with core modules of Node.js and have created your own RESTFul API service.
tags:
  - 'NodeJS Beginner Course'
---

## Prerequisite

1. [Day 1 - Your first week in NodeJS](/posts/day-1-your-first-week-in-nodejs/)
2. [Day 2 - Your first week in NodeJS](/posts/day-2-your-first-week-in-nodejs/)
3. [Day 3 - Your first week in NodeJS](/posts/day-3-your-first-week-in-nodejs/)

## Quick recap

I believe by now you are already comfortable with core modules of Node.js and have created your own RESTFul API service.

It’s time to create a front-end now, which you can use to show users information which we developed in the [last article](https://www.gsin.in/day-3-NodeJS).

## Template engines

Node.js has by default support for template engines, you can add these template engines as an npm package and start using them. It helps to send dynamic data on a template file which you can further process (server-side) and render as an HTML page.

### Serve `html` file as response

```js
// app.js

const app = require('express')();

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.get('/contact.html', (req, res) => {
  res.sendFile(`${__dirname}/contact.html`);
});

app.listen(3000);
```

We are serving `.html` files based on user requests. But you can’t send anything dynamic in these files, and for that, you need a template engine.

To serve dynamic content, we will be using the `ejs` templating engine which is recommended because it is very fast.

You can install it by using `$ npm install ejs`. Now we have `ejs` installed, let’s quickly make some changes to our `app.js` file to integrate it.

You have to do a couple of things here since the EJS template engine looks for the `views` folder, we will create the `views` folder under the root folder of our application.

```json
// package.json

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
    "body-parser": "^1.19.0",
    "ejs": "^3.1.6",
    "express": "^4.17.1",
    "nodemon": "^2.0.12"
  }
}
```

```json
// users.json

[
  {
    "_id": "610ec10c78f7665bfa2cbf11",
    "age": 28,
    "name": "Bobbi Cannon",
    "email": "bobbicannon@dragbot.com"
  },
  {
    "_id": "610ec10ca916e321b1363301",
    "age": 33,
    "name": "Downs Burns",
    "email": "downsburns@dragbot.com"
  }
]
```

### Partials

```html
<!-- views/user.ejs -->

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome | <%= data.name %></title>
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
      ul.users {
        margin: 0;
        padding: 0;
      }
      ul.users li {
        display: block;
        margin-bottom: 1rem;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        text-align: left;
      }
    </style>
  </head>
  <body>
    <h1>Welcome | <%= data.name %></h1>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
    <div class="container">
      <h2>User details</h2>
      <p><strong>Age: </strong><%= data.age || "N/A" %></p>
      <p><strong>Email: </strong><%= data.email || "N/A" %></p>
      <p><a href="/">&LessLess; Back</a></p>
    </div>
  </body>
</html>
```

```html
<!-- views/index.ejs -->

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
      ul.users {
        margin: 0;
        padding: 0;
      }
      ul.users li {
        display: block;
        margin-bottom: 1rem;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        text-align: left;
      }
    </style>
  </head>
  <body>
    <h1>Welcome to my webpage</h1>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
    <div class="container">
      <h2>Active Users</h2>
      <ul class="users">
        <% data.forEach(function(user){ %>
        <li>
          <a href="/user/<%= user._id %>"><%= user.name %> (<%= user.age %>)</a>
        </li>
        <% }); %>
      </ul>
    </div>
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

### Server file `app.js`

```js
// app.js

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let USER_DATA = require('./users.json');

app.set('view engine', 'ejs'); // setting up template engine to ejs

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  if (req.url.includes('/api')) {
    res.append('Content-Type', 'text/json');
  }
  next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

function makeId(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const getUserInfo = id => {
  return USER_DATA.filter(obj => obj._id === id);
};

app.get('/', (req, res) => {
  res.render('index', {
    data: USER_DATA
  });
});

app.get('/user/:id', (req, res) => {
  res.render('user', {
    data: getUserInfo(req.params.id)[0] || {}
  });
});

app.get('/contact', (req, res) => {
  res.sendFile(`${__dirname}/contact.html`);
});

// RESTFul API Services

// get all users
app.get('/api/users', (req, res) => {
  res.send(USER_DATA);
});

// get single user by id
app.get('/api/user/:id', (req, res) => {
  res.send(getUserInfo(req.params.id));
});

// delete single user by id
app.delete('/api/user/:id', (req, res) => {
  const index = USER_DATA.findIndex(obj => obj._id === req.params.id);
  res.send(USER_DATA.splice(index, 1));
});

// add new user
app.post('/api/user', (req, res) => {
  const {name, age, email} = req.body;
  if (name && age && email) {
    USER_DATA = [
      ...USER_DATA,
      {
        _id: makeId(24),
        age,
        name,
        email
      }
    ];
    res.send(USER_DATA);
  } else {
    res.status(500).send('error, user not added.');
  }
});

app.listen(3000);
```

### Snapshots

![contact page](/assets/images/4c3Oe6sO0-1024x546.png "contact page")

contact page

![user details](/assets/images/KuCLn8OPP-1024x602.png "user details")

user details

## Middleware and static assets

You have seen in the above templates we are using CSS as inline, in this segment we will include CSS files as static assets as well as images.

First, we need to move inline CSS styles to an external stylesheet.

```css
/* assets/styles.css */

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
ul.users {
  margin: 0;
  padding: 0;
}
ul.users li {
  display: block;
  margin-bottom: 1rem;
}
.container {
  max-width: 600px;
  margin: 0 auto;
  text-align: left;
}
```

Now we can include `styles.css` files `<link href="/assets/styles.css" rel="stylesheet" type="text/css" />` in all templates and HTML files.

Now we need to inform our server that we are going to load the static files. By using the `app.use` function we can call `express.static` middleware to include static files.

```js
// add this in your app.js

app.use('/assets', express.static('assets'));
```

Now you can restart your server and will see another request in networks for the CSS file. Similarly, you can include images/videos, etc.

> You can create more routes with add/delete user functionality as follow:

- Create a new route `/user/add` followed by a form to add new users.
- Provide a button to delete an existing user by invoking API `user/:id` with the `DELETE` method.

## Useful Links

- [ejs template engine](https://ejs.co/)
