const MarkdownIt = require('markdown-it')
const shiki = require('shiki')

async function parse(markdown) {
  const highlighter = await shiki.getHighlighter({
    theme: 'dracula'
  })

  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: (code, lang) => {
      return `${highlighter.codeToHtml(code, lang)}`
        .replace('class="shiki"', `class="shiki" data-lang="${lang}"`)
    }
  })

  md.renderer.rules.image = function (tokens, idx) {
    const token = tokens[idx]
    const srcIndex = token.attrIndex('src')
    const src = token.attrs[srcIndex][1]
    const alt = token.content

    if (src.includes('https://')) {
      return `
      <div class="flex justify-center items-center">
        <figure class="relative">
          <img loading="lazy" src="${src}" alt="${alt}" class="rounded-lg mx-auto" />
          <figcaption class="text-sm text-center mt-2">${alt}</figcaption>
        </figure>
      </div>`
    }

    const nextImage2x = `/_next/image?url=${encodeURIComponent(src)}&w=1200&q=75`
    const nextImage1x = `/_next/image?url=${encodeURIComponent(src)}&w=768&q=75`

    return `
    <div class="flex justify-center items-center">
      <figure class="relative">
        <img loading="lazy" src="${nextImage2x}" alt="${alt}" srcSet="${nextImage1x} 1x, ${nextImage2x} 2x" class="rounded-lg mx-auto" />
        <figcaption class="text-sm text-center mt-2">${alt}</figcaption>
      </figure>
    </div>`
  }

  const defaultLinkRenderer =
    md.renderer.rules.link_open ||
    function (tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options)
    }

  md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    const token = tokens[idx]
    const targetIndex = token.attrIndex('target')
    const hrefIndex = token.attrIndex('href')
    const href = token.attrs[hrefIndex][1]

    if (href.indexOf('https://') >= 0) {
      if (targetIndex < 0) {
        tokens[idx].attrPush(['target', '_blank']) // add new attribute
      } else {
        tokens[idx].attrs[targetIndex][1] = '_blank' // replace value of existing attr
      }
    }

    // pass token to default renderer.
    return defaultLinkRenderer(tokens, idx, options, env, self)
  }

  md.linkify.set({ fuzzyEmail: false })

  return md.render(markdown)
}

exports.parse = parse
