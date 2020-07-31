---
title: JavaScript Module dan keribetannya
date: '2020-07-31'
description: Mencoba memahami keribetan dari module system di JavaScript
author: mazipan
draft: false
tags: [javascript]
image: ./images/javascript-module.png
lang: id
enready: false
---

Hal yang lucu ketika sebuah bahasa pemrograman sebesar JavaScript ternyata memiliki variasi dalam penerapan *module system*. Sebelum membaca lebih jauh, mari kita bahas bersama dahulu apa itu *module system* dan bagaimana seluk-beluknya di JavaScript hingga hari ini.

## Apa itu module system?

**Module System** adalah sebuah cara bagi bahasa pemrograman agar bisa menerapkan isolasi kode dari satu file terhadap file lain, serta memudahkan untuk menyertakan kode dari file lain ke dalam file yang membutuhkannya.

Ini adalah sistem yang sudah sangat jamak di berbagai bahasa pemrograman. Bukan barang baru, bukan juga barang mewah. Module System biasanya sudah diatur oleh bahasa itu sendiri sehingga tidak diperlukan lagi persepsi tambahan dari komunitas dan berbagai pihak dalam menerapkan *module system* di dalam suatu bahasa.

Sebelum masuk ke JavaScript, mari kita tengok ke bahasa bapaknya JavaScript, yakni Java. Agar kita bisa belajar bagaimana Java menerapkan *module system*.

Di Java, untuk menggunakan kode dari file lain baik standar dari Java maupun dari pihak lain bisa semudah dengan menambahkan `import` terhadap *package* yang dibutuhkan, contoh kodenya:

```java
import java.util.ArrayList;

class ArrayListUtilization {
  public static void main(String[] args) {
    ArrayList<Integer> myList = new ArrayList<>(3);
    myList.add(3);
    myList.add(2);
    myList.add(1);
    System.out.println(myList);
  }
}
```

Kalian bisa melihat potongan kode `import java.util.ArrayList;` pada baris paling atas, kode tersebut menandakan kalau di bawahnya kita akan menggunakan kode yang berasal dari *package* bersangkutan, dalam kasus ini ya `ArrayList`. 
Tidak perlu bingung atau khawatir bagaimana cara menghafal nama-nama *package* tersebut, di Java sebagian besar waktu koding bisa dipangkas karena dukungan IDE (*Integrated Development Environment*) yang memang sudah sangat baik.

Cara *import* seperti di atas sudah menjadi standar di Java, tidak perlu lagi ada cara lain yang membuat hal sederhana malahan menjadi membingungkan.

Berbicara soal bagaimana cara isolasi kode, dengan dukungan **Class System**-nya, di Java bukanlah barang susah. 
Ini ibarat kata, anak yang baru belajar Java pun seharusnya tahu bagaimana cara membuatnya. 
Mari kita lihat contoh kode berikut:

```java
public class Person {
  private String firstName;
  private String lastName;

  public String getFirstName() {
    return firstName;
  }

  public String getLastName() {
    return lastName;
  }
}
```

Kode di atas adalah contoh **POJO** (*Plain Old Java Object*) yakni objek entitas biasa tanpa ada tambahan logika bisnis di dalamnya. 
Dari kode tersebut di atas, kita sudah jelas tidak bisa mengakses properti `firstName` karena memang dibuat sebagai *private* sehingga hanya bisa diakses lewat internal Class itu sendiri. 
Untuk mengambil nilai dari `firstName` maka dibuatlah `getters` untuk properti ini yakni `getFirstName` yang mana dibuat agar bisa diakses dari luar.

Setelah berkaca pada Java, mari kita bawa arah tulisan ini agar spesifik pada bahasa yang menjadi idola para remaja yakni JavaScript.

## Sebelum ada module system

JavaScript sudah ada sejak lama, namun karena memang sejak lama kode JavaScript biasanya tidak begitu besar, jadi dukungan *Module System* tidak ada sedari dulu sampai belakangan ini. 
Kalau tidak ada *Module System* apakah JavaScript tidak bisa melakukan dua hal yang kita bahas di atas sebelumnya? 
Jawabnya, tentu saja bisa. Tapi ya butuh perjuangan yang lebih susah pastinya.

Jaman dulu, ketika JavaScript hanya bisa jalan di browser, satu-satunya cara untuk menyematkan suatu file ke dalam file lain adalah memanfaatkan kemampuan browser itu sendiri dalam memuat sebuah file JavaScript.

