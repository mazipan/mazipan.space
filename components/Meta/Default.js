import Head from 'next/head'
import { SITE_METADATA, OG_IMAGE_HOME } from '../../lib/constants'

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
        key="description"
      />

      <meta property="og:site_name" content={SITE_METADATA.title} />
      <meta key="og-image" property="og:image" content={`${OG_IMAGE_HOME}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="article:author" content={'mazipanneh'} />
      <meta property="og:type" content="article" />
      <meta key="og-title" property="og:title" content={SITE_METADATA.title} />
      <meta key="og-description" property="og:description" content={SITE_METADATA.description} />
      <meta key="og-url" property="og:url" content={`${SITE_METADATA.url}`} />

      <meta key="tw-image" name="twitter:image" content={`${OG_IMAGE_HOME}`} />
      <meta name="twitter:image:width" content="1200" />
      <meta name="twitter:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta key="tw-title" name="twitter:title" content={SITE_METADATA.title} />
      <meta key="tw-description" name="twitter:description" content={SITE_METADATA.description} />
      <meta key="tw-url" name="twitter:url" content={`${SITE_METADATA.url}`} />
      <meta name="twitter:creator" content={'@maz_ipan'} />
    </Head>
  )
}
