---
title: Lewati CORS dengan proxy API
date: '2022-09-30'
excerpt: Solusi sederhana ketika ketemu masalah semua web developer - CORS, dengan menggunakan bantuan tambahan di tengah, yakni proxy API
author: mazipan
published: true
featured: false
tags: [web]
coverImage: /thumbnail/lewati-cors-dengan-proxy-api/pexels-aa-dil-2598008.jpg
lang: id
enready: false
---

## Mengenai CORS

Sebagian besar web developer pernah ketemu masalah CORS ini, paling tidak ketika mereka sedang develop di lokal mesin dengan `localhost` biasanya dan harus hit ke API backend yang belum disetel dengan benar.

Mari kita memahami CORS itu sendiri sebelum membahas topik spesifik kali ini.

CORS - *Cross-Origin Resource Sharing* merupakan mekanisme yang berjalan di peramban (browser) untuk mengamankan berbagai sumber daya di suatu server agar tidak bisa diakses oleh *Origin* yang tidak diperbolehkan. Mekanisme ini cuma terjadi di lingkungan peramban karena memang mengandalkan proses yang hanya dilakukan oleh peramban, yakni *preflight request*.

Contoh kasus yang sering dialami terjadi pada requst ke sebuah API.

Tonton video singkat [penjelasan CORS dari Fireship](https://www.youtube.com/watch?v=4KHiSt0oLJ0).

## Mengenai Origin yang dimaksud

Salah satu kata kunci yang bisa dijadikan pengingat adalah *Cross-Origin*, yang kurang lebih berarti *Origin* yang berbeda. Pertanyaanya, kita sudah tau yang dimaksud dengan *Origin* di atas belum? Kalau belum, ya wajar susah buat kita memahami kenapa kita bisa kena CORS pas lagi development.

*Origin* di sini mengarah pada *Origin* pada spesifikasi [API URL](https://developer.mozilla.org/en-US/docs/Glossary/URL).

Jadi kita mencari tau dengan memanfaat URL API ini, misal kita ingin tau Origin dari sebuah URL `https://foo.com`, kita bisa mencoba kode berikut di console peramban.

```js
new URL("https://foo.com")
// Kode ini akan menghasilkan output berikut:
URL {
  hash: ""
  host: "foo.com"
  hostname: "foo.com"
  href: "https://foo.com/"
  origin: "https://foo.com"
  password: ""
  pathname: "/"
  port: ""
  protocol: "https:"
  search: ""
  searchParams: URLSearchParams {}
  username: ""
}
```

Seperti terlihat, `https://foo.com` memiliki origin `https://foo.com`.

Jadi kalau dirimu punya aplikasi web di `http://localhost:3000/` dan harus melakukan request ke API di alamat `http://localhost:8989/`, ya jangan kaget kalau kena CORS, karena *Origin* mereka memang beda. Hal yang masih sering dijawab dengan ragu pas ditanya saat interview salah satunya ketika pertanyaanya dimainkan sedikit, misal saya punya aplikasi di `http://www.mazipan.com/` dan API nya saya letakkan di `http://api.mazipan.com/` apakah kena CORS? Nah, mulai sekarang gak usah ragu lagi. Kamu bisa cek sendiri dengan URL API, jadi besok-besok gak usah pake "kayanya-kayanya" lagi pas jawab pertanyaan serupa.

Baca lebih lengkap soal [Origin di MDN](https://developer.mozilla.org/en-US/docs/Glossary/Origin).

## Berbagai solusi CORS

Berikut beberapa solusi untuk menyelesaikan CORS yang biasanya dikerjakan.

### ✅ Satuin Origin

Kita sudah tau kalau penyebab utama terjadinya masalah CORS adalah karena *Origin*-nya beda. Jadi salah satu solusinya ya set *Origin*-nya biar sama. Kalau *Origin*-nya sama, CORS tidak akan terjadi. Masalahnya, gimana caranya biar *Origin*-nya sama? Nah ini bisa macam-macam caranya, saya sebutkan beberapa diantaranya saja. Tapi secara umum, istilahnya dikenal dengan Proxy.

Kalau aplikasi web-mu di spin-up pake Webpack, di lokal ada configurasi di Webpack DevServer yang bisa melakukan ini. Baca selengkapnya di [DevServer Proxy](https://webpack.js.org/configuration/dev-server/#devserverproxy)

Contoh kodenya:

```js
module.exports = {
  //...
  devServer: {
    proxy: {
      '/api': 'http://localhost:8989',
    },
  },
};
```

Dengan kode di atas, kita memindahkan alamat API yang tadinya harus diakses di `http://localhost:8989` sekarang jadi bisa diakses di `http://localhost:3000/api`, jadi si aplikasi client yang berada di `http://localhost:3000` bisa mengaksesnya. Eh tapinya... Ini cuma buat di lokal. Gak bisa di production.

Kalau di production, bisa minta tim DevOps kalian untuk buatin proxy tambahan 🙊.

Kalau aplikasi kalian punya kode server, bisa juga proses proxy nya dikerjain di level server. Misal, kalau server kalian pakai Node.js, bisa coba cek package tambahan [http-proxy](https://github.com/http-party/node-http-proxy).

### ✅ Pindahin request ke level server

Seperti kita bahas di atas, CORS cuma terjadi di lingkungan peramban. Jadi dengan memindahkan request ke level server, request nya jadi server-to-server (S2S) yang mana jadi tidak kena CORS lagi.

### ✅ Tambahkan response header tambahan

Kalau *Origin*-nya gak bisa disamain, request-nya gak bisa dipindahkan ke sisi server, ya minta ke yang bikin API untuk memperbolehkan *Origin* dari aplikasi web yang kamu buat untuk bisa mengakses API tersebut. Paling tidak header yang perlu di set adalah `Access-Control-Allow-Origin`, tapi bisa juga ditambahkan header lain kalau diperlukan.

Baca selengkapnya mengenai [response header tambahan di MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#the_http_response_headers)

### ✅ Tambahkan layer di depan

Ini yang mau kita bahas di artikel kali ini. Ketika kita tidak bisa menyatukan originnya, gak bisa memindahkan request-nya ke sisi server, gak bisa minta ke yang punya API untuk menambahkan response header tambahan. Salah satu solusinya ya nambahin layer. Sebelum request diteruskan ke server sesungguhnya, kita mengarahkan request tersebut ke service buatan kita sebelum nantinya kita teruskan. Dengan ini kita jadi bisa menambahan response header tambahan di sisi service buatan kita.

Layer tambahan ini tidak harus service baru, di beberapa Cloud provider mungkin sudah ada solusi di level infrastruktur macam menambahkan API Gateway di depan yang bisa melakukan hal semacam ini.

## Mengenai proxy API

Proxy API merupakan penengah di antara 2 API. Jadi misal dari aplikasi A ingin berkomunikasi dengan service backend B, mereka tidak langsung hit ke service backend B, melainkan lewat perantara API Y. Ini sebenernya *workaround*, karena kita tidak bisa meminta secara langsung ke yang bikin API untuk nembahin response header tambahan yang dibutuhkan. Artinya solusi pakai API baru untuk proxy sebuah request gara-gara masalah CORS sebaiknya jadi pilihan terkahir.

Ngobrol-ngobrol soal Proxy API untuk CORS, beberapa waktu yang lalu saya membuat proyek open source iseng untuk ini, bisa diintip di [💀 CORS Hijacker](https://cors-hijacker.vercel.app/). Memanfaatkan kebaikan hati dari server di Vercel, saya cuma meneruskan sebuah request ke server tujuan dan menambahkan header tambahan yang dibutuhkan pada response nya. Tentu saja solusi ini tidak cukup reliable untuk level production, jadi cukup gunakan untuk projek-projek hobi aja ya.

---

Photo by [Aa Dil on Pexels](https://www.pexels.com/photo/men-s-gray-knit-cap-2598008/)
