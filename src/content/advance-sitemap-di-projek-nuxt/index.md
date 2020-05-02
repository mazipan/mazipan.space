---
title: Advance Sitemap di Projek Nuxt
date: "2019-05-03"
description: Bagaimana membuat sitemap dengan lebih baik, lebih optimal dan tertata rapi untuk projek Nuxt
author: mazipan
draft: false
tags: [vue, web]
image: ./images/advance-sitemap-nuxtjs.png
lang: id
---

Saya dulu pernah setiap hari menggunakan Nuxt.js karena memang di kantor menggunakannya, namun saat ini saya sudah tidak lagi mengikuti perkembangannya setiap hari maka dari itu bisa jadi apa yang saya bagikan sebenarnya adalah hal basi dan bukan baru lagi hanya saja saya baru mengetahuinya beberapa hari ini, saya merasa ini perlu saya tuliskan dengan lebih baik di blog saya.

Beberapa hari terakhir saya coba merapikan kembali projek lama saya yang telah terlunta-lunta tidak disentuh, salah satunya adalah projek Quran-Offline. Sekalian karena memang momennya pas, saya ingin menggunakan lebih sering untuk kepentingan pribadi. Akan lebih asik jika saya perbaiki satu dan lain hal mengenai projek tersebut.

Dalam proses pembenahan tersebut, saya menambahkan halaman baru yang membuat jumlah halaman statis yang harus dibuat oleh Nuxt pada saat proses build menjadi naik secara drastis. Hal ini juga pada akhirnya berdampak pada Sitemap.xml yang harus saya buat. Saya coba jelaskan dulu bagaimana saya membuat sitemap.xml sebelumnya.

## Sitemap.xml sebelumnya

Sebenarnya saya sudah tepat menggunakan module [@nuxtjs/sitemap](https://github.com/nuxt-community/sitemap-module#readme) untuk membuat sitemap saya. Hanya saja karena tertinggal perkembangannya, maka cara saya menggunakannya yang masih cara lama dulu awal-awal saya lihat di dokumentasi mereka.

Pertama kalian pastikan sudah menambahkan paket ini ke dalam daftar devDependencies.

```bash
$ yarn add @nuxtjs/sitemap -D
# atau
$ npm i @nuxtjs/sitemap --dev
```

Berikutnya menambahkan ke dalam konfigurasi utama Nuxt, `nuxt.config.ts

```js
{
  // pastikan sitemap menjadi module paling akhir yang kalian sematkan
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/sitemap'
  ]
}
```

Menambahkan konfigurasi sitemap, berikut adalah konfiguasi lama yang saya gunakan di `nuxt.config.ts`:

```js
{
  sitemap: {
    hostname: PROD_PATH,
    cacheTime: 1000 * 60 * 15,
    gzip: true,
    routes: getSitemapRoutes()
  }
}
```

Fungsi `getSitemapRoutes` sendiri kurang lebih seperti berikut:

```ts
interface sitemap {
  url: string
  changefreq: string
  priority: number
  lastmodISO: string
}

const getAllRoutes = () => {
  const r = ['/about', '/all-surah'];
  for (let i = 1; i < 115; i++) {
    r.push(`/${i}`)
    for (let j = 1; j < surah.ayah_count; j++) {
      r.push(`/${i}/${j}`)
    }
  }
  return r;
}

const getSitemapRoutes = (): sitemap[] => {
  return getAllRoutes().map((el) => {
    const item: sitemap = {
      url: el,
      changefreq: 'daily',
      priority: 1,
      lastmodISO: String(new Date().toISOString())
    }
    return item;
  })
}

export default getSitemapRoutes
```

## Masalah Sitemap.xml sebelumnya

Seperti kalian lihat pada cara saya membuat sitemap diatas, saya membuat satu array dari semua halaman dinamis yang tersedia untuk kemudian akan di proses oleh module `@nuxtjs/sitemap` menjadi satu file sitemap.xml. Cara ini baik-baik saja, sampai menambahkan halaman dinamis baru yang kalau saya buat jadi satu file sitemap.xml maka kemungkinan file tersebut menjadi terlalu besar dan kemungkinan akan timeout ketika coba diakses oleh Google Search Console. Cara umum yang ditempuh oleh para pemilik website dengan jumlah sitemap yang terlampau banyak untuk membuat sitemap mereka adalah dengan memecahnya sesuai dengan kategori yang mereka tentukan. Sedangkan satu entry poin sitemap.xml hanya memuat tautan ke sitemap lainnya.

Saya sih sudah mengerti cara ini, cuma kok saya pikir terakhir kali saya baca dokumentasi mereka (mungkin lebih dari setahun yang lalu) saya tidak bisa menemukan cara membuat multiple sitemap. Apa saya salah, atau memang sudah ada solusi lain dari mereka. Pas coba cari tau, ternyata dokumantasi mereka saat ini sudah bisa mengakomodir kebutuhan advance dalam pembuatan sitemap tersebut. Langsung saja kita perbaiki cara pembuatan sitemapnya...

## Sitemap.xml terbaru

Berbekal dokumentasi terbaru dari `@nuxtjs/sitemap`, saya memutuskan untuk memecah berkas sitemap saya ke dalam beberapa berkas terpisah berdasarkan ketegori berikut:

```md
--- sitemaps.xml
  | sitemaps/
  |---- static.xml
  |---- allsurah.xml
  |---- surah-1.xml
  |---- surah-2.xml
