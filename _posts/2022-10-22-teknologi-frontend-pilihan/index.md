---
title: Teknologi frontend pilihan di akhir 2022
date: '2022-10-22'
excerpt: Beberapa pilihan teknologi yang menjadi dambaan dan andalan saya pribadi di akhir 2022
author: mazipan
published: true
featured: false
tags: [web, frontend]
coverImage: /thumbnail/teknologi-frontend-pilihan/pexels-pixabay-68525.jpeg
lang: id
enready: false
---

Setiap programmer punya alat idaman dan andalan masing-masing yang bisa jadi berbeda antara satu orang dengan orang lainnya. Pilihannya bisa berdasarkan alasan yang objektif bisa pula subjektif. Artikel ini ditulis pada Oktober 2022 yang mana sudah masuk ke Q4 di tahun 2022 dan tentu saja kalau kalian membaca di masa depan, bisa saja pilihan saya sudah berubah karena memang perubahan teknologi khususnya di ranah frontend tergolong cepat.

Artikel ini diinspirasi dari write-up yang dibuat [@cpojer](https://twitter.com/cpojer) di tautan [Fastest Frontend Tooling in 2022](https://cpojer.net/posts/fastest-frontend-tooling-in-2022).

## Alat Dambaan vs Alat Andalan

Saya perlu menjelaskan terlebih dahulu apa yang saya maksud "Andalan" dan "Dambaan" pada artikel kali ini. **Alat Andalan** yang saya maksud adalah alat-alat yang saya pakai secara profesional di pekerjaan sehari-hari, bisa jadi bukan pilihan terbaik yang saya tahu tapi jelas adalah alat yang harus saya kuasai untuk bisa menyelesaikan tugas pekerjaan saya sehari-hari. Sedangkan **Alat Dambaan** yang saya maksud adalah alat-alat yang mungkin sudah mulai saya pakai dalam projek-projek saya di luar pekerjaan profesional saya, di mana saya telah merasakan sendiri kelebihannya dan menjadi salah satu pilihan pertama saya ketika harus membuat projek baru. Tentunya sangat besar kemungkinannya karena satu dan lain hal bahwa alat-alat dambaan ini tidak bisa dan tidak pernah sama sekali saya gunakan dalam pekerjaan saya sehari-hari.

Saya akan membagi peralatan-peralatan tersebut ke dalam beberapa segmen agar mudah memilih teknologi pilihan saya.

## 🗄 Package Manager

Package Manager yang digunakan di tempat saya kerja sekarang adalah Yarn 3.2.2 atau biasa dikenal dengan **Yarn Berry** karena nama repositorinya sekarang [yarnpkg/berry](https://github.com/yarnpkg/berry), kita mengatur Monorepo di atas Yarn Workspace. Karena Monoreponya mendukung multi-language jadi Yarn tidak berdiri sendiri, melainkan tergantung dari Language yang dipakai sama *service*nya, tapi base tooling-nya banyak ditulis pakai TypeScript, jadi Yarn ada di root Monorepo kita.

Saya sebenarnya juga sering pake Yarn untuk project sendiri, tapi karena sudah ada Yarn versi 3+ terpasang, saya kurang suka kalau harus pasang lagi yang versi 1+, walaupun instalasinya sendiri sebenarnya menggunakan [asdf](https://asdf-vm.com/) yang bisa support lebih dari satu versi untuk project yang berbeda. Karenanya saya lebih memilih untuk memindahkan semua projek pribadi yang masih rutin saya urus ke [pnpm](https://pnpm.io/) versi 7x.

**🟢 Ringkasan:**

- ● Yarn 3 untuk kerjaan di kantor
- ● pnpm untuk projek pribadi

## ⏳ SSR vs CSR vs SSG

Hampir 6 tahun belakangan saya bekerja di perusahaan dengan produk yang tidak hanya digunakan oleh internal user, yang mana pada umumnya SEO menjadi salah satu faktor penting. Jadilah solusi untuk render aplikasi frontend di sisi server menjadi cukup familiar dengan kerjaan sehari-hari saya di kantor. Tapi tentunya saya pribadi tidak akan membabi buta menggunakan SSR untuk semua aplikasi yang saya buat. Untuk di wilayah pekerjaan di kantor, ada situasi di mana saya bisa jadi bukanlah orang yang terlibat dalam pengambilan keputusan di awal, pun begitu saya tetap menikmati saja sih berbagai jenis pendekatan yang diambil, apalagi kalau bisa mendengar alasan yang masuk akal dari para pengambil keputusan sebelumnya.

Di kantor tempat saya bekerja saat ini, ada 2 pendekatan yang digunakan:

- ⦿ SSR untuk Consumer App
- ⦿ Semi CSR untuk semua Internal App

SSR untuk Consumer App, salah satu alasannya adalah karena selain di *build* menjadi aplikasi native, codebase React Native-nya juga di deploy sebagai web yang mana untuk kasusnya Consumer App tentu saja tidak ingin melewatkan kesempatan berupaya memperbaiki hasil pencarian organik para pengguna/calon pengguna melalui mesin pencari. Salah satu upayanya ya dengan menambahkan kemampuan SSR pada kode React Native.

Sedangkan untuk Internal App tentu keinginan untuk mengurasi kompleksitas dan biaya operasional adalah alasan masuk akal untuk tidak mengadopsi SSR secara penuh. Pada dasarnya aplikasinya CSR, hanya saja kita tetap menambahkan server untuk melayani request, sehingga `index.html`-nya tidak static melainkan selalu fresh tiap kali request. Tapi tidak seheboh aplikasi SSR, tidak ada request yang dilakukan di sisi server, server hanya membuatkan html kosongan yang ditambahkan dengan Runtime Config di dalamnya. Oh ya, untuk Internal Appnya juga belum menggunakan CDN 🙊, jadi masih melayani request berbagai asset seperti file JS, CSS, Font dan Image dengan `express.static` dengan cache header yang di set sangat panjang.

Untuk projek pribadi, saya selalu mengupayakan menggunakan SSG sebisa mungkin agar bisa di host di banyak pilihan gratisan. Kalau tidak terhindarkan ya berarti mau tidak mau akan terpaut pada kebaikan hati [Vercel](https://vercel.com/) sebagai penyelamat.

**🟢 Ringkasan:**

- ● SSR untuk Consumer App di kantor
- ● CSR untuk Internal App di kantor
- ● SSG untuk projek pribadi

## ⚛️ React vs Svelte vs Vue

Untuk yang mengikuti perjalanan saya dan berbagai projek yang saya buat selama ini, harusnya tau kalau saya pernah mencoba ketiga pilihan di atas, saya mungkin masih bisa bekerja secara penuh dengan salah satu atau ketiganya dari pilihan tersebut. [ksana.in](https://github.com/mazipan/ksana.in) dibuat dengan Next.js yang berarti ada React dibaliknya, [learning.byphp.id](https://github.com/phpid-jakarta/phpid-learning) dibuat dengan Svelte di atas SvelteKit, dan [baca-quran.id](https://github.com/mazipan/baca-quran.id) dibuat dengan Nuxt versi 2 yang mana ya pake Vue 2. Saya cukup flexibel untuk pemilihan framework yang akan saya gunakan pada projek-projek saya, dan beberapa kali alasannya sesederhana karena "belum nyobain sendiri" aja. Tapi untuk beberapa waktu ke depan, untuk projek-projek yang mungkin akan saya buat, saya mungkin akan mengesampingkan kemungkinan untuk kembali menggunakan Vue 🙊. Saya bahkan terfikir untuk mencoba hal lain yang belum kesampaian macam: [Solid](https://www.solidjs.com/), [Astro](https://astro.build/), [Remix](https://remix.run/) atau bahkan pilihan yang lebih pragmatis seperti [11ty](https://www.11ty.dev/). Tentunya pilihan saya akan bergantung pada jenis aplikasi apa yang akan dibuat dan akan di-deploy dengan model seperti apa nantinya. Pastinya saya masih mengharapkan adanya "kesenangan" (maksudnya sebenernya "kebingungan") untuk mempelajari hal baru ketika mengerjakan projek-projek pribadi tersebut.

Sedangkan untuk pekerjaan harian di kantor tempat saya bekerja saat ini, menggunakan React Native untuk Consumer App dengan tambahan kemampuan SSR untuk web yang dibuat dengan manual dengan bongkar pasang berbagai pustaka. Dan untuk Internal App sendiri masih sangat bervariasi karena belum ada standard yang cukup baik pada masa dibuat pertama kali, jadi ada yang pake React, ada yang pake Svelte ada juga yang pake React tapi di atas Next.js. Kalau ada kesempatan dan keberuntungan sih, pengennya di-*React*-in aja semuanya. Tapi No Next.js-Next.js-an yak 🙊.

**🟢 Ringkasan:**

- ● React Native untuk Consumer App di kerjaan kantor
- ● React & Svelte untuk Internal App di kantor
- ● React, Svelte, dkk apapun itu, untuk projek pribadi

## 📦 Alat build dan atau transpiler

Alat build & transpiler terpopuler tentunya masih dipegang oleh [Webpack](https://webpack.js.org/) dan [Babel](https://babeljs.io/) ya, tentu projek-projek lama saya kebanyakan akan dipersenjatai oleh dua kombinasi tersebut. Tapi seiring makin banyaknya opsi alternatif dan keputusan beberapa framework yang membuat alat yang Zero Configuration, makin ke sini makin tidak berasa lagi ketergantungan pada duet maut ini. Untuk traspiler, dibandingkan pasang Babel plugin yang aneh-aneh sekarang lebih memilih udah serahkan saja sama kemampuan bawaan yang dimiliki sama TypeScript dan jangan adopsi fitur-fitur black-magic yang bikin makin rumit untuk lepas dari Babel ke depannya. Bisa lepas dari custom Babel plugin bisa membuka kesempatan mengadopsi transpiler macam [esbuild](https://esbuild.github.io/) maupun [swc](https://swc.rs/).

Dengan pilihan saya akhir-akhir ini yang condong ke [Next.js](https://nextjs.org/), tentu SWC jadi pilihan yang "tidak disadari" mulai teradopsi dalam projek-projek saya. Sedangkan Svelte dengan SvelteKit-nya yang menggunakan Vite, tentu ESBuild jadi pilihan tanpa sadar yang terambil.

Sedangkan untuk pilihan Bundler, karena Next.js masih menggunakan Webpack, jadi mau nggak mau ya masih harus berusaha familiar dengan berbagai kompleksitas pada Webpack. Dan SvelteKit yang memilih Vite setidaknya meringankan beban dan tentu mengatasi dahaga untuk mempelajari dan mencoba Bundler yang naik daun dengan sangat cepat ini. Rasanya ingin di *Vite*-in aja semua nih.

Untuk pekerjaan di kantor, menggunakan SWC untuk transpile file TS dan JS sementara untuk Consumer App-nya malah masih terjebak dengan Babel. Alat build nya tentu saja tidak lain dan tidak bukan, The One and Only, si "Webpack" lah.

**🟢 Ringkasan:**

- ● Vite sebisa mungkin
- ● Kalau Next.js ya SWC sebisa mungkin
- ● Di kantor masih Webpack, SWC dan beberapa service di Babel

## 💅 Solusi CSS

Solusi CSS untuk project Frontend sekarang memang makin bervariasi, dari yang menggunakan Vanilla CSS, memanfaatkan Framework CSS yang component based macam Bootstrap, atau yang utility first macam Tailwind CSS, menggunakan CSS Pre-processor macam Less/SASS, menggunakan CSS Module, CSS-in-JS macam Styled Component atau Emotion, atau bahkan serahkan saja pada UI Kit yang sudah mumpuni sehingga keharusan menulis custom CSS jadi berkurang drastis dan banyak pendekatan lainnya untuk mengatur CSS. Beberapa macam hal tersebut bisa saja dikombinasikan satu sama lain, saling mendukung dan tidak berdiri sendiri.

Solusi untuk CSS yang saya ambil pun rasanya bermacam-macam ya, tapi berdasarkan pengalaman selama ini, saya memang cukup terbiasa menulis CSS manual tanpa bantuan framework sehingga tidak kaget kalau harus bekerja di kantor yang memang mengambil jalan ini. Dulu awal-awal saya ngoding Frontend itu pakai framework ExtJS yang mana bikin jarang banget nulis CSS custom, cukup set-set layout di komponen mereka. Pindah ke Blibli, bikin saya banyak belajar mengatur dan mengurusi CSS dalam skala yang cukup besar. Pada jamannya, teknologi yang diadopsi juga belum modern-modern banget, mulai dari manage manual di atas framework CSS [Foundation](https://get.foundation/sites/docs/index.html), sampai adopsi Pre-processor SASS dan membuat sendiri class utility macam Grid di Foundation dengan menggunakan berbagai fitur di SASS. Mengurusi CSS dalam skala besar memang rumit pada jamannya, style spesificity dan cara load CSS yang masih manual membuat banyak konvensi yang pada akhirnya jadi make sense untuk diadopsi. Diantaranya [OOCSS](https://www.smashingmagazine.com/2011/12/an-introduction-to-object-oriented-css-oocss/) dan [BEM](https://en.bem.info/methodology/quick-start/), keduanya pada dasarnya hanya aturan yang disepakati ketika menulis CSS class demi menghindari kebanyakan menggunakan `!important` di mana-mana. Hari ini mungkin banyak yang jadi tidak relevan lagi dengan makin banyaknya solusi yang dibuat langsung spesifik untuk framework JavaScript. Problem yang sebelumnya muncul saat manage CSS manual, tidak lagi ada ketika adopsi berbagai pendekatan tersebut.

Dengan banyaknya projek JavaScript yang saya tangani, makin kesini saya mendambakan bisa makin sedikit untuk menulis custom-custom CSS. Jadi solusi CSS yang saya dambakan untuk diadopsi sebenernya adalah dengan menyerahkan pada UI Kit yang cukup mumpuni, tampilan defaultnya sudah cakep, accessible by default, jumlah component yang disediakan cukup banyak, mudah authoring theme, dan yang perlu dicatat adalah tetap mudah untuk di override. Saya meyadari bahwa sebagus apapun UI Kit tersebut pada akhirnya customisasi untuk sebuah projek itu tidak akan terhindarkan. Sweet spot buat saya sepertinya adalah tidak lagi menulis file `.css` manual lagi.

Akhir-akhir ini saya revamp beberapa Internal Tools di tempat kerja saya ke [mantine.dev](https://mantine.dev/), hampir tidak membuat satupun file CSS tambahan lagi, semua customisasi dibuat diatas [component props](https://mantine.dev/pages/basics/#components-props), [sx props](https://mantine.dev/styles/sx/) dan [createStyles](https://mantine.dev/styles/create-styles/). Masalahnya masih ada banyak aplikasi legacy yang tidak bisa ujug-ujug di revamp karena terlalu besar scope nya. Aplikasi legacy ini bervariasi, tapi sebagian besar menggunakan Bootstrap CSS, ada yang ditambah component based di level framework macam [react-bootstrap](https://react-bootstrap.github.io/). Di projek-projek seperti ini, kebanyakan juga kombinasi dengan Pre-processor tambahan macam Less/SASS, beberapa malah gak konsisten 🙊, jadi ada pre-processor tapi tetep ada CSS Vanilla juga.

Tapi hampir semua Customer App yang ta temui selama ini emang jarang pake UI Kit, kalaupun pakai, biasanya mereka develop sendiri. Blibli bikin sendiri, TokPed bikin sendiri, Sbox juga bikin sendiri untuk Main App-nya. Di Sbox karena pake RN maka lebih sedikit lagi opsi yang bisa dicari dari pasaran.

Di projek-projek pribadi lebih bervariasi, karena saya juga nyoba-nyoba pakai Utility based macam [Tailwind CSS](https://tailwindcss.com/) seperti kalian temukan juga di blog saya ini. UI Kit yang sering ta pakai di projek pribadi itu [Chakra UI](https://chakra-ui.com/). Saya belum nemu klik banget kalau harus full pakai dua alat ini untuk di kantor. Tailwind CSS tentu saya pribasi masih ngerasa akan challenging banget untuk diadopsi besar-besaran. Setelah diingat-ingat, sepertinya baru websitenya [gotocompany.com](https://www.gotocompany.com/) saja yang dibuat dengan Tailwind CSS di tempat dimana saya ada di timnya pada masanya 🔥.

**🟢 Ringkasan:**

- ● Mantine.dev untuk Non-Main App di kantor
- ● Bikin Component sendiri untuk Main App di kantor
- ● Tailwind CSS / Chakra UI untuk project pribadi

## 🧪 Unit testing vs Integration vs E2E

Setelah 3 tahun belakangan menggunakan React, banyak mindset dalam hal testing yang sedikit banyak terpengaruhi oleh [Kent C. Dodds](https://kentcdodds.com/blog?q=testing) sebagai pembuat library [testing-library.com](https://testing-library.com/). Tapi memang ada beberapa hal yang setelah coba dijalani bertahun-tahun malah saya ngerasa jadi counter-productive buat flow kerja saya pribadi.

Testing Library yang melakukan test seperti User melihat dan berinteraksi dengan aplikasi kita, jadi mendekati dengan E2E tapi karena biasanya masih pake Mock Data dan masih tidak bisa melakukan full user flow maka kelasnya masih masuk ke Integrasi test. Bisa juga untuk Unit Test, tapi dengan pendekatan yang tidak mau melakukan test pada detail implementasi, maka bisa jadi banyak spot yang tidak bisa kena test kalau mengadopsi Testing Library. 90% testing yang ta setup dan ta tulis selama ini memang hampir selalu di atas Testing Library.

Pendekatan yang pada akhirnya hampir selalu ta ambil memang sedikit berbeda dengan Testing Library meskipun tetap menggunakan library tersebut untuk menulis test. Kalau dengan Integasi test, kamu biasanya akan mulai bikin test dari level pages/routes karena itu adalah spot terbaik untuk melihat berbagai komponen diintegrasikan. Dengan melakukan test di level pages, maka secara tidak langsung kamu akan cover sebagian besar kasus di level komponen yang diintegrasi di page tersebut. Ini approach umum ketika menggunakan Testing Library. Cara-cara menulis test nya mendekati cara menulis test di E2E.

Sementara cara yang saya lakukan selama ini akan mulai dari komponen terbawah dari suatu page, akibatnya saya perlu melakukan dua-tiga-empat bahkan lima kali pengulangan test. Katakan komponen A digunakan di halaman Z, alih-alih melakukan test di halaman Z, saya akan melakukan test di komponen A kemudian melakukan test ulang di halaman Z. Dua kali kerja, tapi sampai saat ini saya masih merasa ini adalah cara yang paling cocok buat saya. Saya merasa dengan cara ini saya bisa lebih memahami komponen-komponen yang saya tulis dengan baik, pada akhirnya jadi bisa menulis test yang lebih stabil.

Sementara untuk Sbox, cuma invest di E2E saja dan sedikit Unit Test di helper function, sama sekali tidak tertarik menulis banyak Unit test ataupun Integasi test.

**🟢 Ringkasan:**

- ● Integasi rasa UT di banyak projek sebelumnya
- ● E2E di kantor

## 🎁 Bonus: VS Code Theme & Font

Tema kesayangan yang saya gunakan di VSCode saya saat ini ialah [Night Owl](https://marketplace.visualstudio.com/items?itemName=sdras.night-owl) buatan [Sarah Drasner](https://twitter.com/sarah_edo) dengan sedikit tambahan customisasi biar hurufnya miring-miring dikit.

```json
{
  "workbench.colorCustomizations": {
    "[Night Owl]": {
      "activityBar.background": "#000C1D",
      "activityBar.border": "#102a44",
      "editorGroup.border": "#102a44",
      "sideBar.background": "#001122",
      "sideBar.border": "#102a44",
      "sideBar.foreground": "#8BADC1"
    },
    "[Night Owl (No Italics)]": {
      "activityBar.background": "#000C1D",
      "activityBar.border": "#102a44",
      "editorGroup.border": "#102a44",
      "sideBar.background": "#001122",
      "sideBar.border": "#102a44",
      "sideBar.foreground": "#8BADC1"
    }
  },
  "editor.tokenColorCustomizations": {
    "textMateRules": [
      {
        "name": "Markup - Bold-Italic",
        "scope": [
          "markup.bold markup.italic string",
          "markup.bold markup.italic",
          "markup.italic markup.bold string",
          "markup.italic markup.bold",
          "markup.quote markup.bold string",
          "markup.quote markup.bold"
        ],
        "settings": {
          "fontStyle": "bold"
        }
      },
      {
        "scope": [
          "comment",
          "constant",
          "entity.name.method.js",
          "entity.name.type.class",
          "entity.other.attribute-name",
          "keyword",
          "markup.italic",
          "markup.quote",
          "punctuation.definition.comment",
          "source.js constant.other.object.key.js string.unquoted.label.js",
          "storage.modifier",
          "storage.type.class.js",
          "support.function",
          "tag.decorator.js entity.name.tag.js",
          "tag.decorator.js punctuation.definition.tag.js",
          "text.html.basic entity.other.attribute-name",
          "text.html.basic entity.other.attribute-name.html",
          "variable.language"
        ],
        "settings": {
          "fontStyle": "italic"
        }
      }
    ]
  },
}
```

Sedangkan untuk Font, saya menggunakan [Cascadia Code](https://github.com/microsoft/cascadia-code) dari Microsoft. Saya menambahkan sedikit tambahan config di VSCode untuk menggunakan Ligature nya:

```json
{
  "editor.fontFamily": "Cascadia Code, JetBrains Mono, Consolas, 'Courier New', monospace",
  "editor.fontLigatures": "'calt', 'ss01'",
}
```

Sedikit cuplikan tangkapan layar dari VSCode yang saya gunakan sehari-hari:

![Preview VSCode dengan tema Night Owl dan font Cascadia Code](/thumbnail/teknologi-frontend-pilihan/vscode-preview.png)

---

Foto cover diambil dari [Pixabay di Pexels](https://www.pexels.com/id-id/foto/buah-merah-kuning-dan-hijau-68525/)
