import { Link } from 'gatsby';
import * as _ from 'lodash';
import * as React from 'react';
import styled from '@emotion/styled';

import { AuthorProfileImage } from '../styles/shared';
import { trackEvent } from '../utils/ga';

const AuthorCardSection = styled.section`
  display: flex;
`;

const AuthorCardName = styled.h4`
  margin: 8px 0 2px 0;
  padding: 0;
  font-size: 2rem;

  a {
    color: var(--text-color);
    font-weight: 700;
  }

  a:hover {
    text-decoration: none;
  }
`;

const AuthorCardContent = styled.section`
  p {
    margin: 0;
    color: var(--text-color-grey);
    line-height: 1.3em;
  }
`;

export interface AuthorCardProps {
  author: any;
}

const AuthorCard: React.FC<AuthorCardProps> = ({ author }) => {
  const trackAuthorClick = (linkName: string) => {
    trackEvent({
      eventAction: 'click',
      eventCategory: 'Click Author Link',
      eventLabel: linkName
    })
  }

  return (
    <AuthorCardSection>
      <img css={AuthorProfileImage} src={author.avatar.children[0].fixed.src} alt={author.id} />
      <AuthorCardContent>
        <AuthorCardName>
          <Link to={`/author/${_.kebabCase(author.id)}/`} onClick={() => { trackAuthorClick('Author name') }}>{author.id}</Link>
        </AuthorCardName>
        {author.bio ? (
          <p>{author.bio}</p>
        ) : (
          <p>
            Read <Link to={`/author/${_.kebabCase(author.id)}/`}  onClick={() => { trackAuthorClick('More posts') }}>more posts</Link> by this author.
          </p>
        )}
      </AuthorCardContent>
    </AuthorCardSection>
  );
};

export default AuthorCard;
