---
title: Membuat laman jadwal sholat sederhana
date: '2023-08-09'
excerpt: Penjelasan dengan penyederhanaan dari proses pembuatan halaman jadwal sholat pada Baca-Quran.id
author: mazipan
published: true
featured: false
tags: [svelte, web]
coverImage: /thumbnail/membuat-web-jadwal-sholat-sederhana/pexels-mohammad-ramezani-12772601.jpg
lang: id
enready: false
---

Artikel ini menjelaskan proses yang saya tempuh dalam pembuatan halaman baru [Jadwal Sholat](https://www.baca-quran.id/jadwal-sholat/) di Baca-Quran.id secara sederhana tanpa menjelaskan bagian-bagian rumitnya agar lebih mudah diikuti kalau memang ingin membuat halaman serupa.

## 🧾 Kebutuhan dasar

Beberapa yang saya butuhkan untuk membuat halaman ini, kurang lebih:

- 🔸 Sumber data jadwal sholat, bisa jadi butuhnya data per hari atau per bulan atau per kota atau bahkan bisa langsung ambil dari lokasi terkini saja
- 🔸 Data lokasi, entah mau di mapping dengan dibatasi sampai per provinsi atau kabupaten/kota, atau entah langsung saja ambil dari lokasi terkini

Kebutuhan dasar ini tergantung pada "mau" seperti apa buat halamannya. Akhirnya memutuskan untuk melihat beberapa contoh aplikasi yang ada:

- 💠 [NeoAdzan](https://neoadzan.cahyadsn.com/)
- 💠 [JadwalSholat.org](https://www.jadwalsholat.org/)
- 💠 [Tokopedia Salam](https://www.tokopedia.com/s/jadwal-sholat)
- 💠 [IslamicFinder](https://www.islamicfinder.org/world/indonesia/?language=id)
- 💠 Google Search: Jadwal sholat

Secara data, saya suka dengan kesederhanaan NeoAdzan dan JadwalSholat.org (keduanya hampir serupa), menampilkan data untuk per kota/kabupaten, dan menampilkan data dalam waktu sebulan. Tokopedia sebenarnya menampilkan data sebulan juga, tapi data yang sudah lewat gak ditampilkan lagi, jadi terlihat lebih hemat tempat. Pun mereka deteksi lokasi kita, jadi gak perlu milih-milih lagi mau nyari jadwal sholat mana.

Akhirnya saya jadi bisa memutuskan beberapa hal:

- 🔹 Saya tidak perlu menampilkan data dalam sebulan, berkaca dari cara Tokopedia, lebih bagus lagi dengan cara Google Search saat menampilkan data jadwal sholat. Terasa *on-point*, cuma nampilin hari ini saja.

![Google menampilkan jadwal sholat](/thumbnail/membuat-web-jadwal-sholat-sederhana/jadwal-sholat-di-google.png)

- 🔹 Lebih mudah saat MVP untuk mengambil lokasi terkini dengan [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition), seperti yang dilakukan Tokopedia. Ini akan mengurangi keharusan melakukan mapping lokasi-lokasi kota/kabupaten, kalaupun bisa juga dikerjain nantinya, tapi kayanya cuma bisa dikerjain setelah versi awal berhasil dibuat.

## 🔬 Pencarian sumber data

Dengan memutuskan beberapa hal akhirnya jadi lebih terlihat kebutuhan data seperti apa yang ta mau.

Untuk data jadwal sholat, saya memilih yang mendukung permintaan dengan lokasi terkini atau menggunakan nilai dari garis lintang *(latitude)* dan garis bujur *(longitude)*. Setelah mencari-cari, saya menemukan [aladhan.com](https://aladhan.com/prayer-times-api) menyediakan public API yang sesuai dengan yang saya butuhkan.

Kalian bisa memanggil seperti contoh pada dokumentasi mereka: `https://api.aladhan.com/v1/calendar/2017/4?latitude=51.508515&longitude=-0.1254872&method=2`.

Mereka sudah bisa mengembalikan data dalam sebulan langsung. Ini bisa jadi opsi untuk nantinya saya cache saja data sebulan ini biar tidak terus-terusan request ke API mereka. Sayangnya, dari response tersebut kita belum bisa tau alamatnya atau paling tidak infomasi distrik atau kabupaten/kota, istilah lainnya *Reverse Geocoding*. Mau gak mau butuh 1 tambahan lagi kalau mau dapatin data ini. Paling umum tentu pakai [Reverse Geocoding, dari Geocoding API-nya Google](https://developers.google.com/maps/documentation/geocoding/requests-reverse-geocoding). Tapi untungnya pas lagi nyari-nyari, nemu [https://nominatim.org](https://nominatim.org/release-docs/develop/api/Reverse/) yang juga punya API untuk Reverse. Saya akan ngambil data district-nya aja dari sini.

## 🤳 Tampilan

![Tampilan laman jadwal sholat di Baca-Quran.id](/thumbnail/membuat-web-jadwal-sholat-sederhana/tampilan-jadwal-sholat.png)

## 🪚 Mulai koding

Kode di sini akan ditulis dengan Svelte, karena Baca-Quran.id memang ditulis dengan Svelte saat artikel ini ditulis.

### 🔹 Membuat halaman baru di SvelteKit

Cukup dengan menambah berkas `+page.svelte` baru di bawah `src/routes/`, pada kasus ini saya membuat path `/jadwal-sholat`, jadi menambahkan berkas baru dengan lokasi di `src/routes/jadwal-sholat/+page.svelte`.

Isinya bisa semudah `Halo Dunia` dulu aja, di contoh ini saya menambahkan judul halaman saja.

```html
<div class="px-4 mb-4">
 <h1 class="text-3xl font-bold">⏰ Jadwal Sholat</h1>
</div>
```

Setelah berhasil membuat halaman awal, kita bisa mulai fokus membuat kode untuk fitur utamanya.

### 🔹 Akses dan menampilkan data lokasi

Salah satu syarat utama dari halaman ini adalah mengetahui lokasi terkini dari pengguna.

Kode dasarnya bisa begini:

```typescript
let getGeolocation = async () => {
  if (navigator.geolocation) {
   navigator.geolocation.getCurrentPosition(async (position) => {
    console.log(`Ini dia si latitude: ${position.coords.latitude} dan longitude: ${position.coords.longitude}`)
   });
  }
};
```

Kode di atas mengambil lokasi terkini dengan memanggil method `getCurrentPosition()`. Perlu ditambahkan pengecekan dukungan terhadap API ini karena ada kemungkinan peramban si pengguna tidak mendukung API ini.

### 🔹 Mendapatkan nama kabupaten/kota

Bagian ini kita akan memanfaatkan API pihak ketiga `nominatim`. Kodenya semudah fetch dari publik API mereka saja, contohnya seperti berikut:

```typescript
async function getDistrictByLatLong({
  latitude,
  longitude
}: {
  latitude: number;
  longitude: number;
}) {
  try {
    const resRaw = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
    );
    const res = await resRaw.json();
    return res?.address?.city_district || '';
  } catch (error) {
    console.error(`Failed get distric for lat: ${latitude}, long: ${longitude}`);
    return '';
  }
}
```

Kode ini cukup lugas, memanggil API publik dengan melempar parameter `lat` dan `lon` untuk kemudian dikembalikan hasilnya dalam bentuk string. Ada kemungkinan terjadi galat dan di sini saya memilih mengembalikan string kosong saja.

### 🔹 Menyimpan data lokasi dan district ke Web Storage

Biar gak bolak-balik minta akses lokasi dan request ke nominatim.openstreetmap.org, maka simpan saja data-data ini ke web storage. Baca-Quran.id banyak menggunakan `localStorage` untuk menyimpan data, jadi gunakan hal yang sama saja.

```typescript {11-18}
let getGeolocation = async () => {
  if (navigator.geolocation) {
   navigator.geolocation.getCurrentPosition(async (position) => {
    // Mendapatkan kabupaten/kota
    const district = await getDistrictByLatLong({
     latitude: position.coords.latitude || 0,
     longitude: position.coords.longitude || 0
    });

    // Menyimpan ke storage
    localStorage.setItem(
     "dataLokasi",
     JSON.stringify({
      lt: position.coords.latitude || 0,
      lg: position.coords.longitude || 0,
      district
     })
    );

   });
  }
};
```

Kode di atas berusaha menyimpan data yang didapatkan dengan memanggil method `localStorage.setItem(key, value)` yang merupakan bawaan dari peramban.

### 🔹 Menyimpan data ke Svelte Store

Keunggulan Svelte Store, datanya bisa diakses dari mana saja. Saya punya rencana kalau data lokasi ini juga nantinya bisa diakses dari halaman setelan, jadi selain menyimpan ke web storage, datanya akan saya pass ke tengah di Svelte Store.

#### 🔘 Membuat state baru di Store

Mengekspos kode baru di berkas `src/store/index.ts` beserta definisi tipe data yang dibutuhkan.

```typescript
export type LocationParam = {
  lt: number
  lg: number
  district: string
}

export const settingLocation = writable<LocationParam | null>(null);
```

`writeable` menunjukkan state tersebut bisa dibaca dan ditulis isinya nanti.

#### 🔘 Memperbarui nilai ke Store saat ada data baru

Kode untuk memperbarui nilai yang disimpan di Svelte Store dengan data yang didapatkan dari pihak ketiga.

```typescript {21-25}
let getGeolocation = async () => {
  if (navigator.geolocation) {
   navigator.geolocation.getCurrentPosition(async (position) => {
    // Mendapatkan kabupaten/kota
    const district = await getDistrictByLatLong({
     latitude: position.coords.latitude || 0,
     longitude: position.coords.longitude || 0
    });

    // Menyimpan ke storage
    localStorage.setItem(
     "dataLokasi",
     JSON.stringify({
      lt: position.coords.latitude || 0,
      lg: position.coords.longitude || 0,
      district
     })
    );

    // Memperbarui nilai store
    settingLocation.set({
     lt: position.coords.latitude || 0,
     lg: position.coords.longitude || 0,
     district
    });

   });
  }
};
```

Semudah dengan memanggil `.set` untuk mengganti nilai state di store.

#### 🔘 Mengembalikan nilai Storage ke Store saat awal load

Saya menambahkan kode ini di level Layout (`src/routes/+layout.svelte`), agar bisa jalan di halaman manapun yang diakses pertama kali.

```typescript {9-13}
onMount(() => {
  if (typeof window !== 'undefined') {
   if (typeof localStorage !== 'undefined') {
    const storageLocation = localStorage.getItem("dataLokasi");

    if (storageLocation) {
     const parsedValue = JSON.parse(storageLocation);

     settingLocation.set({
      lt: parsedValue?.lt || 0,
      lg: parsedValue?.lg || 0,
      district: parsedValue?.district || ''
     });
    } else {
     settingLocation.set(null);
    }
   }
  }
});
```

Kode di atas mengambil nilai dari Web Storage, di *parsing* jadi objek JavaScript, untuk kemudian di set ke Svelte Store agar bisa diakses dimanapun.

#### 🔘 Menampilkan data lokasi dari data Svelte Store

Menampilkan data yang telah disetel sebelumnya ke Store:

```svelte
{#if $settingLocation === null}
  <Button onClick={getGeolocation}>
    Beri akses lokasi?
  </Button>
{:else}
  <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
    <div class="flex flex-col gap-2">
      {#if $settingLocation.district}
        <span>{$settingLocation.district}</span>
      {/if}

      <small>{$settingLocation.lt}, {$settingLocation.lg}</small>
    </div>

    <Button onClick={getGeolocation}>
      Perbarui Lokasi
    </Button>
  </div>
{/if}
```

Tampilannya bisa disesuaikan dengan kemauan kalian, tapi yang jangan lupa adalah bagian pengecekannya. Karena akan ada kasus dimana datanya mungkin masih belum terisi, atau terisi sebagian saja, mengingat datanya berasal dari 2 sumber yang berbeda.

### 🔹 Mendapatkan data jadwal sholat

Bagian ini bertujuan mengambil data dari pihak ketiga, memprosesnya dan menyimpan di variabel lokal dan web storage.

#### 🔘 Memanggil data dari pihak ketiga

Memanggil API publik dari pihak ketiga untuk mendapatkan data jadwal sholat selama sebulan dengan parameter latitude dan longitude, serta menambahkan juga parameter tahun dan bulan yang diinginkan.

```typescript
let prayerTimes = []
async function refetchPrayerTime({
  latitude,
  longitude
}: {
  latitude: number;
  longitude: number;
}) {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;

  const rawResponse = await fetch(
    `${BASE_URL}/${year}/${month}?method=15&shafaq=general&latitude=${latitude}&longitude=${longitude}`
  );

  const response = (await rawResponse.json()) as PrayerTimeResponse;
  prayerTimes = response?.data || [];
}
```

Kodenya cukup lugas, cuma *construct* URL untuk API yang akan dipanggil, kemudian di set ke lokal variabel `prayerTimes`. Paling ada catatan untuk menambah nilai bulan (month) yang didapat karena dimulai dari 0.

#### 🔘 Menyimpan response ke Web Storage

Kita cukup menambahkan kode berikut pada fungsi di atas:

```typescript
async function refetchPrayerTime({
  latitude,
  longitude
}: {
  latitude: number;
  longitude: number;
}) {
  // ...kode2 lainnya
  localStorage.setItem("dataJadwalSholat", JSON.stringify(response));
}
```

Seperti sebelumnya, menggunakan method `setItem` dari `localStorage`. Di kasus ini saya simpan saja mentah-mentah semua response data yang didapatkan dari pihak ketiga. Kedepannya mungkin kita bisa tingkatkan dengan hanya menyimpan data yang dibutuhkan saja.

#### 🔘 Memastikan untuk mengecek cache sebelum melakukan request

Mengecek ketersediaan cache di Web Storage sebelum memutuskan memanggil API pihak ketiga:

```typescript
async function fetchPrayerTime({ latitude, longitude }: { latitude: number; longitude: number }) {
  const fromStorage = localStorage.getItem("dataJadwalSholat");
  if (fromStorage) {
    const parsedValue = JSON.parse(fromStorage);
    // check current month is still the same
    prayerTimes = parsedValue?.data || [];

    const firstRow = prayerTimes[0];
    if (firstRow) {
      const monthFromData = firstRow.date.gregorian.month.number;
      const currentMonth = new Date().getMonth() + 1;
      // Melakukan request ulang
      // karena data di storage berasal dari bulan yang berbeda
      if (monthFromData !== currentMonth) {
        await refetchPrayerTime({ latitude, longitude });
      }
    }
  } else {
    await refetchPrayerTime({ latitude, longitude });
  }
}
```

Ditambahkan juga pengecekan kalau-kalau data yang disimpan sebelumnya sudab tidak valid dan tidak seharusnya digunakan karena kemungkinan merupakan data dari bulan sebelumnya.

#### 🔘 Memanggil fungsi saat mendapatkan lokasi

Menyematkan kode untuk mendapatkan data jadwal sholat ke dalam fungsi saat kita meminta akses terhadap lokasi terkini:

```typescript {5-8}
let getGeolocation = async () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      // ...kode2 lainnya
      await fetchPrayerTime({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    });
  }
};
```

Kodenya disematkan ke dalam fungsi `getCurrentPosition()`

### 🔹 Hanya mengambil data hari ini

Seperti saya sebutkan di atas, data dari API merupakan data sebulan. Kita perlu fungsi untuk mencocokkan agar cuma data hari ini saja yang ditampilkan. Untuk melakukan ini, saya menggunakan ilmu hitamnya Svelte soal reaktivitas, yakni dengan `$ :`. Ini semacam `computed` atau `watch` di Vue, atau `useEffect` nya React. Pada dasarnya, dia akan memantau perubahan dari suatu variable dan mengeksekusi atau mengembalikan nilai baru.

Berikut kodenya:

```svelte
$: todayPrayerTime = prayerTimes.find((time) => {
  return (
    time.date.gregorian.date ===
    new Date()
      .toLocaleDateString('id-ID', { month: '2-digit', day: '2-digit', year: 'numeric' })
      .replace(new RegExp(/\//g), '-')
  );
});
```

### 🔹 Menampilkan data jadwal sholat

Tampilannya bisa disesuaikan sesuka hati, tapi minimal ada pengecekan ketersediaan data dan menampilkan kelima jadwal sholat.

```svelte
{#if todayPrayerTime}
  <PrayerTimeCard timings={todayPrayerTime.timings} prayerKey="Fajr" />
  <PrayerTimeCard timings={todayPrayerTime.timings} prayerKey="Dhuhr" />
  <PrayerTimeCard timings={todayPrayerTime.timings} prayerKey="Asr" />
  <PrayerTimeCard timings={todayPrayerTime.timings} prayerKey="Maghrib" />
  <PrayerTimeCard timings={todayPrayerTime.timings} prayerKey="Isha" />
{/if}
```

Dengan `PrayerTimeCard` nya isinya sebenarnya cuma mapping data dengan UI sederhana berupa teks jenis sholat dan waktu/jam dari jadwal sholat yang didapatkan.

```svelte
<script lang="ts">
  const TITLE_MAP = {
    Fajr: 'Subuh',
    Dhuhr: 'Dzuhur',
    Asr: 'Ashar',
    Maghrib: 'Maghrib',
    Isha: 'Isya'
  };

  export let timings: PrayerTimings | null = null;
  export let prayerKey: 'Fajr' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha' = 'Fajr';
</script>

{#if timings}
  <div class="flex justify-between items-center gap-2">
    <span>{TITLE_MAP[prayerKey]}</span>
    <span>{timings[prayerKey]}</span>
  </div>
{/if}
```

## 👩‍🏫 Pelajaran yang saya dapat

Beberapa pelajaran baru atau hal lama yang sudah saya ketahui namun lupa dan berhasil diingatkan kembali lewat pekerjaan ini, diantaranya:

- ▶️ Cara mengambil lokasi dengan Geocoding API
- ▶️ Alternatif dari Google untuk melakukan reverse geocoding 
- ▶️ Menggunakan `$ :`, ini fitur yang jarang sekali ta gunakan sepanjang projek Baca-Quran.id

## 🏁 Selesai

Kode lengkapnya bisa dipantau langsung di repository [mazipan/baca-quran.id](https://github.com/mazipan/baca-quran.id/tree/master)

Maaf-maaf aja kalau gak bermanfaat 🙇😭

---

Foto cover diambil dari laman [Pexel](https://www.pexels.com/id-id/foto/pria-muslim-12772601/), Foto oleh [mohammad ramezani](https://www.pexels.com/id-id/@mohammadasbad/)
