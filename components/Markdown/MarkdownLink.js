function MarkdownLink ({ href, children }) {
  const isExternal = href.indexOf('https://') >= 0

  if (isExternal) {
    return (<a href={href} target="_blank" rel="noopener noreferrer">{children}</a>)
  }

  return (<a href={href}>{children}</a>)
}

export default MarkdownLink
