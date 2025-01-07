import { z } from 'astro:content';

import { DEFAULTS_POST, TAGS } from '@/constants/collections';

import type { SchemaContext } from 'astro:content';

/** lowercase tags for routes */
const removeDuplicatesAndToLowerCase = (items: string[]) => {
  const lowercaseItems = items.map((str) => str.toLowerCase());
  const distinctItems = new Set(lowercaseItems);
  return Array.from(distinctItems);
};

const { DRAFT, NO_HERO, HERO_IMAGE, HERO_ALT, TOC, CATEGORY, TITLE, DESCRIPTION, FEATURED } =
  DEFAULTS_POST;

// schema and collection are separate
export const postSchema = ({ image }: SchemaContext) =>
  z.object({
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    title: z.string().default(TITLE),
    description: z.string().default(DESCRIPTION),
    // convert img to object
    noHero: z.boolean().default(NO_HERO),
    heroImage: image().default(HERO_IMAGE),
    heroAlt: z.string().default(HERO_ALT),
    toc: z.boolean().default(TOC),
    draft: z.boolean().default(DRAFT),
    featured: z.boolean().default(FEATURED),
    category: z.string().default(CATEGORY),
    tags: z
      .array(
        z.string().refine(
          (tag) => TAGS.includes(tag as (typeof TAGS)[number]),
          (tag) => ({ message: `Invalid tag: ${tag} in the markdown.` })
        )
      )
      .nonempty()
      .transform(removeDuplicatesAndToLowerCase),
  });
