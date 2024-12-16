---
title: Mengirim tracker dengan percaya diri
date: '2023-12-25'
excerpt: Strategi untuk mengirimkan web tracker atau analitik dengan lebih baik dan percaya diri
author: mazipan
published: true
featured: false
tags: [web]
coverImage: /thumbnail/sending-tracker/pexels-francesco-ungaro-998633.jpg
lang: id
enready: false
---

## 🔦 Pengenalan

Web analitik adalah proses mengumpulkan, menganalisis, dan melaporkan data penggunaan situs web untuk memahami dan meningkatkan kinerja online. Ini melibatkan pelacakan metrik seperti jumlah pengunjung, sumber lalu lintas, perilaku pengguna, dan konversi, memberikan wawasan yang berharga bagi pemilik situs untuk mengoptimalkan pengalaman pengguna dan mencapai tujuan bisnis online.

Saat merilis produk ke lingkungan production, kehadiran sebuah analitik adalah hal yang vital. Karena ini menjadikan kita punya penglihatan (visibilitas) tentang bagaimana pengguna berinteraksi dengan produk kita. Data dari analitik ini akan membantu kita dalam melakukan peningkatan atau perbaikan di masa mendatang berdasarkan data yang tersedia.

Contoh paling umum dari web analitik yang sering digunakan adalah Google Analytics yang memang disediakan gratis oleh Google. Alternatifnya tentu saja ada banyak juga di pasaran, namun memang biasanya berbayar.

Pada praktek di lapangan, banyak pula yang menggunakan internal web analitik untuk mengumpulkan data web mereka dikarenakan satu dan lain hal. Artikel ini mencoba membahas bagaimana seharusnya sebuah web mengirimkan tracker/analitiknya dengan point of view dari seorang frontend engineer.

## 📚 Spesifikasi tracker

Katakan saja anak backend engineer akan membantu kita dalam melakukan implementasi detailnya, makanya tidak akan dibahas juga bagaimana cara membuat tracker servicenya di artikel ini, kita cukup membantu membuatkan spesifikasi dasarnya saja.

### -- 📤 HTTP method

Tracker paling umum di hit lewat Rest API, kalian bisa saja membuatnya dengan http method POST, dikarenakan behavior tracker yang sebaiknya tidak di cache dan under-the-hood sebenernya akan menambah data tracker baru ke penyimpanan data. Ini juga terkait dengan tracker yang biasanya memang harus mengirimkan parameter yang dinamis dan dalam jumlah yang banyak, yang praktiknya tentu lebih mudah disampaikan lewat request body dibandingkan lewat query parameter ala-ala method GET

### -- 🐣 Parameter request body

