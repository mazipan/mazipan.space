import PropTypes from 'prop-types'
import { PrismAsync as SyntaxHighlighter } from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

function CodeBlock ({ language = null, value }) {
  const props = {
    language,
    style: a11yDark,
    showLineNumbers: true,
    wrapLongLines: false,
    wrapLines: false
  }
  return <SyntaxHighlighter {...props}>{value}</SyntaxHighlighter>
}

CodeBlock.propTypes = {
  value: PropTypes.string.isRequired,
  language: PropTypes.string
}

export default CodeBlock
