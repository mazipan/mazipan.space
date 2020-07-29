import { Link } from 'gatsby';
import Img from 'gatsby-image';
import * as _ from 'lodash';
import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import pxToRem from '../styles/pxToRem';
import { colors } from '../styles/colors';
import { trackClick } from '../utils/ga';

const PostCardStyles = css`
  flex: 1 1 300px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin: 0 20px 40px;
  min-height: 300px;
  background: var(--bg-card) center center;
  background-size: cover;
  border-radius: 5px;
  box-shadow: rgba(39, 44, 49, 0.06) 8px 14px 38px, rgba(39, 44, 49, 0.03) 1px 3px 8px;
  transition: all 0.5s ease;

  :hover {
    box-shadow: rgba(39, 44, 49, 0.07) 8px 28px 50px, rgba(39, 44, 49, 0.04) 1px 6px 12px;
    transition: all 0.4s ease;
  }
`;

const PostCardImageLink = css`
  position: relative;
  display: block;
  overflow: hidden;
  border-radius: 5px 5px 0 0;
`;

const PostCardImage = styled.div`
  width: auto;
  height: 200px;
  background: ${colors.lightgrey} no-repeat center center;
  background-size: cover;
`;

const PostCardContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PostCardContentLink = css`
  position: relative;
  flex-grow: 1;
  display: block;
  padding: 25px 25px 0;
  color: var(--text-color);

  :hover {
    text-decoration: none;
  }
`;

const PostCardTitle = styled.h2`
  margin-top: 0;
  background: var(--bg-gradient-vertical);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  &::selection, &::-moz-selection {
    -webkit-text-fill-color: #fff !important;
    color: #fff;
  }
`;

const PostCardExcerpt = styled.section`
  font-family: 'Montserrat', sans-serif;
`;

const PostCardMeta = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 25px 25px;
`;

const PostCardTags = styled.span`
  background-color: var(--text-subtitle-color);
  font-size: ${pxToRem(10)};
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  border-radius: 4px;
  padding: .5em;
`;

const ReadingTime = styled.span`
  flex-shrink: 0;
  margin-left: 20px;
  color: var(--text-color-grey);
  font-size: ${pxToRem(10)};
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

export interface PostCardProps {
  post: PageContext;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const trackPostClick = (link: string) => {
    trackClick({
      eventCategory: 'Click Post Card Item',
      eventLabel: `Card Post - ${link} - ${post.frontmatter.title}`,
    });
  };

  return (
    <article
      className={`post-card ${post.frontmatter.image ? '' : 'no-image'}`}
      css={PostCardStyles}
    >
      {post.frontmatter.image && (
        <Link className="post-card-image-link" css={PostCardImageLink} to={post.fields.slug}
          onClick={() => {
            trackPostClick('Post image cover');
          }}
        >
          <PostCardImage className="post-card-image">
            {post.frontmatter.image &&
              post.frontmatter.image.childImageSharp &&
              post.frontmatter.image.childImageSharp.fluid && (
              <Img
                alt={`${post.frontmatter.title} cover image`}
                style={{ height: '100%' }}
                fluid={post.frontmatter.image.childImageSharp.fluid}
              />
            )}
          </PostCardImage>
        </Link>
      )}
      <PostCardContent className="post-card-content">
        <Link className="post-card-content-link" css={PostCardContentLink} to={post.fields.slug}
          onClick={() => {
            trackPostClick('Post excerpt text');
          }}
        >
          <header className="post-card-header">
            <PostCardTitle>{post.frontmatter.title}</PostCardTitle>
          </header>
          <PostCardExcerpt>
            <p>{post.excerpt}</p>
          </PostCardExcerpt>
        </Link>

        <PostCardMeta className="post-card-meta">
          {post.frontmatter.tags && <PostCardTags>{post.frontmatter.tags[0]}</PostCardTags>}
          <ReadingTime>{post.timeToRead} min read</ReadingTime>
        </PostCardMeta>
      </PostCardContent>
    </article>
  );
};

export default PostCard;
