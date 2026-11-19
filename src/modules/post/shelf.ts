import { ROUTES } from '@/constants/routes';

import type { Post } from '@/types/post';

/** A post under this many minutes is a "Short read", otherwise a "Long story". */
export const SHORT_READ_MAX_MINUTES = 5;

export type ReadKind = 'Short read' | 'Long story';

export const getReadKind = (readingTime: number): ReadKind =>
  readingTime < SHORT_READ_MAX_MINUTES ? 'Short read' : 'Long story';

export const BOOK_COLORS = ['terracotta', 'teal', 'mustard', 'navy', 'cream'] as const;
// decoration only: a natural, uneven row of books
export const BOOK_HEIGHTS = ['md', 'lg', 'sm', 'md', 'lg'] as const;

/** Props for <Book /> from a post. `index` only picks the color and height. */
export const getBookProps = (post: Post, index: number) => ({
  href: `${ROUTES.BLOG}/${post.slug}`,
  title: post.data.title,
  meta: `${getReadKind(post.readingTime)} - ${Math.max(1, Math.ceil(post.readingTime))} min`,
  colors: BOOK_COLORS[index % BOOK_COLORS.length],
  height: BOOK_HEIGHTS[index % BOOK_HEIGHTS.length],
});
