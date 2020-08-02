import React, { FC } from 'react';
import styled from '@emotion/styled';
import ChevronUpIcon from './icons/chevron-up';
import { trackClick } from '../utils/ga';

const BackToTopWrapper = styled.div`
  position: fixed;
  z-index: 101;
  bottom: 20px;
  right: 10px;
`;

const BackToTopIcon = styled.a`
  height: 43px;
  width: 43px;
  border-radius: 0.5em;
  box-shadow: rgba(39, 44, 49, 0.06) 8px 14px 38px, rgba(39, 44, 49, 0.03) 1px 3px 8px;
  background-color: var(--bg-card);
  color: var(--text-sub3title-color);
  border: 2px solid var(--text-sub3title-color);
  cursor: pointer;
  cursor: pointer;
  outline: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BackToTop: FC = () => {
  const handleGoToTop = () => {
    trackClick({
      eventCategory: 'Click Back to top',
      eventLabel: '',
    });
  };

  return (
    <BackToTopWrapper>
      <BackToTopIcon aria-label="back to top" href="#site-main" onClick={handleGoToTop}>
        <ChevronUpIcon />
      </BackToTopIcon>
    </BackToTopWrapper>
  );
};

export default BackToTop;
