import { Link } from 'gatsby';
import * as React from 'react';
import { css } from '@emotion/core';
import { trackEvent } from '../utils/ga';

export interface PaginationProps {
  currentPage: number;
  numPages: number;
}

const navCss = css`
  text-align: center;
  div {
    display: inline-block;
  }

  a {
    background: var(--bg-card);
    color: var(--text-color);
    float: left;
    padding: 8px 16px;
    text-decoration: none;
    transition: all 0.4s ease;
    transform: translate3D(0,-1px,0) scale(1.02);
    margin: 0 4px;
    box-shadow: rgba(39,44,49,0.06) 8px 14px 38px, rgba(39,44,49,0.03) 1px 3px 8px;
    border-radius: 6px;
    margin-bottom: 5px;
    min-width: 50px;

    &.active {
      -webkit-box-shadow:inset 3px 0px 0px 0px var(--text-link-color);
      -moz-box-shadow:inset 3px 0px 0px 0px var(--text-link-color);
      box-shadow:inset 3px 0px 0px 0px var(--text-link-color);
    }
  }
`;

const Pagination: React.FunctionComponent<PaginationProps> = ({ currentPage, numPages }) => {
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = currentPage - 1 === 1 ? '/' : (currentPage - 1).toString();
  const nextPage = (currentPage + 1).toString();

  const trackPageClick = (link: string) => {
    trackEvent({
      eventAction: 'click',
      eventCategory: 'Click Pagination',
      eventLabel: link
    })
  }

  return (
    <nav css={navCss}>
      <div>
        {!isFirst && (
          <Link to={prevPage} rel="prev" onClick={()=> { trackPageClick('Prev') }}>
            {/* << symbol */}
            {String.fromCharCode(171)}
          </Link>
        )}

        {Array.from({ length: numPages }, (_, i) => (
          <Link
            key={`pagination-number${i + 1}`}
            className={i + 1 === currentPage ? 'active' : ''}
            to={`/${i === 0 ? '' : i + 1}`}
            onClick={()=> { trackPageClick(`Page ${i + 1}`) }}>
            {i + 1}
          </Link>
        ))}

        {!isLast && (
          <Link to={nextPage} rel="next" onClick={()=> { trackPageClick('Next') }}>
            {/* >> symbol */}
            {String.fromCharCode(187)}
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Pagination;
