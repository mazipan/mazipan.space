/* eslint-disable @next/next/no-html-link-for-pages */
import { Fragment } from 'react'

import Meta from '@/components/Meta/Custom'
import LayoutArticle from '@/components/Layout/Default'
import { SITE_METADATA } from '@/lib/constants'

export default function Unauthorized () {
  return (
    <>
      <LayoutArticle>
        <Fragment>
          <Meta
            lang="id"
            title="Unauthorized Example // mazipan.space"
            description="Unauthorized Example // mazipan.space"
            url={`${SITE_METADATA.url}/examples/unauthorized`}
          />
          <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
            Unauthorized!
          </h2>
          <div className="content">
            <h2 className="text-3xl md:text-4xl font-bold">Sorry, but you need to login first!</h2>

            <div className="flex items-center justify-between mt-8">
              <a href="/examples/login" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Login here
              </a>
            </div>
          </div>
        </Fragment>
      </LayoutArticle>
    </>
  )
}
