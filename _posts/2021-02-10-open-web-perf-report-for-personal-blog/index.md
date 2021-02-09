---
title: Laporan terbuka performa web untuk blog pribadi
date: '2021-02-10'
excerpt: Cara yang saya tempuh untuk membuat laporan terbuka dari performa web untuk blog pribadi saya
author: mazipan
published: true
featured: false
tags: [web-perf]
coverImage: /thumbnail/open-web-perf-report-for-personal-blog/open-web-perf-report.jpg
lang: id
enready: false
---

Dalam misi pribadi saya untuk membuat laporan terbuka untuk blog pribadi saya sendiri, saya telah menempuh dan menyelesaikan beberapa langkah yang sepertinya akan menarik untuk dituliskan menjadi artikel tersendiri sebagai dokumentasi, paling tidak untuk diri sendiri di masa depan.

Rencana ini sebenarnya sudah lama saya pikirkan, hanya saja momentumnya tidak ketemu-ketemu, akhirnya ya cuma jadi angan-angan saja tanpa pernah mencoba melakukan aksi nyata untuk menyelesaikan apa yang sudah terpikirkan tersebut.

Saya terpikirkan ingin mempunyai halaman tersendiri di blog saya yang akan menyajikan hasil pengukuran performa web dari blog saya tersebut secara berkala, ini saya sebut sebagai laporan terbuka. Ya, terbuka, karena sebegitu mudahnya diakses, tidak perlu lagi melakukan pengujian sendiri, secara konstan laporan tersebut akan diperbarui. Saya bahkan sudah membayangkan kalau halaman macam ini menjadi pendamping dari halaman "about" atau "tentang" yang hampir pasti tersemat di blog-blog manapun. Yah, paling tidak untuk lingkup orang-orang di lingkaran saya saja dulu. Kan saya punya lingkaran yang banyak berprofesi sama, mungkin saja mereka juga mau menerima angan-angan saya ini.

