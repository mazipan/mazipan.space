---
title: Interview Terbuka Bersama mazipan
date: '2022-11-26'
excerpt: Berbagai contoh pertanyaan yang kemungkinan akan saya tanyakan kalau secara tidak sengaja diinterview oleh saya sebagai Frontend Engineer
author: mazipan
published: true
featured: false
tags: [interview, frontend]
coverImage: /thumbnail/open-interview/pexels-tima-miroshnichenko-5336951.jpg
lang: id
enready: false
---

Artikel ini secara terbuka akan memberikan berbagai daftar pertanyaan yang umumnya akan saya tanyakan, kalau secara tidak sengaja kalian ketemu saya pada satu sesi interview spesifik untuk posisi Frontend Engineer.

## Q&A Singkat

- **Apakah semua daftar tersebut akan selalu saya tanyakan**: Bisa iya bisa tidak, bisa berkembang pertanyaannya, tapi umumnya masing-masing interviewer biasanya punya set of pertanyaan andalan yang sering ditanyakan pada setiap sesi interview. Jadi sebagian besar daftar di sini adalah pertanyaan andalan dari saya pribadi, kemungkinan besar akan saya tanyakan.

- **Kenapa gak disertakan jawabannya**: Ya karena jawabannya gak akan *text-book* juga. Sebaiknya memang jelaskan sesuai dengan gaya dan pengetahuan yang kalian punya saja. Beberapa pertanyaan juga merupakan *open question*, jadi antar satu dan orang lain akan berbeda hasilnya.

## 🧑‍🏫 Proses Interview Soft. Engineer Secara Umum

