---
title: Pengantar Intersection Observer
date: '2018-04-16'
excerpt: Mengupas sedikit banyak hal mengenai Intersection Observer dengan berbagai contoh kasus di lapangan
author: mazipan
published: true
featured: false
tags: [web]
coverImage: /thumbnail/intro-to-intersection-observer/intersection-observer.jpg
lang: id
enready: false
---

Mengupas sedikit banyak hal mengenai Intersection Observer dengan berbagai contoh kasus di lapangan

Dari developer.google [update bulan april 2016](https://developers.google.com/web/updates/2016/04/intersectionobserver), Intersection Observer pertama kali di release ke user di chrome versi 51. Lalu sebenarnya apa sih Intersection Observer ini? Lantas apa juga hal yang membuatnya menjadi menarik untuk kamu coba? Berikut akan kita bahas berbagai hal mengenai Intersection Observer.

## 📒 Apa itu Intersection Observer?

Intersection Observer (IntersectionObserver) merupakan sebuah interface dari [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) yang menyediakan cara asynchronous untuk memantau (observe) perubahan intersection dari elemen target terhadap viewport maupun elemen ancestor.

![Intersection Observer](/thumbnail/intro-to-intersection-observer/window.png)

_Image Source: https://hacks.mozilla.org/2017/08/intersection-observer-comes-to-firefox/_

## 🍭 Contoh kasus penggunaan Intersection Observer

Berikut beberapa contoh kasus dimana kehadiran Intersection Observer menjadi penting dan menarik:

### 🌄 Lazy Loading

Konsep lazy loading pada dasarnya adalah menampilkan konten **hanya ketika konten tersebut benar-benar dibutuhkan dan dilihat oleh pengguna**. Implementasi paling sering dari lazy loading ini adalah pada proses untuk memuat gambar pada sebuah website, namun sebenarnya bisa juga digunakan untuk memuat konten lain baik text paragraph maupun block div.

Seperti kita tahu bersama-sama, ukuran dan banyaknya file yang kita kirim ke pengguna merupakan hal yang penting dalam memuat sebuah website. Oleh karena itu lazy loading sangat membantu memastikan kita memuat konten yang tepat pada saat yang tepat pula. Jangan sampai kita memaksa pengguna untuk memuat atau mengunduh hal yang tidak pernah dia lihat sama sekali.

Sebelum ada Intersection Observer kita biasa membuat lazy loading dengan cara attach event ketika pengguna melakukan scroll dan memanggil [`getBoundingClientRect()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) untuk mengecek apakah elemen yang kita maksud sudah masuk ke dalam layar yang dilihat oleh pengguna.

Implementasi Intersection Observer untuk membuat lazy loading gambar maupun video telah dijelaskan secara rinci dengan berbagai contoh kode yang jelas pula di artikel [Lazy Loading Images and Video](https://developers.google.com/web/fundamentals/performance/lazy-loading-guidance/images-and-video/) dari developer.google.com.

### 🔃 Infinite Scroll

[Infinite Scroll](https://www.google.co.id/search?q=infinite+scroll) paling cocok digunakan pada mobile web, dimana pengguna tidak perlu menekan tombol apapun untuk memuat halaman/konten berikutnya namun cukup dengan scroll dan nanti ditentukan apakah sudah waktunya memuat konten berikutnya atau belum. Bila kamu masih gamang dengan istilah infinite scroll, maka coba saja kunjungi halaman utama dari Instagram (http://www.instagram.com/). Kita bisa browsing unggahan terbaru dari teman-teman kita di Instagram dengan mudah tanpa sekalipun harus menekan halaman selanjutnya atau apapun itu, cukup scroll terus sampai bawah dan akan dimuat halaman berikutnya secara otomatis.

Tanpa Intersection Observer implemetasi infinite scroll kurang lebih akan sama dengan lazy loading namun biasanya akan lebih advance karena beberapa implementasinya memiliki logika yang lebih kompleks dimana dilakukan penambahan konten yang akan dilihat dan penghapusan terhadap konten yang sudah tidak dilihat lagi oleh pengguna.

### 📊 Reporting / Tracking

Pernahkah terpikir untuk men-track kebiasaan pengguna ketika mengunjungi website kamu? Misalnya pengguna melakukan scroll di halaman katalog produk kemudian berhenti ketika melihat sebuah produk pada titik ini bisa dimungkinkan pengguna memiliki ketertarikan lebih terhadap produk tersebut. Kalau kita bisa collect data dari kebiasaan pengguna dalam melakukan scroll di website kita maka bisa dibuatkan pula recommendation system dengan sumber data yang lebih banyak dan bisa menghasilkan personalisasi yang lebih baik.

Tracking ataupun reporting bisa membantu kita dalam membuat keputusan produk mana yang harusnya ada diatas, dan produk mana yang bisa diletakan di posisi yang lebih bawah dari katalog kita. Dan menggunakan Intersection Observer tentunya hal ini menjadi lebih mudah dilakukan dan lebih visible untuk di deliver.

### 🔦 Others Task

Banyak hal dan pekerjaan lain yang menjadi lebih mudah dengan adanya Intersection Observer, seperti penentuan kapan suatu task akan dieksekusi dan kapan tidak perlu dieksekusi, penentuan kapan suatu animasi perlu ditampilkan dan kapan tidak perlu ditampilkan kepada pengguna dan banyak lagi.

Kekuatan utama pada Intersection Observer adalah bisa memberikan kita visibility yang lebih kapan waktu yang tepat untuk melakukan suatu hal dan ini tentu saja bisa diimplementasikan ke berbagai hal tergantung pada kebutuhan dan tujuan masing-masing.

### 🌏 Browser Support

Sampai pada artikel ini dipublikasikan, dukungan untuk Intersection Observer memang belum merata ke semua browser. Anda bisa mengecek dukungan browser terhadap Intersection Observer di website caniuse.com (https://caniuse.com/#feat=intersectionobserver).

![Can I Use](/thumbnail/intro-to-intersection-observer/can-i-use.png)

*https://caniuse.com/#feat=intersectionobserver (16 April 2018)*

Meski begitu kamu tetap bisa menggunakan Intersection Observer dengan menambahkan polyfill untuk beberapa browser yang memang belum mendukung fitur ini secara native.

### Demikian artikel kali ini, semoga bermanfaat...
