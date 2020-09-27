/* eslint-disable react/jsx-key */
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

import { SiteHeader, outer, inner, SiteMain } from '../styles/shared';
import { PostFullHeader, PostFullTitle, NoImage, PostFull } from '../templates/styles/post';

const PageTemplate = css`
  .site-main {
    background: var(--bg-content);
    padding-bottom: 4vw;
  }

  .icon {
    margin-right: 5px;
  }

  .talk-year-text {
    font-size: ${pxToRem(18)};
  }
  .talk-year {
    margin-bottom: 1em;
  }
  .talk-list {
    padding-top: 1em;
  }
  .talk-item {
    background: var(--bg-card) center center;
    box-shadow: rgba(39, 44, 49, 0.06) 8px 14px 38px, rgba(39, 44, 49, 0.03) 1px 3px 8px;
    transition: all 0.5s ease;
    border-radius: 5px;

    padding: 1em;
    margin-bottom: 1em;
    margin-left: 1em;

    :hover {
      box-shadow: rgba(39, 44, 49, 0.07) 8px 28px 50px, rgba(39, 44, 49, 0.04) 1px 6px 12px;
      transition: all 0.4s ease;
    }
  }
  .talk-date {
    font-size: ${pxToRem(12)};
  }
  .talk-event {
    font-size: ${pxToRem(18)};
    font-weight: 700;
  }
  .talk-topic {
    font-size: ${pxToRem(14)};
    margin-bottom: 2em;
  }
  .talk-slide,
  .talk-link {
    background-color: var(--text-title-color);
    color: var(--bg-card);
    font-size: ${pxToRem(12)};
    border-radius: 4px;
    padding: 0.5em 1em;
    margin-right: 0.5em;

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
                {Object.keys(allTalks)
                  .reverse()
                  .map((year: any, index: number) => {
                    return (
                      <details key={year} className="talk-year" open={index === 0}>
                        <summary className="talk-year-text">
                          #{year} ({allTalks[year].length} talks)
                        </summary>
                        <div className="talk-list">
                          {allTalks[year].map((list: any) => {
                            return (
                              <div key={list.date} className="talk-item">
                                <div className="talk-date">
                                  <i className="icon">🗓 </i>
                                  {list.date}
                                </div>
                                <div className="talk-event">{list.event}</div>
                                <div className="talk-topic">{list.topic}</div>

                                {list.link && list.link.length > 0 && (
                                  <>
                                    {list.link.map((link: string) => (
                                      <a
                                        className="talk-link"
                                        href={link}
                                        target="blank"
                                        rel="noopener noreferrer"
                                      >
                                        <i className="icon">📖 </i>Event
                                      </a>
                                    ))}
                                    {list.slide && (
                                      <a
                                        className="talk-slide"
                                        href={list.slide}
                                        target="blank"
                                        rel="noopener noreferrer"
                                      >
                                        <i className="icon">🖥 </i>Slide
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
              <small>
                Found a typo? please report on{' '}
                <a href="https://github.com/mazipan/talks" target="blank" rel="noopener noreferrer">
                  Github
                </a>
              </small>
            </PostFullContent>
          </article>
        </main>
        <Footer />
      </Wrapper>
    </IndexLayout>
  );
};

export default Talks;
