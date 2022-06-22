import { Fragment } from 'react'

import Meta from '@/components/Meta/Custom'
import LayoutArticle from '@/components/Layout/Default'

import allTalks from '@/lib/all-talks'
import { SITE_METADATA, OG_IMAGE_TALKS } from '@/lib/constants'

export default function TalksPage ({ talks }) {
  return (
    <>
      <LayoutArticle>
        <Fragment>
          <Meta
            lang="id"
            title="🎙️ Talks // mazipan.space"
            description="List of public tech talks presented by mazipan"
            url={`${SITE_METADATA.url}/talks`}
            coverImage={`${OG_IMAGE_TALKS}`}
          />
          <h2 className="mb-8 text-6xl md:text-7xl font-heading font-bold tracking-tighter leading-tight">
            🎙️ Talks
          </h2>
          <div className="relative content">

            <p>Do you want to invite me to talk in your event?
               <a href="https://github.com/mazipan/talks"
                  target="blank"
                  rel="noopener noreferrer"
                  className="text-red-500">
                    &nbsp;Read the requirements here
               </a>
            </p>

            <div className="mt-6">
            {Object.keys(talks)
              .reverse()
              .map((year, index) => {
                return (
                  <details key={year} className="talk-year" open={index === 0}>
                    <summary className="text-xl md:text-2xl font-bold tracking-tight md:tracking-tighter leading-tight p-2">
                      #{year} ({talks[year].length} talks)
                    </summary>
                    <div className="py-4">
                      {talks[year].map((item) => {
                        return (
                          <div
                            key={item.date}
                            className="rounded-lg p-4 mb-2 overflow-hidden shadow-lg bg-white dark:bg-gray-800"
                          >
                            <div className="inline-block bg-gray-300 dark:bg-gray-700 rounded-sm px-3 py-1 text-xs font-semibold">
                              <span className="mr-2">🗓 </span>
                              <span>{item.date}</span>
                            </div>
                            <div className="mt-4 mb-4 text-lg md:text-xl font-bold">{item.event}</div>
                            <div className="mb-4 text-sm md:text-md">{item.topic}</div>

                            {item.link && item.link.length > 0 && (
                              <div className="flex text-sm">
                                {item.link.map((link) => (
                                  <a
                                    key={link}
                                    className="border-2 border-red-500 bg-red-500 text-white font-bold py-1 px-2 rounded mr-4"
                                    href={link}
                                    target="blank"
                                    rel="noopener noreferrer"
                                  >
                                    <span className="mr-2">▶️ </span>
                                    <span>Watch Video</span>
                                  </a>
                                ))}

                                {item.slide && item.slide !== 'NOT_AVAILABLE' && (
                                  <a
                                    className="border-2 border-red-500 text-red-500 font-bold py-1 px-2 rounded"
                                    href={item.slide}
                                    target="blank"
                                    rel="noopener noreferrer"
                                  >
                                    <span className="mr-2">📒 </span>View Slides
                                  </a>
                                )}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </details>
                )
              })}
          </div>
          </div>
        </Fragment>
      </LayoutArticle>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      talks: allTalks
    }
  }
}
