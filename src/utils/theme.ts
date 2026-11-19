import { MODES, THEME_CONFIG, THEMES } from '@/constants/theme';
import { CONFIG_CLIENT } from '@/config/client';

import type { Mode, Theme } from '@/types/constants';

const { DEFAULT_THEME, DEFAULT_MODE } = CONFIG_CLIENT;
const { MODE_CLASS, DATA_ATTRIBUTE } = THEME_CONFIG;

export const getCurrentMode = () =>
  document.documentElement.classList.contains(MODE_CLASS) ? MODES.dark : MODES.light;

export const getCurrentTheme = () => {
  const themeName = document.documentElement.getAttribute(DATA_ATTRIBUTE);
  const isValidThemeName =
    Boolean(themeName) && THEMES.map((theme) => theme.name).includes(themeName as Theme['name']);

  if (!isValidThemeName) return null;

  const currentTheme = THEMES.find((theme) => theme.name === themeName) as Theme;
  return currentTheme;
};

export const getPaletteId = (themeName: string) => themeName.split('-')[0];

/** The theme of a palette in a mode, for example ('ocean', 'dark') -> ocean-dark. */
export const getThemeFor = (palette: string, mode: Mode) =>
  THEMES.find((theme) => theme.name === `${palette}-${mode}`);

/** Same palette, other mode: what the light/dark switch does. */
export const getNextTheme = () => {
  const currentTheme = getCurrentTheme();
  const nextMode = getCurrentMode() === MODES.dark ? MODES.light : MODES.dark;
  const palette = currentTheme ? getPaletteId(currentTheme.name) : 'default';

  return getThemeFor(palette, nextMode) ?? getDefaultThemes()[nextMode];
};

export const validateMode = (mode: Mode): void => {
  if (![MODES.light, MODES.dark].includes(mode)) throw new Error(`Invalid mode: ${mode}`);
};

export const validateTheme = (theme: Theme['name']): void => {
  if (!THEMES.map((theme) => theme.name).includes(theme))
    throw new Error(`Invalid theme: ${theme}`);
};

export const getDefaultThemes = () => {
  validateMode(DEFAULT_MODE);
  validateTheme(DEFAULT_THEME);

  const isDarkMode = DEFAULT_MODE === MODES.dark;

  const otherMode = isDarkMode ? MODES.light : MODES.dark;
  const otherTheme = DEFAULT_THEME.replace(DEFAULT_MODE, otherMode) as Theme['name'];

  validateMode(otherMode);
  validateTheme(otherTheme);

  const defaultThemes = isDarkMode
    ? {
        light: {
          mode: otherMode,
          name: otherTheme,
        },
        dark: {
          mode: DEFAULT_MODE,
          name: DEFAULT_THEME,
        },
      }
    : {
        light: {
          mode: DEFAULT_MODE,
          name: DEFAULT_THEME,
        },
        dark: {
          mode: otherMode,
          name: otherTheme,
        },
      };

  return defaultThemes;
};
