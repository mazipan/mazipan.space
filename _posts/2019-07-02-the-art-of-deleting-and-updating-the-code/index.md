---
title: Seni menghapus dan memperbarui sebuah kode
date: '2019-07-02'
minute2read: 10
excerpt: Menceritakan bagaimana pekerjaan saya sehari-hari yang seringkali berhadapan dengan keharusan untuk menghapus kode orang lain
author: mazipan
published: true
featured: false
tags: [programming]
coverImage: /thumbnail/the-art-of-deleting-and-updating-the-code/quadran.png
lang: id
enready: true
---

Menceritakan bagaimana pekerjaan saya sehari-hari yang seringkali berhadapan dengan keharusan untuk menghapus kode orang lain

## Pengenalan terhadap masalah

Programmer seringkali diidentikkan dengan seseorang yang menulis sebuah kode untuk membuat sebuah perangkat lunak. Tidak salah, karena sebagian besar kita (programmer) memang memiliki pekerjaan sehari-hari untuk menulis berbaris-baris kode untuk membangun sebuah fitur, memperbaiki galat (cacat) pada sebuah perangkat lunak.

Menulis kode menjadi sebuah keahlian mendasar bagi seorang programmer, kita diharuskan bisa menterjemahkan sebuah solusi yang sudah didesain sebelumnya ke dalam barisan kode untuk menyelesaikan berbagai permasalahan dan perbaikan pada produk perangkat lunak.

