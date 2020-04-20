import React, { FC, useEffect } from 'react';
import { css } from '@emotion/core';
import { trackClick } from '../utils/ga';

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
          try {
            // @ts-ignore
            const r = await fetch(`${process.env.API_LIKE_BUTTON}/like${slug}`);
            const data = r.json();
            // @ts-ignore
            if (data && data.data) {
              // @ts-ignore
              document.querySelector('#like-count').innerHTML = data.data;
            } else {
              // @ts-ignore
              document.querySelector('#like-count').innerHTML = '1';
            }
            const target = document.querySelector('#like-btn');
            // @ts-ignore
            observer.unobserve(target);
          } catch (error) {
            console.error(error);
          }
        }
      });
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
    <div
      css={likeBtnWrapper}
      id="like-btn-wrapper"
      data-endpoint={`${process.env.API_LIKE_BUTTON}`}
    >
      <button
        id="like-btn"
        onClick={() => {
          trackPageClick(slug);
        }}
      >
        Click me if you like this article?
      </button>
      <span>
        <span id="like-count"></span> likes 👍
      </span>
    </div>
  );
};

export default LikeButton;
