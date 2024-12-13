---
title: Create Like Button with No Cost
date: '2020-05-04'
excerpt: How I create a Like Button on this blog without any servers and no cost
author: mazipan
published: true
featured: false
tags: [now, javascript]
coverImage: /thumbnail/membuat-like-button-tanpa-modal/membuat-tombol-like.jpg
lang: en
---

If you follow my blog, you will know that I already wrote another article about [creating "Like Button" with Firebase Real Time DB](/create-simple-like-button-using-firebase-rtdb/en/).
If you prefer Firebase as your source, just read the article above.
If you feel bored with a mainstream platform, you might need to read this article because this is my experimental project in creating like button in very uncommon way.

## The Platform

Firebase jelas saya coret dari daftar ini, karena sudah pernah menggunakannya.
Firebase sangat mudah untuk digunakan dan sangat handal apalagi ditambah kemampuan untuk real time update pada semua aplikasi yang sedang diakses oleh pengguna. Kalau teman-teman memilih jalan yang mudah, saya sangat menyarankan menggunakan platform ini.

Karena saya tidak punya server dan tidak terbiasa mengurusi server maka pilihan terbaik buat saya adalah menggunakan platform Serverless.
Ditambah karena saya modal dengkul dan malas keluar duit untuk hal semacam ini, maka tentu platform yang menyediakan gratisan lah yang akan jadi pilihan saya.

