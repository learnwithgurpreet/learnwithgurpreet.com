---
title: 'Are you logging your NodeJS code?'
date: '2021-01-16'
description: Logs are an essential part of an application, it provides you deep level access
tags:
  - 'NodeJS'
---

Logs are an essential part of an application, it provides you deep level access of output comes from user inputs. When the application is in production, logs are important to identify the problem if something goes wrong. If you are a developer, have you asked yourself a question, “Am I logging or not?”

## Why Logs are important?

No matter how careful we are while developing an application, it is quite difficult to make it 100% bug-free. Even after spending time to find defects in the test cycle, we still won’t be able to catch all of them.

These remaining errors may cause unexpected exceptions in a production environment. In some cases, your application might crash in certain user journeys. It is always a good idea to keep an extra eye on the application flow.

In order to achieve success, we use application logs to check why the application is behaving differently. For this, we have to set up our application to record information about its events and errors. This is what we call a logger, it helps us to identify problems with an application running in production.

> Best Practices

### Avoid using `console.log()`

There are some important things we need to consider while configuring logs in the application. Adding logs with `console.log()` won’t stay for a longer period of time. They are available till the time user refreshes the page. `console.log()` can be used for temporary logging since it provides in-memory logs which can be easily read through the terminal since it uses stdout. Similarly `console.error` or `console.warn` can also be used but you can’t store these logs into any file or database.

Hence, `console.log` doesn’t provide us enough options to use it as a primary logging system. You should consider the proper library to use as a logging system.

### Third-party libraries

Dedicated libraries unlike `console.log` provide us adequate options to define and configure the logging system.

- Levels: It offers different levels of logging, example you can use several levels of logging like, `info`, `warn`, `debug`, and `error`. This helps to filter the problems.
- Appearance: You can use different colors and appearances to distinguish your logs. Data types: Not only appearance, but you can also make your logs different in type. Some libraries support JSON format as well.

[Winston](https://www.npmjs.com/package/winston) and [Bunyan](https://www.npmjs.com/package/bunyan) are two of the most popular logging libraries available for Node applications.

### Source, Timestamps, Context

Logging is not only to log text when exception or success comes, there are 3 important aspects that make them more useful when it comes to debugging.

- Source: While debugging the application through logs it is important to know what is the source of a particular log. Hence, it is important to keep, hostname, method, the module name.
- Timestamps: Timestamps plays a very important role while debugging an application because it helps you to identify at what timeframe error happened. In the world of microservices, it is important to keep timestamps because requests are not sequential but async.
- Context: These types of errors/exceptions come based on users’ inputs. For example, when the user is trying to register in an application but registration failed due to he/she is already a registered user or provided email address is wrong etc. So, application behavior was expected but the user was not able to register.

### Logging levels

Use different levels of logs to distinguish them, so developers can easily understand them while debugging the application.

- Emergency: the system is unusable
- Alert: action must be taken immediately
- Critical: critical conditions
- Error: error conditions
- Warning: warning conditions
- Notice: normal but significant conditions
- Informational: informational messages
- Debug: debug-level messages

You can still alter these levels upon your needs.

### What shouldn’t be part of logs

There are some obvious mistakes developers does while configuring loggings. One shouldn’t log any [PII](https://en.wikipedia.org/wiki/Personal_data) data while logging requests or exceptions. I would like to share some bad and good examples of logging.

#### Bad Example 🚫

```js
const express = require('express');
const winston = require('winston');
const app = express();

// configuring logger
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({filename: 'combined.log'})
  ]
});

app.post('/user/add', (req, res) => {
  try {
    modal
      .addUser({
        email: req.email,
        password: req.pwd
      })
      .then(() => {
        logger.log({
          level: 'info',
          message: `${req.email} with password ${pwd} has been successfully registered`
        });
        res.send(200);
      });
  } catch (err) {
    logger.log({
      level: 'error',
      message: `${req.email} with password ${pwd} wasn't registered`
    });
  }
});
```

#### Good Example ✅

```js
const express = require('express');
const winston = require('winston');
const app = express();

// configuring logger
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({filename: 'combined.log'})
  ]
});

app.post('/user/add', (req, res) => {
  try {
    modal
      .addUser({
        email: req.email,
        password: req.pwd
      })
      .then(response => {
        logger.log({
          level: 'info',
          message: `Success: ${response.data.id} user has been successfully registered`
        });
        res.send(200);
      });
  } catch (err) {
    logger.log({
      level: 'error',
      message: `An exception occurred while registering new user: ${err}`
    });
  }
});
```

## Conclusion

All I can say that it is important to have a proper logging system set up in the application. This can make a developer’s life easier to debug any problem in the production environment with less turnaround time.
