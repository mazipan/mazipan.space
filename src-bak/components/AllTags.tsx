import React from 'react';
import { Link } from 'gatsby';
import { css } from '@emotion/core';

const TagsLabelWrapper = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  margin-bottom: 1.5em;
`;

const TagsLabel = css`
  padding: .5em;
`;

export interface AllTagProps {
  tags: TagEdges;
}

const AllTags: React.FC<AllTagProps> = ({ tags }) => {
  return (
    <div css={TagsLabelWrapper}>
      {tags.map(i => (<Link key={i.node.id} css={TagsLabel} to={`/tags/${i.node.id}/`}>{i.node.id}</Link>))}
    </div>
  );
};

export default AllTags;
