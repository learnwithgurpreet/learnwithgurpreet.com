---
title: 'Dockerizing a React App in Simple Steps'
date: '2023-05-21'
excerpt: Docker allows you to package your React app along with its dependencies and configuration into a container
tags:
  - 'Tech'
---

Docker allows you to package your React app along with its dependencies and configuration into a container. This ensures that the application runs consistently across different environments, including development, testing, and production.

As we know docker containers are lightweight and encapsulate the entire application stack, including the operating system, runtime environment, and dependencies. This makes it easy to move your React app between different systems and platforms without worrying about compatibility issues.

Let's quickly check how can we ship our react application via docker.

## Step 1: Create a Dockerfile

Start by creating a file named `Dockerfile` in the root directory of your React app. The `Dockerfile` defines the steps needed to build a Docker image for your application.

## Step 2: Specify the base image

In the Dockerfile, specify the base image you want to use. For a React app, you can use a lightweight Node.js base image. For example, you can use the official Node.js Docker image:

```dockerfile
FROM node:14-alpine
```

## Step 3: Set the working directory

Set the working directory inside the Docker image where your application code will be copied. Create the directory if it doesn't exist.

```dockerfile
WORKDIR /app
```

## Step 4: Copy package.json and package-lock.json (or yarn.lock) files

Copy the package.json and package-lock.json (or yarn.lock if you're using Yarn) files to the working directory of the Docker image.

```dockerfile
COPY package*.json ./
```

## Step 5: Install dependencies

Run the package manager (npm or yarn) to install the dependencies specified in the package.json file.

```dockerfile
RUN npm install
```

## Step 6: Copy the application code

Copy the rest of the application code to the Docker image's working directory.

```dockerfile
COPY . .
```

## Step 7: Build the React app

Run the build command for your React app. This will create a production-ready bundle.

```dockerfile
RUN npm run build
```

## Step 8: Expose a port

If your React app needs to listen on a specific port, use the EXPOSE instruction to specify the port number.

```dockerfile
EXPOSE 3000
```

## Step 9: Specify the command to run

Define the command to run when the Docker container starts. Typically, you'll use the `CMD` instruction to run a server that serves the built React app. For example, if you're using `serve` as the server, you can use the following command:

```dockerfile
CMD ["npx", "serve", "-s", "build"]
```

## Step 10: Build the Docker image

Open a terminal or command prompt, navigate to the directory containing the Dockerfile, and run the following command to build the Docker image:

```dockerfile
docker build -t your-image-name .
```

Replace `your-image-name` with the desired name for your Docker image. Run the Docker container: Once the image is built, you can run a container based on that image. Use the following command:

```dockerfile
docker run -p 3000:3000 your-image-name
```

Replace `your-image-name` with the name you provided when building the image.

Your React app should now be Dockerized and running in a Docker container accessible at `http://localhost:3000`.

Note: The above steps provide a general outline for Dockerizing a React app. Depending on your specific project requirements, you may need to make adjustments to the Dockerfile or add additional configuration.
