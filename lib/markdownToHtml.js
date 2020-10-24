const remark = require('remark')
const html = require('remark-html')

export default async function markdownToHtml (markdown) {
  const result = await remark().use(html).process(markdown)
  return result.toString()
}
