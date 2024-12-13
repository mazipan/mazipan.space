---
title: Membuat pull request yang ciamik
date: '2020-10-31'
excerpt: Bagaimana sih cara-cara membuat pull request yang sedap dipandang mata?
author: mazipan
published: true
featured: false
tags: [open-source]
coverImage: /thumbnail/membuat-pull-request-ciamik/you-shall-not-merge.png
lang: id
enready: false
---

Membuat pull request seharusnya menjadi pengetahuan dasar ketika kita bekerja dengan berkolaborasi bersama pengembang lain. Sayangnya bahkan buat pengembang yang sudah malang melintang pun tidak jarang membuat pull request seadanya, termasuk juga saya yang menjadi pelakunya. Jadi mari kita belajar bersama-sama mengenai bagaimana membuat pull request yang ciamik.

## Mengenai pull request

Github sudah menjelaskan mengenai [apa itu pull request](https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/about-pull-requests) bahkan sudah mewanti-wanti beberapa poin yang seharusnya jadi perhatian kita bersama. Pull request memberikan kita kesempatan untuk memberitahukan kepada pengembang lain mengenai perubahan yang telah kita kerjakan di branch tertentu pada suatu repository. Sekali membuka pull request, maka kita bisa membuka diskusi pula mengenai perubahan-perubahan yang ada dengan para kolaborator, menjelaskan setiap commit atau perubahan yang dibuat, mengerjakan perubahan yang diminta atau disarankan, sebelum akhirnya nanti semua perubahan tersebut diterima dan digabungkan ke branch utama yang digunakan.

Sebelum membahas lebih jauh, saya akan coba mengupas alur kerja yang biasa digunakan oleh para pengembang dalam berkolaborasi, berikut garis besarnya:

## Alur kolaborasi umum dalam satu repository

