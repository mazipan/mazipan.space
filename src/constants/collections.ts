import { DEFAULT_METADATA } from '@/constants/metadata';

import DefaultPostHeroImage from '@/assets/images/default/default-post-hero-image.png';
import DefaultProjectHeroImage from '@/assets/images/default/default-project-hero-image.png';

export const COLLECTIONS = {
  POST: 'post',
  PROJECT: 'project',
} as const;

export const TAGS = [
  'nextjs',
  'nuxtjs',
  'react',
  'vue',
  'astro',
  'svelte',
  'javascript',
  'typescript',
  'css',
  'web',
  'web-perf',
  'web-tools',
  'seo',
  'random',
  'thought',
  'testing',
  'community',
  'experience',
  'ci-cd',
  'open-source',
  'monorepo',
] as const;

/** adjust this later */
export const CATEGORIES = [
  // add color here
  // extract find function
  {
    name: 'tutorials',
    icon: 'tabler:align-box-right-top',
  },
  {
    name: 'tips-and-tricks',
    icon: 'tabler:bulb',
  },
  {
    name: 'showcases',
    icon: 'tabler:device-tv',
  },
  {
    name: 'tools',
    icon: 'tabler:settings-cog',
  },
  {
    name: 'resources',
    icon: 'tabler:book',
  },
  {
    name: 'experience',
    icon: 'tabler:award',
  },
] as const;

// use imported images here
export const DEFAULTS_POST = {
  TITLE: DEFAULT_METADATA.title,
  DESCRIPTION: DEFAULT_METADATA.description,
  NO_HERO: false,
  HERO_IMAGE: DefaultPostHeroImage,
  HERO_ALT: 'Hero image',
  DRAFT: false,
  CATEGORY: CATEGORIES[0].name,
  TOC: true,
} as const;

export const DEFAULTS_PROJECT = {
  TITLE: DEFAULT_METADATA.title,
  DESCRIPTION: DEFAULT_METADATA.description,
  NO_HERO: false,
  HERO_IMAGE: DefaultProjectHeroImage,
  HERO_ALT: 'Hero image',
  DRAFT: false,
  CATEGORY: CATEGORIES[0].name,
  TOC: true,
} as const;
