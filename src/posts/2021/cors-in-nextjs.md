---
title: 'CORS in NextJS'
date: '2021-07-19'
description: Setting up CORS is always a challenge for people who are not really from server-side application backgrounds.
tags:
  - 'Tech'
---

Setting up CORS is always a challenge for people who are not really from server-side application backgrounds. Luckily it wasn’t the case for me, but [Vercel](https://vercel.com/).

I have a couple of projects on Vercel where I can host client-side applications built on ReactJS, NextJS, Gatsby, etc. Recently I found you can host [serverless](https://vercel.com/docs/serverless-functions/introduction) functions on Vercel as well.

These serverless functions are nothing but open up NodeJS server-side script access. You can create a server and run it on Vercel as well as send emails and whatnot.

## How to setup NextJS API

```bash
npx create-next-app --example with-mongodb with-mongodb-app
# or
yarn create next-app --example with-mongodb with-mongodb-app
```

> Example from [with-mongodb](https://github.com/vercel/next.js/tree/canary/examples/with-mongodb)

In the above command, you will get the NextJS project set up inside `with-mongodb-app` directory.

Now we have our application ready, it’s time to set up the MongoDB instance.

You can use [mongodb.com](https://mongodb.com/atlas) to set up a free account with limited space.

## MongoDB setup

Once you have your MongoDB instance ready, feel free to rename and edit `env.local.example` to `.env.local`

Set each variable on `.env.local`:

- `MONGODB_URI` - Your MongoDB connection string. If you are using [MongoDB Atlas](https://mongodb.com/atlas) you can find this by clicking the “Connect” button for your cluster.
- `MONGODB_DB` - The name of the MongoDB database you want to use.

## Run Next.js in development mode

```bash
npm install
npm run dev

# or

yarn install
yarn dev
```

The application should be up and running on [](http://localhost:3000)[http://localhost:3000](http://localhost:3000)

## CORS setup

After setting up the database and server, now it’s time to set CORS settings.

Create `vercel.json` under the root folder.

```bash
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Credentials", "value": "true" },
        { "key": "Access-Control-Allow-Origin", "value": "*" }, // Change this to specific domain for better security
        {
          "key": "Access-Control-Allow-Methods",
          "value": "GET,OPTIONS,PATCH,DELETE,POST,PUT"
        },
        {
          "key": "Access-Control-Allow-Headers",
          "value": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
        }
      ]
    }
  ]
}
```

The above change will work for `GET` requests but you will face problems while making `PUT` and `POST` requests. For this, we need to make one more change.

Go to `/api/index.js` file.

```bash
export default async (req, res) => {
  const { method } = req

  // This will allow OPTIONS request
  if (method === "OPTIONS") {
    return res.status(200).send("ok")
  }
}
```
