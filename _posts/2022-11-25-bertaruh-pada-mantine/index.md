---
title: Bertaruh pada Mantine.dev
date: '2022-11-25'
excerpt: Beberapa alasan kenapa saya memutuskan mengadopsi Mantine.dev secara profesional di pekerjaan saya sehari-hari
author: mazipan
published: true
featured: false
tags: [web, frontend]
coverImage: /thumbnail/bertaruh-pada-mantine/pexels-jalil-shams-1007523.jpg
lang: id
enready: false
---

## 🤯 Masalah Saya

Salah satu masalah yang terlihat saat saya pertama kali bergabung di kantor saya sekarang adalah banyaknya *Internal Dashboard* (aplikasi yang digunakan oleh pihak internal saja -- umumnya berupa semacam *Admin Panel*) yang dibuat dengan berbagai macam tampilan yang berbeda-beda. 
Tentu saja sebenarnya ini cukup jamak ya mengingat prioritas saat men-develop *Internal Dashboard* memang sebagian besar cukup di *usability*-nya, bahasa kerennya sih "asal jalan" dan "bisa dipake". 
Tapi kalau mau dilihat lebih dalam lagi, perbedaan tampilan secara kasat mata ini biasanya juga mencerminkan perbedaan di internal codebase mereka. 

Benar saja, bisa ditemukan banyak variasi yang menjadikan semakin sulit untuk berpindah konteks dari satu aplikasi ke aplikasi lainnya, padahal dengan jumlah developer yang sedikit, berpindah konteks adalah hal yang sudah biasa dan sering terjadi dalam aktifitas harian mereka.

Paling tidak ada beberapa variasi yang bisa ditemukan saat itu:

