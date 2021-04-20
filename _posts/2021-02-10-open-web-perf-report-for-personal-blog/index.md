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

Terlalu lama mengendap, bisa jadi kecolongan.
Itu yang saya rasakan pas membaca sebuah utas di twitter dari DeepTech yang pada dasarnya hanya report dari artikel keren "[Monitor dan Ukur Performa Website secara Berkala dan Otomatis dengan Speedlify](https://diskusi.tech/sozonome/monitor-dan-ukur-performa-website-secara-berkala-dan-otomatis-dengan-speedlify-37jo)". Yah, ini sebenernya secara alur mirip dengan apa yang saya mau nih.
Saya bahkan sempat mencobanya sendiri, si Speedlify ini di repo [irfan-maulana-tkp/speedlify](https://github.com/irfan-maulana-tkp/speedlify).
Tapi ya sebagai seorang Engineer yang sudah berangan-angan sejak lama terus sekarang harus pakai bikinan orang lain, rasanya kok kaya ada yang kurang, rasanya kok kayanya memang saya harus menuntaskan rasa penasaran saya dulu.
Jadi buat catatan kalian yang baca ini, misi ini hanya untuk memuaskan hasrat pribadi saja, faedahnya mungkin gak banyak buat kalian.

Seperti sudah saya sebut di atas, secara alur Speedlify ini sudah mirip dengan apa yang saya mau.
Dia memanfaatkan *scheduler* dan akan secara terjadwal menjalankan pengujian berkala untuk menghasilkan laporan performa web kalian.
Speedlify memanfaatkan Github Action dan Netlify untuk kebutuhan mereka.
Bagian kerennya dari Speedlify ya mereka sudah membuatkan tampilan HTML matang sebagai hasil dari laporan mereka.
Kalian bisa lihat contoh laporan mereka di halaman [11ty.dev/speedlify/](https://www.11ty.dev/speedlify/).
Menarik bukan?

## Eksplorasi Alat Bantu

Saya sudah bermain cukup lama dalam setahun belakangan dengan pustaka Lighthouse dan kroco-kroconya, sehingga saya sudah cukup familiar dengan bagaimana saya harus menggunakan Lighthouse.
Pilihan pertama saya melihat kondisi ini, tentu saja akan jatuh pada Lighthouse untuk menjalankan pengujian performa web ini.
Dan untuk penjadwalan, paling mudah ya saya akan memanfaatkan fitur Cron dari Github Action.
Dengan memilih alat pembantu di awal, saya bisa mempersempit ruang permasalahan yang ingin saya pecahkan.
Berarti target saya, bahwa saya akan membuatnya dalam bentuk Github Action yang bisa dengan mudah dipasang oleh saya (atau orang lain) di blog mereka yang memang ditaruh di Github.
Membuat Github Action dan membuat orang lain mudah menggunakannya? Berarti harus dipublikasikan di Marketplace kali ya? Lah, ini pusing lagi.
Gak pernah mengerjakan hal semacam ini sebelummnya.

## Eksplorasi Github Action

Untungnya Github sudah baik hati membuatkan dokumentasi [bagaimana membuat Github Action dengan JavaScript](https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action) bahkan sampai [cara mempublikasikannya di Marketplace](https://docs.github.com/en/actions/creating-actions/publishing-actions-in-github-marketplace) pun sudah ada.

Teknik pertama kalau bingung harus dari mana, ikuti saja dulu dokumentasinya.
Yowes, ikuti saja yang ada.
Buat Github Action untuk mencetak kata "Halo Dunia" saja dulu.
Dari contoh di dokumentasi awal saja, kita sudah bisa tau bagaimana cara "melempar" argumen/masukkan ke sebuah Github Actions berikut juga cara membaca/menangkapnya di dalam kode internal-nya.

Macam kode ini:

```yaml
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

```yaml
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

Maka mulailah saya mencoba menambahkan `Lighthouse` dan `Chrome-Launcher` ke dalam project Github Action nya.
Terus ternyata saya belum baca bagian cara mempublikasikannya.
Bahwa pilihannya adalah kita harus mempublikasikan beserta semua dependensi yang dibutuhkan, kalau kasus saya berarti bareng sama `node_modules` nya.
Di dokumentasinya sendiri mengarahkan untuk menggunakan [vercel/ncc](https://github.com/vercel/ncc) untuk mem-bundle kodenya.
Ya sudah kerjakan saja, dan teng... teng... teng... Gagal son...
Coba lagi deh, siapa tau berhasil.
Gagal lagi son...
Hmmm, coba hapus `node_modules` nya dan install ulang deh.
Kalau gagal juga mungkin upload aja kali ya sama `node_modules` nya ke Github.
Yap, ternyata ada yang konsiten gagal.
Sepertinya ada kode yang belum didukung oleh `vercel/ncc` sehingga gagal di bundle olehnya.
Mulai lah mencoba cara bar-bar, keluarkan `node_modules` dari `.gitignore` dan commit ke Github.
Dan ternyata ada 5K+ berkas yang harus diunggah.
Pun dengan internet yang cukup mumpuni tetap saja laptop Mac bengong dalam waktu yang cukup lama hanya untuk melakukan `git add` dan `git commit`, ditambah lagi `git push`.
Gak selesai-selesai...

Akhirnya pilihan termudah saya adalah memindahkan sumber data yang sebelumnya memaksakan menggunakan Lighthouse menjadi menggunakan API dari PageSpeed Insight, tentu saja ini mudah, karena saya tidak perlu lagi berurusan dengan masalah bundle-membundle.

## Mulai membuat projek nyata

Yap saat main-main cukup, saatnya merencanakan membuat projek nyatanya.

Siapkan "interface" dasar yang dibutuhkan, saya memutuskan membutuhkan paling tidak `API_KEY`, `URL` dari halaman yang akan di test serta jenis `DEVICE` yang ingin digunakan (mobile/desktop). Ini dulu saja untuk permulaan.

Saya mulai dengan menambahkannya di `action.yml` kebutuhan saya:

```yaml
name: "psi-gh-action"
inputs:
  api_key:
    description: "PageSpeedInsight API key"
    required: true
  urls:
    description: "List of URL(s) to be analyzed"
    required: true
  devices:
    description: "Device(s) used for test"
    default: mobile
runs:
  using: "node12"
  main: "dist/index.js"
```

Masalahnya saya mesti bisa baca URL yang dalam jumlah yang bisa lebih dari satu, berarti berupa *Array*, pun begitu dengan device, bisa saja kan saya membutuhkan untuk menguji performa pada device desktop dan mobile, bukan salah satunya.

Untuk passing *Array sendiri* di YAML bisa dengan begini misalnya:

```yaml
devices: |
  mobile
  desktop
```

Sedangkan untuk mengambil nilainya mungkin jadi harus parsing manual. Hal ini karena `core.getInput(arg)` dari Github Action cuma bisa menerima masukan dalam bentuk string. saya perlu membuat *helper* yang isinya kurang lebih begini:

```js
function getInputList (arg, separator = '\n') {
  const input = core.getInput(arg)
  if (!input) return []
  return input
    .split(separator)
    .map((url) => url.trim())
    .filter(Boolean)
}
```

Sehingga di file `index.js` saya bisa mendapatkan nilainya dengan begini saja:

```js
const urls = getInputList('urls')
const devices = getInputList('devices')
const apiKey = core.getInput('api_key')
```

Tinggal menggunakan data sederhana ini untuk memanggil API dari PageSpeed Insight ya. Kalian bisa membaca lebih detail terkait API ini di [halaman dokumentasi resmi](https://developers.google.com/speed/docs/insights/v5/get-started) PageSpeed Insight

## Melakukan pengujian internal

Kita bisa memanggil Action kita sendiri melalui repo internal kita, caranya kurang lebih begini:

▶️ Saya buat berkas untuk Action di direktori `.github/workflows/example.yml`

▶️ Saya menyetel trigger dengan `push` agar bisa dapat umpan balik yang instan

```yaml
on:
  push:
    paths-ignore:
    - "psi-reports/**"
    - "dist/**"
```

▶️ Gunakan checkout@v2 untuk mengambil repo


```yaml
on:
  push:
    paths-ignore:
    - "psi-reports/**"
    - "dist/**"
jobs:
  psi_web_perf_action:
    runs-on: ubuntu-latest
    name: Example job
    steps:
      - name: Checkout
        uses: actions/checkout@v2
```

▶️ Arahkan ke direktori root untuk bisa menggunakan Action internal

```yaml
on:
  push:
    paths-ignore:
    - "psi-reports/**"
    - "dist/**"
jobs:
  psi_web_perf_action:
    runs-on: ubuntu-latest
    name: Example job
    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Running PSI
        uses: ./ # Uses an action in the root directory
        id: psi_job
        with:
          api_key: ${{ secrets.PSI_API_KEY }}
          urls: |
            https://mazipan.space/
          devices: |
            mobile
```

Dengan begini kita bisa melakukan pengujian di internal repo sendiri tanpa harus mempublikasikan terlebih dahulu.

## Mempublikasikan ke Marketplace

Beberapa hal yang say lakukan sebelum mempublikasikan ke Marketplace antara lain:

➡️ Memberikan deskripsi tambahan

Saya menambahkan info tambahan pada `action.yml` seperti deskripsi, nama pembuat, icon yang bisa digunakan serta memberikan deskripsi semudah mungkin pada semua `input` yang saya butuhkan.

➡️ Membuatkan dokumentasi sederhana

Ini paling tidak mencakup hal apa yang ingin diselesaikan dengan Action ini, bagaimana cara memasangnya, dan contoh lengkap Action yang menggunakan Action ini.
Semuanya saya tulis dengan ringkas di `README.md`.
Saya juga menambahkan beberapa tautan ke halaman yang saya rasa perlu dibaca untuk memahami cara memasang Action ini, dan menyematkan gambar tangkapan layar sebagai pemanis dokumentasi.

➡️ Melakukan versioning

Github Action akan memanfaatkan tagging di `git` dan fitur `release` di Github.
Jadi setelah selesai pekerjaan, jangan lupa untuk melakukan `release` di Github dan menambahkan pesan perubahan apa saja yang dikerjakan pada versi terbaru tersebut.

Baca selengkapnya mengenai [mempublikasikan Github Action di Marketplace](https://docs.github.com/en/actions/creating-actions/publishing-actions-in-github-marketplace).

## Implementasi di repo pribadi

Seperti disebutkan sebelumnya, saya menargetkan ini untuk digunakan di blog pribadi saya.
Jadi contoh petunjuk penerapan juga akan berfokus pada blog statis yang saya miliki, selama blog kalian berbetuk statis dan di host di Github mestinya sih tidak akan jauh berbeda, mungkin hanya membutuhkan sedikit penyesuaian.

✍️ Pertama pastikan kalian telah mengaktifkan fitur Action di repo kalian (secara bawaan seharusnya sudah aktif)

✍️ Buat berkas action kalian dengan membuat berkas `.github/workflows/generate-psi.yml`

✍️ Isi berkas tersebut dengan contoh kode berikut:

```yaml
name: Generate PSI report
on:
  schedule:
    - cron: '30 2 * * 0, 2, 4, 6'

jobs:
  run_psi:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
        with:
          persist-credentials: false
          fetch-depth: 0

      - name: psi-gh-action
        uses: mazipan/psi-gh-action@1.5.0
        with:
          api_key: ${{ secrets.PSI_API_KEY }}
          urls: |
            https://mazipan.space/
          devices: |
            mobile
            desktop
          runs: 1
          max: 10
          branch: master
          push_back: true
          override: false
          token: ${{ secrets.GITHUB_TOKEN }}
```

✍️ Buat PSI API Key baru di halaman [Google Console](https://developers.google.com/speed/docs/insights/v5/get-started)

✍️ Set kredensial restriction dari API Key yang kalian buat ke `None`

✍️ Tambahkan API Key tersebut ke Secret di halaman [Secret untuk Github Action](https://github.com/YOUR_USERNAME/YOUR_REPO/settings/secrets/actions)

✍️ Tunggu paling tidak beberapa hari agar kalian bisa mendapatkan laporan berbentuk JSON

✍️ Kalian akan mendapati laporan dengan data seperti berikut:

```js
{
  "timestamp": "2021-02-05T16:12:02.119Z",
  "reports": [
    {
      "url": "https://mazipan.space/",
      "device": "mobile", // Device type for running Lighthouse
      "perf": 0.78,       // Performance score by PSI
      "fid": 16,          // First Input Delay based on Chrome UX field data
      "lcp": 2775,        // Largest Contentful Paint
      "cls": 0,           // Cummulative Layout Shift
      "fcp": 2100,        // First Contentful Painy
      "fci": 3533,        // First CPU Idle
      "tbt": 591,         // Total Blocking Time
      "tti": 5656.5,      // Time to Interactive
      "si": 2100,         // Speed Index
      "req": 42,          // Total count of all resources requested by the page
      "size": 394708      // Total size of all resources requested by the page
    }
  ]
}
```

✍️ Buat tampilan yang kalian suka untuk menyajikan data yang diperoleh

Untuk kalian yang ingin mengikuti perubahan inisial yang saya lakukan untuk implementasi Action ini ke repo blog saya, bisa ikuti saja commit [c865772](https://github.com/mazipan/mazipan.space/commit/c86577204951760750b56f9c30660d0189cdad07) di repo [mazipan/mazipan.space](https://github.com/mazipan/mazipan.space).

Hasilnya bisa kalian jumpai saat ini di halaman [/speed](/speed)

![Gambar tampilan dari halaman /speed di awal-awal](/thumbnail/open-web-perf-report-for-personal-blog/speed-page.png)

## Rencana jangka pendek

Saya ingin mencoba memasarkan Github Action ini dalam beberapa waktu, kemungkinan saya akan membantu pemasangan di blog teman-teman developer Indonesia.
Saat ini sendiri saya sudah membantu memasangkan di blog [jefrydco.id](https://jefrydco.id/speed/).
Semoga makin banyak lagi yang sempat saya bantu pasangkan atau syukur-syukur sih mereka bisa pasang sendiri ya ✨

Saya sudah mendapatkan beberapa daftar tautan blog statis punya developer Indonesia yang saya kumpulkan lewat [Facebook](https://m.facebook.com/groups/sencha.indo.admin/permalink/3800756386674275/)
Kalian punya blog statis yang kodenya terbuka di Github juga? Yuk, ikut cobain dong.
Bisa colek-colek lah kalau pusing atau kena error.

## Hal yang saya pelajari

Asiknya mengerjakan hal-hal yang sebelumnya jarang atau bahkan belum pernah dikerjakan adalah kita bisa banyak mengeksplor hal baru, emskipun prosesnya jadi lebih lama, karena pastinya akan ketemu galat lucu yang seharusnya tidak perlu kita temui kalau sudah mahir.

Beberapa hal yang saya pelajari dari projek kali ini antara lain:

✔️ Baru tau ada yang namanya `vercel/ncc` untuk bundling kode node.js secara cepat dan mudah.

✔️ Belajar membuat Github Action sederhana dan mempublikasikan ke Marketplace.

✔️ Belajar mengimplementasikan Github Action ini ke projek orang lain, bukan hanya projek pribadi. Jadi harus *debug* bareng-bareng sama yang punya projek juga.

✔️ Belajar menggunakan Github API lewat paket `@actions/github` untuk beberapa kebutuhan seperti membuat komentar pada suatu commit.

## Tautan penting

📌 Repo "psi-gh-action": [https://github.com/mazipan/psi-gh-action](https://github.com/mazipan/psi-gh-action)

📌 Alamat marketplace "psi-gh-action": [https://github.com/marketplace/actions/psi-gh-action](https://github.com/marketplace/actions/psi-gh-action)

📌 Halaman hasil: [/speed](/speed)

Demikian tulisan kali ini.

Terima kasih dan semoga bermanfaat.
