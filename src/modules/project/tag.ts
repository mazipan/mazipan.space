import { ROUTES } from '@/constants/routes';

import type { Filter, FilterLink } from '@/types/post';
import type { Project } from '@/types/project';

export const getAllTags = (projects: Project[]): string[] =>
  projects.flatMap((p) => [...p.data.tags]);

export const getUniqueTags = (projects: Project[]): string[] => [...new Set(getAllTags(projects))];

export const getSortedUniqueTagsWithCount = (projects: Project[]): Filter[] => {
  const tags = getAllTags(projects);
  if (!tags.length) return [];

  const withCount = tags.reduce(
    (acc, tag) => {
      const index = acc.findIndex((item) => item.text === tag);
      if (index === -1) return [...acc, { text: tag, count: 1 }];
      acc[index].count++;
      return acc;
    },
    <Filter[]>[]
  );

  return withCount.sort((a, b) => b.count - a.count);
};

export const getTagLinks = (projects: Project[], pathname?: string): FilterLink[] =>
  getSortedUniqueTagsWithCount(projects).map(({ text, count }) => {
    const originalHref = `${ROUTES.PROJECTS_TAGS}/${text}`;
    const isActive = originalHref === pathname;
    const href = !isActive ? originalHref : ROUTES.PROJECTS;

    return { href, text, count, textWithCount: `#${text} (${count})`, isActive };
  });
