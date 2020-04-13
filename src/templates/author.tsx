import React, { FC, useEffect } from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';

import IndexLayout from '../layouts';

import Footer from '../components/Footer';
import SiteNav from '../components/header/SiteNav';
import PostCard from '../components/PostCard';
import Wrapper from '../components/Wrapper';
import Facebook from '../components/icons/facebook';
import Website from '../components/icons/website';
import Twitter from '../components/icons/twitter';

import { trackView } from '../utils/ga';
import config from '../website-config';

import {
  AuthorProfileImage,
  inner,
  outer,
  PostFeed,
  PostFeedRaise,
  SiteHeader,
  SiteHeaderContent,
  SiteTitle,
  SiteMain,
  SocialLink,
} from '../styles/shared';

import {
  HiddenMobile,
  AuthorMeta,
  AuthorBio,
  Bull,
  AuthorProfileBioImage,
} from './styles/author';

const Author: FC<AuthorTemplateProps> = props => {
  useEffect(() => {
    trackView('Page Author');
  }, []);

  const author = props.data && props.data.authorYaml;

  const edges = props.data && props.data.allMarkdownRemark.edges.filter(
    edge => {
      const isDraft = (edge.node.frontmatter.draft !== true ||
        process.env.NODE_ENV === 'development');
      return isDraft && edge.node.frontmatter.author && edge.node.frontmatter.author.id === author.id;
    }
  );
  const totalCount = edges ? edges.length : 0;

  return (
    <IndexLayout>
      <Helmet>
        <html lang={config.lang} />
        <title>
          {author.id} - {config.title}
        </title>
        <meta name="description" content={author.bio} />
        <meta property="og:site_name" content={config.title} />
        <meta property="og:type" content="profile" />
        <meta property="og:title" content={`${author.id} - ${config.title}`} />
        <meta property="og:url" content={config.siteUrl + author.id} />
        <meta property="og:image" content={`${config.siteUrl}/${author.avatar}`} />

        <meta property="article:publisher" content={`https://www.facebook.com/${author.facebook}`} />
        <meta property="article:author" content={`https://www.facebook.com/${author.facebook}`} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`${author.id} - ${config.title}`} />
        <meta name="twitter:url" content={config.siteUrl + author.id} />
        <meta name="twitter:image" content={`${config.siteUrl}/${author.avatar}`} />
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
        <header
          className="no-cover"
          css={[outer, SiteHeader]}
          style={{
            // eslint-disable-next-line @typescript-eslint/camelcase
            backgroundImage: author.profile_image ?
              `url(${author.profile_image.childImageSharp.fluid.src})` :
              '',
          }}
        >
          <div css={inner}>
            <SiteNav isHome={false} />
            <SiteHeaderContent>
              <img
                css={[AuthorProfileImage, AuthorProfileBioImage]}
                src={props.data && props.data.authorYaml.avatar.childImageSharp.fluid.src}
                alt={author.id}
              />
              <SiteTitle>{author.id}</SiteTitle>
              {author.bio && <AuthorBio>{author.bio}</AuthorBio>}
              <AuthorMeta>
                {author.location && (
                  <div css={HiddenMobile}>
                    {author.location} <Bull>&bull;</Bull>
                  </div>
                )}
                <div css={HiddenMobile}>
                  {totalCount > 1 && `${totalCount} posts`}
                  {totalCount === 1 && '1 post'}
                  {totalCount === 0 && 'No posts'} <Bull>•</Bull>
                </div>
                {author.website && (
                  <div>
                    <a
                      className="social-link-wb"
                      css={SocialLink}
                      href={author.website}
                      title="Website"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Website />
                    </a>
                  </div>
                )}
                {author.twitter && (
                  <a
                    className="social-link-tw"
                    css={SocialLink}
                    href={`https://twitter.com/${author.twitter}`}
                    title="Twitter"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Twitter />
                  </a>
                )}
                {author.facebook && (
                  <a
                    className="social-link-fb"
                    css={SocialLink}
                    href={`https://www.facebook.com/${author.facebook}`}
                    title="Facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Facebook />
                  </a>
                )}
              </AuthorMeta>
            </SiteHeaderContent>
          </div>
        </header>
        <main id="site-main" css={[SiteMain, outer]}>
          <div css={inner}>
            <div css={[PostFeed, PostFeedRaise]}>
              {edges && edges.length > 0 && edges.map(({ node }) => {
                return <PostCard key={node.fields.slug} post={node} />;
              })}
            </div>
          </div>
        </main>
        <Footer />
      </Wrapper>
    </IndexLayout>
  );
};

export default Author;
export const pageQuery = graphql`
    query($author: String) {
      authorYaml(id: { eq: $author }) {
        id
        website
        twitter
        bio
        facebook
        location
        profile_image {
          childImageSharp {
            fluid(maxWidth: 3720) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        avatar {
          childImageSharp {
            fluid(maxWidth: 200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      allMarkdownRemark(
        filter: {
          frontmatter: {
            draft: { ne: true }
            lang: {
              eq: "id"
            }
          }
        },
        sort: { fields: [frontmatter___date], order: DESC },
        limit: 2000,
      ) {
        edges {
          node {
            excerpt
            timeToRead
            frontmatter {
              title
              tags
              date
              draft
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
            fields {
              layout
              slug
            }
          }
        }
      }
    }
  `;
