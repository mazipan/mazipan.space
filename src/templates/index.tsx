import * as React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';

import IndexLayout from '../layouts';

import ThemeSwitcher from '../components/ThemeSwitcher';
import Footer from '../components/Footer';
import SiteNav from '../components/header/SiteNav';
import PostCard from '../components/PostCard';
import Wrapper from '../components/Wrapper';
import Pagination from '../components/Pagination';

import config from '../website-config';

import {
  inner,
  outer,
  PostFeed,
  PostFeedRaise,
  SiteDescription,
  SiteHeader,
  SiteHeaderContent,
  SiteMain,
  SiteTitle,
} from '../styles/shared';

import { HomePosts } from './styles/index';

const IndexPage: React.FC<IndexProps> = props => {
  const width = props.data ? props.data.header.childImageSharp.fluid.sizes.split(', ')[1].split('px')[0] : 100;
  const height = props.data ? String(Number(width) / props.data.header.childImageSharp.fluid.aspectRatio) : '100';

  return (
    <IndexLayout css={HomePosts}>
      <Helmet>
        <html lang={config.lang} />
        <title>{config.title}</title>
        <meta name="description" content={config.description} />
        <meta property="og:site_name" content={config.title} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={config.title} />
        <meta property="og:description" content={config.description} />
        <meta property="og:url" content={config.siteUrl} />
        <meta
          property="og:image"
          content={`${config.siteUrl}${props.data ? props.data.header.childImageSharp.fluid.src : config.logo}`}
        />
        {config.facebook && <meta property="article:publisher" content={config.facebook} />}
        {config.googleSiteVerification && <meta name="google-site-verification" content={config.googleSiteVerification} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={config.title} />
        <meta name="twitter:description" content={config.description} />
        <meta name="twitter:url" content={config.siteUrl} />
        <meta
          name="twitter:image"
          content={`${config.siteUrl}${props.data ? props.data.header.childImageSharp.fluid.src : config.logo}`}
        />
        {config.twitter && (
          <meta
            name="twitter:site"
            content={`@${config.twitter.split('https://twitter.com/')[1]}`}
          />
        )}
        <meta property="og:image:width" content={width} />
        <meta property="og:image:height" content={height} />
      </Helmet>
      <Wrapper>
        <ThemeSwitcher/>
        <header
          css={[outer, SiteHeader]}>
          <div css={inner}>
            <SiteHeaderContent>
              <SiteTitle>
                {props.data && props.data.logo ? (
                  <img
                    style={{ maxHeight: '45px' }}
                    src={props.data.logo.childImageSharp.fixed.src}
                    alt={config.title}
                  />
                ) : (
                  config.title
                )}
              </SiteTitle>
              <SiteDescription>{config.description}</SiteDescription>
            </SiteHeaderContent>
            <SiteNav isHome />
          </div>
        </header>
        <main id="site-main" css={[SiteMain, outer]}>
          <div css={inner}>
            <div css={[PostFeed, PostFeedRaise]}>
              {props.data && props.data.allMarkdownRemark.edges.map(post => {
                // filter out drafts in production
                return (
                  (post.node.frontmatter.draft !== true ||
                    process.env.NODE_ENV !== 'production') && (
                    <PostCard key={post.node.fields.slug} post={post.node} />
                  )
                );
              })}
            </div>
          </div>
        </main>
        {props.children}
        <Pagination currentPage={props.pageContext.currentPage} numPages={props.pageContext.numPages} />
        <Footer />
      </Wrapper>
    </IndexLayout>
  );
};

export default IndexPage;
export const pageQuery =  graphql`
query blogPageQuery($skip: Int!, $limit: Int!) {
  logo: file(relativePath: { eq: "images/logo.png" }) {
    childImageSharp {
      # Specify the image processing specifications right in the query.
      # Makes it trivial to update as your page's design changes.
      fixed {
        ...GatsbyImageSharpFixed
      }
    }
  }
  header: file(relativePath: { eq: "images/blog-cover.jpg" }) {
    childImageSharp {
      # Specify the image processing specifications right in the query.
      # Makes it trivial to update as your page's design changes.
      fluid(maxWidth: 2000) {
        ...GatsbyImageSharpFluid
      }
    }
  }
  allMarkdownRemark(
    sort: { fields: [frontmatter___date], order: DESC },
    filter: {
      frontmatter: {
        draft: {
          ne: true
        }
        lang: {
          eq: "id"
        }
      }
    },
    limit: $limit,
    skip: $skip
  ) {
    edges {
      node {
        timeToRead
        frontmatter {
          title
          date
          tags
          lang
          draft
          description
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
