---
title: Cara fetch API di Node.js
date: '2021-01-11'
excerpt: Panduan bagaimana cara untuk melakukan Fetch sebuah API di lingkungan Node.js
author: mazipan
published: true
featured: false
tags: [javascript]
coverImage: /thumbnail/cara-fetch-api-di-nodejs/fetch-api-nodejs.jpg
lang: id
enready: false
---

[RESTFull API](https://www.smashingmagazine.com/2018/01/understanding-using-rest-api/) atau seringkali kita hanya menyebutnya sebagai API adalah antarmuka yang disediakan untuk berkomunikasi antar server maupun server dengan klien. API memiliki anatomi yang terstandard sehingga mudah dipahami dan mudah dikonsumsi oleh pengguna yang bersangkutan. Gampangnya, asal tau endpoint, jenis metode dan parameter yang dibutuhkan maka kita sudah bisa membuat permintaan kepada suatu API.

API di lingkup pengembangan web umumnya digunakan untuk berkomunikasi antar peramban dengan server. Para pengembang web pastinya sudah terbiasa melakukan request ke sebuah API melalui aplikasi klien yang mereka buat atau bahkan langsung dari DevTools si peramban. Meski begitu, ada banyak kasus juga yang membuat kita tidak boleh atau sebaiknya tidak melakukan pemanggilan API ini di level aplikasi klien, beberapa diantaranya biasanya penyebabnya adalah:

**👉  Masalah CORS**

Masalah klasik yang selalu saja muncul sebagai pertanyaan di setiap forum pemrograman web yang ada, ketika suatu *3rd party* API kok ternyata tidak bisa di *hit* dari aplikasi langsung dari peramban. 
Padahal ya jelas karena memang *origin* tersebut tidak diperbolehkan untuk melakukan permintaan secara langsung. 
Solusi praktisnya biasanya dengan melakukan *proxy* baik melalui web server maupun lewat aplikasi Backend yang ada dalam kendali kita. 
Memindahkan pemanggilan API dari peramban ke aplikasi Backend merupakan salah satu solusi bila kita menghadapi problem ini, sehingga dari aplikasi klien cukup memanggil ke Backend yang kita buat saja tanpa perlu lagi mengarah ke alamat aslinya.

**👉  Menyembunyikan Kredensial**

Beberapa API memerlukan API Key untuk bisa membuat suatu permintaan, masalahnya API Key tersebut bisa jadi adalah sebuah kredensial yang seharusnya kita jaga dan tidak boleh terekspos ke publik.

Caranya ya pemanggilan API nya dilakukan saja di Backend yang mana akan sulit untuk orang awam mengetahui apa yang terjadi di dalamnya.

**👉  Menyembunyikan Sumber Data**

Hampir sama dengan alasan sebelumnya, beberapa orang tidak ingin sumber data aslinya diketahui oleh orang lain, jadi segala pemanggilan ke *3rd party* akan dilakukan di aplikasi Backend.

## Bagaimana Melakukannya di Node.js

Sebagai orang yang sehari-hari mengerjakan aplikasi untuk peramban, JavaScript menjadi salah satu bahasa pemrograman yang cukup sering digunakan, itu mengapa ketika harus membuat Backend *ecek-ecek*, pilihan tercepat dan termudah ya menggunakan Node.js saja.

Pada tulisan kali ini saya akan membahas hal dasar yang sering saya lupakan sendiri, yakni beberepa opsi yang bisa dipilih untuk melakukan pemanggilan sebuah API di dalam lingkungan Node.js.

Sebelum saya menjelaskan lebih lanjut, semua kode yang ada di artikel kali ini bisa kalian lihat selengkapnya di Github Repo: [❓ how-to-call-api-in-nodejs](https://github.com/mazipan/how-to-call-api-in-nodejs)

### Native Node.js

Node.js secara Native sudah memiliki interface yang bisa kita gunakan untuk melakukan pemanggilan sebuah API, bisa dengan memanfaatkan modul `http` ataupun `https`. 
Ini bisa jadi pilihan untuk yang anti-*"3rd party club"* yang sayangnya kodenya memang masih cukup rumit karena memberikan balikan berupa *stream*, berikut adalah contoh kode jika kita ingin melakukan pemanggilan API dengan Native Node.js:

```js
const https = require('https');
const CONSTANT = require('./constant');

https.get(CONSTANT.API_URL, (res) => {
  res.on('data', (d) => {
    process.stdout.write(d);
  });
}).on('error', (e) => {
  console.error(e);
});
```

### Node-Fetch

Buat kalian (baca: saya) yang sudah kadung terlalu malas menghafal sintaks baru, [Node-Fetch](https://www.npmjs.com/package/node-fetch) bisa jadi pilihan karena menggunakan interface yang serupa dengan [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) di peramban. 
Cukup belajar sekali dan gunakan berkali-kali bukan?

Berikut contoh kode memanggil API dengan Node-Fetch:

```js
const fetch = require('node-fetch');
const CONSTANT = require('./constant');

fetch(CONSTANT.API_URL)
  .then((res) => res.json())
  .then((json) => console.log(json));
```

### Axios

[Axios](https://github.com/axios/axios) merupakan salah satu pustaka paling populer di JavaScript yang bisa digunakan baik untuk lingkungan klien maupun server. 
Kita bisa menggunakan Axios juga untuk melakukan pemanggilan API di Node.js dengan interface yang sama persis dengan ketika kita menggunakannya di peramban.

Berikut contoh kodenya:

```js
const axios = require('axios');
const CONSTANT = require('./constant');

axios
  .get(CONSTANT.API_URL)
  .then(function (response) {
    // salah satu yang menyebalkan dan bikin saya sering lupa
    // axios menambahkan properti "data" untuk menyimpan hasil response nya
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
```

### Super Agent

[Super Agent](https://github.com/visionmedia/superagent) juga sama bisa bekerja di lingkungan peramban dan Node.js. 
Saya sendiri mengenal pustaka ini karena dulu ini salah satu yang paling populer digunakan di lingkungan End-to-End testing di JavaScript.

Berikut contoh kode melakukan pemanggilan API dengan SuperAgent:

```js
const superagent = require('superagent');
const CONSTANT = require('./constant');

superagent
  .get(CONSTANT.API_URL)
  .set('accept', 'json')
  .then((res) => {
    console.log(res.body);
  })
  .catch((err) => {
    console.error(err);
  });
```

### Got

[Got](https://github.com/sindresorhus/got) merupakan pustaka besutan dari salah satu open-sourcer terkemuka di dunia, [Sindre Sorhus](https://github.com/sindresorhus). 
Ciri khas dari pustaka yang dibuat Sindre umumnya memiliki interface yang sederhana sehingga mudah untuk digunakan.

Berikut contoh kode melakukan pemanggilan API dengan Got-nya Sindre:

```js
const got = require('got');
const CONSTANT = require('./constant');

(async () => {
  try {
    const response = await got(CONSTANT.API_URL);
    console.log(response.body);
  } catch (error) {
    console.log(error);
  }
})();
```

### cURL dengan child_process

Cara ini memanfaatkan kemampuan [cURL](https://curl.se/) yang umumnya sudah tertanam dengan baik di perangkat Linux maupun Mac.

Pada bagian ini kita akan berusaha mengeksekusi perintah cURL (yang biasanya lewat terminal), dengan menggunakan `exec` yang ada di `child_process` di Node.js.
Untuk bisa menggunakan cara ini, kalian harus memastikan terlebih dahulu bahwa mesin atau komputer kalian bisa mengeksekusi perintah cURL dari terminal.
Caranya ya cobain saja perintah sederhananya di terminal, misalnya:

```shell
$ curl https://mazipan.space
```

Berikut contoh kodenya jika ingin mengeksekusi perintah melalui `child_process` di Node.js:

```js
const { exec } = require('child_process');
const CONSTANT = require('./constant');

exec(`curl ${CONSTANT.API_URL}`, (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(stdout);
});
```
### cURL dengan shelljs

Buat kalian para penggandrung perintah cURL seperti di atas, namun malas menggunakan `child_process`, bisa juga menggunakan pustaka `shelljs` untuk mengeksekusi perintah tersebut, berikut contoh kodenya:

```js
const { exec } = require('shelljs');
const CONSTANT = require('./constant');

exec(`curl ${CONSTANT.API_URL}`, { silent: true }, (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(stdout);
});
```

## Penutup

Ada banyak jalan menuju ke Indonesia, ada banyak cara untuk menyelesaikan hal yang sama. 
Artikel ini adalah catatan bagi saya pribadi agar menjadi pengingat di masa yang akan datang. 
Kalian bisa memilih yang mana saja yang kalian suka, tidak mengikuti apa yang saya biasa kerjakan, yang penting kerjaan sama-sama kelarnya.
Mengingatkan kembali bahwa kode di atas bisa kalian lihat selengkapnya di Github Repo: [❓ how-to-call-api-in-nodejs](https://github.com/mazipan/how-to-call-api-in-nodejs)

Terima Kasih.
