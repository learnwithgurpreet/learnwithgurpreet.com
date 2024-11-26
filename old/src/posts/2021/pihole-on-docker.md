---
title: 'PiHole on Docker'
date: '2021-05-21'
description: My follow-up article to Up and running with RaspberryPi with Docker. Previously, I showed configuring docker and docker-compose on RaspberryPi.
tags:
  - 'Raspberry PI'
---

This article is my follow-up article to [Up and running with RaspberryPi with Docker](/posts/up-and-running-with-raspberrypi-with-docker/). In the previous article, I showed how you can configure docker and docker-compose on your RaspberryPi.

Let's check how to restrict external traffic from your RaspberryPi with [PiHole](https://hub.docker.com/r/pihole/pihole) using docker and docker-compose.

## Installation

The first step to defining a place where you want to install PiHole. In my case, I am going to keep it under the `~` path.

```bash
$ cd ~
$ mkdir pihole
$ cd pihole
$ touch docker-compose.yml
```

Once you create the _docker-compose.yml_ file inside the _pihole_ directory, add the following code into it.

```bash
$ nano docker-compose.yml
```

```yml
version: '3'

services:
  pihole:
    container_name: pihole
    image: pihole/pihole:latest
    ports:
      - '53:53/tcp'
      - '53:53/udp'
      - '67:67/udp'
      - '80:80/tcp'
    environment:
      TZ: 'America/Chicago'
      WEBPASSWORD: 'strongPassword'
    volumes:
      - './etc-pihole/:/etc/pihole/'
      - './etc-dnsmasq.d/:/etc/dnsmasq.d/'
    cap_add:
      - NET_ADMIN
    restart: unless-stopped
```

After saving the _docker-compose.yml_ file, you can run the following command to bring your PiHole server up and running.

```bash
$ docker-compose up --detach
```

> Initial run will take some time since it will download the PiHole image from docker.

After a successful run, you can check PiHole instance is running on RaspberryPi as a docker service.

```bash
# Try following commands to check PiHole service

$ docker ps
# To check the list of running containers

$ docker images
# To check PiHole image
```

If you have static IP defined [configured in my previous article](https://learnwithgurpreet.com/posts/up-and-running-with-raspberrypi-with-docker/) then you can access PiHole, at [http://192.168.0.4/admin](http://192.168.0.4/admin)

## Configure devices

After the installation of PiHole now we need to map other devices to use PiHole as the default gateway. For that, you can go to the network/Wifi settings of your individual devices and add **192.168.0.4** IP address to the DNS list (should be on top). See the example below:

{% eleventyImage "./src/assets/images/blog/Ijzg5OW20.png", "network setup" %}

DNS settings on MAC

Thanks for following the tutorial, happy coding!