Terlalu lama mengendap, bisa jadi kecolongan. Itu yang saya rasakan pas membaca sebuah utas di twitter dari DeepTech yang pada dasarnya hanya report dari artikel keren "[Monitor dan Ukur Performa Website secara Berkala dan Otomatis dengan Speedlify](https://diskusi.tech/sozonome/monitor-dan-ukur-performa-website-secara-berkala-dan-otomatis-dengan-speedlify-37jo)". Yah, ini sebenernya secara alur mirip dengan apa yang saya mau nih. Saya bahkan sempat mencobanya sendiri, si Speedlify ini di repo [irfan-maulana-tkp/speedlify](https://github.com/irfan-maulana-tkp/speedlify). Tapi ya sebagai seorang Engineer yang sudah berangan-angan sejak lama terus sekarang harus pakai bikinan orang lain, rasanya kok kaya ada yang kurang, rasanya kok kayanya memang saya harus menuntaskan rasa penasaran saya dulu. Jadi buat catatan kalian yang baca ini, misi ini hanya untuk memuaskan hasrat pribadi saja, faedahnya mungkin gak banyak buat kalian.

Seperti sudah saya sebut di atas, secara alur Speedlify ini sudah mirip dengan apa yangs saya mau. Dia memanfaatkan scheduler dan akan secara terjadwal menjalankan pengujian berkala untuk menghasilkan laporan performa web kalian. Speedlify memanfaatkan Github Action dan Netlify untuk kebutuhan mereka. Bagian kerennya dari Speedlify ya mereka sudah membuatkan tampilan HTML matang sebagai hasil dari laporan mereka. Kalian bisa lihat contoh laporan mereka di halaman [11ty.dev/speedlify/](https://www.11ty.dev/speedlify/). Menarik bukan?

## Eksplorasi Alat Bantu

Saya sudah bermain cukup lama dalam setahun belakangan dengan pustaka Lighthouse dan kroco-kroconya, sehingga saya sudah cukup familiar dengan bagaimana saya menggunakan Lighthouse. Pilihan pertama saya melihat kondisi ini, tentu saja akan jatuh pada Lighthouse untuk menjalankan pengujian performa web ini. Dan untuk penjadwalan, paling mudah ya saya membutuhkan Github Action. Dengan memilih alat pembantu di awal, saya bisa mempersempit ruang permasalahan yang ingin saya pecahkan. Berarti target saya, bahwa saya akan membuatnya dalam bentuk Github Action yang bisa dengan mudah dipasang oleh saya (atau orang lain) di blog mereka yang memang ditaruh di Github. Membuat Github Action dan membuat orang lain mudah menggunakannya? Berarti harus dipublikasikan di Marketplace kali ya? Lah, ini pusing lagi. Gak pernah mengerjakan hal semacam ini sebelummnya.

## Eksplorasi Github Action

Untungnya Github sudah baik hati membuatkan dokumentasi [bagaimana membuat Github Action dengan JavaScript](https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action) bahkan sampai [cara mempublikasikannya di Marketplace](https://docs.github.com/en/actions/creating-actions/publishing-actions-in-github-marketplace) pun sudah ada.

Teknik pertama kalau bingung harus dari mana, ikuti saja dulu dokumentasinya. Yowes, ikuti saja yang ada. Buat Github Action untuk mencetak kata "Halo Dunia" saja dulu. Dari contoh di dokumentasi awal saja, kita sudah bisa tau bagaimana cara "melempar" argumen/masukkan ke sebuah Github Actions berikut juga cara membaca/menangkapnya di dalam kode internal-nya.

Macam kode ini:

```yml
uses: actions/hello-world-javascript-action@v1.1
with:
  who-to-greet: 'Mona the Octocat'
```

Ini kode sudah ngasih tau kalau dia mau melempar masukkan `who-to-great` yang isinya `Mona the Octocat`.

Terus, kode internal nya begini:

```js
const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
```

Argumennya ditangkap dengan `core.getInput('who-to-greet');`. Semudah itu.

Yang tidak boleh terlewat di awal, ya Github Action membutuhkan sebuah berkas metadata `action.yml` yang isinya adalah deskripsi dari Actions yang kita buat, termasuk argumen yang dibutuhkan olehnya.

```js
name: 'Hello World'
description: 'Greet someone and record the time'
inputs:
  who-to-greet:  # id of input
    description: 'Who to greet'
    required: true
    default: 'World'
outputs:
  time: # id of output
    description: 'The time we greeted you'
runs:
  using: 'node12'
  main: 'index.js'
```

Aihh, bisa nih kayanya kalau gini (doang) nih.

Maka mulailah saya mencoba menambahkan Lighthouse dan Chrome-Launcher ke dalam project Github Action nya. Terus ternyata saya belum baca bagian cara mempublikasikannya. Bahwa pilihannya adalah kita harus mempublikasikan beserta semua dependensi yang dibutuhkan, kalau kasus saya berarti bareng sama `node_modules` nya. Di dokumentasinya sendiri mengarahkan untuk menggunakan [vercel/ncc](https://github.com/vercel/ncc) untuk mem-bundle kodenya. Ya sudah kerjakan saja, dan teng... teng... teng... Gagal son... Coba lagi deh, siapa tau berhasil. Gagal lagi son... Hmmm, coba hapus `node_modules` nya dan install ulang deh. Kalau gagal juga mungkin upload aja kali ya sama `node_modules` nya ke Github. Yap, ternyata ada yang konsiten gagal. Sepertinya ada kode yang belum didukung oleh `vercel/ncc` sehingga gagal di bundle olehnya. Mulai lah mencoba cara bar-bar, keluarkan `node_modules` dari `.gitignore` dan commit ke Github. Dan ternyata ada 5K+ berkas yang harus diunggah. Pun dengan internet yang cukup mumpuni tetap saja laptop Mac bengong dalam waktu yang cukup lama hanya untuk melakukan `git add` dan `git commit`, ditambah lagi `git push`. Gak selesai-selesai...


**Bersambung dulu ya...**
