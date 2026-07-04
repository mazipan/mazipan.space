import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

import { BASE_FOLDERS } from '@/constants/collections';
import { carouselSchema } from '@/schemas/carousel';
import { postSchema } from '@/schemas/post';
import { projectSchema } from '@/schemas/project';

const { POST, PROJECT, CAROUSEL } = BASE_FOLDERS;

export const postCollection = defineCollection({
  schema: postSchema,
  loader: glob({ pattern: '**/*.mdx', base: POST }),
});

export const projectCollection = defineCollection({
  schema: projectSchema,
  loader: glob({ pattern: '**/*.mdx', base: PROJECT }),
});

export const carouselCollection = defineCollection({
  schema: carouselSchema,
  loader: glob({ pattern: '**/*.json', base: CAROUSEL }),
});

// _schemas folder in collections will be included in type
export const collections = {
  post: postCollection,
  project: projectCollection,
  carousel: carouselCollection,
};
