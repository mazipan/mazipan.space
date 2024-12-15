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
        className="fixed bottom-8 right-4 z-50 flex items-center justify-center gap-2 rounded-lg border-2 border-yellow-400 bg-base-100 p-3 font-mono text-sm lg:hidden"
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
            'fixed bottom-24 left-4 z-50 w-[80%] transform rounded-lg border border-base-200 shadow-lg transition-all duration-500 data-[show=false]:-translate-x-[110%] data-[show=true]:translate-x-0'
        )}
      >
        <div
          className={cn(
            'toc mx-auto overflow-y-auto rounded-lg border-2 border-dashed border-base-300 p-4',
            'max-h-[calc(70vh)] lg:sticky lg:top-20 lg:max-h-[calc(100vh-100px)]'
          )}
        >
          <b className="font-semibold">On This Page</b>
          <ol className={cn('ol-nested-decimal my-0 mt-2 space-y-1.5 text-sm')}>
            {headings.map(({ slug, text, headings: subHeadings }) => (
              <li className="my-0">
                <a
                  href={`#${slug}`}
                  className="font-normal no-underline"
                  onClick={() => {
                    if (!isLg) {
                      setShowContents(false);
                    }
                  }}
                >
                  {text}
                </a>

                {subHeadings.length > 0 && (
                  <ol className="-ml-[20px] mb-2 mt-0 space-y-1.5">
                    {subHeadings.map(({ slug, text }) => (
                      <li className="my-0">
                        <a
                          href={`#${slug}`}
                          className="font-normal no-underline"
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