Keahlian menulis kode seperti ini tidak jarang menjadi terlalu di eksploitasi pada beberapa tempat kerja programmer itu sendiri. Apalagi bila sudah dihadapkan pada batas waktu (_deadline_) yang terlalu mendesak. Kita bisa saja membabi buta menulis kode yang asal jalan tanpa mempedulikan berbagai kaidah yang seharusnya kita ikuti. Hal seperti ini seperti ini akan menjadi utang teknikal (_technical debt_) pada diri kita dan tim kita sendiri pada masa depan. Dan mengenai utang teknikal ini bila membaca penjelasan Bapak [Martin Fowler](https://martinfowler.com/) pada laman berikut [Technical Debt ↗️](https://martinfowler.com/bliki/TechnicalDebt.html) bisa diasosiasikan dengan utang finansial yang kalau kita tidak bayar sekarang pun suatu saat kita tetap harus membayarnya (ditambah dengan bunganya juga).

Seni menghapus dan memperbarui kode atau lebih kerennya dikenal dengan istilah **Refactoring**, merupakan proses memperbaiki kode, menghilangkan bagian yang tidak diperlukan lagi, menyatukan bagian yang ganda, dan berbagai hal berkaitan dengan bersih-bersih kode tanpa mengubah hasil akhirnya pada pengguna.

Karena itu programmer tidak melulu cuma tau tentang bagaimana menulis dan menambahkan kode, namun harus tau juga kapan harus menghapus dan memperbarui kode serta bagaimana cara terbaik untuk melakukannya.

## Mengapa programmer menulis kode asal jalan?

Programmer memiliki berbagai alasan kenapa mereka menulis kode yang asal jalan, tentu kita tidak bisa menyamaratakan kesemuanya karena bisa jadi alasannya memang hal tersebut adalah yang terbaik pada saat keputusan tersebut diambil.

Untuk hal ini kita bisa melihat pada [Technical Debt Quadrant ↗️](https://martinfowler.com/bliki/TechnicalDebtQuadrant.html) yang dijelaskan Martin Fowler, singkatnya bisa menilik pada gambar berikut:

![Technical Debt Quadrant](/thumbnail/the-art-of-deleting-and-updating-the-code/quadran.png)

<small class="caption">Gambar diambil dari laman https://martinfowler.com<small>

## Kenapa kita mesti menghapus dan memperbarui kode?

Ada jargon yang sering didengungkan oleh banyak temen-temen programmer di luar angkasa sana, bahwa "Kalau aplikasinya baik-baik saja, kenapa harus diubah?". Jargonnya tidak salah, namun juga tidak seutuhnya benar. Kata "baik-baik" saja disana sebenarnya bisa jadi relatif pada sudut pandang mana kita melihatnya. Baik-baik saja bisa jadi iya, karena pengguna akhir kita ternyata tidak mengalami galat pada saat menggunakan aplikasi kita. Baik-baik saja bisa jadi salah, karena ternyata mungkin secara sususan kode, aplikasi kita mempersulit tim programmer untuk mengembangkan fitur baru maupun memperbaiki galat yang sudah ada maupun yang kemungkinan akan ada di masa depan.

Beberapa alasan kenapa kita mesti menghapus atau memperbarui sebuah kode menurut Martin Fowler pada buku **[Refactoring ↗️](https://refactoring.com/)** antara lain:

### Meningkatkan desain perangkat lunak

Sebuah desain bisa jadi pada dasarnya sudah baik namun seiring waktu berjalan dan semakin banyak terjadi pengubahan dan penambahan kode maka menjadi semakin sulit untuk melihat desain tersebut. Proses menghapus dan memperbarui serta memperbaiki kode diharapkan bisa membersihkan berbagai ketidakteraturan yang menjadikan desain sebuah perangkat lunak menjadi susah untuk dilihat dan dipahami.

### Memudahkan dipahami

Semakin banyak kode maka semakin sulit memahami bagaimana kode tersebut bekerja. Salah satu solusinya adalah dengan menerapkan desain yang baik. Kebiasan kita seringkali menulis kode dengan berpikir bagaimana agar program tersebut berjalan dan melupakan bagaimana nanti programmer selanjutnya akan memahaminya.

### Membantu menemukan galat

Dengan semakin mudah memahami sebuah kode maka memberikan efek kita bisa mendeteksi berbagai galat yang sudah terjadi dan kemungkinan galat akan terjadi dengan lebih mudah.

### Membantu menulis kode dengan lebih cepat

Hasil akhirnya kita sebagai programmer bisa menulis kode, menambahkan berbagai fitur, memperbaiki galat dengan lebih cepat. Meskipun beberapa orang juga akan beragumen bahwa kecepatan pengembangan tidak akan selalu berbanding lurus dengan baiknya desain sebuah sistem.

## Kapan waktu terbaik mengerjakannya?

Hal ini juga saya ambil dari buku **Refactoring** yang dijelaskan saat-saat terbaik untuk melakukan pengubahan kode adalah sebagai berikut:

### Ketika menambahkan fungsi

Sudah umum bagi kita ketika membuat suatu fungsi untuk pertama kali ya cukup tambahkan saja, ketika membuat fungsi yang sama pada kali kedua ya salin saja kode tersebut dan biarkan terjadi kode ganda, namun ketika harus membuat fungsi yang sama untuk kali ketiga maka sudah dipikirkan menyatukan pada satu tempat yang bisa digunakan secara bersama-sama. Tidak jarang ketika kita diberikan tugas untuk membuat sebuah fitur kecil namun berakhir harus memperbarui banyak kode sampai ke dasar karena dirasa sulit menambahkan fitur tersebut tanpa mengubah dari dasar.

### Ketika harus memperbaiki galat

Ketika kita ditugaskan untuk memperbaiki galat maka kita diharuskan melakukan pelacakan jejak kebelakang mengikuti arus dari kode tersebut untuk memahami dan menemukan titik penyebab galat itu terjadi. Karenanya pada saat melakukan pelacakan dalam rangka menemukan titik penyebab ini dirasa sangat susah, bisa jadi ini karena pada saat awal menulis kode belum berpikir tentang bagaimana kode tersebut nanti akan dibaca orang lain. Melakukan perbaikan pada saat ini juga merupakan waktu yang cukup tepat karena biasanya dibarengi dengan adanya bantuan dari pihak Tester yang memastikan aplikasi tetap berjalan sesuai ekspektasi.

### Ketika code review

Code review merupakan saat yang tepat untuk saling mengkoreksi satu sama lain antar programmer, saling memberikan pendapat terhadap solusi yang diambil, termasuk juga pendapat mengenai bagaimana desain besar dari suatu kode di dalam projek.

## Pelajaran yang bisa diambil

Dunia teknologi berkembang sangat cepat, ada saja terobosan dan solusi terbaru setiap hari. Memilih profesi sebagai programmer berarti sudah harus siap dengan kecepatan perubahan ini. Apa yang kita anggap sebagai solusi terbaik saat ini bisa jadi sudah tidak relevan lagi setahun mendatang. Tetap updates dengan berbagai perkembangan terbaru, jangan merasa gundah ketika harus menghapus dan memperbarui kode. Jika bukan kalian yang mengerjakan, maka seseorang akan mengerjakannya suatu saat. Tidak perlu sayang untuk menghapus dan memperbarui kode hasil jerih payah kita sebelumnya, karena bisa jadi memang itu adalah yang terbaik yang harus diambil. Tak perlu juga menyalahkan si penulis kode sebelumnya, anggap saja bahwa setiap solusi memang ada lah yang terbaik pada saat solusi tersebut diputuskan untuk digunakan.

Terus belajar, karena itu merupakan proses yang semakin membuat kita besar, membuat kita tetap bertahan dan bersaing dalam dunia dengan perubahan yang begitu cepat.

### Demikian artikel kali ini, semoga bermanfaat...
