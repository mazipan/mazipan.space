import { createSignal, onMount } from 'solid-js';

import type { Component } from 'solid-js';

export const BackToTop: Component = () => {
  let link: HTMLAnchorElement;
  let top: HTMLDivElement;
  let bottom: HTMLDivElement;

  const scrollHeight = document.documentElement.scrollHeight;
  const [height, setHeight] = createSignal<number>(Math.floor(window.innerHeight / 2));

  const intersect = new IntersectionObserver((entries) => {
    const atTopOrBottom = entries.every((entry) => !entry.isIntersecting);
    if (!atTopOrBottom) {
      link!.classList.remove(...fixedClasses);
      link!.classList.add(...hiddenClasses);
    } else {
      link!.classList.add(...fixedClasses);
      link!.classList.remove(...hiddenClasses);
    }
  });

  onMount(() => {
    intersect.observe(top);
    intersect.observe(bottom);
  });

  window.addEventListener('resize', () => {
    window.requestAnimationFrame(() => {
      const height = Math.floor(window.innerHeight / 2);
      setHeight(height);
    });
  });

  return (
    <>
      <div
        ref={top!}
        class="pointer-events-none absolute top-0"
        style={{ height: `${height()}px` }}
      />
      <div
        ref={bottom!}
        class="pointer-events-none absolute"
        style={{ height: `${height()}px`, top: `${scrollHeight - height()}px` }}
      />
      <a
        ref={link!}
        id="to-top"
        href="#top"
        class="fixed bottom-6 right-6 flex translate-y-full flex-col items-center rounded px-4 py-2 font-bold text-blue-600 shadow-md outline-none ring-4 ring-transparent backdrop-blur transition-all duration-200 hover:bg-blue-400 hover:text-blue-800 focus-visible:ring-4 focus-visible:ring-blue-500 active:shadow-inner active:ring-4 active:ring-blue-200/70 dark:bg-blue-900/50 dark:text-blue-100 dark:hover:bg-blue-600 dark:hover:text-blue-50 dark:focus-visible:ring-blue-500/50 dark:active:ring-blue-500/30"
        aria-label="Back to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="inline h-6 w-6 fill-current"
        >
          <path
            fill-rule="evenodd"
            d="M11.47 4.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 6.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5zm.53 7.59l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 12.31z"
            clip-rule="evenodd"
          />
        </svg>
        Top
      </a>
    </>
  );
};

const fixedClasses = 'opacity-1 translate-y-0'.split(' ');
const hiddenClasses = 'opacity-0 translate-y-full'.split(' ');
