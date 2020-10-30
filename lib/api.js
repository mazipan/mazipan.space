const fs = require('fs')
const { join } = require('path')
const matter = require('gray-matter')

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
  return allSlugs.find(item => item.includes(slug))
}

function getPostBySlug (slug, fields = [], lang = 'id') {
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

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (data[field]) {
      items[field] = data[field]
    }
  })

  return items
}

function getAllPosts (fields = [], lang = 'id') {
  const slugs = lang === 'id' ? getPostSlugs() : getPostSlugsEn()
  const posts = slugs
    .map((slug) => {
      // eslint-disable-next-line no-unused-vars
      const [year, month, date, ...slugArr] = slug.split('-')
      return getPostBySlug(slugArr.join('-'), fields, lang)
    })
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? '-1' : '1'))
  return posts
}

function getAllTags (lang = 'id') {
  const posts = getAllPosts(['tags'], lang)
  const set = new Set()

  posts.forEach((post) => {
    if (post.tags) {
      post.tags.forEach((t) => {
        set.add(t)
      })
    }
  })

  return Array.from(set)
}

function getPostsByTag (tag, lang = 'id') {
  const matchSlug = new Set()
  const matchPost = []
  const posts = getAllPosts(
    ['title', 'date', 'slug', 'author', 'coverImage', 'excerpt', 'tags'],
    lang
  )

  posts.forEach((post) => {
    if (post.tags) {
      const isMatched = post.tags.find((t) => t.toLowerCase() === tag.toLowerCase())
      const isHaveSlug = matchSlug.has(post.slug)
      if (isMatched && !isHaveSlug) {
        matchPost.push(post)
      }
    }
  })

  return matchPost
}

exports.getPostSlugs = getPostSlugs
exports.getPostSlugsEn = getPostSlugsEn
exports.getPostBySlug = getPostBySlug
exports.getAllPosts = getAllPosts
exports.getAllTags = getAllTags
exports.getPostsByTag = getPostsByTag
