import typography from '@tailwindcss/typography';
import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

import type { Config } from 'tailwindcss';
import type { PluginUtils } from 'tailwindcss/types/config';

const config: Config = {
  content: ['src/**/*.{astro,md,mdx,tsx,ts}', 'astro.config.mjs'],
  // activates only dark: modifier, not color theme
  darkMode: ['selector'],
  plugins: [
    typography,
    plugin(({ addVariant }) => {
      addVariant('not-first', '&:not(:first-child)');
      addVariant('not-last', '&:not(:last-child)');
    }),
  ],
  theme: {
    tabSize: {
      1: '1',
      2: '2',
      4: '4',
      8: '8',
    },
    // must not use extend, will add xs to the end
    screens: {
      xs: '475px',
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        sans: ['Space Grotesk Variable', ...defaultTheme.fontFamily.sans],
        serif: ['Dela Gothic One', ...defaultTheme.fontFamily.serif],
        mono: ['JetBrains Mono Variable', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        // background
        'base-100': 'var(--th-base-100)',
        'base-200': 'var(--th-base-200)',
        'base-300': 'var(--th-base-300)',
        'base-code': 'var(--th-base-code)',
        // text
        content: 'var(--th-content)',
        headings: 'var(--th-headings)',
        captions: 'var(--th-captions)',
        links: {
          DEFAULT: 'var(--th-links)',
          hover: 'var(--th-links-hover)',
          visited: 'var(--th-links-visited)',
        },
        // brand
        primary: {
          DEFAULT: 'var(--th-primary)',
          '50': 'var(--th-primary-50)',
          '100': 'var(--th-primary-100)',
          '200': 'var(--th-primary-200)',
          hover: 'var(--th-primary-hover)',
          content: 'var(--th-primary-content)',
          'base-200': 'var(--th-primary-base-200)',
          'base-300': 'var(--th-primary-base-300)',
        },
        secondary: {
          DEFAULT: 'var(--th-secondary)',
          hover: 'var(--th-secondary-hover)',
          content: 'var(--th-secondary-content)',
        },
        accent: {
          DEFAULT: 'var(--th-accent)',
          hover: 'var(--th-accent-hover)',
          content: 'var(--th-accent-content)',
        },
      },
      borderRadius: {
        box: 'var(--th-rounded-box)',
        button: 'var(--th-rounded-button)',
        tag: 'var(--th-rounded-tag)',
      },
      typography: ({ theme }: PluginUtils) => ({
        DEFAULT: {
          css: {
            'code::before': { content: '""' },
            'code::after': { content: '""' },
          },
        },
        // nonsense
        'a-img': {
          css: {
            'a:hover img': {
              outline: `4px solid ${theme('colors.blue.500')}`,
            },
          },
        },
      }),
      animation: {
        blob: 'blob 7s infinite',
      },
      keyframes: {
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'tranlate(0px, 0px) scale(1)',
          },
        },
      },
    },
  },
};

export default config;
