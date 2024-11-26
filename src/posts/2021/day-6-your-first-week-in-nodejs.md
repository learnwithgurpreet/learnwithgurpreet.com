---
title: 'Day 6 (last) - Your first week in NodeJS'
date: 2021-08-10
description: During the course of this series, we have already developed a Node.js application that can be deployed on the cloud.
tags:
  - 'NodeJS Beginner Course'
---

## Prerequisite

1. [Day 1 - Your first week in NodeJS](/posts/day-1-your-first-week-in-nodejs/)
2. [Day 2 - Your first week in NodeJS](/posts/day-2-your-first-week-in-nodejs/)
3. [Day 3 - Your first week in NodeJS](/posts/day-3-your-first-week-in-nodejs/)
4. [Day 4 - Your first week in NodeJS](/posts/day-3-your-first-week-in-nodejs/)
5. [Day 5 - Your first week in NodeJS](/posts/day-5-your-first-week-in-nodejs/)

## Overview

During the course of this series, we have already developed a Node.js application that can be deployed on the cloud.

There are some providers which provide cloud hosting for Node.js applications, we will be using one of those called [Heroku](https://heroku.com/).

Heroku is one of the good options I found in the market which comes with a free DEV account, which you can leverage to start working on small projects or POCs.

### Start with account creation

To use Heroku, you defiantly need an account which can be done from [here](https://signup.heroku.com/login).

Once you have your Heroku account up and running, please create a project after login into your account.

![create a new app](/assets/images/UXERpk00V-1024x586.png "create a new app")

All you need is a unique name here which will become a sub-domain of Heroku, in my case, it will be [https://not-failing.herokuapp.com/](https://not-failing.herokuapp.com/)

## Start with Heroku git setup

Heroku-hosted projects are also based on a git revisioning system, you can simply take checkout of your project and commit your changes.

Since we already have our project developed, we can simply convert it into a Heroku project.

### Install the Heroku CLI

Download and install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line).

If you haven’t already, log in to your Heroku account and follow the prompts to create a new SSH public key.

```bash
$ heroku login
```

#### Create a new Git repository

Initialize a git repository in a new or existing directory

```bash
$ cd my-project/
$ git init
$ heroku git:remote -a not-failing
```

#### Deploy your application

Commit your code to the repository and deploy it to Heroku using Git.

```bash
$ git add .
$ git commit -am "make it better"
$ git push heroku master
```

#### Existing Git repository

For existing repositories, simply add the `heroku` remote

```bash
$ heroku git:remote -a not-failing
```

Since we have the `.env` file on our system and `node_modules`, don’t forget to create a `.gitignore` file with the following content.

You would also need to migrate your `.env` file variables and their values to Heroku environment variables.

There are two ways to set them, let’s check the command line.

```bash
$ heroku config:set MONGO_HOST=my_hostname
$ heroku config:set MONGO_PASS=my_password
$ heroku config:set MONGO_USER=my_username
$ heroku config:set MONGO_DB=my_db_name
```

You can later check your config variables by typing `$ heroku config:get MONGO_HOST`

> Before pushing your code you need to make the following changes in the `app.js` file.

```js
// app.js

// Add a condition to render "dotenv" package only on local
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Get PORT from process variables (to get Heroku PORT)
const PORT = process.env.PORT || 3000;

// Replace hardcoded PORT with variable.
app.listen(PORT);
```

I believe your App is up and running on Heroku now, like mine :)

![welcome page](/assets/images/zQscyTFF-1024x645.png "welcome page")

running app

Hope you liked the series, feel free to drop a comment in case you want me to create another series on another topic.

## Useful Links

- [Claim Free Heroku Account](https://signup.heroku.com/login)
- [Final code](https://github.com/gsin11/NodeJS)
