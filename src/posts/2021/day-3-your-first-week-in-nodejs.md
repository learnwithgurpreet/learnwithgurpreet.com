---
title: 'Day 3 - Your first week in NodeJS'
date: 2021-08-07
excerpt: I believe you have already read my previous article where I explained, how to spin up a Node.js server instance
tags:
  - 'NodeJS Beginner Course'
---

## Prerequisite

1. [Day 1 - Your first week in NodeJS](/posts/day-1-your-first-week-in-nodejs/)
2. [Day 2 - Your first week in NodeJS](/posts/day-2-your-first-week-in-nodejs/)

I believe you have already read my previous article where I explained, how to spin up a Node.js server instance, serve HTML/JSON data via an endpoint, basic routing, npm, and nodemon from creating custom modules, event handling, and file read/write operations. Let’s jump on today’s topic and write the code together.

## Start with express.js

It’s one of the most popular routing systems. It can be integrated with many template engines. It also contains a middleware framework, which helps to enhance security features.

Just install express with `$ npm i express`:

```js
// app.js

const express = require('express');
const app = express();

app.listen(3000);
```

With the above code, your express.js server is ready to serve requests on the `3000` port. But it won’t serve any request alone unless you provide proper routing to it.

## express.js routes

Routes are a very important part of the express.js setup. It helps you to make your entire architecture modularize. See below express, where you will see how we gonna server HTML and JSON requests together from a single server instance.

```js
// app.js

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('This is homepage');
});

app.get('/contact', (req, res) => {
  res.send('This is contact page');
});

app.get('/api/users', (req, res) => {
  res.setHeader('Content-Type', 'text/json');
  res.send(
    JSON.stringify([
      {
        id: 3,
        username: 'demo_user',
        email: 'demo@demo.com',
        phone_number: '+49 123 4567 890'
      },
      {
        id: 2,
        username: 'james',
        email: 'james@demo.com',
        phone_number: '+49 765 111 999'
      }
    ])
  );
});

app.listen(3000);
```

## Creating REST API

Similarly, we can now create our rest API to handle user-specific requests: Since we are not using any database, we can create a static JSON file for initial set of users `users.json`.

```json
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

Now we have `users.json` in place we need two new packages.

- [body-parser](https://www.npmjs.com/package/body-parser) - To get `form-data` from `POST` request.
- [objectid](https://www.npmjs.com/package/objectid) - To create dynamic unique `_id` (You can skip, when you have a database in place. eg: MongoDB, Firebase, etc.)

```js
// app.js

const express = require('express');
const bodyParser = require('body-parser');
const objectid = require('objectid');

const app = express();

let USER_DATA = require('./users.json');

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  res.append('Content-Type', 'text/json');
  next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// get all users
app.get('/api/users', (req, res) => {
  res.send(USER_DATA);
});

// get single user by id
app.get('/api/user/:id', (req, res) => {
  res.send(USER_DATA.filter(obj => obj._id === req.params.id));
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
        _id: objectid(),
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

The initial set of users will be loaded from the file then you can add/remove users based on API requests.

### `GET` request

You can use postman software to make these requests to check your API:

`http://localhost:3000/api/users`

```json
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

### `POST` request (Add user)

`http://localhost:3000/api/user`

```json
// data

{
  "name": "Gurpreet Singh",
  "age": "21",
  "email": "yes@demo.com"
}
```

```json
// response

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
  },
  {
    "_id": "610eca22f75a370000000001",
    "age": "121",
    "name": "Gurpreet Singh",
    "email": "yes@demo.com"
  }
]
```

### `DELETE` request (delete user)

`http://localhost:3000/api/user/<id>`

`http://localhost:3000/api/user/610eca22f75a370000000001`

```json
// response

[
  {
    "_id": "610eca22f75a370000000001",
    "age": "121",
    "name": "Gurpreet Singh",
    "email": "yes@demo.com"
  }
]
```

> Note: Since we are not using any real database, hence this server only keeps data unless you restart.

You can practice the last method of REST `PUT` in order to update any user record.

Happy coding!
