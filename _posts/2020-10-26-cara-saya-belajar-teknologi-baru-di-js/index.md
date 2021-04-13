---
title: Cara saya belajar teknologi baru di JavaScript
date: '2020-10-26'
excerpt: Berbagi cerita mengenai bagaimana saya belajar teknologi baru di JavaScript agar tetap relevan
author: mazipan
published: true
featured: false
tags: [javascript]
coverImage: /thumbnail/cara-saya-belajar-teknologi-baru-di-js/pexels-andrea-piacquadio-3768129.jpg
lang: id
enready: false
---

Dunia per-JS-an memang semakin kesini semakin liar saja, bisa sebulan sekali kita dengar ada framework baru yang diluncurkan. Artikel ini mencoba mengupas bagaimana usaha saya berusaha tetap relevan di dunia yang semakin cepat bergerak.

Sebelum memulai, saya perlu berikan sedikit konteks mengenai latar belakang saya. Saya sudah hampir 5 tahunan belakangan ini memang bergelut dengan JavaScript, sehingga beberapa fitur dasar JavaScript yang umum sudah cukup sering saya gunakan dalam koding sehari-hari. Saya lebih banyak berurusan dengan sisi depan (_frontend_) karena pekerjaan saya memang spesifik di bagian ini selama 5 tahun terakhir.

Jadi, mari kita mulai saja...

## Bagaimana saya memilih teknologi untuk dipelajari?

Teknologi terlalu banyak, pustaka di npm registry juga terlalu bertebaran, framework bahkan seringkali mirip-mirip satu sama lain. Sebagai developer full time yang masih kerja di perusahaan punya orang lain, tentu saya tidak memiliki waktu yang cukup banyak untuk mempelajari semuanya. Berikut ini beberapa poin yang jadi pertimbangan saya dalam memilih teknologi untuk dipelajari:

### 1. Pilih yang kemungkinan bersinggungan dengan pekerjaan utama

Contoh kasus saja, misalnya di tempat saya bekerja menggunakan webpack sebagai alat build kode frontend, 
meskipun saat ini kondisinya konfigurasi dari webpack tersebut baik-baik saja dan tidak ada masalah (yang mana tidak menjadi mendesak untuk dipelajari) namun di waktu senggang tentu buat saya pribadi mempelajari webpack dengan berbagai konfigurasinya adalah pilihan terbaik.
Kenapa? Karena kemungkinannya sangat tinggi kalau apa yang saya pelajari dengan webpack itu akan bersinggungan dan akan digunakan secara langsung di pekerjaan sehari-hari, meskipun tidak saat ini.
Ini juga berlaku untuk mempelajari teknologi alternatif di sekitarnya.
Misalnya kembali ke urusan webpack, saya mungkin juga perlu belajar Rollup, atau mungkin Parcel.js, atau yang kekinian macam Snowpack.
Kenapa? Bisa jadi mereka punya pendekatan yang berbeda dari yang selama ini dikerjakan oleh webpack.
Di dunia yang perkembangannya cukup kencang, sangat mungkin suatu teknologi menjadi tidak relevan seiring waktu.
Dan kita juga mesti sudah siap juga dengan alternatif yang bisa kita ambil kalau teknologi yang digunakan sekarang lama-kelamaan menjadi tidak lagi relevan dengan kasus kita.

Atau kita bisa ambil contoh kasus lain, yang kemungkinan juga dialami sama teman-teman. 
Misalnya di kantor kalian belum menerapkan unit test, sedangkan kalian dan teman-teman kantor sudah menyadari mengenai pentingnya penerapan unit test ke kode kalian, 
maka kalian bisa belajar teknologi mengenai Unit Test di JavaScript. 
Pilihannya kan ada banyak tuh di pasaran dari Runner nya seperti Jest, Karma, AVA dan lainnya.
Atau bahkan utility-nya macam Testing-Library, Enzyme, atau lainnya.
Hal tersebut mungkin perlu dicek dulu satu persatu yang kemungkinan cocok, 
Kita mungkin harus bikin projek kecil dan implementasikan teknologi unit test ke dalamnya sebagai POC (proof of concept).
Untuk kemudian kita bisa ambil projek nyata di kantor sebagai pilot atau kelinci percobaan.

Hal yang perlu digarisbawahi dari bagian ini adalah bahwa ada tujuan dari proses belajarnya, biasanya untuk memecahkan masalah yang sedang/akan ditemukan dipekerjakan sehari-hari. 
Enaknya dari belajar teknologi dengan alasan di bagian ini adalah karena seringnya bisa dilakukan di jam kerja. 
Tentu karena proses belajarnya memang diharapkan mendukung pekerjaan sehari-hari kita nantinya.

### 2. Pilih yang sesuai dengan kasus kita

Kegiatan koding kita sehari-hari atau bahkan projek sampingan kita memang seringkali membutuhkan pemecahan yang baru dan belum pernah kita kerjakan sebelumnya. Hal ini kan akan memaksa kita untuk belajar teknologi baru.

