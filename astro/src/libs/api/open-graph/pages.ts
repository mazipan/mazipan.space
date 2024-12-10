import { getAllPosts } from '@/modules/post/common';
import { getAllProjects } from '@/modules/project';
import { DEFAULT_METADATA, OG_IMAGE_PREFIXES, PAGE_METADATA } from '@/constants/metadata';

export const getPages = async () => {
  /*-------------------------------- list pages ------------------------------*/

  const { image: _, ...defaultTitleAndDescription } = DEFAULT_METADATA;

  // add defaults for empty values
  const listPages = Object.fromEntries(
    Object.entries(PAGE_METADATA).map(([path, metadata]) => {
      return [
        // 'lists/blog'
        path,
        { ...defaultTitleAndDescription, ...metadata },
      ];
    })
  );

  /*-------------------------------- pages/page.mdx ------------------------------*/

  // only path, title and description are important
  const mdxPagesObject = import.meta.glob('/src/pages/**/*.{md,mdx}', { eager: true });
  const mdxPages = Object.fromEntries(
    Object.entries(mdxPagesObject).map(([path, page]) => {
      // '/src/pages/about.mdx' -> 'pages/about'
      let pagePath = path.replace(/^\/src\/|\.mdx?$/g, '');
      // fix index.mdx pages here
      // pages/index.mdx -> pages.png
      // pages/design/index.mdx -> pages/design.png
      pagePath = pagePath.replace(/\/index$/g, '');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return [pagePath, (page as any).frontmatter];
    })
  );

  /*-------------------------------- collections ------------------------------*/

  // ! 1. must be object, not array of objects
  // ! 2. must not start with '/' blog/slug <- correct, /blog/slug <- incorrect
  const allPosts = await getAllPosts();
  const posts = Object.fromEntries(
    allPosts.map((post) => [`${OG_IMAGE_PREFIXES.OG_BLOG}/${post.slug}`, post.data])
  );

  const allProjects = await getAllProjects();
  const projects = Object.fromEntries(
    allProjects.map((project) => [`${OG_IMAGE_PREFIXES.OG_PROJECTS}/${project.slug}`, project.data])
  );

  const pages = { ...posts, ...projects, ...mdxPages, ...listPages };

  return pages;
};
