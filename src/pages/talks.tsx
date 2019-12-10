import IndexLayout from '../layouts';
import Wrapper from '../components/Wrapper';
import SiteNav from '../components/header/SiteNav';
import { SiteHeader, outer, inner, SiteMain } from '../styles/shared';
import * as React from 'react';
import { css } from '@emotion/core';

import allTalks from '../data/all-talks';

import { PostFullHeader, PostFullTitle, NoImage, PostFull } from '../templates/post';
import { PostFullContent } from '../components/PostContent';
import Footer from '../components/Footer';
import Helmet from 'react-helmet';

const PageTemplate = css`
  .site-main {
    background: #fff;
    padding-bottom: 4vw;
  }
  .talk-year-text{
    font-size: 3rem;
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
    font-size: 1.5rem;
    opacity: .8;
  }
  .talk-topic{
    font-size: 1.8rem;
    font-style: italic;
  }
  .talk-slide, .talk-link{
    font-size: 1.5rem;
    opacity: .8;
  }
`;

const Talks: React.FC = () => {
  return (
    <IndexLayout>
      <Helmet>
        <title>Talks</title>
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
                              <div className="talk-item" key={list.date}>
                                <div className="talk-date">{list.date}</div>
                                <div className="talk-event">{list.event}</div>
                                <div className="talk-topic">{list.topic}</div>
                                { list.link && list.link.length > 0 && (
                                  <>
                                    {
                                      list.link.map((link: string, idx: number) => (
                                        <a className="talk-link" href={link} target="blank" rel="noopener noreferrer">
                                          Event info
                                          {(idx !== list.link.length -1) && ', '}
                                        </a>
                                      ))
                                    }
                                  </>

                                )}

                                { list.slide && (
                                  <div className="talk-slide">
                                    <a href={list.slide} target="blank" rel="noopener noreferrer">See presentation slide ></a>
                                  </div>
                                )}
                              </div>
                            )
                          })
                        }
                      </div>
                    </details>
                  )
                })
              }
              </div>
              <div>
               Found a typo? please help me fix the typo on <a href="https://github.com/mazipan/talks" target="blank" rel="noopener noreferrer">Github repo</a>
              </div>
            </PostFullContent>
          </article>
        </main>
        <Footer />
      </Wrapper>
    </IndexLayout>
  )
};

export default Talks;