```

Untuk mengakomodir pemecahan sitemaps seperti diatas saya perlu menambahkan konfiguasi berikut di `nuxt.config.ts`:

```js
{
  sitemap: {
    hostname: PROD_PATH,
    cacheTime: 1000 * 60 * 60,
    gzip: true,
    path: 'sitemaps.xml',
    sitemaps: getSitemaps()
  },
}
```

Saya memisahkan script yang saya gunakan untuk mengerjakan pemecahan sitemaps ke dalam fungsi `getSitemaps()`, script tersebut berisi kurang lebih:

```js
import SurahConstant from './surah'

const getAllSurahRoutes = (): string[] => {
  const res: string[] = []
  for (let i = 1; i < 115; i++) {
    res.push(`/${i}`)
  }
  return res
}

const getSurahRoutesByIndex = (surahIndex: number): string[] => {
  const res: string[] = []
  const surahObj = SurahConstant.find(item => item.index === surahIndex)
  if (surahObj) {
    for (let j = 1; j < surahObj.ayah_count + 1; j++) {
      res.push(`/${surahIndex}/${j}`)
    }
  }
  return res
}

const getSurahSitemaps = (): sitemapConfigs[] => {
  const res: sitemapConfigs[] = []
  for (let i = 1; i < 115; i++) {
    const surahSitemap: sitemapConfigs = {
      path: `sitemaps/surah-${i}.xml`,
      routes: getSurahRoutesByIndex(i)
    }
    res.push(surahSitemap)
  }
  return res
}

const getSitemaps = (): sitemapConfigs[] => {
  const staticSitemap: sitemapConfigs = {
    path: 'sitemaps/static.xml',
    routes: [
      '/',
      '/about'
    ]
  }

  const allSurahSitemap: sitemapConfigs = {
    path: 'sitemaps/allsurah.xml',
    routes: getAllSurahRoutes()
  }

  const res: sitemapConfigs[] = [staticSitemap, allSurahSitemap].concat(getSurahSitemaps())
  return res
}

export default getSitemaps
```

## Mengenai Nuxt Generate

Nuxt memiliki kemampuan untuk membuat berkas statis dengan perintah `nuxt generate` sehingga kita bisa mendeploy projek kita tanpa Backend lagi karena berkas akhir hanya berbentuk HTML statis beserta sumber daya statis lain seperti CSS dan JavaScript.

Sayangnya melakukan proses `generate` pada berkas dengan jumlah mencapai ribuan halaman bukanlah hal yang direkomendasikan karena lamanya proses tersebut. Hal ini bisa dimaklumi karena Nuxt melakukan proses prerender yang mana kurang lebih dia mengunjungi halaman kita sampai ter-render dengan baik kemudian mengambil hasil render tersebut untuk dibuatkan berkas HTML statis. Pada kasus saya, terdapat lebih dari 6000 halaman yang perlu saya generate.

Untuk mengurangi beban Nuxt pada proses `generate` saya memutuskan untuk tidak melakukannya terhadap semua halaman. Namun saya tetap membuat berkas statis dengan cara lain. Pada projek [Quran Offline](https://quran-offline.netlify.app/), saya hanya melakukan proses `generate` pada setiap ayat pertama dari semua surat. Sehingga saya hanya perlu melakukan generate halaman surat dan ayat pertama saja, sekitar `114 * 2 = 218` halaman. Dan untuk mengatasi hard reload yang menjadi 404 karena tidak adanya berkas HTML statis, maka saya menambahkan script untuk menduplikasi ayat pertama ke dalam ayat-ayat berikutnya di dalam surat tersebut. Ya, tentu saja cara ini membuat meta data dan konten dari halaman tersebut menjadi tidak valid, tapi sebenarnya ada proses render ulang yang terjadi pada sisi klien bilamana konten tidak sesuai dengan yang seharusnya sehingga untuk pengguna awam tidak akan begitu menyadari ada gap antara berkas HTML awal dengan konten yang seharusnya ditampilkan.

Untuk lebih jelasnya, silahkan kunjungi projek Quran Offline di Github pada tautan [github.com/mazipan/quran-offline](https://github.com/mazipan/quran-offline)

----

Semoga bermanfaat