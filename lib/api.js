const fs = require('fs')
const { join } = require('path')
const matter = require('gray-matter')
const { paginate } = require('./paginator')
const { parse } = require('./markdown-parser-markdownit')

const RELATED_POST_COUNT = 3
const postsDirectory = join(process.cwd(), '_posts')

function getPostSlugs () {
  return fs.readdirSync(postsDirectory)
}

function getPostSlugsEn () {
  const allDirs = fs.readdirSync(postsDirectory)
  const enDirs = []
  allDirs.forEach((dir) => {
    const pathEn = join(postsDirectory, dir, 'en/index.md')
    if (fs.existsSync(pathEn)) {
      enDirs.push(dir)
    }
  })

  return enDirs
}

function findPossibilityPost (slug) {
  const allSlugs = getPostSlugs()
  return allSlugs.find((item) => item.includes(slug))
}

async function getPostBySlug (slug, fields = [], lang = 'id') {
  const realSlug = slug.replace(/\.md$/, '')
  const possiblitySlug = findPossibilityPost(realSlug)

  const fullPath = join(
    postsDirectory,
    `${possiblitySlug}/${lang === 'id' ? 'index.md' : 'en/index.md'}`
  )
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  // eslint-disable-next-line no-unused-vars
  // const [year, month, date, ...slugArr] = realSlug.split('-')

  const items = {}
  items.fileLocation = fullPath.replace(postsDirectory, '')

  // Ensure only the minimal needed data is exposed
  for (const field of fields) {
    if (field === 'slug') {
      items[field] = realSlug
    }

    if (field === 'content') {
      items[field] = await parse(content)
    }

    if (data[field]) {
      items[field] = data[field]
    }
  }

  return items
}

async function getAllPosts (fields = [], lang = 'id') {
  const slugs = lang === 'id' ? getPostSlugs() : getPostSlugsEn()
  const posts = []
  for (const slug of slugs) {
    // eslint-disable-next-line no-unused-vars
    const [year, month, date, ...slugArr] = slug.split('-')
    const p = await getPostBySlug(slugArr.join('-'), fields, lang)
    const uniqueTags = [...new Set(p.tags)];

    posts.push({ ...p, tags: uniqueTags });
  }

  return posts.sort((post1, post2) => (post1.date > post2.date ? '-1' : '1'))
}

async function getPagedPost (fields = [], page = 1, lang = 'id') {
  const slugs = lang === 'id' ? getPostSlugs() : getPostSlugsEn()
  const postPaginate = paginate(slugs.reverse(), page)

  const posts = []
  for (const slug of postPaginate.slugs) {
    // eslint-disable-next-line no-unused-vars
    const [year, month, date, ...slugArr] = slug.split('-')
    const p = await getPostBySlug(slugArr.join('-'), fields, lang)
    const uniqueTags = [...new Set(p.tags)];

    posts.push({ ...p, tags: uniqueTags });
  }

  const sortedPost = posts.sort((post1, post2) => (post1.date > post2.date ? '-1' : '1'))

  return {
    ...postPaginate,
    data: sortedPost
  }
}

async function getFeaturedPost (fields = [], lang = 'id') {
  const posts = await getAllPosts(fields, lang)
  const postsFiltered = posts.filter((post) => Boolean(post.featured))

  return {
    data: postsFiltered || []
  }
}

async function getAvailablePage (lang = 'id') {
  const slugs = lang === 'id' ? getPostSlugs() : getPostSlugsEn()
  const { pages } = paginate(slugs, 1)
  return pages
}

async function getAllTags (lang = 'id') {
  const posts = await getAllPosts(['tags'], lang)
  const set = new Set()

  for (const post of posts) {
    if (post.tags) {
      post.tags.forEach((t) => {
        if (!set.has(t)) set.add(t)
      })
    }
  }

  return Array.from(set)
}

async function getPostsByTag (tag, lang = 'id') {
  const matchSlug = new Set()
  const matchPost = []
  const posts = await getAllPosts(
    ['title', 'date', 'slug', 'author', 'coverImage', 'excerpt', 'tags'],
    lang
  )

  for (const post of posts) {
    if (post.tags) {
      const isMatched = post.tags.find((t) => t.toLowerCase() === tag.toLowerCase())
      const isHaveSlug = matchSlug.has(post.slug)
      if (isMatched && !isHaveSlug) {
        matchPost.push(post)
      }
    }
  }

  return matchPost
}

async function getRelatedPost (tag, slug, lang = 'id') {
  const postsInTag = await getPostsByTag(tag, lang)
  let related = postsInTag.filter((post) => post.slug !== slug)

  if (related.length < RELATED_POST_COUNT) {
    const allPost = await getAllPosts(
      ['title', 'date', 'slug', 'author', 'coverImage', 'excerpt', 'tags'],
      lang
    )

    const posts = allPost.filter((post) => {
      const notThisSlug = post.slug !== slug
      const notContainInCurrent = !related.some((rel) => rel.slug === post.slug);
      return notThisSlug && notContainInCurrent
    })

    related = related.concat(posts)
  }

  return related.slice(0, RELATED_POST_COUNT)
}

function getPsiReportData () {
  const reportDir = join(process.cwd(), 'psi-reports')
  const files = fs
    .readdirSync(reportDir)
    .filter((file) => file !== 'LAST_UPDATED.txt' && file !== 'available-reports.json')
    .reverse()
  const allData = []

  files.forEach((file) => {
    const fileContent = fs.readFileSync(join(reportDir, file), 'utf8')
    const jsonData = JSON.parse(fileContent)
    const reports = jsonData.reports.map((r) => {
      return {
        ...r,
        perf: parseInt((r.perf * 100).toFixed(0), 10),
        size: parseInt((r.size / 1000).toFixed(0), 10)
      }
    })
    allData.push({
      ...jsonData,
      reports
    })
  })

  return allData
}

exports.getPostSlugs = getPostSlugs
exports.getPostSlugsEn = getPostSlugsEn
exports.getPostBySlug = getPostBySlug
exports.getAllPosts = getAllPosts
exports.getAllTags = getAllTags
exports.getPagedPost = getPagedPost
exports.getFeaturedPost = getFeaturedPost
exports.getAvailablePage = getAvailablePage
exports.getPostsByTag = getPostsByTag
exports.getRelatedPost = getRelatedPost
exports.getPsiReportData = getPsiReportData
