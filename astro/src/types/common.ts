import type { COLLECTIONS } from '@/constants/collections';
import type { Page } from 'astro';
import type { Image } from 'astro:assets';
import type { CollectionEntry } from 'astro:content';
import type { ComponentProps } from 'astro/types';
import type { Image as ReactGridGalleryImage } from 'react-grid-gallery';

export type CollectionType = (typeof COLLECTIONS)[keyof typeof COLLECTIONS];

export type AnyCollection = CollectionEntry<CollectionType>;

/** add more maybe */
export interface Metadata {
  title: string;
  description?: string;
  /** Must be url. */
  image?: string;
}

export interface PaginationProps
  extends Pick<
    Page<AnyCollection>,
    'url' | 'currentPage' | 'lastPage' | 'start' | 'end' | 'total'
  > {}

export interface ImageProps extends ReactGridGalleryImage {
  originalSrc: string;
}

export type AstroImageProps = ComponentProps<typeof Image>;
