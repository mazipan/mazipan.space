import Head from 'next/head'

export default function Meta ({ title, description, url, coverImage, tag }) {
  return (
    <Head>
      <link rel="pingback" href={`https://webmention.io/webmention?forward=${url}`} />
      <title key="title">{title}</title>
      <meta key="description" name="description" content={description} />

      {tag && <meta key="article-tag" property="article:tag" content={tag} />}

      {coverImage && <meta key="og-image" property="og:image" content={coverImage} />}

      <meta key="og-title" property="og:title" content={title} />
      <meta key="og-description" property="og:description" content={description} />
      <meta key="og-url" property="og:url" content={url} />

      {coverImage && <meta key="tw-image" name="twitter:image" content={coverImage} />}

      <meta key="tw-title" name="twitter:title" content={title} />
      <meta key="tw-description" name="twitter:description" content={description} />
      <meta key="tw-url" name="twitter:url" content={url} />

      {tag && (
        <>
          <meta key="tw-label1" name="twitter:label1" content="Under tag" />
          <meta key="tw-data1" name="twitter:data1" content={tag} />
        </>
      )}
    </Head>
  )
}
