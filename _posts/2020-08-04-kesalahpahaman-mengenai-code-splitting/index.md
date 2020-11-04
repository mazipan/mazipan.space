---
title: Kesalahpahaman mengenai code splitting
date: '2020-08-04'
excerpt: Membicarakan mengenai bagaimana seharusnya code splitting itu dilakukan dalam ranah dunia frontend
author: mazipan
published: true
featured: false
tags: [javascript]
coverImage: /thumbnail/kesalahpahaman-mengenai-code-splitting/pizza-slice.jpg
lang: id
enready: false
---

**Code splitting** menjadi banyak diperbicangkan dikarenakan adanya pergeseran pendekatan dalam membangun website. Dari yang dulunya orang lebih senang dengan _Multi Page Application_ (MPA) sekarang bergeser pada _Single Page Application_ (SPA). Mesti diakui dulu bahwa SPA bukanlah peluru perak yang akan memecahkan semua masalah yang terjadi dalam MPA, salah-salah mengadopsi tanpa pengetahuan yang baik malah bisa mengakibatkan penurunan kualitas. SPA mendapatkan popularitasnya karena menjanjikan kecepatan berpindah antar halaman tanpa perlu memuat ulang keseluruhan bagian halaman, melainkan cukup bagian dinamis saja yang dimuat ulang dan membiarkan bagian yang sama dari halaman sebelumnya. Secara teori tanpa memikirkan faktor lain, SPA memang seharusnya secara drastis bisa meningkatkan kecepatan memuat sebuah halaman, sampai mereka menyadari ada hal yang salah.

## SPA dan code splitting

Bagaimana SPA bisa memberikan pengalaman berpindah halaman yang instan? Umumnya karena tidak lagi memerlukan komunikasi dari Server untuk memindahkan halaman serta hanya memanggil sumber daya (JS, CSS, dan gambar) baru dan tidak memanggil sumber daya yang sebelumnya sudah ada. Hal ini akan sangat terlihat pada kunjungan kedua dan seterusnya.

![Perpindahan Halaman di SPA](/thumbnail/kesalahpahaman-mengenai-code-splitting/spa-move-route.gif)

Sayangnya, umumnya SPA memiliki waktu muat pertama yang lebih lambat dibandingkan dengan metode MPA tradisional. Kenapa bisa terjadi? Karena pada MPA kita tidak perlu mencampur kode satu halaman dengan halaman lain, lebih mudah untuk menentukan halaman ini membutuhkan sumber daya apa (teorinya, prakteknya sih tidak kalah rumit juga), berbeda dengan SPA yang umumnya sangat mengandalkan JavaScript dengan berbagai framework nya untuk menangani perpindahan halaman ini yang umumnya hampir sebagian besar framework kekinian menggunakan satu pintu masuk (_entry point_) untuk keseluruhan aplikasi.

Dari gambaran di atas sudah bisa terbayang bahwa sangat besar kemungkinan nantinya si developer tidak tepat dalam membedakan kebutuhan sumber daya antar satu halaman dengan halaman lain.

Dalam praktek pengembangan frontend sebuah website dengan teknologi JavaScript terkini dikenal satu solusi umum untuk menyelesaikan masalah ini, yakni pemecahan kode atau **Code Splitting**. _Code splitting_ bisa digambarkan sebagai proses pemecahan kode yang sebelumnya saling tergabung menjadi satu berkas menjadi bebrapa berkas dengan strategi yang telah ditentukan sesuai dengan kebutuhan dan tujuan yang ingin dicapai oleh masing-masing developer. Pekerjaan untuk memecah satu berkas menjadi berkas yang berbeda akan ditangani oleh _bundler_ semacam webpack, rollup maupun parcel. Konfiguasinya bisa berbeda-beda tergantung dari _bundler_ dan framework yang kita gunakan. Tapi pada umunya sih mirip-mirip dan tidak begitu ribet kode di sisi _bundler_ untuk mengaktifkan kemampuan mengerjakan _code splitting_. Bagian tersulit justru di level kode aplikasi kita sendiri, _bundler_ hanya menyediakan fiturnya namun si developer yang menentukan bagaiman kode kita akan dipecah.

_Code splitting_ memiliki peranan yang esensial di dalam arsitektur yang mengadopsi SPA, terutama bila jumlah halaman yang ditangani lebih dari 1. Alasan ini pula yang membuat berbagai framework yang sudah komplit biasanya akan menangani ini secara otomatis. Paling tidak pada hal-hal yang cukup umum, misalnya berdasarkan sebuah threshold ukuran berkas, ketika ukuran berkas sudah menyentuh ambang batas maksimum maka framework akan memutuskan untuk memcahnya ke dalam berkas berbeda.

