---
title: Melakukan scroll ke suatu element
date: '2024-06-05'
excerpt: Code snippet untuk melakukan scroll ke suatu element
tags: [javascript]
---

Berikut kode untuk melakukan trigger scroll ke suatu DOM Element berdasarkan atribut `id` nya.

```ts
/**
 * @param targetId <string> Id of the Element
 * @param additionalSpacing <number> - Optional. Additional spacing from the top
 */
export const scrollToDomId = (targetId: string, additionalSpacing = 0) => {
  const element = document.getElementById(targetId)

  if (!!element) {
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - additionalSpacing

    requestAnimationFrame(() => {
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    })
  }
}
```
