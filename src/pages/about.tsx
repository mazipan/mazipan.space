import React, { FC, useEffect } from 'react';
import Helmet from 'react-helmet';
import { css } from '@emotion/core';

import IndexLayout from '../layouts';

import Wrapper from '../components/Wrapper';
import SiteNav from '../components/header/SiteNav';
import { PostFullContent } from '../components/PostContent';
import Footer from '../components/Footer';
import { trackView } from '../utils/ga';
import config from '../website-config';

import { SiteHeader, outer, inner, SiteMain } from '../styles/shared';

import { PostFullHeader, PostFullTitle, NoImage, PostFull } from '../templates/styles/post';

const PageTemplate = css`
  .site-main {
    background: var(--bg-content);
    padding-bottom: 4vw;
  }
`;

const About: FC = () => {
  useEffect(() => {
    trackView('Page About');
  }, []);

  const title = 'About Irfan Maulana - @mazipan';
  const desc = 'A small introduction about Irfan Maulana';

  return (
    <IndexLayout>
      <Helmet>
        <html lang={config.lang} />
        <title>{title}</title>

        <meta name="description" content={desc} />
        <meta property="og:site_name" content={config.title} />
        <meta property="og:type" content="profile" />
        <meta property="og:title" content={`${title}`} />
        <meta property="og:url" content={config.siteUrl + '/about'} />
        <meta property="og:image" content={`${config.siteUrl}/meta-image-about.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta property="article:publisher" content={`${config.facebook}`} />
        <meta property="article:author" content={`${config.facebook}`} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`${title}`} />
        <meta name="twitter:url" content={config.siteUrl + '/about'} />
        <meta name="twitter:image" content={`${config.siteUrl}/meta-image-about.jpg`} />
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
              <PostFullTitle>About</PostFullTitle>
            </PostFullHeader>

            <PostFullContent className="post-full-content">
              <div className="post-content">
                <p>Hi, I am Irfan Maulana.</p>
                <p>
                  Principal Engineer in Tokopedia. Former Software Engineer in Bizzy, Blibli.com and
                  SML Technologies.
                </p>
                <p>
                  An experienced software engineer especially in frontend side.
                  <br />
                  Having deep knowledge in HTML, CSS (with its pre-processor) and JavaScript with
                  the various framework.
                  <br />
                  Write good quality, well tested, and fast delivered code.
                  <br />
                  Experience in architecting frontend codebase.
                </p>
                <p>
                  A well-known figure in the programming community, open-source creator, and writer
                  for many technical articles.
                </p>
              </div>
            </PostFullContent>
          </article>
        </main>
        <Footer />
      </Wrapper>
    </IndexLayout>
  );
};

export default About;
