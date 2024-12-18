import { ROUTES } from '@/constants/routes';

import type { FilterParams } from '@/types/post';

/*-------------------------------- utils ------------------------------*/

export const removeLeadingSlash = (path: string) => path.replace(/^\/+/g, '');

export const removeTrailingSlash = (path: string) => path.replace(/\/+$/g, '');

export const removeLeadingAndTrailingSlashes = (path: string) => path.replace(/^\/+|\/+$/g, '');

/*----------------------------- for Explore filter ---------------------------*/

export const getPathnameFromFilterParams = (filterParams: FilterParams): string | undefined => {
  const { filterType, filterSlug } = filterParams;

  if (!(filterType && ['tags', 'categories'].includes(filterType) && filterSlug)) return undefined;

  const pathSegment = filterType === 'tags' ? ROUTES.EXPLORE_TAGS : ROUTES.EXPLORE_CATEGORIES;
  const pathname = `${pathSegment}/${filterSlug}`;

  return pathname;
};