- 🔸 Pake React, UI Kit-nya Bootstrap dan pake React Component [ReactStrap](https://reactstrap.github.io)
- 🔸 Pake React, UI Kit-nya Bootstrap dan pake React Component [React-Bootstrap](https://react-bootstrap.github.io/)
- 🔸 Pake React, UI Kit-nya Bootstrap tanpa tambahan React Component di atasnya
- 🔸 Pake Next.js, pake AntDesign sebagai UI Kit-nya
- 🔸 Pake Svelte, UI Kit-nya Bootstrap

Sebenernya setidaknya kita bisa lihat sedikit ada benang merah yang masih bisa dihubungkan, kebanyakan pakai React dan mengadopsi Bootstrap. Sayangnya pendekatan yang berbeda-beda dalam implementasi detailnya malah membuat benang merah tadi jadi semakin kusut dan butuh effort tinggi untuk bisa mengurainya.

## ✨ Alasan Ampuh

Sebagai Engineer, memang ego untuk melakukan *rewrite* dibandingkan hanya *patch* atau melakukan *workaround* pada sebuah aplikasi tidak bisa dinafikan, pun pada saya. Apalagi secara profesional, saya telah terlibat di banyak project rewrite dari satu tech-stack ke tech-stack lain, dari satu pendekatan ke pendekatan lain. 
Hasilnya memang selalu bisa memuaskan ego. 
Sayangnya saya juga mesti mengakui kalau jalannya biasanya terjal dan tidak mulus. 
*Rewrite* selalu jadi pilihan terakhir yang bisa saya pikirkan. 
Karena pilihan ini saya sadari biasanya bisa membuat waktu tidur saya berkurang tidak hanya dalam waktu sehari atau dua hari.

Menyadari ketidakmampuan saya menanggung beban sendiri, mulailah dengan banyak berdiskusi, *brainstorming*, saling silang pendapat dari berbagai *stakeholder*. 
Ngobrol dengan beberapa Engineer, ngobrol dengan para Manager, ngobrol dengan tim Designer pastinya, dan berbagai posisi lainnya. 
Pada dasarnya hampir semuanya sadar dengan masalah tersebut, hanya saja apakah hal tersebut masuk ke prioritas yang harus diselesaikan oleh mereka? Terus siapa nanti yang akan mengerjakan? 
Ini cukup klise untuk masalah-masalah yang *cross division* dan terlalu "enginering" titik berangkatnya. 
Salah satu batu loncatan yang mungkin,.adalah dengan mendompleng prioritas dari tim Designer. 
Tim Designer bisa punya prioritas yang lebih tinggi terkait hal ini karena dengan memiliki *Design System Language* dan komponen set yang stabil dan konsiten antar produk, dalam jangka dekat dan panjang akan memudahkan pekerjaan mereka.

Hal lain yang menjadi poin ampuh adalah kemampuan untuk *incremental adoption*. 
Dengan sifat alami dari Bootstrap yang banyak bermain dengan global CSS, opsi untuk upgrade Bootstrap ke versi teranyar jelas tidak bisa serta merta dilakukan dengan cepat, sangat besar kemungkinan (dan telah dibuktikan) akan berdampak ke berbagai halaman yang menjadikan mau tidak mau prosesnya jadi *big-bang*. 
Menawarkan proses *big-bang* di saat tim bisnis/produk punya banyak prioritas tentu saja sangat sulit untuk bisa diterima, pada akhirnya kemampuan Mantine yang bisa diadopsi secara incremental menjadikannya sebagai salah satu yang mudah diterima oleh tim lain pula.

## 🛳 Memilih Mantine.dev

[Mantine.dev](https://mantine.dev/) adalah UI Kit di atas React. 
Tentu saja ini bukan salah satu yang terdepan di lingkungan React, ada banyak opsi lain yang lebih *mature* untuk diadopsi pada aplikasi production. 
Beberapa yang biasanya akan masuk ke daftar pilihan bagi saya pribadi tentu saja Ant Design, MUI atau Material UI, Chakra UI dan teman saya ada yang sempat merekomendasikan Blueprint dari Palantir.

Perlu diketahui, jenis aplikasi yang ingin saya terapkan adalah internal dashboard, jadi yang umumnya akan jadi pertimbangan ketika memilih UI Kit adalah:

- 🔅 Ketersediaan beragam jenis komponen, karena style development di aplikasi semacam internal dashboard biasanya *fast pace* dan kalau bisa tidak perlu membuat komponen-komponen umum dari awal.
- 🔅 Data Grid, hampir semua halaman di internal dashboard akan menampilkan table dalam berbagai macam variasi. Ketersediaan Data Grid akan menjadi pembeda yang cukup signifikan.
- 🔅 Mudah di override style bawaannya, karena pada akhirnya akan ada waktu dimana proses override tidak bisa terhindarkan. Semakin rumit caranya, atau semakin tidak *maintainable* pendekatan yang digunakan dalam melakukan override, maka akan semakin kelam masa depannya.

Dari beberapa poin di atas, Mantine *stand-out* dalam beberapa hal, diantaranya:

- 🔹 Dokumentasinya *top-tier*, agak berlebihan tapi memang dokumentasinya Mantine itu sangat menyenangkan dibaca dan dijelajahi. Saya cukup paham, bahwa adopsi UI Kit baru berarti akan memaksa si developer untuk belajar lagi dan akan sangat sering membuka dokumantasi resminya. Kalau dokumentasinya menyesatkan, akan rumit ketika proses implementasi. Sejauh proses saya dalam proof of concept implementasi Mantine di projek kecil sih sangat menyenangkan prosesnya, tidak ada kendala signifikan, meskipun saya juga bolak-balik ke dokumentasinya.
- 🔹 Mudah authoring theme di atasnya, sangat mudah mengubah dari warna biru ke warna brand yang kita punya, mudah juga menambahkan berbagai *design token* yang dibutuhkan ke depannya.
- 🔹 Punya layout component macam `Flex`, `Grid`, `Group`, `Stack`, `Space` yang bisa mengurangi keharusan menulis CSS manual lagi. Membuat sebuah komponen, kini bisa dilakukan dalam satu file JavaScript saja.
- 🔹 Komponen set tergolong banyak, meskipun jauh dari komplit kalau pembandingnya UI Kit yang telah bertahun-tahun jadi andalan macam Ant Design atau Material UI.
- 🔹 Accessible by default, dukungan terhadap navigasi menggunakan keyboard terbilang cukup baik.
- 🔹 Pilihan designnya buat saya pribadi sangat cantik. Saya telah berdiskusi dengan tim Designer dan mereka juga cocok dengan style dari Mantine.

Namun tentu saja, tidak ada gading yang tak retak. Saya berjudi mengadopsi Mantine meskipun juga tau beberapa kekurangan yang saya rasakan, antara lain:

- 🔻 Tidak ada component Data Grid, Tree & Cascader yang ofisial. Tidak ada rencana dari si pembuatnya untuk membuat komponen rumit macam ini. Kemungkinan menunggu 3rd party dari komunitas atau mesti membuat sendiri kalau-kalau dibutuhkan. Untuk Grid sendiri, saya mencoba menggunakan [mantine-data-grid](https://kuechlin.github.io/mantine-data-grid/) di aplikasi kecil, tapi masih menggunakan [AG Grid](https://www.ag-grid.com/react-data-grid/) pada aplikasi rumit lainnya.
- 🔻 Props nya tidak se-"ramai" Chakra-UI, tidak semua jenis CSS Rule bisa di-pass lewat props, hanya beberepa yang fundamental macam spacing, size, color, dkk. Sisanya menggunakan opsi lain macam `sx`, `createStyles`, dll.

## 👣 Resiko Ditanggung Sendiri

Kalian tidak perlu ikut-ikutan saya menggunakan Mantine.dev di aplikasi yang kalian buat. Saya tidak dalam posisi mencari massa biar gak sendirian pake Mantine 🙊.

Tulisan ini bisa jadi hanyalah alasan yang saya buat-buat agar pilihan yang sebenarnya subjektif karena saya suka Mantine.dev, jadi terasa lebih objektif buat disampaikan 🤡.

---

Foto cover diambil dari [jalil shams di Pexels](https://www.pexels.com/id-id/foto/buah-merah-kuning-dan-hijau-68525/)
