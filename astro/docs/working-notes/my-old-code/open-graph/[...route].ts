import { OGImageRoute } from 'astro-og-canvas';

import { getPages } from '@/libs/api/open-graph-image';

const OG_FOLDER = './src/assets/images/open-graph/' as const;

const pages = await getPages();

// todo: combine with heroImage from frontmatter

export const { getStaticPaths, GET } = OGImageRoute({
  param: 'route',
  pages,
  getImageOptions: (_path, page) => {
    const { title, description, heroImage } = page;
    const logo = heroImage?.fsPath ?? `${OG_FOLDER}background.jpg`;

    return {
      title,
      _description: description,
      // dir: 'rtl',
      logo: {
        path: logo,
        size: [620, 350], // 16/9
      },
      bgGradient: [[0, 0, 0]],
      // border: {
      //   color: [0, 255, 0],
      //   width: 10,
      //   side: 'inline-start',
      // },
      _bgImage: {
        // 1200 x 630
        path: `${OG_FOLDER}background.jpg`,
        fit: 'cover',
      },
      padding: 60,
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
