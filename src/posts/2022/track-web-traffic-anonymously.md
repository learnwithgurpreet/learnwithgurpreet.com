---
title: 'Track web traffic anonymously'
date: '2022-06-27'
description: Implementing analytics on any web platform is not a difficult job but keeping it privacy-focused is
tags:
  - 'Privacy'
---

Implementing analytics on any web platform is not a difficult job but keeping it privacy-focused is. Considering the privacy of individual users, we should always think twice before considering any platform. I would like to divide this article into two main categories. First, we will talk about some industry-leading analytics tools, second will jump on open source solutions.

## Industry-leading tools

You must have seen Google Analytics on many websites, which is one of the free<sup>\*</sup> solutions for developers. When it comes to privacy, Google is not a good option to opt for, you can check my previous article: [Can we use Google services without compromising privacy?](/posts/can-we-use-google-services-without-compromising-privacy).

Some sites are enabled with Google Ads as well as Google Analytics which is helping the Google algorithm to get the most out of it. Google keeps cookies on your browser which helps Google to track your activities, even on other sites.

Going with free options like Google, you might not be sure how Google will use your data. Since you took free service you need to pay the cost by data.

On the other side, we have some paid options like Adobe Analytics. It comes with great features, but having adobe analytics on a web platform is not an easy job for small businesses. Adobe comes with its license cost, which is not easy to procure for small businesses.

Mostly these tools keep your data on their own servers (Eg. [SAAS](https://en.wikipedia.org/wiki/Software_as_a_service)), so you don't have direct control over your data. In some cases it is fine, but in countries like Germany where data privacy laws are very strong you need to inform end-users that all information you are taking from them and where it is going to be used.

## Open source solution

I recently came across an open-source analytics tool called **[umami.is](https://umami.is/)** which is a self-hosted solution. It gives you full access to the data which is being collected from end-users. By default, this tool collects data in an anonymous manner, without creating any third-party cookie.

Their goal is to provide you with a friendlier, privacy-focused alternative to Google Analytics and a free, open-sourced alternative to paid solutions.

![Umami tool example screenshot](/assets/images/blog/umami-about-screenshot.png "Umami tool example screenshot")

<small class="text-center block">Screenshot from [umami.is](https://umami.is/)</small>

Data that is being collected by the tool can be exposed over a public URL so that your website users can also see that is being stored in analytics. Example: [https://app.umami.is/share/ISgW2qz8/flightphp.com](https://app.umami.is/share/ISgW2qz8/flightphp.com).

You can find more about this tool on their website: [https://umami.is/docs/features](https://umami.is/docs/features).

## Resource

There are some alternatives available for Google analytics that works like Umami.

### Matomo

[Matomo](https://matomo.org/) It comes with flexibility, which helps you to define your own custom measures. Like umami, it offers on-premises hosting which is free.

### Open web analytics

[Open Web Analytics](https://www.openwebanalytics.com/) is the free and open-source web analytics framework that lets you stay in control of how your instrument and analyze the use of your websites and application.

### Plausible

Like Umami, [Plausible](https://plausible.io/) is slightly new in open-source analytics tools. It is fast, and only collects a small amount of information - that includes numbers of unique visitors and the top pages they visited, the number of page views, the bounce rate, and referrers. Plausible is simple and very focused.
