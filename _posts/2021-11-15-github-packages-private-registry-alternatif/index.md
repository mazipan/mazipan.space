---
title: GitHub Packages - Private Registry Alternatif
date: '2021-11-15'
excerpt: Berbagi pengalaman selama menggunakan GitHub Packages sebagai solusi private registry
author: mazipan
published: true
featured: false
tags: [tools]
coverImage: /thumbnail/github-packages-private-registry-alternatif/cover.png
lang: id
enready: false
---

Jadi, ceritanya beberapa bulan yang lalu saya dan teman-teman di kantor dihadapkan dengan kasus dimana kami harus mempublikasikan kode kami ke registry. Sebelumnya kami tidak memerlukannya, karena kami menerapkan monorepo, semua dependency diletakkan di repository yang sama dan cukup di resolve secara internal oleh package manager saja. Tidak ada kebutuhan untuk publish kode ke registry.

Ada sih kode yang selama ini sudah di publish ke registry, tapi kasusnya beda, kodenya memang aman buat di publish ke public karena tidak spesifik dengan kasus yang ada di kantor. Jadi pilihan menggunakan npm registry ya masih masuk akal.

## Alternatif solusi

Tentu sebelumnya beberapa alternatif sudah disajikan sampai pada keputusan untuk menggunakan salah satunya diambil.

