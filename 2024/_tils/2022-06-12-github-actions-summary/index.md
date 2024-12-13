---
title: GitHub Actions Summary
date: '2022-06-12'
excerpt: Menggunakan GitHub Actions Summary
tags: [gh-actions]
---

Pekerjaan saya sehari-hari beberapa kali memang harus bersinggungan dengan CI, termasuk dengan GitHub Actions.

Nah ada kabar terbaru bulan lalu mengenai Actions Summary (Baca: [Supercharging GitHub Actions with Job Summaries](https://github.blog/2022-05-09-supercharging-github-actions-with-job-summaries/)).

Sekilas melihat sih wow, sepertinya akan memudahkan untuk melihat rangkuman hasil dari sebuah workflow yang jalan tanpa perlu melakukan klik tambahan ke dalam detail log nya ya. Hmmm, markicob...

Jadi, ada dua cara paling tidak untuk membuat Actions Summary ini:

- 1️⃣ Cukup dengan menulis ke environment variable yang telah di sediakan:

```yaml
steps:
  - name: Adding markdown
    run: echo '### Hello world! :rocket:' >> $GITHUB_STEP_SUMMARY
```

Kita cukup menulis apapun kontennya, ke env `$GITHUB_STEP_SUMMARY`. Contoh di atas menggunakan kode shell script seperti biasa.

- 2️⃣ Menggunakan bantuan helper `@actions/core `

Seperti yang kalian mungkin sudah tau, kita bisa menggunakan berbagai bantuan dari pustaka `@actions/core` untuk berinteraksi terhadap berbagai fitur yang telah disediakan dalam GitHub Actions.

```js
import * as core from '@actions/core'
  await core.summary
  .addHeading('Test Results')
  .addCodeBlock(generateTestResults(), "js")
  .addTable([
    [{data: 'File', header: true}, {data: 'Result', header: true}],
    ['foo.js', 'Pass '],
    ['bar.js', 'Fail '],
    ['test.js', 'Pass ']
  ])
  .addLink('View staging deployment!', 'https://github.com')
  .write()
```

Hmmm, sekilas melihat sepertinya saya pribadi tidak akan nyaman menggunakan `@actions/core` 🥶.

Saya sebelumnya memiliki repo [psi-gh-action](https://github.com/mazipan/psi-gh-action), jadi saya sekalian aja belajar mengenai ini di repo pribadi.

Jika sebelumnya saya harus masuk ke log dari workflow untuk melihat rangkuman hasilnya:

![Sebelum menggunakan Actions Summary](/thumbnail/00-tils/action-summary/before.png)

Setelah menggunakan Action Summary saya bisa langsung melihat dari halaman depan workflow tersebut:

![Setelah menggunakan Actions Summary](/thumbnail/00-tils/action-summary/after.png)

Dan tebak, kodenya cuma sesederhana ini aja:

```js
const { execSync } = require('child_process')
const { blue, red } = require('../logger')

exports.setActionSummary = async function setActionSummary ({ commentBody }) {
  try {
    blue('> Creating Action summary...')
    execSync(`echo '${commentBody}' >> $GITHUB_STEP_SUMMARY`)
  } catch (error) {
    red(error)
  }
}
```

Tentu dengan catatan, saya sebelumnya harus membuat markdown string yang akan dikirimkan.

Mudah ya, calon bisa diaplikasikan ke berbagai workflow lainnya nih.

Btw, detail kodenya bisa disimak di commit [32d4a3d](https://github.com/mazipan/psi-gh-action/commit/32d4a3d8abea9a0dd59a8aa6f869ebe34d9942da), commit-nya berantakan karena sekalian mindah-mindahin dan upgrade versi beberapa dependency yang diperlukan biar lebih oke.