import { ROUTES } from '@/constants/routes';

import type { Filter, FilterLink, PostCollection } from '@/types/post';

export const getAllTags = (posts: PostCollection[]): string[] => {
  const tags = posts.flatMap((post) => [...post.data.tags]);
  return tags;
};

export const getUniqueTags = (posts: PostCollection[]): string[] => {
  const uniqueTags = [...new Set([...getAllTags(posts)])];
  return uniqueTags;
};

export const getTagLinks = (posts: PostCollection[], pathname?: string): FilterLink[] => {
  const filterItems = getSortedUniqueTagsWithCount(posts);

  const itemLinks = filterItems.map((item) => {
    const { text, count } = item;

    const originalHref = `${ROUTES.EXPLORE_TAGS}${text}`;
    const textWithCount = `#${text} ${count}`;

    // unused, wont display in category and tag list
    const isActive = originalHref === pathname;
    const href = !isActive ? originalHref : ROUTES.EXPLORE;

    const link = { href, text, count, textWithCount, isActive };

    return link;
  });

  return itemLinks;
};

export const getSortedUniqueTagsWithCount = (posts: PostCollection[]): Filter[] => {
  // must have duplicated tags here to calc count
  const tags = getAllTags(posts);

  if (!(tags.length > 0)) return [];

  const tagsWithCount = tags.reduce(
    (acc, tag) => {
      const index = acc.findIndex((item) => item.text === tag);
      if (index === -1) return [...acc, { text: tag, count: 1 }];

      acc[index].count++;
      return acc;
    },
    <Filter[]>[]
  );

  const sortedTagsWithCount = tagsWithCount.slice().sort((a, b) => b.count - a.count);
  return sortedTagsWithCount;
};
