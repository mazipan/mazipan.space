const MarkdownIt = require('markdown-it')

const mdHeaderAnchor = require('markdown-it-anchor');
const mdHeaderSection = require('markdown-it-header-sections');

const kebabCase = require('lodash.kebabcase');

const shiki = require('shiki')

function range(start, end) {
  var ans = [];
  for (let i = start; i <= end; i++) {
    ans.push(i);
  }
  return ans;
}

async function parse(markdown) {
  const highlighter = await shiki.getHighlighter({
    theme: 'dracula'
  })

  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    // sample lineHightlight ==> {1,2,4-7,9-11}
    highlight: (code, lang, lineHightlight) => {
      let focusLines = [];

      if (lineHightlight) {
        const cleanLineString = lineHightlight.replace("{", "").replace("}", "");
        const lines = cleanLineString.split(",");
        lines.forEach(line => {
          const lineMultiple = line.split("-");
          if (lineMultiple.length > 1) {
            const lineRange = range(parseInt(lineMultiple[0], 10), parseInt(lineMultiple[1], 10));
            focusLines = focusLines.concat(lineRange);
          } else {
            focusLines.push(parseInt(lineMultiple[0], 10))
          }
        });
      }

      const html = highlighter.codeToHtml(code, {
        lang,
        theme: "dracula",
        lineOptions: focusLines.map(line => ({
          line,
          classes: ["line", "focused"]
        }))
      });

      return `${html}`.replace('class="shiki dracula"', `class="shiki dracula" data-lang="${lang}"`)
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
        <figure class="relative markdown-figure is-native-image">
          <img loading="lazy" src="${src}" alt="${alt}" class="markdown-image rounded-lg mx-auto" />
          <figcaption class="text-sm text-center mt-2">${alt}</figcaption>
        </figure>
      </div>`
    }

    const nextImage2x = `/_next/image?url=${encodeURIComponent(src)}&w=1200&q=75`
    const nextImage1x = `/_next/image?url=${encodeURIComponent(src)}&w=768&q=75`

    return `
    <div class="flex justify-center items-center">
      <figure class="relative markdown-figure is-next-image">
        <img loading="lazy" src="${nextImage2x}" alt="${alt}" srcSet="${nextImage1x} 1x, ${nextImage2x} 2x" class="markdown-image rounded-lg mx-auto" />
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

  md.use(mdHeaderAnchor, {
    // permalink: mdHeaderAnchor.permalink.headerLink(),
    slugify: s => kebabCase(s),
  })

  md.use(mdHeaderSection);

  return md.render(markdown)
}

exports.parse = parse
