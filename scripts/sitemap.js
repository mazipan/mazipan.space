const fs = require('fs');
const path = require('path');
const nanositemap = require('nanositemap');

const { getAllPosts, getAllTags } = require('../lib/api');
const { SITE_METADATA } = require('../lib/constants');

const sitemapObj = {};
getAllPosts(['date', 'slug'], 'id').forEach((post) => {
  sitemapObj[`/${post.slug}`] = {
    lastmod: new Date(post.date).toISOString(),
    priority: 0.7,
  };
});

getAllTags().forEach(tag => {
  sitemapObj[`/tag/${tag}`] = {
    lastmod: new Date().toISOString(),
    priority: 0.6,
  };
})

const sitemap = nanositemap(SITE_METADATA.url, {
  '/': { lastmod: new Date().toISOString(), priority: 0.8 },
  ...sitemapObj,
});

fs.writeFileSync(path.join('./.next/static', 'sitemap.xml'), sitemap);
