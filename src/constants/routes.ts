/**
 * Folders - all urls with both leading and trailing '/'.
 * Files - without trailing '/'.
 */
export const ROUTES = {
  HOME: '/',
  BLOG: '/blog',
  PROJECTS: '/projects',
  PROJECTS_TAGS: '/projects/tags',
  ABOUT: '/about',
  TALKS: '/talks',
  SUPPORT: '/support',
  GUEST_BOOK: '/guest-book',
  CREDITS: '/credits',
  FRIENDS: '/friends',
  RESUME: '/resume',
  TAGS: '/blog/tags',
  CATEGORIES: '/blog/categories',
  EXPLORE: '/blog/explore',
  EXPLORE_TAGS: '/blog/explore/tags',
  EXPLORE_CATEGORIES: '/blog/explore/categories',
  DESIGN: '/design',
  GALLERY: '/gallery',
  CAROUSEL: '/carousel',
  /** maybe in future */
  DRAFTS: '/drafts',
  _404: '/404',
  _500: '/500',
  STATIC: {
    IMAGES: '/images/',
    FAVICONS: '/favicon/',
    /** generated at build-time only */
    SITEMAP: '/sitemap-index.xml',
  },
  API: {
    OG_IMAGES: '/api/open-graph/',
    FEED_JSON: '/api/feed.json',
    FEED_RSS: '/api/feed.xml',
  },
  UMAMI_PUBLIC_URL: 'https://umami.mazipan.space/share/O3odIJMu00TRHGhb/www.mazipan.space',
  BOOKMARKS: 'https://bookmarks.mazipan.space/',
  TOOLS: 'https://tools.mazipan.space/',
  GAMES: 'https://games.mazipan.space/',
  GH_NEW_ISSUE: 'https://github.com/mazipan/mazipan.space/issues/new',
} as const;
