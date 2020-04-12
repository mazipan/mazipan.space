import { Link } from 'gatsby';
import * as _ from 'lodash';
import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { lighten } from 'polished';

import { trackEvent } from '../utils/ga';

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
    border-color: ${colors.blue};
    color: ${colors.blue};
    text-decoration: none;
  }
`;

export interface PostFullFooterRightProps {
  authorId: string;
}

const trackClick = (linkName: string) => {
  trackEvent({
    eventAction: 'click',
    eventCategory: 'Click Full Footer Link',
    eventLabel: linkName
  })
}

const PostFullFooterRight: React.FC<PostFullFooterRightProps> = props => (
  <PostFullFooterRightDiv>
    <Link css={AuthorCardButton} to={`/author/${_.kebabCase(props.authorId)}/`} onClick={() => { trackClick('Read more') }}>
      Read More
    </Link>
  </PostFullFooterRightDiv>
);

export default PostFullFooterRight;
