import React from 'react'
import markdownStyles from './markdown-shiki-styles.module.css'

export default function PostBody ({ content }) {
  return (
    <div className="markdown">
      <div
        className={markdownStyles.markdown}
        dangerouslySetInnerHTML={{
          __html: `${content}`
        }}
      ></div>
    </div>
  )
}
