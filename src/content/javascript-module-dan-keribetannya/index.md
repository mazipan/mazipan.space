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

Hal yang lucu ketika sebuah bahasa pemrograman sebesar JavaScript ternyata memiliki variasi dalam penerapan *module system*. Sebelum membaca lebih jauh, mari kita bahas bersama dahulu apa itu module system dan bagaimana seluk-beluknya di JavaScript hingga hari ini.

## Apa itu module system

Module System adalah sebuah cara bagi bahasa pemrograman agar bisa menerapkan isolasi kode dari satu file terhadap file lain, serta memudahkan untuk menyertakan kode dari file lain ke dalam file yang membutuhkannya.

Ini adalah sistem yang sudah sangat jamak di berbagai bahasa pemrograman. Bukan barang baru, bukan juga barang mewah. Module System biasanya sudah diatur oleh bahasa itu sendiri sehingga tidak diperlukan lagi persepsi tambahan dari komunitas dan berbagai pihak dalam menerapkan module system di dalam suatu bahasa.

Sebelum masuk ke JavaScript, mari kita tengok ke bahasa bapaknya JavaScript, yakni Java. Agar kita bisa belajar bagaimana Java menerapkan module system.

Di Java untuk menggunakan kode dari file lain baik standard dari Java maupun dari pihak lain bisa semudah dengan menambahkan `import` terhadap package yang dibutuhkan, contoh kodenya:

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

Kalian bisa melihat kode `import java.util.ArrayList;` pada baris paling atas, kode tersebut menandakan kalau di bawahnya kita akan menggunakan kode yang berasal dari package `ArrayList`. Tidak perlu bingung bagaimana cara menhafal nama package tersebut, di Java sebagian besar waktu koding bisa dipangkas karena dukungan IDE (*Integrated Development Environment*) yang memang sudah sangat baik.

Cara import seperti itu sudah jadi standar di Java, tidak perlu lagi ada cara lain yang membuat hal sederhana malahan menjadi membingungkan.

Berbicara soal bagaimana cara isolasi kode, dengan dukungan Class System-nya di Java bukanlah barang susah. Ini anak yang baru belajar Java pun tau bagaimana cara membuatnya. Mari kita lihat contoh kode berikut:

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

Kode di atas adalah contoh POJO (*Plain Old Java Object*) yakni objek entitas biasa tanpa ada tambahan logika bisnis di dalamnya. Dari kode tersebut di atas, kita sudah jelas tidak bisa mengakses properti `firstName` karena memang dibuat sebagai private sehingga hanya bisa diakses lewat internal Class itu sendiri. Untuk mengambil nilai dari `firstName` maka dibuatlah `getters` untuk properti ini yakni `getFirstName` yang mana dibuat agar bisa diakses dari luar.

Setelah berkaca pada Java, mari kita bawa arah tulisan ini agar spesifik pada bahasa yang menjadi idola para remaja yakni JavaScript.

## Sebelum ada module system

JavaScript sudah ada sejak lama, namun karena memang sejak lama kode JavaScript biasanya tidak begitu besar jadi dukungan Module System tidak ada sedari dulu sampai belakangan ini. Jadi kalau tidak ada Module System apakah JavaScript tidak bisa melakukan dua hal yang kita bahas di atas sebelumnya? Tentu saja bisa.

Jaman dulu, ketika JavaScript hanya bisa jalan di browser satu-satunya cara untuk menyematkan suatu file ke dalam file lain adalah memanfaatkan kemampuan browser itu sendiri dalam memuat sebuah file JavaScript.

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

Kode diatas adalah cara kita dulu memanfaatkan browser untuk saling menyematkan satu file dengan file lainnya. kita buat contoh misalnya di `file-1.js` kita membuat fungsi sederhana seperti berikut:

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

Hal di atas bisa mungkin terjadi, namun sangat rapuh. Ini dikarenakan cara ini bergantung pada beberapa hal, diantaranya:

1. Saat kita menyematkan kode `<script src="./file-1.js"></script>`, kita harus memastikan bahwa kita tidak menambahkan atribut `async` karena akan membuat urutan muat menjadi tidak bisa diprediksi. Sementara pada kasus kode di atas, `file-1.js` haru dimuat terlebih dahulu sebelum kita bisa menggunakan di `file-2.js`.

2. Fungsi `getFirstName` dalam `file-1.js` harus dalam keadaan ter-ekspose dan tidak tertutupi fungsi lain. Ini mungkin secara tidak sadar kita sudah melakukannya, karena semua fungsi yang didefinisikan pada alur paling luar di sebuah file JavaScript akan otomatis ter-ekspose ke object global atau `window` di browser.

3. Property `person.firstName` di dalam `file-1.js` ini telanjang dan bisa diubah oleh siapapun.

