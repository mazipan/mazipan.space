import React, { FC, useEffect } from 'react';
import { css } from '@emotion/core';
import Helmet from 'react-helmet';

import IndexLayout from '../layouts';

import Wrapper from '../components/Wrapper';
import SiteNav from '../components/header/SiteNav';
import Footer from '../components/Footer';
import { PostFullContent } from '../components/PostContent';

import pxToRem from '../styles/pxToRem';
import { trackView } from '../utils/ga';
import config from '../website-config';
// @ts-ignore
import allTalks from '../data/all-talks';

import {
  SiteHeader,
  outer,
  inner,
  SiteMain,
} from '../styles/shared';
import {
  PostFullHeader,
  PostFullTitle,
  NoImage,
  PostFull,
} from '../templates/styles/post';

const PageTemplate = css`
  .site-main {
    background: var(--bg-content);
    padding-bottom: 4vw;
  }
  .talk-year-text{
    font-size: ${pxToRem(18)};
  }
  .talk-year{
    margin-bottom: 1em;
  }
  .talk-list{
    padding-top: 1em;
  }
  .talk-item{
    margin-bottom: 1em;
    margin-left: 1em;
  }
  .talk-date{
    font-size: ${pxToRem(16)};
    opacity: .8;
  }
  .talk-event{
    font-size: ${pxToRem(18)};
    font-weight: 700;
  }
  .talk-topic{
    font-size: ${pxToRem(18)};
    font-style: italic;
  }
  .talk-slide, .talk-link{
    background-color: var(--text-title-color);
    color: var(--bg-card);
    font-size: ${pxToRem(12)};
    border-radius: 4px;
    padding: .5em;
    margin-right: 1em;

    &:hover {
      color: var(--bg-card);
    }
  }
`;

const Talks: FC = () => {
  useEffect(() => {
    trackView('Page Talks');
  }, []);

  const title = 'All talks by Irfan Maulana - @mazipan';
  const desc = 'A complete list of technology talk sessions by @mazipan';

  return (
    <IndexLayout>
      <Helmet>
        <html lang={config.lang} />
        <title>{title}</title>

        <meta name="description" content={desc} />
        <meta property="og:site_name" content={config.title} />
        <meta property="og:type" content="profile" />
        <meta property="og:title" content={`${title}`} />
        <meta property="og:url" content={config.siteUrl + '/talks'} />
        <meta property="og:image" content={`${config.siteUrl}/meta-image-talks.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta property="article:publisher" content={`${config.facebook}`} />
        <meta property="article:author" content={`${config.facebook}`} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`${title}`} />
        <meta name="twitter:url" content={config.siteUrl + '/talks'} />
        <meta name="twitter:image" content={`${config.siteUrl}/meta-image-talks.jpg`} />
        {config.twitter && (
          <meta
            name="twitter:site"
            content={`@${config.twitter.split('https://twitter.com/')[1]}`}
          />
        )}
        {config.twitter && (
          <meta
            name="twitter:creator"
            content={`@${config.twitter.split('https://twitter.com/')[1]}`}
          />
        )}
      </Helmet>
      <Wrapper css={PageTemplate}>
        <header css={[outer, SiteHeader]}>
          <div css={inner}>
            <SiteNav />
          </div>
        </header>
        <main id="site-main" className="site-main" css={[SiteMain, outer]}>
          <article className="post page" css={[PostFull, NoImage]}>
            <PostFullHeader>
              <PostFullTitle>Talks</PostFullTitle>
            </PostFullHeader>

            <PostFullContent className="post-full-content">
              <div className="post-content">
                {
                  Object.keys(allTalks).reverse().map((year: any, index: number) => {
                    return (
                      <details key={year} className="talk-year" open={index === 0}>
                        <summary className="talk-year-text">
                        #{year} ({allTalks[year].length} talks)
                        </summary>
                        <div className="talk-list">
                          {
                            allTalks[year].map((list: any) => {
                              return (
                                <div key={list.date} className="talk-item">
                                  <div className="talk-date">{list.date}</div>
                                  <div className="talk-event">{list.event}</div>
                                  <div className="talk-topic">{list.topic}</div>

                                  { list.link && list.link.length > 0 && (
                                    <>
                                      {
                                        list.link.map((link: string, idx: number) => (
                                          <a className="talk-link" href={link} target="blank" rel="noopener noreferrer">
                                          Event ➡️
                                            {(idx !== list.link.length - 1) && ', '}
                                          </a>
                                        ))
                                      }
                                      { list.slide && (
                                          <a className="talk-slide" href={list.slide} target="blank" rel="noopener noreferrer">Slide ➡️</a>
                                      )}
                                    </>

                                  )}


                                </div>
                              );
                            })
                          }
                        </div>
                      </details>
                    );
                  })
                }
              </div>
              <small>Found a typo? please help me fix the typo on this <a href="https://github.com/mazipan/talks" target="blank" rel="noopener noreferrer">Github repo</a></small>
            </PostFullContent>
          </article>
        </main>
        <Footer />
      </Wrapper>
    </IndexLayout>
  );
};

export default Talks;
