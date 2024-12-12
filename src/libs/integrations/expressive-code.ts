import expressiveCode from 'astro-expressive-code';

import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';
import { pluginColorChips } from 'expressive-code-color-chips';

import { pluginLanguageBadge } from './expressive-lang-badge';

export const expressiveCodeIntegration = () =>
  expressiveCode({
    themes: ['light-plus', 'night-owl'],
    useDarkModeMediaQuery: true,
    themeCssRoot: ':root',
    themeCssSelector: (theme) => {
      let themeSelector: string;

      switch (theme.type) {
        case 'light':
          // matches mode selector THEME_CONFIG.MODE_CLASS in src/constants/themes.ts
          themeSelector = '[class=""]';
          break;
        case 'dark':
          themeSelector = '[class="dark"]';
          break;

        default:
          themeSelector = '[class=""]';
          break;
      }

      return themeSelector;
    },
    tabWidth: 2,
    styleOverrides: {
      codeFontSize: 'var(--expressive-code-font-size)',
      codeLineHeight: '1.4',
      frames: {
        frameBoxShadowCssValue: 'none',
      },
    },
    plugins: [
      pluginCollapsibleSections(),
      pluginLineNumbers(),
      pluginColorChips(),
      pluginLanguageBadge(),
    ],
    defaultProps: {
      frame: 'code',
      showLineNumbers: true,
      overridesByLang: {
        'bash,shell,md,markdown': {
          showLineNumbers: false,
        },
      },
    },
  });
