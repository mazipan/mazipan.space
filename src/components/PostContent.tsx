import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import RehypeReact from 'rehype-react';
// import HyvorTalk from 'hyvor-talk-react';
import SharePost from './SharePost';
import LikeButton from './LikeButton';

import pxToRem from '../styles/pxToRem';

export const PostFullContent = styled.section`
  position: relative;
  margin: 0 auto;
  padding: 0 100px 0;
  min-height: 230px;
  font-size: ${pxToRem(16)};
  line-height: 1.6em;
  background: var(--bg-content);
  border-radius: 5px;

  @media (max-width: 1170px) {
    padding: 0 7vw 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  ul,
  ol,
  dl,
  pre,
  blockquote,
  .post-full-comments,
  .footnotes {
    min-width: 100%;
  }

  li {
    word-break: break-word;
  }

  li p {
    margin: 0;
  }

  a {
    text-decoration: none;
    word-break: break-word;
  }

  a:hover {
    color: var(--text-link-color);
    text-decoration: none;
  }

  small {
    display: inline-block;
    line-height: 1.6em;
  }

  li:first-of-type {
    margin-top: 0;
  }

  .gatsby-resp-image-link {
    box-shadow: none;
  }

  img,
  video {
    display: block;
    margin: 1.5em auto;
    max-width: 1040px;
    height: auto;
  }

  @media (max-width: 1040px) {
    img,
    video {
      width: 100%;
    }
  }

  img[src$='#full'] {
    max-width: none;
    width: 100vw;
  }

  img + br + small {
    display: block;
    margin-top: -3em;
    margin-bottom: 1.5em;
    text-align: center;
  }

  /* Override third party iframe styles */
  iframe {
    margin: 0 auto !important;
  }

  blockquote {
    margin: 0 0 1.5em;
    padding: 0 1.5em;
  }

  blockquote p {
    margin: 0 0 1em 0;
    font-style: italic;
  }

  blockquote p:last-child {
    margin-bottom: 0;
  }

  code {
    padding: 0 5px 2px;
    font-size: 0.8em;
    line-height: 1em;
    font-weight: 400 !important;
    border-radius: 3px;
  }

  p code {
    word-break: break-all;
  }

  pre {
    overflow-x: auto;
    padding: 20px;
    max-width: 100%;
    border: var(--darkgrey) 1px solid;
    color: var(--darkgrey);
    font-size: ${pxToRem(14)};
    line-height: 1.5em;
    border-radius: 5px;
  }

  pre code {
    padding: 0;
    font-size: inherit;
    line-height: inherit;
    background: transparent;
  }

  pre code :not(span) {
    color: #fff;
  }

  /* .fluid-width-video-wrapper { */
  .gatsby-resp-iframe-wrapper {
    margin: 1.5em 0 3em;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0.5em 0;
    font-weight: 700;
  }

  h1 {
    font-size: ${pxToRem(30)};
  }

  h2 {
    font-size: ${pxToRem(26)};
    color: var(--text-title-color);
  }

  h3 {
    font-size: ${pxToRem(20)};
    color: var(--text-subsubtitle-color);
  }

  h4 {
    font-size: ${pxToRem(18)};
    color: var(--text-sub3title-color);
  }

  h5 {
    font-size: ${pxToRem(16)};
    color: var(--text-sub4title-color);
  }

  h6 {
    font-size: ${pxToRem(14)};
    color: var(--text-sub5title-color);
  }

  /* Tables */
  table {
    display: inline-block;
    overflow-x: auto;
    margin: 0.5em 0 2.5em;
    max-width: 100%;
    width: auto;
    border-spacing: 0;
    border-collapse: collapse;
    font-size: ${pxToRem(16)};
    white-space: nowrap;
    vertical-align: top;
  }

  table {
    -webkit-overflow-scrolling: touch;
    background: radial-gradient(ellipse at left, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 75%) 0
        center,
      radial-gradient(ellipse at right, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 75%) 100% center;
    background-attachment: scroll, scroll;
    background-size: 10px 100%, 10px 100%;
    background-repeat: no-repeat;
  }

  table td:first-of-type {
    background-image: linear-gradient(
      to right,
      rgba(255, 255, 255, 1) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    background-size: 20px 100%;
    background-repeat: no-repeat;
  }

  table td:last-child {
    background-image: linear-gradient(
      to left,
      rgba(255, 255, 255, 1) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    background-position: 100% 0;
    background-size: 20px 100%;
    background-repeat: no-repeat;
  }

  table th {
    font-size: ${pxToRem(14)};
    font-weight: 700;
    letter-spacing: 0.2px;
    text-align: left;
    text-transform: uppercase;
  }

  table th,
  table td {
    padding: 6px 12px;
    /* border: color(var(--whitegrey) l(-1%) s(-5%)) 1px solid; */
  }

  @media (max-width: 500px) {
    padding: 0;
    :before {
      display: none;
    }
    :after {
      display: none;
    }
  }

  .gatsby-resp-image-image{
    border-radius: 5px;
  }
`;

const LangWrapper = styled.div`
  border: 2px solid var(--text-link-color);
  border-radius: 5px;
  padding: 1em;
  margin-bottom: .5em;
`;

// @ts-ignore
const renderAst = new RehypeReact({
  createElement: React.createElement,
  // components: { 'interactive-counter': Counter },
  components: {},
}).Compiler;

const Ast = ({ ast, ...props }: any) => {
  ast.properties = props;
  return renderAst(ast);
};

export interface PostContentProps {
  htmlAst: any;
  title: string;
  desc: string;
  slug: string;
  lang?: string;
  enready: boolean;
}

// @ts-ignore
const PostContent: React.FC<PostContentProps> = ({ htmlAst, title, desc, slug, lang, enready }) => {
  return (
    <PostFullContent className="post-full-content">
      {
        lang === 'id' && enready && (
          <LangWrapper>📌 Also available on <Link to={`/${slug}/en/`}>🇬🇧 English</Link></LangWrapper>
        )
      }
      {
        lang === 'en' && (
          <LangWrapper>📌 Baca dalam <Link to={`/${slug}/`}>🇮🇩 Bahasa Indonesia</Link></LangWrapper>
        )
      }
      {/* TODO: this will apply the class when rehype-react is published https://github.com/rhysd/rehype-react/pull/11 */}
      <Ast className="post-content" ast={htmlAst} />
      <LikeButton slug={slug}/>
      <SharePost title={title} desc={desc}/>
      <Helmet>
        <script src="https://utteranc.es/client.js"
          repo="mazipan/blog-comments"
          issue-term="pathname"
          label="comment"
          theme="preferred-color-scheme"
          crossorigin="anonymous"
          async>
        </script>
      </Helmet>
      {/* <HyvorTalk.Embed websiteId={600} id={`https://mazipan.space/${slug}`} url={`https://mazipan.space/${slug}`}/> */}
    </PostFullContent>
  );
};

export default PostContent;
