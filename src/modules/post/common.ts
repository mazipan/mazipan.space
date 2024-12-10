import { getAllEntries } from '@/modules/common';
import { COLLECTIONS } from '@/constants/collections';

import type { Post, PostCollection } from '@/types/post';

/** Sorted posts. */
export const getAllPosts = (): Promise<PostCollection[]> => getAllEntries(COLLECTIONS.POST);

export const getPostsWithReadingTimeFromPosts = async (
  posts: PostCollection[]
): Promise<Post[]> => {
  const readingTimePromises = posts.map(async (post) => {
    const { remarkPluginFrontmatter } = await post.render();
    const { readingTime } = remarkPluginFrontmatter;
    return { readingTime };
  });
  const readingTimes = await Promise.all(readingTimePromises);

  // other frontmatter props are in post.data...
  // readingTimes is in post.readingTimes
  const postsWithReadingTime = posts.map((post, index) => ({ ...post, ...readingTimes[index] }));
  return postsWithReadingTime;
};

/** Prefer over getAllPosts() */
export const getAllPostsWithReadingTime = async (): Promise<Post[]> =>
  getPostsWithReadingTimeFromPosts(await getAllPosts());
