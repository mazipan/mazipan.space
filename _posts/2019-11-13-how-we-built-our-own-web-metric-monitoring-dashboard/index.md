---
title: Bagaimana kami membangun dashboard pemantau metrik web
date: '2019-11-13'
excerpt: Cerita kami di Tokopedia dalam membangun dashboard pemantau metrik web dalam rangka membudayakan kepedulian mengenai performa web
author: mazipan
published: true
featured: false
tags: [lesson-learned, web-perf]
coverImage: /thumbnail/how-we-built-our-own-web-metric-monitoring-dashboard/luke-chesser-JKUTrJ4vK00-unsplash.jpg
imageCaption: Image by Luke Chesser on Unsplash
lang: id
enready: true
---

## Sangkalan

Semua hal yang saya tulis adalah pendapat saya pribadi berdasarkan pengalaman dan tidak mewakili pendapat Tokopedia.
Hal yang ditulis valid pada saat artikel diterbitkan dan sangat mungkin menjadi tidak relevan lagi pada waktu kalian membacanya.

## Mengenai alat pantau web metrik

_Monitoring_ atau pemantauan adalah tugas yang seharusnya perlu kalian pikirkan sebelum memutuskan mengadopsi teknologi apapun.
Khususnya ketika kita merencanakan untuk menggunakannya pada lingkungan produksi.
Hal ini dikarenakan proses pemantauan dengan alat apapun diharapkan bisa memberikan penglihatan terhadap kondisi terkini dari produk maupun teknologi yang kita gunakan di produksi.
Menggunakan alat pantau yang tepat, kita bisa mendapatkan wawasan terhadap kondisi terkini dan mampu membuat rencana untuk berbagai perbaikan maupun peningkatan terhadap produk kita berdasarkan data yang didapat dari alat pantau tersebut.

Dalam kaitannya dengan teknologi web, ada beberapa metrik yang bisa kita pantau hari demi hari sepanjang beroperasi.
Lebih khusus lagi terkait dengan pengembangan antarmuka web, ada beberapa metrik utama yang seharusnya kita pantau karena telah dibuktikan bahwa metrik tersebut mampu memberikan dampak dan impresi dari pengguna akhir.

Untuk para pemegang jabatan yang lebih tinggi di suatu perusahaan, mereka membutuhkan untuk melihat gambaran besar dari metrik-metrik tersebut akan atau telah mempengaruhi bisnis yang berjalan.
Salah satu diantaranya yang perlu kalian tunjukkan adalah kecepatan waktu muat dari website yang kalian bangun.
Sebagai pengembang web, kita diharuskan punya kepedulian lebih terhadap metrik lainnya yang secara langsung maupun tidak langsung akan meningkatkan atau menurunkan waktu muat dari web kita.
Itu mengapa kita perlu mengumpulkan lebih banyak data lain, selain dari waktu muat secara umum tadi.

## Alat pantau umum

