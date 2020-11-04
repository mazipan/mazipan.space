---
title: Best practice dalam memuat halaman website
date: '2018-06-09'
excerpt: Berbagai best practice yang bisa kita pelajari dan optimalkan dalam memuat halaman website
author: mazipan
published: true
featured: false
tags: [web-perf]
coverImage: /thumbnail/best-practice-loading-a-web/devtools.png
lang: id
enready: false
---

Berbagai best practice yang bisa kita pelajari dan optimalkan dalam memuat halaman website

Pernahkah kita merasa frustasi dengan bagaimana browser memuat website yang sudah kita buat dengan susah payah? Pernahkah kita merasa sudah melakukan berbagai optimasi di website kita namun hasilnya tetap saja tidak memuaskan? Nah, untuk mengetahui apakah hal yang sudah kita lakukan berada pada jalan yang benar maka pada tulisan ini kita akan sama-sama belajar memahami bagaimana browser memuat sebuah halaman website serta berbagai hal yang bisa kita optimasi dari website kita untuk memperbaiki performa rendering website kita di browser.

Ada banyak hal tentunya dan juga ada banyak pendapat mengenai apa saja hal yang sebaiknya dan harus kita lakukan untuk memperbaiki performa website kita saat dimuat oleh browser. Kita akan coba pecahkan kedalam beberapa bagian agar lebih mudah bagi kita bersama memahami poin per poinnya.

> Disclaimer: beberapa hal pada tulisan ini didasarkan pada pengalaman yang dialami oleh penulis dan dibumbui berbagai pendapat pribadi. Silahkan dikoreksi kalau memang ada hal yang salah atau kurang tepat dan silahkan diikuti bila memang benar dan berguna bagi kalian.

## 🌏 Browser

Sebelum melakukan berbagai hal optimasi, kita perlu terlebih dahulu memahami bagaimana dasar-dasar browser bekerja agar nantinya lebih mudah bagi kita untuk mengaitkan pekerjaan yang akan dan telah kita lakukan.

Browser sendiri adalah alat yang digunakan pengguna untuk melihat website kita. Bila browser adalah milik pengguna, artinya kita sebagai penyedia website akan mengirimkan berbagai file dan assets kepada pengguna melalui network mereka. Dari sini kita mengetahui bahwa pengguna satu dan pengguna lain kemungkinan akan memiliki pengalaman yang berbeda dalam memuat website kita. Kesemuanya tergantung dari kondisi pengguna itu sendiri, mulai dari kondisi network pengguna, device yang digunakan oleh pengguna, sampai browser vendor dan versi yang digunakan oleh pengguna. Berbagai hal tersebut akan secara langsung mempengaruhi pengalaman pengguna dalam memuat website kita.

Selebihnya peran kita adalah memastikan bahwa semua file yang dibutuhkan oleh pengguna yang ingin melihat website kita dalam kondisi tersedia. Jadi kita harus bisa memastikan bahwa baik dalam keadaan low traffic ataupun high traffic pengguna kita tetap bisa mendapatkan file yang dibutuhkan. Karena bila kita sudah tidak bisa menyediakan, maka sebaik apapun kondisi pengguna tersebut tetap saja tidak akan bisa memuat halaman kita.

## 📄 HTML

HTML merupakan bagian utama dari sebuah website. Saya sering menyebut kalau HTML ini ibarat kerangka di tubuh manusia, sesuatu yang membangun tubuh itu sendiri. HTML merupakan representasi struktur dari website yang kita buat. Semakin rumit dan kompleks website yang kita buat akan berimbas langsung pada struktur HTML dan berakibat pada ukuran file yang harus kita kirimkan ke pengguna.

Beberapa hal yang bisa kita optimalkan terhadap HTML antara lain:

### 1. Compress dan optimize

Ketika membuat HTML tentu kita akan membuat kode kita agar mudah dibaca oleh developer lain dan kita akan menambahkan banyak white space agar kode kita lebih rapi. White space ini tidak dibutuhkan ketika kita mengirimkan HTML ke browser, membuang hal yang tidak perlu artinya kita dalam proses memperkecil file yang dihasilkan.

