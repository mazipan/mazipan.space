import { ROUTES } from '@/constants/routes';

import type { Carousel } from '@/types/carousel';
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

/** How-tos: marked with `kind: how-to`, or in the tutorials category. */
export const isHowTo = (post: Post): boolean =>
  post.data.kind === 'how-to' || post.data.category === 'tutorials';

export const SHELF_SIZE = 5;

/** Newest posts per mood. `posts` must be sorted newest first. */
export const getPostShelves = (posts: Post[]) => ({
  short: posts.filter((p) => getReadKind(p.readingTime) === 'Short read').slice(0, SHELF_SIZE),
  long: posts.filter((p) => getReadKind(p.readingTime) === 'Long story').slice(0, SHELF_SIZE),
  howTo: posts.filter(isHowTo).slice(0, SHELF_SIZE),
});

/** Props for <Book /> from a slide deck. */
export const getSlidesBookProps = (carousel: Carousel, index: number) => ({
  href: `${ROUTES.CAROUSEL}/${carousel.slug}`,
  title: carousel.data.title,
  meta: `Slides - ${carousel.data.slides.length} pages`,
  colors: BOOK_COLORS[index % BOOK_COLORS.length],
  height: BOOK_HEIGHTS[index % BOOK_HEIGHTS.length],
});

const CARD_TONES = ['terracotta', 'teal', 'mustard', 'navy'] as const;

/** Stable tab color for a category. Decoration only, the category name is always text. */
export const getCardTone = (category: string) => {
  let hash = 0;
  for (const ch of category) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return CARD_TONES[hash % CARD_TONES.length];
};