Mari kita lihat kode berikut:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>JavaScript</title>
  </head>
  <body>
    <script src="./file-1.js"></script>
    <script src="./file-2.js"></script>
  </body>
</html>
```

Kode diatas adalah cara kita dulu memanfaatkan browser untuk saling menyematkan satu file dengan file lainnya. 
Kita buat contoh misalnya di `file-1.js`, kita membuat fungsi sederhana seperti berikut:

```javascript
var person = {
  firstName: 'Irfan',
  lastName: 'Maulana',
};

function getFirstName () {
  return person.firstName;
};
```

Kita bisa menggunakan fungsi tersebut di `file-2.js` dengan cara:

```javascript
console.log(getFirstName())
```

Hal di atas bisa mungkin terjadi, namun sangat rapuh. 
Ini dikarenakan cara ini bergantung pada beberapa hal, diantaranya:

1. Saat kita menyematkan kode `<script src="./file-1.js"></script>`, kita harus memastikan bahwa kita tidak menambahkan atribut `async` karena akan membuat urutan muat menjadi tidak bisa diprediksi. 
Sementara pada kasus kode di atas, `file-1.js` haru dimuat terlebih dahulu sebelum kita bisa menggunakan di `file-2.js`.

2. Fungsi `getFirstName` dalam `file-1.js` harus dalam keadaan ter-ekspose dan tidak tertutupi fungsi lain. 
Ini mungkin secara tidak sadar kita sudah melakukannya, karena semua fungsi yang didefinisikan pada alur paling luar di sebuah file JavaScript akan otomatis ter-ekspose ke object global atau `window` di browser.

3. Property `person.firstName` di dalam `file-1.js` ini telanjang dan bisa diubah oleh siapapun.

Dari ketiga hal di atas, sudah terbayang keribetan yang akan terjadi ketika jumlah file JavaScript mulai membengkak semakin banyak. 
Lantas apakah ada solusinya? Tentu saja ada. 
Meskipun untuk masalah No. 1 mungkin belum ada solusinya, namun untuk masalah No.2 dan 3 bisa diselesaikan dengan implementasi [IIFE (Immediately Invoked Function Expression)](https://developer.mozilla.org/en-US/docs/Glossary/IIFE).

Dari kode `file-1.js` di atas, kita bisa mengubahnya dengan implementasi IIFE menjadi:

```js
var person = (function () {
  var firstName = 'Irfan';
  var lastName = 'Maulana';
  return {
    getFirstName: function () {
      return firstName;
    }
  };
})();
```

Sehingga kita juga perlu mengubah cara pemanggilan pada `file-2.js` menjadi:

```js
console.log(person.getFirstName())
```

Dengan cara ini kita memastikan bahwa fungsi lain tidak bisa mengubah secara langsung isi dari properti `firstName`. 
Seperti dibahas sebelumnya, karena memang secara bahasa belum ada dukungan untuk *module system*, maka penggunaan IIFE ini pun menjadi sangat populer terutama untuk kalangan yang memang peduli dengan isolasi kode. 
Pada jaman kejayaan `jQuery`, sudah sangat umum kita melihat kode-kode semacam ini:

```js
// IIFE di jQuery
;(function($) {
  var myPrivateFunction = function() {
  };
  var init = function() {
    myPrivateFunction();
  };
  $(init);
})(jQuery);
```

Tentu dengan pemanfaatan berbagai macam Design Pattern yang mumpuni bisa tercipta pustaka kelas wahid layaknya `jQuery`, `Dojo`, `ExtJS`, `YUI` dan gerombolannya bermodalkan kemampuan JavaScript mengisolasi kode menggunakan IIFE.

## AMD

AMD (*The Asynchronous Module Definition*) adalah cara pendefinisian module pada JavaScript yang memungkinkan suatu module atau file beserta dependensinya dimuat secara asinkron. 
Ini bukan merupakan *module system* standar yang dibuat oleh JavaScript sebagai bahasa, melainkan dikembangkan oleh komunitas yang diawali dengan kemunculan [RequireJS](https://requirejs.org/).

AMD idenya ingin memperbaiki cara browser memuat file JavaScript dan semua dependency-nya. 
Karena implementasinya diatas browser dan dikirim dalam bentuk sebuah pustaka seperti `RequireJS` yang kita sebutkan sebelumnya maka tidak lagi diperlukan sebuah *build tools* untuk membangun aplikasi kompleks berdasarkan AMD ini.
Kita tinggal menambahkan pustaka RequireJS dan mendefinisikan *module system* AMD, dan di atas browser, RequireJS akan melakukan permintaan asikron terhadap dependensi yang dibutuhkan.

Berikut contoh kode dari website `RequireJS`:

```js
//Calling define with module ID, dependency array, and factory function
define('myModule', ['dep1', 'dep2'], function (dep1, dep2) {
  //Define the module value by returning a value.
  return function () {};
});
```

Bagi yang pernah menggunakan `AngularJS` mungkin kode ini terasa familiar, meskipun sebenarnya `AngularJS` tidak melakukan pemuatan dependensi secara otomatis melainkan hanya mendefinisikan dependensi dengan cara yang mirip dengan `RequireJS`.

AMD menjadi satu-satunya pilihan bagi pengguna JavaScript yang mendambakan *module system* pada saat itu. Dengan AMD kita bisa mengisolasi kode kita dari satu file dengan file lainnya karena hampir semua kode kita di definisikan di dalam fungsi pembungkus dari pustaka yang menerapkan sistem ini semacam RequireJS.
Ditambah kemampuannya yang bisa otomatis memuat dependensi yang dibutuhkan langsung di browser, AMD pada akhirnya memiliki masanya sendiri pada waktu itu.

Karena bukan *module system* resmi, maka bisa dimaklumi kalau cara ini tidak begitu populer di kalangan pengguna JavaScript, meskipun sampai saat ini masih ada sedikit penggunanya, bahkan di beberapa build tools modern sampai saat ini masih mendukung target kompilasi ke dalam *module system* AMD. 
Saat ini pengguna AMD besar salah satunya adalah [Dojo](https://dojotoolkit.org/documentation/tutorials/1.10/hello_dojo/index.html).

## CommonJS

[CommonJS (CJS)](http://www.commonjs.org/) ini lagi-lagi bukanlah *module system* standar yang diperkenalkan JavaScript sebagai bahasa. 
Ini merupakan *module system* yang dijadikan standar oleh Node.js ketika harus berurusan dengan kode-kode Node.js. 
Ya, memang untuk kode Server Side seperti Node.js, *module system* adalah barang wajib. 
Karena pada saat itu belum ada *module system* yang bisa digunakan maka dari itu Node.js membuat standar sendiri untuk lingkungannya.

CommonJS menurut saya pribadi adalah revolusi, JavaScript yang tadinya tidak pernah memikirkan soal standarisasi module system mau tidak mau harus mulai memikirkannya.
Kalau tidak ya sudah pasti implementasi lain seperti CommonJS akan muncul di masa depan dengan pendekatan yang bisa jadi berbeda lagi.
Meskipun secara desain CommonJS memang tidak diperuntukkan untuk JavaScript secara umum yang bisa jalan di berbagai environment, melainkan hanya dikhususkan bagi pengguna JavaScript dengan lingkungan Node.js saja.
Namun seiring naiknya popularitas Node.js, semakin banyak pula orang maupun pembuat pustaka di luaran yang menerapkan CommonJS sebagai target build mereka.

Satu sisi lain CommonJS juga bisa dilihat sebagai malapetaka bagi JavaScript, ketika hal yang bukan standar tapi sudah keburu populer karena memang dari sisi standarisasi belum menyediakan fiturnya.
CommonJS menjadi hal lumrah dan seolah menjadi standar dari JavaScript padahal hanya bisa jalan di Node.js.
Hal semacam ini bisa jadi membingungkan bagi kalian yang baru belajar JavaScript atau Node.ja dan tidak tau sejarah sampai adanya CommonJS.

Kode CommonJS bisa terlihat pada contoh berikut:

```js
const fs = require('fs')

