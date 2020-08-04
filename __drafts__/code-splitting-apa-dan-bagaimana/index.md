---
title: Code splitting, apa dan bagaimana?
date: '2020-08-02'
description: Membicarakan mengenai bagaimana seharusnya code splitting itu dilakukan dalam ranah dunia frontend
author: mazipan
draft: false
tags: [javascript]
image: ./images/pizza-slice.jpg
lang: id
enready: false
---

**Code splitting** menjadi banyak diperbicangkan dikarenakan adanya pergeseran pendekatan dalam membangun website. Dari yang dulunya orang lebih senang dengan *Multi Page Application* (MPA) sekarang bergeser pada *Single Page Application* (SPA). Mesti diakui dulu bahwa SPA bukanlah peluru perak yang akan memecahkan semua masalah yang terjadi dalam MPA, salah-salah mengadopsi tanpa pengetahuan yang baik malah bisa mengakibatkan penurunan kualitas. SPA mendapatkan popularitasnya karena menjanjikan kecepatan berpindah antar halaman tanpa perlu memuat ulang keseluruhan bagian halaman, melainkan cukup bagian dinamis saja yang dimuat ulang dan membiarkan bagian yang sama dari halaman sebelumnya. Secara teori tanpa memikirkan faktor lain, SPA memang seharusnya secara drastis bisa meningkatkan kecepatan memuat sebuah halaman, sampai mereka menyadari ada hal yang salah.

## SPA dan code splitting

Bagaimana SPA bisa memberikan pengalaman berpindah halaman yang instan? Umumnya karena tidak lagi memerlukan komunikasi dari Server untuk memindahkan halaman serta hanya memanggil sumber daya (JS, CSS, dan gambar) baru dan tidak memanggil sumber daya yang sebelumnya sudah ada. Hal ini akan sangat terlihat pada kunjungan kedua dan seterusnya.

![Perpindahan Halaman di SPA](images/spa-move-route.gif)

Sayangnya, umumnya SPA memiliki waktu muat pertama yang lebih lambat dibandingkan dengan metode MPA tradisional. Kenapa bisa terjadi? Karena pada MPA kita tidak perlu mencampur kode satu halaman dengan halaman lain, lebih mudah untuk menentukan halaman ini membutuhkan sumber daya apa (teorinya, prakteknya sih tidak kalah rumit juga), berbeda dengan SPA yang umumnya sangat mengandalkan JavaScript dengan berbagai framework nya untuk menangani perpindahan halaman ini yang umumnya hampir sebagian besar framework kekinian menggunakan satu pintu masuk (*entry point*) untuk keseluruhan aplikasi.

Dari gambaran di atas sudah bisa terbayang bahwa sangat besar kemungkinan nantinya si developer tidak tepat dalam membedakan kebutuhan sumber daya antar satu halaman dengan halaman lain.

Dalam praktek pengembangan frontend sebuah website dengan teknologi JavaScript terkini dikenal satu solusi umum untuk menyelesaikan masalah ini, yakni pemecahan kode atau **Code Splitting**. *Code splitting* bisa digambarkan sebagai proses pemecahan kode yang sebelumnya saling tergabung menjadi satu berkas menjadi bebrapa berkas dengan strategi yang telah ditentukan sesuai dengan kebutuhan dan tujuan yang ingin dicapai oleh masing-masing developer. Pekerjaan untuk memecah satu berkas menjadi berkas yang berbeda akan ditangani oleh *bundler* semacam webpack, rollup maupun parcel. Konfiguasinya bisa berbeda-beda tergantung dari *bundler* dan framework yang kita gunakan. Tapi pada umunya sih mirip-mirip dan tidak begitu ribet kode di sisi *bundler* untuk mengaktifkan kemampuan mengerjakan *code splitting*. Bagian tersulit justru di level kode aplikasi kita sendiri, *bundler* hanya menyediakan fiturnya namun si developer yang menentukan bagaiman kode kita akan dipecah.

