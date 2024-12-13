const fs = require('fs')
const { join } = require('path')
const matter = require('gray-matter')
const { paginate } = require('./paginator')
const { parse } = require('./markdown-parser-markdownit')

const TILS_DIR = join(process.cwd(), '_tils')

function getAllDirs () {
  return fs.readdirSync(TILS_DIR)
}

function findSlug (slug) {
  const all = getAllDirs()
  return all.find((item) => item.includes(slug))
}

async function getTilBySlug (slug) {
  const realSlug = slug.replace(/\.md$/, '')
  const validSlug = findSlug(realSlug)

  const fullPath = join(TILS_DIR, validSlug, 'index.md')
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  // eslint-disable-next-line no-unused-vars
  // const [year, month, date, ...slugArr] = realSlug.split('-')

  const items = {
    slug: realSlug,
    excerpt: data.excerpt,
    tags: data.tags,
    date: data.date,
    title: data.title,
    content: await parse(content)
  }

  return items
}

async function getAllTils () {
  const allDirs = getAllDirs()
  const posts = []
  for (const dir of allDirs) {
    // eslint-disable-next-line no-unused-vars
    const [year, month, date, ...slugArr] = dir.split('-')
    const p = await getTilBySlug(slugArr.join('-'))
    posts.push(p)
  }

  return posts.sort((post1, post2) => (post1.date > post2.date ? '-1' : '1'))
}

async function getPagedTils (page = 1) {
  const allDirs = getAllDirs()
  const tilsPaginate = paginate(allDirs.reverse(), page)

  const posts = []
  for (const slug of tilsPaginate.slugs) {
    // eslint-disable-next-line no-unused-vars
    const [year, month, date, ...slugArr] = slug.split('-')
    const p = await getTilBySlug(slugArr.join('-'))
    posts.push(p)
  }

  const sortedPost = posts.sort((post1, post2) => (post1.date > post2.date ? '-1' : '1'))

  return {
    ...tilsPaginate,
    data: sortedPost
  }
}

async function getAvailableTilPage () {
  const allDirs = getAllDirs()
  const { pages } = paginate(allDirs, 1)
  return pages
}

exports.getAvailableTilPage = getAvailableTilPage
exports.getPagedTils = getPagedTils
exports.getAllTils = getAllTils
exports.getTilBySlug = getTilBySlug
exports.findSlug = findSlug
exports.getAllDirs = getAllDirs
