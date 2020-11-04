---
title: Migrate Nuxt to TypeScript
date: '2019-05-15'
minute2read: 10
excerpt: Story telling about the steps that I worked on when migrating the Nuxt project from using vanilla JavaScript to using TypeScript
author: mazipan
published: true
featured: true
tags: [nuxt, typescript]
coverImage: /thumbnail/migrate-nuxt-to-typescript/quran-offline.png
lang: en
---

Story telling about the steps that I worked on when migrating the Nuxt project from using vanilla JavaScript to using TypeScript

As we all know that the default from the Nuxt project will be to create a code based on JavaScript Vanilla. Whereas the increasingly widespread use of TypeScript among JavaScript developers makes me personally interested in implementing the use of TypeScript on my open source code project.

![Quran Offline](/thumbnail/migrate-nuxt-to-typescript/quran-offline.png)

The following are the things I worked on in the migration process:

## Adding tsconfig.json

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

To add this file, I also need to add the following dependencies:

```javascript
{
  "@nuxt/typescript": "2.7.1",
  "@types/jest": "24.0.13",
  "@types/node": "11.13.10",
  "typescript": "3.4.5"
}
```

## Update eslintrc.js

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

And add some of the following dependencies:

```javascript
{
  "@nuxtjs/eslint-config": "0.0.1",
  "@typescript-eslint/eslint-plugin": "1.9.0"
}
```

## Rename nuxt.config.js to nuxt.config.ts

Change the file extension and make a few changes to the following:

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

## Refactor the Vuex Store

Because almost all the components in my project have used the Vuex Store, so I put this as the first for me to refactor before refactor the component. To use Vuex with TypeScript there are few changes compared to when using regular JavaScript, here are the changes that I am working on:

### Classic Store

In this project I still use the Classic Store, which is actually deprecated and will be removed in Nuxt v3 in the future, the following classic store that I created in the `store/index.ts` file:

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

In the `state.ts` file, I create an interface that is the type definitions of the state and creates a state with various initial value like the following example:

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

Vuex itself has provided support for TypeScript by providing data types in return for Mutations by simply importing `MutationTree` from Vuex, following the sample code:

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

For the actions themselves it is almost similar to the mutations in which the data type from Vuex has been provided, such as the following code example:

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

## Refactor the Components

After successfully refactor the Vuex Store, then we will refactor our component code to support TypeScript.

To support TypeScript, we need to add some new dependencies like the following:

```javascript
{
  "vue-class-component": "7.1.0",
  "vue-property-decorator": "8.1.1",
  "vuex-class": "0.3.2"
}
```

First of all, of course we have to change the code in the single component file Vue that previously only `<script></script>` becomes `<script lang = "ts"> </script>`so we can support the TypeScript code in the script section . And here is the `default.vue` layout example that I refactor using TypeScript:

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

As you can see from the code example above, I use [vue-property-decorator ↗️](https://github.com/kaorun343/vue-property-decorator) to define the component and use [vuex-class ↗️](https://github.com/ktsn/vuex-class) to bind the Vuex Store that was made beforehand so that it can be used in the component. Please visit the respective links to learn more about what we can and cannot do with `vue-property-decorator` or` vuex-class`.

## Refactor the Jest Config

There is almost no need to change unit tests other than the path and file name that we are most likely to change the name and location. We only need to match the Jest configuration to support TypeScript as in the following code example:

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

## Repository

[🐙 https://github.com/mazipan/quran-offline ↗️](https://github.com/mazipan/quran-offline)


