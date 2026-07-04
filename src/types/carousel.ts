import type { CollectionEntry } from 'astro:content';

export type CarouselCollection = CollectionEntry<'carousel'>;

export type Carousel = CarouselCollection & {
  slug: CarouselCollection['id'];
};
