import { z } from 'zod';

export const nodeEnvValues = ['development', 'test', 'production'] as const;
export const booleanValues = ['true', 'false', ''] as const;

export const modeValues = ['light', 'dark'] as const;
export const themeValues = ['default-light', 'default-dark', 'green-light', 'green-dark'] as const;

const domainSubdomainRegex =
  /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)(\.(?!-)[A-Za-z0-9-]{1,63}(?<!-))*\.[A-Za-z]{2,}$/;

/** runs after astro:env check in astro.config.ts */
export const processEnvSchema = z.object({
  NODE_ENV: z.enum(nodeEnvValues),
  PREVIEW_MODE: z
    .enum(booleanValues)
    .transform((value) => value === 'true')
    .default('false'),
  // ensure no trailing slash
  SITE_URL: z.string().url().regex(/[^/]$/, 'SITE_URL should not end with a slash "/"'),
  PLAUSIBLE_SCRIPT_URL: z.string().url().or(z.literal('')).optional(),
  PLAUSIBLE_DOMAIN: z
    .string()
    .or(z.enum(['', 'localhost'])) // for types
    .optional()
    .refine(
      // check regex this way
      (value) =>
        value === undefined ||
        value === '' ||
        value === 'localhost' || // astro:env default
        domainSubdomainRegex.test(value),
      (value) => ({ message: `Invalid hostname for PLAUSIBLE_DOMAIN 1: ${value}` })
    ),
});

export const configServerSchema = processEnvSchema
  .omit({ SITE_URL: true, PREVIEW_MODE: true, PLAUSIBLE_SCRIPT_URL: true, PLAUSIBLE_DOMAIN: true })
  .extend({ PREVIEW_MODE: z.boolean() }); // here its boolean, not 'true' | 'false'

export const configClientSchema = processEnvSchema
  .pick({ SITE_URL: true, PLAUSIBLE_SCRIPT_URL: true, PLAUSIBLE_DOMAIN: true })
  .merge(
    z.object({
      SITE_TITLE: z.string().min(1),
      SITE_DESCRIPTION: z.string().min(1),
      PAGE_SIZE_POST_CARD: z.number(),
      PAGE_SIZE_POST_CARD_SMALL: z.number(),
      MORE_POSTS_COUNT: z.number(),
      DEFAULT_MODE: z.enum(modeValues), // check that theme and mode match
      DEFAULT_THEME: z.enum(themeValues),
      AUTHOR_NAME: z.string().min(1),
      AUTHOR_EMAIL: z.string().email(),
      AUTHOR_GITHUB: z.string().url(),
      AUTHOR_LINKEDIN: z.string().url(),
      AUTHOR_TWITTER: z.string().url(),
      AUTHOR_YOUTUBE: z.string().url(),
      REPO_URL: z.string().url(),
    })
  );
