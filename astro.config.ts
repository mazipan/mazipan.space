import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';

import rehypeCodeGroup from 'rehype-code-group';

// must use relative imports, and their entire import subtrees
import { remarkReadingTime } from './plugins/remark-reading-time.mjs';
//
// all relative imports in subtree
// any of these files must not import CONFIG with env vars
import { envSchema, PROCESS_ENV } from './src/config/process-env';
import { expressiveCodeIntegration } from './src/libs/integrations/expressive-code';
import { sitemapIntegration } from './src/libs/integrations/sitemap';

const { SITE_URL } = PROCESS_ENV;
const remarkPlugins = [remarkReadingTime];

export default defineConfig({
  site: SITE_URL,
  env: envSchema,
  experimental: {
    // https://docs.astro.build/en/reference/experimental-flags/responsive-images/
    responsiveImages: true,
    // https://docs.astro.build/en/reference/experimental-flags/svg/
    svg: true,
    // https://docs.astro.build/en/reference/experimental-flags/content-intellisense/
    contentIntellisense: true,
  },
  trailingSlash: 'ignore',
  // default
  compressHTML: true,
  server: { port: 3000 },
  devToolbar: { enabled: false },
  integrations: [
    expressiveCodeIntegration(),
    sitemapIntegration(),
    react(),
    mdx(),
    // applyBaseStyles: false prevents double loading of tailwind
    tailwind({ applyBaseStyles: false }),
    icon({ iconDir: 'src/assets/icons' }),
    partytown({
      config: { forward: ['dataLayer.push'] },
    }),
  ],
  markdown: {
    remarkPlugins,
    rehypePlugins: [
      // ...
      rehypeCodeGroup,
    ],
  },
  vite: {
    build: {
      sourcemap: false,
    },
  },
});
