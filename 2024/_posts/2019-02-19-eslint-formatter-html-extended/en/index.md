---
title: Extend an official ESLint's HTML Formatter
date: '2019-02-19'
excerpt: Why we decide to extend an official ESLint's HTML formatter
author: mazipan
published: true
featured: false
tags: [javascript, eslint]
coverImage: /thumbnail/eslint-formatter-html-extended/eslint-html.png
lang: en
---

Why we decide to extend an official ESLint's HTML formatter

## Background Story ⛈

In my daily job, we are using ESLint in almost all of our repository especially for our FrontEnd (FE) code (because I only work in FE repository). Ideally, developers should run ESLint in its development phase and make sure all branch that he working for is clean from ESLint warnings and errors. For the sake of teams, we also put git hook using `husky` to run ESLint before pushing changes to its origin. But it wasn't enough for our current flow, I don't know why, sometimes still there is a code that not passing ESLint's rule in the origin branch. Recently, we put this ESLint script into our Continuous Integration (CI) process.

Unfortunately, our developers are not very like to read full-log in our CI tools, they like to see separate HTML report for each stage in CI. After reading official documentation from ESLint, I found the section about [ESLint formatter ↗️](https://eslint.org/docs/user-guide/formatters/). We can create HTML report with this formatter.

We doing trial and error for proof of concept (POC) about producing HTML report from our ESLint. After a day using official HTML reporter in our CI, we found that official HTML formatter prevent from creating a log when there is some error that makes it exit with code 1. We can see the HTML report but we lost our log. It's not our expectation.

Finally, we decide to create our own formatter that combined the power of HTML reporter and keep the log exist in our log system.

We call it as `eslint-formatter-html-extended`!

![ESLint formatter HTML Extended](/thumbnail/eslint-formatter-html-extended/eslint-html.png)

## Unboxing 📦

Basically, we don't want to reinvent the wheel. So, we just combining two types of formatters from ESLint. We choose HTML formatter by [JulianLaval ↗️](https://github.com/JulianLaval) and Stylish formatter by [Sindre Sorhus ↗️](https://github.com/sindresorhus). We also adding some little touch in HTML output report to be more beautiful and easy to navigate.

## Usage ☀️

Install dependencies via script:

```bash
$ yarn add eslint-formatter-html-extended -D
# OR
$ npm i eslint-formatter-html-extended --dev
```

Refer to this [docs ↗️](https://eslint.org/docs/user-guide/formatters/), you just need to add the parameter `-f nameFormatter -o nameFile` in your ESLint CLI script, e.g.:

```bash
$ eslint --ext .js . -f html-extended -o eslint-report.html
```

This formatter is published as open source that you can see in [Github repository ↗️](https://github.com/mazipan/eslint-formatter-html-extended), feel free to fork or submit a new issue.