Sebelumnya saya sudah pernah mencoba menggunakan Heroku untuk projek [graphql-pokeapi](https://github.com/mazipan/graphql-pokeapi), saya tidak perlu mengurus server dan platform ini juga menyediakan versi gratis.
Saya bisa memilih framework yang saya gunakan untuk membuat Rest-API sederhana.
Awalnya saya memilih platform ini, sekalian karena memang ingin mencoba menggunakan fastify untuk membuat Rest-API.
Sayangnya versi gratis Heroku ini sangat lambat untuk diakses, ya wajar sih sebenarnya, gratis minta cepet? Tapi kok saya gak puas ya dengan hasilnya.

Akhirnya saya mencoba platform yang lagi tenar yakni [Vercel Now](https://vercel.com/) atau beberapa mungkin lebih kenal dengan Zeit Now.
Ini pertama kali saya mencoba menggunakan Now karena memang belum ada kebutuhan dan keinginan untuk menggunakannya sebelumnya.
Sekalian sajalah untuk belajar bagaimana menggunakan platform ini.

## Project Initialisation

Saya tidak menggunakan CLI untuk memulai projek dengan Now ini, kalian bisa saja memulai dengan menggunakan Now CLI yang bisa lebih mudah.
Saya lebih memilih memulai dengan membaca [Dokumentasi platform Serverless](https://vercel.com/docs/v2/serverless-functions/introduction) mereka untuk memahami dan melihat kebutuhan minimal untuk membuat sebuah Rest API.
Sepertinya cukup mudah dan sederhana, tapi kok seperti masih ada yang kurang ya? Ah, saya perlu melihat projek nyata seseorang membangun Rest API menggunakan platform Now.
Projek pertama yang saya ingat kok ya [Covid-19 API dari @mathdroid](https://github.com/mathdroid/covid-19-api).
Mencoba ubek-ubek repository yang tersedia secara terbuka tersebut, mencari tau bagaimana cara meletakkan sebuah kode, bagaimana membuat endpoint dengan parameter, dan lain sebagainya.
Saya memang lebih menikmati waktu untuk ubek-ubek kode yang sudah tertata dibandingkan membaca dokumentasi 😂.
Maka dari situ saya bisa memulai projek saya sendiri dengan cara berikut:

1. Register and create an account in Vercel website.
2. Install Now CLI for development and deployment.
3. All endpoint is on the `api/**` directory
4. The endpoint of your API is based on your directory. Same approach with Next and Nuxt. You need to manage your directory structure to create any API endpoint.
5. Create your first API, create a file `index.ts` in a directory `api` with this simple code:

```ts
import { NowRequest, NowResponse } from '@now/node';

export default (req: NowRequest, res: NowResponse) => {
  res.json({
    hello: 'world!',
  });
};
```

6. Deploy for very first time with command `now`, make sure you already installing Now CLI.
7. Open your Vercel dashboard, and you can start to test your API

## Saving "Like" Data

Salah satu masalah ketika menggunakan platform gratisan seperti ini memang tidak tersedianya Database yang bisa digunakan dengan mudah untuk menyimpan data. Dan sekali lagi, karena saya "tidak modal" maka saya memikirkan cara yang ngeselin untuk menyimpan data tersebut.

Karena beberapa waktu terakhir saya banyak bermain dengan [API dari Github](https://developer.github.com/v3/), akhirnya yang terfikir oleh saya adalah menyimpan data tersebut di sebuah Secret Gist saja. Datanya berbentuk dokumen berformat JSON sehingga mudah untuk di proses dengan kode JavaScript.

Untuk kalian yang juga ingin bermain dengan Github API, kalian bisa mencoba menggunakan pustaka [Octokit Rest.js](https://octokit.github.io/rest.js/v17/). Kalian bisa berinteraksi dengan hampir keseluruhan Github API yang tersedia untuk publik dengan interface yang lebih mudah. Kalau kalian scroll ke bagian [Gists](https://octokit.github.io/rest.js/v17#gists), kalian bisa menemukan interface untuk membaca dan memperbarui data yang tersedia di Gist kalian.

Hal yang perlu kalian ketahui ketika menggunakan Github API adalah terdapat [Rate Limiter](https://developer.github.com/v3/#rate-limiting) yang membuat kalian tidak bisa memanfaatkan API secara membabi buta.

## Reading "Like" Data from Gist

Reading the data from a Gist file is quite simple, you can follow this simple code:

```ts
const { Octokit } = require('@octokit/rest');

const octokitInstance = new Octokit({
  auth: process.env.GIST_TOKEN,
});
const GIST_ID = process.env.GIST_ID;

const readGist = async (): Promise<any | null> => {
  try {
    const response = await octokitInstance.gists.get({
      gist_id: GIST_ID,
    });
    return response.data;
  } catch (e) {
    console.error('> [GIST] - Failed read gist', e);
    return null;
  }
};
```

## Increment the "Like" Data

In every a button clicked, we need to update the counter of our "Like" data in the Gist.
Here is the code for updating the counter:

```ts
const GIST_FILENAME = process.env.GIST_FILENAME;

const updateGist = async (content): Promise<any | null> => {
  try {
    const response = await octokitInstance.gists.update({
      gist_id: GIST_ID,
      files: {
        [GIST_FILENAME]: {
          content: JSON.stringify(content),
          filename: GIST_FILENAME,
        },
      },
    });
  } catch (e) {
    console.error('> [GIST] - Failed update gist', JSON.stringify(e));
  }
};

const incrementData = async (slug): Promise<any | null> => {
  try {
    const existingGist = await readGist();
    if (existingGist && existingGist.files) {
      const content = existingGist.files[GIST_FILENAME].content;
      if (content) {
        const objContent = JSON.parse(content);
        if (objContent) {
          const currentValue = objContent[slug];
          if (currentValue) {
            const currentLike = parseInt(currentValue, 10) || 1;
            const newContent = {
              ...objContent,
              [slug]: currentLike + 1,
            };

            await updateGist(newContent);
          } else {
            const newContent = {
              ...objContent,
              [slug]: 1,
            };

            await updateGist(newContent);
          }
        }
      }
    }
  } catch (e) {
    console.error('> [GIST] - Failed manipulated data', e);
  }
};
```

## Endpoint

I create 3 endpoint to serve my needs in this like button, you can see the list:

```md
- `/api/likes` to get all Likes data in bulk mode
- `/api/like/[slug]/get` to get like data for certain article with slug parameters
- `/api/like/[slug]/update` to update and increment the data
```

To create these 3 API, you need to create directory in your project to follow Now's convention:

```md
- `api`
  |- `likes`
  |- `index.ts`
  |- `like`
  |- `[slug]`
  |- `get.ts`
  |- `update.ts`
```

## Adding a Cache

Because Github have a rate limiter in their API, and I don't need my users see a real-time data so I decide to put a cache in my `Now.json` configuration.

```javascript
{
  "headers": [
		{
      "source": "/api/like/(.*)/update",
      "headers": [
        {
          "key": "Cache-Control",
          "value" : "public, max-age=0, must-revalidate"
        }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value" : "public, max-age=3600"
        },
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        }
      ]
    }
  ]
}
```

## How's the result?

You can scroll to the very last of this blog, you will see a blue button with a text "Click me if you like this article". That's my simple like button powered by Now as an API provider.

