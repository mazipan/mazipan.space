---
title: Tasting ReasonML for React
date: '2019-05-19'
minute2read: 10
excerpt: Story telling in how it feels to taste ReasonML syntax to build the user interface of a website
author: mazipan
published: true
featured: false
tags: [javascript, react, reasonml]
coverImage: /thumbnail/tasting-reasonml-for-react/reasonml-users.png
lang: en
---

Story telling in how it feels to taste ReasonML syntax to build the user interface of a website

## ReasonML, what food?

ReasonML (do not read as Reasons for Making in Love), if I quote from the words of Mas Riza on his blog published [here ↗️](https://rizafahmi.com/2018/12/10/perkenalan-reasonml/) is a syntax that is above the other language called [OCaml ↗️](https://ocaml.org/). ReasonML can be a language _compiled-to-js_ with [BuckleScript ↗️](https://bucklescript.github.io/) help so that ReasonML can ultimately be directly compared to TypeScript nowadays.

Funny thing is, I even first heard about ReasonML was not the result of reading the official documentation or listening to any cool video courses but from Mas Riza Fahmi's presentation in [JakartaJS #45 ↗️](https://www.meetup.com/JakartaJS/events/256965042/) which discusses State of JavaScript in 2018.

## A classic reason for learning ReasonML

Each person must have a reason why they want to learn this, or the reason why to use this and that. Mas Riza has also explained some general reasons that you can take as a motivation for learning ReasonML this year or next year (if there are still exist 🤣).

For me personally, some classic reasons why you should study ReasonML this year include:

### Non-Maintstream

This could be a powerful reason for those of you who are easily saturated with a technology, learning things that are not yet on the market can give different satisfaction to the process. Even if the technology ultimately has a good development going forward, then you can be grateful for taking steps to learn earlier.

### Facebook Centric Development

It is well known that in the developer environment there are often different "religion" of thought between one developer and another developer, where usually the taking of the religion" influences the selection of supporting technologies around them which will be adapted to the religion" they hold.

Facebook is one of the center of attentions that lately shows a very good sign in supporting the developer environment. Lot of tools, frameworks, technology and even documentation related to various Facebook output technologies that are opened as open codes. Following the religion" of Facebook is certainly not a wrong thing, where at least we can hide behind the big names and consistency of Facebook in maintaining various open code projects.

ReasonML is also known to be maintained by a Facebook team that can provide more guarantees for future development and adoption.

### Type Safe

Yes, there is TypeScript. But not everyone is happy using TypeScript. Also that not everyone likes when there is one technology that becomes too large in one segment. For languages that are Type Safe in JavaScript, TypeScript is currently one of the favorites of many developers, but providing other alternatives is a must so that each can continue to grow and compete with each other.

ReasonML which took the basic language from OCaml benefited from its Type System which was quite mature and battle tested, plus the ability to guess a data type from any data without the need to define type directly (read: _Type Inference_) making ReasonML excess in type system is more complete.

### Functional

OCaml is indeed a language that basically uses a functional paradigm so that ReasonML inherits this trait. For friends who want to learn a language with a functional paradigm but not too _strict_, then ReasonML is one of the best choices for friends to start.

## Who has used ReasonML?

![ReasonML Users](/thumbnail/tasting-reasonml-for-react/reasonml-users.png)

Not many ReasonML users in the world, but several large companies have started adopting it in their production. In Indonesia itself, it seems that [Ruangguru ↗️](https://career.ruangguru.com/) seems to dare to openly use ReasonML in production.

## How I learn ReasonML

I am not a person who likes syntaxing learning because to be honest this is actually the most boring and easily forgotten for me personally. If you read the [official documentation ↗️](https://reasonml.github.io/docs/en/overview), you will find various complete explanations and examples of various basic syntaxes such as explanations of various data types, tuples, records, variants and so easily. Unfortunately reading this section will not have much effect on me, a minute later I have forgotten.

If you like to learn syntax first, you can go to [ReasonML Playground ↗️](https://reasonml.github.io/en/try?rrjsx=true&reason=C4TwDgpgBATlC8UDeAoKUD2A7CAuKAllsADRpTADuG+AzsDEQOZnrAAWMEehxrUAMwwBXGHQbN+AggDceRUuVoEAHuMZYWSiHKz4F-CASbtg6yeSxF5fcsAh6o9DVvQQANjof7bbSh7lzTX4OAhh7b15FdCFRCMdnCxjZCHifaKdVNKcJYO1dbINyIxNgbMS89CscQt8Kf2IQINd6h1BsG0UAXwBuFE9gJwRkcg78AEYQ6nwAIgAmGZDObgmpETEoecXyaUCoSaVVWYX+Wi9HA7djU2PtqutVu0itw09dR78Anhe7djDsy6CdbZH7JOQA05ZbiOUFOc4Q4rXMrQ278aqpFH7KZtJqbE52BrtHATFC9FD9VJQYTDJAAOnptBIFD+4UxczJFMGwjAwwAFABbEAAJQgAGMAJQIAB8yHptMFItFTNCrMi4zJAypw25vNokqAA) so you can try syntax without the need for installation first.

I prefer to see the real world examples of applications that have been made using ReasonML, and thankfully the main page has even been given a link, one of which leads to the [HackerNews project ↗](https://github.com/reasonml-community/reason-react-hacker-news) created using ReasonML and React.

I decided to see and learn how ReasonML could be combined with React to build a website interface through the HackerNews project above.

Creating your own project is based on a project that has become easier for me to go through various steps to setup a project which is usually quite time consuming at the beginning. I made a simple project [https://github.com/mazipan/ghibli-reasonreact ↗️](https://github.com/mazipan/ghibli-reasonreact) which I would like to do more or less I will make two pages namely the listing page and the detail page , the data will be retrieved from public APIs provided by third parties.

![Ghibli ReasonReact](/thumbnail/tasting-reasonml-for-react/ghibli-reasonreact.png)

## What I have learned so far

### Specifies the data type

Because it's type safe, so we have to know how to make the correct data type to be effective. Although at ReasonML we hardly need to mention the type of data needed for each function created, but ReasonML will always check the validity of the data types used in each build.

Of course my first project was very fast, far from being true. Including determining the data type, like there is one part that I specify using a List even though it should be more effective when using a Map. I also have to make definitions of data types from various responses that I take from third parties to be easy when read elsewhere.

### The unseen "return"

Each function in ReasonML must return a value even though we do not need to directly determine which line is reversed. ReasonML will automatically read the last line as a response to the function you created. This is often forgotten by those of me who are too used to coding JavaScript.

### Immutable Data

For you who are familiar with React should be used to working with immutable data, but not me who usually uses Vue as the main framework everyday. Vue who puts forward Reactivity becomes difficult for immutable data implementation. In ReasonML this is natively supported by the language, although actually we can still change the value of the variable using the `ref` of that variable.

### "Hooks" support by default

Reason with ReasonReact by default supports and recommends using Hooks on its components, forcing us indirectly to learn and use more of these features.

### Syntx differences in the Life Cycle

If in React we use `componentDidMount` in ReasonReact we can use `didMount`. Yes, just the difference in syntax. But it can be quite confusing at the first time. Here are some life cycles supported at ReasonReact:

| Life Cycle         |      Argument      |
| ------------------ | :----------------: |
| `didMount`         |        self        |
| `willReceiveProps` |        self        |
| `shouldUpdate`     | {oldSelf, newSelf} |
| `willUpdate`       | {oldSelf, newSelf} |
| `didUpdate`        | {oldSelf, newSelf} |
| `willUnmount`      |        self        |

Read more [here ↗️](https://github.com/reasonml/reason-react/blob/master/docs/lifecycles.md)

### Managing the directory structure in the ReasonML project

Initially I followed the example on HackerNews which implemented Flat Structure where all files were in the same directory, but it did become "dirty" and messed up as more files were inside.

Fortunately, [Muhammad Ridho Assuryadi ↗️](https://github.com/muhammadridho) helped me to tidy up and improve the structure of this project. Separating files to different directories depends on the function. This really confuses me, because in ReasonML we don't import by location or path of files like we normally do in JavaScript so it can cause confusion if it doesn't apply _namespace_ correctly to the two files with the same name.

### Convention

I have yet to find the right reference for learning about the correct conventions and are commonly applied in ReasonML, such as using cases whether using camelCase or kebab-cases. While based on the code that was pushed by [Muhammad Ridho Assuryadi ↗️](https://github.com/muhammadridho) himself still uses these two different things in several places.

Later I will update this post if I have found the right reference for this.

## Learning result repository

[https://github.com/mazipan/ghibli-reasonreact ↗️](https://github.com/mazipan/ghibli-reasonreact)


