import { getEntryLastDate } from '@/modules/common';

import type { Post, PostsByYear } from '@/types/post';

export const groupPostsByYear = (sortedPosts: Post[]): PostsByYear => {
  const postsByYear: PostsByYear = {
    years: [],
    posts: {},
  };

  const groupedPosts = sortedPosts.reduce((result, post) => {
    const postDate = getEntryLastDate(post);
    const year = postDate.getFullYear().toString();

    if (!result.posts[year]) {
      result.years.push(year);
      result.posts[year] = [];
    }

    result.posts[year].push(post);

    return result;
  }, postsByYear);

  return groupedPosts;
};
