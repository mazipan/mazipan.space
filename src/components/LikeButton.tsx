import React, { useState, FunctionComponent, useCallback } from 'react';
import { css } from '@emotion/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import useIntersect from '../hooks/useIntersect.js';
import { trackClick } from '../utils/ga';

export interface LikeButtonProps {
  slug: string;
}

const likeBtnWrapper = css`
  margin-top: 1em;
  margin-bottom: 1em;
  display: flex;
  align-items: center;

  > .support {
    margin-right: 1em;
  }

  > button, a {
    appearance: none;
    background: none;
    display: block;
    margin-right: 0.5em;
    padding: 9px 16px;
    background-image: var(--bg-gradient);
    background-size: 200% auto;
    text-transform: uppercase;
    color: var(--text-color);
    font-size: 1.2rem;
    line-height: 1;
    border-radius: 20px;
    transition: all 0.5s;

    :hover {
      background-position: right center;
      color: var(--text-color);
    }
  }
`;

const LikeButton: FunctionComponent<LikeButtonProps> = ({ slug }) => {
  const [likeCount, setLikeCount] = useState(0);
  const baseUrl = `${process.env.API_LIKE_BUTTON}`;

  const onIntersect = useCallback(async () => {
    try {
      // @ts-ignore
      const r = await fetch(`${baseUrl}/like${slug.slice(0, -1)}/get`);
      const data = await r.json();
      // @ts-ignore
      if (data?.data) {
        setLikeCount(data?.data);
      } else {
        setLikeCount(0);
      }
    } catch (error) {
      // @ts-ignore
      setLikeCount(0);
      console.error('> Error get like data', error);
    }
  }, [baseUrl, slug]);

  const targetRef = useIntersect(onIntersect, null, true);

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
        position: toast.POSITION.BOTTOM_LEFT,
      });
    } catch (error) {
      toast('😭 Sorry, some error happen!', {
        type: toast.TYPE.ERROR,
        position: toast.POSITION.BOTTOM_LEFT,
      });
      console.error('> Error update like data', error);
    }
  };

  const trackSupportClick = (type: string) => {
    trackClick({
      eventCategory: 'Click support button',
      eventLabel: `Support - ${type}`,
    });
  };

  return (
    <div css={likeBtnWrapper} data-endpoint={`${process.env.API_LIKE_BUTTON}`}>
      <span className="support">💪 Support me</span>
      <button
        ref={targetRef}
        type="button"
        onClick={() => {
          trackPageClick(slug);
        }}
      >
        👍 {likeCount} Likes
      </button>
      <a
        href="https://trakteer.id/mazipan?utm_source=blog"
        target="_blank"
        title="Trakteer"
        rel="noopener noreferrer"
        type="button"
        onClick={() => {
          trackSupportClick('Trakteer');
        }}
      >
        Via Trakteer
      </a>
      <a
        href="https://www.buymeacoffee.com/mazipan?utm_source=blog"
        target="_blank"
        title="BuyMeaCoffe"
        rel="noopener noreferrer"
        onClick={() => {
          trackSupportClick('BuyMeaCoffe');
        }}
      >
        Via BuyMeaCoffe
      </a>
      <a
        href="https://www.paypal.me/mazipan?utm_source=blog"
        target="_blank"
        title="PayPal"
        rel="noopener noreferrer"
        onClick={() => {
          trackSupportClick('PayPal');
        }}
      >
        Via PayPal
      </a>
      <ToastContainer autoClose={5000} />
    </div>
  );
};

// @ts-ignore
export default LikeButton;
