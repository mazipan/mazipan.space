const SITE_NAME = process.env.SITE_NAME || '@mazipan';
const SITE_VERIFICATION = process.env.SITE_VERIFICATION || '';
const FULL_DOMAIN = process.env.FULL_DOMAIN || 'https://www.mazipan.xyz';

export interface WebsiteConfig {
  title: string;
  description: string;
  coverImage: string;
  logo: string;
  /**
   * Specifying a valid BCP 47 language helps screen readers announce text properly.
   * See: https://dequeuniversity.com/rules/axe/2.2/valid-lang
   */
  lang: string;
  /**
   * blog full path, no ending slash!
   */
  siteUrl: string;
  /**
   * full url, no username
   */
  facebook?: string;
  /**
   * full url, no username
   */
  twitter?: string;
  /**
   * full url, no username
   */
  github?: string;
  /**
   * full url, no username
   */
  linkedin?: string;
  /**
   * hide or show all email subscribe boxes
   */
  showSubscribe: boolean;
  /**
   * create a list on mailchimp and then create an embeddable signup form. this is the form action
   */
  mailchimpAction?: string;
  /**
   * this is the hidden input field name
   */
  mailchimpName?: string;
  /**
   * name and id of the mailchimp email field
   */
  mailchimpEmailFieldName?: string;
  /**
  /**
   * Meta tag for Google Webmaster Tools
   */
  googleSiteVerification?: string;
  /**
  /**
   * Appears alongside the footer, after the credits
   */
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
  showSubscribe: false,
  mailchimpAction: 'https://twitter.us19.list-manage.com/subscribe/post?u=a89b6987ac248c81b0b7f3a0f&amp;id=7d777b7d75',
  mailchimpName: 'b_a89b6987ac248c81b0b7f3a0f_7d777b7d75',
  mailchimpEmailFieldName: 'MERGE0',
  googleSiteVerification: SITE_VERIFICATION,
  footer: 'All rights reserved',
};

export default config;
