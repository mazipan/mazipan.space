---
title: Ajari Koding, bukan sekedar awesome list
date: '2020-07-08'
excerpt: Berbagai best practice yang bisa kita pelajari dan optimalkan dalam memuat halaman website
author: mazipan
published: true
featured: false
tags: [open-source]
coverImage: /thumbnail/ajari-koding-bukan-sekedar-awesome-list/ajari-koding.png
lang: id
enready: false
---

Beberapa waktu yang lalu saya dihubungi om [Peter Jack Kambey](https://www.facebook.com/peterjkambey).
Ya, beliau memang sering menghubungi saya secara personal baik sekadar menanyakan kabar, mengucapkan selamat atas apa hal luar biasa yang terjadi di hidup saya atau bertukar pikiran mengenai projek yang ingin dijalankan.
Kali ini beliau membuka obrolan bahwa beliau sedang terinspirasi ingin membuat satu halaman untuk tautan baik blog maupun video tutorial yang memang sangat sering sekali dipublikasikan di grup [Facebook PHPID](https://www.facebook.com/groups/phpid/).
Beliau menambahkan bahwa dengan begini kita bisa mengkategorikan berbagai sumber daya ini.
Kita bisa membedakan mana yang gratis, mana yang berbayar, mana yang bagus, mana yang masih butuh peningkatan kualitas.

Sebelumnya, ini memang bukan kali pertama om Peter menyampaikan berbagai keinginannya membuat sesuatu yang dirasa meolong teman-teman di group yang diasuhnya PHPID.
Saya pernah membantu membuatkan web untuk acara SME Summit, beberapa landing page kilat, serta berbagai obrolan yang tidak pernah terealisasi adanya.
Terakhir kali saya membantu membuatkan daftar untuk [Belajar Daring](https://s.id/phpid-learning) yang diadakan PHPID selama kondisi bekerja dari rumah ini, tentu saja alasannya karena saya pribadi malas diminta scroll halaman grup Facebook mereka yang hampir tiap 5 menit ada saja pos terbaru.
Kalian bisa melihat beberapa projek lainnya di [Github PHPID-Jakarta](https://github.com/phpid-jakarta)

## 👨‍💻 Memperkenalkan Ajari Koding

Cara termudah dalam menyimpan data seperti ini adalah dengan membuatkan sebuah daftar di Github (_ya, saya memang lebih aktif di Github dibandingkan sosial media saya_) atau yang biasanya dikenal dngan _awesome-list_.
Idenya adalah mengumpulkan berbagai sumber daya ke dalam satu wadah yang mudah dibaca, yakni `readme.md` kalau di repositori.
Kenapa mesti di `readme.md`? karena ini pintu masuknya, semua orang bisa dengan mudah melihatnya tanpa perlu lagi navigasi ke dalam repositorinya lebih dalam lagi.
Sayangnya menempatkan data di `readme.md` ini juga cukup merepotkan, apalagi kalau datanya membengkak dengan cepat.
Salah satu solusi lain ya memindahkan ke tampilan Web yang terpisah sehingga bisa dicari dengan lebih mudah, bisa disaring dan diurutkan sesuai kehendak kita.

Saya menginisiasi projek ini dengan nama "Ajari Koding", sesimpel karena saya kepikirannya itu.
Tidak ada arti yang mendalam apalagi visi misi yang gamblang.

![Ajari Koding](/thumbnail/ajari-koding-bukan-sekedar-awesome-list/ajari-koding-showcase.png)

Projek seperti "Ajari Koding" cuma akan menjadi sampah kalau tidak ada yang mau membantu melengkapi koleksi data yang ada di dalamnya. Syukurlah om Peter punya kemampuan marketing dan punya banyak pengikut yang bisa dengan cepat melejitkan nama projek ini.

Sialnya si projek belum siap ketika mulai disebarkan, saya cuma menginisiasi sebuah _awesome-list_ tanpa memikirkan bagaimana cara memproses datanya nanti.

## 🚀 Wujudkan dulu, perbaiki kemudian

Yap, tak perlu menunggu waktu lama sejak obrolan dengan om Peter dimulai.
Beberapa waktu setelahnya, saya langsung memberikan kabar bahwa a saya telah membuatkan repositori untuk projek ini dan menjelaskan sedikit kalau nantinya akan begini dan begitu.

Sebelum mendapatkan satupun data dari luar, saya dan om Peter mencoba mereka-reka contoh data yang bisa digunakan agar bisa kepikiran bagaimana nanti cara memproses datanya untuk digunakan oleh Web.
Data didapatkan, template untuk menambahkan data baru disiapkan, waktunya mulai coding!

### 👨‍🔧 Membuat parser

Dengan mengerti gambaran kecil bagaimana datanya akan ditata di `readme.md`, saya mulai bisa menentukan harus menggunakan apa untuk memproses datanya.
Saya memulai memberikan tenaga tambahan pada projek ini dengan membuatkan _parser_ untuk memproduksi data berbentuk JSON dari data Yang tersedia di `readme.md`.
Untuk membuat _parser_ saya menggunakan Node.js (_saya bisanya itu_), dengan memanfaatkan pustaka `markdown-it` untuk mengubah menjadi HTML dan `cheerio` untuk melakukan seleksi dari elemen HTML yang ada.

Kalian bisa melihat kode yang sudah saya sederhanakan berikut:

```javascript
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

const readmeContent = await fs.readFileSync(path.resolve('./README.md'), {
  encoding: 'utf-8',
});

// Parsing menjadi HTML string
const html = md.render(readmeContent);

const $ = cheerio.load(html);

// Mengambil semua `h3`
// Kemudian mencari `ul` terdekatnya
// Kemudian mengambil data `li` anaknya
const jsonResult = $('h3')
  .map((i, el) => {
    return $(el)
      .next('ul')
      .children()
      .map((_, li) => {
        return $(li).text();
      })
      .get();
  })
  .get();
```

Setelah berhasil melakukan _parsing_ data menjadi JSON object, kemudian saya menuliskan hasilnya ke sebuah berkas dalam repositori agar _persistent_ dan bisa digunakan ulang.

### 💫 Membuat otomasi parser

Setelah selesai membuat _parser_, berikutnya saya memastikan kalau saya tidak perlu manual menjalankan _parser_ ini di lokal mesin saya.
Karenanya, saya memanfaatkan **Github Action** untuk menjalankan parser setiap kali ada penambahan data baru atau perubahan data lama.
Jika kalian pernah membaca artikel "[Membuat commit otomatis ke Github](/membuat-commit-otomatis-ke-github/)" pastinya sedikit banyak mengerti bagaimana cara saya membuat kode sederhana untuk otomasi hal seperti ini.

Berikut saya sematkan potongan kode konfigurasi _workflow_ di **Github Actions** sampai saat tulisan ini dipublikasikan:

```yaml
name: Generate JSON
'on':
  push:
    branches:
      - master
jobs:
  generate_json:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
        with:
          persist-credentials: false
          fetch-depth: 0
      - name: Use node 12
        uses: actions/setup-node@v1
        with:
          node-version: 12.x
      - name: Get yarn cache
        id: yarn-cache
        run: 'echo "::set-output name=dir::$(yarn cache dir)"'
      - name: Cache Node.js modules
        uses: actions/cache@v1
        with:
          path: '${{ steps.yarn-cache.outputs.dir }}'
          key: "${{ runner.OS }}-yarn-${{ hashFiles('**/yarn.lock') }}"
          restore-keys: |
            ${{ runner.OS }}-yarn-
      - name: Install dependencies
        run: yarn
      - name: Generate file json
        run: yarn toJson
      - name: Commit files report
        run: |
          git config --local user.email "actions@github.com"
          git config --local user.name "Github Actions"
          git add -A
          git commit -m "✅ [Github Actions]: Generate json file"
      - name: GitHub Push
        uses: ad-m/github-push-action@v0.5.0
        with:
          github_token: '${{ secrets.GITHUB_TOKEN }}'
          force: true
```

### 🌍 Membuat Web UI

#### 💲 Svelte

Proses memilih-milih framework JavaScript apa yang mau digunakan pada jaman sekarang itu bisa jadi dilema besar.
Terlalu banyak pilihan memang.
Saya sendiri beberapa kali memang memanfaatkan projek _open-source_ sebagai wahana untuk mencoba dan belajar teknologi atau framework yang saya tidak punya kesempatan banyak untuk menggunakannya di pekerjaan sehari-hari.

Setelah menimbang-nimbang berbagai hal, rasanya saya belum punya pengalaman yang cukup baik dengan **Svelte**, jadi saya memilih menggunakannya saja untuk kali ini 😂.

Masih terlalu buta dengan **Svelte**, saya tidak berani banyak tingkah.
Cukup bagi saya menggunakan _template_ bawaan yang sudah disediakan oleh dokumentasi resmi mereka.
Bermodalkan artikel "[The easiest way to get started with Svelte](https://svelte.dev/blog/the-easiest-way-to-get-started)" saya pun berani memulai projek ini dengan sok gagah berani.

Memulai **Svelte** sendiri bisa dikerjakan dengan sesederhana mengetikkan perintah:

```bash
$ npx degit sveltejs/template ajari-koding
```

#### 🅱️ Bootstrap 5

Belum lama ini saya membaca artikel "[Bootstrap 5 alpha!](https://blog.getbootstrap.com/2020/06/16/bootstrap-5-alpha/)", ini framework yang memang tidak begitu dekat dengan saya dalam beberapa tahun belakangan dikarenakan memang tidak daigunakan dalam hampir sepanjang karir saya sebagai Frontend Developer.
Membaca artikel tersebut, seperti berhasil mengubah pandangan buruk saya terhadap CSS framework ini.
Yap, kali ini Bootstrap mengklaim bahwa di versi 5 ini mereka sudah bersih dari pustaka legendaris jQuery.
Ini menjadikan semakin mudah untuk memasang Bootstrap pada projek _Ajari Koding_ yang notabeni berbasiskan framework JavaScript modern yang biasanya menghindari penggunaan pustaka terlalu banyak.

Jadilah kombinasi **💲 Svelte x 🅱️ Bootstrap 5 Alpha** ini sebagai fondasi bagi projek **Ajari Koding** kali ini.

Saya memilih menggunakan CDN dari Bootstrap untuk mulai menggunakan CSS ini, dikarenakan saya tidak ingin banyak setup di level _build tool_ terlebih dahulu, saya lebih baik mengalihkan energi saya untuk mengerjakan hal lain yang lebih fundamental.
Menambahkan CDN Bootstrap sendiri cukup mudah, tinggal mencari _HTML entry_ dan diselipkan tag berikut:

```html
<link
  rel="stylesheet"
  href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/css/bootstrap.min.css"
  integrity="sha384-r4NyP46KrjDleawBgD5tp8Y7UzmLA05oM1iAEQ17CSuDqnUK2+k9luXQOfXJCJ4I"
  crossorigin="anonymous"
/>
```

Saya tidak menambahkan Script pendamping apapun selain hanya CSS ini, semua interaksi akan saya kerjakan di level Svelte saja tanpa bantuan dari Script dari Bootstrap maupun pendukungnya.

### 🏃 Migrasi ke Sapper

Awal saya inisialisassi projek ini, saya tidak punya banyak kesempatan untuk membaca dengan benar berbagai dokumentasi yang ada.
Saya hanya ingin menggunakan Svelte saja.

Selang waktu berjalan, saya membaca mengenai **Sapper** di Svelte yang mana seperti Next.js di React.js atau Nuxt.js di Vue.js.
Ini **super set framework** yang dibangun diatas Svelte dengan tujuan membangun aplikasi yang lebih kompleks dan mndukung **Server Side Rendering (SSR)**.
Seperti kemampuan Next.js dan nuxt.js, Sapper ini juga dapat memproduksi static files dari hasil kode yang ada.
Ini pilihan yang lebih baik menurut saya, apalagi dengan template Svelte yang sebelumnya saya belum sepmpat setup untuk routing sederhana dan store untuk state management. Di Sapper semua sudah disiapkan dari awal.

Proses migrasinya sendiri tidak begitu susah, justru menyesuaikan agar ini tetap mulus dengan lingkungan yang saya punya adalah hal lumayan menghabiskan waktu karena harus korek-korek dokumentasinya.

Saya menggunakan **Github Pages** untuk hosting projek ini, yang mana punya `basepath` berbeda dan mengharuskan saya menambahkan parameter tambahan ketika membuat _static file_, berikut contoh kodenya:

```bash
$ sapper export --basepath ajari-koding
```

### 📦 Menambahkan Database Sederhana

Ajari Koding membentuk tim kecil untuk melakukan kurasi dan memberikan rating pada item yang ada dalam daftar yang sudah diisikan oleh para kreator.
Sayangnya cara ini oleh sebagian teman-teman menjadi terasa tidak begitu adil karena kita memang akan memberikan nilai secara sepihak tanpa persetujuan dari siapapun.
Meskipun kita sebenarnya sudah mewanti-wanti dari jauh terkait hal ini, tapi tetap saja ada suara lirih yang menjadikan kita sebagai kambing berwarna hitam.

Saya pribadi memang sudah memiliki wacana untuk menambahkan fitur semacam "Like" atau "Clap" yang bisa disubmit oleh semua pengguna Ajari Koding.
Setelah mendapatkan waktu yang cukup senggang, akhirnya saya coba eksplor terkait hal ini.

Saya memilih menggunakan Firebase untuk membantu saya mengerjakan fitur ini, selain karena saya pernah menggunakan si Real-Time Database dari Firebase ini, saya juga membutuhkan fitur otentikasi yang dimiliki Firebase.

Berikut tampilan dimana kalian bisa menekan tombol 👍 di masing-masing item yang kalian sukai:

![Tampilan tombol "Like"](/thumbnail/ajari-koding-bukan-sekedar-awesome-list/like-button-ajari-koding.png)

Tombol tersebut hanya akan muncul setelah kalian login dengan akun Google terlebih dahulu

![Tampilan tombol login](/thumbnail/ajari-koding-bukan-sekedar-awesome-list/login-button-ajari-koding.png)

### 🤖 Template untuk menambahkan Issue

Hal ini dibutuhkan untuk memudahkan teman-teman dalam berkontribusi, baik menambahkan galat (error) yang ditemukan, permintaan fitur baru ataupun menambahkan data sumber daya terbaru.

![Contoh menambahkan issue template](/thumbnail/ajari-koding-bukan-sekedar-awesome-list/gh-template.png)

## 🙌 Mari mulai berkontribusi

Fakta bahwa PHPID adalah salah satu komunitas software developer terbesar di Indonesia, tidak lantas menjadikan semua hal menjadi mudah untuk menjalankan berbagai program maupun aktivitas yang ada di komunitas tersebut.
Sebagai komunitas memang nyawanya ya ada di member di dalamnya, sekalipun ada beberapa pengurus yang ditunjuk tapi pada dasarnya mereka tidak akan bisa berjalan sendiri tanpa bantuan dari rekan-rekan member di dalamnya.

Tidak perlu terlalu jauh mikir "Bisa bantuin apa ya?", kita sama-sama belajar.

---

Semoga bermanfaat 🙏
