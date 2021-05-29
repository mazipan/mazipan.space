import { Fragment } from 'react'

import Meta from '@/components/Meta/Custom'
import LayoutArticle from '@/components/Layout/Default'
import { SITE_METADATA, OG_IMAGE_ABOUT } from '@/lib/constants'

const FEATURED_OSS = [
  {
    title: 'Ksana.in',
    desc: "Simple URL shortener/beautifier for free",
    repo: 'https://github.com/mazipan/ksana.in',
    url: 'https://ksana.in/',
    stacks: ['Supabase', 'Next.js']
  },
  {
    title: 'Baca-Quran.id',
    desc: "Web App to read The Holy Qur'an without Ads and Analytics",
    repo: 'https://github.com/mazipan/baca-quran.id',
    url: 'https://www.baca-quran.id/',
    stacks: ['Nuxt.js']
  },
  {
    title: 'PSI Github Actions',
    desc: 'Github Action to generate web performance report for JAMStack using PageSpeedInsight',
    repo: 'https://github.com/mazipan/psi-gh-action',
    url: 'https://github.com/marketplace/actions/psi-gh-action',
    stacks: ['Github Actions', 'PageSpeedInsight']
  },
  {
    title: 'GraphQL PokeApi',
    desc: 'The GraphQL for PokeApi',
    repo: 'https://github.com/mazipan/graphql-pokeapi',
    url: 'https://graphql-pokeapi.vercel.app',
    stacks: ['GraphQl', 'Vercel']
  },
  {
    title: 'E-commerce Web Perf',
    desc: 'Web Perf Comparison for E-Commerce in Indonesia ',
    repo: 'https://github.com/mazipan/webperf-ecommerce-id',
    url: 'https://webperf-ecommerce-id.vercel.app/',
    stacks: ['Next.js', 'PageSpeedInsight']
  }
]

export default function AboutPage () {
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
          <h2 className="mb-8 text-6xl md:text-7xl font-heading font-bold tracking-tighter leading-tight">
            ℹ️ About
          </h2>
          <div className="content">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 tracking-tighter leading-tight">
              Hi 👋, I am Irfan Maulana.
            </h2>
            <p>
              A frontend engineer, working in Tokopedia as Principal Engineer Web Platform. Already start my career journey since 2013. 
              Before joining Tokopedia, I also have been work on the same Industry (online commerce) for the last 6 years in Bizzy Indonesia (B2B) and Blibli.com.
            </p>
            <br />
            <p>
              I build the web using various JavaScript framework, I am not fanatic with any
              frontend frameworks out there. I have professional experience with some of popular
              JavaScript frameworks like React.js, Svelte, Vue.js and AngularJS in the early
              version. I prefer to writing the unit test rather than testing my code
              manually. I have experience in writing many custom configuration for the build tools
              for the front end codebase. You just name it, webpack, rollup, or even the native
              Node.js custom script, I can work with it (
              <i>or at least I can learn it if I don't know it yet</i>).
            </p>
            <br />
            <p>
              Outside my daily job as a full time employee in the company, I also build a close connection with
              many programmer communities in Indonesia to giving back my limited knowledge and
              experience in the web development topic. I help kicking-off a project
              for Vue.js Indonesia, translating the documentation to the Bahasa Indonesia, you can check
              it on{' '}
              <a
                className="text-red-500"
                target="_blank"
                rel="noopener noreferrer"
                href="https://docs.vuejs.id/"
              >
                docs.vuejs.id/
              </a>
              . I also help to built{' '}
              <a
                className="text-red-500"
                target="_blank"
                rel="noopener noreferrer"
                href="https://s.byphp.id/ajari-koding"
              >
                s.byphp.id/ajari-koding
              </a>{' '}
              and{' '}
              <a
                className="text-red-500"
                target="_blank"
                rel="noopener noreferrer"
                href="https://s.byphp.id/learning"
              >
                s.byphp.id/learning
              </a>{' '}
              for PHP ID community.
            </p>

            <h3 className="text-2xl md:text-4xl font-bold my-4 tracking-tighter leading-tight">
              Featured Open Projects
            </h3>

            <ul>
              {FEATURED_OSS.map((oss) => (
                <li
                  key={oss.repo}
                  className="rounded-lg p-4 mb-2 overflow-hidden shadow-lg border-2 border-red-500"
                >
                  <a
                    className="text-red-500"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={oss.url}
                  >
                    <h4 className="text-xl md:text-2xl font-bold mb-4 tracking-tighter leading-tight">
                      {oss.title}
                    </h4>
                  </a>
                  <p className="mb-4">{oss.desc}</p>

                  <div className="flex justify-between">
                    <a
                      className="text-red-500 text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={oss.repo}
                    >
                      {oss.repo.replace('https://github.com/', '')}
                    </a>
                    <img src={`https://img.shields.io/github/stars/${oss.repo.replace('https://github.com/', '')}.svg?style=social`} alt={oss.repo} loading="lazy" />
                  </div>

                  <div className="flex mt-4">
                    {oss.stacks.map((stack) => (
                      <span
                        key={stack}
                        className="hover:underline inline-block bg-red-100 text-red-600 rounded-full px-3 py-1 text-xs font-semibold mr-2 mb-2"
                      >
                        {stack}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Fragment>
      </LayoutArticle>
    </>
  )
}
