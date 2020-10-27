import Head from 'next/head'
import { Fragment } from 'react'

import LayoutArticle from '@/components/layout-article'
import { SITE_METADATA, OG_IMAGE_ABOUT } from '@/lib/constants'

export default function Index () {
  return (
    <>
      <LayoutArticle>
        <Fragment>
          <Head>
            <title>About | mazipan.space</title>
            <meta
              name="description"
              content="About mazipan"
            />

            <meta property="og:url" content={`${SITE_METADATA.url}/about`} />
            <meta name="twitter:title" content="About | mazipan.space" />
            <meta name="twitter:description" content="About mazipan" />
            <meta name="twitter:image" content={`${OG_IMAGE_ABOUT}`} />

            <meta name="twitter:url" content={`${SITE_METADATA.url}/about`} />
            <meta property="og:title" content="About | mazipan.space" />
            <meta property="og:description" content="About mazipan" />
            <meta property="og:image" content={OG_IMAGE_ABOUT} />
          </Head>
          <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
            About
          </h2>
          <div className="content">
            <h2 className="text-3xl md:text-4xl font-bold">Hi 👋, I am Irfan Maulana.</h2>
          </div>
        </Fragment>
      </LayoutArticle>
    </>
  )
}
