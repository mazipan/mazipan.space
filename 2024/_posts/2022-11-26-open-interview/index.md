---
title: Interview terbuka bersama mazipan
date: '2022-11-26'
excerpt: Berbagai contoh pertanyaan yang kemungkinan akan saya tanyakan kalau secara tidak sengaja diinterview oleh saya sebagai Frontend Engineer
author: mazipan
published: true
featured: false
tags: [interview, frontend]
coverImage: /thumbnail/open-interview/pexels-tima-miroshnichenko-5336951.jpg
lang: id
enready: true
---

Artikel ini secara terbuka akan memberikan berbagai daftar pertanyaan yang umumnya akan saya tanyakan, kalau secara tidak sengaja kalian ketemu saya pada satu sesi interview spesifik untuk posisi Frontend Engineer.

## ✍️ Q&A Singkat

- ❔ **Apakah semua daftar tersebut akan selalu saya tanyakan**: Bisa iya bisa tidak, bisa berkembang pertanyaannya, tapi umumnya masing-masing interviewer biasanya punya set of pertanyaan andalan yang sering ditanyakan pada setiap sesi interview. Jadi sebagian besar daftar di sini adalah pertanyaan andalan dari saya pribadi, kemungkinan besar akan saya tanyakan.

- ❔ **Kenapa gak disertakan jawabannya**: Ya karena jawabannya gak akan *text-book* juga. Sebaiknya memang jelaskan sesuai dengan gaya dan pengetahuan yang kalian punya saja. Beberapa pertanyaan juga merupakan *open question*, jadi antar satu dan orang lain akan berbeda hasilnya.

## 🧑‍🏫 Proses Interview Soft. Engineer Secara Umum

