---
title: Membuat AMP Pages dengan Nuxt.js
date: '2019-06-02'
minute2read: 20
excerpt: Menceritakan bagaimana cara membuat AMP Pages untuk blog kalian dengan framework Nuxt.js
author: mazipan
published: true
featured: false
tags: [nuxt, amp]
coverImage: /thumbnail/generate-amp-pages-in-nuxtjs/amp.jpg
lang: id
enready: true
---

Menceritakan bagaimana cara membuat AMP Pages untuk blog kalian dengan framework Nuxt.js

## Sekilas Mengenai AMP

AMP (Accelerated Mobile Pages - [amp.dev ↗️](https://amp.dev)) merupakan inisiatif yang diawali oleh Google dalam membantu para publisher, developer dan para pemilik website agar bisa menyediakan website dengan kecepatan muat yang sangat cepat bahkan mendekati instan untuk device mobile. Untuk mencapai titik muat instan ini tentu tidak didapatkan secara gratis, ini dilakukan dengan peraturan ketat yang diterapkan oleh AMP. Ekstremnya bisa disebut bahwa AMP bahkan tidak memperbolehkan untuk menyisipkan sembarang skrip JavaScript ke dalam halaman website kita, ditambah dengan berbagai aturan ketat lainnya yang bisa menjamin bahwa website dengan dukungan AMP yang valid bisa tetap dimuat dengan kecepatan yang luar biasa cepat.

AMP merupakan rekomendasi yang dianjurkan oleh Google langsung karena memiliki prioritas yang baik bagi hasil pencarian Google Search. Dan dengan rampingnya teknologi di dalamnya serta ditambah bantuan _cache_ dari Google membuat AMP menjadi sangat cepat diakses dan sangat baik untuk digunakan sebagai halaman pertama bagi pengunjung yang datang dari hasil Google Search ini.

![Mazipan AMP](/thumbnail/generate-amp-pages-in-nuxtjs/mazipan-amp.png)

## Dasar-dasar Membuat AMP

Halaman AMP memang menjadi halaman yang terpisah dari halaman aslinya, ini dikarenakan terlalu banyak aturan ketat yang membuat teknologi website pada umumnya akan susah untuk membuat halaman AMP yang valid. Halaman AMP seperti ibarat halaman kopian dari halaman asli yang telah kita buat sebelumnya namun dengan memenuhi berbagai aturan yang telah ditetapkan oleh AMP.

Untuk membuat halaman AMP pertama kita, pertama kita perlu menambahkan identifikasi pada tag `html` bahwa halaman tersebut merupakan versi AMP.

Bila sebelumnya kita menulis html seperti berikut:

```html
<html>
  <head></head>
  <body></body>
  <html></html>
</html>
```

Maka di AMP kita akan menambahkan emoji ⚡ pada tag `html` seperti berikut:

```html
<html ⚡>
  <head></head>
  <body></body>
  <html></html>
</html>
```

Atau bila kita tidak senang menggunakan emoji bisa menggantinya dengan atribut `amp` tanpa perlu mengisi nilai apapun pada atribut tersebut.

Setelahnya kita bisa menambahkan skrip utama untuk mendukung AMP dengan menambahkan kode berikut:

```html
<script async src="https://cdn.ampproject.org/v0.js"></script>
```

Serta menambahkan CSS wajib atau disebut _boilerplate_ untuk halaman AMP berikut:

```html
<style amp-boilerplate>
  body {
    -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
    -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
    -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
    animation: -amp-start 8s steps(1, end) 0s 1 normal both;
  }
  @-webkit-keyframes -amp-start {
    from {
      visibility: hidden;
    }
    to {
      visibility: visible;
    }
  }
  @-moz-keyframes -amp-start {
    from {
      visibility: hidden;
    }
    to {
      visibility: visible;
    }
  }
  @-ms-keyframes -amp-start {
    from {
      visibility: hidden;
    }
    to {
      visibility: visible;
    }
  }
  @-o-keyframes -amp-start {
    from {
      visibility: hidden;
    }
    to {
      visibility: visible;
    }
  }
  @keyframes -amp-start {
    from {
      visibility: hidden;
    }
    to {
      visibility: visible;
    }
  }</style
><noscript
  ><style amp-boilerplate>
    body {
      -webkit-animation: none;
      -moz-animation: none;
      -ms-animation: none;
      animation: none;
    }
  </style></noscript
>
```

Perlu diketahui bahwa kita tidak boleh menambahkan skrip JavaScript apapun selain yang sudah dibuatkan oleh AMP sendiri atau biasa dikenal dengan komponen AMP, jadi kita diharuskan untuk menghapus semua link untuk memuat berbagai JavaScript.

Pun dengan CSS, tidak diperbolehkan bagi kita untuk memuat eksternal CSS sehingga harus menghapus semua link yang memuat CSS dari luar. Bila kita membutuhkan CSS tambahan, kita bisa menggunakan internal CSS dengan tag `style` dengan atribut wajib yakni `amp-custom` seperti contoh berikut:

```html
<style amp-custom>
  .custom-class {
  }
</style>
```

Dalam menggunakan CSS pun ada hal yang perlu diperhatikan, seperti tidak bolehnya kita menggunakan `!important`.

Pada dasarnya kita bebas menggunakan berbagai tag HTML pada halaman AMP kita, namun dengan aturan ketat AMP yang meyarankan untuk menggunakan komponen yang telah mereka buat untuk membangun berbagai hal umum, maka ada baiknya bila kita sempatkan untuk membaca halaman dokumen resmi dari AMP mengenai komponen apa saja yang telah disediakan dan bisa kita gunakan pada halaman AMP. Selengkapnya silakan baca di halaman [komponen AMP ↗️](https://amp.dev/documentation/components/?format=websites).

## Membuat AMP di Nuxt.js

Awalnya merupakan hal yang sangat sulit untuk membangun halaman AMP yang valid dengan menggunakan framework yang berbasiskan JavaScript, ini dikarenakan AMP sendiri melarang penggunaan JavaScript yang justru pada framework tersebut telah menjadi sebuah tulang punggung dari website kita.

Namun dengan perkembangan framework JavaScript akhir-akhir termasuk Nuxt.js di dalamnya, hal yang tadinya tidak terfikirkan untuk dikerjakan menjadi mungkin meskipun masih tergolong rumit tertutama bagi para pengembang web pendatang baru.

Untuk blog saya sendiri memang dibangun diatas Nuxt.js yang memanfaatkan kemampuan untuk memproduksi file statis sehingga lebih mudah bagi saya untuk menyajikan website ini. Sayangnya file statis hasil buatan Nuxt.js masih mengandung eksternal JavaScript dan CSS yang sudah kita bahas bahwa hal ini dilarang dalam sebuah halaman AMP. Jadi hal berat yang akan kita kerjakan adalah melakukan pembersihan terhadap halaman AMP yang dihasilkan oleh Nuxt.js ini.

Berikut langkah-langkah yang saya kerjakan untuk membuat halaman AMP untuk blog saya:

### 1. Membuat halaman baru

Karena halaman AMP merupakan kloningan halaman aslinya maka kita perlu membuat halaman baru yang kontennya mendekati konten aslinya. Saya membuat semua halaman AMP berada dibawah satu akar URL yang sama yakni `/amp/**` agar mudah bagi saya untuk mendeteksi mana halaman asli dan mana halaman AMP.

### 2. Hapus kode yang tidak diperlukan

Karena di AMP nantinya kita akan menghapus semua penggunaan Javascript, maka kode-kode di bawah `methods` pada halaman AMP yang mana kebanyakan merupakan fungsi-fungsi yang mendukung interaktitas sebuah halaman website menjadi tidak diperlukan lagi. Dan karena saya juga tidak suka memelihara kode yang tidak diperlukan lagi, maka menghapus adalah pilihan terbaik yang bisa dikerjakan.

### 3. Menambahkan hook saat generate

Saya memanfaatkan fungsi `generate` milik Nuxt untuk memproduksi file statis blog saya, karenanya saya perlu menambahkan hook pada saat Nuxt melakukan proses ini agar hasilnya bisa saya manipulasi nantinya.

Untuk melakukan hal diatas saya perlu menambahkan kode berikut di berkas `nuxt.config.js`:

```javascript
module.exports = {
  hooks: {
    'generate:page': (page) => {
      if (/^\/amp/gi.test(page.route)) {
        console.log('processing amp file: ', page.route);
      }
    },
  },
};
```

Kode diatas membuat kita bisa menyelipkan sebuah proses ketika Nuxt melakukan proses `generate` dan saya menambahkan sebuah _RegEx_ untuk mendeteksi hanya halaman AMP saja yang akan diselipkan proses tambahan sementara untuk halaman normal kita tidak memerlukan.

### 4. Memanipulasi HTML

Dari kode pada bagian sebelumnya kita mendapatkan objek `page` yang bila kita ambil property `page.html` adalah merupakan string HTML yang nantinya akan dijadikan file HTML sebagai keluaran akhir.

Syukurnya saya menemukan artikel dari [toor.co ↗️](https://toor.co/blog/amp-pages-using-nuxt-js/) yang dari situ kita bisa temukan dasar dari fungsi yang bisa memanipulasi HTML string agar mendukung AMP.

Fungsinya kurang lebih seperti berikut:

```javascript
const ampScript = '<script async src="https://cdn.ampproject.org/v0.js"></script>';
const ampBoilerplate =
  '<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>';

module.exports = (html) => {
  // Add ⚡ to html tag
  html = html.replace(/<html/gi, '<html ⚡');

  // Combine css into single tag
  let styleConcat = '';
  html = html.replace(/<style[^>]*data-vue-ssr[^>]*>(.*?)?<\/style>/gi, (match, sub) => {
    styleConcat += sub;
    return '';
  });
  html = html.replace('</head>', `<style amp-custom>${styleConcat}</style></head>`);

  // Remove preload and prefetch tags
  html = html.replace(/<link[^>]*rel="(?:preload|prefetch)?"[^>]*>/gi, '');

  // Remove amphtml tag
  html = html.replace(/<link[^>]*rel="(?:amphtml)?"[^>]*>/gi, '');

  // Remove data attributes from tags
  html = html.replace(/\s*data-(?:[^=>]*="[^"]*"|[^=>\s]*)/gi, '');

  // Remove JS script tags except for ld+json
  html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, (match) => {
    return /application\/ld\+json/gi.test(match) ? match : '';
  });

  // Replace img tags with amp-img
  html = html.replace(/<img([^>]*)>/gi, (match, sub) => {
    return `<amp-img ${sub} layout=intrinsic></amp-img>`;
  });

  // Add AMP script before </head>
  html = html.replace('</head>', ampScript + ampBoilerplate + '</head>');

  return html;
};
```

Seperti kalian bisa baca di bagian komentar pada kode diatas, bahwa kode diatas melakukan berbagai proses penggantian karakter (_replace_) menggunakan _RegEx_ seperti menambahkan emoji ⚡, menggabungkan semua CSS internal ke dalam satu tag `<style amp-custom>`, menghilangkan berbagai JavaScript eksternal, menambahkan skrip utama dan CSS boilerplate AMP serta berbagai hal lainnya.

Fungsi ini saya letakan di direktory `plugins/ampify.js` yang kemudian dipanggil pada hook generate seperti berikut:

```javascript
const ampify = require('./plugins/ampify');

module.exports = {
  hooks: {
    'generate:page': (page) => {
      if (/^\/amp/gi.test(page.route)) {
        console.log('processing amp file: ', page.route);
        page.html = ampify(page.html);
      }
    },
  },
};
```

### 5. Mengganti semua penggunaan scoped style menjadi un-scoped

Karena saya termasuk cupu untuk bermain dengan _RegEx_ maka mengutak-atik kode yang penuh dengan _RegEx_ seperti diatas menjadi PR tersendiri.

Walhasil ketika menyadari bahwa baris kode berikut ini:

```javascript
// Remove data attributes from tags
html = html.replace(/\s*data-(?:[^=>]*="[^"]*"|[^=>\s]*)/gi, '');
```

Ternyata mengakibatkan semua kode CSS _scoped_ saya menjadi berantakan, maka pilihan terbaik adalah memindahkan semua _scoped_ CSS kedalam CSS biasa yang bersifat global. Tentu bukan hal yang mudah karena saya sudah terbiasa dimudahkan dengan kemampuan Vue yang bisa membuat _scoped_ CSS dengan sangat mudah. Pilihan menggunakan global CSS berarti memaksa saya kembali menggunakan konvensi CSS yang tetap mengedepankan prinsip _scoped_ ini seperti BEM CSS.

Langkah ini tidak perlu teman-teman ikuti bila memang teman-teman bisa melakukan modifikasi _RegEx_ agar bisa melakukan penggantian karakter dengan lebih tepat tanpa menimbulkan efek samping pada CSS.

### 6. Mengganti semua lazy load gambar

Pada halaman non-AMP, saya memanfaatkan pustaka [VueTinyLazyloadImg ↗️](https://github.com/mazipan/vue-tiny-lazyload-img) untuk melakukan lazy load pada setiap gambar yang dimuat. Sayangnya proses ini dikerjakan oleh JavaScript. Pada AMP hal ini tidak diperlukan lagi karena mereka memiliki komponen `amp-img` yang sudah mendukung lazy load.

Dengan menggunakan `amp-img` maka tag HTML saya untuk gambar menjadi tidak valid karena sebelumnya dengan pustaka yang saya gunakan diatas saya meletakan alamat gambar pada atribut `data-src` sementara pada atribut `src` hanya saya letakan gambar placeholder. Pilihan termudah adalah mengganti tag `data-src` menjadi tag `src` dan menghapus penempatan gambar placeholder pada atribut `src`.

Proses diatas bisa kita letakkan pada fungsi sebelumnya yang kita gunakan untuk melakukan penggantian karakter pada HTML string. Sebagai catatan bahwa kita perlu meletakan proses ini sebeleum penghilangan berbagai atribut `data-**` yang ada di dalam fungsi tersebut karena kita akan kehilangan atribut `data-src` bila dilakukan setelahnya.

Sementara untuk saat ini, saya memilih meletakan pada file .vue yang menjadi halaman AMP dimana disini dilakukan proses parsing konten _Markdown_ menggunakan `frontmatter-markdown-loader`.

Fungsi yang saya buat seperti berikut:

```javascript
function replaceLazyloadImg(str) {
  return str && str.replace(/"src":(?:[^=>][^"]*","data-src"|[^=>"]*)/gi, '"src"');
}
```

### 7. Menambahkan ukuran pada gambar

Ini pekerjaan yang sampai artikel ini dipublikasikan masih belum sempat saya selesaikan. Menambahkan atribut `height` dan `width` pada konten Markdown yang menyertakan gambar di dalamnya.

### 8. Menambahkan canonical

Kita perlu menautkan antara halaman AMP dengan halaman aslinya agar bisa dideteksi oleh Google bahwa halaman AMP tersebut merupakan representasi dari konten yang mana.

Caranya adalah dengan menambahkan kode seperti berikut pada head halaman AMP:

```html
<head>
  <link rel="canonical" href="alamat-halaman-asli"></link>
</head>
```

Dan kode berikut pada halaman aslinya:

```html
<head>
  <link rel="amphtml" href="alamat-halaman-amp"></link>
</head>
```

Untuk membuat dua kode diatas kita bisa menambahkan pada bagian `head()` pada file .vue dari halaman kita, seperti contoh berikut pada halaman AMP:

```javascript
export default {
  head() {
    const url = `${this.productionUrl}/${this.meta.slug}`;
    return {
      link: [{ hid: 'canonical', rel: 'canonical', href: url }],
    };
  },
};
```

Dan berikut yang saya sematkan pada halaman aslinya:

```javascript
export default {
  head() {
    const ampUrl = `${this.productionUrl}/amp/${this.meta.slug}`;
    return {
      link: [{ hid: 'amphtml', rel: 'amphtml', href: ampUrl }],
    };
  },
};
```

### 9. Menambahkan Google Analytics

Untuk menambahkan Google Analytics pada halaman AMP memang sedikit berbeda dengan halaman biasa. Secara mudahnya, menambahkan Google Analytics bisa dilakukan dengan menambahkan skrip eksternal berikut:

```html
<script
  async
  custom-element="amp-analytics"
  src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"
></script>
```

Serta menempatkan kode sederhana untuk melacak _page view_ seperti berikut:

```html
<amp-analytics type="googleanalytics">
  <script type="application/json">
    {
      "vars": {
        "account": "UA-12345678-X"
      },
      "triggers": {
        "trackPageview": {
          "on": "visible",
          "request": "pageview"
        }
      }
    }
  </script>
</amp-analytics>
```

Untuk projek kita, kita bisa menyisipkan kode ini pada skrip `ampify` kita dengan sedikit perubahan seperti berikut:

```javascript
const ampScript = `<script async src="https://cdn.ampproject.org/v0.js"></script>
<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>`;
```

Kode di atas digunakan untuk menyisipkan skrip analytics yang dibutuhkan. Dan berikutnya kita akan menyisipkan skrip tracking sebelum tag penutup `</body>`, seperti contoh berikut:

```javascript
// Add AMP analytics
html = html.replace(
  '</body>',
  `<amp-analytics type='googleanalytics'>
    <script type='application/json'>
      {
        "vars": {
          "account": "UA-12345678-X"
        },
        "triggers": {
          "trackPageview": {
            "on": "visible",
            "request": "pageview"
          }
        }
      }
    </script>
  </amp-analytics>
</body>`,
);
```

## Test Validasi Halaman AMP

Setelah proses selesai dan kalian sudah menghasilkan berkas statis yang mendukung AMP, jangan lupa untuk mengecek validasi dari halaman tersebut. Ada beberapa alternatif yang bisa kalian gunakan untuk melakukan test terhadap validasi AMP, diantaranya

- [https://search.google.com/test/amp](https://search.google.com/test/amp)
- [https://validator.ampproject.org/](https://validator.ampproject.org/)

## Repositori hasil belajar

[https://github.com/mazipan/blog-2.0 ↗️](https://github.com/mazipan/blog-2.0)

### Demikian artikel kali ini, semoga bermanfaat...
