import { z } from 'astro:content';
import type { infer as ZodInfer } from 'zod';

export const CAROUSEL_THEMES = [
  'ocean',
  'lavender',
  'sunset',
  'forest',
  'midnight',
  'sunrise',
  'cherry',
] as const;

export type CarouselTheme = (typeof CAROUSEL_THEMES)[number];

export const SLIDE_TYPES = ['cover', 'content', 'quote', 'tip', 'list', 'closing'] as const;

export type SlideType = (typeof SLIDE_TYPES)[number];

const slideSchema = z.object({
  type: z.enum(SLIDE_TYPES),
  icon: z.string().optional(),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  body: z.string().optional(),
  quote: z.string().optional(),
  bullets: z.array(z.string()).optional(),
  cta: z.string().optional(),
  ctaSlug: z.string().optional(),
  theme: z.enum(CAROUSEL_THEMES).default('ocean'),
});

export const carouselSchema = z.object({
  publishDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  title: z.string(),
  description: z.string(),
  series: z.string().optional(),
  sourcePost: z.string().optional(),
  tags: z.array(z.string()).nonempty(),
  author: z.string().default('mazipan'),
  lang: z.string().default('id'),
  draft: z.boolean().default(false),
  slides: z.array(slideSchema).nonempty(),
});

export type SlideData = ZodInfer<typeof slideSchema>;
export type CarouselData = ZodInfer<typeof carouselSchema>;