## Code Splitting di atas Module Bundler

_Code splitting_ umumnya dikerjakan pada projek berbasiskan JavaScript framework kekinian.
Kode framework ini dibangun di atas berbagai Module Bundler seperti webpack, Rollup maupun Parcel.

Implementasi _code splitting_ di atas Module Bundler bisa jadi sedikit ada perbedaan, berikutnya akan kita bahas ketiga bundler populer ini dalam mengimplementasikan code splitting pada lingkungannya. Sebagian besar code splitting akan memanfaatkan dukungan _dynamic import_ pada kode JavaScript, meskipun pada beberapa framework juga bisa menggunakan bantuan pustaka tambahann namun biasanya kasusnya sudah sangat spesifik pada framework tertentu, kita mungkin tidak akan membahasnya pada artikel kali ini.

### Parcel

[Parcel.js](https://parceljs.org/) memang mengusung zero configuration sehingga banyak kebutuhan umum yang sudah ada secara bawaan tanpa kita perlu melakukan setting apapun terhadapnya.

Begitu pula untuk mengaktifkan fitur code splitting di Parcel, tidak ada konfigurasi apapun yang perlu kita berikan ke Parcel, seperti terlihat juga pada [dokumentasi resmi Parcel mengenai code splitting](https://parceljs.org/code_splitting.html).

Cukup menambahkan _dynamic import_ pada kode kalian, dan Parcel akan memecahnya secara out of the box, contoh kode bisa dilihat pada baris berikut ini:

```javascript
const pages = {
  about: import('./pages/about'), // dynamic import
  blog: import('./pages/blog'), // dynamic import
};

async function renderPage(name) {
  const page = await pages[name];
  return page.render();
}
```

### Rollup

[Rollup](https://rollupjs.org) pun pada dasarnya tidak memerlukan konfigurasi macam-macam untuk mengaktifkan code splitting, seperti bisa dibaca pada [dokumentasi resmi](https://rollupjs.org/guide/en/#code-splitting) cukup menambahkan _dynamic import_ bila kita butuh memecah suatu kode menjadi chunk baru. Namun ada beberapa kasus mutakhir dimana kalian perlu mengatur secara manual strategi pemecahan chunk, kalian bisa bermain dengan konfigurasi [output.manualChunks](https://rollupjs.org/guide/en/#outputmanualchunks), [output.entryFileNames](https://rollupjs.org/guide/en/#outputentryfilenames) dan [output.chunkFileNames](https://rollupjs.org/guide/en/#outputchunkfilenames).

Rollup sudah menyediakan juga [contoh kode penerapan code splitting](https://github.com/rollup/rollup-starter-code-splitting) secara sederhana, kalian bisa coba ikuti dan lihat penggunannya.

### Webpack

[Webpack](https://webpack.js.org/) memang biasanya sangat mendukung untuk kebutuhan yang cukup aneh-aneh pada platformnya, termasuk urusan code splitting. Untuk konfiguasi dasar bisa dibaca pada [dokumentasi resmi mengenai code splitting](https://webpack.js.org/guides/code-splitting/).

Biasanya untuk memproduksi file chunk kita perlu menambahkan konfigurasi `output.chunkFilename` agar bisa mendefinisikan akan seperti nama file yang akan dibuat nantinya.

```javascript
output: {
  filename: '[name].[contenthash].js',
  chunkFilename: '[name].chunk.[contenthash].js',
  path: path.resolve(__dirname, 'dist'),
},
```

Untuk menambahkan optimisasi lebih, kita bisa menambahkan konfigurasi di bawah `optimization.splitChunks` sesuai dengan strategi yang kita inginkan, misalnya saja seperti kode berikut:

```javascript
optimization: {
  splitChunks: {
    chunks: 'all',
  },
},
```

Untuk kasus yang lebih mutakhir lagi, kalin bisa melihat ke dalam berbagai contoh pada artikel [penggunaan splitChunks](https://webpack.js.org/plugins/split-chunks-plugin/#split-chunks-example-1).

Webpack pada dasarnya pun memanfaatkan fitur _dynamic import_, hanya saja ada _magic comment_ yang hanya tersedia di webpack untuk kita bisa menentukan beberapa hal terkait chunk yang dihasilkan, seperti nama chunk, cara memuat chunk dan beberapa hal lain. Contoh penggunaanya bisa dilihat pada kode berikut:

```javascript
return import(/* webpackChunkName: "lodash" */ 'lodash')
  .then(({ default: _ }) => {
    const element = document.createElement('div');
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    return element;
  })
  .catch((error) => 'An error occurred while loading the component');
```

Kode `/* webpackChunkName: "lodash" */` adalah perintah bagi webpack untuk memberikan nama `lodash` pada chunk yang dihasilkan. Lebih lengkapnya mengenai _magic comment_ ini bisa dibaca pada artikel [Magic Comment di webpack](https://webpack.js.org/api/module-methods/#magic-comments).

## Mengenai lazy load

Kendati _code splitting_ sangat erat kaitannya dengan lazy load, namun tidak semua _code splitting_ itu di _lazy load_. Itu kenapa perlu dipecah dulu pemahaman kita mengenai _code splitting_ dan _lazy load_.

_Code splitting_ sendiri merupakan teknik untuk memecah kode menjadi beberapa file yang berbeda, sedangkan lazy load adalah teknik untuk meminta suatu sumber daya secara _programmatically_ pada saat dibutuhkan saja.

Contoh gampang dan umum mengenai impelementasi _lazy load_ ini bisa dilihat pada teknik pemuatan gambar pada suatu web.
Gambar atau diwakili tag `<img />` pada HTML secara bawaan memiliki perilaku akan memuat gambar yang terdapat pada atribut `src` yang disematkan kepadanya, dimanapun dia berada selama terdapat pada kode HTML yang akan dimuat.
Hal ini menjadi masalah karena biasanya hanya sebagian kecil gambar yang dilihat oleh pengguna saat pertama kali datang ke situs kita. Maka dari itu ada teknik lazy load untuk memuat gambar hanya saat gambar itu sedang atau akan dilihat oleh pengguna.

Teknik yang sama juga bisa diaplikasikan pada sumber daya lain, misalnya JavaScript seperti yang sedang kita bahas.
Kita bisa menunda permintaan suatu file JavaScript dikarenakan memang tidak digunakan pada saat itu.
Teknik ini sama juga biasa dikenal sebagai _lazy load_.

Umumnya _code splitting_ itu sudah _lazy load_, misalnya kita mengunjungi halaman "Beranda" maka kita tidak akan disajikan kode JavaScript yang ada di halamana "Product Detail", ini ya praktek _lazy load_.
Tapi ada beberapa kasus dimana _code splitting_ yang tidak _lazy load_, contohnya misal kita memecah pustaka `lodash` menjadi berkas terpisah, dan pada kasus kita ketika kita mengunjungi hamanan "Beranda" kita akan membuat permintaan ke berkas `beranda.js` dan `lodash.js` karena memang halaman "Beranda" kita membutuhkan `lodash`.

## Mengenai tree-shaking

Tree-shaking sendiri bukanlah hal yang terkait secara langsung dengan code splitting, namun saya coba angkat sekilas pada artikel ini karena ada kebingungan antara tree-shaking dengan code splitting serta bagaimahna kaitannya dengan code splitting.

Tree-shaking dalam kaitannya dengan konteks JavaScript adalah sebuah teknik untuk menghilangkan kode mati atau tidak pernah dieksekusi. Istilahnya sendiri dipopulerkan pertama kali oleh Rollup. Penerapannya sangat bergantung pada ES Module (Baca artikel "[JavaScript Module dan keribetannya](/javascript-module-dan-keribetannya/)") dengan `import` dam `export` yang bisa sebagian.

Pada prakteknya tree-shaking lebih banyak dikaitkan dengan kode yang berasal dari pustaka di luar kode internal kita. Ini karena sudah lumrah bahwa sebuah pustaka memiliki banyak fitur yang belum tentu kita menggunakan kesemuanya di dalam projek kita. Sebagai contoh kita ambil pustaka populer yakni `lodash`. Lodash merupakan pustaka yang berisi kumpulan banyak kode utilitas yang sangat berguna dalam pengembangan aplikasi. Karena `lodash` memiliki teramat banyak utilitas di dalamnya seringkali kita bahkan tidak dapat mengingat hal apa saja yang bisa dilakukan oleh `lodash` atau bahkan kita tidak menggunakan banyak bagian dari `lodash`. Pilihan bagi kita yang membutuhkan sebagian fitur saja dari lodash adalah dengan menggunakan `import` langsung ke berkas yang bersangkutan, misalnya:

```javascript
// daripada menggunakan dengan
import _ from 'lodash';

_.get(object, 'key');

// lebih baik kita menggunakan dengan
import get from 'lodash/get';

get(object, 'key');
```

Atau bisa tambahkan plugin [babel-plugin-lodash](https://www.npmjs.com/package/babel-plugin-lodash) dan [lodash-webpack-plugin](https://www.npmjs.com/package/lodash-webpack-plugin) untuk mengotomasi proses ini. Akan lebih baik lagi kalau sekalian berpindah ke `lodash-es` yang bisa digunakan dengan cara:

```javascript
import { get } from 'lodash-es';

get(object, 'key');
```

Cara-cara aneh menggunakan `lodash` ini semua tujuannya sama, yakni untuk memastikan kita tidak menyertakan keseluruhan kode `lodash` yang tidak kita gunakan.

Jadi kaitannya dengan code spliting adalah tree-shaking ini hal yang berbeda dari code splitting. Kalau kita memutuskan memecah pustaka `lodash` ke dalam _chunk_ terpisah namun tidak melakukan tree-shaking, bisa jadi kita hanya memindahkan permintaan yang tadinya satu file jadi dua file, tidak ada pengaruh besar terhadap ukuran akhir keseluruhan berkas yang diminta.

## Code splitting pada prakteknya

Beberapa hal yang dilakukan saat melakukan code splitting dapat saya jabarkan ke dalam beberapa poin berikut:

1. Hal paling esensial untuk di pecah (_split_) adalah urusan halaman (_routes_). Pastikan saja saat pertama kali bahwa kita tidak memuat kode halaman B saat berada dalam halaman A. Sudah itu saja dulu, tidak perlu berpindah ke poin berikutnya kalau poin ini saja berlum dikerjakan.

2. Pecahkan kode pustaka yang hanya digunakan sebagian namun tercampur kedalam kode global. Misalnya halaman A menggunakan pustaka tambahan untuk membuat Carousel atau Slide, pastikan halaman B tidak perlu memuat kode dari pustaka tersebut. Bisa jadi caranya tidak melalui teknik code splitting, bisa dengan cara import yang diperbaiki atau code splitting tapi di level komponen yang menggunakannya.

3. Berikutnya yang perlu dipecah adalah komponen yang tidak terlihat saat pertama kali dikunjungi. Misalnya saja komponen Dialog Box atau Modal Box, komponen semacam ini umumnya membutuhkan aksi dari pengguna untuk tampil. Bisa juga komponen yang posisinya berada jauh di bawah layar dan memerlukan pengguna untuk scroll kebawah untuk melihatnya. Setelah poin 1 dan 2 dikerjakan, coba cari kemungkinan mengerjakan poin no.3 ini.

4. Ingat kembali fungsi code splitting, bisa jadi berbeda-beda tergantung tujuan yang ingin dicapai, ada yang ingin memaksimalkan kemampuan _caching_ dari browser sehingga kode dipecah kecil-kecil, ada juga yang memang ingin memaksimalkan benar-benar ukuran akhir berkas JavaScript yang harus diunduh oleh pengguna. Dengan mengetahui tujuan yang akan dicapai kita bisa mengambil strategi yang berbeda. Mengerjakan code splitting tanpa tujuan yang jelas bisa jadi adalah kegiatan yang percuma, pastikan kita mendapatkan efek baik dari kerja keras kita.

5. Selalu analisa kondisi sebelum dan sesudah, baik melalui alat semacam [BundleAnalyzer](https://www.npmjs.com/package/webpack-bundle-analyzer) untuk melihat komposisi berkas JavaScript kita itu datangnya dari mana saja, juga dari DevTools tab network untuk memperhatikan berkas mana saja yang diminta pada saat pertama dan pada saat ada aksi yang dilakukan oleh pengguna. Hal ini bisa memberikan gambaran pada kita apakah tujuan kita melakukan code splitting sudah tercapai atau belum.

## Kesimpulan

Diperlukan analisa terhadap kondisi aplikasi kalian sebelum melakukan _code splitting_.
Kode yang paling penting untuk dipecah saat pertama kali adalah kode yang berada di level halaman (_route_), sisanya bisa menyusul.
Code splitting seharusnya dikombinasikan dengan kemampuan _lazy load_ dan _tree-shaking_.

### Kredit

- Foto sampul dari [pexels.com](https://www.pexels.com/photo/close-up-photo-of-person-holding-pizza-1653877/)

