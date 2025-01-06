import { CONFIG_CLIENT } from '@/config/client';

import type { Metadata } from '@/types/common';
import type { ValueUnion } from '@/types/utils';

// can't import getDefaultOpenGraphImagePath here, circular dependency

const { SITE_URL, SITE_DESCRIPTION, SITE_TITLE } = CONFIG_CLIENT;

// todo: make default og image with png logo

/** Must be url from public folder. */
export const defaultOgImage = `${SITE_URL}/images/meta.png`;

export const titleSeparator = '-';

export const DEFAULT_METADATA: Required<Metadata> = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  image: defaultOgImage,
} as const;

/**
 * Metadata for all pages that aren't defined in markdown.
 * Add it here for every new page.
 * Reused for ogImage api route.
 */
export const PAGE_METADATA = {
  // list pages
  // must have 'list' prefix to omit type arg
  'lists/blog': {
    title: '📚 Blog',
  },
  'lists/blog/tags': {
    title: '🎟️ Tags',
  },
  'lists/blog/tags/tag': {
    title: '🎟️ Tag',
  },
  'lists/blog/explore': {
    title: '🧗 Explore',
  },
  'lists/blog/categories': {
    title: '🧩 Categories',
  },
  'lists/blog/categories/category': {
    title: '🧩 Category',
  },
  'lists/projects': {
    title: '🖥️ Projects',
  },
  'pages/talks': {
    title: '🎙️ Talks',
    description: '',
    path: '/talks',
  },
  'pages/guest-book': {
    title: '📝 Guest Book',
    description: '',
    path: '/guest-book',
  },
  'pages/about': {
    title: 'About',
    description: '',
    path: '/about',
  },
  'pages/credits': {
    title: '❤️ Credits',
    description: '',
    path: '/credits',
  },
  'pages/support': {
    title: '💪 Support',
    description: '',
    path: '/support',
  },
  'pages/friends': {
    title: '🤝 Friends',
    description: '',
    path: '/friends',
  },
} as const;

export type PageMetadataKey = keyof typeof PAGE_METADATA;

export const OG_IMAGE_PREFIXES = {
  OG_BLOG: 'blog',
  OG_PROJECTS: 'projects',
  OG_PAGES: 'pages',
  OG_LISTS: 'lists',
} as const;

export type OgImagePrefixType = ValueUnion<typeof OG_IMAGE_PREFIXES>;
