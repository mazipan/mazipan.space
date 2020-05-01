import React, { useEffect, FunctionComponent } from 'react';
import { css } from '@emotion/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { trackClick } from '../utils/ga';

export interface LikeButtonProps {
  slug: string;
}

const likeBtnWrapper = css`
  margin-top: 1em;
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
    border-radius: 4px;
    box-shadow: rgba(39, 44, 49, 0.06) 8px 14px 38px, rgba(39, 44, 49, 0.03) 1px 3px 8px;
    transition: all 0.5s ease;

    :hover {
      box-shadow: rgba(39, 44, 49, 0.07) 8px 28px 50px, rgba(39, 44, 49, 0.04) 1px 6px 12px;
      transition: all 0.4s ease;
      transform: translate3D(0, -1px, 0) scale(1.02);
    }
  }
`;

const LikeButton: FunctionComponent<LikeButtonProps> = ({ slug }) => {
  const baseUrl = `${process.env.API_LIKE_BUTTON}`;

  useEffect(() => {
    // @ts-ignore
    const handleIntersection = (entries, observer) => {
      // @ts-ignore
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          try {
            // @ts-ignore
            const r = await fetch(`${baseUrl}/like${slug.slice(0, -1)}/get`);
            const data = await r.json();
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
            // @ts-ignore
            document.querySelector('#like-count').innerHTML = '1';
            console.error('> Error get like data', error);
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

  const trackPageClick = async (link: string) => {
    trackClick({
      eventCategory: 'Click like button',
      eventLabel: `Like - ${link}`,
    });

    try {
      const r = await fetch(`${baseUrl}/like/${slug.slice(0, -1).substring(1)}/update`, {
        method: 'POST',
      });
      await r.json();
      toast('🙏 Thank you for your support!', {
        type: toast.TYPE.SUCCESS,
        position: toast.POSITION.BOTTOM_LEFT
      });
    } catch (error) {
      toast('😭 Sorry, some error happen!', {
        type: toast.TYPE.ERROR,
        position: toast.POSITION.BOTTOM_LEFT
      });
      console.error('> Error update like data', error);
    }
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
        Click me if you like this article
      </button>
      <span>
        <span id="like-count">✨</span> likes 👍
      </span>
      <ToastContainer autoClose={5000} />
    </div>
  );
};

// @ts-ignore
export default LikeButton;
