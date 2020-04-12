const SITE_NAME = process.env.SITE_NAME || '@mazipan';
const SITE_VERIFICATION = process.env.SITE_VERIFICATION || '';
const FULL_DOMAIN = process.env.FULL_DOMAIN || 'https://mazipan.space';

export interface WebsiteConfig {
  title: string;
  description: string;
  coverImage: string;
  logo: string;
  lang: string;
  siteUrl: string;
  facebook?: string;
  twitter?: string;
  github?: string;
  linkedin?: string;
  googleSiteVerification?: string;
  footer?: string;
}

const config: WebsiteConfig = {
  title: SITE_NAME,
  description: 'A personal blog by mazipan',
  coverImage: 'images/blog-cover.jpg',
  logo: 'images/logo.png',
  lang: 'id',
  siteUrl: FULL_DOMAIN,
  facebook: 'https://www.facebook.com/mazipanneh',
  twitter: 'https://twitter.com/maz_ipan',
  github: 'https://github.com/mazipan',
  linkedin: 'https://www.linkedin.com/in/mazipan',
  googleSiteVerification: SITE_VERIFICATION,
  footer: 'All rights reserved',
};

export default config;
