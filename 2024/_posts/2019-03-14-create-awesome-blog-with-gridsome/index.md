---
title: Membuat blog keren dengan Gridsome
date: '2019-03-14'
excerpt: Bagaimana memulai membuat Blog statis keren menggunakan Vue.js static site generator Gridsome dalam waktu yang singkat
author: mazipan
published: true
featured: false
tags: [vue, gridsome]
coverImage: /thumbnail/create-awesome-blog-with-gridsome/how-it-works.png
lang: id
enready: true
---

Bagaimana memulai membuat Blog statis keren menggunakan Vue.js static site generator Gridsome dalam waktu yang singkat

## Mengenal Blog Statis

"Blog statis" merupakan blog yang kita buat tanpa menggunakan _backend_, sehingga bisa kita deploy dengan mudah pada berbagai static host seperti Github Pages, Netlify, Firebase dan lainnya. Blog statis ini biasanya menggunakan templat seperti _Markdown_ yang akan _build_ sesaat sebelum _deploy_ untuk menghasilkan file statis HTML, CSS dan JavaScript.

## Apa itu Gridsome?

![Gridsome Logo](/thumbnail/create-awesome-blog-with-gridsome/logo-normal-dark.svg)

[Gridsome ↗️](https://gridsome.org/) merupakan anak baru di ekosistem Vue.js yang mengkhususkan dirinya sebagai pembuat halaman statis (_static site generator_). Bila kalian pengguna React.js, tentu sudah tidak asing dengan yang namanya [Gatsby ↗️](https://www.gatsbyjs.org/) sebagai salah satu pembuat halaman statis terbaik saat ini. Nah, Gridsome sangat terinspirasi dari apa yang dikerjakan oleh Gatsby di ekosistem React.js.

Sudah bukan hal baru bahwa ekosistem di Vue belum sekuat dan sekomplit di React, namun saya pribadi selalu terkagum-kagum dengan mereka yang bersusah payah membuatkan alternatif bagi banyak hal hebat di React untuk Vue. Gridsome, seperti ingin mengekor pada kesuksesan Nuxt yang mencoba mengadopsi Next.js di React. Nuxt yang beberapa tahun lalu belum terdengar suaranya hari ini bahkan telah menjadi pilihan terbaik ketika akan membuat sebuah aplikasi diatas Vue.

## Mengapa Gridsome lebih baik dibandingkan Nuxt?

Nuxt pada dasarnya diperuntukkan untuk membuat aplikasi web di Vue yang membutuhkan rendering di server, Nuxt lebih khusus sangat disiapkan untuk menangani berbagai kebutuhan kompleks yang biasanya muncul ketika membuat sebuah aplikasi web. Meskipun Nuxt mempunyai kemampuan untuk men-_generate_ file statis yang bisa kita gunakan juga untuk membuat blog statis, namun sebenarnya ini merupakan fungsi yang _nice-to-have_ bagi Nuxt.

Sementara Gridsome merupakan pemain yang punya spesialis di bagian ini. Gridsome sudah secara _default_ memiliki fitur _generate_ yang dipersenjatai dengan berbagai _built-in_ fitur lain yang dibutuhkan ketika membuat blog statis seperti otomatis melakukan _code-splitting_, melakukan kompresi gambar, mendukung PWA secara penuh, dan tentunya sangat bersahabat dengan SEO. Kita juga bisa dengan mudah mengorganisasikan berkas konten kita dengan **Markdown** tanpa perlu tambahan konfigurasi apapun lagi. Bila kalian lihat di repository [Blog 2.0 ↗️](/blog-2-0-in-nuxtjs) yang saya buat dengan Nuxt tentu akan tau bahwa saya harus melakukan berbagai "kecurangan" untuk mengerjakan hal yang sama.

![How Gridsome Works](/thumbnail/create-awesome-blog-with-gridsome/how-it-works.png)

## Membuat Blog dengan Gridsome

Membuat blog dengan Gridsome sekarang sangat dipermudah dengan adanya _starter template_ yang menurut saya sudah cukup komplit untuk kebutuhan umum sebuah blog.

Gridsome membuat starter yakni [gridsome-starter-blog ↗️](https://github.com/gridsome/gridsome-starter-blog) yang bisa kalian gunakan dengan cepat dan mudah untuk pertama kali. Dengan menggunakan starter seperti ini akan mengurangi banyak beban di depan untuk melakukan banyak konfigurasi yang tentunya akan membingungkan bagi pemula seperti saya ini.

Berikut kurang lebih langkah-langkah untuk membuat blog dengan menggunakan starter template dari Gridsome ini:

**1. Install Gridsome CLI**

```bash
$ npm install --global @gridsome/cli
```

**2. Buat proyek baru dengan `gridsome-starter-blog`**

```bash
$ gridsome create gridsome-blog https://github.com/gridsome/gridsome-starter-blog.git
```

**3. Menjalankan untuk pengembangan di lokal**

```bash
$ gridsome develop
```

**4. Men-_generate_ berkas statis**

```bash
$ gridsome build
```

Kalian bisa lihat hasil membuat Blog dengan gridsome starter di repository [https://github.com/mazipan/gridsome-blog ↗️](https://github.com/mazipan/gridsome-blog)

## Deploy ke Netlify

Untuk deploy Gridsome ke Netlify juga sangat mudah, bahkan Gridsome juga menyediakan dokumentasi resmi mengenai langkah-langkahnya di halaman [deploy-to-netlify ↗️](https://gridsome.org/docs/deploy-to-netlify), yang kurang lebih seperti berikut:

1. Buat halaman projek baru di Netlify

2. Tambahkan perintah `gridsome build` pada kolom _build command_

3. Dan tambahkan direktori `dist` pada kolom _publish directory_

4. Kalian bisa lihat hasilnya di [https://gridsome-blog.netlify.com/ ↗️](https://gridsome-blog.netlify.com/)

## Menambahkan Artikel Baru

1. Semua artikel terletak di direktori `/content/posts` dengan format berkas menggunakan Markdown yang berekstensi `.md`.

2. Kita tinggal menambahkan file baru dengan nama berkas yang nantinya akan menjadi url dari artikel tersebut.

3. Buat meta dari sebuah artikel, seperti berikut contohnya:

```yaml
---
title: Membuat blog keren dengan Gridsome
slug: create-awesome-blog-with-gridsome
date: '2019-03-14'
author: mazipan
published: true
featured: false
tags: ['gridsome', 'javascript']
cover_coverImage: ./images/logo-poster.png
canonical_url: false
published: true
featured: false
excerpt: Bagaimana memulai membuat Blog statis keren menggunakan Vue.js static site generator Gridsome dalam waktu yang singkat
---

```

4. Kita bisa menambahkan gambar untuk artikel terkait pada direktori `/content/posts/images`, dan cukup menautkan dengan kode Markdown biasa seperti `![Image Alt](./images/logo-poster.png)`

5. Kita bisa mengubah konfigurasi dari nama blog dan deskripsi blog pada file `gridsome.config.js`

## Menambahkan dukungan sitemap.xml

Sayangnya dari bawaan templat belum disematkan dukungan untuk membuat `sitemap.xml`, karenanya di sini kita akan menambahkannya sendiri dengan cara seperti berikut:

1. Pasang dependency

```bash
yarn add @gridsome/plugin-sitemap
```

2. Tambahkan `siteUrl` di dalam berkas `gridsome.config.js` dengan nilai URL produksi dari blog kita

3. Tambahkan konfigurasi untuk sitemap pada berkas `gridsome.config.js` pada properti `plugins`, seperti berikut contohnya:

```javascript
module.exports = {
  plugins: [
    {
      use: '@gridsome/plugin-sitemap',
      options: {
        cacheTime: 600000, // default
        exclude: ['/exclude-me'],
        config: {
          '/articles/*': {
            changefreq: 'weekly',
            priority: 0.5,
          },
          '/about': {
            changefreq: 'monthly',
            priority: 0.7,
          },
        },
      },
    },
  ],
};
```

### Demikian artikel kali ini, semoga bermanfaat...
