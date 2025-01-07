import { render } from 'astro:content';

import { getAllEntries, idToSlug } from '@/modules/common';
import { COLLECTIONS } from '@/constants/collections';

import type { Post, PostCollection } from '@/types/post';

/** Sorted posts. */
export const getAllPosts = (): Promise<PostCollection[]> => getAllEntries(COLLECTIONS.POST);

export const getFeaturedPosts = (): Promise<PostCollection[]> => getAllEntries(COLLECTIONS.POST);

export const getPostsWithReadingTimeFromPosts = async (
  posts: PostCollection[]
): Promise<Post[]> => {
  const readingTimePromises = posts.map(async (post) => {
    const { remarkPluginFrontmatter } = await render(post);
    const { readingTime } = remarkPluginFrontmatter;
    return { readingTime };
  });
  const readingTimes = await Promise.all(readingTimePromises);

  // other frontmatter props are in post.data...
  // readingTimes is in post.readingTimes
  const postsWithReadingTimeAndSlug = posts.map((post, index) => ({
    ...idToSlug(post),
    ...readingTimes[index],
  }));

  return postsWithReadingTimeAndSlug;
};

/**
 * Prefer over getAllPosts()
 * From this point Post[] instead of CollectionEntry<'post'>[].
 * My custom type with slug, readingTime, etc.
 */
export const getAllPostsWithReadingTime = async (): Promise<Post[]> =>
  getPostsWithReadingTimeFromPosts(await getAllPosts());
