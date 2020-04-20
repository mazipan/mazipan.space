import React, { FC, useEffect } from 'react';
import { css } from '@emotion/core';
import { trackClick } from '../utils/ga';
import config from'../website-config';

export interface LikeButtonProps {
  slug: string;
}

const likeBtnWrapper = css`
  margin-bottom: 1em;
  display: flex;
  align-items: center;

  > button {
    appearance: none;
    background: none;
    display: block;
    margin-right: 0.5em;
    padding: 9px 16px;
    color: var(--text-color);
    background-color: var(--text-link-color);
    font-size: 1.2rem;
    line-height: 1;
    font-weight: 500;
    border-radius: 20px;
    box-shadow: rgba(39, 44, 49, 0.06) 8px 14px 38px, rgba(39, 44, 49, 0.03) 1px 3px 8px;
    transition: all 0.5s ease;

    :hover {
      box-shadow: rgba(39, 44, 49, 0.07) 8px 28px 50px, rgba(39, 44, 49, 0.04) 1px 6px 12px;
      transition: all 0.4s ease;
      transform: translate3D(0, -1px, 0) scale(1.02);
    }
  }
`;

const LikeButton: FC<LikeButtonProps> = ({ slug }) => {
  useEffect(() => {
    // @ts-ignore
    const handleIntersection = (entries, observer) => {
      // @ts-ignore
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          // @ts-ignore
          if (process.env.GATSBY_API_LIKE_BUTTON) {
            // @ts-ignore
            const r = await fetch(`${process.env.GATSBY_API_LIKE_BUTTON}/likes/${slug}`);
            const data = r.json();
            console.log(data);
          }
          const target = document.querySelector('#like-btn');
          // @ts-ignore
          observer.unobserve(target);
        }
      })
    };

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    const target = document.querySelector('#like-btn');
    // @ts-ignore
    observer.observe(target);
  }, []);


  const trackPageClick = (link: string) => {
    trackClick({
      eventCategory: 'Click like button',
      eventLabel: `Like - ${link}`,
    });
  };

  return (
    <div css={likeBtnWrapper} id="like-btn-wrapper" data-api={config.apiLikeButton}>
      <button
        onClick={() => {
          trackPageClick(slug);
        }}
      >
        Click me if you like this article?
      </button>
      <span id="like-btn">100 likes 👍</span>
    </div>
  );
};

export default LikeButton;
