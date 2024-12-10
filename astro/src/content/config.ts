import { defineCollection } from 'astro:content';

import { postSchema } from '../schemas/post';
import { projectSchema } from '../schemas/project';

export const postCollection = defineCollection({
  schema: postSchema,
  type: 'content',
});

export const projectCollection = defineCollection({
  schema: projectSchema,
  type: 'content',
});

// _schemas folder in collections will be included in type
export const collections = { post: postCollection, project: projectCollection };
