const SITE_NAME = process.env.GATSBY_SITE_NAME || '@mazipan';
const SITE_VERIFICATION = process.env.GATSBY_SITE_VERIFICATION || '';
const FULL_DOMAIN = process.env.GATSBY_FULL_DOMAIN || 'https://mazipan.space';
const API_LIKE_BUTTON = process.env.GATSBY_API_LIKE_BUTTON || '';

export interface WebsiteConfig {
  title: string;
  description: string;
  logo: string;
  lang: string;
  siteUrl: string;
  facebook?: string;
  twitter?: string;
  github?: string;
  linkedin?: string;
  googleSiteVerification?: string;
  footer?: string;
  apiLikeButton?: string;
}

const config: WebsiteConfig = {
  title: SITE_NAME,
  description: 'A personal blog by mazipan',
  logo: 'images/logo.png',
  lang: 'id',
  siteUrl: FULL_DOMAIN,
  facebook: 'https://www.facebook.com/mazipanneh',
  twitter: 'https://twitter.com/maz_ipan',
  github: 'https://github.com/mazipan',
  linkedin: 'https://www.linkedin.com/in/mazipan',
  googleSiteVerification: SITE_VERIFICATION,
  footer: 'All rights reserved',
  apiLikeButton: API_LIKE_BUTTON,
};

export default config;
