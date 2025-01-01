import { z } from 'astro:content';

import { DEFAULTS_PROJECT } from '@/constants/collections';

import type { SchemaContext } from 'astro:content';

const { DRAFT, HERO_IMAGE, HERO_ALT, TITLE, DESCRIPTION } = DEFAULTS_PROJECT;

const removeDuplicatesAndToLowerCase = (items: string[]) => {
  const lowercaseItems = items.map((str) => str.toLowerCase());
  const distinctItems = new Set(lowercaseItems);
  return Array.from(distinctItems);
};

export const projectSchema = ({ image }: SchemaContext) =>
  z.object({
    title: z.string().default(TITLE),
    description: z.string().default(DESCRIPTION),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: image().default(HERO_IMAGE),
    heroAlt: z.string().default(HERO_ALT),
    draft: z.boolean().default(DRAFT),
    tags: z.array(z.string()).nonempty().transform(removeDuplicatesAndToLowerCase),
  });
