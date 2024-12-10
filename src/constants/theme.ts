export const MODES = {
  dark: 'dark',
  light: 'light',
  // add auto
} as const;

export const THEMES = [
  {
    mode: MODES.light,
    name: 'default-light',
  },
  {
    mode: MODES.dark,
    name: 'default-dark',
  },
  {
    mode: MODES.light,
    name: 'green-light',
  },
  {
    mode: MODES.dark,
    name: 'green-dark',
  },
] as const;

// for debugging
export const DEFAULT_THEMES = {
  light: THEMES[0],
  dark: THEMES[1],
};

export const THEME_CONFIG = {
  MODE_CLASS: 'dark',
  DATA_ATTRIBUTE: 'data-theme',
  CHANGE_EVENT: 'theme-change',
  LOCAL_STORAGE_KEY: 'theme',
} as const;
