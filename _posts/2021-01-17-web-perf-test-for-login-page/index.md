---
title: Pengujian performa web untuk halaman dengan login
date: '2021-01-17'
excerpt: Berbagi hal yang saya pelajari dalam melakukan test performa web untuk halaman-halaman yang membutuhkan login terlebih dahulu
author: mazipan
published: true
featured: false
tags: [web-perf]
coverImage: /thumbnail/web-perf-test-for-login-page/uji-performa-halaman-login.jpg
lang: id
enready: false
---

Performa web sudah bukan lagi barang baru, perhatian terhadap topiknya dari banyak pemrogram web juga sudah mulai membaik. Seiring dengan semakin banyaknya perhatian yang mengarah kesana, maka semakin banyak pula perkembangan yang terjadi di sekitaran topik tersebut. Hampir di setiap helatan Chrome Dev Summit selalu tersemat materi mengenai performa web. Menarik? Yah, terlalu banyak dijejali topik yang sama bisa jadi juga akan membuat orang-orang bosan, tapi semoga ada hal baik yang bisa dipelajari dari artikel kali ini. Sebenarnya hal yang saya bagikan sudah tersedia di dokumentasi resmi Lighthouse sendiri, tapi saya akan coba jelaskan ulang agar saya sendiri bisa lebih paham dan tidak lupa-lupa lagi.

Melakukan pengujian pada halaman biasa yang tanpa membutuhkan login, sudah biasa. Hampir semua alat yang tersedia di pasaran bisa melakukannya. Tapi untuk halaman-halaman yang membutuhkan login, maka pilihan kita akan menciut pada satu atau dua pilihan yang tersedia. Atau kita mundur sedikit dulu deh, kenapa kita harus juga melakukan pengujian terhadap halaman yang membutuhkan login? Jawabannya tentu saja "tergantung" kalian ya, tidak di test pun tidak apa-apa. Di tempat kerja saya sendiri, kita punya halaman-halaman yang merupakan halaman kritis dan penting keberadaanya meskipun berada dibalik sebuah alur login. Halaman-halaman kritis ini tentu saja perlu dipastikan kondisinya selalu prima, ketersediaanya baik, dan juga performanya tetap memuaskan. Inilah yang memacu kami untuk mencari cara bagaimana melakukan pengujian terhadap halaman-halaman tersebut.

## Sekilas mengenai Lighthouse