Dari ketiga hal di atas, sudah terbayang keribetan yang akan terjadi ketika jumlah file JavaScript mulai membengkak semakin banyak. Lantas apakah ada solusinya? Tentu saja ada. Meskipun untuk masalah No. 1 belum ada solusinya, namun untuk masalah No.2 dan 3 bisa diselesaikan dengan implementasi [IIFE (Immediately Invoked Function Expression)](https://developer.mozilla.org/en-US/docs/Glossary/IIFE).

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

Dengan cara ini kita memastikan bahwa fungsi lain tidak bisa mengubah secara langsung isi dari properti `firstName`. Karena memang secara bahasa belum ada dukungan untuk module system, maka penggunaan IIFE ini pun menjadi sangat populer terutama untuk kalangan yang memang peduli dengan isolasi kode. Pada jaman kejayaan `jQuery`, sudah sangat umum kita melihat kode-kode semacam ini:

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

AMD (*The Asynchronous Module Definition*) adalah cara pendefinisian module pada JavaSAcript yang memungkinkan suatu module beserta dependensinya dimuat secara asinkron. Ini bukan merupakan module system standar yang dibuat oleh JavaScript sebagai bahasa, melainkan dikembangkan oleh komunitas yang diawali dengan kemunculan [RequireJS](https://requirejs.org/).

AMD idenya ingin memperbaiki cara browser memuat file JavaScript dan semua dependency-nya. Karena implementasinya diatas browser dan dikirim dalam bentuk sebuah pustaka seperti `RequireJS` yang kita sebutkan sebelumnya maka tidak diperlukan sebuah build tools untuk membangun aplikasi kompleks berdasarkan AMD ini.

Berikut contoh kode dari website `RequireJS`:

```js
//Calling define with module ID, dependency array, and factory function
define('myModule', ['dep1', 'dep2'], function (dep1, dep2) {
  //Define the module value by returning a value.
  return function () {};
});
```

Bagi yang pernah menggunakan `AngularJS` mungkin kode ini terasa familiar, meskipun sebenarnya `AngularJS` tidak melakukan load dependency secara otomatis melainkan hanya mendefinisikan dependency dengan cara yang mirip dengan `RequireJS`.

Karena bukan module system resmi, maka bisa dimaklumi kalau cara ini tidak begitu populer di kalangan pengguna JavaScript, meskipun sampai saat ini masih ada sedikit penggunanya, bahkan di beberapa build tools modern sampai saat ini masih mendukung target kompilasi ke dalam module system AMD. Saat ini pengguna AMD besar salah satunya adalah [Dojo](https://dojotoolkit.org/documentation/tutorials/1.10/hello_dojo/index.html).

## CommonJS

[CommonJS (CJS)](http://www.commonjs.org/) ini lagi-lagi bukanlah module system standar yang diperkenalkan JavaScript sebagai bahasa. Ini merupakan module system yang dijadikan standar oleh Node.js ketika harus berurusan dengan kode-kode Node.js. Ya, memang untuk kode Server Side seperti Node.js, module system adalah barang wajib. Karena pada saat itu belum ada module system yang bisa digunakan maka dari itu Node.js membuat standar sendiri untuk lingkungannya.

Kode CommonJS bisa terlihat pada contoh berikut:

```js
const fs = require('fs')

fs.writeFile('pesan.txt', 'Sebuah pesan untuk seseorang', 'utf8', (err) => {
  if (err) throw err;
  console.log('Berhasil disimpan!');
});
```

Setidaknya terdapat 2 cara untuk mendefinisikan sebuah CommonJS module dengan `exports` dan `module.exports`. Keduanya sedikit agak berbeda, berikut contoh kodenya:

```js
// file circle.js
const { PI } = Math;

exports.area = (r) => PI * r ** 2;
exports.circumference = (r) => 2 * PI * r;
```

Kita bisa menggunakan dengan:

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

Karena dikembangkan oleh Node.js maka mindset dari module system ini memang Server Side dan bukan Client Side. Karenanya pada masanya ada bundler semacam [Browserify](http://browserify.org/) dan [SystemJS](https://github.com/systemjs/systemjs) yang populer agar bisa jalan di browser.

## ESM

ESM (ES Module) merupakan format standard yang diberikan ECMA seperti bisa dilihat pada [dokumen spesifikasi](https://tc39.es/ecma262/#sec-modules). Karena ESM merupakan standard yang diberikan oleh ECMA, Node.js pun sudah mulai mendukung module system ini di versi teranyarnya tanpa perlu lagi menambahkan build tools dengan target CommonJS lagi.

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

Ada artikel menarik dengan visualisasi yang bagus kalau kalian ingin memahami perihal ES Module ini, silahkan baca "[ES modules: A cartoon deep-dive](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/)".

ESM juga telah didukung secara native di beberapa browser modern dengan memberikan atribut tambahan `module` pada saat memuat berkas, baca kabarnya di artikel "[ECMAScript modules in browsers](https://jakearchibald.com/2017/es-modules-in-browsers/)". Beikru contoh kodenya:

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

[UMD (Universal Module Definition)](https://github.com/umdjs/umd/) merupakan format yang dibuat sebagai adapter dikarenakan ada perbedaan module system pada kode Server dan kode Klien dan beberapa module system yang memang terlanjur populer karena dibawa oleh komunitas. Format ini sering digunakan sebagai fallback oleh beberapa bundler seperti Rollup dan Webpack.

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
    // this is where I defined my module implementation

    var Requester = { // ... };

    return Requester;
}));
```


## Kesimpulan

Di JavaScript saat ini module system standard yang digunakan adalah ES Module.
Kendati demikian, masih banyak kode yang menggunakan baik CommonJS, AMD bahkan manual menggunakan IIFE.

Kita sebegai developer JavaScript mestinya mengetahui perbedaan module system ini, sehingga bisa mengambil keputusan harus memilih module system mana ketika akan membuat kode yang akan digunakan oleh orang lain.

---

Demikian, semoga bermanfaat