import { Fragment } from 'react'

import Meta from '@/components/Meta/Custom'
import LayoutArticle from '@/components/Layout/Default'
import { SITE_METADATA, OG_IMAGE_ABOUT } from '@/lib/constants'

export default function Index () {
  return (
    <>
      <LayoutArticle>
        <Fragment>
          <Meta
            lang="id"
            title="About | mazipan.space"
            description="About | mazipan.space"
            url={`${SITE_METADATA.url}/about`}
            coverImage={`${OG_IMAGE_ABOUT}`}
          />
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
