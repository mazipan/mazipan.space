---
title: Dari Nuxt ke SvelteKit
date: '2023-08-01'
excerpt: Pengalaman pribadi menulis ulang projek Nuxt ke SvelteKit
author: mazipan
published: true
featured: false
tags: [javascript, web]
coverImage: /thumbnail/nuxt-to-sveltekit/pexels-pixabay-47863.jpg
lang: id
enready: false
---

Artikel ini adalah pengalaman probadi dari proses penulisan ulang projek lama dari Nuxt ke SvelteKit.

## Tentang aplikasi web Baca-Quran

[Baca-Quran.id](https://www.baca-quran.id/) adalah aplikasi web untuk membaca Quran tanpa perlu khawatir akan ketemu iklan ataupun analitik yang tidak relevan karena memang sama sekali tidak memasang analitik apapun sampai saat ini.

## Masalah klasik dengan kode tua

[Baca-Quran.id](https://www.baca-quran.id/), seperti bisa dilihat langsung dari kode sumbernya di GitHub repo [mazipan/baca-quran.id](https://github.com/mazipan/baca-quran.id) memang telah lama terbengkalai dan tidak sempat saya sentuh-sentuh kodenya. Padahal salah satu tujuan projek ini dulu adalah biar bisa menjadi portofolio yang cukup oke buat saya pribadi, namun dengan kode yang tidak terurus dan kode yang terbuka dan bisa dilihat oleh siapapun maka ini mulai bisa menjadi *boomerang* buat saya karena menampilkan projek yang saya mulai tidak bisa berinteraksi lagi dengannya. Kode versi lama ini sendiri masih saya simpan di [branch `v1`](https://github.com/mazipan/baca-quran.id/tree/v1)

Beberapa masalah dengan kode Nuxt.js pada projek Baca-Quran, antara lain:

🔸 **Versi dependency**

Versi dependency ini kelihatannya sederhana tapi jadi masalah utama yang rumit dan menimbulkan kemalasan bagi saya untuk memperbaiki secara "baik-baik". Beberapa merupakan dependency vital yang susah dibenahi, mulai dari Node.js yang masih menggunakan versi 12 (saat artikel ini dipublikasikan sudah versi 20), Vue dan Nuxt yang pada akhirnya juga merilis versi major, build tool yang masih menggunakan Webpack versi 4. Belum lagi loader-loader webpack yang deprecated, `sass-loader` yang masih pakai `node-sass` yang sudah tidak dianjurkan.

Sebelum memutuskan untuk menulis ulang, saya sebenarnya sudah mencoba memperbaiki dengan jalan upgrade sedikit-sedikit beberapa dependency. Tapi ternyata terlalu rumit buat saya saat itu.

🔸 **Pendekatan saya yang berubah**

Pendekatan saya dalam membuat projek berubah seiring waktu, ini bisa jadi terpengaruhi dengan *exposure* saya terhadap Vue dan Nuxt yang beberapa tahun belakangan sudah sangat rendah, sudah tidak antusias dan sudah jadi salah satu pilihan terakhir kalau diminta bikin projek baru. Ini tentu cuma gerbangnya saja, pendekatan lainpun pada akhirnya lambat laun berubah. Dari mulai Webpack yang mulai berpindah ke Vite. Styling CSS yang mulai malas pakai pre-processor lagi dan mulai mengandalkan Tailwind CSS saja di banyak projek baru.

🔸 **Workaround yang dipaksakan**

Sebagai projek portofolio, saya memang ingin membuat kodenya sebaik yang saya bisa pada masanya. Namun pada akhirnya malah membawa saya ke beberapa workaround yang menyulitkan untuk diperbaiki setelah lama ditinggal. Workaround memang tujuannya biasanya untuk menambal celah sesaat, namun setelah lama dan mulai lupa, baru berasa betapa terlalu dipaksakannya dulu mengadopsi workaround di bagian-bagian kritis.

Satu terbesar yang menyulitkan saya adalah adopsi TypeScript, pada masanya memang baik dari Vue maupun Nuxt belum ada solusi yang mumpuni. Akhirnya demi mendukung ego, menambal sulam dengan berbagai rekomendasi baik official ataupun 3rd party. Terlalu banyak 3rd party yang akhirnya jadi dependensi untuk projek ini, mulai `vue-class-component`, `vue-property-decorator` dan `nuxt-property-decorator`, `vuex-class`. Selengkapnya baca di [Migrasi Nuxt ke TypeScript](/migrate-nuxt-to-typescript)

Cara yang saya ambil termasuk bukan yang begitu disarankan, karena beberapa bulan setelahnya muncul [typescript.nuxtjs.org](https://typescript.nuxtjs.org/) yang mana lebih disarankan untuk adopsi TypeScript di Nuxt.js. Saya juga memutuskan menggunakan Class API dibandingkan Options API seperti biasanya, yang makin menyulitkan karena kita tau sekarang Vue menyarankan Composition API.

## Perbedaan v1 dan v2

Secara garis besar, sebenernya tidak ada perubahan signifikan pada fitur. Tapi karena ini adalah aplikasi yang saya tulis ulang dari awal tanpa begitu mempertimbangkan harus semuanya ada, maka memang sedari awal saya sudah berekspektasi kalau v2 ini mungkin tidak akan se-kaya versi sebelumnya. Ada fitur-fitur yang secara sadar akan saya mutilasi, paling tidak pada tahap awal pengembangan dan perilisan awal.

![Cuplikan beranda Baca-Quran v1](/thumbnail/nuxt-to-sveltekit/baca-quran-v1.png)

![Cuplikan beranda Baca-Quran v2](/thumbnail/nuxt-to-sveltekit/baca-quran-v2.png)

Beberapa fitur yang lumayan sayang karena mesti hilang antara lain:

- 🔴 Multiple theme, sekarang cuma mendukung tema terang dan gelap
- 🔴 AMP, sebenarnya tidak begitu kehilangan, karena memang dari Google sendiri sudah tidak memberikan perlakuan terlalu spesial. Tapi mengingat betapa susahnya dulu [membuat fitur AMP ini](https://mazipan.space/generate-amp-pages-in-nuxtjs), jadi cukup kehilangan.
- 🔴 Perubahan slug surah dan ayat, ini jelas big loss karena akan kehilangan banyak dari sisi organik search result

Tapi tenang, selian fitur yang dimutilasi, saya juga menyiapkan beberapa fitur baru yang memang sudah kebayang ingin dibuat sejak lama:

- 🟢 Audio yang makin banyak pilihannya, menggunakan [EveryAyah](https://everyayah.com/)
- 🟢 [Fitur tasbih](https://www.baca-quran.id/tasbih/), pengingat hitungan saat Dzikir atau Wirid

Dan pastinya *harusnya* bisa berekspektasi kalau akan ada beberapa fitur lainnya yang bisa dikirim setelah ini.

## Saya x Svelte dan SvelteKit

Salah satu paparan pertama saya dengan kode Svelte secara profesional mungkin saat di `tkpd`, mereka punya 1 service yang menyajikan halaman beranda untuk device mobile dan untuk pengunjung baru yang sebelumnya belum pernah mengunjungi halaman tersebut. Sayangnya ya karena cuma menyajikan satu halaman, memang tidak banyak fitur yang dikembangkan apalagi makin ke sini dirasa makin sulit mengurusi 1 halaman dalam 2 versi. Svelte di sana belum menggunakan SvelteKit, tapi setidaknya jadi melihat projek nyata yang dibuat pakai Svelte.

Setelahnya di `sbox` juga ada 1 internal dashboard yang dibuat pake Svelte, belum pakai SvelteKit juga sayangnya.

Di luar kerjaan harian, saya beberapa kali berkesempatan mengerjakan projek kecil menggunakan Svelte yang juga didukung dengan SvelteKit, diantaranya:

- 📦 [phpid-learning](https://github.com/phpid-jakarta/phpid-learning)
- 📦 [ajari-koding](https://github.com/phpid-jakarta/ajari-koding), masih pakai [sapper](https://sapper.svelte.dev/)

Pilihan ini memang disengaja, karena projek-projek ini adalah salah satu *playground* saya, jadi saya lebih memilih menggunakan framework yang saya ingin pelajari tapi gak berkesempatan di kerjaan sehari-hari.

## Kesan pribadi

Secara garis besar saya puas dengan apa yang diberikan SvelteKit. Namun ada beberapa hal negatif yang memang masih jadi perhatian saya, diantaranya:

- 🔴 Konvensi memberikan nama file dengan awalan karakter `+` ini mimpi buruk, saya pernah menghabiskan berhari-hari debug kenapa halaman saya tidak ter-ekport jadi static file padahal sudah membubuhkan `entries`, yang ternyata cuma gara-gara salah memberikan nama file.
- 🔴 Pendekatan [membuat Sitemap](https://kit.svelte.dev/docs/seo#manual-setup-sitemaps) di dokumentasi offisial yang menurutku gak cocok untuk halaman statis
- 🔴 `svelte:head` yang masih suka duplikat kalau router-nya dipindah lewat SPA
- 🔴 [Cara memasang structured data](https://kit.svelte.dev/docs/seo#manual-setup-structured-data) yang belum stabil, walhasil harus pakai [workaround untuk memasang json-ld](https://navillus.dev/blog/json-ld-in-sveltekit)
- 🔴 Jadi kangen [Portal di React](https://react.dev/reference/react-dom/createPortal#rendering-a-modal-dialog-with-a-portal), di Svelte saya jadi nempelin komponennya di global dan trigger lewat store, biar DOM nya gak perlu nempel ke komponen terdekatnya.

Tapi sudahlah ya, emang biar bisa tetep sambat. Setidaknya saya menikmati SvelteKit, antara lain:

- 🟢 *Developer Experience* (DX) nya *top tier*, reload pas bikin perubahan super kenceng karena di belakang layar pakai Vite. Config-nya dikit, gampang buat di tweak kalaupun butuh yang rada aneh-aneh dikit. Build nya kenceng banget, harus ekspor ribuan halaman jadi static file tapi bisa selesai kurang dari 30s. Bootstrap projek baru bisa langsung wus-wus, sudah di *setup*-in berbagai kebutuhan dasar macam TS, ESLint, Prettier, dkk.
- 🟢 Jadi *less-dependency*, ini bias tentu saja, karena fiturnya juga dipangkas.

## Hal lain yang dipelajari

Selain melakukan migrasi framework, pada prosesnya saya juga mempelajari beberapa hal menarik dari proses migrasi kali ini, diantaranya:

- 🎉 Jadi tau kalau ada yang namanya [Vibration API](https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API), ini saya pakai di halaman [/tasbih](https://www.baca-quran.id/tasbih/) untuk memberikan efek getar saat telah mencapai target yang ditentukan.
- 🎉 Ekspor sebagai static file dengan passing [entries](https://kit.svelte.dev/docs/page-options#entries), biar gak perlu bergantung pada kemampuan crawl si build tools nha.
- 🎉 Belajar bikin Drawer dan BottomSheet alakadarnya pakai Tailwind CSS, sumbernya dari [kode di tailwindcomponents.com](https://tailwindcomponents.com/component/animated-drawer-without-js)
- 🎉 Belajar bikin Toaster pakai Tailwind CSS, sumbernya dari [toaster di flowbite.com](https://flowbite.com/docs/components/toast/)

---

Foto cover diambil dari [Pixabay di Pexels](https://www.pexels.com/id-id/foto/petugas-pemadam-kebakaran-menyemprotkan-kendaraan-yang-menyala-47863/)
