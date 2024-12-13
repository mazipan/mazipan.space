---
title: Peralatan untuk monorepomu
date: '2021-11-12'
excerpt: Beberapa peralatan yang saya ketahui untuk mempermudah hidupmu kalau sehari-hari harus mengurusi makhluk bernama monorepo
author: mazipan
published: true
featured: false
tags: [monorepo]
coverImage: /thumbnail/peralatan-untuk-monorepomu/cover.png
lang: id
enready: false
---

Setelah kemarin menullis sedikit persepsi saya mengenai monorepo, kali ini saya akan coba sebutkan beberapa peralatan yang membantu dalam mengurus monorepo, setidaknya dari yang saya alami.

## Hal yang harus diperhatikan

Mengurus monorepo memang sudah menjadi *love-hate relationship* bagi saya pribadi, makanya tulisannya pun bisa jadi bias nanti ya :-D. Ya, mengurus monorepo sedikit (baca: banyak) berbeda dari mengurus repo dengan satu projek di dalamnya, ada beberapa workfow yang jadi berbeda yang nantinya juga menjadikan pemilihan alat ya jadi berbeda pula. Beberapa hal yang berbeda antara lain:

### Cara Install

Di monorepo kamu harus bisa melakukan proses install secara recursive, baca ke dalam folder semua package yang tersedia dan pastikan semua dependency dari semua package yang ada berhasil terpasang dengan benar dengan satu perintah yang umumnya dijalankan dari root projek saja.

### Cara Release

Saat proses release, ada beberapa hal yang umumnya dikerjakan, misalnya:

- ✅  Bump versi ke versi berikutnya
- ✅  Buat tag di git dari commit terakhir
- ✅  Buat changelog terkait perubahan-perubahan yang terjadi
- ✅  Build/transpile project untuk didistribusikan
- ✅  Pubish ke registry

## Pemilihan Package Manager