*Code splitting* memiliki peranan yang esensial di dalam arsitektur yang mengadopsi SPA, terutama bila jumlah halaman yang ditangani lebih dari 1. Alasan ini pula yang membuat berbagai framework yang sudah komplit biasanya akan menangani ini secara otomatis. Paling tidak pada hal-hal yang cukup umum, misalnya berdasarkan sebuah threshold ukuran berkas, ketika ukuran berkas sudah menyentuh ambang batas maksimum maka framework akan memutuskan untuk memcahnya ke dalam berkas berbeda.

## Code Splitting di atas Module Bundler

Code splitting umumnya dikerjakan pada projek berbasiskan JavaScript framework kekinian.
Kode framework ini dibangun di atas berbagai Module Bundler seperti webpack, Rollup maupun Parcel.

Implementasi code splitting di atas Module Bundler bisa jadi sedikit ada perbedaan, berikutnya akan kita bahas ketiga bundler populer ini dalam mengimplementasikan code splitting pada lingkungannya. Sebagian besar code splitting akan memanfaatkan dukungan *dynamic import* pada kode JavaScript, meskipun pada beberapa framework juga bisa menggunakan bantuan pustaka tambahann namun biasanya kasusnya sudah sangat spesifik pada framework tertentu, kita mungkin tidak akan membahasnya pada artikel kali ini.

### Parcel