fs.writeFile('pesan.txt', 'Sebuah pesan untuk seseorang', 'utf8', (err) => {
  if (err) throw err;
  console.log('Berhasil disimpan!');
});
```

Setidaknya terdapat 2 cara untuk mendefinisikan sebuah modul CommonJS yakni dengan `exports` dan `module.exports`. 
Keduanya sedikit agak berbeda, berikut dilihat dan dipelajari lewat contoh kode berikut:

```js
// file circle.js
const { PI } = Math;

exports.area = (r) => PI * r ** 2;
exports.circumference = (r) => 2 * PI * r;
```

Kita bisa menggunakan modul di atas dengan:

```js
const circle = require('./circle.js');

const area = circle.area(4);
console.log(`The area of a circle of radius 4 is ${area}`);
```

Sedangkan menggunakan `module.exports` bisa dilihat dari kode berikut:

```js
module.exports = class Square {
  constructor(width) {
    this.width = width;
  }

  area() {
    return this.width ** 2;
  }
};
```

Dipanggil pada file lain dengan:

```js
const Square = require('./square.js');
const mySquare = new Square(2);
console.log(`The area of mySquare is ${mySquare.area()}`);
```

Karena dikembangkan oleh Node.js maka mindset dari *module system* ini memang *Server Side* dan bukan *Client Side*. 
Karenanya pada masanya ada *bundler* semacam [Browserify](http://browserify.org/) dan [SystemJS](https://github.com/systemjs/systemjs) yang populer untuk memastikan module CommonJS bisa berjalan di browser.

## ESM

**ESM (ES Module)** atau beberapa orang menyebutnya juga dengan **ES Harmony** merupakan format standar yang diberikan oleh ECMA seperti bisa dilihat pada [dokumen spesifikasi](https://tc39.es/ecma262/#sec-modules). 
Karena ESM merupakan standar yang diberikan oleh ECMA, maka mau tidak mau Node.js pun harus sudah mulai mendukung *module system* ini. 
Syukurnya di versi teranyarnya (sedari versi 14 kalau tidak salah) Node.js sudah memasukkan dukungan terhadap ESM, sehingga tidak perlu lagi menambahkan *build tools* semacam webpack lagi kalau ingin koding dengan ESM di lingkungan Node.js.

Berikut contoh kode ES Module:

```js
const firstName = 'Irfan';
const lastName = 'Maulana';

