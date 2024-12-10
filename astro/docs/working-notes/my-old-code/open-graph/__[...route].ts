import { OGImageRoute } from 'astro-og-canvas';

import { getAllPosts } from '@/modules/post/common';
import { getAllProjects } from '@/modules/project';
import { ROUTES } from '@/constants/routes';

const OG_FOLDER = './src/assets/images/open-graph/' as const;

const allPosts = await getAllPosts();
const posts = allPosts.map((post) => ({ [`${ROUTES.BLOG}${post.slug}`]: post.data }));

const allProjects = await getAllProjects();
const projects = allProjects.map((project) => ({
  [`${ROUTES.PROJECTS}${project.slug}`]: project.data,
}));

export const { getStaticPaths, GET } = OGImageRoute({
  param: 'route',
  pages: { ...posts, ...projects },
  getImageOptions: (_path, page) => {
    return {
      title: page.title,
      description: page.description,
      logo: {
        path: `${OG_FOLDER}logo.jpg`,
      },
      bgImage: {
        path: `${OG_FOLDER}background.jpg`,
        fit: 'cover',
      },
      font: {
        title: {
          weight: 'Bold',
          size: 56,
          color: [96, 165, 250],
        },
        description: {
          weight: 'Medium',
          size: 32,
        },
      },
    };
  },
});