[Lighthouse](https://github.com/GoogleChrome/lighthouse) merupakan alat yang menjadi terlalu populer dan digunakan oleh banyak orang untuk melakukan pengujian sebuah performa web. Saya sudah tidak perlu lagi menjelaskan bagaimana melaukan pengujian dengan Lighthouse. Tersedia dalam berbagai versi, mulai dari yang lokal di DevTools, CLI, lewat berbagai web yang dibelakangnya juga menggunakan Lighthouse seperti PageSpeedInsight (PSI), Web.dev/measure, WebPageTest, atau bahkan yang sudah terintegrasi dengan sistem integasi berkelanjutan di tempat kalian. Yap saking banyaknya bisa jadi bikin kita malah terlalu lama menimbang-nimbang harus pakai yang mana, dibandingkan mengerjakan pekerjaan pengujiannya itu sendiri.

## Kenapa susah menguji halaman dibalik login

Saya akan coba sematkan terlebih dahulu hasil gambar dari pengujian halaman yang saya buat untuk artikel ini. Kalian bisa juga mengunjunginya langsung di tautan [contoh pengujian halaman login](https://developers.google.com/speed/pagespeed/insights/?url=http%3A%2F%2Fmazipan.space%2Fexamples%2Fonly-for-login&tab=mobile), atau silahkan lihat gambar di bawah ini:

![Gambar hasil uji PageSpeedInsight pada halaman yang membutuhkan login](/thumbnail/web-perf-test-for-login-page/test-login-page.png)

Bisa terlihat bahwa PSI malah melakukan pengujian pada halaman yang tidak seharusnya (halaman /unauthorized), ini karena si Aplikasi mendeteksi bahwa si pengunjung (dalam hal ini PSI) belum melakukan proses login.

Halaman dibelakang proses login, membutuhkan "sesuatu" sebagai prasyarat untuk bisa dikunjungi secara langsung, ini berarti kita bisa langsung mengeliminasi alat uji semacam PSI, Web.dev/measure, WebPageTest dan berbagai website pengumpul lab data lainnya. kenapa? karena halamannya tidak akan bisa dikunjungi secara langsung, butuh proses tambahan sebelum bisa dikunjungi.

Jadi bagaimanakah kira-kira cara kita bisa menambahkan proses sebelum mengunjungi sebuah halaman yang akan dilakukan pengujian terhadapnya?

## Beberapa opsi mudah

Sebelum membahas opsi sulit, kita akan bahas beberapa opsi mudah yang mungkin bisa kalian pertimbangkan dulu sebelum mencoba yang lebih rumit, beberapa cara yang kepikiran oleh saya kalau kalian ingin melakukan pengujian halaman login dengan cara mudah, antara lain:

**👉 Manual saja dengan DevTools**

Cara paling mudah ya, kalian login saja dulu di peramban kemudian pastikan kalian sudah bisa mengunjungi halaman tersebut. Setelahnya tinggal buka DevTools dan cari tab Lighthouse dan lakukan pengujian di halaman tersebut. Kalau proses login kalian membutuhkan *Browser Storage* macam LocalStorage maka pastikan saja kalian tidan mencentang pilihan "Clear Storage" saat akan melakukan pengujian. Tidak perlu malu melakukan pengujian manual, lagian ini kan memang cara tercepat untuk kita melakukan pengujian. Kalau kalian membutuhkan data historikal, maka kalian mungkin perlu menyimpan hasil pengujian di lokal ini dalam bentuk JSON sehingga bisa diambil dan dianalisa  lagi datanya besok-besok.

![Gambar hasil uji dengan DevTools](/thumbnail/web-perf-test-for-login-page/manual-devtools.png)

**👉 Buat Pintu Belakang**

Ini cara jahat, rentan dan cupu yang sebaiknya **JANGAN DILAKUKAN**. Kalian bisa saja membuat *backdoor*s atau pintu belakang di aplikasi kalian, misal menambahkan query param unik agar tidak perlu melakukan pengecekan apakah sudah login atau belum, atau bisa juga membaca User Agent dari perambannya sendiri. Dengan cara ini kita ingin agar suatu halaman yang seharusnya membutuhkan login menjadi tidak mebutuhkan login untuk pengujian performa web.

## Cara rumit melakukan pengujian

Kalau sudah bisa cara mudah, sudah kesel dan capek dengan cara mudah, mungkin sudah saatnya mencoba hal yang rumit agar bisa tidur dengan lebih nyenyak setiap harinya.

Tujuannya adalah memastikan Lighthouse bisa mengunjungi ke halaman yang membutuhkan login.

Alat yang paling mungkin digunakan ya Lighthouse yang bisa dimanipulasi alurnya, pilihannya ya ada pada Ligthouse CLI atau Lighthouse dalam versi Node.js nya.

Untuk versi CLI nya sendiri sebenernya bisa menyematkan Cookie (jika proses login kalian hanya menyematkan Cookie), tapi ya cara ini juga masih cukup *hacky* karena berarti kalian harus bisa melakukan login dahulu ditempat lain untuk kemudian mengambil kredensial token hasil loginnya dan disematkan sebagai argumen pada CLI tersebut. Belum lagi ada issue dimana kalau kalian menyematkan extra Cookie bisa jadi akan menimpa semua Cookie lain yang seharusnya tersedia. Mengenai ini kalian bisa baca di [PR #9170](https://github.com/GoogleChrome/lighthouse/pull/9170)

Berikut contoh potongan kode kalau kalian ingin menyematkan tambahan argumen:

```shell
$ lighthouse http://www.example.com --view --extra-headers="{\"Cookie\":\"is-login=1\"}"
```

Atau dalam versi Node.js bisa melakukan hal yang sama dengan cara:

```js
const result = await lighthouse('http://www.example.com', {
  extraHeaders: {
    Cookie: 'is-login=1',
  },
});
```

Kalau cara ini masih tidak berhasil juga, maka perlu mencoba kombinasi Puppeteer x Lighthouse seeprti yang juga [disarankan oleh dokumentasi](https://github.com/GoogleChrome/lighthouse/tree/master/docs/recipes/auth) di Lighthouse.

Pastikan kalian memasang dependency puppeteer dan lighthouse di projek kalian terlebih dahulu:

```shell
$ npm i lighthouse puppeteer
$ yarn add lighthouse puppeteer
```

Selanjutnya coba jalankan lighthouse dengan Puppeteer seperti pada dokumentasi [menjalankan Lighthouse dengan Puppeteer](https://github.com/GoogleChrome/lighthouse/blob/master/docs/puppeteer.md), berikut contoh kode yang sudah disederhanakan:

```js
const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');

// halaman non-login sebagai test
const PAGE_URL = 'https://mazipan.space/';

(async() => {
  const browser = await puppeteer.launch({
    // Sengaja di set false, biar kelihatan interaksinya
    headless: false,
    slowMo: 50,
  });

  const { lhr } = await lighthouse(PAGE_URL, {
    // menggunakan PORT dari Puppeteer
    port: (new URL(browser.wsEndpoint())).port,
    output: 'json'
  });

  console.log(`Lighthouse scores: ${Object.values(lhr.categories).map(c => c.score).join(', ')}`);
  await browser.close();
})();
```

Kode di atas hanya menjalan Lighthouse dengan memanfaatnya Puppeteer sebagai *launcher*nya dan menggunakan PORT yang sama sehingga tidak perlu membuka Chrome baru untuk sesi Lighthouse-nya.

Kalau sudah bisa menjalankan kode di atas tanpa error, langkah selanjutnya adalah menambahkan proses login dengan menggunakan Puppeteer sebelum Lighthouse dijalankan. Kalian mungkin perlu baca-baca terlebih dahulu mengenai bagaimana menggunakan Puppeteer dalam proses otomasi sebuah peramban, silahkan coba ubek-ubek [dokumentasi Puppeteer](https://pptr.dev/) ya.

## Contoh kode beserta kasus sederhana

Daripada banyak berandai-andai, saya buatkan saja contoh kasus sederhana agar bisa terbayang dan bisa kita praktekkan bersama kodenya nanti.

Jadi, saya sudah membuat 3 halaman di blog saya ini, yakni:

- [/examples/only-for-login](https://mazipan.space/examples/only-for-login)
- [/examples/login](https://mazipan.space/examples/login)
- [/examples/unauthorized](https://mazipan.space/examples/unauthorized)

Idenya adalah, kita akan melakukan uji web performa pada halaman "/examples/only-for-login", sayangnya halaman ini tidak bisa dikunjungi secara langsung, kalian akan diarahkan ke "/examples/unauthorized" bila memaksanya. Kita diharuskan untuk datang ke halaman "/examples/login" terlebih dahulu untuk kemudian memasukkan email dan password dan melakukan proses login. Jika kalian telah melakukan proses login, maka kalian sudah bisa mengunjungi halaman "/examples/only-for-login". Paham kah? Ya, ini cuma versi sederhana dari proses login yang biasanya lebih rumit. Paling tidak kita bisa dapat konsepnya dahulu saja lah.

Jadi, mari kita mulai saja membuat kodenya, saya telah membuat project Node.js dengan dependency ke `puppeteer` dan `lighthouse` sebelumnya, dan kode yang akan saya buat adalah sebagai berikut:

```js
const fs = require('fs');
const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');

// Halaman yang mau kita test
const PAGE_URL = 'https://mazipan.space/examples/only-for-login';

// Halaman tempat kita akan melakukan proses login
const PAGE_LOGIN_URL = 'https://mazipan.space/examples/login';

// Fungsi akan dipanggil nanti, sebelum menjalankan Lighthouse
const doingAuthentication = async (browser) => {
  // -- MEMULAI proses login
  const page = await browser.newPage();

  // Kunjungi halaman login
  await page.goto(PAGE_LOGIN_URL);

  // Tunggu sampai masukan email terlihat
  await page.waitForSelector('#email');

  // Isi email
  const emailInput = await page.$('#email');
  await emailInput.type('me@mazipan.space');

  // Isi password
  const passwordInput = await page.$('#password');
  await passwordInput.type('password123');

  // Kirim data dengan klik submit
  const submitBtn = await page.$('button[type="submit"]');
  await submitBtn.click();

  // menunggu redirection setelah melakukan klik submit
  await page.waitForNavigation();
  await page.close();
  // -- SELESAI proses loginnya
};

(async () => {
  const browser = await puppeteer.launch({
    headless: false, // untuk test, saya set false saja
    defaultViewport: null,
  });

  // Memanggil fungsi untuk login
  await doingAuthentication(browser);

  // Jalankan lighthouse di URL yang mau kita test
  const { report, lhr } = await lighthouse(PAGE_URL, {
    // Gunakan port dari Puppeteer
    port: new URL(browser.wsEndpoint()).port,
    output: 'html',
    // Jaga2 aja, kalau proses login kalian memanfaatkan Browser Storage API, biar gak di reset
    disableStorageReset: true,
  });

  // Tulis hasil lighthouse ke berkas html dan json
  fs.writeFileSync('lhreport.html', report);
  fs.writeFileSync('lhreport.json', JSON.stringify(lhr, null, 2));

  console.log(
    `Lighthouse scores: ${Object.values(lhr.categories)
      .map((c) => c.score)
      .join(', ')}`
  );

  await browser.close();
})();
```

Tinggal jalankan saja kode ini, di kasus saya karena saya letakkan kode ini di berkas `index.js` maka saya bisa menjalankan dengan `node ./index.js` saja.

## Bagaimana kita yakin kalau halamannya benar

Kalian bisa cek laporan yang dihasilkan, umunya akan ada screenshoot dari halaman yang di test.
Sayangnya setelah saya cek pada laporan html, screenshootnya terlalu kecil untuk dilihat, jadi saya sendiri tidak bisa yakin apakah halamannya benar atau tidak dengan melihat laporan dalam bentuk html.
Maka dari itu sebaiknya cek saja ke laporan dalam bentuk json nya.
Cek dan cari kata `final-screenshoot` dan salin nilai dari properti `data` yang tersedia ke dalam peramban, ini merupakan base64 dari gambar screenshoot dari halaman yang di test oleh Lighthouse.

## Repository

Kode di atas tersedia juga di repository [lighthouse-behind-auth](https://github.com/mazipan/lighthouse-behind-auth) yang bisa lebih enak untuk dibaca dan dipelajari dibandingkan baca artikel blog macam ini yang terlalu banyak omong kosongnya.


Terima kasih dan semoga bermanfaat.
