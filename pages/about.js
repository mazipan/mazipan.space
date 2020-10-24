import Head from 'next/head'
import { Fragment } from 'react'

import LayoutArticle from '@/components/layout-article'

export default function Index () {
  return (
    <>
      <LayoutArticle>
        <Fragment>
          <Head>
            <title>About | mazipan.space</title>
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
