---
title: Panduan Unit Testing di Vue.js
date: '2019-03-19'
minute2read: 20
excerpt: Langkah-langkah memasang dan melakukan testing pada kode Vue.js dan Nuxt.js dengan belajar dari berbagai kasus yang terjadi pada proyek nyata
author: mazipan
published: true
featured: false
tags: [javascript, testing]
coverImage: /thumbnail/unit-testing-guide-in-vuejs/commitstrip.jpg
lang: id
enready: false
---

Langkah-langkah memasang dan melakukan testing pada kode Vue.js dan Nuxt.js dengan belajar dari berbagai kasus yang terjadi pada proyek nyata

<h2 id="navigasi">Navigasi</h2>

- [Mengenai Unit Testing](#Mengenai-Unit-Testing)
- [Prinsip Utama](#Prinsip-Utama)
- [Beberapa Siklus Hidup Umum di Unit Test](#Beberapa-Siklus-Hidup-Umum-di-Unit-Test)
- [Memasang Unit Testing di Vue dan Nuxt](#Memasang-Unit-Testing-di-Vue-dan-Nuxt)
  - [Memasang Jest menggunakan Vue-CLI 3](#Memasang-Jest-menggunakan-Vue-CLI-3)
  - [Memasang Jest tanpa Vue-CLI](#Memasang-Jest-tanpa-Vue-CLI)
  - [Memasang Jest pada Nuxt dengan create-nuxt-app](#Memasang-Jest-pada-Nuxt-dengan-create-nuxt-app)
  - [Memasang Jest pada Nuxt secara manual](#Memasang-Jest-pada-Nuxt-secara-manual)
- [Perbedaan Dasar Soal Nuxt dengan Vue](#Perbedaan-Dasar-Soal-Nuxt-dengan-Vue)
- [Testing JavaScript File Sederhana](#Testing-JavaScript-File-Sederhana)
- [Testing Mounting Komponen Vue](#Testing-Mounting-Komponen-Vue)
- [Testing Method di Komponen Vue](#Testing-Method-di-Komponen-Vue)
- [Mensimulasikan Aksi Klik Elemen](#Mensimulasikan-Aksi-Klik-Elemen)
- [Testing Props di Komponen Vue](#Testing-Props-di-Komponen-Vue)
- [Testing Computed dan Watcher](#Testing-Computed-dan-Watcher)
- [Testing Event Emitter](#Testing-Event-Emitter)
- [Testing Route](#Testing-Perpindahan-Route)
  - [Testing Perpindahan Route](#Testing-Perpindahan-Route)
  - [Testing Mounting Route](#Testing-Mounting-Route)
- [Testing Vuex](#Testing-Vuex)
  - [Testing Getters](#Testing-Getters)
  - [Testing Mutations](#Testing-Mutations)
  - [Testing Actions](#Testing-Actions)
  - [Testing Vuex di Komponen](#Testing-Vuex-di-Komponen)
  - [Testing Vuex dengan Modules](#Testing-Vuex-dengan-Modules)
- [Testing dengan Vue-i18n](#Testing-dengan-Vue-i18n)
- [Testing Pemanggilan Rest API](#Testing-Pemanggilan-Rest-API)

<h2 id="Mengenai-Unit-Testing">Mengenai Unit Testing</h2>

Unit testing (UT) merupakan bagian terkecil dari proses pengetesan sebuah aplikasi perangkat lunak. UT berfokus untuk mengetest bagian terkecil sebuah aplikasi yakni potongan-potongan kode yang dibuat oleh pengembangnya, itu mengapa UT paling ideal dibuat oleh pengembang itu sendiri. Dengan mengetest kode-kode kecil di dalam sebuah aplikasi diharapkan kita bisa menghasilkan aplikasi perangkat lunak dengan kualitas yang lebih bisa dijamin.

![Unit Test Meme by commitstrip](/thumbnail/unit-testing-guide-in-vuejs/commitstrip.jpg)

[🔼 Kembali ke navigasi](#navigasi)

<h2 id="Prinsip-Utama">Prinsip Utama</h2>

Ada beberapa prinsip utama dalam melakukan unit testing, beberapa diantaranya yang dikenal dengan **FIRST**

1. **F - Fast** (Cepat), unit test harus bisa dieksekusi dengan cepat, tidak memakan waktu yang lebih lama dibandingkan ketika harus menjalankan aplikasi secara utuh untuk melakukan test manual.
2. **I - Isolated** (Dapat Diisolasi), unit test harus bisa diisolasi antar satu dengan yang lain, ketika terjadi kegagalan maka harus bisa dipastikan tidak merembet ke berkas testing pada bagian lain.
3. **R - Repeatable** (Dapat Diulang), unit testing harus bisa dijalankan kapan saja dan menghasilkan hasil yang sama. Tidak terikat pada hari tertentu, waktu tertentu atau zona waktu tertentu.
4. **S - Self-Validating** (Validasi Diri Sendiri), setiap test harus bisa menentukan sendiri apakah gagal atau berhasil menjalankan test tanpa perlu dilakukan verifikasi secara manual.
5. **T - Timely** (Tepat Waktu), test ditulis pada waktu yang tepat segera setelah kodenya selesai dibuat atau dalam praktik TDD, test dibuat terlebih dahulu untuk bisa memberi arahan yang lebih baik pada saat menulis kode.

[🔼 Kembali ke navigasi](#navigasi)

<h2 id="Beberapa-Siklus-Hidup-Umum-di-Unit-Test">Beberapa Siklus Hidup Umum di Unit Test</h2>

1. **Setup** adalah siklus dimana kita menyiapkan berbagai kebutuhan skenario test yang akan dijalankan, di Jest mungkin kita akan menggunakan sintaksis seperti `BeforeAll` atau `BeforeEach` untuk melakukan setup sebelum skenario test dijalankan.
2. **Test Execution** adalah siklus dimana test dijalankan dengan segala setup yang telah didefinisikan sebelumnya. Di Jest kita bisa menggunakan `test()` atau `it()` untuk mendefinisikan masing-masing skenario dan bisa dikelompokkan ke dalam satu grup menggunakan `describe()`.
3. **Teardown** adalah siklus dimana unit test selesai dijalankan, pada tahap ini biasanya dilakukan pembersihan dari segala macam hal yang mungkin akan mengganggu proses test selanjutnya. Hal ini dikarenakan seringkali kita akan melakukan berbagai macam trik seperti _mock_, _spy_, dan lainnya yang kalau tidak dibersihkan dikhawatirkan akan mengganggu ketika skenario selanjutnya dijalankan. Di Jest kita bisa menggunakan kait `afterEach` maupun `afterAll`.

[🔼 Kembali ke navigasi](#navigasi)

<h2 id="Memasang-Unit-Testing-di-Vue-dan-Nuxt">Memasang Unit Testing di Vue dan Nuxt</h2>

Saya akan spesifik membahas bagaimana cara memasang Unit Test pada _framework_ [Jest ↗️](https://jestjs.io/en/) beberapa kode yang akan saya sertakan pun akan spesifik pada Jest, bila Anda menggunakan _framework_ lain, bisa melihat pada referensi yang akan saya sertakan berikut:

- [Memasang unit test pada Mocha + Webpack ↗️](https://vue-test-utils.vuejs.org/guides/testing-single-file-components-with-mocha-webpack.html)
- [Memasang unit test pada Karma ↗️](https://vue-test-utils.vuejs.org/guides/testing-single-file-components-with-karma.html)

Untuk Jest sendiri berikut cara memasang Unit Test pada beberapa projek:

<h3 id="Memasang-Jest-menggunakan-Vue-CLI-3">Memasang Jest menggunakan Vue-CLI 3</h3>

- Pasang Vue-CLI 3 dengan perintah

```bash
$ yarn add @vue/cli
#atau
$ npm i -g @vue/cli
```

- Buat projek baru dengan `vue create my-project-name`. Pilih _"Manually select features"_ dan centang "Unit Testing" dan "Jest" untuk runner unit testnya, silakan lihat artikel resmi [membuat project baru dengan Vue-CLI ↗️](https://cli.vuejs.org/guide/creating-a-project.html) untuk lebih jelasnya.

- Jalankan unit test dengan perintah `yarn test:unit` dan semua konfigurasi sudah dibuatkan oleh Vue-CLI tanpa kita harus melakukan secara manual.

[🔼 Kembali ke navigasi](#navigasi)

<h3 id="Memasang-Jest-tanpa-Vue-CLI">Memasang Jest tanpa Vue-CLI</h3>

Pasang beberapa dependency untuk menjalankan unit test dengan jest berikut:

```bash
$ yarn add jest babel-jest vue-jest @vue/test-utils -D
# atau
$ npm i jest babel-jest vue-jest @vue/test-utils --dev
```

Perintah tersebut akan menambahkan dependency berikut pada projek kita:

- `jest`
- `babel-jest`
- `vue-jest`
- `@vue/test-utils`

Buat file konfigurasi untuk Jest dengan nama file `jest.config.js` dengan isi konfigurasi sebagai berikut:

```javascript
module.exports = {
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/$1',
    '^@/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js',
  },
  moduleFileExtensions: ['js', 'vue', 'json'],
  transform: {
    '^.+.js$': '<rootDir>/node_modules/babel-jest',
    '^.+.vue$': '<rootDir>/node_modules/vue-jest',
  },
};
```

Pada konfigurasi diatas, beberapa yang perlu kalian ketahui seperti `moduleNameMapper` merupakan `alias` dari direktori kita seperti yang biasa kita lakukan di `webpack`. Sementara `transform` digunakan untuk men-transpile kode sebelum diproses oleh Jest, kita gunakan `babel-jest` dan `vue-jest` untuk membaca komponen berkas tunggal (_single file component_ - **SFC**) pada Vue.

Karena kita menggunakan `babel` juga pada unit test kita, maka jika belum ada konfigurasi babel pada projek kita, silakan tambahkan konfigurasi berikut:

```javascript
// babel.config.js
module.exports = {
  presets: [['@vue/app']],
};
```

Selanjutnya kita bisa memasang kode tambahan pada `package.json` kita seperti berikut:

```javascript
{
  "scripts": {
    "test:unit": "jest"
  }
}
```

Secara bawaan, Jest akan menganggap semua berkas yang berekstensi `.spec.js` atau `.test.js` sebagai berkas unit test yang akan dijalankan pada saat perintah `jest` diketikkan.

[🔼 Kembali ke navigasi](#navigasi)

<h3 id="Memasang-Jest-pada-Nuxt-dengan-create-nuxt-app">Memasang Jest pada Nuxt dengan create-nuxt-app</h3>

Untuk memasang Jest pada Nuxt, bisa melalui `create-nuxt-app` yang bisa dilakukan dengan perintah:

```bash
$ yarn create nuxt-app my-project-name
# atau
$ npm init nuxt-app my-project-name
# atau
$ npx create-nuxt-app my-project-name
```

Pada pilihan "Choose your favorite test framework:", silakan pilih "Jest" sebagai unit test yang akan digunakan.

Jalankan unit test dengan perintah `yarn test`.

[🔼 Kembali ke navigasi](#navigasi)

<h3 id="Memasang-Jest-pada-Nuxt-secara-manual">Memasang Jest pada Nuxt secara manual</h3>

Hampir tidak ada perbedaan dengan bagian [Memasang Jest tanpa Vue-CLI ↗️](#Memasang-Jest-tanpa-Vue-CLI) pada projek Vue biasa tanpa Nuxt. Perbedaan mungkin hanya ada pada konfigurasi `babel`, karena pada Vue-CLI kita memanfaatkan babel presets dari Vue yang telah terpasang pada saat membuat projek Vue.

Kita cukup melakukan konfigurasi babel untuk environment "test" karena projek Nuxt sudah memiliki konfigurasi babel bawaan, seperti berikut contohnya:

```javascript
{
  "env": {
    "test": {
      "presets": [
        ["@babel/preset-env", {
          "targets": {
            "node": "current"
          }
        }]
      ]
    }
  }
}
```

[🔼 Kembali ke navigasi](#navigasi)

<h2 id="Perbedaan-Dasar-Soal-Nuxt-dengan-Vue">Perbedaan Dasar Soal Nuxt dengan Vue</h2>

Pada saat ingin membuat unit test untuk projek Nuxt dengan Vue ada beberapa perbedaan yang mesti kalian tau sebelumnya. Seperti kita tau bahwa Nuxt dibangun diatas Vue namun dengan banyak fitur bawaan yang mungkin saja tidak akan kalian temui pada projek Vue yang tanpa Nuxt. Beberapa perbedaan adalah Nuxt punya beberapa tag spesial yang mirip dengan Vue namun tidak akan kalian temui disana, seperti beberapa tag berikut:

```html
<nuxt></nuxt>
<nuxt-child></nuxt-child>
<nuxt-link></nuxt-link>
<no-ssr></no-ssr>
```

Selain itu Nuxt memiliki beberapa properti pada **SFC**-nya seperti berikut diantaranya:

```javascript
export default {
  head() {},
  asyncData() {},
  fetch() {},
  nuxtServerInit() {},
  validate() {},
};
```

Projek Nuxt tidak memiliki `router.js` seperti yang biasanya kita buat di projek Vue, Nuxt akan menggunakan struktur folder untuk men-_generate_ berkas router.js untuk projek kita yang letaknya ada di direktori `.nuxt`.

Beberapa projek Nuxt juga tidak melakukan _instance_ secara manual terhadap storenya, seperti biasa kita lakukan dengan kode seperti ini misalnya:

```javascript
import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      counter: 0,
    }),
    mutations: {
      increment(state) {
        state.counter++;
      },
    },
  });
};

export default createStore;
```

Dengan mengetahui beberapa perbedaan mendasar ini, nantinya akan berguna ketika kita menemui galat yang sebelumnya tidak kita temui pada projek Vue namun ternyata kita temui pada projek Nuxt.

[🔼 Kembali ke navigasi](#navigasi)

<h2 id="Testing-JavaScript-File-Sederhana">Testing JavaScript File Sederhana</h2>

Untuk mengetes berkas JavaScript biasa tentu lebih mudah dibandingkan untuk melakukan test pada file **SFC** Vue. Misalnya saja kita punya berkas `helper` dengan nama berkas `math-util.js`, di dalamnya terdapat kode seperti berikut:

```javascript
export function add(a, b) {
  return a + b;
}

export function min(a, b) {
  return a - b;
}

export function increment(a) {
  return add(a, 1);
}

export function decrement(a) {
  return min(a, 1);
}
```

Maka kita bisa membuatkan berkas untuk unit test dengan nama `math-util.spec.js` seperti berikut contohnya:

```javascript
import { add, min, increment, decrement } from '@/helpers/math-util';

describe('math-util.js', () => {
  it('`add` harus mengembalikan nilai yang benar', () => {
    expect(add(1, 2)).toBe(3);
    expect(add(2, 2)).toBe(4);
    expect(add(2, 3)).toBe(5);
    expect(add(3, 4)).toBe(7);
  });

  it('`min` harus mengembalikan nilai yang benar', () => {
    expect(min(7, 1)).toBe(6);
    expect(min(5, 2)).toBe(3);
    expect(min(4, 3)).toBe(1);
    expect(min(3, 1)).toBe(2);
  });

  it('`increment` harus mengembalikan nilai yang benar', () => {
    expect(increment(1)).toBe(2);
    expect(increment(5)).toBe(6);
    expect(increment(4)).toBe(5);
    expect(increment(8)).toBe(9);
  });

  it('`decrement` harus mengembalikan nilai yang benar', () => {
    expect(decrement(2)).toBe(1);
    expect(decrement(5)).toBe(4);
    expect(decrement(4)).toBe(3);
    expect(decrement(8)).toBe(7);
  });
});
```

[🔼 Kembali ke navigasi](#navigasi)

<h2 id="Testing-Mounting-Komponen-Vue">Testing Mounting Komponen Vue</h2>

Dalam melakukan unit testing pada **SFC**, hal pertama yang harus kita lakukan adalah memastikan kita berhasil memasang atau _mounting_ komponen tersebut ke dalam Virtual DOM yang ada di unit test. Terdengar mudah memang, tapi seringkali justru ini menjadi hal yang tersulit untuk dikerjakan karena setelah berhasil melakukan bagian ini biasanya bagian selanjutnya akan terasa lebih mudah. Untuk bisa melakukan _mounting_ kita diharuskan menyiapkan semua kebutuhan awal sebuah komponen tersebut agar bisa di-_mounting_. Cara paling bar-bar yang biasa saya lakukan adalah dengan mencoba sampai menemukan galat dan mencoba lagi sampai berhasil, tapi bila kita telah terbiasa nanti kita bisa lebih mendeteksi lebih awal kebutuhan apa saja yang harus kita siapkan untuk _mounting_ komponen tersebut.

Saya beri contoh misalkan ada komponen dengan templat seperti berikut:

```html
<template> Hello world, {{ message }} </template>
```

Dari templat tersebut, kita mesti mencari tau darimana datangnya nilai `{{ message }}` karena ini dibutuhkan pada saat pertama kali komponen tersebut nantinya dipasang. Bila datang dari `data ()` bisa jadi aman karena data akan otomatis terbuat ketika komponen dipasang, bila datang dari _props_ berarti kita perlu mengoper _props_ tersebut juga pada unit test kita.

Untuk contoh yang akan kita gunakan dalam melakukan _mounting_ komponen di unit test akan mengikuti dari contoh yang dibuat oleh tim Vue melalui Vue-CLI yang dibuatkan pada saat awal kita membuat projek baru, berikut contoh melakukan _mounting_ komponen di unit test:

katakanlah kita mempunyai berkas dengan nama `HelloWorld.vue` yang berisi templat berikut:

```html
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- banyak kode lain yang kita hilangkan karena dianggap tidak diperlukan -->
</template>
```

Dengan bagian `script` berisi kode berikut:

```javascript
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
};
```

Maka pada berkas `hello-world.spec.js` kita bisa membuat unit test sebagai berikut:

```javascript
import { shallowMount } from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld.vue';

describe('HelloWorld.vue', () => {
  it('renders props.msg ketika dilempar', () => {
    const msg = 'new message';
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
```

Dari kode diatas kita belajar dasar-dasar memasang komponen pada unit test menggunakan `@vue/test-utils`, kita menggunakan API `shallowMount` dibandingkan `mount` karena kemampuan untuk memalsukan komponen anak sehingga kita tidak perlu mendefinisikan kebutuhan dari komponen anak dari komponen tersebut dan cukup fokus untuk mendefinisikan kebutuhan komponen terkait saja. Hal ini tentu selaras dengan prinsip _isolated_ pada unit testing. Pada contoh diatas kita menambahkan opsi `propsData` untuk mengoper _props_ yang nanti akan kita bahas di bagian terpisah dibawah nanti.

[🔼 Kembali ke navigasi](#navigasi)

<h2 id="Testing-Method-di-Komponen-Vue">Testing Method di Komponen Vue</h2>

Setelah sebelumnya kita berhasil melakukan _mounting_, maka tugas berikutnya akan lebih mudah seperti yang sudah kita bahas sebelumnya. Pada bagian sebelumnya kita hanya melakukan _mounting_ komponen tanpa memanggil _method_ apapun, berikut contoh memanggil _method_ dalam Vue **SFC** melalui unit test:

Menggunkan berkas sebelumnya, kita akan menambahkan _method_ pada **SFC**-nya dan melakukan sedikit perubahan seperti berikut:

```html
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
</template>
```

Dengan bagian `script` berisi kode berikut:

```javascript
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Sebuah pesan',
    };
  },
  methods: {
    changeMessage(newMessage) {
      this.msg = newMessage;
    },
  },
};
```

Dari kode diatas, kita bisa membuatkan unit test seperti berikut:

```javascript
import { shallowMount } from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld.vue';

describe('HelloWorld.vue', () => {
  it('berhasil mounting komponen', () => {
    const msgExpected = 'Sebuah pesan';
    const wrapper = shallowMount(HelloWorld);
    expect(wrapper.vm.msg).toBe(msgExpected);
  });

  it('berhasil memanggil changeMessage', () => {
    const msgExpected = 'Sebuah pesan';
    const msgAfterChangeExpected = 'Sebuah pesan baru';
    const wrapper = shallowMount(HelloWorld);
    expect(wrapper.vm.msg).toBe(msgExpected);
    // memanggil method changeMessage
    wrapper.vm.changeMessage(msgAfterChangeExpected);
    expect(wrapper.vm.msg).toBe(msgExpected);
  });
});
```

Dari kode unit test diatas kita bisa mengetahui bahwa kita bisa langsung mengakses berbagai fitur Vue komponen lewat `wrapper.vm`, ini sama saja seperti `this` pada **SFC** yang merujuk pada _instance_ dari komponen tersebut. Kita bisa mengakses _data_, `method`, _props_, hasil dari _computed_ dan lainnya menggunakan `wrapper.vm` yang merupakan fitur `@vue/test-utils`.

[🔼 Kembali ke navigasi](#navigasi)

<h2 id="Mensimulasikan-Aksi-Klik-Elemen">Mensimulasikan Aksi Klik Elemen</h2>

Beberapa programmer tidak senang melakukan akses langsung ke _method_ tanpa melalui akses ke tampilan pengguna. Seperti pada contoh sebelumnya, unit test tersebut menjadi tidak masuk akal karena method `changeMessage` pada dasarnya tidak pernah digunakan oleh templat dan menjadi hal yang sia-sia karena kode tersebut tidak pernah mempengaruhi pengguna pada akhirnya.

Untuk mengakomodir hal ini, beberapa programmer lebih senang melakukan unit test dengan mensimulasikan apa yang harus dilakukan pengguna akhir pada aplikasi mereka tanpa mengakses ke _method_ secara langsung.

Dari contoh kode sebelumnya kita akan melakukan perubahan agar _method_ `changeMessage` menjadi berguna, seperti berikut:

```html
<template>
  <div class="hello">
    <h1 class="message">{{ msg }}</h1>
    <button
      class="btn"
      @click="changeMessage('Sebuah pesan baru')">
      Ubah pesan
    </button>
</template>
```

Dengan bagian `script` seperti berikut ini:

```javascript
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Sebuah pesan',
    };
  },
  methods: {
    changeMessage(newMessage) {
      this.msg = newMessage;
    },
  },
};
```

Dari kode diatas, kita bisa membuatkan unit test seperti berikut:

```javascript
import { shallowMount } from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld.vue';

describe('HelloWorld.vue', () => {
  it('berhasil mounting komponen', () => {
    const msgExpected = 'Sebuah pesan';
    const wrapper = shallowMount(HelloWorld);
    expect(wrapper.find('.message')).toBe(msgExpected);
  });

  it('berhasil memanggil changeMessage melalui aksi klik', () => {
    const msgExpected = 'Sebuah pesan';
    const msgAfterChangeExpected = 'Sebuah pesan baru';
    const wrapper = shallowMount(HelloWorld);
    expect(wrapper.find('.message')).toBe(msgExpected);

    // memanggil method changeMessage lewat aksi klik
    const buttonElemen = wrapper.find('.btn');
    buttonWrapper.trigger('click');

    // mengecek perubahan setelah klik
    expect(wrapper.find('.message')).toBe(msgAfterChangeExpected);
  });
});
```

Bisa dilihat perbedaanya dari cara kita melakukan test pada bagian sebelumnya dengan cara kita melakukan test pada bagian ini, pada bagian ini kita benar-benar mensimulasikan bagaimana tampilan dari komponen ini nantinya akan digunakan oleh pengguna.

Kedua cara yang kita contohkan benar dan boleh saja dilakukan. Kita bahkan bisa mengerjakan kedua cara tersebut dalam satu berkas unit test. Pilihan terserah pada Anda masing-masing. Cara pertama tentu lebih cepat apalagi kalau mengejar `coverage`, cara kedua lebih baik dan lebih berorientasi pada pengguna tapi seringkali menghabiskan lebih banyak waktu untuk dibuat.

[🔼 Kembali ke navigasi](#navigasi)

<h2 id="Testing-Props-di-Komponen-Vue">Testing Props di Komponen Vue</h2>

Sebelum melakukan test pada _props_, kita mesti mengetahui terlebih dahulu bahwa _props_ adalah sebuah nilai yang dioper oleh komponen lain, nilainya berupa satu arah yang artinya tidak bisa kita ubah secara langsung dari komponen yang menerima _props_, beberapa props sudah didefinisikan tipe data maupun struktur data yang diperbolehkan. Pada unit test kita bisa menggunakan fitur `propsData` untuk melempar _props_ pada komponen tanpa perlu membuat komponen induk terlebih dahulu, berikut contoh membuat unit test pada _props_:

```html
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{ num }}</h2>
    <h3>{{ obj.name }}</h3>
    <h4>{{ obj.desc }}</h4>
</template>
```

Dengan kode bagian `script` sebagai berikut:

```javascript
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    num: {
      type: Number,
      default: 0,
    },
    obj: {
      type: Object,
      default: () => ({
        name: '',
        desc: '',
      }),
    },
  },
};
```

Maka kita bisa membuat unit test dari kode diatas sebagai berikut:

```javascript
import { shallowMount } from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld.vue';

describe('HelloWorld.vue', () => {
  it('renders props.msg ketika dilempar', () => {
    const msgProp = 'sebuah pesan';
    const numProp = 12345;
    const objProp = {
      name: 'sebuah nama',
      desc: 'sebuah deskripsi',
    };
    const wrapper = shallowMount(HelloWorld, {
      propsData: {
        msg: msgProp,
        num: numProp,
        obj: objProp,
      },
    });
    expect(wrapper.find('h1')).toBe(msgProp);
    expect(wrapper.find('h2')).toBe(numProp);
    expect(wrapper.find('h3')).toBe(objProp.name);
    expect(wrapper.find('h4')).toBe(objProp.desc);
  });
});
```

[🔼 Kembali ke navigasi](#navigasi)

<h2 id="Testing-Computed-dan-Watcher">Testing Computed dan Watcher</h2>

Untuk melakukan test pada _computed_ dan _watch_ kita perlu mengetahui apa yang sebenarnya dilakukan keduanya di dalam Vue **SFC**. Kita akan memahami mengenai dua hal ini lewat contoh kode berikut:

```javascript
export default {
  data() {
    return {
      firstName: 'Irfan',
      lastName: 'Maulana',
    };
  },
  computed: {
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    },
  },
};
```

Kode yang sama bila kita selesaikan dengan _watch_ akan menjadi:

```javascript
export default {
  data() {
    return {
      firstName: 'Irfan',
      lastName: 'Maulana',
      fullName: '',
    };
  },
  watch: {
    firstName(newValue) {
      this.fullName = `${newValue} ${this.lastName}`;
    },
    lastName(newValue) {
      this.fullName = `${this.firstName} ${newValue}`;
    },
  },
};
```

Dari contoh kode diatas, kita bisa tau bahwa _computed_ akan mengkalkulasikan ulang nilainya pada saat suatu variabel yang digunakan dibawah fungsi _computed_ mengalami perubahan. Ciri khas dari _computed_ sendiri adalah selalu mengambalikan nilai baru yang akan menjadi bagian dari _data_, meskipun begitu nilai dari _computed_ tidak bisa kita ubah secara langsung. Nilainya hanya bisa diubah dengan melakukan perubahan pada variabel yang digunakan oleh _computed_ tersebut. Sedangkan pada _watch_ sama-sama akan dijalankan ketika terjadi perubahan pada variabel di dalamnya, hanya saja _watch_ tidak akan mengembalikan nilai baru yang bisa kita gunakan.

Berikut contoh kode untuk membuat unit test pada _computed_:

```html
<template>
  <h1>{{ fullName }}</h1>
</template>
```

Dengan bagian `script` berisi kode berikut:

```javascript
export default {
  data() {
    return {
      firstName: 'Irfan',
      lastName: 'Maulana',
    };
  },
  computed: {
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    },
  },
};
```

Dari kode tersebut kita membuat unit test berikut:

```javascript
import { shallowMount } from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld.vue';

describe('HelloWorld.vue', () => {
  it('computed seharusnya ter-trigger', () => {
    const wrapper = shallowMount(HelloWorld);
    expect(wrapper.find('h1')).toBe('Irfan Maulana');

    // nilai firstName dan lastName akan kita ubah
    wrapper.vm.firstName = 'Syamil';
    wrapper.vm.lastName = 'Al-Khawarizmi';

    // mengecek perubahan
    expect(wrapper.find('h1')).toBe('Syamil Al-Khawarizmi');
  });
});
```

Pada kasus menggunakan _watch_ bisa dilihat perubahan kodenya menjadi pada contoh kasus berikut:

```html
<template>
  <h1>{{ fullName }}</h1>
</template>
```

Dengan bagian `script` berisikan kode:

```javascript
export default {
  data() {
    return {
      firstName: 'Irfan',
      lastName: 'Maulana',
      fullName: '',
    };
  },
  watch: {
    firstName(newValue) {
      this.fullName = `${newValue} ${this.lastName}`;
    },
    lastName(newValue) {
      this.fullName = `${this.firstName} ${newValue}`;
    },
  },
};
```

Dari kode tersebut kita membuat unit test berikut:

```javascript
import { shallowMount } from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld.vue';

describe('HelloWorld.vue', () => {
  it('watch seharusnya ter-trigger', () => {
    const wrapper = shallowMount(HelloWorld);
    expect(wrapper.find('h1')).toBe('Irfan Maulana');

    // nilai firstName dan lastName akan kita ubah
    wrapper.vm.firstName = 'Syamil';
    wrapper.vm.lastName = 'Al-Khawarizmi';

    // mengecek perubahan
    expect(wrapper.find('h1')).toBe('Syamil Al-Khawarizmi');
  });
});
```

[🔼 Kembali ke navigasi](#navigasi)

<h2 id="Testing-Event-Emitter">Testing Event Emitter</h2>

Seringkali pada sebuah komponen kita harus melakukan `$emit` terhadap _event_ yang dilempar oleh komponen induknya. Masalahnya adalah ketika kita mengetest komponen anak yang seperti ini, kita sebenarnya tidak pernah tau _event_ seperti apa yang akan dilempar oleh komponen induknya. Ketidakpunyaan penglihatan kita terhadap aksi sejenis ini membuat kita tidak bisa melakukan test yang bisa kita pastikan hasilnya, karenanya kita biasanya cuma akan melakukan `Spy` terhadap fungsi seperti ini. Untungnya dari `@vue/test-utils` sudah menyediakan API yang memudahkan kita melakukan ini yakni [emitted ↗️](https://vue-test-utils.vuejs.org/api/wrapper/emitted.html).

Contoh menggunakan `emitted` sebagai berikut, misalkan kita memiliki kode:

```javascript
export default {
  methods: {
    emitSomething() {
      this.$emit('foo', 123);
    },
  },
};
```

Maka kita bisa membuatkan unit test sebagai berikut:

```javascript
import { shallowMount } from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld.vue';

describe('HelloWorld.vue', () => {
  it('memanggil $emit', () => {
    const wrapper = shallowMount(HelloWorld);
    wrapper.vm.emitSomething();
    expect(wrapper.emitted().foo).toBeTruthy();
    expect(wrapper.emitted('foo')).toBeTruthy();
  });
});
```

[🔼 Kembali ke navigasi](#navigasi)

<h2 id="Testing-Perpindahan-Route">Testing Perpindahan Route</h2>

Terkadang pada sebuah projek kita diharuskan melakukan manipulasi _route_ pada sebuah seperti menggunakan `router.push`, `router.go` atau lainnya. Sebelum kita melakukan test pada kode seperti ini, kita paling tidak mesti tau apa yang terjadi ketika kita melakukan manipulasi _router_ di Vue. Vue memanfaatkan pustaka tambahan yakni **Vue Router** untuk melakukan manipulasi _router_ yang mana diurus secara resmi oleh tim yang sama dengan yang membuat Vue inti.

Ada dua objek yang harus kita tau ketika menggunakan **Vue Router** yakni, _route_ yang bisa diakses lewat **SFC** melalui `this.$route` dan juga _router_ yang bisa diakses melalui `this.$router`. _Route_ adalah representasi posisi halaman saat ini, berupa objek yang berisi `path`, `name`, `query` dan sebagainya. Sementara _router_ merupakan objek yang bisa memanipulasi posisi _route_ tersebut. Jadi kita akan mengakses _router_ untuk mengubah _route_ dan akan mengecek _route_ untuk mengetahui apakah manipulasi tersebut berhasil ataukah tidak.

Contoh kode berikut akan memberikan gambaran mengenai dua hal tersebut:

```javascript
export default {
  methods: {
    changeRoute() {
      this.$router.push('/');
      // console.log(this.$route.path)
      // akan mencetak nilai /
    },
    changeRouteFoo() {
      this.$router.push('/foo');
      // console.log(this.$route.path)
      // akan mencetak nilai /foo
    },
    changeRouteBar() {
      this.$router.push('/bar');
      // console.log(this.$route.path)
      // akan mencetak nilai /bar
    },
  },
};
```

Dari kode diatas kita bisa membuat beberapa alternatif untuk unit test kita, antara lain sebagai berikut:

```javascript
import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import HelloWorld from '@/components/HelloWorld.vue';

const localVue = createLocalVue();
localVue.use(VueRouter);

const Foo = { template: '<div>foo</div>' };
const Bar = { template: '<div>bar</div>' };
const dummyRoutes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar },
];

describe('HelloWorld.vue', () => {
  it('mengubah $route pada komponen', () => {
    const router = new VueRouter({
      routes: dummyRoutes,
    });

    const wrapper = shallowMount(HelloWorld, {
      localVue,
      router,
    });

    // ubah $route ke /
    wrapper.vm.changeRoute();
    expect(wrapper.vm.$route.path).toBe('/');
    // ubah $route ke /foo
    wrapper.vm.changeRouteFoo();
    expect(wrapper.vm.$route.path).toBe('/foo');
    // ubah $route ke /bar
    wrapper.vm.changeRouteBar();
    expect(wrapper.vm.$route.path).toBe('/bar');
  });
});
```

Dari contoh kode unit test diatas, kita belajar untuk menggunakan `localVue` dari `@vue/test-utils`. API ini digunakan untuk menamabahkan plugin ke dalam unit test kita, seperti dijelaskan sebelumnya bahwa Vue Router merupakan pustaka luar yang harus digunakan lewat `Vue.use` ke dalam _instance_ utama dari Vue. Maka pada unit test kita memanfaatkan `localVue` untuk melakukan hal yang sama namun dalam lingkungan unit test. Selain mengoper opsi `localVue`, kita juga diharuskan melempar opsi _router_ seperti saat kita melakukan _instance_ Vue ketika menggunakan **Vue Router** seperti contoh potongan kode berikut:

```javascript
const Foo = { template: '<div>foo</div>' };
const Bar = { template: '<div>bar</div>' };

const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar },
];

const router = new VueRouter({
  routes, // short for `routes: routes`
});

const app = new Vue({
  router,
}).$mount('#app');
```

Pada contoh kode unit test yang kita buat sebelumnya kita memalsukan `routes` yang ada, pada projek Vue mungkin hal ini tidak diperlukan karena kita bisa langsung impor dari berkas `router.js` yang kita buat sebelumnya tapi pada projek Nuxt yang tidak memiliki `router.js` hal ini menjadi dibutuhkan. Namun tidak menutup kemungkinan juga kita melakukan hal seperti ini pada projek Vue, kembali pada preferensi masing-masing lebih memilih kode yang mana.

Sebagai catatan, **Vue Router** mungkin tidak akan memberikan error ketika kita memindahkan sebuah _route_ ke alamat yang tidak dikenal atau belum didefinisikan sebelumnya, namun kita bisa mengetahui apakah proses pemindahan itu berhasil atau tidak dari posisi _route_ setelah pemindahan tersebut. Bila gagal, maka posisi _route_ akan tetap sama seperti sebelumnya atau dalam kata lain tidak terjadi apa-apa pada objek _route_ tersebut.

[🔼 Kembali ke navigasi](#navigasi)

<h2 id="Testing-Mounting-Route">Testing Mounting Route</h2>

Pada beberapa kasus kalian akan memanggil `this.$route` pada siklus hidup mounted atau pada computed yang mana juga akan dikalkulasi secepatnya setelah komponen tersebut dibuat. Dengan contoh kasus seperti ini, cara yang kita gunakan seperti diatas bisa jadi akan memberikan galat pada saat melakukan render di kode unit test kita.

Untuk menyelesaikan masalah ini, kita bisa memanfaatkan fitur `mock` dari Vue Test util dengan contoh seperti kode berikut:

```javascript
const $route = {
  path: 'http://www.example-path.com',
  params: '',
  query: {},
  fullPath: '',
  // see https://router.vuejs.org/api/#route-object-properties for complete properties
};
const wrapper = shallowMount(Component, {
  mocks: {
    $route,
  },
});
expect(wrapper.vm.$route.path).toBe($route.path);
```

Hal yang perlu diperhatikan adalah bahwa kita tidak perlu lagi melempar route _bohongan_ pada saat membuat Vue Instance seperti yang sebelumnya kita kerjakan, jadi bisa cukup dengan kode berikut:

```javascript
const wrapper = shallowMount(HelloWorld, {
  localVue,
  // router // -- bagian ini tidak diperlukan lagi
});
```

[🔼 Kembali ke navigasi](#navigasi)

<h2 id="Testing-Vuex">Testing Vuex</h2>

[Vuex ↗️](https://vuex.vuejs.org/) merupakan salah satu pustaka yang sering sekali kita gunakan dalam suatu projek. Vuex menjadi satu-satunya pilihan yang paling mumpuni sebagai manajemen state pada Vue untuk saat ini. Berikut beberapa hal yang akan sering kita jumpai saat melakukan test pada aplikasi Vue yang menggunakan Vuex di dalamnya:

[🔼 Kembali ke navigasi](#navigasi)

<h3 id="Testing-Getters">Testing Getters</h3>

_Getters_ biasanya digunakan ketika kita ingin melakukan manipulasi pada state sebelum digunakan di sebuah komponen tanpa mengubah nilai asli dari state tersebut.

Contoh kode _getters_ seperti berikut:

```javascript
export default {
  state: {
    messages: [],
  },
  getters: {
    unreadMessages(state) {
      return state.messages.filter((item) => item.read === 0);
    },
    readMessages(state) {
      return state.messages.filter((item) => item.read === 1);
    },
  },
  mutations: {
    setMessageList: (state, data) => {
      state.messages = data;
    },
  },
};
```

Dari kode diatas kita mempunyai dua _getters_ yakni `unreadMessages` dan `readMessages`. Keduanya digunakan untuk mengambil spesifik nilai dari sebuah daftar di state `messages`. Getters bisa di test seperti kode JavaScript biasa tanpa perlu melakukan _instance_ Vuex Store terlebih dahulu, namun bisa juga kita test lewat _instance_ Vuex Store bila memang dibutuhkan.

Berikut contoh unit test untuk kode _getters_ diatas:

```javascript
import store from '@/store/messages';

const messages = [
  {
    id: 'pesan-1',
    text: 'sebuah pesan',
    read: 0,
  },
  {
    id: 'pesan-2',
    text: 'sebuah pesan 2',
    read: 1,
  },
  {
    id: 'pesan-3',
    text: 'sebuah pesan 3',
    read: 1,
  },
];

describe('Vuex Store: Messages', () => {
  it('unreadMessages harus mengembalikan nilai yang benar', () => {
    const result = store.getters.unreadMessages({
      messages,
    });
    const expectedResult = [
      {
        id: 'pesan-1',
        text: 'sebuah pesan',
        read: 0,
      },
    ];

    expect(result).toEqual(expectedResult);
  });

  it('readMessages harus mengembalikan nilai yang benar', () => {
    const result = store.getters.readMessages({
      messages,
    });
    const expectedResult = [
      {
        id: 'pesan-2',
        text: 'sebuah pesan 2',
        read: 1,
      },
      {
        id: 'pesan-3',
        text: 'sebuah pesan 3',
        read: 1,
      },
    ];

    expect(result).toEqual(expectedResult);
  });
});
```

[🔼 Kembali ke navigasi](#navigasi)

<h3 id="Testing-Mutations">Testing Mutations</h3>

_Mutations_ digunakan untuk mengubah nilai state, seperti kita tau bersama bahwa di Vuex terlarang untuk mengubah nilai state secara langsung. Semua perubahan state diharuskan untuk lewat _mutations_.

Contoh kode _mutations_ sebagai berikut:

```javascript
export default {
  state: {
    messages: [],
  },
  mutations: {
    setMessageList: (state, data) => {
      state.messages = data;
    },
  },
};
```

Dari kode diatas kita bisa membuatkan unit test seperti berikut:

```javascript
import store from '@/store/messages';

const messages = [
  {
    id: 'pesan-1',
    text: 'sebuah pesan',
    read: 0,
  },
  {
    id: 'pesan-2',
    text: 'sebuah pesan 2',
    read: 1,
  },
  {
    id: 'pesan-3',
    text: 'sebuah pesan 3',
    read: 1,
  },
];

describe('Vuex Store: Messages', () => {
  it('setMessageList harus mengubah nilai state messages', () => {
    let dummyState = {
      messages: [],
    };
    store.mutations.setMessageList(dummyState, messages);
    expect(dummyState.messages).toEqual(messages);
  });
});
```

Kita bisa juga melakukan test dengan menggunakan _instance_ Vuex Store untuk mengakses _mutations_ seperti berikut:

```javascript
import Vuex from 'vuex';
import store from '@/store/messages';

const $storeInstance = new Vuex.Store(store);

const messages = [
  {
    id: 'pesan-1',
    text: 'sebuah pesan',
    read: 0,
  },
  {
    id: 'pesan-2',
    text: 'sebuah pesan 2',
    read: 1,
  },
  {
    id: 'pesan-3',
    text: 'sebuah pesan 3',
    read: 1,
  },
];

describe('Vuex Store: Messages', () => {
  it('setMessageList harus mengubah nilai state messages', () => {
    // memanggil mutations lewat Vuex Instance
    $storeInstance.commit('setMessageList', messages);
    // mengecek perubahan state
    expect($storeInstance.state.messages).toEqual(messages);
  });
});
```

[🔼 Kembali ke navigasi](#navigasi)

<h3 id="Testing-Actions">Testing Actions</h3>

_Actions_ digunakan untuk mengeksekusi berbagai fungsi yang tidak berjalan sinkron (_asynchronous_), berikut contoh kode Actions:

```javascript
import axios from 'axios';

export default {
  state: {
    messages: [],
  },
  mutations: {
    setMessageList: (state, data) => {
      state.messages = data;
    },
  },
  actions: {
    async fetchMessages({ commit }, { username }) {
      const response = await axios.get('/api/messages', {
        username,
      });
      commit('setMessageList', response.data);
    },
  },
};
```

Dari kode diatas kita bisa membuatkan unit test sebagai berikut:

```javascript
import axios from 'axios';
import store from '@/store/messages';

const messages = [
  {
    id: 'pesan-1',
    text: 'sebuah pesan',
    read: 0,
  },
  {
    id: 'pesan-2',
    text: 'sebuah pesan 2',
    read: 1,
  },
  {
    id: 'pesan-3',
    text: 'sebuah pesan 3',
    read: 1,
  },
];

describe('Vuex Store: Messages', () => {
  it('fetchMessages harus mendapatkan semua data messages', () => {
    const commit = jest.fn();
    const mockFetchPromise = Promise.resolve({
      data: messages,
    });
    axios.get = jest.fn().mockResolvedValue(mockFetchPromise);

    store.actions.fetchMessages({ commit }, { username: 'dummy-username' });
    expect(commit).toHaveBeenCalledWith('setMessageList', messages);
  });
});
```

Dengan cara diatas, kita tidak bisa mengecek perubahan _state_ karena fungsi `commit` sudah di-_mock_ sehingga tidak lagi memanggil fungsi yang sesungguhnya. Untuk mengatasi kekurangan diatas kita bisa meng-_instance_ Vuex Store agar fungsi commit yang sesungguhnya bisa dipakai di unit test. Berikut contoh kodenya:

```javascript
import Vuex from 'vuex';
import axios from 'axios';
import store from '@/store/messages';

const $storeInstance = new Vuex.Store(store);

const messages = [
  {
    id: 'pesan-1',
    text: 'sebuah pesan',
    read: 0,
  },
  {
    id: 'pesan-2',
    text: 'sebuah pesan 2',
    read: 1,
  },
  {
    id: 'pesan-3',
    text: 'sebuah pesan 3',
    read: 1,
  },
];

describe('Vuex Store: Messages', () => {
  it('fetchMessages harus mendapatkan semua data messages', () => {
    const mockFetchPromise = Promise.resolve({
      data: messages,
    });
    axios.get = jest.fn().mockResolvedValueOnce(mockFetchPromise);
    // mengeksekusi actions lewat Vuex Instance
    $storeInstance.dispatch('fetchMessages', { username: 'dummy-username' });
    // mengecek perubahan state
    expect($storeInstance.state.messages).toEqual(messages);
  });
});
```

[🔼 Kembali ke navigasi](#navigasi)

<h3 id="Testing-Vuex-di-Komponen">Testing Vuex di Komponen</h3>

Bila sebelumnya kita melakukan test langsung pada berkas Vuex itu sendiri, berikutnya kita akan memberikan contoh ketika kita menggunakan Vuex di komponen. Pada dasarnya sama saja, kita hanya perlu melakukan _instance_ Vuex Store agar bisa menggunakan berbagai fitur Vuex di komponen. Bedanya hanya kita harus menambahkan `localVue` dari `@vue/test-utils` untuk memasangkan Vuex ke dalam komponen yang akan kita test. Berikut contoh kodenya:

Misalkan kita memiliki berkas Vuex seperti berikut:

```javascript
import axios from 'axios';

export default {
  state: {
    messages: [],
  },
  mutations: {
    setMessageList: (state, data) => {
      state.messages = data;
    },
  },
  actions: {
    async fetchMessages({ commit }, { username }) {
      const response = await axios.get('/api/messages', {
        username,
      });
      commit('setMessageList', response.data);
    },
  },
};
```

Dan akan digunakan di komponen `HelloWorld.vue` pada bagian templat seperti berikut:

```html
<template>
  <div>
    <h1>Contoh Vuex di Komponen</h1>
    <ul v-for="message in messages" :key="message.id">
      {{ message.text }}
    </ul>
  </div>
</template>
```

Sedangkan pada bagian `script` berisi kode berikut:

```javascript
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      username: 'dummy-username',
    };
  },
  computed: {
    ...mapState(['messages']),
  },
  methods: {
    ...mapState(['fetchMessages']),
    fireFetchMessage() {
      this.fetchMessages({
        username: this.username,
      });
    },
  },
};
```

Dari kode di atas kita bisa membuat unit test seperti berikut:

```javascript
import { shallowMount, localVue } from '@vue/test-utils';
import Vuex from 'vuex';
import HelloWorld from '@/components/HelloWorld.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

const mockFetchMessages = jest.fn();
const store = new Vuex.Store({
  state: {
    messages: [],
  },
  actions: {
    fetchMessages: mockFetchMessages,
  },
});

describe('HelloWorld.vue', () => {
  // reset semua pemalsuan (mock) setiap selesai test
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('memanggil methods fireFetchMessage', async (done) => {
    // mengoper localVue dan store
    const wrapper = shallowMount(HelloWorld, {
      store,
      localVue,
    });
    await wrapper.vm.fireFetchMessage();

    expect(mockFetchMessages).toHaveBeenCalledTimes(1);
    expect(mockFetchMessages).toHaveBeenCalledWith({
      username: 'dummy-username',
    });
    done();
  });
});
```

Pada unit test di atas saya memilih untuk melakukan _mock_ pada actions `fetchMessages` yang akan ikut terpanggil ketika kita memanggil method `fireFetchMessage`. Tujuannya agar tidak perlu berulang melakukan _mock_ pada pemanggilan Rest API yang sebenarnya sudah dikerjakan ketika membuat unit test untuk file _store_ itu sendiri. Sebenarnya kita bisa juga memilih untuk memanggil store tanpa melakukan _mock_ sehingga kodenya akan memanggil store yang sesungguhnya. berikut contoh kodenya:

```javascript
import { shallowMount, localVue } from '@vue/test-utils';
import Vuex from 'vuex';
import axios from 'axios';
import storeMessages from '@/store/messages';
import HelloWorld from '@/components/HelloWorld.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

const store = new Vuex.Store(storeMessages);

const messages = [
  {
    id: 'pesan-1',
    text: 'sebuah pesan',
    read: 0,
  },
  {
    id: 'pesan-2',
    text: 'sebuah pesan 2',
    read: 1,
  },
  {
    id: 'pesan-3',
    text: 'sebuah pesan 3',
    read: 1,
  },
];

describe('HelloWorld.vue', () => {
  // reset semua pemalsuan (mock) setiap selesai test
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('memanggil methods fireFetchMessage', async (done) => {
    const mockFetchPromise = Promise.resolve({
      data: messages,
    });
    axios.get = jest.fn().mockResolvedValueOnce(mockFetchPromise);
    // mengoper localVue dan store
    const wrapper = shallowMount(HelloWorld, {
      store,
      localVue,
    });
    await wrapper.vm.fireFetchMessage();
    process.nextTick(() => {
      expect(wrapper.vm.messages).toEqual(messages);
      done();
    });
  });
});
```

[🔼 Kembali ke navigasi](#navigasi)

<h2 id="Testing-Vuex-dengan-Modules">Testing Vuex dengan Modules</h2>

Pada projek Vue dengan skala besar dan kompleks seringkali kita melakukan scoping pada kode Vuex dengan menggunakan fitur [Vuex Modules ↗️](https://vuex.vuejs.org/guide/modules.html). Ketika kita menggunakan fitur Modules ini, maka cara kita memalsukan Vuex pada unit testing pun menjadi berbeda dengan cara kita ketika tidak menggunakan Module.

Katakanlah kita membuat Vuex Module dengan cara berikut:

```javascript
const moduleA = {
  namespace: true,
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  namespace: true,
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})
```

Maka pada unit test kita bisa memalsukan dengan cara seperti berikut:

```javascript
import { shallowMount, localVue } from '@vue/test-utils'
import Vuex from 'vuex'
import HelloWorld from '@/components/HelloWorld.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

const moduleA = {
  namespace: true,
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  namespace: true,
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  },
  state: { ... }, //  state di luar modules
  mutations: { ... }, //  mutations di luar modules
  actions: { ... } //  actions di luar modules
})

describe('HelloWorld.vue', () => {
  it('memanggil state modules dengan namespace', (done) => {
    // mengoper localVue dan store dalam shallowRender
    const wrapper = shallowMount(HelloWorld, {
      store,
      localVue
    })
    done()
  })
})
```

[🔼 Kembali ke navigasi](#navigasi)

<h2 id="Testing-dengan-Vue-i18n">Testing dengan Vue-i18n</h2>

[Vue-i18n ↗️](http://kazupon.github.io/vue-i18n/) menjadi salah satu pilihan terbaik bila kita ingin mendukung beberapa bahasa dalam sebuah projek Vue kita. Dengan Menggunakan Vue-i18n akan membuat cara kita melakukan unit test sedikit berbeda dibandingkan ketika tidak menggunakannya.

Contoh kode tamplat ketika menggunakan Vue-i18n adalah seperti berikut:

```html
<template>
  <div class="hello">{{ $t("message") }}</div>
</template>
```

Cara paling gampang melakukan test ketika melakukan test dengan Vue-i18n adalah dengan memalsukan fungsi `$t` yang biasa digunakan untuk mengambil suatu kata dari penyimpanan bahasa yang kita kerjakan.

```javascript
import { shallowMount } from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld.vue';

describe('HelloWorld', () => {
  it('renders successfully with i18n', () => {
    const wrapper = shallowMount(HelloWorld, {
      mocks: {
        $t: (msg) => msg,
      },
    });
  });
});
```

Bisa juga kita membuatnya menjadi konfigurasi global dengan menambahkan konfigurasi pada `jest.config.js` seperti:

```javascript
// untuk jest v24x
setupFilesAfterEnv: ['<rootDir>/test/setup-test.js'],
// `setupFiles` atau `setupTestFrameworkScriptFile` untuk jest 23
```

Pada file `setup-test.js`, kita bisa menambahkan `config` seperti kode berikut:

```javascript
import { config } from '@vue/test-utils';
import langEN from '@/locales/en';

const defaultLocale = 'en';

config.mocks['$t'] = (msg) => langEN[defaultLocale][msg];
```

Kedua cara ini sebenarnya bukanlah cara yang sering saya gunakan, saya lebih senang memanfaastkan `localVue` untuk memasang i18n ke dalam unit test. Berikut contoh kodenya:

```javascript
import { shallowMount, localVue } from '@vue/test-utils';
import VueI18n from 'vue-i18n';
import langEN from '@/locales/en';
import HelloWorld from '@/components/HelloWorld.vue';

localVue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'en', // set locale
  messages: {
    en: langEN,
  },
});

describe('HelloWorld', () => {
  it('renders successfully with i18n', () => {
    const wrapper = shallowMount(HelloWorld, {
      i18n,
      localVue,
    });
  });
});
```

[🔼 Kembali ke navigasi](#navigasi)

<h2 id="Testing-Pemanggilan-Rest-API">Testing Pemanggilan Rest API</h2>

Memanggil sebuah Rest API menjadi tulang punggung yang banyak digunakan saat ini sebagai media komunikasi frontend-backend. Semakin kompleks aplikasi biasanya semakin banyak pula pemanggilan ini tersebar di berbagai tempat pada projek kita.

Secara bawaan, berbagai peramban teranyar sudah mendukung Fetch API sebagai alat untuk melakukan komunikasi lewat Rest API. Namun masih populernya pustaka seperti Axios membuat kita juga perlu memberikan contoh bagaimana melakukan test pada projek yang memilih menggunakan Axios untuk melakukan komunikasi dengan Rest API.

Beberapa hal yang mesti kalian tau mengenai Fetch API dan pustaka Axios berkaitan dengan unit test yang akan dibuat nantinya antara lain:

- Fetch API akan mengembalikan dua level `Promise` yang bersarang, kalian perlu memanggil `response.json()` untuk mendapatkan Promise yang kedua, barulah di dalam Promise kedua ini kalian bisa mendapati nilai yang diinginkan.
- Fetch API merupakan API bawaan dari peramban, bisa diakses lewat objek `window` yang direfreksikan lewat objek `global` di dalam Jest.
- Menggunakan Axios kita tidak perlu menggunakan Promise dua kali.
- Response dari Axios terletak di properti _data_ dari objek `response`.
- Dalam unit test sebisa mungkin kita tidak melakukan pemanggilan Rest API yang sesungguhnya, kita cukup melakukan simulasi terjadinya pemanggilan Rest API.

Berikut contoh kode ketika kita melakukan pemanggilan Rest API menggunakan Fetch API:

```javascript
const URL = 'https://ghibliapi.herokuapp.com/films/';

export default {
  data() {
    return {
      dataResponse: [],
    };
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch(URL);
        const data = await response.json();
        this.dataResponse = data;
      } catch (error) {
        this.dataResponse = [];
      }
    },
  },
};
```

Dari kode diatas, kita bisa membuatkan unit test seperti berikut:

```javascript
import { shallowMount } from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld.vue';

describe('HelloWorld.vue', () => {
  // reset semua pemalsuan (mock) setiap selesai test
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('memanggil Rest API dengan Fetch API', async (done) => {
    const mockSuccessResponse = ['a', 'b', 'c'];
    const mockFetchPromise = Promise.resolve({
      json: () => Promise.resolve(mockSuccessResponse),
    });
    // memalsukan fungsi fetch API
    // selalu mengembalikan nilai sesuai yang diinginkan
    global.fetch = jest.fn().mockResolvedValue(mockFetchPromise);

    const wrapper = shallowMount(HelloWorld);
    await wrapper.vm.fetchData();

    // memastikan fungsi fetch dipanggil sekali
    expect(global.fetch).toHaveBeenCalledTimes(1);
    // memastikan fungsi dipanggil dengan URL yang benar
    expect(global.fetch).toHaveBeenCalledWith('https://ghibliapi.herokuapp.com/films/');
    expect(wrapper.vm.dataResponse).toEqual(mockSuccessResponse);
    done();
  });
});
```

Sedangkan kode berikut ini adalah contoh kode untuk melakukan pemanggilan Rest API menggunakan pustaka Axios:

```javascript
import axios from 'axios';
const URL = 'https://ghibliapi.herokuapp.com/films/';

export default {
  data() {
    return {
      dataResponse: [],
    };
  },
  methods: {
    async fetchDataAxios() {
      try {
        const response = await axios.get(URL);
        this.dataResponse = response.data;
      } catch (error) {
        this.dataResponse = [];
      }
    },
  },
};
```

Dengan kode diatas kita bisa membuatkan unit test sebagai berikut:

```javascript
import { shallowMount } from '@vue/test-utils';
import axios from 'axios';
import HelloWorld from '@/components/HelloWorld.vue';

describe('HelloWorld.vue', () => {
  // reset semua pemalsuan (mock) setiap selesai test
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('memanggil Rest API dengan Axios', async (done) => {
    const mockSuccessResponse = ['a', 'b', 'c'];
    const mockFetchPromise = Promise.resolve({
      data: mockSuccessResponse,
    });
    // memalsukan fungsi fetch API
    // selalu mengembalikan nilai sesuai yang diinginkan
    axios.get = jest.fn().mockResolvedValue(mockFetchPromise);

    const wrapper = shallowMount(HelloWorld);
    await wrapper.vm.fetchDataAxios();

    // memastikan fungsi fetch dipanggil sekali
    expect(axios.get).toHaveBeenCalledTimes(1);
    // memastikan fungsi dipanggil dengan URL yang benar
    expect(axios.get).toHaveBeenCalledWith('https://ghibliapi.herokuapp.com/films/');
    expect(wrapper.vm.dataResponse).toEqual(mockSuccessResponse);
    done();
  });
});
```

[🔼 Kembali ke navigasi](#navigasi)

<h2 id="Referensi">Referensi</h2>

1. [https://www.guru99.com/unit-testing-guide.html ↗️](https://www.guru99.com/unit-testing-guide.html)
2. [https://howtodoinjava.com/best-practices/first-principles-for-good-tests/ ↗️](https://howtodoinjava.com/best-practices/first-principles-for-good-tests/)
3. [https://lmiller1990.github.io/vue-testing-handbook/ ↗️](https://lmiller1990.github.io/vue-testing-handbook/)
4. [https://vue-test-utils.vuejs.org/ ↗️](https://vue-test-utils.vuejs.org/)
