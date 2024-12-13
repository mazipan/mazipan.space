---
title: Membuat custom badge
date: '2021-11-21'
excerpt: Bagaimana membuat custom badge untuk mempercantik README di repo kalian
tags: [open-source]
---

Badge service yang biasa saya pakai [shields.io](https://shields.io/) ternyata meyediakan kemampuan untuk mebuat custom badge di atas service mereka. Use-case nya adalah saya ingin menampilkan jumlah URL yang telah disimpan oleh [ksana.in](https://ksana.in/) di README repository-nya.

Hal yang saya lakukan adalah membuat API baru, kalian bisa lihat detail kodenya di berkas [src/pages/api/shield.ts](https://github.com/mazipan/ksana.in/blob/master/src/pages/api/shield.ts), tapi kurang lebih saya ingin memproduksi API dengan format begini:

```json
{
  "schemaVersion":1,
  "label":"Shortened URLs",
  "message":"620",
  "color":"orange",
  "cacheSeconds":86400,
  "style":"flat-square"
}
```

Hasilnya tinggal dipasang di README dengan cara menambahkan API kita ke alamat `https://img.shields.io/endpoint?url=`, lihat contoh berikut:

```md
![Custom Badge](https://img.shields.io/endpoint?url=https%3A%2F%2Fksana.in%2Fapi%2Fshield)
```

Seperti bisa dilihat pada contoh di atas, URL yang di-passing sudah di-`encodeURIComponent` terlebih dahulu agar lebih url-friendly.

![Hasil dari custom badge yang dibuat](https://img.shields.io/endpoint?url=https%3A%2F%2Fksana.in%2Fapi%2Fshield)

Selengkapnya, silahkan baca di: [shields.io/endpoint](https://shields.io/endpoint)