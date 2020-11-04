---
title: Membuat Like Button Tanpa Modal
date: '2020-05-04'
excerpt: Bagaimana saya membuat like button untuk blog ini tanpa perlu modal server
author: mazipan
published: true
featured: false
tags: [now, javascript]
coverImage: /thumbnail/membuat-like-button-tanpa-modal/membuat-tombol-like.jpg
lang: id
enready: true
---

Jika kalian mengikuti blog ini, sebelumnya saya pernah menulis topik yang hampir mirip mengenai [membuat like button dengan Firebase Real Time DB](/create-simple-like-button-using-firebase-rtdb/). Silahkan baca artikel tersebut bila lebih senang dengan platform Firebase karena pada artikel kali ini kita akan menggunakan cara lain dan platform lain. Kenapa harus platform lain? Karena kenapa tidak? Saya sudah pernah menulis dan mengerjakan hal tersebut, kalau saya kerjakan dengan cara yang sama maka saya hanya mengulang saja dan tidak belajar sesuatu yang baru yang mana memang sudah sering saya lakukan dalam projek-projek open source saya.

## Pemilihan Platform

Firebase jelas saya coret dari daftar ini, karena sudah pernah menggunakannya. Firebase sangat mudah untuk digunakan dan sangat handal apalagi ditambah kemampuan untuk real time update pada semua aplikasi yang sedang diakses oleh pengguna. Kalau teman-teman memilih jalan yang mudah, saya sangat menyarankan menggunakan platform ini.

Karena saya tidak punya server dan tidak terbiasa mengurusi server maka pilihan terbaik buat saya adalah menggunakan platform Serverless. Ditambah karena saya modal dengkul dan malas keluar duit untuk hal semacam ini, maka tentu platform yang menyediakan gratisan lah yang akan jadi pilihan saya.

