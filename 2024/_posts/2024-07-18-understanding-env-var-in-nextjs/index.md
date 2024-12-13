---
title: Memahami enviroment variable di Next.js
date: '2024-07-18'
excerpt: Bagaimana seharusnya menggunakan environment variable di Next.js
author: mazipan
published: false
featured: false
tags: [web]
coverImage: /thumbnail/understanding-env-var-in-nextjs/pexels-mumtahina-tanni-1080117-3230539.jpg
lang: id
enready: false
---

Artikel mengenai bagaimana Next.js menangani env var sebenarnya bisa dibaca secara tuntas di laman ofisial mereke "[Environment Variables di Next.js](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)". Artikel yang saya tulis hanya pengulangan pembahasan bagi yang masih kesulitan memahami artikel tersebut, jadi kalau kalian merasa topik pembahasan ini terlalu sepele untuk kalian, saya sarankan untuk berhenti meneruskan membaca dan cukup mengabaikannya saja.

## Mengenai env var

Env var atau *Environment Variable* marupakan variabel dinamis di luar dari program/aplikasi, biasanya merupakan bawaan dari sistem operasi suatu mesin, yang dapat mempengaruhi bagaimana program tersebut bekerja di sistem operasi tersebut.

Beberapa kegunaan utama dari anv var dalam pengembangan perangkat lunak adalah:

- **🔧 Konfigurasi Aplikasi**: Menyimpan nilai-nilai konfigurasi seperti URL basis data, kredensial, dan kunci API tanpa harus menyimpannya dalam kode sumber.

- **🌲 Pengelolaan Lingkungan**: Membantu mengelola berbagai lingkungan (development, staging, production) dengan konfigurasi yang berbeda-beda.

- **🛡️ Keamanan**: Menyimpan informasi sensitif seperti password dan token yang tidak boleh disimpan dalam kode sumber.

- **📦 Portabilitas**: Memungkinkan aplikasi untuk dengan mudah dipindahkan dan dijalankan di berbagai sistem dengan sedikit atau tanpa perubahan pada kode.

Env var berisi pasangan *key-value*, dan biasanya disimpan dalam file `.env` yang dibaca secara otomatis sebagai env var tambahan yang didefinisikan untuk dibutuhkan saat aplikasi tersebut akan dijalankan.

Contoh isi dari sebuah `.env`:

```bash
# Contoh env var
DOMAIN_APLIKASI="https://mazipan.space"
DOMAIN_ASET="https://imagekit.io/sebuah-alamat"
```

## Env var di Node.js

Dari artikel [How to read environment variables from Node.js](https://nodejs.org/en/learn/command-line/how-to-read-environment-variables-from-nodejs), pada dasarnya Node.js bisa otomatis membaca env var yang ada di sistem operasi semudah dengan kode `process.env.SEBUAH_ENV_VAR`. Jadi misal di sebuah sistem operasi terdapat env-var


```bash
# Contoh env var
DOMAIN_APLIKASI="https://mazipan.space"
DOMAIN_ASET="https://imagekit.io/sebuah-alamat"
```

Maka kamu bisa membaca dengan kode berikut

```ts
process.env.DOMAIN_APLIKASI; // "https://mazipan.space"
process.env.DOMAIN_ASET;     // "https://imagekit.io/sebuah-alamat"
```

Dalam kasus misalnya env var tersebut didefinisikan melalui file `.env`, kamu perlu menambahkan sedikit perintah saat menjalankan program, contohnya:

```bash
node --env-file=.env index.js
```

## Env var di React.js

React.js dasarnya adalah javascript framework yang awalnya "hanya" jalan di peramban, maka secara natural dia tidak bisa membaca env var. Env var hanya bisa di-*supply* dari kode Node.js (server-side) ke kode React.

## Env var di Next.js

## 👋 Sekian dan terima kasih

Semoga bermanfaat 🙇

---

Foto cover diambil dari laman [Pexel](https://www.pexels.com/id-id/foto/orang-yang-mengumpulkan-sampah-di-tempat-pembuangan-akhir-3230539/), Foto oleh [Mumtahina Tanni](https://www.pexels.com/id-id/@mumtahina-tanni-1080117/)
