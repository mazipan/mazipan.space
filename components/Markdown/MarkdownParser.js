import React from 'react'
import ReactMarkdown from 'react-markdown'
import markdownStyles from './markdown-styles.module.css'

import CodeBlock from './CodeBlock'
import MarkdownLink from './MarkdownLink'
import MarkdownImage from './MarkdownImage'

export default function PostBody ({ content }) {
  return (
    <div className="markdown">
      <ReactMarkdown
        className={markdownStyles.markdown}
        escapeHtml={false}
        source={content}
        renderers={{
          code: CodeBlock,
          link: MarkdownLink,
          image: MarkdownImage
        }}
      />
    </div>
  )
}