Misalnya di kantor saya ada kasus untuk membuat berbagai Microsites atau halaman web statis yang minim interaksi pengguna, maka saya akan coba cari tau dan belajar teknologi-teknologi yang memang spesialis menangani web statis.

Alur ini menurut saya yang paling ideal, ada kasus yang sedang dihadapi terlebih dahulu, barulah kita melihat ke pasar mengenai berbagai alternatif yang tersedia. Kalau terdapat beberapa teknologi yang mirip, biasanya ambil paling tidak dua atau tiga contoh dan coba membuat hal yang sama dengan tiga teknologi yang berbeda tersebut.

### 3. Pilih yang lagi banyak diperbincangkan

Ini merupakan belajar berdasarkan mana yang viral di pasaran. Dengan kondisi lingkungan yang cepat sekali berubah, di dunia JavaScript memang mudah sekali ditemukan teknologi baru dan beberapa diantaranya mendapatkan perhatian yang cukup masif. Nah, teknologi yang mendapatkan perhatian yang masif inilah yang bisa dimasukkan ke dalam antrian di catatan kalian untuk dipelajari.

Contoh kasus saja, saya pribadi terbiasa menggunakan Vue atau React untuk projek-projek saya. Tapi karena akhir-akhir ini Svelte juga cukup menyita perhatian banyak orang, maka saya mencoba untuk mempelajarinya. Kebetulan punya kasus yang cocok diselesaikan dengan Svelte, ya jadilah saya bertaruh untuk mengembangkan projek tersebut dengan sembari belajar di tengah jalan.

Cara ini merupakan kebalikan dari cara sebelumnya, kalau di bagian sebelumnya kita sudah punya kasusnya dan akan mencari teknologi yang pas, kalau disini kita sudah memilih teknologinya terlebih dahulu, barulah mencoba mencari kasus penggunaan yang sesuai yang mungkin saja bisa kita kerjakan.

Cara ini sangat mungkin memperlambat pekerjaan kalian, karena ada banyak hal abu-abu yang kita belum tau saat mengerjakan projek dengannya. Makanya saya tidak menyarankan untuk diaplikasikan ke projek serius atau projek dengan komitmen tenggat waktu yang ketat. Cocoknya diterapkan ke projek sampingan atau projek santai yang tidak dikerjar-kejar.

### 4. Pilih yang mudah dipelajari dan diadopsi dulu

Teknologi baru tidak selalu mudah dipelajari, saya biasanya lebih memilih teknologi yang lebih mudah diadopsi. Semakin kesini kita kan inginnya semakin mudah dalam menulis koding, kecuali memang ada kasus yang sangat mengharuskan kita menggunakan teknologi yang cukup rumit.

Paling penting pilih yang memang bisa diadopsi ke sebuah projek kita. Percuma banyak baca dokumentasi tapi tidak punya waktu atau kesempatan untuk menerapkannya di sebuah projek. Dengan menerapkan pada projek nyata biasanya apa yang kita pelajari lewat dokumentasi dan contoh-contoh kode akan lebih mudah melekat di kepala.

## Bagaimana saya belajar dan mencoba teknologi baru?

### 1. Pastikan jangan terlewat belajar dasarnya

Kalau kalian baca bagian awal, saya sudah memberikan konteks bahwa saya sudah lebih dari 5 tahun dan 5 hari dalam seminggu menulis coding yang berkaitan dengan JavaScript, ini mengapa mungkin terlihatnya mudah untuk belajar hal baru yang masih sama di lingkungan JavaScript juga. Yap, jangan lewatkan belajar hal dasarnya, meskipun sembari belajar teknologi di atasnya, namun kalau ketemu kesulitan yang berasal dari akar bahasa tersebut maka mungkin kita perlu mundur ke belakang dulu belajarnya untuk kembali mempelajari dasar JavaScriptnya. Barulah setelahnya kita bisa kembali meneruskan belajar teknologi di atasnya. Bisa juga caranya yang dibalik, belajar teknologi yang memang juga secara tidak langsung memaksa kita untuk memperkuat pengetahuan dasar JavaScriptnya. Saya kembalikan ke personal masing-masing.

### 2. Baca dokumentasi bagian intro dan _get started_

Saya tipe yang tidak mau terlalu tenggelam jauh di tahap awal belajar teknologi baru, biasanya yang terjadi justru saya akan pusing duluan bahkan sebelum memulainya. Makanya cara yang saya tempuh biasanya saya membaca bagian pengenalan dan bagian arsitektur dasar atau bagian konsepnya. Kemudian langsung ke bagian _get started_ dan ikuti bagian itu sampai bisa jalan. Beberapa teknnologi sudah memberikan _boilerplate_ yang bisa dengan cepat digunakan untuk memulai belajar dan menggunakan teknologi mereka, saya pasti akan memilih menggunakannyadi awal. Meskipun nantinya bisa saja saya tidak cocok dengan _boilerplate_ tersebut, tapi tidak akan saya lakukan di awal.

