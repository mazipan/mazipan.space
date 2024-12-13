---
title: Membuat commit otomatis ke Github
date: '2020-04-08'
excerpt: Bagaimana saya membuat commit otomatis menggunakan Github Actions
author: mazipan
published: true
featured: false
tags: [programming]
coverImage: /thumbnail/membuat-commit-otomatis-ke-github/membuat-commit-otomatis.jpg
imageCaption: Gambar dibuat dengan Pixlr
lang: id
enready: true
---

Sudah sekian lama saya tidak melakukan commit dengan akun Github utama saya di `@mazipan`, itu karena saya memutuskan membuat akun baru untuk memisahkan pekerjaan saya dengan Github yang memang saya tujukan untuk eskplorasi hal-hal yang biasanya di luar pekerjaan. Hal ini menjadikan statistik saya di Github tidak menjadi hijau lagi 😂.

Semenjak saya mengenal [Github Actions](https://help.github.com/en/actions), saya langsung jatuh cinta pada fitur dari Github ini. Saya yang biasanya memanfaatkan berbagai bantuan alat integrasi berkesinambungan (_Continouos Integration - CI_) seperti Tracis, Circle CI dan sebagainya untuk mengotomasi pekerjaan saya, saat itu langsung cring dengan fitur ini. Saya bisa mengatur kode utama dan sistem CI dalam satu tempat, tidak perlu lagi harus pindah-pindah website untuk mengatur semuanya. Hal lain juga yang membuat saya percaya bahwa Github Actions ini cukup menjanjikan, karena ini dikembangkan oleh tim Github sendiri sehingga merekalah yang menurut saya paling mengerti bagaimana cara terbaik untuk mengintegrasikan berbagai kebutuhan dengan platform mereka.

Benar saja, sekali, dua kali dan beberapa kali mencoba membaca dan menerapkan Github Actions ke repository saya, lha kok enak banget ya. Sembari iseng-iseng saya kepikiran bagaimana kalau saya bikin saja sebuah kode penjadwalan yang akan melakukan commit sederhana secara otomatis ke akun Github saya sendiri. Nah cring... Mulailah blusukan untuk pencitraan dan mencari bahan bacaan bagaimana caranya saya bisa melakukan commit balik terhadap repository yang sedang saya gunakan dalam Github Actions.

Kebetulan sekali topik ini pas sedang saya butuhkan juga untuk membuat otomasti terhadap [repository halaman beranda](https://github.com/vuejs-id/homepage) milik Vue.js Indonesia, mereka menggunakan dua repository yang mana repository satu merupakan kode sumber dan repository satunya lagi menjadi penampung hasil yang telah diproses oleh VuePress.

Susah-susah gampang. Susah, karena saya memang belum pernah mengerjakan model ini. Gampang, setelah mengerjakan (oh, ternyata cuma begini toh 😂).

## Memulai Github Actions

File konfigurasi Github Actions menggunakan berkas YAML dan terletak di direktori `.github/workflows` pada umumnya. Pada contoh kasus sederhana kali ini saya membuat berkas `.github/workflows/autocommit.yml`. Kita bisa menambahkan lebih dari satu berkas dalam direktori ini yang biasanya kalau kita memiliki beberapa pekerjaan yang tidak saling terkait satu sama lain, agar lebih mudah untuk mengaturnya di masa depan.

Pertama kita perlu menambahkan nama dari workflow kita, maka saya hanya perlu menambahkan kode di dalam berkas YAML tersebut seperti ini:

```yaml
name: Auto commit
```

## Mengenal Trigger

Hal dasar yang umum mesti diketahui akan membuat CI menurut saya adalah mengerti soal trigger dan job. Trigger merupakan kode yang menentukan kapan CI kita akan dieksekusi, sedangkan Job adalah pekerjaan yang akan dijalankan ketika aturan dalam trigger telah terpenuhi. Di dalam Github Actions, Trigger ini dikenal dengan nama `Events` di Github Actions dan ditandai dengan sintaks `on` atau bahasa mudahnya "pas apa nih?". jadi pas lagi apa kode ini mau dijalankan. Karena saya mau melakukan pengujian terlebih dahulu, maka saya menambahkan Trigger pas lagi di `push` aja. Saya bisa menambahkan kode berikut:

```yaml
name: Auto commit
on:
  push:
    branches:
      - master
```

Bisa kembali disimak kodenya kalau masih ngawang-ngawang, kode diatas bisa dijelaskan bahwa saya menambahkan trigger ketika terjadi sebuah `push` pada branch `master` saya. Jadi setiap kali `push`, maka workflow `Auto commit` ini akan jalan.

Namun sebenarnya kan bukan ini yang ingin saya capai, saya mau membuat kode penjadwalan agar tidak perlu manual `push` terus-terusan. Maka dari itu saya menambahkan lagi Trigger yang akan dijalankan secara otomatis ketika waktu yang ditentukan sudah tercapai. Saya menambahkan kode berikut:

```yaml
name: Auto commit
on:
  push:
    branches:
      - master
  schedule:
    - cron: '0 7 * * *'
```

Bisa kita simak ulang ya kodenya. Kode diatas saya bisa jelaskan bahwa saya ingin workflow ini dijalankan setiap hari pada jam 7 pagi. Kalian lihat saya menambahkan dibawah `on` sejajar dengan `push` yakni `schedule` yang artinya menjadwalkan suatu pekerjaan. Jadwalnya menggunakan apa, paling gampang dan terkenal sih memanfaatkan cron string. Ini semacam text yang bisa kita gunakan untuk menentukan sebuah penjadwalan. Saya biasa menggunakan web [crontab.guru](https://crontab.guru/) kalau memang masih ragu dengan text yang sudah saya buat.

## Menambahkan tugas pada Github Actions

Menambahkan tugas atau job yang akan dijalankan pada saat trigger terpenuhi merupakan bagian utama yang biasanya sih susah-susah gampang. Pertama kita menambahkan kata kunci `jobs` yang menandakan dimulainya sebuah blok untuk tugas yang akan dijalankan. Dibawahnya kita kita bisa memberi nama pada job kita, saya memberikan nama `auto_commit`. Dalam satu workflow dan sekali trigger, kita bisa saja menambahkan lebih dari satu job. langkah berikutnya kita bisa mendefiniskan langkah-langkah secara berurutan yang harus dikerjakan dari job yang ingin kita buat. Berikut contoh kode sederhana untuk membuat job pada Github Actions:

```yaml
name: Auto commit
on:
  push:
    branches:
      - master
  schedule:
    - cron: '0 7 * * *'
jobs:
  auto_commit:
    runs-on: ubuntu-latest
    steps:
      - name: Test the jobs
        run: |
          echo "just another test"
```

Saya menambahkan satu langkan untuk pengujian saja, cuma mendefinisikan bahwa tugas ini akan dijalankan di sistem operasi _ubuntu_ teranyar dan memberikan satu langkah yang isinya hanya mencetak kata "just another test".

Sampai disini kalian sudah bisa melakukan commit dan push ke branch `master` kalian untuk dilakukan pengecekan apakah workflow yang kita buat sudah dieksekusi dengan benar sesuai keinginan kita apa belum. Untuk mengeceknya, setelah kode kita push, kita bisas mengunjungi tab `Actions` pada repository kita (contoh: https://github.com/mazipan/auto-commit/actions) dan kita bisa melihat daftar workflow yang telah atau sedang dijalankan.

## Checkout git repository

Langkah pertama yang harus saya lakukan ketika memiliki tujuan untuk membuat commit otomatis adalah bisa _checkout_ kode dari git repository yang sedang kita kerjakan saat ini. Salah satu hal keren dari Github Actions adalah modelnya yang bisa cabut pasang dari berbagai Actions yang sudah dipublikasikan, baik yang resmi dari Github maupun dari perorangan. Layaknya di JavaScript yang memanfaatkan banyaknya pustaka yang telah dipublikasikan untuk memudahkan tugas kita. Untuk melakukan _checkout_ sendiri, sudah ada Actions resmi dari Github dan kita cukup menggunakannya saja. Berikut contoh kodenya:

```yaml
name: Auto commit
on:
  push:
    branches:
      - master
  schedule:
    - cron: '0 7,8,9,10,11 * * *'
jobs:
  auto_commit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
        with:
          persist-credentials: false
          fetch-depth: 0
```

Cukup menambahkan `uses` dan gunakan nama dari Actions yang telah dipublikasikan. Actions yang kita gunakan berasal dari [https://github.com/actions/checkout](https://github.com/actions/checkout). Di bawahnya ada `with`, ini merupakan parameter yang ingin kita oper bersamaan pada saat memanggil Actions checkout tersebut. Dua parameter `persist-credentials` dan `fetch-depth` dibutuhkan untuk memastikan proses commit balik sukses dikarenakan ada issue terkait ini pada Actions yang akan kita gunakan nanti. Kita akan jelaskan pada bagian selanjutnya.

## Memastikan ada changes setiap saat

Agar bisa dilakukan commit dan push balik ke repository yang kita sedang gunakan, kita mesti memastikan bahwa ada perubahan (_changes_) yang terjadi pada salah satu atau beberapa berkas kita. Untuk menyiasati hal ini, saya membuat satu berkas yang nantinya akan saya perbarui setiap kali workflow ini dijalankan. Saya membuat berkas `LAST_UPDATED` yang tidak perlu diisi apapun pada saat ini. Kembali pada workflow kita,saya menambahkan kode sederhana untuk memanipulasi isi dari berkas yang telah kita buat ke dalam salah satu langkah dalam workflow kita. Berikut kodenya:

```yaml
name: Auto commit
on:
  push:
    branches:
      - master
  schedule:
    - cron: '0 7,8,9,10,11 * * *'
jobs:
  auto_commit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
        with:
          persist-credentials: false
          fetch-depth: 0
      - name: Modify LAST_UPDATED file
        run: |
          d=`date '+%Y-%m-%dT%H:%M:%SZ'`
          echo $d > LAST_UPDATED
```

Bisa dilihat bahwa saya cuma mengisi berkas `LAST_UPDATED` dengan tanggal saat menjalankan workflow tersebut. 🙈

## Melakukan commit dan push balik

Kalau di lokal, kita biasa setelah membuat perubahan kita bisa menggunakan perintah `git commit -m "sebuah pesan"` kemudian `git push origin master` untuk menyelesaikan prosesnya. Di workflow ini pada dasarnya sama, hanya saja kita akan memanfaatkan Actions dari [ad-m/github-push-action](https://github.com/ad-m/github-push-action) untuk melakukan push balik ke repository kita.

Pertama, kita akan melakukan commit dengan kode berikut:

```yaml
name: Auto commit
on:
  push:
    branches:
      - master
  schedule:
    - cron: '0 7,8,9,10,11 * * *'
jobs:
  auto_commit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
        with:
          persist-credentials: false
          fetch-depth: 0
      - name: Modify LAST_UPDATED file
        run: |
          d=`date '+%Y-%m-%dT%H:%M:%SZ'`
          echo $d > LAST_UPDATED
      - name: Commit changes
        run: |
          git config --local user.email "{YOUR_EMAIL}"
          git config --local user.name "{YOUR_USERNAME}"
          git add -A
          git commit -m "Sebuah pesan"
```

Kode diatas melakukan commit dengan sebelumnya kita set dengan email dan nama yang kita inginkan. Berikutnya menambahkan langkah baru untuk melakukan commit balik ke repository kita, berikut ini contoh kodenya:

```yaml
name: Auto commit
on:
  push:
    branches:
      - master
  schedule:
    - cron: '0 7,8,9,10,11 * * *'
jobs:
  auto_commit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
        with:
          persist-credentials: false
          fetch-depth: 0
      - name: Modify LAST_UPDATED file
        run: |
          d=`date '+%Y-%m-%dT%H:%M:%SZ'`
          echo $d > LAST_UPDATED
      - name: Commit changes
        run: |
          git config --local user.email "{YOUR_EMAIL}"
          git config --local user.name "{YOUR_USERNAME}"
          git add -A
          git commit -m "Sebuah pesan"
      - name: Push Back
        uses: ad-m/github-push-action@v0.5.0
        with:
          force: true
          directory: '.'
          github_token: ${{ secrets.GITHUB_TOKEN }}
```

Kita menggunakan Actions `ad-m/github-push-action@v0.5.0` dengan menambahkan parameter `force` untuk melakukan _force push_, `directory` dengan nilai titik yang artinya semua perubahan dari semua direktori akan di push balik, dan `github_token` dengan memanfaatkan token standar yang sudah ditanamkan oleh Github Actions sehingga kita tidak perlu menambahkan personal akses token kita secara manual.

Terkait dengan langkah _checkout_ pada bagian sebelumnya yang diharuskan menambahkan parameter tambahan bersangkutan dengan issue [#44](https://github.com/ad-m/github-push-action/issues/44#issuecomment-590010727) yang pada repo `ad-m/github-push-action` yang telah dijawab oleh pembuatnya sendiri.

## Bagaimana dengan hasilnya?

![Pesan commit otomatis](/thumbnail/membuat-commit-otomatis-ke-github/commit-message.png)

![Github Statistik](/thumbnail/membuat-commit-otomatis-ke-github/github-stats.png)

Ya, kalian pada dasarnya bisa mengubah konfigurasi sendiri mau berapa kali dalam sehari commit otomatis ini dijalankan. Pada kasus saya, cukup 5 kali lah. Gak hijau-hijau amat, tapi lumayan lah tidak kering kerontang 🌳

## Sumber repository

Semua tulisan ini, didasarkan pada repository yang bisa kalian lihat pada tautan berikut:

[https://github.com/mazipan/auto-commit/](https://github.com/mazipan/auto-commit/)

#### Terima kasih dan semoga tidak disalahgunakan 🙏
