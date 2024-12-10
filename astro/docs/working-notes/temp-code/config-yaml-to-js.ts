export const config = {
  site: {
    name: 'nemanjamiticcom',
    site: 'https://nemanjamiticcom.vercel.app',
    base: '/',
    trailingSlash: false,
    googleSiteVerificationId: 'orcPxI47GSa-cRvY11tUe6iGg2IO_RPvnA1q95iEM3M',
  },
  metadata: {
    title: {
      default: 'nemanjamiticcom',
      template: '%s — nemanjamiticcom',
    },
    description:
      '🚀 Suitable for Startups, Small Business, Sass Websites, Professional Portfolios, Marketing Websites, Landing Pages & Blogs.',
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      site_name: 'nemanjamiticcom',
      images: [
        {
          url: '~/assets/images/default.png',
          width: 1200,
          height: 628,
        },
      ],
      type: 'website',
    },
    twitter: {
      handle: '@onwidget',
      site: '@onwidget',
      cardType: 'summary_large_image',
    },
  },
  i18n: {
    language: 'en',
    textDirection: 'ltr',
  },
  apps: {
    blog: {
      isEnabled: true,
      postsPerPage: 6,
      post: {
        isEnabled: true,
        permalink: '/%slug%',
        robots: {
          index: true,
        },
      },
      list: {
        isEnabled: true,
        pathname: 'blog',
        robots: {
          index: true,
        },
      },
      category: {
        isEnabled: true,
        pathname: 'category',
        robots: {
          index: true,
        },
      },
      tag: {
        isEnabled: true,
        pathname: 'tag',
        robots: {
          index: false,
        },
      },
    },
  },
  analytics: {
    vendors: {
      googleAnalytics: {
        id: null,
      },
    },
  },
  ui: {
    theme: 'system',
    tokens: {
      default: {
        fonts: {
          sans: 'InterVariable',
          serif: 'var(--ph-font-sans)',
          heading: 'var(--ph-font-sans)',
        },
        colors: {
          default: 'rgb(16 16 16)',
          heading: 'rgb(0 0 0)',
          muted: 'rgb(40 40 40)',
          bgPage: 'rgb(255 255 255)',
          primary: 'rgb(0 124 220)',
          secondary: 'rgb(30 58 138)',
          accent: 'rgb(109 40 217)',
          info: 'rgb(119 182 234)',
          success: 'rgb(54 211 153)',
          warning: 'rgb(251 189 35)',
          error: 'rgb(248 114 114)',
          link: 'var(--ph-color-primary)',
          linkActive: 'var(--ph-color-link)',
        },
      },
      dark: {
        fonts: {},
        colors: {
          default: 'rgb(247, 248, 248)',
          heading: 'rgb(247, 248, 248)',
          muted: 'rgb(200, 188, 208)',
          bgPage: 'rgb(3 6 32)',
          primary: 'rgb(29 78 216)',
          secondary: 'rgb(30 58 138)',
          accent: 'rgb(135 77 2267)',
          info: 'rgb(58 191 248)',
          success: 'rgb(54 211 153)',
          warning: 'rgb(251 189 35)',
          error: 'rgb(248 114 114)',
          link: 'var(--ph-color-primary)',
          linkActive: 'var(--ph-color-link)',
        },
      },
    },
  },
};
