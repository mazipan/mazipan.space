---
title: Menungunduh Berkas dari Blob
date: '2024-05-30'
excerpt: Code snippet untuk mengunduh berkas dari tipe data Blob
tags: [javascript]
---

Menyunting kode dari ["Dev.to - Download Any File from Blob"](https://dev.to/nombrekeff/download-file-from-blob-21ho), saya dihadapkan pada kasus dimana Backend mengembalikan tipe data Blob saat memanggil API untuk mengunduh suatu berkas.

Berikut ada suntingan kodenya:

```ts
/**
 * // Taken from: https://dev.to/nombrekeff/download-file-from-blob-21ho
 * @param blob <Blob>
 * @param filename <string>
 */
export function downloadBlob(blob: Blob, filename: string) {
  if (typeof URL.createObjectURL === 'function') {
    const safeFileName = filename.replace(/\//g, '_')
    // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
    const blobUrl = URL.createObjectURL(blob)

    // Create a link element
    const link = document.createElement('a')

    // Set link's href to point to the Blob URL
    link.href = blobUrl
    link.download = safeFileName
    link.setAttribute('data-filename', safeFileName)
    link.style.display = 'none'

    // Append link to the body
    document.body.appendChild(link)

    // Dispatch click event on the link
    // This is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
      })
    )

    // Remove link from body
    document.body.removeChild(link)
    // Revoke after usage
    URL.revokeObjectURL(blobUrl)
  }
}
```
