---
title: Menggunakan view di Supabase
date: '2022-01-23'
excerpt: Pengalaman pertama belajar dan menggunakan View di Supabase
tags: [supabase]
---

Jadi ceritanya di salah projek terbuka saya, [ksana.in](https://github.com/mazipan/ksana.in). Terdapat salah satu fitur untuk menampilkan statistik total jumlah pengguna yang sudah menggunakan ksana.in di halaman beranda.

Dan sebelumnya, untuk mencapai fitur ini, saya (dibantu kontributor) menggunakan teknik *"poor-man"*, saking gak habis pikirnya bagaimana untuk mendapatkan data seperti ini dengan Supabase.

Jadi yang dilakukan adalah membuat table baru `users`, dikarenakan kita tidak bisa langsung menghitung jumlah baris dari table `auth` yang tersedia di Supabase. 
Karena tabel utama yang menyimpan data url sudah terlanjur banyak isinya, maka table `users` dipaksakan mempunyai logic tambahan pada proses login, yang mana kalau si pengguna yang login belum tersimpan di tabel `users`, maka dilakukan proses `insert` sebelumnya (semacam trigger, tapi lagi-lagi versi poor-man). 

Karena saya juga tidak aktif melakukan development, jadi ya saya biarkan saja selama berbulan-bulan dengan cara begini.
Sampai akhirnya gerah juga melihat proses yang begini, dan saya sempatkan buat berpikir ulang dan baca-baca lagi terkait Supabase.

Pada dasarnya yang saya inginkan adalah cukup menggunakan query `SELECT DISTINCT` berdasarkan `user_id` saja dari table utama. Tapi kok yo bingung ya di Supabase caranya gimana.

Sebelumnya saya sudah mencoba-coba mengenai [Supabase Function](https://supabase.com/docs/guides/database/functions), yang entah mengapa jalan di development namun gagal untuk dibuat di production DB. Jadi sebelumnya saya harus membuat Function untuk mengambil `DISTINCT` berdasarkan `user_id` dan nantinya bisa dipanggil dengan `supabase.rpc()`.

Sampai pada akhirnya hari ini (23 Jan 2022) saya menemukan sebuah diskusi penyelamat [#3294](https://github.com/supabase/supabase/discussions/3294) yang sepertinya terlewatkan oleh saya pada saat pertama.

Saya jadi harus belajar tentang [Supabase View](https://supabase.com/blog/2020/11/18/postgresql-views).

Untuk kasus ksana.in, saya perlu membuat view baru dengan perintah berikut:

```sql
create view distinct_users as
    select distinct(user_id)
    from public.urls;
```

Dan bisa memanggilnya di kode JavaScript, dengan cara:

```ts
const { count: countUsers } = await supabase
  .from('distinct_users')
  .select('user_id', { count: 'estimated' })
```

Dan ya akhirnya saya bisa membuang semua kode workaround sebelumnya dan bisa menampilkan jumlah pengguna dengan lebih mendekati tepat.

Pelajari detail kodenya di [PR #57](https://github.com/mazipan/ksana.in/pull/57)
