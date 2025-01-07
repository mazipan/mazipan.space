import type { CollectionEntry } from 'astro:content';

export type ProjectCollection = CollectionEntry<'project'>;

export type Project = ProjectCollection & {
  slug: ProjectCollection['id']; // Content Layer migration
};
