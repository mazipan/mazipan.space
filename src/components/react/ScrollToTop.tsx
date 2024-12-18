import React, { useEffect, useRef, useState } from 'react';

import { SELECTORS } from '@/constants/dom';
import { cn } from '@/utils/styles';

import type { MouseEvent, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const { SCROLL_TO_TOP_SELECTOR } = SELECTORS;

const fixedClasses = ['opacity-1', 'translate-y-0'];
const hiddenClasses = ['opacity-0', 'translate-y-20'];

const showLink = (linkRef: React.RefObject<HTMLAnchorElement>): void => {
  linkRef.current?.classList.add(...fixedClasses);
  linkRef.current?.classList.remove(...hiddenClasses);
};

const hideLink = (linkRef: React.RefObject<HTMLAnchorElement>): void => {
  linkRef.current?.classList.remove(...fixedClasses);
  linkRef.current?.classList.add(...hiddenClasses);
};

const getHalfViewportHeight = (window: Window) => Math.floor(window.innerHeight / 2);

const ScrollToTop: React.FC<Props> = ({ children }) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const [height, setHeight] = useState(getHalfViewportHeight(window));

  useEffect(() => {
    // ! track them both independently at same time
    // ! important: must be in this scope, outside of callback()
    let isAtTop = false;
    let isAtBottom = false;

    const callback: IntersectionObserverCallback = (entries) => {
      // entries.length === 1 || 2, count changes when exits viewport
      entries.forEach((entry) => {
        if (entry.target === topRef.current) {
          isAtTop = entry.isIntersecting;
        }

        if (entry.target === bottomRef.current) {
          isAtBottom = entry.isIntersecting;
        }
      });

      if (linkRef.current) {
        if (isAtTop || isAtBottom) hideLink(linkRef);
        else showLink(linkRef);
      }
    };

    const intersect = new IntersectionObserver(callback, { threshold: 0 });

    if (topRef.current) intersect.observe(topRef.current);
    if (bottomRef.current) intersect.observe(bottomRef.current);

    return () => {
      intersect.disconnect();
    };
  }, []);

  // on resize only, vertical...?
  useEffect(() => {
    const handleResize = () => {
      window.requestAnimationFrame(() => setHeight(getHalfViewportHeight(window)));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleScrollToTop = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  };

  return (
    <>
      <div
        ref={topRef}
        className="pointer-events-none absolute top-0 w-0"
        style={{ height: `${height}px` }}
      />
      {/* mounted in <body /> in Base layout */}
      <div
        ref={bottomRef}
        className="pointer-events-none absolute bottom-0 w-0"
        style={{ height: `${height}px` }}
      />
      <a
        ref={linkRef}
        id="to-top"
        href={SCROLL_TO_TOP_SELECTOR}
        onClick={handleScrollToTop}
        className={cn(
          // default styles
          'fixed bottom-24 right-6 z-10 rounded-full border-2 border-yellow-400 bg-base-100 p-2',
          // initial state
          hiddenClasses,
          // transition classes
          'transition-all duration-300'
        )}
        aria-label="Scroll to top"
      >
        {/* astro-icon must be passed as slot */}
        {children}
      </a>
    </>
  );
};

export default ScrollToTop;
