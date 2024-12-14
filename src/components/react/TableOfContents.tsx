import { useState } from 'react';

import { useMediaQuery } from 'usehooks-ts';

import { cn } from '@/utils/styles';

import type { PropsWithChildren } from 'react';

export interface Heading {
  text: string;
  slug: string;
  headings: Heading[];
}

const TableOfContents = ({
  headings,
  className = '',
  children,
}: PropsWithChildren<{
  headings: Heading[];
  className?: string;
}>) => {
  const isLg = useMediaQuery('(min-width: 1024px)');
  const [showContents, setShowContents] = useState(isLg ? true : false);

  return (
    <>
      <div
        className="fixed bottom-8 right-4 z-50 flex p-3 items-center justify-center text-sm font-mono border-2 rounded-lg lg:hidden border-yellow-400 bg-base-100 gap-2"
        onClick={() => {
          setShowContents((prev) => !prev);
        }}
      >
        {children}
      </div>

      <aside
        data-show={showContents}
        className={cn(
          'my-prose centered-px bg-base-100',
          className,
          !isLg &&
            'fixed bottom-24 left-4 w-[80%] z-50 rounded-lg transition-all duration-500 transform shadow-lg border border-base-200 data-[show=true]:translate-x-0 data-[show=false]:-translate-x-[110%]'
        )}
      >
        <div
          className={cn(
            'toc rounded-lg border-2 border-base-300 border-dashed p-4 mx-auto overflow-y-auto',
            'max-h-[calc(70vh)] lg:sticky lg:top-14 lg:max-h-[calc(100vh-80px)]'
          )}
        >
          <b className="font-semibold">On This Page</b>
          <ol className={cn('ol-nested-decimal my-0 mt-2 text-sm space-y-1.5')}>
            {headings.map(({ slug, text, headings: subHeadings }) => (
              <li className="my-0">
                <a
                  href={`#${slug}`}
                  className="no-underline font-normal"
                  onClick={() => {
                    if (!isLg) {
                      setShowContents(false);
                    }
                  }}
                >
                  {text}
                </a>

                {subHeadings.length > 0 && (
                  <ol className="mt-0 mb-2 -ml-[20px] space-y-1.5">
                    {subHeadings.map(({ slug, text }) => (
                      <li className="my-0">
                        <a
                          href={`#${slug}`}
                          className="no-underline font-normal"
                          onClick={() => {
                            if (!isLg) {
                              setShowContents(false);
                            }
                          }}
                        >
                          {text}
                        </a>
                      </li>
                    ))}
                  </ol>
                )}
              </li>
            ))}
          </ol>
        </div>
      </aside>
    </>
  );
};

export default TableOfContents;
