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
        <span> Table of contents </span>
      </div>

      <aside
        className={cn(
          'my-prose centered-px',
          className,
          isLg ? 'sticky top-14' : 'absolute p-10 left-10'
        )}
      >
        <div
          className={cn(
            'toc rounded-lg border-2 border-base-300 border-dashed p-4 mx-auto overflow-y-auto max-h-[calc(100vh-80px)]',
            showContents ? '' : 'hidden'
          )}
        >
          <ol className={cn('ol-nested-decimal my-0')}>
            {headings.map(({ slug, text, headings: subHeadings }) => (
              <li className="my-0">
                <a href={`#${slug}`} className="no-underline">
                  {text}
                </a>

                {subHeadings.length > 0 && (
                  <ol className="mt-0 mb-2">
                    {subHeadings.map(({ slug, text }) => (
                      <li className="my-0">
                        <a href={`#${slug}`} className="no-underline">
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
