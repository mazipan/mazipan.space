---
title: Monorepo, menurut saya...
date: '2021-11-11'
excerpt: Bagaimana saya memandang monorepo sebagai solusi arsitektur managemen repository yang akan berpengaruh pada banyak kegiatan operasional
author: mazipan
published: true
featured: false
tags: [monorepo]
coverImage: /thumbnail/monorepo-menurut-saya/cover.png
lang: id
enready: false
---

Tulisan terkahir di blog ini sudah dari februari yang lalu, dari awal tahun sampai ketemu akhir tahun. Setelah sekian lama vakum menulis, jangan berekspektasi tinggi pada tulisan-tulisan saya ya, saya hanya sedang berusaha mengumpulkan mood dan mengumpulkan semangat buat menulis lagi. Artikel-artikel saya pada tahap ini mungkin tidak akan dalam secara teknis, karena biasanya saya butuh waktu lebih banyak untuk menulis artikel yang terdapat berbaris-baris kode di dalamnya.

## Mengenai monorepo

Monorepo merupakan solusi managemen repository bagi mereka yang memiliki workflow yang hampir sama di banyak package dan biasanya memang *dependent* satu sama lain.

Solusi ini sangat populer beberapa tahun belakangan dan berhasil diadopsi oleh banyak open-source besar, seperti [Babel](https://github.com/babel/babel/tree/main/packages), [Next.js](https://github.com/vercel/next.js/tree/canary/packages), [Jest](https://github.com/facebook/jest/tree/main/packages) dan banyak projek besar lain juga yang mengadopsi teknik yang sama, yakni si monorepo ini.

Seperti bisa terlihat pada tautan dari beberapa contoh projek di atas, mereka punya banyak "projek/package" dalam satu repo mereka. Sebagai end-user kita taunya package-package tersebut ya berbeda-beda, misal ketika kita memasang `jest`, kita biasanya menambahkan `babel-jest` sebagai transformer file-file kita. Kita tidak tau kalau ternyata dua package ini diatur dalam satu repo.

## Kenapa orang memilih monorepo

### Kesamaan workflow

Yang paling umum adalah karena workflow-nya sama. Cara mereka release package atau cara mereka development di package-package ini biasanya mirip-mirip. Dibandingkan bikin kode berulang-ulang dan ada kemungkinan malah terjadi kustomisasi yang tidak perlu, dengan meletakkan di satu repo bisa memudahkan untuk menyatukan workflow yang sama ke dalam satu pekerjaan saja. Misal: saya bisa `lerna publish` dan semua package akan di bump ke versi terbaru dengan versi yang sama kemudian di-publish ke registry, dibuatkan changelog, dibuatkan git tag juga dalam satu perintah dan berlaku bagi semua package dalam lingkup monorepo.

### Kemudahan dependency linking

Karena berada dalam satu lingkup yang sama, maka tidak perlu bingung lagi, satu package akan require ke depency versi berapa ya, sudah saja disamakan semua versinya. Beberapa alat yang mendukung workspace juga punya fitur auto-link, jadi tidak perlu mengunduh dari registry lagi kalau memang yang dimaksud adalah package internal, dan ketika mau di-publish ya akan diganti dengan versi registry yang benar.

### Lebih hemat disk

Seperti diketahui bersama, `node_modules` adalah musuh bagi disk kita. Kalau punya projek banyak, kecil-kecil maka di banyak projek itu kita diharuskan mengunduh dependency yang bisa jadi sama berulang-ulang kali. Dengan monorepo, dependency yang sama bisa dinaikan ke *parent*-nya, misalnya di setiap projek biasanya kita akan membutuhkan ESLint untuk melakukan static analisis pada kode kita. Dibandingkan harus install ESLint di masing-masing projek, pindahkan saja ke level atas , dan semua package tetap bisa merasakan manfaatnya.

## Mudah mengatur banyak package

Bisa dibayangkan, projek Babel dengan puluhan atau bahkan ratusan package di dalamnya kalau harus di manage dengan multi-repo akan jadi apa? Betapa beratnya bagi kontributor untuk checkout ratusan repo ke dalam mesin mereka, mengatur workflow di banyak package, pindah dari satu package ke package lain mungkin akan memakan waktu lebih banyak. Bandingkan dengan monorepo yang semudah tinggal pindah direktori, semua sudah ada di depan mata saat kita checkout projeknya.

## Duka-duka menggunakan monorepo

### Mengenai perpindahan konteks

Saya sendiri dua tahun belakangan memang banyak berkutat dengan masalah monorepo karena memang di kantor saya bekerja sekarang mengadopsi monorepo juga. Monorepo sangat membantu buat orang-orang yang suka berpindah konteks macam saya. Cukup pindah direktori dan sudah berpindah konteks pekerjaan.

Sayangnya, bagi developer yang sangat jarang berpindah konteks, hal ini bisa jadi penghambat besar. Misal ada developer A yang kerjanya hanya di package Z, maka mau gak mau dia harus checkout semua kode dari package A-Z. Kalau ada perubahan di package A-Y ya bisa jadi dia akan terkena dampaknya pula, karena di dalam monorepo biasanya akan menggunakan linking antar sesama internal dependency, atau dalam bahasa lain ya tidak akan ada versioning di dalam monorepo. Satu berubah, semuanya harus berubah. Perubahan yang menyentuh fundamental ya artinya "big-bang". Tidak ada opsi meninggalkan satu package, karena ya mau resolve kemana lagi dia.

### Dependency yang suka ngaco

Seperti ta bilang sebelumnya, kita bisa menaikkan sebuah dependency ke level atas. Di level package pun kita bisa mendifinisikan dependency. Kalau ada dependency yang sama, lantas punya siapa yang sebenarnya akan digunakan? Belum lagi kalau package sebelah ada juga yang pakai versi yang berbeda major dengan versi yang kita pakai dan kita tidak sadar. Apakah akan baik-baik saja? Bertambah parah kalau hal ini terjadi pada package yang dipakai banyak package lain. Walhasil kadang dirimu mesti manual menjelaskan ke alat-alatmu, sebenernya ketika ketemu dependecy A seharusnya dia nyari ke `node_modules` yang mana sih, versi mana yang valid untuk package A.

### Peralatan yang kustom

Monorepo umumnya memang tidak berjalan mulus, pada akhirnya kamu bisa saja harus benting-tulang membuat peralatanmu sendiri untuk memuluskan cita-cita "otomasi".

**Menjalankan build**, haruskah saya build keseluruhan package? Bagaimana caranya untuk tau package mana yang harus saya build?

**Menjalankan testing**, test di package mana yang harus dijalankan?

**Mau release**, package mana yang harus di build agar satu package bisa di release dengan benar? Ada order yang harus diikuti kah? Atau bisa random aja, yang penting di build?

**Kalau satu package mau custom sesuatu**, bagaimana caranya? Apakah boleh di-custom di dalam monorepo? Siapa yang mau mengurus peralatan-peralatan custom aneh ini?

### Managemen repo tidak selalu lebih mudah

Kalau repo-nya cuma berisi satu package, gampang ya buat nebak, ini pull-request sebenernya untuk yang mana. Kalau di monorepo ya susah, pull-request bisa random kena kemana-mana, yang review bisa bingung, perlu ikut review gak sih gua? Apalagi kalau gak pada konsisten mengikuti aturan, misal dengan memberikan scope yang jelas dalam judul pull-requestnya.

Belum lagi jumlahnya yang bisa meledak. Karena dalam satu repo, kalau ada 20 package aja di dalam repo tersebut, berarti akan ada pull-request yang terkait dengan 20 package tadi, kalau kontributor dari 20 package tadi semuanya aktif-aktif ya siapin bendera putih aja sih kalau pas lihat jumlah pull-request yang datang setiap harinya.

Limitasi akses juga jadi lebih susah, ada beberapa package yang mungkin tidak seharusnya diubah-ubah oleh sembarangan orang, tapi karena kerumitan managemen macam pull-request tadi, ya bisa jadi kesenggol oleh orang lain tanpa kamu menyadari.

## Monorepo seharusnya

Monorepo memiliki use-case terbaik bagi repo-repo semacam Babel dan beberapa open-source repo yang kita sudah sebutkan di awal. Mereka punya banyak (terlalu banyak sih) package, saling terkait satu dengan yang lain, ukurannya mini-mini.

Monorepo bisa menjadi sangat brutal ketika perkembangannya tidak terkontrol atau tidak terduga di awal. Dikira akan berisi satu-dua package, ternyata ada 50 package pada akhirnya.

Bagi saya, monorepo sangat baik untuk package, dan bukan untuk aplikasi. Package yang saya maksud adalah pustaka-pustaka yang akan didistribusikan. Aplikasi sendiri adalah satu website utuh yang berisi banyak alur di dalamnya. Cukup langka ada satu aplikasi dependent ke aplikasi lain, dan memang tidak seharusnya. Ya kalau aplikasinya satu dua okelah ya. Kalau aplikasinya ada puluhan, sudahlah jangan berani-berani bermain api.

> Gak usah terlalu serius, gak usah diambil hati juga kalau kamu pemuja monorepo, toh ini cuma menurut saya aja kan. Kita kan boleh saja saling bersebrangan dalam berbagai pendapat. Atau sudah gak boleh ya sekarang???

---

Cover dari [freepik.com](https://www.freepik.com/free-photo/serious-thoughtful-man-making-assumption-looking-right-thinking_9902339.htm#page=1&query=thinking&position=17&from_view=keyword)
