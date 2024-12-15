import { PAGE_METADATA } from './metadata';
import { ROUTES } from './routes';

export const BreadcrumbItemHome = {
  href: ROUTES.HOME,
  text: '🏠 Home',
};

export const BreadcrumbItemBlog = {
  href: ROUTES.BLOG,
  text: PAGE_METADATA['lists/blog'].title,
};

export const BreadcrumbItemExplore = {
  href: ROUTES.EXPLORE,
  text: PAGE_METADATA['lists/blog/explore'].title,
};

export const BreadcrumbItemProject = {
  href: ROUTES.PROJECTS,
  text: PAGE_METADATA['lists/projects'].title,
};