Meskipun tidak semua penghilangan bagian yang tidak dibutuhkan itu selalu terlihat efeknya secara masif terhadap ukuran file, namun prakteknya merupakan hal yang baik untuk dilakukan. Seperti halnya saya yang selalu membenci bila ada developer yang meng-comment code dibandingkan menghapusnya ketika sudah tidak digunakan.

2. Memangkas waktu pembuatan

Bila kita masih menggunakan SSR dimana kode HTML kita harus dibuat di server dengan data yang dinamis pada saat itu juga, maka kita harus memastikan waktu untuk membuat HTML tersebut bisa dipangkas sebisa mungkin. Gunakan cache baik pada data dinamis yang dibutuhkan ataupun pada HTML yang dihasilkan bila memang diperlukan.

3. Utamakan konten above the fold

Pengguna tidak akan melihat keseluruhan halaman website kita pada saat pertama kali halaman tersebut dimuat, melainkan hanya bagian teratas sebatas tinggi layar. Karena itu kita wajib memprioritaskan konten-konten yang berada pada wilayah tangkapan ini, sedangkan konten yang berada dibawahnya bisa dimuat belakangan termasuk juga dengan konten yang membutuhkan aksi dari pengguna untuk ditampilkan seperti komponen popup modal sehingga tidak dibutuhkan pada awal muat.

![HTML Optimize](/thumbnail/best-practice-loading-a-web/html-opt.png)

## 💅 CSS

CSS merupakan bagian yang tidak terpisahkan dari sebuah website. CSS sendiri bisa dimuat paling tidak dengan 3 cara yakni inline style, internal style, dan external style. Masing-masing cara yang kita gunakan memiliki kelebihan dan kekurangannya sendiri, penggunaannya tergantung pada kebutuhan kita.

**Inline style** tidak akan menambah jumlah roundtrip network kita namun susah untuk digunakan ulang dan akan menambah ukuran HTML kita.

**Internal style** bisa digunakan ulang selama berada di halaman tersebut dan tidak akan menambah jumlah request namun juga akan menambah ukuran HTML kita.

**External style** bisa digunakan ulang dengan mudah dan tidak akan menambah ukuran HTML yang kita kirim namun akan menambah jumlah request di network kita.

Paling tidak berikut adalah beberapa cara yang bisa kita lakukan terhadap CSS kita:)

### 1. Minify dan merge

Seperti HTML, CSS pun akan membawa banyak white space yang tidak diperlukan di lingkungan production yang bisa kita hilangkan. Pengoptimalan CSS juga bisa dilakukan dengan menyatukan berbagai class atau selector lain di CSS yang memiliki rule yang sama. Penggunaan berbagai shorthand juga diperlukan untuk memberikan hasil file yang lebih ramping.

Artikel berikut akan membantu kalian agar lebih bijak dalam menulis CSS dan bisa menghasilkan file yang lebih bersahabat dengan browser:

