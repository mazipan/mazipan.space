---
title: GraphQL untuk PokeApi
date: '2020-11-10'
excerpt: Memperkenalkan versi GraphQL sederhana dari PokeApi.co yang di deploy ke Vercel
author: mazipan
published: true
featured: false
tags: [open-source]
coverImage: /thumbnail/graphql-for-pokeapi/graphgql-pokeapi.png
lang: id
enready: false
---

[PokeApi](https://github.com/PokeAPI/pokeapi) adalah salah satu kode sumber terbuka yang menyediakan RESTful-API gratis untuk mendapatkan data Pokémon mulai dari daftar pokemon, pergerakan yang dimiliki, dan info lainnya.

Kepopuleran RESTful API ini menjadikannya sering sekali digunakan sebagai contoh dalam pembuatan aplikasi sederhana dalam berbagai framework baru. Pun sering juga digunakan untuk memberikan contoh bagaimana mengambil data dan mengolahnya di sebuah basis kode frontend.

## Versi GraphQL

Sayangnya tidak mudah menemukan versi GraphQL yang cukup bagus dan mudah digunakan dari RESTful API yang sudah ada.
Salah satu yang bisa saya temukan ya [PokeAPI-GraphQL](https://github.com/patrickshaughnessy/PokeAPI-GraphQL) yang sudah tidak ada pembaruan sejak 2016.

Sebenarnya saya pribadi sudah membuat ini dari cukup lama, tapi sebelumnya saya deploy di Heroku versi gratis yang mana kurang bisa diandalkan pada saat pertama kali diakses.
Versi Heroku bisa dilihat pada tautan [mazipan-gql-pokeapi](https://mazipan-gql-pokeapi.herokuapp.com/graphql).
Enaknya dengan Heroku saya bisa membuat custom server kode dengan Express sehingga cukup mudah mencari tutorial cara membuatnya dan saya pribadi cukup familiar dengan basis kode Express.

Setelah saya memiliki pengalaman berurusan dengan Vercel untuk membuat beberapa API disana, saya putuskan untuk memindahkan proses deployment ke Vercel.
Di Vercel cukup berbeda, kita tidak perlu membuat custom server dengan Express lagi untuk mengakomodir kebutuhan GraphQL kita.
Cukup menempatkan kode di direktori `/api/*` dan sebuah RESTful API sudah bisa dibuat dengan mudahnya.

Membuat GraphQL pun tak jauh beda, kita menempatkan entry point di direktori `/api` juga.
Saya memanfaatkan pustaka [apollo-server-vercel](https://github.com/Saeris/apollo-server-vercel) untuk membuat GraphQL servernya.
Karena saya sudah memiliki kode dari versi sebelumnya jadi mudah saja untuk memindahkan ke Vercel.

## Contoh penggunaan

GraphQL Playground bisa dijumpai di [GraphQL-PokeAPI](https://graphql-pokeapi.vercel.app/api/graphql), dengan mengunjungi Playground kalian bisa mencoba berbagai query yang tersedia serta melihat dokumentasi untuk memahami struktur data yang ada.

![Contoh penggunaan GraphQL Playground](/thumbnail/graphql-for-pokeapi/query-graphql-pokeapi.png)

Beberapa contoh query dan penggunaannya antara lain:

### Mengambil daftar pokemon

Contoh query:

```js
query pokemons($limit: Int, $offset: Int) {
  pokemons(limit: $limit, offset: $offset) {
    count
    next
    previous
    status
    message
    results {
      url
      name
      image
    }
  }
}
```

Dengan variabel yang dibutuhkan contohnya sebagai berikut:

```js
{
  "limit": 2,
  "offset": 1
}
```

Query tersebut akan menghasilkan balikan sebagai berikut:

```js
{
  "data": {
    "pokemons": {
      "count": 964,
      "next": "https://pokeapi.co/api/v2/pokemon/?offset=3&limit=3",
      "previous": null,
      "results": [
        {
          "url": "https://pokeapi.co/api/v2/pokemon/1/",
          "name": "bulbasaur",
          "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
        },
        {
          "url": "https://pokeapi.co/api/v2/pokemon/2/",
          "name": "ivysaur",
          "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png"
        },
        {
          "url": "https://pokeapi.co/api/v2/pokemon/3/",
          "name": "venusaur",
          "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png"
        }
      ],
      "status": true,
      "message": ""
    }
  }
}
```

### Mengambil detail pokemon

Contoh query:

```js
query pokemon($name: String!) {
  pokemon(name: $name) {
    id
    name
    abilities {
      ability {
        name
      }
    }
    moves {
      move {
        name
      }
    }
    types {
      type {
        name
      }
    }
    message
    status
  }
}
```

Dengan variabel yang dibutuhkan contohnya sebagai berikut:

```js
{
  "name": "ditto"
}
```

Query tersebut akan menghasilkan balikan sebagai berikut:

```js
{
  "data": {
    "pokemon": {
      "id": 132,
      "name": "ditto",
      "abilities": [
        {
          "ability": {
            "name": "imposter"
          }
        },
        {
          "ability": {
            "name": "limber"
          }
        }
      ],
      "moves": [
        {
          "move": {
            "name": "transform"
          }
        }
      ],
      "types": [
        {
          "type": {
            "name": "normal"
          }
        }
      ],
      "message": "",
      "status": true
    }
  }
}
```

Tentunya masih banyak kekurangan di sana-sini, apalagi memang ini saya tujukan untuk penggunaan pribadi sesuai dengan kasus yang saya temui.
Itu mengapa hanya sedikit yang saya dukung dari versi aslinya yang memiliki banyak sekali data.
Jika kalian merasa membutuhkan tambahan data, silahkan berkontribusi langsung ke repository yang tersedia bebas di Github saya: [graphql-pokeapi](https://github.com/mazipan/graphql-pokeapi)
