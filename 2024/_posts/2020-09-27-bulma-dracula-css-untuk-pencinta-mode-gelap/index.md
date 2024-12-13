---
title: Bulma Dracula, CSS untuk pencinta mode gelap
date: '2020-09-27'
excerpt: Menceritakan bagaimana Bulma Dracula dibangun
author: mazipan
published: true
featured: false
tags: [web]
coverImage: /thumbnail/bulma-dracula-css-untuk-pencinta-mode-gelap/bulma-dracula.png
lang: id
enready: false
---

Berawal ketika saya masih coding Java sedikit-sedikit sehingga IDE yang sehari-hari saya gunakan adalah IntelIJ IDEA dari Jetbrains, dari sanalah saya mulai jatuh cinta pada tema Darcula yang merupakan tema bawaan saat memilih mode gelap pada IDE tersebut. Saya entah mengapa sangat cocok dengan pilihan warna yang ada di tema ini. Sedari itu saya hampir selalu memilih corak warna ini untuk berbagai _text editor_ yang saya gunakan.

Kegandrungan ini nampaknya menular juga pada saat saya membuat sebuah web pribadi, blog saya yang silih berganti namun biasanya selalu mengambil pilihan-pilihan warna yang ada di tema Darcula/Dracula ini.

## Mengenal Bulma CSS

Sejatinya saya sudah berkenalan cukup lama dengan [Bulma CSS](https://bulma.io/) bahkan saat ini saya sudah cukup jarang menggunakannya setelah nama Tailwind kian melesat akhir-akhir ini, namun pada masanya di kala semua orang terlalu Bootstrap, entah mengapa saya merasa sangat cocok dengan pilihan nama _class_ yang digunakan oleh Bulma meskipun terkesan boros, hal ini dikarenakan class-classnya kebanyakan tanpa ada singkat-singkatan yang seringkali membuat kita harus menghafalnya.

Bulma mendapatkan popularitasnya karena menawarkan paket CSS yang cukup lengkap dan tanpa tambahan JavaScript, sehingga diharapkan cukup mudah untuk digunakan berbarengan dengan berbagai framework kekinian yang biasanya tidak ingin menambah JavaScript lain lagi.

Untuk menambahkan Bulma ke projek kita bisa dengan semudah menambahkan lewat CDN:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.0/css/bulma.min.css" />
```

Kemudian diharapkan menyetel meta tag agar mendukung Responsive web:

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

Dan viola, kalian sudah bisa menggunakan Bulma untuk projek kalian. Untuk para pengguna npm, Bulma sudah menyediakan generator untuk menyiapkan projek komplit dengan berbagai presetnya lewat [bulma-start](https://bulma.io/bulma-start/), namun bila senang dengan kebebasan kalian tetap bisa memasang manual lewat perintah:

```bash
$ npm i bulma
```

Dan kalian bisa menambahkan file `css` ataupun `scss` ke dalam projek yang kalian kerjakan.

## Membangun Bulma Dracula

Projek ini sebenarnya sudah saya buat sejak Maret 2019 namun karena baru beberapa minggu yang lalu saya coba perbarui berbagai hal termasuk upgrade versi Bulma yang saya gunakan, maka saya teringat untuk menuliskan bagaimana saya membuat tema untuk Bulma CSS ini di blog pribadi.

Saya tidak terlalu cocok dengan tema bawaan Bulma, saya ingin tema yang memang nyaman buat saya gunakan dan bisa saya gunakan berulang di projek saya yang lain. pilihannya buat saya ya membuat tema sendiri untuk saya gunakan sendiri.

Cukup susah membuat projek CSS karena saya memang kurang fasih soal hal ini sehingga mendesain bagaimana cara saya untuk membuat tema di awal saja sudah cukup memeras otak. Pilihan bar-bar ya saya akan override saja semua class yang dihasilkan oleh Bulma.

Untungnya Bulma dibangun di atas pre-processor SASS sehinga sangat memungkinkan bagi kita untuk memanipulasi sebelum menjadi berkas CSS. Kerennya lagi, di dokumentasinya itu hampir di semua bagiannya selalu terselip variable apa yang tersedia pada komponen tersebut pada akhir baris. Wah, ini sih bisa jadi kerjaan gampang, pikir saya.

Langsung saja saya setup minimal konfigurasi yang biasa saya siapkan untuk membuat projek yang akan saya publikasikan sebagai library nantinya, saya memilih Webpack sebagai bundler karena cukup familiar dengan konfigurasinya dan karena saya juga membutuhkan aplikasi untuk mengerjakan di lokal dan sebagai halaman demo atau landing page nantinya sehingga memilih JavaScript bundler memang lebih cocok buat saya.

Kunci utama pada konfigurasi webpack saya tentu ada pada `MiniCssExtractPlugin` yang saya gunakan untuk mengeluarkan CSS dari Bundle JavaScript dan membuat berkas akhir yang bisa saya publikasikan sebagai CSS.

Kode sederhana dari penggunakan `MiniCssExtractPlugin` adalah sebagai berikut:

```javascript {13-16,31-34}
// berkas: webpack.config.js
var webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // ... konfigurasi lainnya
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
        ],
      },
      // ... loader lainnya
    ],
  },
  // ... konfigurasi lainnya
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'bulma-dracula.css',
      ignoreOrder: false,
    }),
    // ... plugin lainnya
  ],
};
```

Seperti terlihat saya menggunakan nama berkas statis `bulma-dracula.css` yang mana ini adalah berkas yang saya unggah ke npm.

Selain dari berkas CSS, saya juga mengunggah berkas sumbernya yakni dalam format `.scss` agar bisa ditimpa kembali bila dibutuhkan. Untuk hal ini, saya cukup memainkan properti di `package.json` dengan menyebutkan berkas mana saja yang akan saya unggah, seperti terlihat pada contoh kode berikut:

```json
{
  "main": "src/bulma-dracula.scss",
  "unpkg": "dist/bulma-dracula.css",
  "style": "dist/bulma-dracula.css",
  "files": [
    "dist/bulma-dracula.css",
    "src/bulma-dracula.scss",
    "src/bulma-dracula-vars.scss",
    "LICENSE",
    "README.md"
  ],
}
```

Cara saya melakukan override terhadap tema bawaan Bulma pun sebenarnya ccukup mudah, menggunakan berkas `.scss` dan memastikan bahwa saya mendefinisikan variable dengan nilai baru sebelum menambahkan Bulma, bisa dilihat pada contoh kode berikut:

```scss
// berkas scss
$dracula-bg: #282a36;
$dracula-fg: #f8f8f2;

$text: $dracula-fg;
$background: $dracula-bg;

@import '~bulma/bulma';
```

Pun setelah saya timpa tema bawaan Bulma, kalian seharusnya masih bisa menimpa kembali dengan warna yang kalian inginkan dengan cara yang hampir sama namun juga tetap menggunakan basis tema yang sudah saya buat, berikut contoh kodenya:

```scss
@import '~bulma-dracula/src/bulma-dracula-vars.scss';

// You can override the default Bulma Dracula variables here
$text: #fff;
$background: $000;

@import '~bulma/bulma';
```

Repositori dari Bulma Dracula dapat dilihat pada tautan [https://github.com/mazipan/bulma-dracula](https://github.com/mazipan/bulma-dracula) dan halaman demonya bisa dilihat pada [https://mazipan.github.io/bulma-dracula/](https://mazipan.github.io/bulma-dracula/).

Terima kasih, semoga bermanfaat.