export const getFirstName() {
  return firstName;
};

export const getLastName() {
  return lastName;
};

export default function() {
  return firstName + ' ' + lastName;
};
```

Dan bisa digunakan pada file lain dengan cara:

```js
import fullName, { getFirstName, getLastName } from './file-1';
```

Ada artikel menarik dengan visualisasi yang bagus kalau kalian ingin memahami perihal ES Module ini, silahkan baca artikel "[ES modules: A cartoon deep-dive](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/)".

ESM juga telah didukung secara native di beberapa peramban modern dengan memberikan atribut tambahan `module` pada saat memuat berkas, baca kabarnya di artikel "[ECMAScript modules in browsers](https://jakearchibald.com/2017/es-modules-in-browsers/)". 

Berikut adalah contoh kode implementasi ESM di browser:

```html
<script type="module">
  import {addTextToBody} from './utils.mjs';

  addTextToBody('Modules are pretty cool.');
</script>
```

```js
// utils.mjs
export function addTextToBody(text) {
  const div = document.createElement('div');
  div.textContent = text;
  document.body.appendChild(div);
}
```

## UMD

[UMD (Universal Module Definition)](https://github.com/umdjs/umd/) merupakan format yang dibuat sebagai adapter dikarenakan ada perbedaan *module system* pada kode Server dan kode Klien dan beberapa *module system* yang memang terlanjur populer karena dibawa oleh komunitas. 
Format ini sering digunakan sebagai *fallback* oleh beberapa *bundler* seperti Rollup dan Webpack.

Contoh kode UMD bisa dilihat pada kode berikut:

```js
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery", "underscore"], factory);
    } else if (typeof exports === "object") {
        module.exports = factory(require("jquery"), require("underscore"));
    } else {
        root.Requester = factory(root.$, root._);
    }
}(this, function ($, _) {
    var Requester = {
    
    };

    return Requester;
}));
```


## Kesimpulan

Di JavaScript saat ini *module system* standar yang digunakan adalah ES Module.
Kendati demikian, masih banyak kode yang menggunakan baik CommonJS, AMD bahkan manual menggunakan IIFE.

Kita sebagai developer JavaScript mestinya mengetahui perbedaan *module system* yang kadung sudah terjadi ini, sehingga kedepannya kita bisa mengambil keputusan ketika harus memilih *module system* mana yang ingin didukung.

---

Demikian, semoga bermanfaat
