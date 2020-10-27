import Head from 'next/head'
import { Fragment } from 'react'

import LayoutArticle from '@/components/layout-article'
import allTalks from '@/lib/all-talks'
import { SITE_METADATA, OG_IMAGE_TALKS } from '@/lib/constants'

export default function Index ({ talks }) {
  return (
    <>
      <LayoutArticle>
        <Fragment>
          <Head>
            <title>Talks | mazipan.space</title>
            <meta
              name="description"
              content="All talks presented by mazipan"
            />

            <meta property="og:url" content={`${SITE_METADATA.url}/talks`} />
            <meta name="twitter:title" content="Talks | mazipan.space" />
            <meta name="twitter:description" content="All talks presented by mazipan" />
            <meta name="twitter:image" content={`${OG_IMAGE_TALKS}`} />

            <meta name="twitter:url" content={`${SITE_METADATA.url}/talks`} />
            <meta property="og:title" content="Talks | mazipan.space" />
            <meta property="og:description" content="All talks presented by mazipan" />
            <meta property="og:image" content={OG_IMAGE_TALKS} />

          </Head>
          <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
            Talks
          </h2>
          <div className="content">
            {Object.keys(talks)
              .reverse()
              .map((year, index) => {
                return (
                  <details key={year} className="talk-year" open={index === 0}>
                    <summary className="text-xl md:text-2xl font-bold tracking-tight md:tracking-tighter leading-tight">
                      #{year} ({talks[year].length} talks)
                    </summary>
                    <div className="py-4">
                      {talks[year].map((item) => {
                        return (
                          <div
                            key={item.date}
                            className="rounded-lg p-4 mb-2 overflow-hidden shadow-lg hover:shadow-medium transition-shadow duration-200s"
                          >
                            <div className="text-gray-700 text-sm mb-2">
                              <span className="mr-2">🗓 </span>
                              {item.date}
                            </div>
                            <div className="text-lg md:text-xl font-bold">{item.event}</div>
                            <div className="mb-4 text-lg">{item.topic}</div>

                            {item.link && item.link.length > 0 && (
                              <>
                                {item.link.map((link) => (
                                  <a
                                    key={link}
                                    className="hover:underline mr-4"
                                    href={link}
                                    target="blank"
                                    rel="noopener noreferrer"
                                  >
                                    <span className="mr-2">📖 </span>
                                    <span>Event</span>
                                  </a>
                                ))}
                                {item.slide && item.slide !== 'NOT_AVAILABLE' && (
                                  <a
                                    className="hover:underline"
                                    href={item.slide}
                                    target="blank"
                                    rel="noopener noreferrer"
                                  >
                                    <span className="mr-2">🖥 </span>Slide
                                  </a>
                                )}
                              </>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </details>
                )
              })}
          </div>
        </Fragment>
      </LayoutArticle>
    </>
  )
}

export async function getStaticProps () {
  return {
    props: {
      talks: allTalks
    }
  }
}