[Parcel.js](https://parceljs.org/) memang mengusung zero configuration sehingga banyak kebutuhan umum yang sudah ada secara bawaan tanpa kita perlu melakukan setting apapun terhadapnya.

Begitu pula untuk mengaktifkan fitur code splitting di Parcel, tidak ada konfigurasi apapun yang perlu kita berikan ke Parcel, seperti terlihat juga pada [dokumentasi resmi Parcel mengenai code splitting](https://parceljs.org/code_splitting.html).

Cukup menambahkan *dynamic import* pada kode kalian, dan Parcel akan memecahnya secara out of the box, contoh kode bisa dilihat pada baris berikut ini:

```js
const pages = {
  about: import('./pages/about'), // dynamic import
  blog: import('./pages/blog') // dynamic import
}

async function renderPage(name) {
  const page = await pages[name]
  return page.render()
}
```

### Rollup

[Rollup](https://rollupjs.org) pun pada dasarnya tidak memerlukan konfigurasi macam-macam untuk mengaktifkan code splitting, seperti bisa dibaca pada [dokumentasi resmi](https://rollupjs.org/guide/en/#code-splitting) cukup menambahkan *dynamic import* bila kita butuh memecah suatu kode menjadi chunk baru. Namun ada beberapa kasus mutakhir dimana kalian perlu mengatur secara manual strategi pemecahan chunk, kalian bisa bermain dengan konfigurasi [output.manualChunks](https://rollupjs.org/guide/en/#outputmanualchunks), [output.entryFileNames](https://rollupjs.org/guide/en/#outputentryfilenames) dan [output.chunkFileNames](https://rollupjs.org/guide/en/#outputchunkfilenames).

Rollup sudah menyediakan juga [contoh kode penerapan code splitting](https://github.com/rollup/rollup-starter-code-splitting) secara sederhana, kalian bisa coba ikuti dan lihat penggunannya.

### Webpack

[Webpack](https://webpack.js.org/) memang biasanya sangat mendukung untuk kebutuhan yang cukup aneh-aneh pada platformnya, termasuk urusan code splitting. Untuk konfiguasi dasar bisa dibaca pada [dokumentasi resmi mengenai code splitting](https://webpack.js.org/guides/code-splitting/).

Biasanya untuk memproduksi file chunk kita perlu menambahkan konfigurasi `output.chunkFilename` agar bisa mendefinisikan akan seperti nama file yang akan dibuat nantinya.

```js
output: {
  filename: '[name].[contenthash].js',
  chunkFilename: '[name].chunk.[contenthash].js',
  path: path.resolve(__dirname, 'dist'),
},
```

Untuk menambahkan optimisasi lebih, kita bisa menambahkan konfigurasi di bawah `optimization.splitChunks` sesuai dengan strategi yang kita inginkan, misalnya saja seperti kode berikut:

```js
optimization: {
  splitChunks: {
    chunks: 'all',
  },
},
```

Untuk kasus yang lebih mutakhir lagi, kalin bisa melihat ke dalam berbagai contoh pada artikel [penggunaan splitChunks](https://webpack.js.org/plugins/split-chunks-plugin/#split-chunks-example-1).

Webpack pada dasarnya pun memanfaatkan fitur *dynamic import*, hanya saja ada *magic comment* yang hanya tersedia di webpack untuk kita bisa menentukan beberapa hal terkait chunk yang dihasilkan, seperti nama chunk, cara memuat chunk dan beberapa hal lain. Contoh penggunaanya bisa dilihat pada kode berikut:

```js
return import(/* webpackChunkName: "lodash" */ 'lodash').then(({ default: _ }) => {
  const element = document.createElement('div');
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  return element;
}).catch(error => 'An error occurred while loading the component');
```

Kode `/* webpackChunkName: "lodash" */` adalah perintah bagi webpack untuk memberikan nama `lodash` pada chunk yang dihasilkan. Lebih lengkapnya mengenai *magic comment* ini bisa dibaca pada artikel [Magic Comment di webpack](https://webpack.js.org/api/module-methods/#magic-comments).

## Mengenai lazy load

Kendati code splitting sangat erat kaitannya dengan lazy load, namun tidak semua code splitting itu di lazy load. Itu kenapa perlu dipecah dulu pemahaman kita mengenai code splitting dan lazy load.

Code splitting sendiri merupakan teknik untuk memecah kode menjadi beberapa file yang berbeda, sedangkan lazy load adalah teknik untuk meminta suatu sumber daya secara *programmatically* pada saat dibutuhkan saja.

Contoh gampang dan umum mengenai impelementasi lazy load ini bisa dilihat pada teknik pemuatan gambar pada suatu web. Gambar atau diwakili tag `<img />` pada HTML secara bawaan memiliki perilaku akan memuat gambar yang terdapat pada atribut `src` yang disematkan kepadanya, dimanapun dia berada selama terdapat pada kode HTML yang akan dimuat. Hal ini menjadi masalah karena biasanya hanya sebagian kecil gambar yang dilihat oleh pengguna saat pertama kali datang ke situs kita. Maka dari itu ada teknik lazy load untuk memuat gambar hanya saat gambar itu sedang atau akan dilihat oleh pengguna.

Teknik yang sama juga bisa diaplikasiskan pada sumber daya lain, misalnya JavaScript seperti yang sedang kita bahas. Kita bisa menunda permintaan suatu file JavaScript dikarenakan memang tidak digunakan pada saat itu. Teknik ini sama juga biasa dikenal sebagai lazy load.

Umumnya code splitting itu sudah lazy load, misalnya kita mengunjungi halaman "Beranda" maka kita tidak akan disajikan kode JavaScript yang ada di halamana "Product Detail", ini ya praktek lazy load. Tapi ada beberapa kasus dimana code splitting yang tidak lazy load, contohnya misal kita memecah pustaka `lodash` menjadi berkas terpisah, dan pada kasus kita ketika kita mengunjungi hamanan "Beranda" kita akan membuat permintaan ke berkas `beranda.js` dan `lodash.js` karena memang halaman "Beranda" kita membutuhkan `lodash`.

## Mengenai tree-shaking

Contoh kode tree-shake

## Baik buruk dari code splitting

Kendati *code splitting* adalah hal esensial bagi sebuah SPA, namun mengerjakannya dengan serampangan bukanlah hal yang ideal. Diperlukan analisa terlebih dahulu sebelum memutuskan untuk memecah satu kode ke dalam berkas lain.

## Hal yang paling penting untuk dipecah

- Route
-

## Kesimpulan

Diperlukan analisa terhadap kondisi aplikasi kalian sebelum melakukan *code splitting*.
Kode yang paling penting untuk dipecah saat pertama kali adalah kode yang berada di level halaman (*route*), sisanya bisa menyusul.
Code splitting seharusnya dikombinasikan dengan kemampuan *lazy load* dan *tree-shaking*.

### Kredit

- Foto sampul dari [pexels.com](https://www.pexels.com/photo/close-up-photo-of-person-holding-pizza-1653877/)

---

Demikian, semoga bermanfaat