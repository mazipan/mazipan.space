import ReactMarkdown from 'react-markdown';
import markdownStyles from './markdown-styles.module.css';

import CodeBlock from './CodeBlock';

export default function PostBody({ content }) {
  return (
    <div className="max-w-2xl mx-auto">
      <ReactMarkdown
        className={markdownStyles['markdown']}
        escapeHtml={false}
        source={content}
        renderers={{
          code: CodeBlock,
        }}
      />
    </div>
  );
}
