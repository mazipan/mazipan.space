import { NAVIGATION_ITEMS } from '@/constants/navigation';
import { ROUTES } from '@/constants/routes';

import type { NavigationItem } from '@/types/constants';

export const getActiveNavItemPath = (routePathname: string): NavigationItem['path'] | undefined => {
  let activeNavItem: NavigationItem | undefined = undefined;

  // don't highlight home route

  switch (true) {
    case routePathname === ROUTES.BLOG:
      activeNavItem = getNavItem(ROUTES.BLOG);
      break;
    case routePathname === ROUTES.ABOUT:
      activeNavItem = getNavItem(ROUTES.ABOUT);
      break;
    case routePathname === ROUTES.GALLERY:
      activeNavItem = getNavItem(ROUTES.GALLERY);
      break;
    // unused
    case routePathname.startsWith(ROUTES.PROJECTS):
      activeNavItem = getNavItem(ROUTES.PROJECTS);
      break;
    case routePathname.startsWith(ROUTES.TAGS):
    case routePathname.startsWith(ROUTES.CATEGORIES):
    case routePathname.startsWith(ROUTES.EXPLORE):
      activeNavItem = getNavItem(ROUTES.EXPLORE);
      break;
    case !routePathname.startsWith(ROUTES.TAGS) &&
      !routePathname.startsWith(ROUTES.CATEGORIES) &&
      !routePathname.startsWith(ROUTES.EXPLORE) &&
      routePathname.startsWith(ROUTES.BLOG):
      activeNavItem = getNavItem(ROUTES.BLOG);
      break;

    default:
      activeNavItem = undefined;
      break;
  }

  const activeNavItemPath = activeNavItem?.path;

  return activeNavItemPath;
};

export const getNavItem = (path: string): NavigationItem | undefined =>
  NAVIGATION_ITEMS.find((navItem) => navItem.path === path);