Sebelum saya mulai *breakdown* berbagai pertanyaan yang biasa saya tanyakan, ada baiknya kalian memahami dulu proses interview software engineer secara umum.
Kalian bisa memahaminya dengan menonton video di YouTube Channelnya [Gogo](https://twitter.com/lwastuargo) mengenai [Gimana sih proses interview software engineer?](https://www.youtube.com/watch?v=gczDiFOWLOY)
Kalau belum sempat nonton, sempatkan buat nonton dulu. Jangan lupa klik "Laik" dan "Sabskreb" 👋

Prosesnya bisa beda-beda, tapi secara umum akan mirip-mirip dengan skema yang berbeda-beda. Ada yang dipisah-pisah ke beberapa sesi, ada yang digabungkan semuanya jadi satu sesi.

## 💻 Live Coding

Bagian ini saya akan *run* pertama, saya biasanya akan meminta Live Coding untuk 2 hal:

- ⭕️ **HTML & CSS**: Biasanya hanya meminta untuk dibuatkan layout sederhana menggunakan HTML dan CSS.
- ⭕️ **Struktur Data**: Seperti pertanyaan struktur data pada umumnya, kemungkinan akan bermain dengan berbagai tipe data.

Bisa nonton video dari Gogo tentang [Interview koding algoritma dan struktur data](https://www.youtube.com/watch?v=MkQEaIZkhYQ&t=484s) dan [Mock interview - koding algoritma dan struktur data](https://www.youtube.com/watch?v=8s1Vh_7symo).

### Beberapa contoh soal Live Coding untuk Frontend

⏩ **Membuat replika library `classnames`**

Buatlah fungsi utility untuk men-generate string classname, kalian bisa melihat beberapa contoh test case untuk fungsi ini:

```js
classNames('foo', 'bar'); // => 'foo bar'
classNames('foo', { bar: true }); // => 'foo bar'
classNames({ 'foo-bar': true }); // => 'foo-bar'
classNames({ 'foo-bar': false }); // => ''
classNames({ foo: true }, { bar: true }); // => 'foo bar'
classNames({ foo: true, bar: true }); // => 'foo bar'

// lots of arguments of various types
classNames('foo', { bar: true, duck: false }, 'baz', { quux: true }); // => 'foo bar baz quux'

// other falsy values are just ignored
classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, ''); // => 'bar 1'

var arr = ['b', { c: true, d: false }];
classNames('a', arr); // => 'a b c'
```

⏩ **Membuat fungsi untuk Memoize**

Buatlah fungsi yang bisa melakukan Memoize/Cache terhadap suatu argumen fungsi, tujuannya agar suatu fungsi tidak perlu memanggil fungsi aslinya untuk kali ke-dua dan seterusnya.

Contoh test case:

```js
// write your Memoize fn here
function memoize () {}

function add (a, b) {
  console.log('Call origin Add function', a, b)
  return a + b
}

const memoizedAddFn = memoize(add)

console.log(memoizedAddFn(1, 2)) // => print 3, but should call the origin fn
console.log(memoizedAddFn(1, 2)) // => print 3, but should not call the origin fn
console.log(memoizedAddFn(1, 2)) // => print 3, but should not call the origin fn
```

⏩ **Contains duplicate**

[Baca soal ini di LeetCode](https://leetcode.com/problems/contains-duplicate/)

⏩ **Intersection of two Array**

[Baca soal ini di LeetCode](https://leetcode.com/explore/interview/card/top-interview-questions-easy/92/array/674/)

## 📝 Pertanyaan Umum

Berikut adalah daftar berbagai pertanyaan umum yang kemungkinan saya tanyakan:

### 🌍 Web Fundamental

- 🟩 Jelaskan perbedaan kalau kita *load* sebuah berkas JavaScript dengan hanya menggunakan tag `<script>` dengan `<script async>` dan `<script defer>`
- 🟩 Jelaskan mengenai attribute `rel=noopener` dan/atau `rel=noreferrer` yang biasanya ditambahkan pada tag link (`<a href="..." rel="noopener noreferrer">`)
- 🟩 Sebutkan beberapa semantic tag pengganti `div` yang kamu tau?
- 🟩 Jelaskan perbedaan antara `Cookie`, `Local Storage` dan `Session Storage`! Kapan kita mesti pakai masing-masing dari mereka? Jelaskan pula *trade-off* kalau pakai masing-masing dari mereka!
- 🟩 Apa itu `prefetch`, dan apa itu `preload`? Adakah use case yang tepat kapan kita sebaiknya pakai hal tersebut? Dan kapan sebaiknya kita menghindari pakai hal tersebut?
- 🟩 Bagaimana cara membuat peramban agar melakukan *cache* terhadap *resource* statis yang sudah pernah di request sebelumnya?
- 🟩 Apa itu `CDN`? Dan bagaimana peran `CDN` dalam penyajian sebuah website? Kenapa dan kapan kita perlu pakai `CDN`? Resource yang seperti apa yang sebaiknya disajikan melalui di `CDN`?
- 🟩 Bagaimana cara kamu kalau diminta menyajikan sebuah *layout* yang sangat berbeda antara Desktop dan Mobile?
- 🟩 Jelaskan mengenai `CORS` (*Cross-Origin Resource Sharing*)! Kapan dan kenapa dia bisa terjadi? Sebutkan beberapa alternatif solusi yang bisa dikerjakan saat ketemu masalah tersebut.

### 🟡 JS Fundamental

- 🟩 Apa bedanya antara `.forEach` dan `.map`?
- 🟩 Apa bedanya antara `debounce` dan `throttle`? Sebutkan use case kapan kita pakai masing-masing mereka!
- 🟩 Jelaskan mengenai *Closure* di JavaScript.

### ⚛️ Frameworks

- 🟩 Jelaskan soal *semantic versioning*!
- 🟩 Jelaskan bedanya `dependencies`, `devDependencies` dan `peerDependencies` pada `package.json`!
- 🟩 Jelaskan *Rule of Hooks*! Kapan kita bisa pakai Hooks di React?
- 🟩 Jelaskan fungsi *Array Dependency* pada `useEffect`, Bagaimana penggunaanya dan apa pengaruhnya kalau kita tidak tambahkan atau salah mendefinisikan dependency-nya dengan tepat? Bagaimana dengan fungsi *Cleanup* pada `useEffect`? Kapan kita menambahkannya?
- 🟩 Jelaskan mengenai *Server-Side Render*, *Client-Side Render* dan *Static Site Generated*! Kapan kita sebaiknya pakai masing-masing diantaranya? Sebutkan pula kekurangan kalau pakai masing-masing mereka!
- 🟩 Jelaskan perbedaan `Rest API` dengan `GraphQL`! Sebutkan kelebihan dan kekurangan mereka masing-masing! Kapan sebaiknya kita pakai `Rest API`? Kapan pakai `GraphQL`?
- 🟩 Sebutkan beberapa alternatif solusi mengatur CSS di sebuah projek yang kamu tau dan bagaimana pendapatmu mengenainya, pilihan mana yang biasanya kamu ambil, kenapa mengambil pilihan tersebut? Bagaimana caramu menghindari masalah dengan *specificity* di CSS?
- 🟩 Bagaimana konsep membuat sebuah *lazy load* pada komponen gambar/*image*? Jelaskan beberapa alternatif pendekatan yang bisa dikerjakan!
- 🟩 Hal teknis minimal yang akan kamu buat untuk mendukung `SEO` bahkan jika hal tersebut lupa diminta sekalipun oleh pihak terkait.
- 🟩 Jelaskan cara testing aplikasi yang kalian lakukan sekarang! Bagaimana yang idealnya menurutmu? Testing seperti apa yang harusnya dikerjakan? Pertimbangan apa yang perlu diperhatikan? Siapa yang harusnya mengerjakan?

### 💫 Web Performance

- 🟩 Jelaskan mengenai *Core Web Vitals*!
- 🟩 Jelaskan bedanya penggunaan Data Lapangan dan Data Lab dalam konteks *web performance*!
- 🟩 Hal apa yang akan mempengaruhi skor `CLS` (Cumulative Layout Shift)! Opsi langkah yang seharusnya bisa dikerjakan untuk meningkatkan skor `CLS`!
- 🟩 Hal apa yang akan mempengaruhi skor `LCP` (Largest Contentful Paint)! Opsi langkah yang seharusnya bisa dikerjakan untuk meningkatkan skor `LCP`!
- 🟩 Bagaimana memantau metrik web performance secara berkala? Bagaimana dengan *Realtime User Monitoring*? Apakah diperlukan?

### 💅 Design

- 🟩 Bagaimana caranya kalau kamu diminta mempercepat waktu yang diperlukan oleh engineer dalam menyelesaikan task, dari mulai development sampai ke production?
- 🟩 Bagaimana membuat aplikasi yang menampilkan *Live Comments* dari pengguna? Pendekatan seperti apa yang kamu ambil?

## 💌 Saran pribadi

Memang kemungkinan interviewer-mu akan menanyakan hal yang berbeda dari yang biasanya ditanyakan oleh saya.
Tapi setidaknya daftar di atas bisa sedikit jadi *benchmark* buat dirimu untuk mempersiapkan proses interview.
Apakah dirimu masih merasa kesulitan menjelaskan poin-poin di atas kalau memang ditanya hal yang sama?

Kalau diperlukan, tulis jawaban-jawabanmu dan atur agar penjelasanmu cukup mudah dipahami.
Salah satu yang bisa meningkatkan kepercayaan diri dalam menjawab saat diinterview adalah karena memang sudah menguasai materi dan tau dengan baik mengenai hal yang ditanyakan oleh si interviewer.

Tau pengertian secara *text-book* saja bisa jadi tidak cukup, karena pertanyaannya kemungkinan besar akan di *follow up* lebih dalam berdasarkan jawabanmu.
Tiap teknologi biasanya punya *use case* yang berbeda yang coba diselesaikan, jadi bisa mengerti kapan kita harus pakai dan kelebihan serta kekurangan teknologi tersebut akan membantu dalam memberikan jawaban yang baik.

**🤺 Jadi, kapan nih kita interview?**

---

Foto cover diambil dari [Tima Miroshnichenko di Pexels](https://www.pexels.com/photo/a-woman-interviewing-a-man-5336951/)
