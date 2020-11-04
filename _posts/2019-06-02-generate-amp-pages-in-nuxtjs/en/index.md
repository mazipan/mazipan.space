---
title: Generate AMP Pages in Nuxt.js
date: '2019-06-02'
minute2read: 20
excerpt: How to generate AMP Pages for your blog using Nuxt.js
author: mazipan
published: true
featured: false
tags: [nuxt, amp]
coverImage: /thumbnail/generate-amp-pages-in-nuxtjs/amp.jpg
lang: en
---

## About AMP

AMP (Accelerated Mobile Pages - [amp.dev ↗️](https://amp.dev)) is Google's iniisatif for helping publishers, developers and website owner to serve website with fast first load time even nearly instant in mobile devices. For achieving that instant loading is not free, this can be done by AMP with applying so many strict rule for websites. We can say that AMP is strip down all your custom JavaScript to guarantee your website have instant load time.

AMP is recommended by Google because it is very user centrict. Google also will prioritize the contents with AMP support with adding a badge in the search results to indicate AMP. Google also support with adding the caches to boost the first load speed into the limit which make AMP is the best choice for first user landing from the search result.

![Mazipan AMP](/thumbnail/generate-amp-pages-in-nuxtjs/mazipan-amp.png)

## Basics for Creating AMP

AMP is seperate pages with the normal one. This is because AMP have different strict rule that make us harder to implement in our existing technology stack that usually become very depends on JavaScript.

For creating new AMP pages, first we need to add an identifier in `html` tag to make browser know that the pages is AMP version.

If in normal HTML we can have this below code:

```html
<html>
  <head></head>
  <body></body>
  <html></html>
</html>
```

In AMP we will add emoji ⚡ in our `html` tag, see below example:

```html
<html ⚡>
  <head></head>
  <body></body>
  <html></html>
</html>
```

Or we can just change the ⚡ emoji with attribute `amp` without any values if we didn't support emoji.

After adding the identifier, we need to add the main AMP engine script with this below code:

```html
<script async src="https://cdn.ampproject.org/v0.js"></script>
```

We also need to add CSS boilerplate for all AMP pages:

```html
<style amp-boilerplate>
  body {
    -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
    -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
    -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
    animation: -amp-start 8s steps(1, end) 0s 1 normal both;
  }
  @-webkit-keyframes -amp-start {
    from {
      visibility: hidden;
    }
    to {
      visibility: visible;
    }
  }
  @-moz-keyframes -amp-start {
    from {
      visibility: hidden;
    }
    to {
      visibility: visible;
    }
  }
  @-ms-keyframes -amp-start {
    from {
      visibility: hidden;
    }
    to {
      visibility: visible;
    }
  }
  @-o-keyframes -amp-start {
    from {
      visibility: hidden;
    }
    to {
      visibility: visible;
    }
  }
  @keyframes -amp-start {
    from {
      visibility: hidden;
    }
    to {
      visibility: visible;
    }
  }</style
><noscript
  ><style amp-boilerplate>
    body {
      -webkit-animation: none;
      -moz-animation: none;
      -ms-animation: none;
      animation: none;
    }
  </style></noscript
>
```

The things we need to be noted is AMP is not allowing any custom JavaScript or any external third party JavaScript link.

So do with CSS file, we can't load any external CSS file. All style need to be loaded internally using tag `amp-custom` like below example code:

```html
<style amp-custom>
  .custom-class {
  }
</style>
```

In AMP, we can use any `!important` in our CSS code.

Basically, we can use any HTML tag inside our `<body>` tag. But AMP already creating many components to help us in creating a common layout or functionality. Better for us to read in [AMPs official documentations](https://amp.dev/documentation/components/?format=websites) about the components that already created by AMP teams so we can have better visibility when creating AMP pages in the future.

## Generate AMP in Nuxt.js

Creating AMP pages in JavaScript framework was like an impossible things to do. This is because JavaScript is forbidden in AMP, while in JavaScript framework become the main technology to be used.

Today, JavaScript framework already have power to generate static pages like Nuxt.js already done. In my blog itself, I use Nuxt.js for generate static pages to simplify my deployment process. Unfortunately, the static files that generated bu Nuxt.js is bloated with many external JavaScript that need to be clean up first. So the hardest task to generate AMP in Nuxt.js is cleaning process itself.

These are steps that I have been done in generate AMP for my blog:

### 1. Creating new pages

First of all, I need to create new pages under the same root url `/amp/**` with nearly same content with the normal pages. This is for helping us to differentiate AMP pages with the normal pages so we can running clean up process is only for AMP pages an skip the normal pages.

### 2. Remove unused codes

Because AMP is not allowing any custom JavaScript actions, so any codes in our AMP pages which placed under `methods` in Vue's single file components file are need to be removed. This code become unused because we need to strip down all interactions that require any custom Javascript.

### 3. Adding hooks in generate

I use `generate` command in Nuxt.js to creating static files for my blog so I need to add hooks to detect when this command is executed. In Nuxt, this task can be done with adding this below code in `nuxt.config.js` file like this below example:

```javascript
module.exports = {
  hooks: {
    'generate:page': (page) => {
      if (/^\/amp/gi.test(page.route)) {
        console.log('processing amp file: ', page.route);
      }
    },
  },
};
```

The code above is for inserting a process when Nuxt execute command `generate` and we adding _Regular Expressions_ to detect only the AMP pages route that have added process and skip all the normal pages.

### 4. Manipulate HTML output

From our sample code above, we have `page` object as parameter in our generate hooks. If we get property `page.html` we can get the HTML string as our final output as HTML file.

The good thing from Internet is there are many good people there. I found the article from [toor.co ↗️](https://toor.co/blog/amp-pages-using-nuxt-js/) that share about cleaning up HTML string from Nuxt to support AMP.

We can just copy-paste this below code:

```javascript
const ampScript = '<script async src="https://cdn.ampproject.org/v0.js"></script>';
const ampBoilerplate =
  '<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>';

module.exports = (html) => {
  // Add ⚡ to html tag
  html = html.replace(/<html/gi, '<html ⚡');

  // Combine css into single tag
  let styleConcat = '';
  html = html.replace(/<style[^>]*data-vue-ssr[^>]*>(.*?)?<\/style>/gi, (match, sub) => {
    styleConcat += sub;
    return '';
  });
  html = html.replace('</head>', `<style amp-custom>${styleConcat}</style></head>`);

  // Remove preload and prefetch tags
  html = html.replace(/<link[^>]*rel="(?:preload|prefetch)?"[^>]*>/gi, '');

  // Remove amphtml tag
  html = html.replace(/<link[^>]*rel="(?:amphtml)?"[^>]*>/gi, '');

  // Remove data attributes from tags
  html = html.replace(/\s*data-(?:[^=>]*="[^"]*"|[^=>\s]*)/gi, '');

  // Remove JS script tags except for ld+json
  html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, (match) => {
    return /application\/ld\+json/gi.test(match) ? match : '';
  });

  // Replace img tags with amp-img
  html = html.replace(/<img([^>]*)>/gi, (match, sub) => {
    return `<amp-img ${sub} layout=intrinsic></amp-img>`;
  });

  // Add AMP script before </head>
  html = html.replace('</head>', ampScript + ampBoilerplate + '</head>');

  return html;
};
```

You can check the detail of each process with reading the comments in that code. Basically we just _replace_ the characters we didn't need with _RegEx_ and adding AMP support script. We adding emoji ⚡, remove all external JavaScript, combine all internal CSS into one tag under `<style amp-custom>` and any other tasks.

This functions is put in `plugins/ampify.js` directory that will be called in generate hook generate like this below sample:

```javascript
const ampify = require('./plugins/ampify');

module.exports = {
  hooks: {
    'generate:page': (page) => {
      if (/^\/amp/gi.test(page.route)) {
        console.log('processing amp file: ', page.route);
        page.html = ampify(page.html);
      }
    },
  },
};
```

### 5. Change all scoped style to global style

Because I am not good enough to playing with _RegEx_ code, it's very risky to update the RegEx when something unexpected happened.

And I realize that this below code make weird result:

```javascript
// Remove data attributes from tags
html = html.replace(/\s*data-(?:[^=>]*="[^"]*"|[^=>\s]*)/gi, '');
```

The above code made all my scoped style become invalid because wrong replace process. The easiest part for me to solve this thing is move all scoped style into global style. But this task can be done easily because with unscoped style I need to apply CSS module architecture to keep the CSS from one components is not affecting any other component. I prefer use BEM CSS because of my experience of using this CSS convention.

This step is optional for you if you can update the Regex part that made weird replace process.

### 6. Change all lazy load images

In non-AMP pages, I use [VueTinyLazyloadImg ↗️](https://github.com/mazipan/vue-tiny-lazyload-img) library to creating lazy load image. For AMP we don't need this library anymore because amp have `amp-img` component that already support lazy load by default.

Using `amp-img` make my existing function in lazy load become invalid for AMP because with in existing function I put attribut `data-src` to load the original source of image and using `src` for placeholder image. This thing need to be adjust for AMP with replacing `data-src` attribute with `src` and delete placeholder image.

You can see the RegEX function in this below sample:

```javascript
function replaceLazyloadImg(str) {
  return str && str.replace(/"src":(?:[^=>][^"]*","data-src"|[^=>"]*)/gi, '"src"');
}
```

### 7. Adding fix size for images

This is the step that I haven't done when this article published. All the image tag should have `height` and `width` attribute.

### 8. Adding canonical

We need to linking our AMP with each respective normal pages that have same content with our AMP.

You can put link canonical under `<head>` tag in AMP page like in this below code :

```html
<head>
  <link rel="canonical" href="url-to-normal-page"></link>
</head>
```

In our normal page we can add `amphtml` link, see this below code:

```html
<link rel="amphtml" href="url-to-amp-page"></link>
```

In Nuxt.js, we can add this meta tag via `head()` in our .vue files, see this below sample:

```javascript
export default {
  head() {
    const url = `${this.productionUrl}/${this.meta.slug}`;
    return {
      link: [{ hid: 'canonical', rel: 'canonical', href: url }],
    };
  },
};
```

And this below code is sample to insert tag `amphtml` in normal page:

```javascript
export default {
  head() {
    const ampUrl = `${this.productionUrl}/amp/${this.meta.slug}`;
    return {
      link: [{ hid: 'amphtml', rel: 'amphtml', href: ampUrl }],
    };
  },
};
```

### 9. Adding Google Analytics

Adding Google Analytics in AMP is quite different with the normal page. In short, we just need to add this below script to adding Google Analytics engine in our AMP pages:

```html
<script
  async
  custom-element="amp-analytics"
  src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"
></script>
```

Also placing this below simple tracker to tracking page view state:

```html
<amp-analytics type="googleanalytics">
  <script type="application/json">
    {
      "vars": {
        "account": "UA-12345678-X"
      },
      "triggers": {
        "trackPageview": {
          "on": "visible",
          "request": "pageview"
        }
      }
    }
  </script>
</amp-analytics>
```

I update the `ampify` script to insert analytics into our AMP pages:

```javascript
const ampScript = `<script async src="https://cdn.ampproject.org/v0.js"></script>
<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>`;
```

We also insert page view tracker before close tag `</body>` like this below code:

```javascript
// Add AMP analytics
html = html.replace(
  '</body>',
  `<amp-analytics type='googleanalytics'>
    <script type='application/json'>
      {
        "vars": {
          "account": "UA-12345678-X"
        },
        "triggers": {
          "trackPageview": {
            "on": "visible",
            "request": "pageview"
          }
        }
      }
    </script>
  </amp-analytics>
</body>`,
);
```

## Validate AMP Pages

Not all AMP can be shown in Google Search result, only the valid pages that can have badge in search result. So we need to test the validity first before publishing our AMP pages. There are some alternatives outside to test AMP validation, two website that I can mention are:

- [https://search.google.com/test/amp](https://search.google.com/test/amp)
- [https://validator.ampproject.org/](https://validator.ampproject.org/)

## Github Repo

[https://github.com/mazipan/blog-2.0 ↗️](https://github.com/mazipan/blog-2.0)


