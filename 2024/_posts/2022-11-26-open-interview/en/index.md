---
title: Open Interview with mazipan
date: '2022-11-26'
excerpt: Opinionated interview questions for Frontend by mazipan
author: mazipan
published: true
featured: false
tags: [interview, frontend]
coverImage: /thumbnail/open-interview/pexels-tima-miroshnichenko-5336951.jpg
lang: en
---

This article will reveal some of my secret (*not really secret) questions I will ask to the candidate that applying for Frontend Engineer. I've been become an Inteviewer for many interview sessions when I was in a full-time job for some e-commerce companies in Indonesia.

## ✍️ Quick Q&A

- ❔ **Will I always ask all the questions in this article?**: Can be yes, or no. Depend on the situation. One question can be followed up with other questions to make it clearer. As an interviewer, I just prepare my own sets of questions that can be randomly asked when needed. So you may don't need to be able to answer all the questions.

- ❔ **Why not include the answers?**: Because I don't like a text-book explanation. I will capture how understand you are with the topics, usually by asking some use cases or adding follow up questions. So do not just memorize the answer, understand it, so you can explain it with your own words.

## 🧑‍🏫 Common Interview Processes for Software Engineer

Before we start with listing down the questions, it's better for us to understand the common processes or workflows that commonly being adopted by many tech companies.

If you are Indonesian citizen, you can watch the video from [Gogo](https://twitter.com/lwastuargo) about [the interview process for software engineer](https://www.youtube.com/watch?v=gczDiFOWLOY). But if you are not understand the Indonesian language, you can just direct to [the slides presentation here](https://ksana.in/interviewmaterial).

The processes are vary one to another, but in general it will be quite the same. Some companies will split it into different and multiple interview session, while the others may doing a single interview session that cover all the things.

## 💻 Live Coding

This part usually will be executed first. Also by me. For frontend position, I will usually doing a live coding for these two topics:

- ⭕️ **HTML & CSS**: Asking to create some basic layouting, just to make sure the candidate at least can coding the HTML and CSS in raw.
- ⭕️ **Data Structure / JavaScript**: It's common live coding to solving some data structure related questions.

You can check the video from Gogo for [Interview Coding (In Indonesian Language)](https://www.youtube.com/watch?v=MkQEaIZkhYQ&t=484s) and [Sample mock interview](https://www.youtube.com/watch?v=8s1Vh_7symo). You can also get [the slides here]( https://ksana.in/codingalgointerview)

## 📝 My common questions

Here the list of questions those I may asked when doing an Interview session:

### 🌍 Web Fundamental

- 🟩 Explain and spot the difference about *load* a JavaScript file via HTML by only using `<script>` tag, and with `<script async>` tag, and with the `<script defer>` tag!
- 🟩 Explain about attribute `rel=noopener` and/or `rel=noreferrer` that usually included in the `a` tag (`<a href="..." rel="noopener noreferrer">`)!
- 🟩 Can you give me some examples of Semantic HTML Tag as a replacement for an ordinary `div` tag?
- 🟩 Explain the difference of `Cookie`, `Local Storage` and `Session Storage`! When we should use it? Explain the trade-off when using each of them!
- 🟩 What is `prefetch`? What is `preload`? Give an example or use case when we should use it? When we should avoid to use it?
- 🟩 How to make the Browser caching the static resources (Image, JS, CSS, etc) have been requested before?
- 🟩 What is `CDN`? What is the role of `CDN` in term of serving our website? Why and when we should use `CDN`? What type of resources those better to be served via `CDN`?
- 🟩 How if you are being asked to create HTML layout but have a very different design for the Mobile and Desktop? What is the approach or strategy?
- 🟩 Explain about `CORS` (*Cross-Origin Resource Sharing*)! When and why it happens? How we solve the problem?

### 🟡 JS Fundamental

- 🟩 What's difference of `.forEach` and `.map`?
- 🟩 What's difference of `debounce` and `throttle`? Can you elaborate your answer by explaining the use case of `debounce` and `throttle`?
- 🟩 Explain about *Closure* in JavaScript.

### ⚛️ Frameworks (React)

- 🟩 Explain about *semantic versioning*!
- 🟩 Spot the difference of `dependencies`, `devDependencies` and `peerDependencies` in the `package.json`!
- 🟩 Explain *Rule of Hooks* in React.js!
- 🟩 Explain the *Array Dependencies* in the `useEffect`!
- 🟩 Explain about *Server-Side Render*, *Client-Side Render* and *Static Site Generated*! When we should use it? What's the trade-off from each options?
- 🟩 Explain the difference of `Rest API` and `GraphQL`! Tell me the pros and cons! When we should use `Rest API`? When we should use `GraphQL` instead?
- 🟩 How to create a *lazy load* in the image component without 3rd party library?
- 🟩 What's the minimum things you can do as a Frontend Engineer to support the `SEO` of your site?
- 🟩 How do you test your project?

### 💫 Web Performance

- 🟩 Explain about *Core Web Vitals*!
- 🟩 Explain the difference of Data Field dan Data Lab in the context of *web performance*!
- 🟩 What things can decrease the `CLS` (Cumulative Layout Shift) score? How to increase the score?
- 🟩 What things can decrease the `LCP` (Largest Contentful Paint) score? How to increase the score?
- 🟩 How to monitor the web performance? Do you use the RUM (Realtime User Monitoring)?

### 💅 System Design

- 🟩 How to improve the time consumed by th engineer in fisnihing the task, from development to the production?
- 🟩 How to design the application that showing the *Live Comments* from the users?

## 💌 Personal tips

Different interviewer may have different set of questions, but at least this can be your own benchmark and for you to prepare your self before the interview session. If you still stuck when trying to explain things in this article, maybe you still need to read more references.

If needed, write it down your answers and manage it word by word so it will be easier to understand. You can gain more confidence when mastering the things that being asked and you already prepare for that.

Know the text-book answer maybe not enough, prepare for the following up questions also, understand the use cases, and the trade-offs.

**🤺 So, when we do an interview?**

---

Cover photo from [Tima Miroshnichenko on Pexels](https://www.pexels.com/photo/a-woman-interviewing-a-man-5336951/)
