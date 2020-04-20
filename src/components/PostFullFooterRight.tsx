import { Link } from 'gatsby';
import * as _ from 'lodash';
import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { trackClick } from '../utils/ga';

import { colors } from '../styles/colors';

const PostFullFooterRightDiv = styled.div`
  flex-shrink: 0;
  margin-left: 20px;
`;

const AuthorCardButton = css`
  display: block;
  padding: 9px 16px;
  border: var(--text-color-grey) 1px solid;
  color: var(--text-color-grey);
  font-size: 1.2rem;
  line-height: 1;
  font-weight: 500;
  border-radius: 20px;
  transition: all ease 0.2s;

  :hover {
    border-color:var(--text-link-color);
    color: var(--text-link-color);
    text-decoration: none;
  }
`;

export interface PostFullFooterRightProps {
  authorId: string;
}

const handleClick = (linkName: string) => {
  trackClick({
    eventCategory: 'Click Full Footer Link',
    eventLabel: `Footer right - ${linkName}`
  })
}

const PostFullFooterRight: React.FC<PostFullFooterRightProps> = props => (
  <PostFullFooterRightDiv>
    <Link css={AuthorCardButton} to={`/author/${_.kebabCase(props.authorId)}/`} onClick={() => { handleClick('Read more') }}>
      Read More
    </Link>
  </PostFullFooterRightDiv>
);

export default PostFullFooterRight;
