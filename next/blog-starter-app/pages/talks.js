import Head from 'next/head';
import { Fragment } from 'react';

import LayoutArticle from '@/components/layout-article';
import allTalks from '@/lib/all-talks';

export default function Index({ talks }) {
  return (
    <>
      <LayoutArticle>
        <Fragment>
          <Head>
            <title>Talks | mazipan.space</title>
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
                          <div key={item.date} className="rounded-lg p-4 mb-2 overflow-hidden shadow-lg hover:shadow-medium transition-shadow duration-200s">
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
                                    className="hover:underline mr-4"
                                    href={link}
                                    target="blank"
                                    rel="noopener noreferrer"
                                  >
                                    <span className="mr-2">📖 </span><span>Event</span>
                                  </a>
                                ))}
                                {item.slide && (
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
                        );
                      })}
                    </div>
                  </details>
                );
              })}
          </div>
        </Fragment>
      </LayoutArticle>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      talks: allTalks,
    },
  };
}
