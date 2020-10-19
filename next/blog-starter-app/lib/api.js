import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const postsDirectory = join(process.cwd(), '_posts');

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostSlugsEn() {
  const allDirs = fs.readdirSync(postsDirectory);
  const enDirs = [];
  allDirs.forEach((dir) => {
    const pathEn = join(postsDirectory, dir, 'en/index.md');
    if (fs.existsSync(pathEn)) {
      enDirs.push(dir);
    }
  });

  return enDirs;
}

export function getPostBySlug(slug, fields = [], lang = 'id') {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(
    postsDirectory,
    `${realSlug}/${lang === 'id' ? 'index.md' : 'en/index.md'}`,
  );
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(fields = [], lang = 'id') {
  const slugs = lang === 'id' ? getPostSlugs() : getPostSlugsEn();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields, lang))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? '-1' : '1'));
  return posts;
}