- [7 Principles Of Clean And Optimized CSS](https://www.smashingmagazine.com/2008/08/7-principles-of-clean-and-optimized-css-code/?source=post_page-----20def6652adf----------------------)

### 2. Kurangi jumlah file

Satu prinsip yang harus diketahui adalah bahwa semakin banyak kita memuat file maka semakin banyak waktu yang dibutuhkan untuk memuat website kita. Jadi bila kita bisa menyatukan file yang akan kita muat (selama memiliki ukuran yang masuk akal) maka menyatukannya adalah hal yang sebaiknya dilakukan.

### 3. Kurangi unused style

Faktanya sebagian besar website memuat file CSS dengan isi yang sebenarnya hanya digunakan sebagian kecil dari keseluruhan isi yang ada. Menghilangkan style di CSS yang tidak digunakan oleh suatu halaman website akan sangat membantu kita dalam mengurangi ukuran file CSS yang akan kita kirimkan ke browser pengguna.

Sedikit trik tambahan, kita bisa melihat coverage dari unused CSS dari suatu halaman website melalui menu coverage yang terdapat pada console drawer di ChromeDevTools.

![Coverage](/thumbnail/best-practice-loading-a-web/coverage.png)

Jika kalian menggunakan framework modern mungkin bisa menggunakan bantuan semacam **[PurgeCSS](https://www.purgecss.com/)** untuk membuang CSS yang tidak diperlukan.

### 4. Utamakan critical CSS

Critical CSS adalah sekumpulan style CSS yang keberadaannya dirasa sangat penting bagi pengguna pada masa-masa awal halaman tersebut dimuat sehingga sangat tidak disarankan untuk menunda dalam pemuatan style semacam ini. Perlu diketahui bahwa critical CSS harus sekecil mungkin dan menghasilkan tampilan yang minimal tidak menggangu bagi pengguna dan memenuhi berbagai tampilan minimal yang harus pengguna lihat pertama kali.

Beberapa pengembang web memutuskan untuk meletakan critical CSS ini ke dalam internal style di dalam HTML dan di dalam tag head meraka.
Artikel berikut ini membantu kita memahami apa itu critical CSS dan bagaimana cara mengindentifikasi style mana yang critical:

- [Understanding Critical CSS](https://www.smashingmagazine.com/2015/08/understanding-critical-css/?source=post_page-----20def6652adf----------------------)

Ada tools menarik yang bisa malakukan otomatisasi soal kritikal CSS ini dari Addy:

- [Critical](https://github.com/addyosmani/critical?source=post_page-----20def6652adf----------------------)

## ⚙️ JavaScript

JS merupakan penggerak dari berbagai website jaman sekarang, perannya kini kian vital seiring berkembangnya kemampuan dari bahasanya sendiri. Sayangnya JS masih menjadi momok sendiri bagi browser, selain karena biasanya memiliki ukuran file yang mendominasi bagian dari website kita, juga karena dibutuhkan proses parsing maupun compile agar bisa dipahami oleh browser itu sendiri. Proses parsing ini sendiri bisa berbeda-beda setiap device dan browsernya, seperti terlihat pada gambar berikut:

![JS Costs](/thumbnail/best-practice-loading-a-web/js-costs.png)

_Image source: https://medium.com/dev-channel/the-cost-of-javascript-84009f51e99e_

Untuk memahami lebih lanjut mengenai proses bagaimana JS dimuat dalam suatu browser, silahkan baca artikel dari Addy Osmani pada tautan berikut:

- [The Cost Of JavaScript](https://medium.com/dev-channel/the-cost-of-javascript-84009f51e99e)
- [The Cost Of JavaScript 2018](https://medium.com/@addyosmani/the-cost-of-javascript-in-2018-7d8950fbb5d4)

Beberapa hal yang bisa lakukan dengan JS diantaranya:

### 1. Kurangi ukuran file

> Semakin sedikit kode maka semakin sedikit yang harus di compile/parse, semakin sedikit yang harus di transfer lewat network, dan semakin sedikit juga yang harus di decompress. (diterjemahkan dari @junwatu dari https://medium.com/dev-channel/the-cost-of-javascript-84009f51e99e)

Dengan kemampuan JS yang sekarang bisa modular dan bisa menambahkan berbagai dependencies ke dalam projek kita dengan lebih mudah seringkali justru di-abuse oleh banyak pengembang web. Mereka tidak merasa ikut bertanggung jawab ketika hasil akhir dari file JavaScript yang harus dimuat menjadi terlalu besar. Setiap keputusan dalam menambahkan kode atau bahkan pustaka luar buatan orang lain akan secara langsung berakibat pada ukuran file kita, menjadi lebih bijak sebagai pengembang web adalah cara terbaik untuk mengurangi hal seperti ini terulang kembali. Selain kita juga bisa memasang berbagai gate termasuk ukuran file pada saat melakukan build pada projek kita.

### 2. Lazy load chunk

Untuk beberapa website yang memilih menggunakan Single Page Application, memisahkan script berdasarkan halaman yang dikunjungi adalah hal yang mutlak harus dilakukan karena ini bisa mengurangi jumlah kode yang tidak digunakan pada halaman tersebut.

- [Lazy-loading components in React 16.6](https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52/?source=post_page-----20def6652adf----------------------)
- [Lazy Loading Routes for Vue Router](https://router.vuejs.org/guide/advanced/lazy-loading.html?source=post_page-----20def6652adf----------------------)

### 3. Uglify dan optimize

Pastikan kita melakukan uglify dan juga optimize pada kode kita dan membuang berbagai dead code yang mungkin ada pada kode kita. Untuk melakukan ini biasanya menggunakan tools yang sudah tersedia seperti [UglifyJS](https://github.com/mishoo/UglifyJS) atau yang terbaru [TerserJS](https://github.com/terser-js/terser).

### 4. Async dan Defer

Directive async pada script eksternal bisa membuat request suatu script dilakukan secara bersamaan dengan script yang lain. Hal ini bisa mengurangi waktu muat karena beberapa script dieksekusi atau diminta dalam waktu yang hampir sama. Sayangnya ketika menggunakan directive ini kita jadi tidak bisa mengetahui urutan kapan selesai satu script dieksekusi atau diminta.

Seringkali kita harus menambahkan berbagai third party script kedalam website kita seperti analytics, berbagai tracker, maupun remarkerting/retargeting script. Hal ini tentu saja akan memperlambat waktu muat website kita, dan salah satu trik yang bisa kita lakukan adalah men-defer script kita yang artinya menunda script ini di-request ataupun dieksekusi sampai halaman terkait selesai di parsing.

Berbeda dengan async yang tidak memperdulikan urutan, defer akan tetap dieksekusi berdasarkan urutan dari script yang kita tulis di kode.

- [Asynchronous vs Deferred JavaScript](https://bitsofco.de/async-vs-defer/?source=post_page-----20def6652adf----------------------)

## 🌇 IMAGE

### 1. Kompresi kualitas

Pastikan melakukan kompresi terhadap gambar-gambar yang akan dimuat di website kita, tidak perlu menggunakan kualitas yang sangat tajam karena akan menghasilkan ukuran gambar yang besar pula. Sudah banyak online tools gratis yang bisa kita gunakan untuk melakukan kompresi gambar seperti melalui website https://tinypng.com/ dan https://tinyjpg.com/. Kita juga bisa meletakan proses kompresi ini kedalam build proses kita seperti salah satunya menggunakan image-webpack-loader.

Beberapa referensi yang bisa dibaca:

- [image-webpack-loader](https://github.com/tcoopman/image-webpack-loader?source=post_page-----20def6652adf----------------------)
- [imagemin](https://github.com/imagemin/imagemin?source=post_page-----20def6652adf----------------------)

### 2. Kurangi jumlah request

Mengurangi jumlah file gambar yang harus dimuat adalah hal utama selain melakukan optimasi pada file gambar itu sendiri. Untuk melakukan hal ini kita bisa melakukan beberapa trik seperti berikut:

#### — Lazy load

Gambar yang tidak sedang dilihat oleh pengguna tidaklah boleh kita muat pada saat pertama kali memuat website kita, gambar tersebut hanya boleh dimuat ketika pengguna memang sedang atau akan melihat gambar tersebut.

Cara paling mainstream untuk menerapkan lazy load gambar adalah dengan mendeteksi scroll yang dilakukan oleh pengguna di website kita. Kabar baiknya lagi, belakangan kita malah dimudahkan untuk memuat gambar secara lazy dengan adanya IntersectionObserver.

- [Lazy Loading Images and Video](https://developers.google.com/web/fundamentals/performance/lazy-loading-guidance/images-and-video/?source=post_page-----20def6652adf----------------------)

#### — Inline SVG kecil

SVG merupakan gambar yang dibangun dari berbagai path yang saling dihubungkan. SVG memiliki keunggulan yang bisa diperbesar tanpa mengalami pecah pada pixelnya. SVG seringkali digunakan untuk berbagai icon dalam website. Untuk memuat file ini sendiri paling mudah adalah dengan membuat tag `<img src="path/file.svg"/>` namun cara ini tentu akan menambah jumlah request pada network kita karena akan dimuat layaknya gambar pada umumnya. Cara lain adalah dengan meyalin tag markup yang ada di dalam file SVG tersebut dan menempatkannya langsung didalam HTML kita atau biasa dikenal dengan inline SVG. Cara ini bisa mengurangi jumlah request yang harus dilakukan namun akan menambah ukuran dari HTML kita.

Selain itu kita bisa juga melakukan optimasi pada file SVG menggunakan SVGO yang telah dibuatkan juga versi websitenya di https://jakearchibald.github.io/svgomg/.

- [svgo](https://github.com/svg/svgo)

#### — Gunakan Sprite

Sprite digunakan untuk memuat banyak gambar dalam sekali request network sehingga tidak diperlukan banyak request berulang pada prosesnya.

- [CSS Sprites: What They Are, Why They’re Cool, and How To Use Them ](https://css-tricks.com/css-sprites/?source=post_page-----20def6652adf----------------------)

### 3. Utamakan ekstensi WebP

Utamakan untuk menggunakan tipe gambar yang lebih baik seperti webp karena memiliki ukuran yang lebih kecil tanpa menurunkan kualitas masif.

- [imagemin-webp](https://github.com/imagemin/imagemin-webp?source=post_page-----20def6652adf----------------------)

Artikel berikut bisa jadi panduan kita dalam menyajikan dan mengoptimalkan gambar bagi website kita:

- [Essential Image Optimization](https://images.guide/?source=post_page-----20def6652adf----------------------)

## 🎁 OTHERS

### 1. Kompresi

Pastikan semua file yang akan kita kirimkan ke browser dalam keadaan terkompresi dengan baik. Kompresi yang paling sering digunakan oleh pengembang adalah GZip yang bisa dengan mudah di set melalui webserver semacam Apache atau Nginx.

### 2. Preload, prefetch dan dns-prefetch

Preload bisa digunakan untuk mendahulukan berbagai resources yang kita yakini akan dipakai di halaman web tersebut seperti font, CSS maupun JavaScript dibandingkan resources yang lain. Hanya gunakan preload bila resources tersebut benar-benar digunakan karena cara ini akan memberikan perintah ke browser untuk menetapkan resources sebagai high priority dalam urutan request yang akan dilakukan.

Berikut contoh menggunakan preload untuk memuat file CSS:

```html
<link rel="preload" href="path/file.css" as="style" />
```

Prefecth hampir sama dengan preload hanya saja memiliki prioritas dibawah preload. Gunakan prefetch untuk memuat berbagai resource yang kita yakini akan digunakan pada navigasi berikutnya setelah halaman terkait.

Artikel berikut akan membantu kita memahami preload dan prefetch:

- [Preload, Prefetch And Priorities in Chrome](https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf?source=post_page-----20def6652adf----------------------)

Dns-prefetch akan menjalankan DNS lookup untuk domain eksternal yang akan kita gunakan pada halaman website tersebut. Dns-prefetch ini akan membawa bandwith yang sangat kecil namun latency yang cukup tinggi, karenanya hanya gunakan cara ini untuk domain eksternal yang memang benar-benar kita akan panggil pada halaman tersebut.

```html
<!-- Prefetch DNS for external assets -->
<link rel="dns-prefetch" href="//fonts.googleapis.com" />
```

- [X-DNS-Prefetch-Control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control?source=post_page-----20def6652adf----------------------)

### 3. Browser Cache

Browser pada dasarnya secara default telah melakukan cache pada semua resources yang dia telah request agar pada request berikutnya tidak perlu meminta resource yang sama kembali. Namun kita diharuskan untuk menyetel max-age atau E-tag di header setiap resource yang diminta agar browser bisa memahami kapan waktu yang tepat untuk meminta ulang resource tersebut. Hal ini sudah merupakan hal wajib yang harus dikerjakan oleh para pengembang web.

Bicara soal cache, hal yang paling menyulitkan adalah menentukan kapan waktu yang tepat untuk dilakukan evict terhadap cache tersebut. Pengembang web harus tau kapan waktu yang tepat untuk melakukan evict atau memaksa browser meminta resource terbaru. Cara yang sering diterapkan oleh para pengembang web adalah dengan memberikan signature/hash/finger print pada nama file dari resource yang diminta. Sehingga bila dilakukan deployment file terbaru maka signature/hash/finger print tersebut akan berubah dan kita tidak perlu memusingkan lagi untuk meng-evict cache sebelumnya.

### 4. HTTP/2

HTTP/2 merupakan generasi berikutnya dari HTTP/1 yang banyak digunakan oleh sebagian besar website. Bila di HTTP/1 kita susah untuk melakukan banyak round-trip request dalam waktu yang hampir bersamaan, di HTTP/2 ini kita bisa melakukan beberapa request dalam waktu yang hampir bersamaan sehingga latency bisa dikurangi.

Untuk memahami HTTP/2 silahkan baca artikel berikut ini:

- [Introduction to HTTP/2](https://developers.google.com/web/fundamentals/performance/http2/?source=post_page-----20def6652adf----------------------)

## 📺 Monitoring

Ada beberapa alat umu yang digunakan untuk melakukan monitoring mengenai kecepatan muat suatu website diantaranya sebagai berikut:

### 1. Chrome DevTools

Ini merupakan alat yang paling mudah kita gunakan karena langsung terpasang bersama dengan browser Chrome, bisa digunakan untuk test website bahkan saat sejak fase development.

- [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/?source=post_page-----20def6652adf----------------------)

### 2. Lighthouse

[Lighthouse](https://developers.google.com/web/tools/lighthouse/?source=post_page-----20def6652adf----------------------) merupakan alat untuk melakukan audit sebuah halaman web modern yang akan memberikan kita masukan hal-hal yang bisa kita perbaiki dari sebuah website. Kabar baiknya sekarang lighthouse juga sudah terpasang secara default pada Chrome DevTools.

Lighthouse juga tersedia dalam mode CI (continuous integration), sehingga kita bisa memasang sebagai gerbang penjaga pada sistem CI. Keuntungannya tentu ini bisa dijalankan secara otomatis bersamaan dengan pull request yang dibuat.

### 3. Pagespeed Insight

Alat ini lumayan menarik karena menampilkan data dari Chrome UX report yang merupakan laporan real world yang dikumpulkan Chrome tentang website kita. Selain itu ditambahkan pula berbagai laporan yang mengambil dari hasil test lighthouse.

- [Pagespeed Insight](https://developers.google.com/speed/pagespeed/insights/?source=post_page-----20def6652adf----------------------)

### 4. [Webpagetest](https://www.webpagetest.org/?source=post_page-----20def6652adf----------------------)

Webpagetest.org ini seperti kita punya Chrome DevTools yang terpusat sehingga laporang yang dihasilkan bagus untuk dibagikan kepada berbagai stakeholder.

### 5. [GTMetrix](https://gtmetrix.com/?source=post_page-----20def6652adf----------------------)

---

Dan terakhir, silahkan tonton video menarik Addy Osmani mengenai bahasan kita kali ini. Jangan lupa aktifkan subtitles kalau yang kurang baik pendengarannya kaya saya ini.

- [Modern Loading Best Practice by Addy Osmani in #ChromeDevSummit2017](https://www.youtube.com/watch?v=_srJ7eHS3IM)

📚 Referensi Artikel

- https://developers.google.com/web/tools/chrome-devtools/network-performance/reference
- https://www.smashingmagazine.com/2008/08/7-principles-of-clean-and-optimized-css-code/
  https://www.smashingmagazine.com/2015/08/understanding-critical-css/
- https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery
- https://medium.com/dev-channel/the-cost-of-javascript-84009f51e99e
- https://bitsofco.de/async-vs-defer/
- https://images.guide/
- https://developers.google.com/speed/docs/insights/EnableCompression
- https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf
- https://responsivedesign.is/articles/prefetch-preconnect-dns-priority/
- https://developers.google.com/web/fundamentals/performance/http2/