Pada pekerjaan privat biasanya tidak diperlukan [metode fork](https://docs.github.com/en/free-pro-team@latest/github/getting-started-with-github/fork-a-repo#fork-an-example-repository), sehingga caranya cukup dengan memberikan akses untuk seseorang langsung ke repository terkait. Ini berarti semua pengembang akan bekerja di satu repository yang sama.

Cara umum untuk berkolaborasi dalam kondisi satu repository begini biasanya:

👉  **Buat branch baru dari branch utama**

Umumnya setiap perusahaan sudah punya konvensi atau aturan tersendiri dalam penamaan branch baru, misal: `namaorang/nama-fitur-atau-bug`, atau `namaorang/nomor-tiket`.
Kalau kalian sedang ada di bench utama macam `master` atau `main`, berarti pastikan dulu kalian sudah mengambil kode teranyar dengan perintah:

```shell
$ git pull origin master 
# master mungkin perlu diganti menjadi main, tergantung nama branch utama
```

Buat branch baru dengan perintah:

```shell
$ git checkout -b nama-branch-baru
# misal nama branch barunya: mazipan/fitur-baru
```

👉  **Bekerja di dalam branch baru yang dibuat**

Kita tidak akan bekerja di branch utama, hal sederhana tapi mesti dibiasakan.
Kita tidak selalu punya akses ke branch utama, membiasakan untuk bekerja di branch selain branch utama akan mengajarkan kita cara berkontribusi dengan alur yang biasanya digunakan di open source.

👉  **Setelah selesai bekerja, buat pull request ke branch utama**

Ini dilakukan tentu setelah kalian selesai melakukan serangkaian pengujian, baik di lokal kalian ataupun di lingkungan development lainnya.
Semua pekerjaan telah di commit dan di push ke remote branch.

```shell
$ git commit -m "feat(nama-fitur): menambahkan fitur baru"
$ git push

# atau bila belum pernah push dengan branch baru tersebut
$ git push -u origin nama-branch-baru:remote_branch
```

Buat pull request dengan mengunjungi web, misal ke tautan: [mazipan.space/compare](https://github.com/mazipan/mazipan.space/compare).
Pastikan branch asal dan tujuannya sudah benar, cek changes yang ada, jangan lupa berikan nama dan deskripsi.

👉  **Meminta review kode kepada teman sejawat**

👉  **Memperbaiki kode berdasarkan review yang ada**

👉  **Diterima atau ditolak untuk masuk ke branch utama**

## Alur kolaborasi dalam repository hasil fork

Caranya sebenarnya secara garis besar akan sama saja, hanya saja karena dalam versi fork kita tidak mempunyai akses langsung ke repository utama, melainkan hanya repository salinan dari aslinya. 
Ini yang menjadikan kita bisa saja langsung melakukan perubahan di branch utama, karena repository fork pada dasarnya adalah milik pribadi, kita bisa langsung menyasar ke branch utama tanpa perlu takut diteriaki oleh orang lain.
Meskipun punya akses ke branch utama, misalnya `master`, saya sendiri tidak merekomendasikan untuk bekerja langsung di branch utama. 
Sebaiknya tetap gunakan branch lain untuk bekerja.
Hal ini agar lebih mudah kedepannya kalau harus sinkronisasi antara branch utama repo fork dengan repo utamanya.
Terkecuali sejak awal memang sudah dipastikan kalau kalian tidak akan melakukan sinkronisasi dengan repo utamanya.

## Tips melakukan sinkronisasi pada repository hasil fork

Ini menjadi tantangan apalagi untuk repo hasil fork.
Makanya prinsip pertama yang harus dipegang ketika bekerja di forked repository adalah **JANGAN** bekerja di branch utama.
Ini benar-benar akan menyulitkan proses sinkronisasi nantinya.

Jika terbiasa tidak bekerja di branch utama, maka Github saat ini sudah menyediakan tombol manual untuk melakukan sinkronisasi di repo hasil fork dengan tombol `Fetch upstream`.
Sayangnya ini hanya bisa dilakukan saat kita sedang di depan laptop dan sedang online membuka Github.
Makanya di hampir setiap repo fork saya, saya biasanya memasang aplikasi tambahan untuk membantu melakukan sinkronisasi otomatis.

Kunjungi aplikasi [Pull by Wei](https://wei.github.io/pull/), pasang di repo hasil fork dan aplikasi ini akan secara berkala melakukan sinkronisasi otomatis dari repo utama.

## Kriteria pull request yang ciamik

Ciamik menurut saya bisa berbeda dengan ciamik yang kalian anut, dan berikut adalah pull request yang ciamik versi saya pribadi:

**1. Memiliki judul yang jelas, singkat dan menggambarkan perubahan yang dibuat**

Judul pull request merupakan kesan pertama yang akan didapatkan oleh orang lain ketika mendapatkan notifikasi maupun lewat daftar pull request,
judul menjadi krusial karena merupakan pembeda, penanda dan gerbang awal untuk pemrogram lain mengerti konteks umum dari perubahan yang kalian buat.

Beberapa perusahaan umumnya juga memiliki konvensi atau aturan bagi pembuatan judul pull request.
Misalnya saja konvensi yang umum mengadopsi dari standard **[Commitizen](https://github.com/commitizen/cz-cli)** juga, contohnya:

👉  `feat: menambahkan fitur share ke sosial media`

Awalan `feat:` digunakan untuk menandakan pull request yang dibuat berisikan fitur tambahan baru.

👉  `chore: menambahkan linter`

Awalan `chore:` digunakan untuk pull request yang tidak memiliki dampak langsung terhadap kode di level production, misalnya bersih-bersih kode, memperbaiki struktur direktori, dan sebagainya.

👉  `fix: memperbaiki tampilan header`

Awalan `fix:` digunakan untuk perbaikan terhadap fitur yang sudah ada namun berjalan tidak semestinya.

👉   Serta berbagai konvensi lainnya

Namun bilapun belum ada konvensinya, tetap saja membuat judul yang baik adalah salah satu ciri pull request yang baik.

**2. Memberikan penjelasan yang gamblang mengenai perubahan yang dibuat**

Ini merupakan bagian yang paling penting namun sering sekali ditinggalkan, bahkan di kalangan pemrogram yang sudah *pro* saja seringkali membuat pull request tanpa ada deskripsi sama sekali.
Sepertinya asal buka pull request dan berharap orang lain bisa mengerti.
Kenapa ini penting? Ini merupakan tempat bagi kita untuk memberitahukan konteks dari perubahan yang kita buat, dampak apa yang terjadi dari perubahan tersebut, serta bagian-bagian yang kemungkinan harus dicek lebih teliti karena berpotensi menimbulkan galat atau mengubah alur dari kode sebelumnya.

Salah satu tips dari saya pribadi, coba posisikan diri kalian sebagai orang yang melakukan review pull request tersebut.
Pastikan mereka bisa melakukan review dengan tepat. 
Dengan memberikan penjelasan segamblang mungkin kita bisa mengarahkan si reviewer untuk bisa langsung tertuju ke sasaran yang seharusnya.

Me-review kode dalam pull request itu bukan pekerjaan mudah, apalagi bila kita tidak paham mengenai konteks bisnis flow yang dikerjakan.
Dengan adanya penjelasan yang baik, pekerjaan mereview biasanya akan lebih mudah dan terarah.

Beberapa hal yang mestinya ada di deskripsi pull request antara lain:

👉  Kesimpulan atau _summary_ dari pull request

👉  Perubahan-perubahan penting yang perlu diperhatikan, misal saja menambahkan kalimat: saya mengubah kode di file A menjadi begini dengan tujuan begitu.

👉  Cara atau langkah melakukan pengujian, bisa berupa langkah detail ataupun cukup alamat dimana orang lain bisa melihat dan mengecek perubahannya.

**3. Menyertakan informasi pendukung**

Informasi ini adalah yang diharapkan mampu mendukung penjelasan kita di deskripsi, bisa macam-macam, diantaranya:

👉  Nomor issue atau tiket, bila memang terkait dengan suatu issue atau tiket

👉  Kondisi sebelum serta kondisi yang diharapkan setelah perubahan atau perbaikan, bisa berupa gambar atau cukup dengan kalimat saja

👉  Tautan ke dokumen pendukung, misal PRD, API spesifikasi, design mockup, test report, dan lain sebagainya

**4. Tidak membawa perubahan yang tidak relevan**

Fokus ke tujuan utama membuka pull request, jangan menambahkan perubahan yang tidak relevan dengan tujuan awal.
Kalau ada yang perlu ditambahkan namun tidak relevan, maka sebaiknya buka pull request lain saja.
Misalnya saya membuka pull request untuk memperbaiki style pada header, maka pastikan perubahannya juga hanya di bagian ini.
Jangan menambahkan perubahan lain, misal ikut mengubah style untuk product card.
Ini mengakibatkan orang jadi tidak fokus melakukan pengujian dan review, alhasil bisa saja perubahan yang kalian ikutkan terlewat untuk dilakukan pengujian terlebih dahulu.

**5. Memiliki riwayat commit yang mudah ditelusuri**

Commit history yang acak-acakan juga bisa menimbulkan gangguan bagi si reviewer, memperbaiki history sebelum pull request dibuka bisa jadi solusi kalau kalian memang hobi bikin commit asal-asalan sebelum siap di bukakan pull request.
Beberapa orang perlu memperhatikan alur commit juga pada saat melakukan kode review, ini kenapa memperbaiki riwayat commit bisa jadi perlu dilakukan.

## Kebiasaan yang bisa meningkatkan kualitas pull request

👉  Judul pull request umumnya secara otomatis akan mengambil dari judul commit yang pertama dari suatu branch.

Karenanya membuat judul commit pertama dengan baik, akan mempermudah kita membuat judul pull request pula.

👉  Biasakan membuat pull request saat sudah yakin, sudah dilakukan test sana-sini, sudah dibuatkan unit test, dan lainnya.

Ini untuk mengurangi terlalu banyak perubahan yang mestinya tidak diperlukan saat pull request sudah dibuka.
Terlalu banyak menambahkan commit baru saat pull request sudah dibuka seringkali juga akan menggangu proses diskusi pada pull request tersebut.

👉  Bila bekerja sendirian, kita bisa memperbaiki commit history sebelum pull request dibuka, saya biasanya menggunakan perintah:

```shell
$ git rebase -i master
```

Artinya meminta melakukan rebase dengan cara interaktifar bisa mengubah pesan commit yang sebelumnya dibuat tidak beraturan.

Ubah semua `pick` menjadi `squash` atau `s` kecuali commit pertama.

Dan teruskan proses rebase sampai selesai.

Lakukan force push dengan perintah:

```shell
$ git push -f
```

👉  Biasakan menulis dokumentasi

Kebiasaan ini akan melatih kita membuat deskripsi pull request juga

👉  Sempatkan untuk melakukan review pull request orang lain

Agar lebih bisa merasakan, kenapa pull request dengan deskripsi yang jelas itu penting

👉 Lakukan sinkronisasi secara berkala

---

Demikian artikel ini, semoga bermanfaat 🙏
