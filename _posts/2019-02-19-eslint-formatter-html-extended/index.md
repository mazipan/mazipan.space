---
title: Mengeksten HTML Formatter resmi ESLint
date: '2019-02-19'
excerpt: Alasan mengapa kami memutuskan untuk mengeksten HTML Formatter resmi ESLint
author: mazipan
published: true
featured: false
tags: [javascript, eslint]
coverImage: /thumbnail/eslint-formatter-html-extended/eslint-html.png
lang: id
enready: true
---

Alasan mengapa kami memutuskan untuk mengeksten HTML Formatter resmi ESLint

## Latar Belakang ⛈

Dalam pekerjaan kami sehari-hari, kami menggunakan ESLint untuk hampir semua kode di repositori FE. Idealnya, pengembang harus menjalankan ESLint pada lingkungan development dan memastikan branch yang dia kerjakan bersih dari segala peringatan dan kesalahan dari ESLint. Demi kebaikan bersama, kami juga menempatkan git hook menggunakan `husky` untuk menjalankan ESLint sebelum mendorong perubahan ke _origin_. Tapi itu tidak cukup untuk flow kami saat ini, saya tidak tahu mengapa, kadang-kadang ada saja kode yang tidak lulus aturan ESL di branch asal. Pada akhirnya kami memutuskan untuk menempatkan skrip ESLint ini di dalam proses Continuous Integration (CI) kami.

Sayangnya, pengembang kami tidak terlalu suka membaca log secara penuh yang telah tersedia pada alat CI kami, mereka lebih suka melihat laporan HTML untuk setiap tahap yang dijalankan dalam CI. Setelah membaca dokumentasi resmi dari ESLint, saya menemukan bagian tentang [ESLint formatter ↗️](https://eslint.org/docs/user-guide/formatters/). Kami ternyata dapat memproduksi laporan berupa HTML dengan formatter ini.

Kami melakukan trial and error untuk bukti kesasihan tentang pembuatan laporan HTML dari ESLint kami. Setelah sehari menggunakan reporter HTML resmi di CI kami, kami menemukan bahwa formatter HTML resmi dari ESLint ternyata tidak membuat log ketika ada beberapa kesalahan dan hanya memunculkan pesan kesalahan dengan kode 1 tanpa ada satupun log seperti yang kami harapkan. Kami bisa melihat laporan HTML tetapi kami kehilangan log kami. Dan hal ini jelas bukan seperti yang kami harapkan.

Akhirnya, kami memutuskan untuk membuat formatter kami sendiri yang menggabungkan kekuatan reporter HTML dan menyimpan log kesalahan di sistem log kami.

Kami menyebutnya `eslint-formatter-html-extended`!

![ESLint formatter HTML Extended](/thumbnail/eslint-formatter-html-extended/eslint-html.png)

## Unboxing 📦

Pada dasarnya, kami tidak ingin mengerjakan hal-hal yang sudah dikerjakan orang lain. Jadi, kami hanya menggabungkan dua jenis formatter dari ESLint. Kami memilih formatter HTML oleh [JulianLaval ↗️](https://github.com/JulianLaval) dan formatter Stylish oleh [Sindre Sorhus ↗️](https://github.com/sindresorhus). Kami juga menambahkan sedikit sentuhan perubahan dalam laporan output HTML agar lebih indah dan mudah dinavigasi.

## Penggunaan ☀️

Install dependensi lewat perintah:

```bash
$ yarn add eslint-formatter-html-extended -D
# OR
$ npm i eslint-formatter-html-extended --dev
```

Mengacu pada [docs ↗️](https://eslint.org/docs/user-guide/formatters/), kita hanya diharuskan menambahkan argumen `-f nameFormatter -o nameFile` pada ESLint skript, seperti:

```bash
$ eslint --ext .js . -f html-extended -o eslint-report.html
```

Formatter ini kami terbitkan sebagai kode sumber terbuka yang dapat Anda lihat di [Github repository ↗️](https://github.com/mazipan/eslint-formatter-html-extended), silakan fork atau buat issue baru bila menemukan masalah.

### Demikian artikel kali ini, semoga bermanfaat...
