---
title: Data Lab dan Data Lapangan
date: '2020-11-24'
excerpt: Bercerita mengenai apa yang saya tau soal Data Lab dan Data Lapangan dalam kaitannya dengan pemantauan Performa Web
author: mazipan
published: true
featured: false
tags: [web-perf]
coverImage: /thumbnail/data-lab-dan-data-lapangan/lab-data-vs-field-data.png
lang: id
enready: false
---

Ketika kalian berurusan dengan web performance, kalian tentunya akan dihadapkan pada dua macam data yang mesti kalian pantau. Keduanya adalah Data Lab dan Data Lapangan. Kita akan membahas mengenai kedua jenis data ini, agar lebih melek dengan perbedaannya dan bisa menentukan data mana yang bisa digunakan untuk masing-masing kebutuhan kalian.

## Data lab

Data lab merupakan data yang didapatkan dari sebuah pengetesan di dalam lingkungan yang terkontrol dna terkendali. Contoh pengetesan yang akan mendapatkan data lab ini misalnya menggunakan Lighthouse di DevTools. Cara pengetesan seperti ini sangat bisa kita atur, misalnya kita bisa melakukan simulasi dengan jaringan internet cepat maupun lambat. Setelah menemukan konfigurasi yang cocok, kita bisa mengunci lingkungan tersebut dan melakukan pengujian secara berkala dengan lingkungan yang sama sehingga naik turunnya nilai yang di dapat sangat dimungkinkan memang karena kondisi web kita bukan karena faktor lain.

![Data lab di laporan Web.dev/measure](/thumbnail/data-lab-dan-data-lapangan/lab-data-web-dev.png)

Data ini tentu tidak akan menggambarkan kondisi pengguna dari web kalian yang sebenarnya karena berada pada lingkungan yang sudah disetel sedemikian rupa. Namun pengujian untuk menghasilkan data lab ini sangat membantu untuk melakukan *debugging* pada web kita. Hasil yang didapat dari data lab umumnya bisa memberikan panduan yang jelas, utamanya bagi Web Developer untuk mengetahui kondisi web dan menyusun berbagai daftar aksi yang perlu dikerjakan untuk meningkatkan hasil yang di dapat.

Data lab bisa menjadi indikator sehatnya kondisi web kita dan bisa menjadi pegangan bagi kita bila disetel dengan baik, namun begitu bisa juga menjadi menyesatkan bila disetel dengan sembrono. Jadi kuncinya adalah menyetel lingkungan yang digunakan dalam pengujian data lab dengan bijak, kalau bisa sih mendekati rataan terbanyak dari kondisi pengguna nyata kita.

Meski bermanfaat, data lab ini tidak seharusnya menjadi satu-satunya pegangan kita, karena bisa saja kalian mendapatkan nilai yang baik di data lab tapi tidak pada data lapangan dikarenakan salah menentukan lingkungan.

Bukankah pada akhirnya kita membuat web untuk pengguna nyata, bukan untuk diri kita sendiri? Apalah artinya web cepat buat kita, tapi lambat buat orang lain?

Disinilah kita menjadi perlu menyandingkan data lab kita dengan data lapangan.

## Data lapangan

Data lapangan adalah data yang dikumpulkan dari pengguna nyata, dengan lingkungan asli yang digunakan oleh pengguna tersebut. Kita tidak bisa mengatur bagaimana kondisi pengguna saat mengakses web kita, bisa jadi mereka menggunakan device yang bagus dan dalam jaringan internet yang cepat sehingga web kita akan cukup cepat untuk dimuat, sebaliknya bisa juga si pengguna dalam kondisi tidak ideal, jaringan internet yang lambat, maupun device dengan spesifikasi rendah. Kondisi seperti ini jelas akan berdampak web kita akan terasa lambat untuk dimuat.

Contoh data lapangan adalah laporan yang dikumpulkan oleh Chrome UX Report, ini merupakan data nyata yang dikumpulkan oleh Google Chrome terhadap penggunanya. Contoh lain adalah data yang secara mandiri kita kumpulkan dari pengguna kita, misal dengan Google Analytics atau dengan alat pemantau pengguna nyata atau biasa dikenal dengan *Real User Measurement (RUM)*. Di lingkungan produk Google, data ini bisa juga kalian jumpai di Google Search Console, atau langsung query dari Chrome UX Report baik melalui Big Query maupun lewat [RESTful API dari Chrome UX](https://web.dev/chrome-ux-report-api/) yang memang juga telah disediakan untuk mempermudah mengakses datanya.

![Data lapangan di laporan PageSpeed Insight](/thumbnail/data-lab-dan-data-lapangan/field-data-psi.png)

![Data lapangan di laporan Search Console](/thumbnail/data-lab-dan-data-lapangan/field-data-search-console.png)

Ketika kita melakukan pengujian lewat PageSpeed Insight, selain mendapatkan data lab kita juga akan diberikan cuplikan data lapangan dari Chrome UX jika memang tersedia. Enaknya data yang ditampilkan sudah di aggregasi sehingga kita tidak perlu lagi mencari formula untuk mengolah datanya lagi.

Seperti disebutkan sebelumnya bahwa data ini berasal dari pengguna nyata, sehingga variasi dari laporan yang didapatkan biasanya cukup lebar, terutama bagi kalian yang memiliki diferensiasi pengguna yang banyak. Kalian bisa menemui skor yang sangat bagus, namun juga bisa menemukan skor yang sangat jelek. Itu mengapa umumnya laporan dari data ini diambil dalam percentile 75 seperti disarankan oleh PageSpeed Insight, tapi tidak menutup kemungkinan juga bagi kalian untuk mengambil jenis agregasi lainnya.

## Pilih mana dong?

Dua-duanya bukan pilihan melainkan pelengkap satu sama lain, data lab cocok untuk memberikan masukan secara langsung ke web developer, data lapangan cocok untuk mengetahui kondisi asli yang dirasakan pengguna.
Pun ada data yang tidak bisa kalian dapatkan kalau misalnya hanya berpatokan pada data lab saja.
Metric macam FID (*First Input Delay*) hanya tersedia pada data lapangan dan tidak bisa didapatkan di data lab karena sifatnya yang memang menunggu aksi dari pengguna.

Jadi, daripada pusing pilih yang mana? Kenapa gak dua-duanya saja 🤣
