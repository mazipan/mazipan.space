import type { CATEGORIES } from '@/constants/collections';
import type { PAGE_METADATA } from '@/constants/metadata';
import type { NAVIGATION_ITEMS } from '@/constants/navigation';
import type { MODES, THEMES } from '@/constants/theme';
import type { ValueUnion } from '@/types/utils';
import type { LocalImageProps } from 'astro:assets';

export type CategoryType = (typeof CATEGORIES)[number];

export type PageMetadataKey = keyof typeof PAGE_METADATA;

export type NavigationItem = (typeof NAVIGATION_ITEMS)[number];

export type Theme = (typeof THEMES)[number];

export type Mode = ValueUnion<typeof MODES>;

export type ImageSizes = {
  FIXED: Record<string, Pick<LocalImageProps, 'width' | 'height'>>;
  RESPONSIVE: Record<string, Pick<LocalImageProps, 'widths' | 'sizes'>>;
};

export type ChangeThemeCustomEvent = CustomEvent<{ theme: Theme }>;
