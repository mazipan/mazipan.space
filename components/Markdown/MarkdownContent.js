import React from 'react'

import Decoration from '@/components/Icons/Decoration'

export default function PostBody ({ content }) {
  return (
    <div className="markdown relative">
      <div
        dangerouslySetInnerHTML={{
          __html: `${content}`
        }}
      ></div>
      <Decoration className="absolute z-0 blur-[200px] right-0 z-0 dark:text-amber-500 text-amber-500/50" />
    </div>
  )
}
