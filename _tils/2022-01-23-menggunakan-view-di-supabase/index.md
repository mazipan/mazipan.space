---
title: Menggunakan view di Supabase
date: '2022-01-23'
excerpt: Pengalaman pertama belajar dan menggunakan View di Supabase
tags: [supabase]
---

Jadi ceritanya di salah projek terbuka saya [ksana.in](https://github.com/mazipan/ksana.in) ada salah satu fitur untuk menampilkan statistik total jumlah pengguna yang sudah menggunakan ksana.in untuk ditampilkan di halaman beranda.

Dan sebelumnya, untuk mencapai fitur ini saya (dibantu kontributor) mengguanakan teknik "poor-man" saking gak habis pikirnya bagaimana untuk mendapatkan data seperti ini dengan Supabase.

Jadi yang dilakukan adalah membuat table baru `users` dikarenakan kita tidak bisa langsung menghitung jumlah baris dari table `auth` yang tersedia di Supabase. Karena tabel utama yang menyimpan data url sudah terlanjur banyak isinya, maka table `users` menanamkan logic di proses login yang mana kalau si pengguna yang login belum tersimpan di tabel `users` maka dilakukan proses `insert` sebelumnya. Dengan kondisi bahwa banyak penggunaka Ksana.in yang bukan aktif user (atau bahkan telah lupa punya akun), maka total jumlah table `users` tidak akan pernah bisa `sync` dan akan terus tertinggal jauh dari jumlah yang seharusnya.

Karena saya juga tidak aktif melakukan development, jadi ya saya biarkan saja selama berbulan-bulan.
Sampai akhirnya gerah juga melihat proses yang begini, dan saya sempatkan buat berpikir ulang dan baca-baca lagi terkait Supabase.

Pada dasarnya yang saya inginkan adalah cukup menggunakan query `SELECT DISTINCT` berdasarkan `user_id` saja dari table utama. Tapi kok yo bingung ya di Supabase caranya gimana.

Sebelumnya saya sudah mencoba-coba mengenai [Supabase Function](https://supabase.com/docs/guides/database/functions), yang entah mengapa jalan di development namun gagal untuk dibuat di production DB. Jadi idenya membuat Function untuk mengambil `DISTINCT` berdasarkan `user_id` saja, nantinya bisa dipanggil dengan `supabase.rpc()`.

Sampai pada akhirnya saya menemukan diskusi penyelamat [#3294](https://github.com/supabase/supabase/discussions/3294).

Saya jadi belajar tentang [Supabase View](https://supabase.com/blog/2020/11/18/postgresql-views).

jadi untuk kasus ksana.in, saya membuat view baru

```sql
create view distinct_users as
    select distinct(user_id)
    from public.urls;
```

Dan bisa memanggil dengan cara:

```ts
const { count: countUsers } = await supabase
  .from('distinct_users')
  .select('user_id', { count: 'estimated' })
```

Dan ya akhirnya saya bisa membuang semua kode workaround sebelumnya dan bisa menampilkan jumlah pengguna dengan lebih mendekati tepat.

Pelajari detail kodenya di [PR #57](https://github.com/mazipan/ksana.in/pull/57)