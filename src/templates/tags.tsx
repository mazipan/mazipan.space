import React from 'react';
import { graphql } from 'gatsby';

import Footer from '../components/Footer';
import SiteNav from '../components/header/SiteNav';
import PostCard from '../components/PostCard';
import Wrapper from '../components/Wrapper';
import IndexLayout from '../layouts';
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
import Helmet from 'react-helmet';
import config from '../website-config';

const Tags: React.FC<TagTemplateProps> = props => {
  const tag = props.pageContext.tag ? props.pageContext.tag : '';
  const { edges, totalCount } = props.data ? props.data.allMarkdownRemark : { edges: [], totalCount: 0 };
  const tagData = props.data && props.data.allTagYaml.edges.find(
    n => n.node.id.toLowerCase() === tag.toLowerCase(),
  );

  return (
    <IndexLayout>
      <Helmet>
        <html lang={config.lang} />
        <title>
          {tag} - {config.title}
        </title>
        <meta
          name="description"
          content={tagData && tagData.node ? tagData.node.description : ''}
        />
        <meta property="og:site_name" content={config.title} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${tag} - ${config.title}`} />
        <meta property="og:url" content={config.siteUrl + tag} />
        {/* // @ts-ignore */}
        <meta property="og:image" content={`${config.siteUrl}${(tagData && tagData.node && tagData.node.image && tagData.node.image.childImageSharp && tagData.node.image.childImageSharp.fluid && tagData.node.image.childImageSharp.fluid.src )? tagData.node.image.childImageSharp.fluid.src : 'icons/icon-384x384'}`} />

        <meta property="article:publisher" content={`${config.facebook}`} />
        <meta property="article:author" content={`${config.facebook}`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${tag} - ${config.title}`} />
        <meta name="twitter:url" content={config.siteUrl + tag} />
        {/* // @ts-ignore */}
        <meta name="twitter:image" content={`${config.siteUrl}${(tagData && tagData.node && tagData.node.image && tagData.node.image.childImageSharp && tagData.node.image.childImageSharp.fluid && tagData.node.image.childImageSharp.fluid.src )? tagData.node.image.childImageSharp.fluid.src : 'icons/icon-384x384'}`} />

        {config.twitter && (
          <meta
            name="twitter:site"
            content={`@${config.twitter.split('https://twitter.com/')[1]}`}
          />
        )}
      </Helmet>
      <Wrapper>
        <header
          className={`${tagData && tagData.node.image ? '' : 'no-cover'}`}
          css={[outer, SiteHeader]}
          style={{
            backgroundImage:
              tagData && tagData.node.image
                ? `url('${tagData.node.image.childImageSharp.fluid.src}')`
                : '',
          }}
        >
          <div css={inner}>
            <SiteNav isHome={false} />
            <SiteHeaderContent>
              <SiteTitle>{tag}</SiteTitle>
              <SiteDescription>
                {tagData && tagData.node.description ? (
                  tagData.node.description
                ) : (
                  <>
                    A collection of {totalCount > 1 && `${totalCount} posts`}
                    {totalCount === 1 && '1 post'}
                    {totalCount === 0 && 'No posts'}
                  </>
                )}
              </SiteDescription>
            </SiteHeaderContent>
          </div>
        </header>
        <main id="site-main" css={[SiteMain, outer]}>
          <div css={inner}>
            <div css={[PostFeed, PostFeedRaise]}>
              {edges && edges.length > 0 && edges.map(({ node }) => (
                <PostCard key={node.fields.slug} post={node} />
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </Wrapper>
    </IndexLayout>
  );
};

export default Tags;
export const pageQuery = graphql`
query($tag: String) {
  allTagYaml {
    edges {
      node {
        id
        description
        image {
          childImageSharp {
            fluid(maxWidth: 3720) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
  allMarkdownRemark(
    limit: 2000
    sort: { fields: [frontmatter___date], order: DESC }
    filter: {
      frontmatter: {
        tags: {
          in: [$tag]
        }
        draft: {
          ne: true
        }
        lang: {
          eq: "id"
        }
      }
    }
  ) {
    totalCount
    edges {
      node {
        excerpt
        timeToRead
        frontmatter {
          title
          tags
          date
          image {
            childImageSharp {
              fluid(maxWidth: 1240) {
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
