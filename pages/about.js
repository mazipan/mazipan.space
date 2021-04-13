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
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Hi 👋, I am Irfan Maulana.</h2>
            <p>
              A frontend engineer, now work in Tokopedia as Principal Engineer Web Platform.
              I already start my software engineering careers since 2013.
              Before joining Tokopedia, I work on several companies such as Bizzy Indonesia, Blibli.com and SML Technologies.
            </p>
            <br/>
            <p>
              I used to build the web using various JavaScript framework, or I can say that I am not fanatic with any frameworks out there.
              I have experience in writing many custom configuration for the build tools for the front end codebase. You just name it, webpack, rollup, or any other build tools, I can work with it (<i>or at least I can learn it easily if I don't know it yet</i>).
            </p>
            <br/>
            <p>
              Outside my job as a full time employee, I also build a close connection with many programmer communities in Indonesia to give back my knowledge and experience in the web development to the other engineers.
            </p>
          </div>
        </Fragment>
      </LayoutArticle>
    </>
  )
}
