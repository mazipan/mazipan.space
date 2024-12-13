---
title: Menipu Lighthouse
date: '2020-11-03'
excerpt: Cara jahat menipu alat pengukur performa web Lighthouse
author: mazipan
published: true
featured: false
tags: [web-perf]
coverImage: /thumbnail/menipu-lighthouse/pexels-kaique-rocha-48013.jpg
lang: id
enready: false
---

## Mengenai Lighthouse

[Lighthouse](https://github.com/GoogleChrome/lighthouse) adalah salah satu alat ukur kecepatan waktu muat sebuah web yang banyak digunakan oleh para pengembang web. Hal ini semakin menjadi dengan keputusan peramban Chrome yang menjadikan Lighthouse menempel secara bawaan di DevTools mereka, menyusul kemudian alat ukur lain yang menjadikan Lighthouse sebagai tenaga dibelakang layar mereka, sebut saja [Web.dev/measure](https://web.dev/measure/), [PageSpeed Insight](https://developers.google.com/speed/pagespeed/insights/), [Treo.sh](https://treo.sh/), [Sitespeed.io](https://www.sitespeed.io/), bahkan [Webpagetest.org](https://www.webpagetest.org/) pun kini menggunakan Lighthouse sebagai tambahan tenaga disamping tenaga utama yang mungkin sudah mereka buat sendiri sebelumnya.

Dengan banyaknya alat ukur yang terintegrasi dengan Lighthouse dan semakin banyaknya pengembang web yang mulai peduli soal kecepatan waktu muat pada web yang mereka bangun, maka semakin banyak pula bertebaran mengenai cara bagaimana cara "cepat" mempercepat website mereka.

Pada dasarnya Lighthouse tidak hanya menyediakan hasil ukur, tapi juga memberikan berbagai rekomendasi yang bisa dikerjakan dari hasil analisa yang dijalankan. Sebenarnya ya kalau mau jujur sih itu-itu saja rekomendasinya. Hampir sebagian besar pengembang web juga sebenarnya tau kalau mengenai cara yang benar dalam mengirimkan web ke pengguna. Jika kalian belum tau, mungkin perlu membaca artikel [Cara memuat website](/best-practice-loading-a-web) yang sebenarnya juga itu-itu saja yang ditulis.

Pengembang web seharusnya sudah tahu bahwa semakin besar sumber daya yang dikirimkan (apapun itu) maka semakin lama pula waktu muat yang dibutuhkan, apalagi kalau jelas-jelas sumber dayanya akan diminta pada saat pertama kali kita mengunjungi web tersebut, sudah pastilah akan menjadi beban pemberat bagi si website. Jadi apa solusinya? ya pangkas ukurannya, pangkas jumlahnya. Ini sudah barang tentu. Tapi yakin apakah menerapkannya pada projek nyata akan semudah apa yang digembor-gembor kan?

Ada banyak intrik pada projek nyata yang menjadikan hal sederhana menjadi rumit. Kita bicara saja soal gambar. Gambar pada website merupakan hal yang cukup vital dalam membantu pengguna lebih nyaman dan mudah memahami informasi yang ada, sayangnya fakta bahwa gambar memiliki ukuran yang seringkali mengambil porsi yang besar dalam suatu website menjadikan pengembang harus pintar-pintar dalam mengolah dan menampilkan sumber daya jenis ini. Dalam projek sederhana, mudah saja mengoptimasi sebuah sumber daya gambar, kita bisa manual memanfaatkan [squoosh.app](https://squoosh.app/) untuk menghasilkan gambar dengan ukuran yang lebih kecil, kita bahkan bisa mengunduh gambar tersebut dalam format yang lebih modern, misalnya webp. Bagaimana di projek yang kompleks? Gambar yang ada tidak selalu datang dari kode sumber yang dikendalikan oleh pengembang, seringkali itu didapatkan dari pengguna yang melakukan unggahan ke dalam sistem. Lantas bagaimana cara optimasinya? Ya bisa saja pas pengguna mengunggahnya si sistem melakukan kompresi. Bagaimana dengan dimensinya? Mestinya bisa juga diubah dimesinya ketika proses unggah ini. Bagaimana kalau ternyata kita harus menampilkan ukuran yang berbeda untuk device desktop dan mobile? Ya sistem mesti membuat dua gambar dengan dimensi yang berbeda. Bagaimana dengan dukungan ekstensi modern, seperti webp? Ya harus buat lagi berkas terpisah.

Cukup rumit ya? Ya memang begitu lah, itu kenapa banyak yang memilih menggunakan CDN yang memang spesialis mengurusi gambar meskipun harus membayar biaya tambahan. Bisa jadi biayanya memang masih lebih murah dibandingkan harus mengurus sendiri.

Ini baru urusan gambar, bagaimana dengan JavaScript? Idealnya kan harus di pecah-pecah, atau bahasa kerennya [Code Splitting](/kesalahpahaman-mengenai-code-splitting). Pembahasannya sih seringkali mudah, intinya jangan memuat script yang tidak dibutuhkan, kalian harus memecah script tersebut ke `bundle` terpisah bisa tidak dibutuhkan pada saat pertama kali dikunjungi. Sayangnya prakteknya seringkali tidak semudah itu. Belum lagi kalau sudah urusan kode _third party_ atau pustaka yang digunakan bersama-sama oleh beberapa halaman, makin ribet lagi cara memecahnya.

Biarpun susah dan rumit prakteknya, tapi menurut saya pribadi sih justru disitu letak seninya, kalau gampang dan mudah dikerjakan oleh semua orang, ya gak perlu pamer juga lah kalau skornya bagus. Buat apa? Lha wong gak ada usahanya. Bandingkan kalau sudah berdarah-darah mengerjakannya, terus mendapati kenaikan meskipun sedikit, hal tersebut adalah kepuasan tersendiri bagi kita yang mengerjakannya.

## Tabir ilmu hitam

Kali ini saya tidak akan berbagi soal _best practice_ atau cara-cara benar yang bisa kalian kerjakan untuk memperbaiki skor performa web kalian, saya akan berbagi mengenai ilmu hitam yang seharusnya jangan kalian lakukan kalau tidak kepepet atau dipepet boss kalian 😂.

Ilmu hitam yang ingin saya sampaikan kali ini adalah teknik **_"Adaptive Serving"_**.

Intinya adalah kita menyesuaikan kondisi, kita mengirimkan hal yang berbeda tergantung situasi dan kondisi. Kalau di kalangan penganut ilmu putih, _Adaptive Serving_ digunakan dengan mendeteksi jenis perangkat, dukungan terhadap suatu fitur ataupun tipe jaringan yang sedang digunakan. Di kalangan ilmu hitam, hal-hal tersebut sih sebenarnya sudah wajib dikerjakan. Namun ada hal lain yang lebih kelam yang tidak seharusnya kita ikut-ikutan mencobanya.

Hal tersebut yakni dengan mendeteksi apakah web kita sedang dikunjungi oleh Lighthouse atau tidak. Jadi kita bisa saja menyajikan konten yang berbeda saat sedang dilakukan pengujian dengan Lighthouse dibandingkan ketika pengguna asli yang sedang berkunjung. Caranya ya dengan membaca User Agent yang dibawa.

Di peramban kita bisa mengecek User Agent dengan cara:

```js
window.navigator.userAgent;
// Contoh output:
// Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1
```

Untuk di Backend sendiri bisa bermacam-macam caranya tergantung dari bahasa yang digunakan, tapi umumnya sih tidak susah, biasanya akan terbawa di _headers_ setiap request. Tinggal cara mengambil _header_ yang biasanya beda-beda teknisnya.

Bagaimana dengan User Agent dari Lighthouse sendiri, kalau dari web [developers.whatismybrowser.com](https://developers.whatismybrowser.com/useragents/parse/682595-google-lighthouse) kita bisa mengetahui bahwa User Agent yang digunakan adalah:

```js
"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36(KHTML, like Gecko) Chrome/61.0.3116.0 Safari/537.36 Chrome-Lighthouse"
```

Sayangnya ini hanya untuk device desktop, sementara untuk device mobile akan beda lagi. Okelah kita bisa jadi tidak percaya dengan website begini, mari langsung saja kita tengok ke kode Lighthouse yang memang terbuka di Github ini. Dari file [lighthouse-core/lib/emulation.js#L44](https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/lib/emulation.js#L44), kita mengetahui bahwa ada dua konstanta yang digunakan oleh Lighthouse yakni:

```js
// eslint-disable-next-line max-len
const MOTOG4_USERAGENT = 'Mozilla/5.0 (Linux; Android 7.0; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4143.7 Mobile Safari/537.36 Chrome-Lighthouse';
// eslint-disable-next-line max-len
const DESKTOP_USERAGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4143.7 Safari/537.36 Chrome-Lighthouse';
```

Sudah kelihatan kan polanya? Selalu ada tambahan `Chrome-Lighthouse` di ujung User Agent yang digunakan oleh Lighthouse.

Jadi, mari kita santet si Lighthouse ini, lihat kode berikut:

```js
const Home = () => {
  // Cek string User Agent di peramban, apa memiliki kata "Chrome-Lighthouse" atau tidak
  const apakahLighthouse = /Chrome-Lighthouse/i.test(navigator.userAgent);

  return (
    <div>
      {
        apakahLighthouse ? <KontenBohongan /> : <KontenBeneran />
      }
    </div>
  );
};

export default Home;
```

Keliatan sudah kan, cara ampuh menipu Lighthouse dengan ilmu hitam.

## Kasus yang cocok

Saya bilang ini ilmu hitam karena rentan sekali dimanfaatkan dengan sembarangan, tapi pun pisau tidak selalu berbahaya bila dipegang oleh oleh orang yang tepat bukan?

Cara ini sesungguhnya memang memiliki contoh kasus yang sesuai untuk diaplikasikan, beberapa diantaranya:

👉  **Menghilangkan gangguan**, pada projek nyata seringkali kita dihadapkan pada berbagai komponen yang seringkali muncul di kunjungan pertama, misalnya popup penawaran newsletter, atau modal dialog sebuah promo kalau di situs e-commerce. 
Hal-hal seperti itu seringkali mengganggu pengecekan dengan Lighthouse sehingga akan lebih baik kalau dihilangkan pada saat pengetesan dijalankan.

👉  **Melangkahi suatu proses**, ada kalanya terdapat prasyarat untuk bisa mengunjungi suatu halaman, misalnya dibutuhkan proses otentikasi atau lainnya.
Proses ini bisa saja kita langkahi dengan membaca User Agent si Lighthouse serta menambahkan parameter tidak lazim yang sulit tertebak sebagai tambahan.

Meskipun begitu, kita mesti bijak menggunakannya, jangan karena bisa dan karena tau caranya maka semua hal dihilangkan.
Ini termasuk cara curang, namun kalau si boss terus menanyakan mengenai peningkatan yang sudah tidak masuk akal, mungkin memang sudah saatnya mengeluarkan jurus terakhir, ilmu hitam 😈

> Cara ini tidak seharusnya kalian gunakan, karena buat apa skor Lighthouse bagus tapi pengguna kalian sebenarnya tetap merana?

**_Catatan tambahan:_**

🏃  Saya tidak bertanggung jawab atas apa yang terjadi karena mengikuti artikel ini

🤸  Segala kerugian yang diakibatkan karena artikel ini menjadi tanggung jawab masing-masing

Photo by [Kaique Rocha](https://www.pexels.com/@kaiquestr?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels) from [Pexels](https://www.pexels.com/photo/people-canon-anonymous-levitate-48013/?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels)
