import { graphql, Link } from 'gatsby';
import React, { FC, useEffect } from 'react';
import Helmet from 'react-helmet';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import IndexLayout from '../layouts';

import SiteNavLogo from '../components/header/SiteNavLogo';
import PostCard from '../components/PostCard';
import Wrapper from '../components/Wrapper';
import { trackView } from '../utils/ga';
import config from '../website-config';

import {
  inner,
  outer,
  PostFeed,
  SiteHeader
} from '../styles/shared';

const SiteNavCenter = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  .site-nav-logo {
    margin-right: 0;
  }
`;

const ErrorTemplate = css`
  padding: 7vw 4vw;
`;

const ErrorCode = styled.h1`
  margin: 0;
  font-size: 12vw;
  line-height: 1em;
  letter-spacing: -5px;
  opacity: 0.3;
`;

const ErrorDescription = styled.p`
  margin: 0;
  color: var(--text-color-grey);
  font-size: 3rem;
  line-height: 1.3em;
  font-weight: 400;
`;

const ErrorLink = css`
  display: inline-block;
  margin-top: 5px;
`;

interface NotFoundTemplateProps {
  data: {
    allMarkdownRemark: {
      totalCount: number;
      edges: Array<{
        node: PageContext;
      }>;
    };
  };
}

const NotFoundPage: FC<NotFoundTemplateProps> = props => {

  useEffect(() => {
    trackView('Page 404');
  }, []);

  const { edges } = props.data.allMarkdownRemark;

  const title = '404 Page - @mazipan';
  const desc = config.description;

  return (
    <IndexLayout>
    <Helmet>
        <html lang={config.lang} />
        <title>{title}</title>

        <meta name="description" content={desc} />
        <meta property="og:site_name" content={config.title} />
        <meta property="og:type" content="profile" />
        <meta property="og:title" content={`${title}`} />
        <meta property="og:url" content={config.siteUrl} />
        <meta property="og:image" content={`${config.siteUrl}/meta-image-404.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta property="article:publisher" content={`${config.facebook}`} />
        <meta property="article:author" content={`${config.facebook}`} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`${title}`} />
        <meta name="twitter:url" content={config.siteUrl} />
        <meta name="twitter:image" content={`${config.siteUrl}/meta-image-404.jpg`} />
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
      <Wrapper>
        <header css={[SiteHeader, outer]}>
          <div className="inner">
            <SiteNavCenter>
              <SiteNavLogo />
            </SiteNavCenter>
          </div>
        </header>
        <main id="site-main" css={[ErrorTemplate, outer]}>
          <div css={inner}>
            <section style={{ textAlign: 'center' }}>
              <ErrorCode>404</ErrorCode>
              <ErrorDescription>Page not found</ErrorDescription>
              <Link css={ErrorLink} to="">
                Go to the front page →
              </Link>
            </section>
          </div>
        </main>
        <aside css={outer}>
          <div css={inner}>
            <div css={PostFeed}>
              {edges.map(({ node }) => (
                <PostCard key={node.fields.slug} post={node} />
              ))}
            </div>
          </div>
        </aside>
      </Wrapper>
    </IndexLayout>
  );
};

export default NotFoundPage;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(limit: 3, sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          timeToRead
          frontmatter {
            title
            date
            tags
            image {
              childImageSharp {
                fluid(maxWidth: 3720) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            author {
              id
              bio
              avatar {
                children {
                  ... on ImageSharp {
                    fixed(quality: 90) {
                      src
                    }
                  }
                }
              }
            }
          }
          excerpt
          fields {
            layout
            slug
          }
        }
      }
    }
  }
`;
