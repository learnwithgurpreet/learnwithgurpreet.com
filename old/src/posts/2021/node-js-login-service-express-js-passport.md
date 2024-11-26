---
title: 'Node.js Login Service (express.js + passport)'
date: '2021-03-19'
description: I often see developers struggle or invest too much time to create authorization modules in their Node.js applications.
tags:
  - 'NodeJS'
---

These days I often see developers struggle or invest too much time to create proper authorization modules in their Node.js based applications. With this detailed tutorial, you will be able to create your authorization module which can be used in any route or sub-route of your application.

Let me take you through the step-by-step setup.

> You can check running application [here](https://nodejs-login-service.herokuapp.com/)

## Project structure

```yml
# Create the following project structure

app
|-- includes
- header.ejs
|-- public
|-- styles
- global.css
|-- views
- index.ejs
- login.ejs
- register.ejs
|- index.js
|- passport-config.js
|- package.json
|- .env
|- .gitignore
```

After having the above structure in place, it’s time to configure `npm` by triggering `npm init` (will update this file later while installing new modules)

## Install packages

Please install the following packages with node commands.

```bash
$ npm i bcrypt ejs express express-flash express-session passport passport-local

$ npm --save-dev i dotenv nodemon
```

So basically I installed some of the modules as dependencies and two modules are installed as DEV dependencies only since they are not required in the final application bundle.

Your `package.json` the file should look like this now.

```json
{
  "name": "nodejs-login-service",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "NODE_ENV=development && nodemon index.js",
    "start": "node index.js"
  },
  "author": "",
  "license": "ISC",
  "engines": {
    "node": "10.16.2"
  },
  "dependencies": {
    "bcrypt": "^5.0.1",
    "ejs": "^3.1.6",
    "express": "^4.17.1",
    "express-flash": "0.0.2",
    "express-session": "^1.17.1",
    "passport": "^0.4.1",
    "passport-local": "^1.0.0"
  },
  "devDependencies": {
    "dotenv": "^8.2.0",
    "nodemon": "^2.0.7"
  }
}
```

## Server setup

```js
// index.js

// This is only require on local machine
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const bcrypt = require('bcrypt');
const express = require('express');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const initPassport = require('./passport-config');

// Initialize Passport module
initPassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
);

// Initialize express.js
const app = express();

// Setup template engine to ejs
app.set('view-engine', 'ejs');

// Setup static path for global.css file include
app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({extended: false}));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 3000;
const users = [];

app.get('/', checkAuthenticated, (req, res) => {
  res.render('index.ejs', {name: req.user.name});
});

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs');
});

app.post(
  '/login',
  checkNotAuthenticated,
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })
);

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs');
});

app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPwd = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPwd
    });
    res.redirect('/login');
  } catch {
    res.redirect('/register');
  }
});

app.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/login');
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  next();
}

app.listen(PORT, () => {
  console.log(`App is running on localhost:${PORT}`);
});
```

## Passport module setup

After configuring express.js-based node.js server it’s time to configure your passport module with passport-local settings.

```js
// passport-config.js

const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function init(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    const user = getUserByEmail(email);
    if (user === null) {
      return done(null, false, {message: 'No user with that email'});
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, {message: 'Password incorrect'});
      }
    } catch (e) {
      return done(e);
    }
  };
  passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    done(null, getUserById(id));
  });
}

module.exports = init;
```

## Local env file setup

```bash
SESSION_SECRET=<some random string>
```

> These secret keys shouldn’t be visible to others, so please put this in the `.gitignore` file.

```bash
node_modules
.env
```

## Configure views

```html
<!-- index.ejs -->

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="../styles/global.css" />
    <title>Welcome <%= name %></title>
  </head>

  <body>
    <%- include('../includes/header', {name: name}); -%>
    <main>
      <h1>Welcome <b> <%= name %> </b></h1>
      <p>You are just logged in using express.js+passport service.</p>
    </main>
  </body>
</html>
```

```html
<!-- login.ejs -->

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Login Page</title>
    <link rel="stylesheet" type="text/css" href="../styles/global.css" />
  </head>

  <body>
    <%- include('../includes/header', {name: null}); -%>
    <main>
      <% if(messages.error) { %> <%= messages.error %> <% } %>
      <h1>Login</h1>
      <form action="/login" method="POST">
        <span> Login if you have account </span>
        <input type="email" id="email" name="email" placeholder="Email" required />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit" class="btn primary large">Login</button>
      </form>
    </main>
  </body>
</html>
```

```html
<!-- register.ejs -->

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Registration Page</title>
    <link rel="stylesheet" type="text/css" href="../styles/global.css" />
  </head>

  <body>
    <%- include('../includes/header', {name: null}); -%>
    <main>
      <h1>Register</h1>
      <form action="/register" method="POST">
        <span> Register if you don't have account </span>
        <input type="text" id="name" name="name" placeholder="Name" required />
        <input type="email" id="email" name="email" placeholder="Email" required />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit" class="btn primary large">Register</button>
      </form>
    </main>
  </body>
</html>
```

## Global includes

```html
<!-- header.ejs -->

<header>
  <a href="/" class="logo">GS</a>
  <button type="button" class="mobile-menu" onclick="toggle(this);"></button>
  <nav>
    <% if(name) { %>
    <p class="bold">Welcome <%= name %></p>
    <a href="/">Home</a>
    <a href="/logout">Logout</a>
    <% } else { %>
    <a href="/login">Login</a>
    <a href="/register">Register</a>
    <% } %>
  </nav>
</header>
<script>
  function toggle(element) {
    element.classList.toggle('open');
    document.getElementsByTagName('nav')[0].classList.toggle('open');
  }
</script>
```

## Global CSS file

```css
/* public/styles/global.css */

:root {
  --primary: #f8049c;
  --secondary: #fdd54f;
  --body-bg: white;
  --body-font: black;
  --gray: #eee;
}

header {
  height: 60px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  padding: 0 16px;
  position: fixed;
  top: 0;
  background-image: linear-gradient(to right, var(--primary), var(--secondary));
}

nav {
  display: none;
  font-family: 'Open Sans';
  position: absolute;
  width: 100%;
  top: 60px;
  left: 0;
  padding: 8px;
  box-sizing: border-box;
  border-bottom: 3px solid var(--secondary);
  background: var(--body-bg);
}

nav.open {
  display: block;
}

a {
  padding: 4px 8px;
  display: block;
  text-align: center;
  margin: auto 0;
  color: var(--body-font);
  font-weight: 400;
}

a.active {
  font-weight: 700;
}

button.mobile-menu {
  display: block;
  right: 0;
  position: absolute;
  top: 50%;
  width: 45px;
  transform: translate(-50%, -50%);
  background-color: transparent;
  border-width: 0px;
}

button.mobile-menu:before,
button.mobile-menu:after {
  background-color: var(--body-font);
  content: '';
  display: block;
  height: 4px;
  transition: all 200ms ease-in-out;
}

button.mobile-menu:before {
  box-shadow: 0 10px 0 var(--body-font);
  margin-bottom: 16px;
}

button.mobile-menu.open:before {
  box-shadow: 0 0 0 var(--body-font);
  transform: translateY(10px) rotate(45deg);
}

button.mobile-menu.open:after {
  transform: translateY(-10px) rotate(-45deg);
}

a.logo {
  width: 25px;
  height: 25px;
  display: block;
  color: var(--body-bg);
  background-color: var(--body-font);
  box-shadow: 0 0 10px var(--body-font);
  border-radius: 50%;
  line-height: 1.5;
  text-align: center;
  margin-top: 8px;
  padding: 10px;
}

form:not(.no-style) {
  width: 100%;
  max-width: 400px;
  background: var(--body-bg);
  border: 1px solid var(--gray);
  padding: 16px;
  box-sizing: border-box;
  color: var(--body-font);
  border-radius: 4px;
}

.alt-text {
  text-align: center;
  margin: 10px 0;
}

main {
  max-width: 800px;
  margin: 80px auto 0 auto;
  padding: 0 16px;
  box-sizing: border-box;
}

input {
  margin-top: 20px;
  padding: 4px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
  font-family: 'Open Sans';
  margin-bottom: 8px;
  width: 100%;
  box-sizing: border-box;
  height: 40px;
}

button.btn {
  color: var(--body-bg);
  font-weight: bold;
  box-shadow: none;
  border: none;
  width: 100%;
  display: block;
  padding: 8px;
  border-radius: 4px;
  font-size: 1em;
  cursor: pointer;
}

.bold {
  font-weight: 700;
}

.link {
  background-color: transparent;
  border: 0;
  text-decoration: underline;
  cursor: pointer;
}

button.primary {
  background: var(--primary);
}

button.secondary {
  background: var(--secondary);
}

button.large {
  padding: 10px;
  border-radius: 5px;
  font-size: 1.5em;
}

@media (min-width: 768px) {
  nav {
    display: flex;
    position: relative;
    width: initial;
    border-bottom: none;
    margin: auto 0 auto auto;
    background: none;
    left: initial;
    top: initial;
  }

  button.mobile-menu {
    display: none;
  }
}
```

## Show time

It’s time to run the code, open the project in the terminal/command line, and trigger the `npm run dev` command in order to run the project in dev mode (it will use `nodemon`).

## Deployment

If you find your project is running fine, then you can deploy it on any nodejs based hosting partner. I am using a free Heroku instance to host this project. You can check the running application here: [https://nodejs-login-service.herokuapp.com/](https://nodejs-login-service.herokuapp.com/)

_Make sure to add environment variables into your pipeline (Config Vars in Heroku)_
