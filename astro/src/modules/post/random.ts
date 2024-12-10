import { CONFIG_CLIENT } from '@/config/client';
import { randomizeArray } from '@/utils/objects';

import type { Post } from '@/types/post';

const { MORE_POSTS_COUNT } = CONFIG_CLIENT;

export interface RandomPostsArgs {
  posts: Post[];
  count?: number;
  excludeSlug?: string;
}

/** Must handle empty array. */
export const getRandomPosts = ({
  posts,
  count = MORE_POSTS_COUNT,
  excludeSlug,
}: RandomPostsArgs): Post[] => {
  if (!(posts.length > 0)) return [];

  const filteredPosts = posts.filter((post) => post.slug !== excludeSlug);

  if (!(filteredPosts.length > 0)) return [];

  const randomizedPosts = randomizeArray(filteredPosts);

  if (randomizedPosts.length < count) return randomizedPosts;

  return randomizedPosts.slice(0, count);
};
