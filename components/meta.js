import Head from 'next/head'
import { SITE_METADATA, OG_IMAGE_HOME } from '../lib/constants'

export default function Meta () {
  return (
    <Head>
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color="#000000"
      />
      <meta name="theme-color" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <meta
        name="description"
        content={SITE_METADATA.description}
      />

      <meta property="og:site_name" content={SITE_METADATA.title} />
      <meta property="og:image" content={`${OG_IMAGE_HOME}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="article:author" content={'mazipanneh'} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={SITE_METADATA.title} />
      <meta property="og:description" content={SITE_METADATA.description} />
      <meta property="og:url" content={`${SITE_METADATA.url}`} />

      <meta name="twitter:image" content={`${OG_IMAGE_HOME}`} />
      <meta name="twitter:image:width" content="1200" />
      <meta name="twitter:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={SITE_METADATA.title} />
      <meta name="twitter:description" content={SITE_METADATA.description} />
      <meta name="twitter:url" content={`${SITE_METADATA.url}`} />
      <meta name="twitter:creator" content={'@maz_ipan'} />
    </Head>
  )
}