- **[Verdaccio](https://verdaccio.org/)**, ini pilihan terbaik untuk self-hosted private registry. Kamipun telah menggunakannya di masa lalu.
- NPM Enterprise, yang ternyata sudah di sunset dan dialihkan secara penuh ke GitHub Enterprise, ([baca pengumuman sunset](https://docs.npmjs.com/enterprise))
- **[Artifact Registry](https://cloud.google.com/artifact-registry/docs/nodejs/manage-packages)** dari Google Cloud, ini cukup menarik dan teman-teman di kantor pada propose ini karena faktor security, dimana diharapkan artifact yang diunggah bisa dilindungi di bawah naungan otentikasi milik Google Cloud yang diurus oleh tim lain yang memang kompeten.
- **[GitHub Packages](https://github.com/features/packages)**, ini sih solusi terbaik kalau mau ngomongin *seemless integration*. Ya mau gimana lagi, `npm` udah dibeli GitHub, tentu saja berada di bawah payung yang sama akan sangat memudahkan mereka melakukan integrasi.


## Beberapa concern

Verdaccio sebenernya merupakan pilihan personal saya, tapi mengingat komposisi tim yang tidak punya kapasitas untuk mengurusi server yang digunakan oleh Verdaccio nantinya, yang ada malah jadi blocker buat development ketika servernya tidak reliable dan tidak dapat diandalkan.

Pilihan kedua ya dari Google Cloud yang rasanya sangat-sangat tidak developer-friendly, dokumentasinya sangat sedikit, baca dokumentasi awalnya saja sudah berasa, betapa susahnya anak-anak untuk adopsi ini nantinya. Saya langsung menolak begitu baca-baca dokumentasinya seharian dan gak nyambung-nyambung.

GitHub Package menutupi concern yang ditemukan, gak perlu ngurusin reliability si server, tapi integrasi juga tidak begitu sulit. Masalahnya ya cuma "cuan"-nya cukup nggak? Mampir sekilas lah ke [halaman pricing](https://github.com/features/packages#pricing)-nya, biar gak kaget pas turun invoice.

## Integrasi GitHub Package

### Beberapa rule awal

- ✅  **Mengenai package scope**, kalau di npm kamu akan membuat organization kemudian publish ke organisasi yang telah kamu buat sebagai scope. Tidak jauh beda, cuma karena organisasinya akan nempel dengan GitHub, jadi kamu cuma bisa pakai satu scope dalam satu organisasi. Jadi kalau dalam satu organisasi ternyata yang akan menggunakan GitHub package itu bukan hanya timmu, sebaiknya sih tambahkan juga prefix tambahan di nama package nya, biar gak pusing nyari tim yang punya package.

- ✅  **Setting package.json**, ada beberapa setting yang jadinya required pas mau develop package yang akan di publish ke GitHub Package. Yang pertama `repository`, pastikan punya vallue yang tepat, nantinya kan package-nya akan nempel di sidebar dan bisa dilihat di masing-masing repo. Yang kedua `publishConfig` harus punya field `registry` yang diarahkan ke `https://npm.pkg.github.com`. Yang ketiga ya seperti maintain third-party package biasanya saja ya, seperti: setting `private: true` nya dihilangkan, setting `files` dengan benar, setting `main` ke file yang tepat, dan lainnya.

```json
"repository": {
  "type": "git",
  "url": "https://github.com/YOUR_ORG/YOUR_REPO.git"
},
"publishConfig": {
  "registry": "https://npm.pkg.github.com"
},
```

### Akses dari lokal

Karena saya akan mempublikasikan ke organisasi, jadi saya perlu login ke scope-nya organisasi yang dimaksud. Kamu bisa mengikuti perintah berikut:

```bash
npm login --scope=@YOUR_ORG --registry=https://npm.pkg.github.com
```

Setelah menjalankan perintah di atas, kamu akan ditanya beberapa hal

- ✅  `Username`: Isikan dengan username dari GitHub yang kamu gunakan untuk mengakses GitHub Packages
- ✅  `Password`: Isikan dengan personal access token (PAT) yang punya scope untuk read dan write (bila diperlukan) ke Github Package
- ✅  `Email`: Isikan dengan email yang terhubung dengan GitHub

Seperti terlihat, kamu membutuhkan PAT untuk mengakses ke Github Packages. kamu bisa mengunjungi halaman [Setting Token](https://github.com/settings/tokens) di Github untuk membuat PAT milikmu. Pastikan punya scope yang sudah disebutkan di atas.

![Scope PAT yang dibutuhkan](/thumbnail/github-packages-private-registry-alternatif/pat-scope.png)

### Validasi Akses Lokal

Perintah `npm login`, setelah sukses dikerjakan sebenarnya akan menyetel nilai baru ke `~/.npmrc` kalian. Jadi untuk validasi, tinggal coba buka saja file ini, misal dengan vi:

```bash
vi ~/.npmrc
```

Berikutnya, kamu bisa cek user yang saat ini login dengan perintah:

```bash
npm whoami --registry=https://npm.pkg.github.com
```

Kalau-kalau kamu masih dianggap tidak login dengan benar, coba saja cara manual dengan langsung set ke config-nya npm, dengan perintah:

```bash
npm set email YOUR_GITHUB_EMAIL
npm set YOUR_ORG:registry https://npm.pkg.github.com
npm set //npm.pkg.github.com/:_authToken YOUR_GITHUB_TOKEN
```

Cara ini juga biasanya dilakukan ketika harus melakukan otentikasi di sistem CI, dimana kita tidak bisa menggunakan command line yang interaktif lagi.

### Akses dari CI

Sedikit agak berbeda ketika menggunakan CI, disini saya hanya mencontohkan dengan Github Action

#### Install private package

Proses install bisa jadi juga akan membutuhkan otntikasi, terutama kalu kamu memang menggunakan private package di aplikasi yang akan diinstall.

Dasarnya, sebenernya hampir sama dengan yang kita jelaskan sebelumnya, dimana kita mesti menyetel konfigurasi `~/.npmrc` dengan perintah yang sama dengan di atas

```bash
npm set email YOUR_GITHUB_EMAIL
npm set YOUR_ORG:registry https://npm.pkg.github.com
npm set //npm.pkg.github.com/:_authToken YOUR_GITHUB_TOKEN
```

Di Github Action sendiri, akan seperti ini kurang lebih:

```yaml
name: Install Private Packages
on:
  push:

jobs:
  install:
    runs-on: ubuntu-latest

    permissions:
      contents: read
      packages: write

    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Setup Node
        uses: actions/setup-node@v2
        with:
          node-version: '14.x'
          registry-url: 'https://npm.pkg.github.com'
          scope: '@YOUR_ORGANIZATION'

      - name: Private package auth
        run: |
          npm set @YOUR_ORG:registry https://npm.pkg.github.com
          npm set email YOUR_EMAIL
          npm set //npm.pkg.github.com/:_authToken ${{ secrets.PAT }}

      - name: Install dependencies
        run: npm install
```

Seperti yang bisa dilihat di atas, saya menjalankan perintah untuk otentikasi sebelum menjalankan `npm install` untuk memastikan otentikasi sukses sebelum install dijalankan.
#### Publish ke registry

Mengacu pada dokumentasi [setup-node](https://github.com/actions/setup-node/blob/main/docs/advanced-usage.md#publish-to-npmjs-and-gpr-with-npm) Actions, kita cukup passing env `NODE_AUTH_TOKEN` saja saat melakukan `npm publish`, berikut contohnya:

```yaml
- name: Publish
  run: npm publish
  env:
    NODE_AUTH_TOKEN: ${{ secrets.PAT }}
```

`${{ secrets.PAT }}` merupakan personal akses token yang sudah disimpan dalam secret sebelumnya.

#### Unpublish dari registry

Kamu bisa unpublish dari UI nya Github seharusnya, tapi karena kadang-kadang akses untuk ini dibatasi, kamu juga bisa membuat Github Action untuk melakukan unpublish dari versi yang tidak diinginkan. Ada beberapa, saya menggunakan [delete-old-packages](https://github.com/SmartsquareGmbH/delete-old-packages) dari `smartsquaregmbh`. Silahkan baca-baca sendiri ya dari dokumentasinya.

## Penutup

Haruskah kalian pakai Github Packages juga? Yo nggak. Sesuaikan saja dengan keadaan di kantor teman-teman. Pake Verdaccio nih? Yo gak masalah, mantep malahan.

Gak usah ikut-ikutan tanpa berusaha memahami kondisi yang ada, tulisan ini cuma sekedar berbagi dari apa yang saya alami dan pelajari saja.