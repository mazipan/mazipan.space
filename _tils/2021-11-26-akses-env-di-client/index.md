---
title: Akses env di client
date: '2021-11-26'
excerpt: Mempelajari bagaimana Next.js bisa mengakses env di kode client
tags: [webpack]
---

Kalau kalian pernah pakai Next.js, mungkin kalian pernah menggunakan fitur ini, dimana di Next.js kalian bisa mengakses `process.env` tidak peduli kode kalian sebenernya jalan di lingkungan apa, klien atau server. 
Dua-duanya jalan mulus dengan cara yang sama, tidak ada perbedaan.

Buat yang belum tau `process.env` ini adalah cara di Node.js untuk mengakses environment variable yang ada di mesin maupun yang sudah di load ke env table melalui file `.env` atau file lainnya (dengan bantuan pustaka tambahan kalau gak pake nama `.env`). 
Tentu saja, ini cuma bisa dilakukan di lingkungan server. 
Kalau penasaran, coba saja buka perambanmu, buka DevTools, kemudian ketikkan `process.env` di DevTools kalian. 
Tentu saja kalian akan mendapati error `Uncaught ReferenceError: process is not defined`, ini karena memang tidak ada variabel global `process` yang bisa diakses di kode client.

Ini bukan barang baru buat saya (dan banyak teman-teman lainnya) yang sudah bergelut dengan aplikasi dengan proses rendering universal, bisa aja jalan di client dan di server. 
Cuma saya share ini, karena saya baru tau Next.js menggunakan teknik begini. 
Cara sebelumnya, biasanya saya akan serialize env yang saya butuhkan di client ke dalam object `window` agar bisa diakses di client. 
Jadi di client saya bisa mengakses dengan cara seperti `window.env.SEBUAH_KEY`. 
Namun ternyata Next.js menggunakan cara yang berbeda, tidak perlu melakukan serialize ke window, dan bisa "seolah-olah" mengakses `process.env` beneran.

Kawan saya (tentu bukan saya) mengubek-ubek kode Next.js untuk mencari tau bagaimana Next.js bisa mencapai kebutuhan ini dan menemukan ada kode berikut di webpack config mereka:

```ts
new webpack.DefinePlugin({
  ...Object.keys(process.env).reduce(
    (prev: { [key: string]: string }, key: string) => {
      if (key.startsWith('NEXT_PUBLIC_')) {
        prev[`process.env.${key}`] = JSON.stringify(process.env[key]!)
      }
      return prev
    },
    {}
  )
})
```

Kode selengkapnya bisa ditemukan di [webpack-config.ts#L1294](https://github.com/vercel/next.js/blob/5a3d558c9fdadd65d8ec17af1a4548beb25cde82/packages/next/build/webpack-config.ts#L1294)

Yap, ilmu hitamnya ada di penggunaan `DefinePlugin`. Loh kok...

Begitulah adanya, jadi sebenarnya yang kalian akses itu bukan benar-benar `process.env` melainkan variable global yang akan di resolve pada saat proses build berlangsung. 
Jadi di client akan berurusan dengan static string biasa sebenarnya. 
Itu kenapa dijagain dengan memberikan konvensi tambahan, artinya tidak semua nilai di `.env` akan dibeginikan, melainkan cuma yang punya prefix `NEXT_PUBLIC_` aja, dengan harapan tidak expose terhadap hal yang tidak seharusnya.

Dengan begini, tidak perlu lagi serialize env ke dalam `window` object, kamu bisa akses `process.env` langsung dari kode client. 
Tapi bukan berarti jadi bisa diakses langsung dari DevTools ya, karena proses ini membutuhkan build-time, jadi gak akan tersedia juga buat kode yang gak melalui build process.

Paling tantangan tambahannya adalah memastikan bahwa env ini tersedia di mesin build kalian, dan nilainya statik.
Artinya kalau kalian punya nilai yang bersifat live config, jangan menggunakan cara ini.
Gak akan bisa jalan, karena nilainya hanya akan di resolve di proses build bukan runtime.

Vercel sudah menjelaskan juga di dokumentasinya, baca selengkapnya di [halaman dokumentasi Next.js](https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables-to-the-browser)
