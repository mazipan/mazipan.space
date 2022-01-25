import { Fragment } from 'react'

import Meta from '@/components/Meta/Custom'
import LayoutArticle from '@/components/Layout/Default'
import { SITE_METADATA, OG_IMAGE_ABOUT, FEATURED_OSS, CAREERS } from '@/lib/constants'

export default function AboutPage() {
  return (
    <>
      <LayoutArticle>
        <Fragment>
          <Meta
            lang="id"
            title="ℹ️ About // mazipan.space"
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
              A frontend engineer, working in Tokopedia as Principal Engineer Web Platform.
              Before joining Tokopedia, I also have been work on the same Industry (online commerce) for the last 6 years in Bizzy Indonesia (B2B) and Blibli.com.
            </p>
            <br />
            <p>
              I build the web using various JavaScript framework, but I have professional experience with React.js and Vue.js. 
              I prefer to writing the unit test rather than testing my codemanually. 
              I play around with many configurations for the frontend build tools.
            </p>
            <br />
            <p>
              Outside my daily job as a full time employee, I also build a close connection with
              many programmer communities in Indonesia to giving back my limited knowledge and
              experience in the web development topic. I help kicking-off a project
              for Vue.js Indonesia, translating the documentation to the Indonesian language 🇮🇩, you can check
              it on{' '}
              <a
                className="text-red-500"
                target="_blank"
                rel="noopener noreferrer"
                href="https://docs.vuejs.id/"
              >
                docs.vuejs.id
              </a>
              . I also help to built{' '}
              <a
                className="text-red-500"
                target="_blank"
                rel="noopener noreferrer"
                href="https://s.byphp.id/ajari-koding"
              >
                ajari-koding
              </a>{' '}
              and{' '}
              <a
                className="text-red-500"
                target="_blank"
                rel="noopener noreferrer"
                href="https://learning.byphp.id"
              >
                learning.byphp.id
              </a>{' '}
              for PHPID community.
            </p>

            <h3 className="text-2xl md:text-4xl font-bold my-4 tracking-tighter leading-tight">
              Career
            </h3>

            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {CAREERS.map((career) => (
                <li
                  key={career.period}
                  className="rounded-lg p-4 overflow-hidden shadow-lg border-2 border-red-500"
                >
                  <h4 className="text-lg text-red-500 font-bold mb-2">
                    {career.title}
                  </h4>
                  <div className="text-sm">
                    <a
                      className="underline"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={career.link}>{career.company}</a>{` • `}<span>{career.location}</span>
                  </div>
                  <div className="text-gray-500">
                    <small>{career.period}</small>{` • `}<small>{career.long}</small>
                  </div>
                </li>
              ))}
            </ul>

            <h3 className="text-2xl md:text-4xl font-bold my-4 tracking-tighter leading-tight">
              Featured OSS
            </h3>


            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {FEATURED_OSS.map((oss) => (
                <li
                  key={oss.repo}
                  className="rounded-lg p-4 overflow-hidden shadow-lg border-2 border-red-500"
                >
                  <a
                    className="text-red-500"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={oss.url}
                  >
                    <h4 className="text-lg font-bold mb-4">
                      {oss.title}
                    </h4>
                  </a>
                  <p className="mb-4 text-sm">{oss.desc}</p>

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
                        className="hover:underline inline-block bg-red-100 text-red-600 rounded-full px-3 py-1 text-xs font-semibold mr-2"
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
