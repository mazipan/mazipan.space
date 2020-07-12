
import styled from '@emotion/styled';
import { css } from '@emotion/core';

export const PostTemplate = css`
  .site-main {
    background: var(--bg-content);
    padding-bottom: 4vw;
  }

  .gatsby-resp-image-figcaption{
    width: 100%;
    text-align: center;
    display: block;
    font-size: 1.5rem;
    font-style: italic;
    margin-top: 2.5em;
  }
`;

export const PostFull = css`
  position: relative;
  z-index: 50;
`;

export const NoImage = css`
  .post-full-content {
    padding-top: 0;
  }

  .post-full-content:before,
  .post-full-content:after {
    display: none;
  }
`;

export const PostFullHeader = styled.header`
  margin: 0 auto;
  padding: 6vw 3vw 3vw;
  max-width: 1040px;
  text-align: center;

  @media (max-width: 500px) {
    padding: 14vw 3vw 10vw;
  }
`;

export const PostFullMeta = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--text-link-color);
  font-size: 1.4rem;
  font-weight: 600;
  text-transform: uppercase;

  @media (max-width: 500px) {
    font-size: 1.2rem;
    line-height: 1.3em;
  }
`;

export const PostFullTitle = styled.h1`
  margin: 0;
  background: var(--bg-gradient-vertical);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  &::selection, &::-moz-selection {
    -webkit-text-fill-color: #fff !important;
    color: #fff;
  }

  @media (max-width: 500px) {
    font-size: 2.9rem;
  }
`;

export const DateDivider = styled.span`
  display: inline-block;
  margin: 0 6px 1px;
`;

export const ReadNextFeed = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -20px;
  padding: 40px 0 0 0;
`;
