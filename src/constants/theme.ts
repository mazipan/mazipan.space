export const MODES = {
  dark: 'dark',
  light: 'light',
  // add auto
} as const;

export const THEMES = [
  { mode: MODES.light, name: 'default-light' },
  { mode: MODES.dark, name: 'default-dark' },
  { mode: MODES.light, name: 'ocean-light' },
  { mode: MODES.dark, name: 'ocean-dark' },
  { mode: MODES.light, name: 'forest-light' },
  { mode: MODES.dark, name: 'forest-dark' },
  { mode: MODES.light, name: 'plum-light' },
  { mode: MODES.dark, name: 'plum-dark' },
] as const;

/** Palettes for the footer picker. `swatch` is only a preview dot, the name is always text. */
export const PALETTES = [
  { id: 'default', label: 'Warm paper', swatch: '#ae3f27' },
  { id: 'ocean', label: 'Ocean', swatch: '#1f5f8b' },
  { id: 'forest', label: 'Forest', swatch: '#2f6b3a' },
  { id: 'plum', label: 'Plum', swatch: '#7a3b8f' },
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