Sebelumnya saya sudah pernah mencoba menggunakan Heroku untuk projek [graphql-pokeapi](https://github.com/mazipan/graphql-pokeapi), saya tidak perlu mengurus server dan platform ini juga menyediakan versi gratis. Saya bisa memilih framework yang saya gunakan untuk membuat Rest-API sederhana. Awalnya saya memilih platform ini, sekalian karena memang ingin mencoba menggunakan fastify untuk membuat Rest-API. Sayangnya versi gratis Heroku ini sangat lambat untuk diakses, ya wajar sih sebenarnya, gratis minta cepet? Tapi kok saya gak puas ya dengan hasilnya.

Akhirnya saya mencoba platform yang lagi tenar yakni [Vercel Now](https://vercel.com/) atau beberapa mungkin lebih kenal dengan Zeit Now. Ini pertama kali saya mencoba menggunakan Now karena memang belum ada kebutuhan dan keinginan untuk menggunakannya sebelumnya. Sekalian sajalah untuk belajar bagaimana menggunakan platform ini.

## Inisialisasi Projek

Saya tidak menggunakan CLI untuk memulai projek dengan Now ini, kalian bisa saja memulai dengan menggunakan Now CLI yang bisa lebih mudah. Saya lebih memilih memulai dengan membaca [Dokumentasi platform Serverless](https://vercel.com/docs/v2/serverless-functions/introduction) mereka untuk memahami dan melihat kebutuhan minimal untuk membuat sebuah Rest API. Sepertinya cukup mudah dan sederhana, tapi kok seperti masih ada yang kurang ya? Ah, saya perlu melihat projek nyata seseorang membangun Rest API menggunakan platform Now. Projek pertama yang saya ingat kok ya [Covid-19 API dari @mathdroid](https://github.com/mathdroid/covid-19-api). Mencoba ubek-ubek repository yang tersedia secara terbuka tersebut, mencari tau bagaimana cara meletakkan sebuah kode, bagaimana membuat endpoint dengan parameter, dan lain sebagainya. Saya memang lebih menikmati waktu untuk ubek-ubek kode yang sudah tertata dibandingkan membaca dokumentasi 😂.

Maka dari situ saya bisa memulai projek saya sendiri dengan cara berikut:

1. Pastikan sudah mendaftar untuk mendapatkan Akun vercel
2. Memasang Now CLI untuk melakukan development dan deployment nanti
3. Semua endpoint diletakkan di direktori `api/**`
4. Endpoint berdasarkan direktori, mirip dengan Next dan Nuxt dalam membuat route halaman
5. Membuat API pertama dengan data hardcode, buat berkas `index.ts` pada direktori `api` dengan kode berikut:

```ts
import { NowRequest, NowResponse } from '@now/node';

export default (req: NowRequest, res: NowResponse) => {
  res.json({
    hello: 'world!',
  });
};
```

6. Deploy untuk pertama kalinya dengan perintah `now`, pastikan kalian sudah memasang Now CLI ya.
7. Buka halaman dashboard setelah selesai dan uji Rest API sederhana kalian.

## Menyimpan Data "Like"

Salah satu masalah ketika menggunakan platform gratisan seperti ini memang tidak tersedianya Database yang bisa digunakan dengan mudah untuk menyimpan data. Dan sekali lagi, karena saya "tidak modal" maka saya memikirkan cara yang ngeselin untuk menyimpan data tersebut.

Karena beberapa waktu terakhir saya banyak bermain dengan [API dari Github](https://developer.github.com/v3/), akhirnya yang terfikir oleh saya adalah menyimpan data tersebut di sebuah Secret Gist saja. Datanya berbentuk dokumen berformat JSON sehingga mudah untuk di proses dengan kode JavaScript.

Untuk kalian yang juga ingin bermain dengan Github API, kalian bisa mencoba menggunakan pustaka [Octokit Rest.js](https://octokit.github.io/rest.js/v17/). Kalian bisa berinteraksi dengan hampir keseluruhan Github API yang tersedia untuk publik dengan interface yang lebih mudah. Kalau kalian scroll ke bagian [Gists](https://octokit.github.io/rest.js/v17#gists), kalian bisa menemukan interface untuk membaca dan memperbarui data yang tersedia di Gist kalian.

Hal yang perlu kalian ketahui ketika menggunakan Github API adalah terdapat [Rate Limiter](https://developer.github.com/v3/#rate-limiting) yang membuat kalian tidak bisa memanfaatkan API secara membabi buta.

## Membaca Data "Like" di Gist

Untuk membaca data di Gist, kalian bisa menggunakan kode berikut:

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

## Increment Data "Like" di Gist

Setiap kali tombol "Like" ditekan, kita akan memperbarui data pada Gist kita. Berikut kode sederhana yang saya buat:

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

Saya membuat 3 endpoint untuk memenuhi kebutuhan ini, yakni:

```md
- `/api/likes` untuk mengambil semua data Like yang tersedia
- `/api/like/[slug]/get` untuk mengambil data slug pada spesifik slug
- `/api/like/[slug]/update` untuk memperbarui data pada slug tertentu
```

Untuk 3 endpoint ini, kita bisa membuat direktori sebagai berikut:

```md
- `api`
  |- `likes`
  |- `index.ts`
  |- `like`
  |- `[slug]`
  |- `get.ts`
  |- `update.ts`
```

## Memasang Cache

Karena Github memiliki rate limiter seperti sudah kita bahas bersama pada bagian sebelumnya, saya memutuskan untuk tidak selalu membaca data terkini dari jumlah like. Saya menambahkan header dengan cache control `max-age=3600` selain endpoint update. Kita bisa melakukan setting header ini di berkas `now.json` yang tersedia pada root projek seperti berikut:

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

## Bagaimana Hasilnya?

Kalian bisa scroll ke bagian akhir dari artikel ini, terdapat tombol like cupu yang bisa kalian klik. Bagain tersebut memanfaatkan API yang saya buat dengan paltform Now seperti yang sudah kita perbincangkan di artikel ini.

