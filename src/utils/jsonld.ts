import config from '../website-config';

export interface JsonldBreadcrumbParam {
  category: string;
  title: string;
  slug: string;
}

export interface JsonldArticleParam {
  cover: string;
  title: string;
  slug: string;
  date: string;
  desc: string;
}

export function getJsonLdWebsite (): string {
  return JSON.stringify({
    "@context": "http://schema.org",
    "@type": "WebSite",
    "url": `${config.siteUrl}`,
    "description": `${config.description}`,
    "image": `${config.siteUrl}/${config.logo}`,
    "thumbnailUrl": `${config.siteUrl}/${config.logo}`,
    "name": `${config.title}`
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
