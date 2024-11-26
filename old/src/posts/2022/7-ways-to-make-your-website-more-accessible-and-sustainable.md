---
title: '7 ways to make your website more accessible and sustainable'
date: '2022-05-21'
description: We often talk about sustainability and try to decrease our CO₂
tags:
  - 'Sustainability'
---

I recently gave a talk in my organization [Publicis Sapient](https://www.publicissapient.com/), hence thought to write a blog post to extend my message to a wider audience.

We often talk about sustainability and try to decrease our CO₂ footprints by driving eco-friendly cars, going vegan, etc., but when it comes to the web we always think of using more powerful servers and memories (RAM) so our web platform always is available to users.

There is no problem having such expectations but at the same time, we forget about the environment and other key factories which are left behind.

> If the Internet was a country, it would be the 7th largest polluter
> sustainablewebmanifesto.com

Before going further, you need to understand your **Digital Carbon Foot Print**

During the pandemic, we increased our digital carbon footprint. From an organization's perspective, its digital footprint grows when they produce content, shares marketing updates, hosts virtual workshops, etc.

A single image on a webpage can emit as much as 50 grams of CO₂e (e = "equivalent" to include greenhouse gases beyond just carbon dioxide.)

It looks very small, but imagine, a page having 5 images, will produce 225 grams of CO₂e which is sufficient for an electric car to drive up to 10 Kms.

Everything that makes your page faster, more accessible or easier to find, reduces your web-services carbon footprint.

## 1. Web Accessibility

It is a basic right of the user to be presented with an accessible platform over the internet. Accessibility should be implemented for all users.

- **Keyboard Support:** Mostly people are using the mouse when it comes to scrolling or navigating through webpages, but there is a large number of people (including me) who still navigate webpages with the help of a keyboard. It makes it easier to navigate through form fields, hyperlinks, etc.
- **Native vs. Custom elements:** HTML5 has introduced lots of out-of-the-box web-accessible tags: `<dialog />` `<meter />` `<mark />` . It is time to start switching to these tags since most modern browsers have support for them.
- **NEVER forget** `**alt**` **attribute:** We are in the year 2022 and still some CMS and authors are forgetting to provide alternate text (AKA alt attribute) in images. This text plays a crucial role when it comes to screen readers. It is also fine if you don’t have an appropriate description or if an image is being used for decoration only then keep it blank.
- `**<table>**` **vs.** `**<div>**`**:** It is important to understand the usage of both tags, `<table>` should use to render tabular data only, for example, user records, etc. On the other side, `<div>` should only be used to define page layouts and content divisions.

Nevertheless, your website should follow [WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/) standards in order to serve user needs.

## 2. Search Engine Optimization (SEO)

Most users these days search content on search engines like Google, DuckDuckGo, Bing, etc. Hence, the application should have good SEO implementation. It helps to reduce the CO₂ footprints because the faster you search for what you need the lower CO₂ will get produced.

- Try to keep your content short and to the point.
- Avoid image to show text based content, if needed please use proper `alt` attributes to describe what is being shown in the image.
- Try to adapt [schema.org](https://schema.org/) guidelines.
- Schema example of Video Object can be found on [schema.org](https://schema.org/VideoObject).

## 3. Copy Writing

Like SEO, you can achieve good or appropriate traffic by adding proper copy to your web pages. In case you are not sure about your content, hire content writers, and get your text converted to local languages.

As per WCAG, easy language is mandatory/required for some public offices like in Germany. See here: [https://www.stadt-koeln.de/leben-in-koeln/soziales/informationen-leichter-sprache?kontrast=schwarz](https://www.stadt-koeln.de/leben-in-koeln/soziales/informationen-leichter-sprache?kontrast=schwarz)

## 4. Autoplay Videos

Some websites, especially news and media are showing auto-play videos. Sometimes, you don’t even want those videos to run on your browsers, still, they are coming.

The better option is to have a video transcript available even before clicking on the play button. Especially users who are using screen readers can upfront check the content of the video before really going through the entire video and downloading that 10MB of data.

{% eleventyImage "./src/assets/images/blog/interactive-transcript.png", "Video transcript example from w3.org" %}

Video transcript example from w3.org

Latest privacy enforcing browsers like Brave, and Firefox has features to restrict auto-play-related problems. As a user, you can also contribute by using such strict modes in browsers.

Note: By using strict modes in browsers you might not able to use all the websites properly.

## 5. Custom vs. System fonts

Every client wants their platform to adhere to their brand guidelines and sometimes to achieve that we ended up with a bunch of custom fonts that simply decrease the page load time. Not only that but it also increases the carbon footprint by draining your battery.

If you are using google fonts you need different variations for each instance to support different char-sets (languages). See below:

```css
/* devanagari */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJbecnFHGPezSQ.woff2)
    format('woff2');
  unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9,
    U+25CC, U+A830-A839, U+A8E0-A8FB;
}
/* latin-ext */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJnecnFHGPezSQ.woff2)
    format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF,
    U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfecnFHGPc.woff2)
    format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
    U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* devanagari */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLCz7Z11lFd2JQEl8qw.woff2)
    format('woff2');
  unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9,
    U+25CC, U+A830-A839, U+A8E0-A8FB;
}
/* latin-ext */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLCz7Z1JlFd2JQEl8qw.woff2)
    format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF,
    U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLCz7Z1xlFd2JQEk.woff2)
    format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
    U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
```

## GDPR Issues

Google fonts are heavily being used on web applications. In recent times, a website was fined by the German court for leaking visitors' IP addresses via Google fonts.

Source: [https://www.theregister.com/2022/01/31/website_fine_google_fonts_gdpr/](https://www.theregister.com/2022/01/31/website_fine_google_fonts_gdpr/)

## Longer Rendering time

When we are using custom fonts, they tend to be downloaded in every request (yes you can cache them). Imagine a website has 3 fonts in 3 different variations, which means your browser has to down 3x3, 9 fonts in total.

## Language support

Systems fonts come with out-of-the-box support for all the locales, wherein if you are using custom fonts, you might not get support for all local languages.

## Variable fonts

Instead of adding different fonts for features like weight, width, and optical size, you can simply use _variable fonts_, and create your own variations in CSS:

```css
/* Variable weight */
font-variation-settings: 'wght' 375;

/* Variable Italics */
font-variation-settings: 'ital' 1;

/* Variable Slant */
font-variation-settings: 'slnt' 14;

/* Optical Size */
font-variation-settings: 'opsz' 36;
```

See Example here: [v-fonts.com/fonts/helvetica-now-variable](https://v-fonts.com/fonts/helvetica-now-variable)

## 6. Green Web Hosting

Hosting also plays important role in the overall carbon footprint. You can control this by choosing a Green hosting provider, there are some providers who are using energy from natural resources.

Secondly, you can also restrict yourself by occupying fixed server resources and memory allocations. Instead, choose pay as you go since it dynamically calculates your needs and bill you accordingly.

For Example, [ionos.com](https://www.ionos.com/) runs its servers on Green energy resources.

## 7. Dark Mode

Some mobile users are having OLED screens that use less battery, which is useful when it comes to dark modes. It simply turns the pixels off wherever black color is needed vs. lightening up them in black color. A classic example is to detect a user's machine preference and choose the preferred one.

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-light: #111;
    --color-dark: #fefefe;
  }
  img[src*='.png'] {
    filter: invert(1);
  }
}
```

It also helps readers who love reading before going to bed :)

## GoTo platform

You don't need to be a technology expert to run an online business. Digital.com does the research for you, comparing the best products, services, and software to start or grow your small business website or online store.

Digital.com clarifies your options as you choose the right services to run your business – saving you time and money. Digital.com stands out because our team of researchers, writers, and experts have experience running online businesses and using software to meet their business goals.

Real-life experience is the foundation of Digital.com's reviews:

- They obtained trial accounts for each product so that our researchers could experience the onboarding process and user flow.
- They interview power users of each product in order to incorporate their practical and long-term experience.
- They summarize every user review available on the web using artificial intelligence to gauge overall user sentiment for each software product.
- They devote weeks of researching, writing, and editing to develop each analytical review.
- With this extensive research and testing, their team determines an overall Editor’s Rating to simplify your search.

At Digital.com, their team of experts have spent thousands of hours testing and utilizing all the tools available on the market in order to create and maintain their website. You can visit their site to view the free informational guides and resources they have created to help you with your digital needs.

## Resources

- [websitecarbon.com](https://www.websitecarbon.com/)
- [sustainablewebmanifesto.com](https://www.sustainablewebmanifesto.com/)
- [sustainablewebdesign.org](https://www.sustainablewebmanifesto.com/)
- [v-fonts.com](https://v-fonts.com/)
- [www.w3schools.blog/html5-tags](https://www.w3schools.blog/html5-tags)
- [digital.com](https://digital.com)
