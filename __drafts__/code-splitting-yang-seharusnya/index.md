---
title: Code splitting yang seharusnya
date: '2020-08-02'
description: Membicarakan mengenai bagaimana seharusnya code splitting itu dilakukan dalam ranah dunia frontend
author: mazipan
draft: false
tags: [javascript]
image: ./images/pizza-slice.jpg
lang: id
enready: false
---

Code splitting menjadi banyak diperbicangkan dikarenakan adanya pergeseran pendekatan dalam membangun website. Dari yang dulunya orang lebih senang dengan *Multi Page Application* (MPA) sekarang bergeser pada *Single Page Application* (SPA). Mesti diakui dulu bahwa SPA bukanlah peluru perak yang akan memecahkan semua masalah yang terjadi dalam MPA, salah-salah mengadopsi tanpa pengetahuan yang baik malah bisa mengakibatkan penurunan kualitas. SPA mendapatkan popularitasnya karena menjanjikan kecepatan berpindah antar halaman tanpa perlu memuat ulang keseluruhan bagian halaman, melainkan cukup bagian dinamis saja yang dimuat ulang dan membiarkan bagian yang sama dari halaman sebelumnya. Secara teori tanpa memikirkan faktor lain, SPA memang seharusnya secara drastis bisa meningkatkan kecepatan memuat sebuah halaman, sampai mereka menyadari ada hal yang salah.

## SPA dan code splitting

Bagaimana SPA bisa memberikan pengalaman berpindah halaman yang instan? Umumnya karena tidak lagi memerlukan komunikasi dari Server untuk memindahkan halaman serta hanya memanggil sumber daya (JS, CSS, dan gambar) baru dan tidak memanggil sumber daya yang sebelumnya sudah ada. Hal ini akan sangat terlihat pada kunjungan kedua dan seterusnya.

![Perpindahan Halaman di SPA](images/spa-move-route.gif)

Sayangnya, umumnya SPA memiliki waktu muat pertama yang lebih lambat dibandingkan dengan metode MPA tradisional. Kenapa bisa terjadi? Karena pada MPA kita tidak perlu mencampur kode satu halaman dengan halaman lain, lebih mudah untuk menentukan halaman ini membutuhkan sumber daya apa (teorinya, prakteknya sih tidak kalah rumit juga), berbeda dengan SPA yang umumnya sangat mengandalkan JavaScript dengan berbagai framework nya untuk menangani perpindahan halaman ini yang umumnya hampir sebagian besar framework kekinian menggunakan satu pintu masuk (*entry point*) untuk keseluruhan aplikasi.

Dari gambaran di atas sudah bisa terbayang bahwa sangat besar kemungkinan nantinya si developer tidak tepat dalam membedakan kebutuhan sumber daya antar satu halaman dengan halaman lain.

Dalam praktek pengembangan frontend sebuah website dengan teknologi JavaScript terkini dikenal satu solusi umum untuk menyelesaikan masalah ini, yakni pemecahan kode atau **Code Splitting**. *Code splitting* bisa digambarkan sebagai proses pemecahan kode yang sebelumnya saling tergabung menjadi satu berkas menjadi bebrapa berkas dengan strategi yang telah ditentukan sesuai dengan kebutuhan dan tujuan yang ingin dicapai oleh masing-masing developer. Pekerjaan untuk memecah satu berkas menjadi berkas yang berbeda akan ditangani oleh *bundler* semacam webpack, rollup maupun parcel. Konfiguasinya bisa berbeda-beda tergantung dari *bundler* dan framework yang kita gunakan. Tapi pada umunya sih mirip-mirip dan tidak begitu ribet kode di sisi *bundler* untuk mengaktifkan kemampuan mengerjakan *code splitting*. Bagian tersulit justru di level kode aplikasi kita sendiri, *bundler* hanya menyediakan fiturnya namun si developer yang menentukan bagaiman kode kita akan dipecah.

*Code splitting* memiliki peranan yang esensial di dalam arsitektur yang mengadopsi SPA, terutama bila jumlah halaman yang ditangani lebih dari 1. Alasan ini pula yang membuat berbagai framework yang sudah komplit biasanya akan menangani ini secara otomatis. Paling tidak pada hal-hal yang cukup umum, misalnya berdasarkan sebuah threshold ukuran berkas, ketika ukuran berkas sudah menyentuh ambang batas maksimum maka framework akan memutuskan untuk memcahnya ke dalam berkas berbeda.

## Baik buruk dari code splitting

Kendati *code splitting* adalah hal esensial bagi sebuah SPA, namun mengerjakannya dengan serampangan bukanlah hal yang ideal. Diperlukan analisa terlebih dahulu sebelum memutuskan untuk memecah satu kode ke dalam berkas lain.

## Hal yang paling penting untuk dipecah

- Route
-

## Mengenai tree-shaking

Contoh kode tree-shake

## Code splitting dan lazy load

Contoh code splitting tapi tidak lazy load dan sbelaiknya

## Kesimpulan

Diperlukan analisa terhadap kondisi aplikasi kalian sebelum melakukan *code splitting*.
Kode yang paling penting untuk dipecah saat pertama kali adalah kode yang berada di level halaman (*route*), sisanya bisa menyusul.
Code splitting seharusnya dikombinasikan dengan kemampuan *lazy load* dan *tree-shaking*.

### Kredit

- Foto sampul dari [pexels.com](https://www.pexels.com/photo/close-up-photo-of-person-holding-pizza-1653877/)

---

Demikian, semoga bermanfaat