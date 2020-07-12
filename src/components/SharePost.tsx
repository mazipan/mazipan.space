import React, { FC } from 'react';
import { trackOutbond } from '../utils/ga';

interface SharePostProps {
  title: string;
  desc: string;
}

const SharePost: FC<SharePostProps> = ({ title, desc }) => {

  const url = typeof window !== 'undefined' ? window.location.href : '';
  const encodedTitle = encodeURIComponent(title);
  const encodedDesc = encodeURIComponent(desc);
  const encodedUrl = encodeURIComponent(url);
  const linkShareFb = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&title=${encodedTitle}&description=${encodedDesc}`;
  const linkShareTw = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}&via=maz_ipan`;

  const handleClick = (link: string) => {
    trackOutbond(`${link.toLowerCase()}://${url}`, `Share to ${link}`);
  }

  return (
    <div>
      <span style={{ marginRight: '.25em' }}>🤝 Bagikan ke</span>
      <a
        target="_blank"
        rel="noopener"
        onClick={() => { handleClick('Facebook') }}
        href={linkShareFb}
      >
        Facebook
      </a>
      {' ․ '}
      <a
        target="_blank"
        rel="noopener"
        onClick={() => { handleClick('Twitter') }}
        href={linkShareTw}
      >
        Twitter
      </a>
    </div>
  );
};

export default SharePost;
