import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';
import * as _ from 'lodash';
import React, { FC, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import IndexLayout from '../layouts';

import AuthorCard from '../components/AuthorCard';
import Footer from '../components/Footer';
import SiteNav from '../components/header/SiteNav';
import PostCard from '../components/PostCard';
import PostContent from '../components/PostContent';
import PostFullFooter from '../components/PostFullFooter';
import PostFullFooterRight from '../components/PostFullFooterRight';
import ReadNextCard from '../components/ReadNextCard';
import Wrapper from '../components/Wrapper';

import { trackView } from '../utils/ga';
import {
  getJsonLdBreadcrumb,
  getJsonLdArticle
} from '../utils/jsonld';

import config from '../website-config';

import {
  inner,
  outer,
  SiteHeader,
  SiteMain
} from '../styles/shared';

import {
  DateDivider,
  PostFull,
  NoImage,
  PostFullHeader,
  PostFullImage,
  PostFullMeta,
  PostFullMetaDate,
  PostFullTitle,
  PostTemplate,
  ReadNextFeed
} from './styles/post';

const PageTemplate: FC<PageTemplateProps> = props => {
  useEffect(() => {
    (async function loadPolyfills() {
      if (typeof window.IntersectionObserver === 'undefined') {
        // @ts-ignore
        await import('intersection-observer')
      }
    })();
    trackView('Page Post');
  }, []);

  const post = props.data && props.data.markdownRemark;
  let width = '';
  let height = '';
  if (post && post.frontmatter.image && post.frontmatter.image.childImageSharp) {
    width = post.frontmatter.image.childImageSharp.fluid.sizes.split(', ')[1].split('px')[0];
    height = String(Number(width) / post.frontmatter.image.childImageSharp.fluid.aspectRatio);
  }

  return (
    <IndexLayout className="post-template">
      <Helmet>
        <html lang={config.lang} />
        <title>{ post && post.frontmatter.title }</title>

        <meta name="description" content={post && post.excerpt} />
        <meta property="og:site_name" content={config.title} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post && post.frontmatter.title} />
        <meta property="og:description" content={post && post.excerpt} />
        <meta property="og:url" content={config.siteUrl + props.pathContext.slug} />
        {(post && post.frontmatter.image && post.frontmatter.image.childImageSharp) && (
          <meta property="og:image" content={`${config.siteUrl}${post.frontmatter.image.childImageSharp.fluid.src}`} />
        )}
        {width && <meta property="og:image:width" content={width} />}
        {height && <meta property="og:image:height" content={height} />}

        <meta property="article:published_time" content={post && post.frontmatter.date} />
        {/* not sure if modified time possible */}
        {/* <meta property="article:modified_time" content="2018-08-20T15:12:00.000Z" /> */}
        {post && post.frontmatter.tags && (
          <meta property="article:tag" content={post.frontmatter.tags[0]} />
        )}

        {config.facebook && <meta property="article:publisher" content={config.facebook} />}
        {config.facebook && <meta property="article:author" content={config.facebook} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post && post.frontmatter.title} />
        <meta name="twitter:description" content={post && post.excerpt} />
        <meta name="twitter:url" content={config.siteUrl + props.pathContext.slug} />
        {(post && post.frontmatter.image && post.frontmatter.image.childImageSharp) && (
          <meta name="twitter:image" content={`${config.siteUrl}${post.frontmatter.image.childImageSharp.fluid.src}`} />
        )}
        <meta name="twitter:label1" content="Written by" />
        <meta name="twitter:data1" content={post && post.frontmatter.author.id} />
        <meta name="twitter:label2" content="Filed under" />
        {post && post.frontmatter.tags && <meta name="twitter:data2" content={post.frontmatter.tags[0]} />}
        {config.twitter && <meta name="twitter:site" content={`@${config.twitter.split('https://twitter.com/')[1]}`} />}
        {config.twitter && <meta
          name="twitter:creator"
          content={`@${config.twitter.split('https://twitter.com/')[1]}`}
        />}
        <script type="application/ld+json" id="ld-breadcrumb">{`${getJsonLdBreadcrumb({ category: post?.frontmatter?.tags?.[0] || '', title: post?.frontmatter?.title || '', slug: props?.pathContext?.slug || ''})}`}</script>
        <script type="application/ld+json" id="ld-post">{`${getJsonLdArticle({ title: post?.frontmatter?.title || '', slug: props?.pathContext?.slug || '', cover: config.siteUrl + post?.frontmatter?.image?.childImageSharp?.fluid?.src || '', date: post?.frontmatter?.date, desc: post?.excerpt || ''})}`}</script>
      </Helmet>
      <Wrapper css={PostTemplate}>
        <header css={[outer, SiteHeader]}>
          <div css={inner}>
            <SiteNav />
          </div>
        </header>
        <main id="site-main" className="site-main" css={[SiteMain, outer]}>
          <div css={inner}>
            { post && (
              <article css={[PostFull, !post.frontmatter.image && NoImage]}>
                <PostFullHeader>
                  <PostFullMeta>
                    <PostFullMetaDate dateTime={post.frontmatter.date}>
                      {post.frontmatter.userDate}
                    </PostFullMetaDate>
                    {post.frontmatter.tags &&
                      post.frontmatter.tags.length > 0 && (
                        <>
                          <DateDivider>/</DateDivider>
                          <Link to={`/tags/${_.kebabCase(post.frontmatter.tags[0])}/`}>
                            {post.frontmatter.tags[0]}
                          </Link>
                        </>
                    )}
                  </PostFullMeta>
                  <PostFullTitle>{post.frontmatter.title}</PostFullTitle>
                </PostFullHeader>

                {(post.frontmatter.image && post.frontmatter.image.childImageSharp) && (
                  <PostFullImage>
                    <Img
                      style={{ height: '100%' }}
                      fluid={post.frontmatter.image.childImageSharp.fluid}
                    />
                  </PostFullImage>
                )}

                <PostContent htmlAst={post.htmlAst} title={post.frontmatter.title} desc={post.frontmatter.description} slug={props?.pathContext?.slug || ''}/>
                <PostFullFooter>
                  <AuthorCard author={post.frontmatter.author} />
                  <PostFullFooterRight authorId={post.frontmatter.author.id} />
                </PostFullFooter>
              </article>
            )}
          </div>
        </main>

        {/* Links to Previous/Next posts */}
        <aside className="read-next" css={outer}>
          <div css={inner}>
            <ReadNextFeed>
              {props.data && props.data.relatedPosts && (
                <ReadNextCard tags={post && post.frontmatter.tags} relatedPosts={props.data.relatedPosts} />
              )}

              {props.pageContext.prev && <PostCard post={props.pageContext.prev} />}
              {props.pageContext.next && <PostCard post={props.pageContext.next} />}
            </ReadNextFeed>
          </div>
        </aside>
        <Footer />
      </Wrapper>
    </IndexLayout>
  );
};

export default PageTemplate;
export const query = graphql`
  query($slug: String, $primaryTag: String) {
    logo: file(relativePath: { eq: "images/logo.png" }) {
      childImageSharp {
        fixed {
          ...GatsbyImageSharpFixed
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      htmlAst
      excerpt
      timeToRead
      frontmatter {
        title
        description
        userDate: date(formatString: "D MMMM YYYY")
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
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
    relatedPosts: allMarkdownRemark(
      filter: {
        frontmatter: {
          tags: {
            in: [$primaryTag]
          },
          draft: {
            ne: true
          },
          lang: {
            eq: "id"
          }
        }
      }
      limit: 3
    ) {
      totalCount
      edges {
        node {
          id
          timeToRead
          excerpt
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