### 3. Ikuti saja dulu dokumentasinya

Tidak perlu terlalu banyak belok ke kanan dan ke kiri di awal, ikuti saja apa yang ditunjukkan di dokumentasi. Sedikit-sedikit dipelajari polanya, dipahami kenapa mereka melakukan ini dan itu, diingat bagaimana mereka melakukan ini dan itu. Dokuementasi umumnya memang dibuat mudah agar bisa diikuti dengan cepat, namun pada aplikasinya bisa saja tidak sesuai dengan kebutuhan kita. Untuk teknologi yang sangat baru dipelajari lebih baik bila kita mengikuti arus terlebih dahulu.

### 4. Coba modifikasi bagian yang dirasa tidak sesuai dengan kita

Setelah berhasil menjalankan apa yang tertulis di dokumentasinya, biasanya saya akan melakukan perubahan dari apa yang ada pada awalnya, bisa jadi mengubah posisi direktori, mengubah sedikit kode ataupun perubahan lainnya untuk kemudian melihat dan mengamati efek dari perubahan yang kita buat apakah sudah sesuai ekspektasi apa belum.

Umumnya disini saya akan menemui berbagai kesulitan, kebingungan dan galat, namun disini pula saya bisa belajar bagaimana teknologi baru tersebut bekerja. Tidak perlu takut untuk mengubah kode yang sebelumnya sudah dijelaskan di dokumentasi, toh mereka kan tidak tau kondisi dan kebutuhan kita. Tidak apa-apa menambahkan atau mengubah dari yang seharusnya ada. Toh, kita lebih tau dengan apa yang ingin kita capai.

Contoh kasus yang teranyar yang saya alami misalnya, saya menggunakan [Next Blog Starter](https://github.com/vercel/next.js/tree/canary/examples/blog-starter) untuk memulai membuat ulang blog saya dengan Next.js, sayangnya boilerplate nya kan menggunakan slug yang berbeda dengan yang saya inginkan, jika yang saya mau bisa langsung berada di root `/:slug` namun yang disediakan menggunakan prefix post `/post/:slug`. Hal kecil kelihatannya, tapi dengan mengubah hal awal menjadi apa yang kita mau tanpa merusaknya adalah proses belajar yang baik bagi saya untuk memahami bagaimana routing di Next.js.

### 5. Tambahkan berbagai kasus baru

Blog saya ini belang-belang kontennya, beberapa konten tersedia dalam bahasa Inggris dan bahasa Indonesia, tapi sebagian besar malah tidak. saya tidak ingin menampilkan konten yang sama dan berbeda bahasa di halaman utama tentunya. Menambahkan kasus yang berbeda akan memaksa kita untuk lebih mendalami lagi dari sekedar mengubah apa yang ada. Disini kita sudah mulai berusaha memanfaatkan pengetahuan yang sudah kita pelajari untuk membuat atau memecahkan permasalahan baru yang kita hadapi. Kemungkinan bahkan kasusnya belum tersedia dokumentasinya. Pada awalnya pasti akan terbata-bata dan kesulitan, tapi faktor keterpaksaan memang seringkali mampu membuat kita belajar dan mencoba hal baru yang kita tidak bisa sebelumnya.

### 6. Ketika mentok, coba balik ke dokumentasi

Karena kebiasaan saya yang suka melewati sesi membaca dokumentasi dengan baik di awal, maka saya sering harus bolak-balik membaca dokumentasi ketika sudah mentok dan tak tau arah mengerjakannya.

Tidak efektif? bisa jadi iya, saya bahkan kadang-kadang perlu bolak-balik ke dokumentasi untuk mengerjakan hal yang sama. Tapi saya sendiri merasa cara ini lebih baik buat saya dibandingkan membaca dengan benar di awal. Saya tidak akan meminta kalian melakukan hal yang sama, tapi mencoba cara yang berbeda dalam mempelajari hal baru bisa jadi akan menghasilkan output yang berbeda juga.

## Kalimat penutup

Belajar teknologi baru, sayangnya meskipun melelahkan mau tidak mau memang harus kita lakukan sebagai seorang web developer. Di tengah kencangnya angin perubahan, membuat diri kita relevan dengan jaman menjadi tidak terelakkan. Pilih-pilih hal yang ingin dan mampu dipelajari, tidak perlu semua hal dipelajari. Mampu memilih hal yang masih berkaitan maupun pendukung bagi pekerjaan utama kita adalah modal bagi tahap selanjutnya. Jadi, sudah belajar "framework" apa hari ini?

Photo by **[Andrea Piacquadio](https://www.pexels.com/@olly?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels)** from **[Pexels](https://www.pexels.com/photo/photo-of-woman-talking-with-another-woman-3768129/?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels)**
