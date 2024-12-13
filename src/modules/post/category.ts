import { CATEGORIES } from '@/constants/collections';
import { ROUTES } from '@/constants/routes';

import type { CategoryType } from '@/types/constants';
import type { Filter, FilterLink, PostCollection } from '@/types/post';

export const getAllCategories = (posts: PostCollection[]): string[] =>
  posts.map((post) => post.data.category).filter(Boolean) as string[];

export const getUniqueCategories = (posts: PostCollection[]): string[] => {
  const uniqueCategories = [...new Set([...getAllCategories(posts)])];
  return uniqueCategories;
};

export const getSortedUniqueCategoriesWithCount = (posts: PostCollection[]): Filter[] => {
  const categories = getAllCategories(posts);
  if (!(categories.length > 0)) return [];

  const uniqueCategories = getUniqueCategories(posts);

  const categoriesWithCount = uniqueCategories.map((category) => {
    const count = categories.filter((item) => item === category).length;
    return { text: category, count };
  });

  const sortedCategoriesWithCount = categoriesWithCount.slice().sort((a, b) => b.count - a.count);
  return sortedCategoriesWithCount;
};

export const getCategoryLinks = (posts: PostCollection[], pathname?: string): FilterLink[] => {
  const filterItems = getSortedUniqueCategoriesWithCount(posts);

  const itemLinks = filterItems.map((item) => {
    const { text, count } = item;

    const originalHref = `${ROUTES.EXPLORE_CATEGORIES}${text}`;
    const textWithCount = `${text} ${count}`;

    const isActive = originalHref === pathname;
    const href = !isActive ? originalHref : ROUTES.EXPLORE;

    const link = { href, text, count, textWithCount, isActive };

    return link;
  });

  return itemLinks;
};

const defaultCategory = CATEGORIES[0];

/** set default to prevent breaking build */
export const getCategoryProps = (categoryName: string): CategoryType =>
  CATEGORIES.find((item) => item.name === categoryName) ?? defaultCategory;
