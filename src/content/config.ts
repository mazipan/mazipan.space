import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

import { BASE_FOLDERS } from '@/constants/collections';
import { postSchema } from '../schemas/post';
import { projectSchema } from '../schemas/project';

const { POST, PROJECT } = BASE_FOLDERS;

export const postCollection = defineCollection({
  schema: postSchema,
  loader: glob({ pattern: '**/*.mdx', base: POST }),
});

export const projectCollection = defineCollection({
  schema: projectSchema,
  loader: glob({ pattern: '**/*.mdx', base: PROJECT }),
});

// _schemas folder in collections will be included in type
export const collections = { post: postCollection, project: projectCollection };