Di industri, ada beberapa alternatif umum yang biasa digunakan oleh para pengembang untuk memantau kondisi dari metrik-metrik web mereka, diantaranya [Pagespeed Insight](https://developers.google.com/speed/pagespeed/insights/), [Web.dev/measure](https://web.dev/measure/), [Webpagetest.org](https://www.webpagetest.org/), dan lainnya. Beerikut akan kita bahas beberapa diantaranya serta kecocokannya dengan projek yang sedang kami rencakanan untuk dibuat:

### Pagespeed Insight

![Laporan Pagespeed Insight](/thumbnail/how-we-built-our-own-web-metric-monitoring-dashboard/pagespeed-result.png)

Ketika saya bilang, kalian harus memantau metrik web tersebut hari demi hari, sehingga kalian bisa mengetahui dampak dari kode yang kalian kirim ke produksi terhadap berbagai metrik yang terlah disiapkan, deployment mana yang menyebabkan penurunan pada metrik, atau apakah inisiatif yang kalian kerjakan memang bisa meningkatkan skor performa kalian.
Dalam skenario ini, kita tidak bisa menggunakan Pagespeed Insight sebab tidak bisa merekam hasil pengetesan hari demi hari.
Kecuali kalian melakukan manual screenshot atau scrapping terhadap laporan yang dihasilkan.
Itu semua bukan karena Pagespeed Insight jelek, hanya saja tidak sesuai dengan apa yang kita butuhkan.
Tentu saja kalian bisa mendapatkan Data Lapangan ketika menggunakan Pagespeed Insight, ini adalah salah satu kelebihan dari menggunakan Pagespeed Insight.
Data seperti itu mungkin tidak akan pernah bisa kalian dapatkan dari alat pantau lainnya.
Data ini didapatkan dari pengalaman pengguna nyata yang dikumpulkan oleh peramban Chrome.
Kalian bisa tau seberapa lama website kalian dimuat oleh pengguna peramban Chrome dalam persetil 75.
Apakah masuk ke kategori cepat, sedang atau tergolong lambat.

Tonton video mengenai [Menggunakan laporan Chrome UX untuk mengevaluasi pengguna nyata](https://www.youtube.com/watch?v=UvK9zAsSM8Q) dari Google I/O 2018

### Web.dev

![Web.dev report](/thumbnail/how-we-built-our-own-web-metric-monitoring-dashboard/webdev-result.png)

Berpindah ke **[web.dev/measure](https://web.dev/measure/)**, pada dasarnya menjalankan Lighthouse dibelakangnya.
Ya, Lighthouse adalah satau alat paling populer yabg dikembangkan oleh tim Chrome untuk melakukan pengujian terhadap web dan mendapatkan laporan yang cukup komprehensif dari umu sampai ke bagian detail.
Itu juga mampu memberikan rekomendasi yang jelas mengenai bagaimana menyelesaikan isu yang ditemukan oleh Lighthouse pada saat pengujian sehingga bisa menjadi poin untuk peningkatan berikutnya.

**Web.dev/measure** (pada saat artikel ini dibuat), bisa merekam dan menyimpan hasil dari test terakhir pada suatu alamat web.
Dengan begitu kita bisa melihat tren dan perbandingan dengan laporan sebelumnya.
Kita bisa menyimpan laporan dengan cara masuk ke akun Google di halaman web.dev sehingga data bisa disimpan berdasarkan akun kita masing-masing.
Sayangnya cara ini memang cukup manual, dan saya masih tidak terpikir cara otomasi yang mudah.

Dan ya, saya masih terlalu malas untuk membuka halaman web web.dev setiap hari dan melakukan test untuk merekam metrik dari web saya secara berkala.
Serta bagaimana kalau kita membutuhkan untuk menganalisa datanya, bukan hanya report umum yang sudah disediakan.

### Webpagetest

![Webpagetest.org](/thumbnail/how-we-built-our-own-web-metric-monitoring-dashboard/wpt.png)

Alat terakhir yang umum digunakan adalah Webpagetest.org, salah satu situs yang sangat dasyat untuk digunakan dalam memantau web metrik.
Sudah mendukung Lighthouse juga ketika dibutuhkan.
Webpagetest dapat digunakan dengan mudah tanpa perlu login dan kalian bisa mendapatkan laporan yang lebih kaya dan komplit dibandingkan dengan yang kalian dapat di Pagespeed Insight maupun Web.dev.
Tapi ya, lagi-lagi ini dikerjakan secara manual, dan kami tidak menginginkannya.

Kabar baiknya, Webpagetest juga menyediakan API yang bisa kalian manfaatkan untuk mendapatkan hasil yang sama dengan apa yang kalian lihat bila menjalankan secara manual lewat tampilan antarmuka.
Kalian perlu mendaftar terlebih dahulu untuk mendapatkan Kunci API, kalian bisa mengunjungi [halaman permintaan kunci API](https://www.webpagetest.org/getkey.php).

Ada beberapa batasan ketika ingin menggunakan API dari Webpagetest, kita hanya diperbolehkan untuk menggunakannya 200 kali setiap hari.
Dalam satu kali test, sebaiknya kita menjalankan sampai 10 kali untuk mendapat hasil yang lebih konsisten, sehingga jatah 200 kali sehari jelas tidak cukup baik buat kasus kami.

Tapi jujur saja, kami pernah menggunakannya juga.

Membuat alat monitor sendiri yang akan memanfaatkan Webpagetest API setiap hari melalui Cronjob yang dijalankan setiap malam.
Masalah utama yang kita temui pada versi sebelumnya ya karena keterbatasan jumlah test yang sangat sedikit setiap hari membuat kita tidak bisa menambahkan halaman baru untuk di test.
Itu mengapa kita juga mulai mencari alternatif solusi lain selain daripada menggunakan API dari Webpagetest.

## Lighthouse

Lighthouse mendapatkan popularitasnya bersamaan dengan adopsi Progressive Web Apps (PWA) yang menjadi topik panas bagi pengembangan website modern saat ini.
Pengembang membutuhkan alat untuk mengukur seberapa baik implementasi PWA mereka, apakah semua trik yang disarankah sudah terpasang dengan baik atau belum.

Fenomena dan kepopuleran Lighthouse ini yang semakin mengarahkkan kami untuk melihat ini sebagai salah satu kandidat terbaik bagi pembuatan dashboard pemantau web metrik kami di versi selanjutnya.

![Lighthouse Logo](/thumbnail/how-we-built-our-own-web-metric-monitoring-dashboard/lighthouse.png)

Lighthouse sendiri tersedia dalam berbagai alternatif untuk bisa digunakan, secara bawaan Lighthouse sudah tertanam di Chrome Dev Tools pada tab "Lighthouse".

Lighthouse juga tersedia dalam bentuk pustaka dan CLI yang bisa kita gunakan secara lebih luwes sesuai kebutuhan. Untuk yang versi pustakanya sendiri bisa juga dikombinasikan dengan Puppeteer untuk meluncurkan Chrome browser secara terprogram.

Versi CLI dan pustaka bisa menghasilkan dua macam output yakni JSON dan HTML.
Baik CLI maupun pustaka sangat fleksibel untuk kita gunakan, kita bisa menambahkan custom header, Cookie tambahan, custom Network Throttle, bahakan kita bisa meminta untuk melakukan blocking terhadap suatu sumber daya dengan pola tertentu.

Baca [beberapa opsi yang tersedia untuk Lighthouse-CLI](https://github.com/GoogleChrome/lighthouse#cli-options).

Tanpa opsi yang kompleks, LH-CLI bisa dijalankan dengan cara memberikan perintah:

```bash
# Change with your URL
$ npx lighthouse https://m.tokopedia.com/ --output json --chrome-flags="--headless"
```

Kalau kalian lebih memilih menggunakan script di Node.js, klain bisa menggunakan dengan cara:

```javascript
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

function launchChromeAndRunLighthouse(url, opts, config = null) {
  return chromeLauncher.launch({ chromeFlags: opts.chromeFlags }).then((chrome) => {
    opts.port = chrome.port;
    return lighthouse(url, opts, config).then((results) => {
      // use results.lhr for the JS-consumeable output
      // https://github.com/GoogleChrome/lighthouse/blob/master/types/lhr.d.ts
      // use results.report for the HTML/JSON/CSV output as a string
      // use results.artifacts for the trace/screenshots/other specific case you need (rarer)
      return chrome.kill().then(() => results.lhr);
    });
  });
}

const opts = {
  chromeFlags: ['--show-paint-rects'],
};

// Usage:
launchChromeAndRunLighthouse('https://example.com', opts).then((results) => {
  // Use results!
});
```

Kalian perlu menambahkan dependensi yang dibutuhkan terlebih dahulu, seperti `chrome-launcher` dan `lighthouse` dengan cara:

```bash
$ yarn add --dev lighthouse chrome-launcher
```

Baca artikel [cara menggunakan Lighthouse dengan terprogram](https://github.com/GoogleChrome/lighthouse/blob/master/docs/readme.md#using-programmatically) untuk memulainya.

Lighthouse secara bawaan akan menggunakan Throttle **Fast3G**, untuk sebagian kasus kita tidak perlu mengutak-atiknya lagi, di kasus yang unik kita mungkin perlu paham terkait ini. Baca lebih lanjut mengenai [throttle di Lighthouse](https://github.com/GoogleChrome/lighthouse/blob/master/docs/throttling.md) untuk lebih memahami bagaimana Throttle di lighthouse.

Salah satu masalah yang timbul adalah, JSON yang dihasilkan oleh Lighthouse cukup besar untuk disimpan semuanya ke dalam ruang penyimpanan, baik disk maupun penyimpanan lain. Apalagi dengan kenyataan bahwa tidak akan keseluruhan laporan yang tersedia tersebut akan kalian gunakan. kalian harus memilah-milah data mana yang kalian dan pemegang kebijakan lain butuhkan dan bisa membuang sisanya yang dirsasa tidak terlalau relevan bagi kalian.

Tapi bisa kalian menghilangkan sebagian data yang ada, laporan kalian bisa jadi menjadi tidak vbalid ketika hendak ditampilkan menggunakan alat yang tersedia di pasaran, misalnya saja alat [lighthouse previewer](https://googlechrome.github.io/lighthouse/viewer/).


[Contoh dari laporan yang dihasilkan Lighthouse dalam bentuk JSON](https://gist.github.com/paulirish/a207a43c8164a7ab728481b496aa8a27#file-localhost_2018-03-12_17-55-45-lighthouse-report-json).

Berikut adalah beberapa data yang mungkin saja penting untuk kalian simpan:

```javascript

{
  fetchTime: 'time when the report generated',
  finalUrl: 'tested URL by lighthouse',
  audits: {
    'first-contentful-paint': {},
    'first-meaningful-paint': {},
    'speed-index': {},
    'estimated-input-latency': {},
    'time-to-first-byte': {},
    'first-cpu-idle': {},
    'interactive': {},
    'network-requests': {},
    // ...other
  },
  categories: {
    'performance': {},
    'accessibility': {},
    'best-practices': {},
    'seo': {},
    'pwa': {},
  }
}
```

Setelah mencoba beberapa kali Lighthouse secara terprogram, kalian mungkin akan mulai menyadari bahwa hasil yang didaptkan seringkali bervariasi setiap kali kita jalankan bahkan bila menggunakan konfigurasi yang sama dan mesin yang sama.
Itu mengapa disarankan untuk menjalankan lebih dari seklai untuk mendapatkan hasil yang lebih konsisten.

Kalin bisa membaca dokumen publik mengenai [Keberagaman dan Akurasi dari Lighthouse Metrik](https://docs.google.com/document/d/1BqtL-nG53rxWOI5RO0pItSRPowZVnYJ_gBEQCJ5EeUE/edit#heading=h.bdv52es24upi).

## Teknologi yang digunakan

kami membuat dashboard ini di atas Docker Container.
Pengembangan website dengan Docker memiliki pengalaman yang cukup baik bagi pengembang itu sendiri apalagi bagi aplikasi yang memang membutuhkan prasyarat yang cukup banyak untuk bisa dijalankan.\
Dengan Docker kita tidak perlu lagi memberitahu si pengembang untuk memasang program A sampai Z untuk bisa menjalankan projeknya.
Kemudahan memindahkan projek ke level produksi juga jadi alasan kami memilih membangun di atas Docker.

Web kami sebenanya sesimpel aplikasi cliet-server saja, menggunakan MongoDB sebagai penyimpanan.
Aplikasi servernya dibuat  diatas [Express.js](https://expressjs.com/) dan [Apollo GraphQL](https://www.apollographql.com/) sebagai pintu bagi komukasi dengan aplikasi Client. Kami memilih menggunakan sebagian besar komunikasi dengan GraphQL dijalankan di atas Web Socket dibandingkan HTTP Request secara langsung, hal ini cukup mudah dicapai dengan Apollo.

Kami menggunakan [Mongoose.js](https://mongoosejs.com/) sebagai Object Document Modelling (ODM) untuk jembatan dalam mengakses MongoDB kami sehingga mendapatkan intereface yang lebih mudah.

Untuk aplikasi Client, kami menggunakan [React](https://reactjs.org/) dan [Material UI](https://material-ui.com/) sebagai tulang punggung bagi pengembangan segala antarmuka yang dibutuhkan, ini karena kami tidak memiliki waktu yang cukup untuk memikirkan design yang terbaik, dan Material UI ya bekerja dengan ajaib memudahkan kita mengembangkan fitur dengan cepat.
Untuk Chart library kami memilih [Recharts](http://recharts.org/en-US/) karena alasan kemudahan.

Semuanya ditulis dengan [TypeScript](https://www.typescriptlang.org/) 🙊

## Alur kerja

Dashboard kami memiliki cronjob yang akan dijalankan beberapa kali sehari dan memanggil custom script dari Lighthouse yang sudah kami buat dan melakukan test kepada halaman-halaman yang sebelumnya juga sudah kita simpan konfigurasinya.
Menjalankan 10x untuk setiap halamannya, dan mengambil quantile 75 dari keseluruhan skor yang di dapat, kemudian menyimpannya di MongoDB.

Kami juga menyetel ambang batas bagi sebagian metrik seperti TTI, skor performa, ukuran dari Script, CSS, dan gambar untuk masing-masing halaman.
Ketika sebuah halaman tidak dapat mencapai ambang batas yang sudah ditentukan maka dashboard akan mengirim notifikasi ke Slack baik ke channel maupun direct ke pengelola dari halaman tersebut.
Alerting diharapkan meningkatkan kepedulian semua orang yang terlibat dengan halaman tersebut, karena banyak orang yang terlalu repot untuk mengecek dashboard berulang-ulang.

![Contoh halaman konfigurasi untuk menambah halaman baru](/thumbnail/how-we-built-our-own-web-metric-monitoring-dashboard/screen-config.png)

Setelah data berhasil disimpan di tempat kita, kita bisa melakukan analisa dan aggregasi data sesuai kebutuhan. Kita bisa menyajikan hasilnya baik melalui tabel atau chart sesuai apa yang dimau. Datanya sudah ada disana, tinggal kita mau mengolahnya bagaimana.

![Contoh laporan dalam bentuk chart](/thumbnail/how-we-built-our-own-web-metric-monitoring-dashboard/screen-chart.png)

![Contoh laporan dalam bentuk tabel](/thumbnail/how-we-built-our-own-web-metric-monitoring-dashboard/screen-table.png)

![Contoh detail laporan](/thumbnail/how-we-built-our-own-web-metric-monitoring-dashboard/screen-detail.png)

## Image Analyzer

Kita tau gambar adalah salah satu beban terberat di sebuah halaman web. Memantau semua gambar yang dimuat pada saat pertama kali muat adalah tugas wajib bagi tim kami sebab seringkali tidak optimalnya sebuah gambar lah yang menjadin peyebab turunnya performa.

Dari laporan lighthouse, kalian bisa mendapatkan semua network request yang dilakukan oleh sebuah halaman sampai termuat, termasuk juga dengan gambar.
Kalian bisa mencoba untuk menengok lebih dalam ke dalam laporan kalian

```javascript
// let say we have JS object `report` from lighthouse
// then we can get the images from this field
const report = {};
const IMAGE_REGEX = /\.(jpe?g|png|gif|tiff|bmp|webp|svg)$/i;

const allImagesFromLighthouse = report.audits['network-requests'].details.items.filter(
  (i) => i.resourceType === 'Image' && IMAGE_REGEX.test(i.url),
);
```

Sayangnya, dari Lighthouse kita hanya mendapatkan data mengenai `resourceSize` (ukuran asli) dan `transferSize` (ukuran yang disampaikan melalui network). Ini bisa jadi bias, karena ukuran sebuah gambar juga ditentukandari berapa width, height dan kedalaman pixelnya. Untuk bisa menganalisa lebih lanjut kami memanfaatkan pustaka [image-size](https://www.npmjs.com/package/image-size) berdasarkan data yang sebelumnya dikumpulkan oleh Lighthouse.

![Contoh chart scatter dari sebaran gambar](/thumbnail/how-we-built-our-own-web-metric-monitoring-dashboard/screen-image.png)

## Alternatif

Kalian mungkin tidak perlu membangun alat pantau kalian sendiri seperti yang kami kerjakan, berikut saya sertakan beberapa alternatif yang bisa kalian gunakan:

- [Sitespeed.io](https://www.sitespeed.io/) - Gratis dan bisa dipasang di server sendiri
- [Treo.sh](https://treo.sh/) - Gratis dan ada versi berbayar
- Lighthouse CI - Gratis
- WebPageTest.org - Gratis
