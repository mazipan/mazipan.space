---
title: How we built our own web metric monitoring dashboard
date: "2019-11-07"
description: Story from Tokopedia team in building in-house web metric monitoring dashboard
author: mazipan
draft: true
tags: [lesson-learned]
image: ./images/computer.jpg
lang: id
---

Story from Tokopedia team in building in-house web metric monitoring dashboard

## Disclaimer

Before we starting, you need to take a note that all in this article is my own words. It may be wrong, subjective and doesn't works well with your current situtations. Do not take any decisions based on only this article.

## About Web Metric Monitoring

Monitoring is one of tasks you need to think about when you decided any technologies.
Especially when we plan to use it in production environment.
This is because monitoring with any tools can give us a better visibility about our current product or technology in production.
With a good monitoring tools, we can get insight about our current condition and creating another plan to fixing or improving the product based on the data we get from the monitoring tools.

In term of web technology, there are many metrics we can monitor for day to day operational.
Specific in frontend web technology there are some key metrics we need to monitor because it might be impacted to your product impressions in the end user.

For the higher position stakeholders, they need to take a look a big picture of the web metrics.
Showing how long it takes your web to be loaded is the one you should do for them.
But as web developers, we need to care about another metrics that direct or indirect will cause increasing or decreasing the web load time.
That's why we need to take a many more data than just the load time it self.

## Mainstream Monitoring Tools

Currently, in the industry there are some alternative we can use to do monitoring our web metrics.
You can use [pagespeed insight](https://developers.google.com/speed/pagespeed/insights/), [web.dev/measure](https://web.dev/measure/), [webpagetest.org](https://www.webpagetest.org/), and many others website we can use for monitor our web metrics.

### Pagespeed Insight

![Pagespeed Insight report](./images/pagespeed-result.png)

When we say, you must monitoring your web metrics day by day so you can see the changes in every code deployed to the production, how it will impact this metrics, which deployment that cause decreasing your web metrics or is your initiative can increasing your web metrics.
In this scenario, we can use Pagespeed Insight because it can not record your day to day changes. Except you want to do manual screenshot the report everytime.
But it's not because of Pagespeed Insight is bad, sure you can take a look a report aggregated from Chrome UX Report in the Pagespeed Insight.
Those kind of report might doesn't provided by any other tools.
You can see how long the average for real users using Chrome browser accessing you web.
Is it included in fast category, medium or slow.

### Web.dev

![Web.dev report](./images/webdev-result.png)

Move to web.dev/measure, it is basically just running the lighthouse engine under the hood.
Yes, lighthouse is one of the most popular engine to used to test your web page and get a rich reports from the summary one until the details one.
It also give you a clear recommendation how to tackle issues detected by lighthouse to be action items for your next improvement.
Web.dev/measure also can record you last test and compare to your current test report.
It give you a better visibility about the trends and the changes.
Your unlock this feature you need to login to your Google account and web.dev will save the data based on the login account.
I still didn't know how to automate this jobs.
Yes, I am lazy and didn't want to open the web.dev everyday and testing my web page to record my web page test.
Also how if we need to analyze custom data since the web.dev only show the generic report and didn't compare the data as we want to.

### Webpagetest

![Webpagetest.org](./images/wpt.jpg)

The last, webpagetest.org is one of the most powerful site to be used to monitor your web page metrics.
Also, it already support lighthouse engine if you need it.
Webpage test can be use easily without any account login and you can get the same (even richer) report compare to Pagespeed Insight and Web.dev.
But yeah, you need to do this manually and we don't want it.

The good news is webpagetest also give you an API you can hit from anywhere you want and give you the same report in the response.
You need to register and get your API key to use this feature, you can visit this [request API key page](https://www.webpagetest.org/getkey.php).
There are some limitations in this API, like you can only hit 200 page load every day.
In every one running the test, webpagetest will run 10 times to get more consistent report.
It will causing reduction 10 rate limit in every API call.
Yes, it might be not scale for some case.

Honestly, we already tried it.
Creating our own web metrics monitoring tools which hit webpagetest API everyday with Crob job triggered in the midnight.
Our big problem is we can not add more page to be analyzed by webpagetest because of rate limiter.
That's why we starting to looking another solutions that scale.
Another solution with nearly same with webpagetest and still give us the flexibility to creating our own reporters based on the data we collect.

## An In House Monitoring Tools

Lighthouse gain it's popularity because of Progressive Web Apps (PWA) is also become hottest topic in modern web development.
Developers needs a tools to test it's PWA implementation, see the result score and get the best practices checklists which can be applied in their web.
This phenomenon drive us to using Lighthouse engine for our next web metrics monitoring dashboard.

Lighthouse engine is available in many alternatives, it's built-in by default with our Chrome DevTools, it available as a CI that can validate our pull requests, it available as an NPM library along with Puppeteer for launching a Chrome browser programmatically.
It also available as a CLI tools if you prefer a simpler usage.
CLI tools from Lighthouse can produce a JSON or HTML file as an output.
You will amaze about how the CLI can be very flexible for you to develop custom reporting.
You can passing Cookies, extra headers, blocking some domain from page load, and passing your own network throttle to simulate your dominant users network. 

The problem is the JSON report may be too big for you to save in the disk or database, since you may never use all the data in the JSON file.
You can pick the data that you think important for your developers and other stakeholders and remove the rest of it.
But if you doing this, your report may be will become invalid to be viewed by any other lighthouse report viewer.

## Another Alternative

- Sitespeed.io