Kalau berkaca pada Google Analytics pada artikel [Event Parameter](https://developers.google.com/analytics/devguides/collection/ga4/event-parameters?client_type=gtag), mereka mendukung parameter `eventName` dan pair key-value object yang isinya bisa custom atau biasa disebut dengan [Custom Dimension](https://support.google.com/analytics/answer/10075209?hl=en&ref_topic=11151952&sjid=16224040604124315262-AP).

Contoh kodenya:

```js
gtag('event', '<event_name>', {
  // <event_parameters>
});

// Sample tracker
gtag('event', 'screen_view', {
  'app_name': 'myAppName',
  'screen_name': 'Home'
});
```

Meskipun berarti nanti isinya secara teknis mestinya bisa dinamis dan bisa diisi spesifikasi key-value apapun, beberapa kolom ini disarankan ada:

- ● `timetamp`: Ada dua jenis timestamp yang berbeda, satunya adalah waktu tracker tersebut di trigger, dan waktu kapan tracker tersebut ditulis ke storage
- ● `sessionId`: Kalau dari artikel [[GA4] About Analytics sessions](https://support.google.com/analytics/answer/9191807?hl=en), mereka akan generate sessionId dengan expiry 30 menit dan akan selalu diperpanjang saat pengguna masih aktif berinteraksi. Praktikalnya mungkin bisa menggunakan Cookie yang selalu diperpanjang tiap kali halaman/tracker-nya di hit. Tapi kalau web klien sudah meng-*handle* sessionId sendiri (misalnya sudah punya otentikasi yang akan generate sessionId), ya menurutku sih sebaiknya integrasi pakai sessionId yang sama aja, gak perlu bikin sessionId untuk tracker lagi.
- ● `deviceId`: unik per device pengguna, bisa dengan menyematkan Cookie dengan expiry yang panjang, atau pakai localStorage
- ● `eventName`: kalau digunakan oleh berbagai klien, mungkin bisa ditambahkan konvensi dengan prefix nama aplikasi klien
- ● Lainnya adalah tambahan atribut yang berupa key-value object tadi

### -- 🔥 Mekanisme *fire forget*

Rest API untuk tracker sebaiknya dibuat dengan menganut prinsip *fire and forget*, artinya klien tidak perlu tau apakah berhasil atau gagal proses di belakang layarnya, pun tidak perlu menunggu proses tersebut selesai. Jadi apapun yang terjadi, secepatnya kembalikan saja response bahwa tracker yang dimaksud sedang atau akan diproses.

### -- 🍡 Batching request

Service Tracker adalah salah satu service yang kemungkinan akan di hit dalam frekuensi yang tinggi, selain dituntut untuk memiliki reliability dan availability yang tinggi juga sebaiknya prosesnya dikerjakan dengan efektif. Dalam hal ini, kalau transport-nya bisa dikurangi, maka sebaiknya begitu. Service tracker sebaiknya memiliki kemampuan untuk mengirimkan beberapa tracker sekaligus dalam satu satuan permintaan, ini akan membantu mengurangi jumlah traffic bolak-balik yang harus dikerjakan antara klien-server.

## 🛳️ Metode mengirimkan tracker

Karena dibuat dengan Rest API, cara paling mudah untuk mengirimkan tracker ya dengan hit API tersebut (misalnya dengan menggunakan Fetch API) ketika terdapat interaksi yang memang harus dikirimkan datanya.

Sebaiknya kita tidak serta-merta mengirimkan data tracker tersebut ketika sebuah aksi dilakukan, melainkan dikumpulkan di memori terlebih dahulu dan dikirimkan bersamaan pada saat yang tepat untuk menghindari penumpukan HTTP request yang akan memperlambat waktu muat website secara keseluruhan.

### -- 🛢️ Cara mengumpulkan tracker

Seperti disebutkan di atas pada bagian spesifikasi di mana sebaiknya kita membuat service tracker kita memiliki kemampuan untuk menangani batch request atau mengirimkan banyak data dalam sekali permintaan. Untuk memaksimalkan kemampuan tersebut, dari sisi FE (frontend engineer) perlu memperbaiki cara kita mengumpulkan tracker, jikalau sebelumnya atau paling tidak cara paling mudahnya adalah dengan mengirimkan tracker secepat mungkin saat suatu aksi di-trigger, maka kali ini kita tidak lagi langsung mengirimkan melainkan membuat suatu penampung sementara sebelum nantinya dikirimkan bersamaan.

Belajar dari cara Google Analytics dalam melakukan inisiasi tracker mereka (bisa dibaca di tautan [memasang gtag.js](https://developers.google.com/tag-platform/gtagjs/install?hl=en))

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=TAG_ID"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'TAG_ID');
</script>
```

Dia menginisiasi Array di memori `window.dataLayer = window.dataLayer || [];` dan ketika melakukan push event, sebenarnya hanya `push` item baru ke dalam Array ini. Kita bisa ikuti teknik ini.

### -- ⏰ Waktu yang tepat mengirimkan tracker

Waktu yang tepat bisa jadi tergantung dari strategi yang diambil. Menurut saya, paling tidak ada 2 strategi yang bisa diambil sebagai alternatif:

- 1️⃣ Menggunakan timer
- 2️⃣ Listen event saat user pindah halaman

Cara pertama, kita perlu menambahkan timer (`setInterval`) dalam satuan waktu, saat mencapai waktu yang diinginkan, perlu melakukan cek apakah ada tracker yang tersedia di memori, kalau gak ada bisa dilewati, sedangkan kalau ada, maka dikirimkan ke server kemudian dikosongkan kembali memorinya.

Sayangnya cara pertama tetap bisa menimbulkan ada tracker yang tertinggal belum sempat dikirim sementara pengguna keburu berpindah halaman, melakukan hard refresh atau menutup halaman. Sehingga jika kalian mengambil opsi pertama, menurutku tetap saja harus dikombinasikan dengan opsi ke dua untuk mengakomodir tracker yang tertinggal.

Cara kedua, di lain sisi adalah dengan mendengarkan (listen) ke event saat pengguna melakukan perpindahan halaman atau istilahnya unload. Kita bisa mendengarkan event ini dengan cara:

```js
addEventListener("beforeunload", (event) => {
  // Kirim tracker di sini
});
```

Baca selengkapnya di MDN [mengenai beforeunload](https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event)

Sayangnya event `beforeunload` ini sudah tidak lagi direkomendasikan untuk digunakan, baca selengkapnya mengenai isu ini di artikel [Don't lose user and app state, use Page Visibility](https://www.igvita.com/2015/11/20/dont-lose-user-and-app-state-use-page-visibility/)

Disarankan saat ini sebaiknya menggunakan [Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilitychange_event)

```js
document.onvisibilitychange = () => {
  if (document.visibilityState === "hidden") {
    // Kirim tracker di sini
  }
};
```

Event ini dijalankan saat pengguna berpindah halaman, mengganti atau menutup tab dari peramban, mengecilkan atau menutup peramban tersebut, atau kalau di device mobile itu saat berpindah dari peramban ke aplikasi lain. Menurut MDN dan banyak referensi lain, ini adalah titik atau waktu yang pas untuk mengirimkan data semacam tracker.

### -- 🐷 Teknik menghindari kehilangan tracker

Karena tracker dikirimkan saat halaman beralih, ada kemungkinan sebuah HTTP request ini putus di jalan sebelum benar-benar selesai disampaikan. Tambahan lain untuk membantu menangani kasus ini adalah dengan beralih dari Fetch API ke [Beacon API](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon). Beacon API digunakan untuk mengirimkan selayaknya HTTP dengan method POST tapi dengan design yang memang dikhususkan untuk kasus semacam tracker/analitik.

Contoh kode mengirimkan tracker dengan Beacon API:

```js
document.addEventListener("visibilitychange", function logData() {
  if (document.visibilityState === "hidden") {
    // Contoh mengirim tracker ke endpoint /track
    navigator.sendBeacon("/track", analyticsData);
  }
});
```

Kalau misalnya ragu dengan dukungan peramban soal Beacon API, bisa juga bikin fallback ke tradisional Rest API kalau `sendBeacon` tidak tersedia. Misalnya:

```js
document.addEventListener("visibilitychange", function logData() {
  if (document.visibilityState === "hidden") {
    if (typeof navigator.sendBeacon === 'function') {
      // Contoh mengirim tracker ke endpoint /track
      navigator.sendBeacon("/track", analyticsData);
    } else {
      // Fallback ke Fetch API
      fetch('/track', {
        method: 'POST',
        body: JSON.stringify(analyticsData)
      })
    }
  }
});
```

## 🫰 Kasus serupa

Meskipun artikel ini ditujukan untuk mengirimkan tracker yang biasanya diperuntukkan untuk melakukan track pada interaksi pengguna, tapi pendekatannya bisa juga diaplikasikan pada kasus lain yang memiliki perilaku hampir serupa. Misalnya mengirimkan log dari klien, semacam Sentry.

## 😵‍💫 PR tambahan

- ▶️ Proses *retry* atau percobaan mengirimkan ulang, saat proses pengiriman pertama terjadi kesalahan, semisal tiba-tiba service tracker-nya sedang mengalami kendala, atau internet networknya tiba-tiba melambat signifikan sehingga timeout, dan alasan lainnya.

## 📖 Bacaan tambahan

- ▶️ [Why Most Analytics Efforts Fail](https://www.reforge.com/blog/why-most-analytics-efforts-fail) by Crystal Widjaja, ada poin yang ngasih petunjuk bagaimana sebaiknya membuat event name pada tracker, tidak terlalu generic tapi juga tidak terlalu spesifik. Ada contohnya pula, mantap buat dibaca.

---

**👋 Sekian dan terima kasih**

Maaf-maaf aja kalau gak bermanfaat 🙇😭

---

Foto cover diambil dari laman [Pexel](https://www.pexels.com/id-id/foto/bukit-pasir-dengan-cetakan-kaki-998633/), Foto oleh [Francesco Ungaro](https://www.pexels.com/id-id/@francesco-ungaro/)