3 package manager (`npm`, `Yarn`, dan `pnpm`), ketiganya secara native sudah mendukung proses install recursive. `npm` mungkin jadi yang palling ketinggalan, karena kamu mesti memastikan versinya memang teranyar (paling tidak v7) dan mendukung `workspace` (silahkan baca [pengumuman release npm 7](https://github.blog/2020-10-13-presenting-v7-0-0-of-the-npm-cli/)). Yarn sudah mendukung dari versi v1 dan pnpm yang saya gunakan (v4) sih sudah mendukung ya.

`npm` dan `Yarn` menggunakan pendekatan yang mirip, kamu mesti mendefinisikan workspace di dalam `package.json`, misal:

```json
{
  "name": "sebuah-nama",
  "description": "Apalah artinya sebuah nama",
  "version": "0.0.0",
  "workspaces": [
    "packages/*"
  ]
}
```

Setelahnya tinggal `yarn install` ataupun `npm install` dan secara otomatis keduanya akan mencari semua projek di bawah direktori `packages/*`.

`pnpm`  mengambil jalan yang sedikit berbeda, kamu mesti membuat berkas tambahan `pnpm-workspace.yaml` dengan isi minimum seperti berikut:

```yaml
packages:
  - '.'
  - 'packages/**
```

Cara install-nya pun jadi sedikit berbeda, yakni dengan `pnpm recursive install`.

## Alat pengatur lain

Meskipun package manager sudah mendukung secara native, namun karena banyaknya kebutuhan custom di dalam monorepo makanya menjadikan para penganutnya banyak mencari alat lain yang mempermudah pekerjaan mereka, beberapa diantaranya:

### Lerna

[Lerna](https://lerna.js.org/) kayanya alat yang paling tua dibandingkan pesaingnya. Salah satu yang awal-awal menggunakan ya `Babel`, tapi kayanya akhir-akhir ini mereka bikin banyak tambahan custom script juga, saya tidak yakin apakah `Lerna` nya masih dipakai atau tidak.

Di `Lerna` kamu harus mendifinisikan `lerna.json` di root, misal:

```json
{
  "version": "1.1.3",
  "npmClient": "npm",
  "command": {
    "publish": {
      "ignoreChanges": ["ignored-file", "*.md"],
      "message": "chore(release): publish"
    }
  },
  "packages": ["packages/*"]
}
```

Atau semudah kamu panggil saja `lerna init` di awal, dan file ini akan dibantu dibuatkan oleh `Lerna`. Menggunakan lerna berarti kamu juga siap masuk ke workflow punya dia. Dia punya cara install sendiri dengan perintah `lerna bootstrap`, untuk run script `lerna script`, untuk eksekusi perintah `lerna exec`, dll.

Enaknya `Lerna` ini ya udah toolset komplit, semua kebutuhan umum di monorepo sudah di tackle dengan baik. Macam ketika `lerna publish` itu dia udah melakuakan git tag, buatin changelog, bump versinya, commit ke origin dan publish ke registry.

### NX

[NX](https://nx.dev/) baru saya dengar belum lama, sekitar awal tahun ini. Pas baca awal-awal sih cukup tercengang ya dengan banyaknya fitur yang dia bawa. Salah satu tujuan besar yang dia bawa sih biar bisa reduce build dan test time yang biasanya memang membengkak di monorepo. Salah satu keunggulannya ya sistem cache yang diperkenalkan, ini bisa mempercepat proses build mereka, bahkan ada fitur cloud yang memungkinkan untuk sharing cache antar developer (tapi mbayar dong). Fitur lainnya mereka bisa mendeteksi test mana yang harus dijalankan berdasarkan file yang berubah. Fiturnya sih komplit banget ya menurut saya, tapi ini bener-bener dunia baru sih. Mesti baca-baca banyak hal untuk paham cara kerjanya dan membiasakan dengan workflow si `NX`.

### Rush

[Rush](https://rushjs.io/) ini alat dari Microsoft buat mengatur monorepo yang katanya sih dipakai juga di internalnya Microsoft. Rush memanfaatkan symlink macam pnpm agar tidak ada dependency yang duplikat terpasang dua kali, makanya disarankan untuk running command under `rush` dibandingkan direct menggunakan `npm` atau yang lain. Perintah yang tersedia juga cukup sederhana, tapi ya tetep perlu belajar juga sih, macam `rush update` buat install dependenc, `rush rebuild` atau `rush build` buat menjalankan proses build.

Saya pribadi belum banyak baca terkait Rush, tapi mestinya cukup menarik ya kalau dipakai di internal perusahaan segede Microsoft.

### Alat lain yang menarik

- 🚀  [Turborepo](https://turborepo.org/), besutan Vercel. Kemungkinan mudah sekali integrasinya dengan Next.js.
- 🚀  [Bit](https://bit.dev/), get started nya udah disuruh register, jadi males nyobain
- 🚀  [Bazel](https://bazel.build/), katanya sih dipake sama Google ya. Salah satu yang menarik, dia support multiple programming language.
- 🚀  [Bolt](https://github.com/boltpkg/bolt), docs nya masih limited sih ini
- 🚀  [changesets](https://github.com/atlassian/changesets), punya Atlasian. Bukan full fitur sih, membantu untuk proses release di Monorepo. Salah satu rekomendasi official juga dari `pnpm`.

## Alat yang saya pakai

Saya di kantor ada salah satu monorepo, isinya ada package dan apps di dalamnya. Ada 20+ apps, 20+ package dan 20+ shared code package lainnya. Kesemuanya di satu repositori gendut dan di maintain dengan `pnpm workspace` dikombinasikan dengan `Lerna` dan `conventional-changelog` untuk otomasi proses pembuatan changelog dan git tag. Tantangannya ya buat pastiin si developer commit dengan konvensi yang tepat, untuk menjaga changelognya tetap relevan, saya memasang `commitlint` di pre-commit hook nya git. Tapi yo dasarnya kebanyakan orang, ada aja yang ngawur isinya :-D. Proses install dan lainnya hanya memanfaatkan kemampuan `pnpm` dalam resolve dependency di workspace nya.

Di monorepo lain, saya tidak memilih `Lerna` karena tipenya yang sekali hajar semua package akan kena semua, karena saya ada kasus harus pilih-pilih, maka saya membuat beberapa custom script untuk build dan release. Jadi ada beberapa workflow yang saya lebih pilih untuk manual saja, macam bikin changelog, bump version, dan lainnya. Tapi beberapa proses tetap otomasi, macam proses build, menentukan package mana yang harus di build ketika satu package akan di release, itu semua bikin pake script sendiri aja. Sempat nyobain beberapa peralatan buat membantu, macam [changesets](https://github.com/atlassian/changesets), [standard-version](https://github.com/conventional-changelog/standard-version), dan lainnya untuk membantu otomasi pekerjaan di monorepo ini, tapi sepertinya belum ketemu klikny. Sedangkan untuk proses install dependency dan workspace masih setia dengan `pnpm`, termasuk menjalankan script dengan kemampuan filter dari package-package yang ada. pnpm masih cukup powerful untuk menangani hal ini, hanya otomasi untuk release saja yang tidak ada opsi bawaan darinya.

Di repo lain, saya malah meletakkan banyak projek tapi tidak memilih menggunakan monorepo, melainkan install masing-masing aja, hanya diletakkan di satu repo, tapi proses install dan lainnya sendiri-sendiri.

## Penutup

Kebanyakan peralatan custom pembantu monorepo memang sangat *opinionated*, sehingga kamu akan dipaksa untuk mengikuti cara kerjanya, cara install, cara publish, dll jadi berbeda dari yang biasa kamu kerjakan. Buruknya, ya kamu harus belajar ulang banyak hal. Tapi karena mereka di design khusus untuk menangani monorepo, alat-alat di atas kemungkinan akan berguna. Pilih dengan bijak, cari yang sesuai dengan kebutuhan, gak perlu ikut-ikutan trend, cari saja apa yang bekerja dengan kondisi yang ada. kalau gak butuh-butuh amat, gak usah lah gaya-gayaan bikin custom-custom script buat ngurusin beginian :-D.

---

Original cover dari [freepik.com](https://www.freepik.com/free-photo/studio-shot-positive-friendly-young-constructor-carrying-drill-belt-with-all-instruments-doing-renovation-client_11528258.htm)
