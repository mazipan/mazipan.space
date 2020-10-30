---
title: Membuat pull request yang ciamik
date: '2020-10-31'
excerpt: Bagaimana sih cara-cara membuat pull request yang sedap dipandang mata?
author: mazipan
published: true
tags: [javascript]
coverImage: /thumbnail/membuat-pull-request-ciamik/you-shall-not-merge.png
lang: id
enready: false
---

Membuat pull request seharusnya menjadi pengetahuan dasar ketika kita bekerja dengan berkolaborasi bersama pengembang lain. Sayangnya bahkan buat pengembang yang sudah malang melintang pun tidak jarang membuat pull request seadanya, termasuk juga saya yang menjadi pelakunya. Jadi mari kita belajar bersama-sama mengenai bagaimana membuat pull request yang ciamik.

## Mengenai pull request

Github sudah menjelaskan mengenai [apa itu pull request](https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/about-pull-requests) bahkan sudah mewanti-wanti beberapa poin yang seharusnya jadi perhatian kita bersama. Pull request memberikan kita kesempatan untuk memberitahukan kepada pengembang lain mengenai perubahan yang telah kita kerjakan di branch tertentu pada suatu repository. Sekali membuka pull request, maka kita bisa membuka diskusi pula mengenai perubahan-perubahan yang ada dengan para kolaborator, menjelaskan setiap commit atau perubahan yang dibuat, mengerjakan perubahan yang diminta atau disarankan, sebelum akhirnya nanti semua perubahan tersebut diterima dan digabungkan ke branch utama yang digunakan.

Sebelum membahas lebih jauh, saya akan coba mengupas alur kerja yang biasa digunakan oleh para pengembang dalam berkolaborasi, berikut garis besarnya:

## Alur kolaborasi umum dalam satu repository

Pada pekerjaan privat biasanya tidak diperlukan [metode fork](https://docs.github.com/en/free-pro-team@latest/github/getting-started-with-github/fork-a-repo#fork-an-example-repository), sehingga caranya cukup dengan memberikan akses untuk seseorang langsung ke repository terkait. Ini berarti semua pengembang akan bekerja di satu repository yang sama.

Cara umum untuk berkolaborasi dalam kondisi satu repository begini biasanya:

1. **Buat branch baru dari branch utama**, umumnya setiap perusahaan sudah punya konvensi atau aturan tersendiri dalam penamaan branch baru

2. **Bekerja di dalam branch baru yang dibuat**

3. **Sinkronisasi secara berkala**, apabila pekerjaan akan memakan waktu yang cukup lama sampai berhari-hari, ada baiknya untuk mengecek secara berkala dengan branch utama

4. **Setelah selesai, buat pull request ke branch utama**, ini dilakukan tentu setelah kalian selesai melakukan serangkaian pengujian, baik di lokal kalian ataupun di lingkungan development lainnya.

5. **Meminta review kode kepada teman sejawat**

6. **Memperbaiki kode berdasarkan review yang ada**

7. **Diterima atau ditolak untuk masuk ke branch utama**

## Alur kolaborasi dalam repository hasil fork

Caranya sebenarnya secara garis besar akan sama saja, hanya saja karena dalam versi fork kita tidak mempunyai akses langsung ke repository utama, melainkan hanya repository salinan dari aslinya. Ini yang menjadikan kita bisa saja langsung melakukan perubahan di branch utama, karena repository fork pada dasarnya adalah milik pribadi, kita bisa langsung menyasar ke branch utama tanpa perlu takut diteriaki oleh orang lain.

## Pull request yang ciamik

Ciamik menurut saya bisa berbeda dengan ciamik yang kalian anut, dan berikut adalah pull request yang ciamik versi saya pribadi:

**1. Memiliki judul yang jelas, singkat dan menggambarkan perubahan yang dibuat**

**2. Memberikan penjelasan yang gamblang mengenai perubahan yang dibuat**

**3. Menyertakan informasi pendukung**

**4. Memiliki riwayat commit yang mudah ditelusuri**

## Tips dan trik membuat pull request ciamik