---
title: The art of deleting and updating the code
date: '2019-07-02'
minute2read: 10
excerpt: Story telling about my daily job to deleting my peer's code
author: mazipan
published: true
featured: false
tags: [programming]
coverImage: /thumbnail/the-art-of-deleting-and-updating-the-code/quadran.png
lang: en
---

Story telling about my daily job to deleting my peer's code

## Introduction to the problem

Programmers are often identified with someone who writes code to make software.Not wrong, because most of us (programmers) do have daily work to write lines of code to build a feature, fix errors (defects) in a software.

Writing code becomes a fundamental skill for a programmer, we are required to be able to translate a solution that has been previously designed into a line of code to solve various problems and improvements in software products.

The ability to write code like this is not common to be over-exploited in some workplace programmers themselves. Especially when it is faced with _deadlines_ which are urgent. We can just blindly write code that originates without regard to the various rules that we should follow. Things like this will end in beaing a _technical debt_ on ourselves and our own team in the futur and regarding this technical debt when reading your explanation [Martin Fowler](https://martinfowler.com/) on the following page [Technical Debt ↗️](https://martinfowler.com/bliki/TechnicalDebt.html) can be associated with financial debt which if we do not pay now, one day we will still have to pay it (plus the interest too).

The art of deleting and updating code or better known as **Refactoring**, is the process of repairing code, removing parts that are no longer needed, putting together multiple parts, and various things related to code cleaning without changing the end result to the user.
Therefore programmers do not just need to know about how to write and add code, but must also know when to delete and update the code, to the best of your ability.

## Why do programmers write origin code?

Programmers have a variety of reasons why they write code from the origin, of course we can't generalize it because it could be the reason that it is indeed the best when the decision is taken.

For this we can look at [Technical Debt Quadrant ↗️](https://martinfowler.com/bliki/TechnicalDebtQuadrant.html) as Martin Fowler explained, in a nutshell, look at the following picture:

![Technical Debt Quadrant](/thumbnail/the-art-of-deleting-and-updating-the-code/quadran.png)

<small class="caption">Image taken from page https://martinfowler.com<small>

## Why do we have to delete and update the code?

There is a jargon that is often echoed by many friends in the programmers space, that "If the application is okay, why should it be changed?". The jargon isn't wrong, but it's also not completely true.The word "all right" can actually be relative to the point of view that we see it.
Fine can be yes, because our end users did not experience an error when using our application.Just fine can be wrong, because it turns out that maybe in terms of code formulation, our application makes it difficult for the programmer team to develop new features or fix errors that already exist or that might be in the future.

Some reasons why we must delete or update a code according to Martin Fowler on the book **[Refactoring ↗️](https://refactoring.com/)** among others:

### Improve software design

A design can basically be good but as time progresses and more and more changes and additions to it, becomes increasingly difficult to see the design. The process of removing, update and improve the code is expected to clean up various irregularities that make the design of a software become difficult to be seen and understood.

### Make it easy to understand

The more code, the more difficult it is to understand how the code works. One solution is to apply a good design. It is normal for us to often write code thinking about how to keep the program running and forgetting how the next programmer will understand it.

### Helps find errors

The easier it is to understand a code, the more effective it is to detect various errors that have already occurred and the possibility that errors will occur more easily.

### Help write code faster

The end result is that us as programmers we can write code, add various features, fix errors more quickly. Although some people will also argue that the speed of development will not always be directly proportional to the good design of a system.

## When is the best time to do it?

I also took this from the **Refactoring** book which explained the best times to make changes to the code are as follows:

### When adding a function

It is common for us when creating a function for the first time, just add it, when making the same function the second time, just copy the code and let the double code occur, but when you have to make the same function for the third time, then think about uniting it in one place that can be used together. Not infrequently when we are given the task to create a small feature, but end up having to update a lot of code to the bottom because it is difficult to add these features without changing from the basic.

### When it comes to fixing errors

When we are assigned to fix the error, we are required to trace the trace backward to follow the flow of the code to understand and find the point where the error occurred. Therefore, when tracking in order to find the cause of this is very difficult, it could be because at the beginning of writing the code it was not thought about how the code will be read by others. Making improvements at this time is also a quite appropriate time because it is usually accompanied by assistance from the Tester who ensures the application continues to run as expected.

### When code review

Code review is the right time to team up among programmers to correct errors or bugs , taking given opinions to the solutions , including giving opinions about how large the design of the project and code is.

## Lessons that can be taken

The world of technology is developing very fast, there are just breakthroughs and solutions every day. Choosing a profession as a programmer means you have to be ready with the speed of change. What we think is the best solution now may become irrelevant in the near future.
Stay updated with the latest developments, don't feel upset when you have to delete and update your code. If you don't do it, someone will have to do it sometime. There is no need to delete and update our code of our previous results, because it could be that it is the best so it must be taken. There is no need to blame the previous programmer for his code either, just assume that every solution really is the best solution he decided to be used.

Keep learning, because it is a process that is increasingly making us big, making us stay afloat and compete in a world with rapid change.
