---
title: Migrasi Nuxt ke TypeScript
date: '2019-05-15'
minute2read: 10
excerpt: Menceritakan beberapa langkah yang saya kerjakan ketika melakukan migrasi project Nuxt dari menggunakan JavaScript vanilla menjadi menggunakan TypeScript
author: mazipan
published: true
featured: false
tags: [nuxt, typescript]
coverImage: /thumbnail/migrate-nuxt-to-typescript/quran-offline.png
lang: id
enready: true
---

Menceritakan beberapa langkah yang saya kerjakan ketika melakukan migrasi project Nuxt dari menggunakan JavaScript vanilla menjadi menggunakan TypeScript

Seperti kita tau bersama bahwa bawaan dari project Nuxt akan membuat kode dengan basis JavaScript Vanilla. Sedangkan dengan makin maraknya penggunaan TypeScript di kalangan para pengembang JavaScript membuat saya pribadi ikut kepincut untuk mengimplementasikan penggunaan TypeScript pada projek kode sumber terbuka saya.

![Quran Offline](/thumbnail/migrate-nuxt-to-typescript/quran-offline.png)

Berikut hal-hal yang saya kerjakan dalam proses migrasi tersebut:

## Menambahkan tsconfig.json

```javascript
{
  "compilerOptions": {
    "target": "es5",
    "module": "esnext",
    "moduleResolution": "node",
    "lib": ["esnext", "esnext.asynciterable", "dom"],
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "resolveJsonModule": true,
    "allowJs": true,
    "sourceMap": true,
    "strict": true,
    "noImplicitAny": false,
    "strictNullChecks": false,
    "noEmit": true,
    "baseUrl": ".",
    "paths": {
      "~/*": ["./*"],
      "@/*": ["./*"]
    },
    "types": ["@types/jest", "@types/node", "@nuxt/vue-app"]
  },
  "exclude": [
    "nuxt.config.ts",
    "node_modules/**",
    "dist/**",
    ".nuxt/**",
    "tests/**"
  ]
}
```

Untuk menambahkan berkas ini, saya juga perlu menambahkan beberapa dependencies berikut:

```javascript
{
  "@nuxt/typescript": "2.7.1",
  "@types/jest": "24.0.13",
  "@types/node": "11.13.10",
  "typescript": "3.4.5"
}
```

## Perbarui eslintrc.js

```javascript
module.exports = {
  plugins: ['@typescript-eslint'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': 'off',
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      {
        ignores: ['nuxt', 'nuxt-link', 'nuxt-child', 'no-ssr'],
      },
    ],
    'vue/html-closing-bracket-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'never',
      },
    ],
  },
};
```

Dan menambahkan beberapa dependencies berikut:

```javascript
{
  "@nuxtjs/eslint-config": "0.0.1",
  "@typescript-eslint/eslint-plugin": "1.9.0"
}
```

## Ubah nuxt.config.js menjadi nuxt.config.ts

Ubah ekstensi file dan buat sedikit perubahan menjadi seperti berikut:

```javascript
import NuxtConfiguration from '@nuxt/config';
import { Configuration as WebpackConfiguration } from 'webpack';

const config: NuxtConfiguration = {
  mode: 'universal',
  head: {},
  build: {
    extend(config: WebpackConfiguration, ctx) {},
  },
};

export default config;
```

## Refactor Vuex Store

Karena hampir semua komponen dalam projek saya telah menggunakan Vuex Store maka dari itu saya meletakan hal ini sebagai yang pertama untuk saya refactor sebelum melakukan refactor pada komponen. Untuk menggunakan Vuex dengan TypeScript terdapat sedikit perubahan dibandingkan ketika menggunakan JavaScript biasa, berikut perubahan yang saya kerjakan:

### Classic Store

Pada projek ini saya masih menggunakan Classic Store yang mana sebenarnya sudah deprecated dan akan di remove pada Nuxt v3 kedepannya, berikut classic store yang saya buat dalam berkas `store/index.ts`:

```javascript
import Vuex from 'vuex';

import { state } from './state';
import { mutations } from './mutations';
import { actions } from './actions';

const createStore = () => {
  return new Vuex.Store({
    state: state(),
    mutations,
    actions,
  });
};

export default createStore;
```

### State

Pada berkas `state.ts` saya membuat interface yang menjadi type definitions dari state yang akan dibuat dan membuat state dengan berbagai initial state yang sudah dibuat seperti contoh berikut:

