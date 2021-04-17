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
            title="ℹ️ About | mazipan.space"
            description="About the Author of mazipan.space"
            url={`${SITE_METADATA.url}/about`}
            coverImage={`${OG_IMAGE_ABOUT}`}
          />
          <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
            ℹ️  About
          </h2>
          <div className="content">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Hi 👋, I am Irfan Maulana.</h2>
            <p>
              A frontend engineer, now work in Tokopedia as Principal Engineer Web Platform.
              I already start my software engineering careers since 2013.
              Before joining Tokopedia, I work on several companies such as Bizzy Indonesia, Blibli.com and SML Technologies.
              I spent the last 6 years to work on online commerce industry.
            </p>
            <br/>
            <p>
              I used to build the web using various JavaScript framework, I am not fanatic with any frontend frameworks out there.
              I have professional experience with some of popular JavaScript frameworks like React.js, Svelte, Vue.js and AngularJS in the early version.
              I prefer to writing the unit test rather than should to test my code manually.
              I have experience in writing many custom configuration for the build tools for the front end codebase.
              You just name it, webpack, rollup, or even the native Node.js custom script, I can work with it (<i>or at least I can learn it if I don't know it yet</i>).
            </p>
            <br/>
            <p>
              Outside my daily job as a full time employee, I also build a close connection with many programmer communities in Indonesia to giving back my limited knowledge and experience in the web development topic to the community. 
              I help kicking-off project for Vue.js documentation in Bahasa Indonesia with Vue.js ID community, you can check it on <a class="text-red-500" target="_blank" rel="noopener noreferrer" href="https://docs.vuejs.id/">https://docs.vuejs.id/</a>. 
              I also help to built <a class="text-red-500" target="_blank" rel="noopener noreferrer" href="https://s.byphp.id/ajari-koding">https://s.byphp.id/ajari-koding</a> and <a class="text-red-500" target="_blank" rel="noopener noreferrer" href="https://s.byphp.id/learning">https://s.byphp.id/learning</a> for PHP ID community.
            </p>
          </div>
        </Fragment>
      </LayoutArticle>
    </>
  )
}
