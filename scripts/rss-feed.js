const fs = require('fs')
const path = require('path')
const Feed = require('feed').Feed

const { getAllPosts } = require('../lib/api')
const { getAllTils } = require('../lib/tils')
const { SITE_METADATA } = require('../lib/constants')

async function main () {
  const feed = new Feed({
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    link: SITE_METADATA.url,
    id: SITE_METADATA.url,
    language: 'id',
    image: `${SITE_METADATA.url}/favicon/favicon-192x192.png`,
    favicon: `${SITE_METADATA.url}/favicon/favicon-32x32.png`,
    copyright: 'All rights reserved 2020, @mazipan',
    updated: new Date(),
    feedLinks: {
      json: `${SITE_METADATA.url}/feed.json`,
      atom: `${SITE_METADATA.url}/feed.xml`
    },
    author: {
      name: SITE_METADATA.author.name,
      link: SITE_METADATA.url,
      avatar: `${SITE_METADATA.author.avatar}`
    }
  })

  const posts = await getAllPosts(
    ['title', 'date', 'slug', 'author', 'coverImage', 'excerpt'],
    'id'
  )


  for (const post of posts) {
    feed.addItem({
      id: `${SITE_METADATA.url}/${post.slug}`,
      url: `${SITE_METADATA.url}/${post.slug}`,
      title: post.title,
      description: `${post.excerpt} - ${SITE_METADATA.url}${post.slug}`,
      content: post.excerpt,
      image: `${SITE_METADATA.url}${post.coverImage}`,
      date: new Date(post.date),
      author: SITE_METADATA.author.name
    })
  }

  const tils = await getAllTils()
  for (const til of tils) {
    feed.addItem({
      id: `${SITE_METADATA.url}/til/${til.slug}`,
      url: `${SITE_METADATA.url}/til/${til.slug}`,
      title: til.title,
      content: til.excerpt,
      date: new Date(til.date),
      author: SITE_METADATA.author.name
    })
  }

  fs.writeFileSync(path.join('./public', 'feed.json'), feed.json1())
  fs.writeFileSync(path.join('./public', 'rss.xml'), feed.rss2())
  fs.writeFileSync(path.join('./public', 'feed.xml'), feed.atom1())
}

main()