Sebelum saya mulai *breakdown* berbagai pertanyaan yang biasa saya tanyakan, ada baiknya kalian memahami dulu proses interview software engineer secara umum. 
Kalian bisa memahaminya dengan menonton video di YouTube Channelnya [Gogo](https://twitter.com/lwastuargo) mengenai [Gimana sih proses interview software engineer?](https://www.youtube.com/watch?v=gczDiFOWLOY).
Kalau belum sempat nonton, sempatkan buat nonton dulu, jangan lupa klik "Laik" dan "Subskreb" 👋

Prosesnya bisa beda-beda, tapi secara umum akan mirip-mirip dengan skema yang berbeda-beda. Ada yang dipisah-pisah ke beberapa sesi, ada yang digabungkan semuanya jadi satu sesi.

## 💻 Live Coding

Bagian ini saya akan *run* pertama, saya biasanya akan meminta Live Coding untuk 2 hal:

- HTML & CSS: Biasanya hanya meminta untuk dibuatkan layout sederhana menggunakan HTML dan CSS.
- Struktur Data: Seperti pertanyaan struktur data pada umumnya, kemungkinan akan bermain dengan berbagai tipe data.

## 📝 Pertanyaan Umum

Berikut adalah daftar berbagai pertanyaan umum yang kemungkinan saya tanyakan:

### Web Fundamental

- 🟩 Jelaskan perbedaan kalau kita *load* sebuah berkas JavaScript dengan hanya menggunakan tag `<script>` dengan `<script async>` dan `<script defer>`
- 🟩 Jelaskan mengenai attribute `noopener` dan `noreferrer` yang biasanya ditambahkan pada tag link (`<a href="..." noopener noreferrer>`)
- 🟩 Jelaskan perbedaan antara `Cookie`, `Local Storage` dan `Session Storage`! Kapan kita mesti pakai masing-masing dari mereka? Jelaskan pula trade-off kalau pakai masing-masing dari mereka!
- 🟩 Apa itu `prefetch`, dan apa itu `preload`? Adakah use case yang tepat kapan kita sebaiknya pakai hal tersebut? Dan kapan sebaiknya kita menghindari pakai hal tersebut?
- 🟩 Bagaimana cara membuat peramban agar melakukan *cache* terhadap *resource* statis yang sudah pernah di request sebelumnya?
- 🟩 Apa itu `CDN`? Dan bagaimana peran `CDN` dalam penyajian sebuah website? Kenapa dan kapan kita perlu pakai `CDN`? Resource yang seperti apa yang sebaiknya disajikan melalui di `CDN`?
- 🟩 Bagaimana cara kamu kalau diminta menyajikan sebuah layout yang sangat berbeda antara Desktop dan Mobile?
- 🟩 Jelaskan mengenai `CORS` (Cross-Origin Resource Sharing)! Kapan dan kenapa dia bisa terjadi? Sebutkan beberapa alternatif solusi yang bisa dikerjakan saat ketemu maslah tersebut.

### JS Fundamental

- 🟩 Apa bedanya antara `.forEach` dan `.map`?
- 🟩 Apa bedanya antara `debounce` dan `throttle`? Sebutkan use case kapan kita pakai masing-masing mereka!
- 🟩 Jelaskan mengenai *Closure* di JavaScript.

### Frameworks

- 🟩 Jelaskan *Rule of Hooks*! Kapan kita bisa pakai Hooks di React?
- 🟩 Jelaskan fungsi *Array Dependency* pada `useEffect`, Bagaimana penggunaanya dan apa pengaruhnya kalau kita tidak tambahkan atau salah mendefinisikan dependency-nya dengan tepat? Bagaimana dengan fungsi *Cleanup* pada `useEffect`? Kapan kita menambahkannya?
- 🟩 Jelaskan mengenai *Server-Side Render*, *Client-Side Render* dan *Static Site Generated*! Kapan kita sebaiknya pakai masing-masing diantaranya? Sebutkan pula kekurangan kalau pakai masing-masing mereka!
- 🟩 Jelaskan perbedaan `Rest API` dengan `GraphQL`! Sebutkan kelebihan dan kekurangan mereka masing-masing!
- 🟩 Sebutkan beberapa alternatif solusi mengatur CSS di sebuah projek yang kamu tau dan bagaimana pendapatmu mengenainya, pilihan mana yang biasanya kamu ambil, kenapa mengambil pilihan tersebut? Bagaimana caramu menghindari masalah dengan *specificity* di CSS?
- 🟩 Bagaimana konsep membuat sebuah *lazy load* pada komponen gambar/*image*? Jelaskan beberapa alternatif pendekatan yang bisa dikerjakan!
- 🟩 Hal teknis minimal yang akan kamu buat untuk mendukung `SEO` bahkan jika hal tersebut lupa diminta sekalipun oleh pihak terkait.
- 🟩 Jelaskan cara testing aplikasi yang kalian lakukan sekarang! Bagaimana yang idealnya menurutmu? Testing seperti apa yang harusnya dikerjakan? Pertimbangan apa yang perlu diperhatikan? Siapa yang harusnya mengerjakan?

### Web Performance

- 🟩 Jelaskan mengenai *Core Web Vitals*!
- 🟩 Jelaskan bedanya penggunaan Data Lapangan dan Data Lab!
- 🟩 Hal apa yang akan mempengaruhi skor `CLS` (Cumulative Layout Shift)! Opsi langkah yang seharusnya bisa dikerjakan untuk meningkatkan skor `CLS`!
- 🟩 Hal apa yang akan mempengaruhi skor `LCP` (Largest Contentful Paint)! Opsi langkah yang seharusnya bisa dikerjakan untuk meningkatkan skor `LCP`!
- 🟩 Bagaimana memantau metrik web performance secara berkala? Bagaimana dengan Real Time Monitoring? Apakah diperlukan?

### Design

- 🟩 Bagaimana cara mempercepat waktu yang diperlukan dari mulai development sampai ke production?
- 🟩 Bagaimana membuat aplikasi yang menampilkan *Live Comments* dari pengguna? Pendekatan seperti apa yang kamu ambil?

### Teamwork

- 🟩 Bagaimana caramu kerja sama dengan Tim Produk? Bagaimana memastikan dirimu paham dengan produk requirement yang diminta?
- 🟩 Bagaimana caramu kerja sama dengan Tim Designer? Bagaimana kalau Tim Designer mengubah design mereka di tengah jalan? Bagaimana kalau design yang sudah dibuat ternyata susah diimplementasi secara teknis?
- 🟩 Bagaimana caramu kerja sama dengan Backend? Satu sprint bareng jalan? Atau Backend selesai dulu baru Frontend?

**🤺 Jadi kapan kita interview?**

---

Foto cover diambil dari [Tima Miroshnichenko di Pexels](https://www.pexels.com/photo/a-woman-interviewing-a-man-5336951/)
