---
title: Advance Sitemap di Projek Nuxt
date: '2020-05-03'
excerpt: Bagaimana membuat sitemap dengan lebih baik, lebih optimal dan tertata rapi untuk projek Nuxt
author: mazipan
published: true
featured: false
tags: [vue, web]
coverImage: /thumbnail/advance-sitemap-di-projek-nuxt/advance-sitemap-nuxtjs.png
lang: id
---

Saya dulu pernah setiap hari menggunakan Nuxt.js karena memang di kantor menggunakannya, namun saat ini saya sudah tidak lagi mengikuti perkembangannya dengan baik maka dari itu bisa jadi apa yang akan saya bagikan pada artikel ini sebenarnya adalah hal yang sudah basi dan bukan barang baru lagi. Hanya saja karena saya baru mengetahuinya beberapa hari ini, saya merasa ini perlu saya tuliskan dengan lebih baik di blog saya sebagai catatan belajar bagi saya pribadi dan bagi teman-teman pembaca yang mengalami kasus serupa.

Beberapa hari terakhir, saya mencoba merapikan kembali projek lama saya yang telah terlunta-lunta tidak disentuh dalam waktu yang tidak sebentar, salah satunya adalah projek [Quran Offline](https://github.com/mazipan/quran-offline). Sekalian karena memang momennya pas, saya ingin menggunakannya dengan lebih sering untuk kepentingan pribadi. Akan lebih asik jika saya perbaiki satu dan lain hal mengenai projek tersebut.

Dalam proses pembenahan tersebut, saya menambahkan halaman baru yang membuat jumlah halaman statis yang harus dibuat oleh Nuxt pada saat proses _build_ atau lebih tepatnya proses `generate` menjadi naik secara signifikan. Hal ini juga pada akhirnya berdampak pada berkas Sitemap.xml yang harus saya buat. Saya coba jelaskan dulu bagaimana saya membuat sitemap.xml sebelumnya.

## Sitemap.xml sebelumnya

Sebenarnya saya sudah tepat menggunakan module [@nuxtjs/sitemap](https://github.com/nuxt-community/sitemap-module#readme) untuk membuat sitemap saya. Hanya saja karena tertinggal perkembangannya, maka cara saya menggunakannya yang masih cara lama dulu awal-awal saya lihat di dokumentasi mereka.

Pertama kalian pastikan sudah menambahkan paket ini ke dalam daftar `devDependencies` di package.json, bisa menggunakan perintah berikut:

```bash
$ yarn add @nuxtjs/sitemap -D
# atau
$ npm i @nuxtjs/sitemap --dev
```

Setelahnya kita perlu menambahkan module ke dalam konfigurasi utama Nuxt, `nuxt.config.ts` seperti berikut ini:

```javascript
{
  // pastikan sitemap menjadi module paling akhir yang kalian sematkan
  modules: ['@nuxtjs/pwa', '@nuxtjs/sitemap'];
}
```

Menambahkan konfigurasi sitemap, berikut adalah konfiguasi lama yang saya gunakan di `nuxt.config.ts`:

```javascript
{
  sitemap: {
    hostname: PROD_PATH,
    cacheTime: 1000 * 60 * 15,
    gzip: true,
    routes: getSitemapRoutes()
  }
}
```

Fungsi `getSitemapRoutes` sendiri kurang lebih berisi kode seperti berikut:

```javascript
const getAllRoutes = () => {
  const r = ['/about', '/all-surah'];
  for (let i = 1; i < 115; i++) {
    // Surah page
    r.push(`/${i}`);
    for (let j = 1; j < surah.ayah_count; j++) {
      // Ayah page
      r.push(`/${i}/${j}`);
    }
  }
  return r;
};

const getSitemapRoutes = () => {
  return getAllRoutes().map((el) => {
    const item: sitemap = {
      url: el,
      changefreq: 'daily',
      priority: 1,
      lastmodISO: String(new Date().toISOString()),
    };
    return item;
  });
};

export default getSitemapRoutes;
```

## Masalah Sitemap.xml sebelumnya

Seperti kalian lihat pada cara saya membuat sitemap diatas, saya membuat satu array dari semua halaman dinamis yang tersedia untuk kemudian akan di proses oleh module `@nuxtjs/sitemap` menjadi satu file sitemap.xml. Cara ini sebenarnya baik-baik saja jika jumlah halamannya normal, namun jika jumlah halamannya terlalu banyak dan kita hanya membuatnya menjadi satu file sitemap.xml maka kemungkinan file tersebut bisa menjadi terlalu besar dan kemungkinan akan timeout ketika akan diakses oleh Google Bot.

Cara umum yang ditempuh oleh para pemilik website dengan jumlah sitemap yang terlampau banyak dalam mengatur sitemap mereka adalah dengan memecahnya sesuai dengan kategori yang mereka tentukan. Sedangkan satu entry poin sitemap.xml biasanya hanya akan memuat tautan ke sitemap lainnya yang berisi lebih detail mengenai daftar url yang tersedia pada kategori tersebut.

Saya sih sudah mengerti cara ini, cuma kok saya ingat-ingat lagi, sepertinya terakhir kali saya baca dokumentasi mereka (mungkin lebih dari setahun yang lalu) saya tidak menemukan cara membuat multiple sitemap. Apa saya salah baca? atau memang sudah ada solusi lain dari mereka? Pas saya coba cari tau ulang, ternyata dari dokumantasi resmi mereka sendiri, saat ini mereka sudah bisa mengakomodir kebutuhan advance dalam pembuatan sitemap tersebut. Langsung saja kita perbaiki cara pembuatan sitemapnya...

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

Untuk mengakomodir pemecahan sitemaps seperti diatas saya perlu menambahkan konfigurasi berikut di `nuxt.config.ts`:

```javascript
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

```javascript
import SurahConstant from './surah';

const getAllSurahRoutes = () => {
  const res = [];
  for (let i = 1; i < 115; i++) {
    res.push(`/${i}`);
  }
  return res;
};

const getSurahRoutesByIndex = (surahIndex) => {
  const res = [];
  const surahObj = SurahConstant.find((item) => item.index === surahIndex);
  if (surahObj) {
    for (let j = 1; j < surahObj.ayah_count + 1; j++) {
      res.push(`/${surahIndex}/${j}`);
    }
  }
  return res;
};

const getSurahSitemaps = () => {
  const res = [];
  for (let i = 1; i < 115; i++) {
    const surahSitemap = {
      path: `sitemaps/surah-${i}.xml`,
      routes: getSurahRoutesByIndex(i),
    };
    res.push(surahSitemap);
  }
  return res;
};

const getSitemaps = () => {
  const staticSitemap = {
    path: 'sitemaps/static.xml',
    routes: ['/', '/about'],
  };

  const allSurahSitemap = {
    path: 'sitemaps/allsurah.xml',
    routes: getAllSurahRoutes(),
  };

  const res = [staticSitemap, allSurahSitemap].concat(getSurahSitemaps());
  return res;
};

export default getSitemaps;
```

## Mengenai Nuxt Generate

Nuxt memiliki kemampuan untuk membuat berkas statis dengan perintah `nuxt generate` sehingga kita bisa mendeploy projek kita tanpa Backend lagi karena berkas akhir hanya berbentuk HTML statis beserta sumber daya statis lain seperti CSS dan JavaScript.

Sayangnya melakukan proses `generate` pada berkas dengan jumlah mencapai ribuan halaman bukanlah hal yang direkomendasikan karena lamanya proses tersebut. Hal ini bisa dimaklumi karena Nuxt melakukan proses prerender yang mana kurang lebih dia mengunjungi halaman kita sampai ter-render dengan baik kemudian mengambil hasil render tersebut untuk dibuatkan berkas HTML statis. Pada kasus saya sendiri, terdapat lebih dari 6000 halaman yang perlu saya generate.

Untuk mengurangi beban Nuxt pada proses `generate` saya memutuskan untuk tidak melakukannya terhadap semua halaman. Namun saya tetap membuat berkas statis dengan cara lain. Pada projek [Quran Offline](https://www.baca-quran.id/), saya hanya melakukan proses `generate` pada setiap ayat pertama dari semua surat. Sehingga saya hanya perlu melakukan generate halaman surat dan ayat pertama saja, sekitar `114 * 2 = 228` halaman. Dan untuk mengatasi hard reload yang menjadi 404 karena tidak adanya berkas HTML statis, maka saya menambahkan script untuk menduplikasi ayat pertama ke dalam ayat-ayat berikutnya di dalam surat tersebut. Ya, tentu saja cara ini membuat meta data dan konten dari halaman tersebut menjadi tidak valid, tapi sebenarnya ada proses render ulang yang terjadi pada sisi klien bilamana konten tidak sesuai dengan yang seharusnya sehingga untuk pengguna awam tidak akan begitu menyadari ada gap antara berkas HTML awal dengan konten yang seharusnya ditampilkan.

Untuk lebih jelasnya, silahkan kunjungi projek Quran Offline di Github pada tautan [github.com/mazipan/quran-offline](https://github.com/mazipan/quran-offline)

---

Semoga bermanfaat
