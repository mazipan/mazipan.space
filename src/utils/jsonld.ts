import config from '../website-config';

export function getJsonLdWebsite (): string {
  return JSON.stringify({
    "@context": "http://schema.org",
    "@type": "WebSite",
    "url": `${config.siteUrl}`,
    "description": `${config.description}`,
    "image": `${config.siteUrl}/${config.logo}`,
    "thumbnailUrl": `${config.siteUrl}/${config.logo}`,
    "name": `${config.title}`,
    "sameAs": [
      "https://www.facebook.com/mazipanneh",
      "https://instagram.com/maz_ipan",
      "https://twitter.com/Maz_Ipan",
      "https://id.linkedin.com/in/mazipan",
      "https://www.slideshare.net/IrfanMaulana21",
      "https://github.com/mazipan"
    ]
  })
}

export function getJsonLdBreadcrumb ({ category, title, slug }: JsonldBreadcrumbParam): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: config.siteUrl
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: category,
        item: `${config.siteUrl}/${category}`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: title,
        item: `${config.siteUrl}/${slug}`
      }
    ]
  })
}

export function getJsonLdArticle ({ slug, title, cover, date = '', desc }: JsonldArticleParam): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${config.siteUrl}/${slug}`
    },
    headline: title,
    image: [
      cover
    ],
    datePublished: date ? new Date(date).toISOString() : new Date().toISOString(),
    dateModified: date ? new Date(date).toISOString() : new Date().toISOString(),
    author: {
      '@type': 'Person',
      name: 'Irfan Maulana'
    },
    publisher: {
      '@type': 'Organization',
      name: 'mazipan',
      logo: {
        '@type': 'ImageObject',
        'url': `${config.siteUrl}/${config.logo}`
      }
    },
    description: desc
  })
}
