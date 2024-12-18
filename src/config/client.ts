import { SITE_URL, UMAMI_PUBLIC_URL, UMAMI_SCRIPT_URL, UMAMI_WEBSITE_ID } from 'astro:env/client';

import { configClientSchema } from '@/schemas/config';
import { validateData } from '@/utils/validation';

import type { ConfigClientType } from '@/types/config';

const configClientData: ConfigClientType = {
  /** all urls without '/' */
  SITE_URL,
  SITE_TITLE: 'Mazipan.Space',
  SITE_DESCRIPTION: 'A seasoned web developer from Indonesia with 10+ years of experience.',
  UMAMI_SCRIPT_URL,
  UMAMI_WEBSITE_ID,
  UMAMI_PUBLIC_URL,
  PAGE_SIZE_POST_CARD: 10,
  PAGE_SIZE_POST_CARD_SMALL: 20,
  MORE_POSTS_COUNT: 3,
  DEFAULT_MODE: 'dark',
  DEFAULT_THEME: 'default-dark',
  AUTHOR_NAME: 'Irfan Maulana',
  AUTHOR_EMAIL: 'mazipanneh@gmail.com',
  AUTHOR_GITHUB: 'https://dub.sh/mzp.gh',
  AUTHOR_LINKEDIN: 'https://dub.sh/mzp.in',
  AUTHOR_TWITTER: 'https://dub.sh/mzp.x',
  AUTHOR_YOUTUBE: 'https://dub.sh/mzp.yt',
  AUTHOR_DECK: 'https://dub.sh/mzp.deck',
  AUTHOR_ADPLIST: 'https://dub.sh/mzp.adp',
  REPO_URL: 'https://github.com/mazipan/mazipan.space',
};

export const CONFIG_CLIENT = validateData(configClientData, configClientSchema);
