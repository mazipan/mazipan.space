import * as React from 'react';
import Helmet from 'react-helmet';
import { css } from '@emotion/core';

import IndexLayout from '../layouts';

import Wrapper from '../components/Wrapper';
import SiteNav from '../components/header/SiteNav';
import { PostFullContent } from '../components/PostContent';
import Footer from '../components/Footer';

import {
  SiteHeader,
  outer,
  inner,
  SiteMain
} from '../styles/shared';

import {
  PostFullHeader,
  PostFullTitle,
  NoImage,
  PostFull
} from '../templates/styles/post';

const PageTemplate = css`
  .site-main {
    background: #fff;
    padding-bottom: 4vw;
  }
`;

const About: React.FC = () => (
  <IndexLayout>
    <Helmet>
      <title>About @mazipan</title>
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
              <p>
                Hi, I am Irfan Maulana.
              </p>
              <p>
                Principal Engineer in Tokopedia. Former Software Engineer in Bizzy, Blibli.com and SML Technologies.
              </p>
              <p>
                An experienced software engineer especially in frontend side.
                <br/>
                Having deep knowledge in HTML, CSS (with its pre-processor) and JavaScript with the various framework.
                <br/>
                Write good quality, well tested, and fast delivered code.
                <br/>
                Experience in architecting frontend codebase.
              </p>
              <p>
                A well-known figure in the programming community, open-source creator, and writer for many technical articles.
              </p>
            </div>
          </PostFullContent>
        </article>
      </main>
      <Footer />
    </Wrapper>
  </IndexLayout>
);

export default About;
