import PropTypes from 'prop-types'
import Highlight, { defaultProps } from 'prism-react-renderer'
import rangeParser from 'parse-numeric-range'
import theme from 'prism-react-renderer/themes/nightOwl'

const calculateLinesToHighlight = (meta) => {
  const RE = /{([\d,-]+)}/
  if (RE.test(meta)) {
    const strlineNumbers = RE.exec(meta)[1]
    const lineNumbers = rangeParser(strlineNumbers)
    return (index) => (lineNumbers.includes(index + 1))
  } else {
    return () => false
  }
}

function CodeBlock ({ language = null, value, node }) {
  const shouldHighlightLine = calculateLinesToHighlight(node.meta)

  return (
    <Highlight {...defaultProps} theme={theme} code={value} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => {
            const lineProps = getLineProps({ line, key: i })
            if (shouldHighlightLine(i)) {
              lineProps.className = `${lineProps.className} highlight-line`
            }

            return (
              <div {...lineProps} key={i}>
                <span className="code-line">{i + 1}</span>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} key={key} />
                ))}
              </div>
            )
          }
          )}
        </pre>
      )}
    </Highlight>
  )
}

CodeBlock.propTypes = {
  value: PropTypes.string.isRequired,
  language: PropTypes.string
}

export default CodeBlock