```javascript
export interface StateType {
  isShowSidebar: boolean;
}

// initial state
export const state = (): StateType => ({
  isShowSidebar: false,
});
```

### Mutations

Vuex sendiri sudah menyediakan dukungan untuk TypeScript dengan memberikan tipe data pada balikan untuk Mutations dengan cukup meng-import `MutationTree` dari Vuex, berikut contoh kodenya:

```javascript
import { MutationTree } from 'vuex';
import { StateType } from './state';
import { Types } from './types';

export const mutations: MutationTree<StateType> = {
  [Types.SET_SHOW_SIDEBAR](state: StateType, data: boolean) {
    state.isShowSidebar = data;
  },
};
```

### Actions

Untuk actions sendiri hampir mirip dengan mutations yang mana sudah disediakan tipe data dari Vuex, seperti contoh kode berikut:

```javascript
import { ActionTree } from 'vuex';
import { StateType } from './state';
import { Types } from './types';

export const actions: ActionTree<StateType, StateType> = {
  setShowSidebar({ commit }, payload) {
    commit(Types.SET_SHOW_SIDEBAR, payload);
  },
};
```

## Refactor Komponen

Setelah berhasi melakukan refactor pada Vuex Store, selanjutnya kita akan melakukan refactor pada kode komponen kita agar mendukung TypeScript.

Untuk mendukung TypeScript, kita perlu menambahkan beberapa dependencies baru seperti berikut:

```javascript
{
  "vue-class-component": "7.1.0",
  "vue-property-decorator": "8.1.1",
  "vuex-class": "0.3.2"
}
```

Yang paling utama, tentu kita harus mengubah kode dalam single file komponen Vue yang sebelumnya hanya `<script></script>` menjadi `<script lang="ts"></script>` agar kita bisa mendukung kode TypeScript pada bagian script. Dan berikut contoh layout `default.vue` yang sudah saya refactor menggunakan TypeScript:

```javascript
import { Component, Vue } from 'vue-property-decorator';
import { State, Mutation, Action } from 'vuex-class';

import ArrowUpIcon from 'vue-ionicons/dist/js/ios-arrow-dropup-circle';
import BaseHeader from '../components/BaseHeader.vue';
import BaseSidebar from '../components/BaseSidebar.vue';
import BaseToast from '../components/BaseToast.vue';

@Component({
  components: {
    BaseHeader,
    BaseSidebar,
    BaseToast,
    ArrowUpIcon,
  },
})
export default class DefaultLayout extends Vue {
  showArrowToTop = false;

  @State settingActiveTheme;
  @State isShowSidebar;

  @Mutation setShowSidebar;

  @Action initDataFromBrowserStorage;
  @Action setWebshareSupport;

  hideSidebar(): void {
    this.setShowSidebar(false);
  }

  handleScroll(): void {
    this.showArrowToTop = window.pageYOffset > 2000;
  }

  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  }

  beforedestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  }
}
```

Seperti bisa kalian lihat dari contoh kode diatas, saya menggunakan [vue-property-decorator ↗️](https://github.com/kaorun343/vue-property-decorator) untuk mendefinisikan komponen tersebut serta menggunakan [vuex-class ↗️](https://github.com/ktsn/vuex-class) untuk melakukan binding terhadap Vuex Store yang telah dibuat sebelumnya agar bisa digunakan di dalam komponen. Silakan kunjungi tautan masing-masing untuk mempelajari lebih lanjut mengenai apa saja yang bisa dan tidak bisa kita lakukan dengan `vue-property-decorator` maupun `vuex-class`.

## Refactor Jest Config

Unit test hampir tidak diperlukan perubahan sama sekali selain dari path dan nama file yang kemungkinan besar kita ubah nama dan letaknya. Kita hanya perlu mencocokan konfigurasi Jest agar mendukung TypeScript seperti pada contoh kode berikut:

```javascript
module.exports = {
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/$1',
    '^@/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js',
  },
  moduleFileExtensions: ['js', 'ts', 'vue', 'json'],
  transform: {
    '^.+.tsx?$': '<rootDir>/node_modules/ts-jest',
    '^.+.js$': '<rootDir>/node_modules/babel-jest',
    '^.+.vue$': '<rootDir>/node_modules/vue-jest',
  },
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};
```

## Repository sumber

[🐙 https://github.com/mazipan/quran-offline ↗️](https://github.com/mazipan/quran-offline)

### Demikian artikel kali ini, semoga bermanfaat...
