# AGENTS.md

Guidance for AI agents (and humans) working in this repository. Read this
before making changes so you follow the project's stack and conventions.

## Project overview

Personal website/blog for [mazipan.space](https://www.mazipan.space/), built
as a static site (SSG) with Astro. Content is authored in MDX and rendered to
static HTML; there is no runtime server.

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | **Astro 6** (static output) |
| UI islands | **React 19** (`@astrojs/react`) for interactive bits |
| Styling | **Tailwind CSS 4** via `@tailwindcss/vite` (no `@astrojs/tailwind`) |
| Content | Astro **Content Layer** (glob loader) with **Zod 4** schemas |
| Markdown | MDX (`@astrojs/mdx`), `astro-expressive-code`, `rehype-code-group` |
| Icons | `astro-icon` (Tabler set, local `src/assets/icons`) |
| Language | **TypeScript 6** (strict) |
| Lint/format | **ESLint 10** (flat config) + Prettier 3 |
| Package manager | **pnpm 11** |
| Runtime | **Node.js 24** (see `.nvmrc`) |
| Deploy | Vercel (static) + GitHub Pages workflow |

## Prerequisites

- **Node.js 24** — `nvm use` reads `.nvmrc` (`24.16.0`). `engines.node` is `>=24.0.0`.
- **pnpm 11** — the project pins `packageManager: pnpm@11.5.0`. Enable via
  Corepack: `corepack enable`. Do **not** use npm or yarn.

## Commands

```bash
pnpm install          # install deps
pnpm dev              # dev server on http://localhost:3000
pnpm build            # runs `generate` then `astro build` (with APP_VERSION)
pnpm preview          # preview the production build
pnpm sync             # regenerate Astro content/types
pnpm check-types      # tsc --noEmit (checks .ts/.tsx only)
pnpm lint             # eslint src
pnpm format           # prettier --write .
pnpm generate         # copy external data (talks, awesome-sde) into the repo
```

Before pushing, make sure these all pass: `pnpm build`, `pnpm check-types`,
`pnpm astro check` (checks `.astro` too), and `pnpm lint`.

## Environment variables

- All env vars are **build-time only** (SSG). Copy `.env.production.example` →
  `.env.production` (and/or `.env.development`) for local builds. These files are
  gitignored. In CI/Vercel the vars come from the platform environment.
- `src/config/process-env.ts` loads + validates `process.env` (used in
  `astro.config.ts`). Runtime code should import the validated config:
  - `@/config/client` → `CONFIG_CLIENT` (public values, site/author/umami, etc.)
  - `@/config/server` → `CONFIG_SERVER` (server-only values)
- Schemas live in `src/schemas/config.ts` (Zod). `astro:env` schema is in
  `process-env.ts` (`envSchema`).

## Project structure

```
src/
  assets/        images and local SVG icons (icons consumed by astro-icon)
  components/    .astro + small React components; astro-remote/ overrides
  config/        validated env config (client.ts, server.ts, process-env.ts)
  constants/     routes, metadata, collections, dom selectors, etc.
  content/       MDX collections: post/ and project/
  content.config.ts   collection definitions (Astro 6 location)
  draft/         example/draft MDX (not published)
  layouts/       page layouts (Base, Post, FullWidth)
  libs/          api/ (feed, open-graph image gen) and integrations/
  modules/       data-access/business logic (post/, project/)
  pages/         routes; pages/api/ for feed + OG image endpoints
  schemas/       Zod schemas for collections (post.ts, project.ts) and config
  styles/        global CSS (see Styling section)
  types/         shared TS types
  utils/         helpers (datetime, strings, styles `cn`, validation, ...)
plugins/         remark plugins (reading time, modified time)
scripts/         node scripts run by `pnpm generate` / versioning
```

## Path aliases

Import internal modules with the `@/*` aliases (defined in `tsconfig.json`,
no `baseUrl`). Prefer aliases over deep relative paths:

```ts
import { getAllPosts } from '@/modules/post/common';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/utils/styles';
import type { Post } from '@/types/post';
```

Available: `@/assets`, `@/components`, `@/constants`, `@/content`, `@/layouts`,
`@/modules`, `@/libs`, `@/pages`, `@/schemas`, `@/styles`, `@/types`, `@/utils`,
`@/config`.

## Conventions

### Imports & formatting

- 2-space indent, single quotes, semicolons, `printWidth` 100, `es5` trailing
  commas. Run `pnpm format` — Prettier owns formatting.
- Import order is enforced by `@ianvs/prettier-plugin-sort-imports` (see
  `.prettierrc.js`): built-ins → astro/react → third-party → `@/*` (in a fixed
  order) → relative → type imports → `@/assets` & `@/styles` last. Don't hand-sort;
  let Prettier do it.
- `prettier-plugin-tailwindcss` sorts class lists. `tailwindFunctions`: `clsx`,
  `cn`, `cva`.

### Styling (Tailwind v4)

- Tailwind runs through the **Vite plugin** (`@tailwindcss/vite` in
  `astro.config.ts`), not `@astrojs/tailwind`. There is no `postcss.config`.
- The JS config (`tailwind.config.ts`) is still used, loaded via the
  `@config` directive in `src/styles/main.css`. Theme tokens (colors via CSS
  vars, fonts, radii, custom `not-first`/`not-last` variants) live there.
- Global CSS is under `src/styles/` (`main.css` is the entry, imported once in
  `BaseHead.astro`). Sub-files use `@layer base/components/utilities`.
- **`@apply` only works with real utilities in v4.** If you need to `@apply` a
  custom class, define it with `@utility name { ... }` (see
  `src/styles/base/tags.css`, `components/link.css`, `components/layout.css`),
  not as a plain `@layer` class.
- **Component `<style>` blocks are processed in isolation.** Any `@apply` /
  custom utility inside a `.astro` `<style>` needs
  `@reference '../styles/tailwind-reference.css';` at the top of the block
  (see `YouTube.astro`, `Share.astro`).
- Prefer utility classes in markup; use the `cn()` helper (`@/utils/styles`,
  clsx + tailwind-merge) for conditional/merged class names. Buttons use `cva`
  variants (`@/components/Button.astro`).
- Note v4 renamed some utilities (e.g. `shadow` → `shadow-xs`/`shadow-sm`,
  `bg-gradient-*` → `bg-linear-*`). Unknown utilities in markup fail silently
  (no build error) — double-check class names if styling "disappears".

### Content collections (Astro Content Layer)

- Collections are defined in `src/content.config.ts` (Astro 6 location — **not**
  `src/content/config.ts`) using the `glob()` loader. Schemas come from
  `src/schemas/`.
- Entries use **`entry.id`**, not `entry.slug` (the deprecated `slug` was
  removed in Astro 6). The codebase exposes a slug via the `idToSlug()` helper
  (`@/modules/common`) and the enriched `Post`/`Project` types
  (`@/types/post`, `@/types/project`). Use `getAllPostsWithReadingTime()` /
  `getAllProjects()` when you need `.slug`; raw `getAllPosts()` only has `.id`.
- Draft filtering and date sorting are centralized in `getAllEntries()`
  (`@/modules/common`). Don't re-implement draft/preview logic.
- New blog post → add an `.mdx` file under `src/content/post/`; new project →
  `src/content/project/`. Frontmatter must satisfy the Zod schema (tags must be
  in the allowed `TAGS` list).
- New carousel (Slides) → add a `.json` file under `src/content/carousel/`. See
  the **Carousel** section below for the full authoring guide.

## Carousel (Slides)

Interactive slide decks styled like Instagram carousels. Each JSON file in
`src/content/carousel/` becomes a page at `/carousel/<slug>`. The viewer
(`src/components/CarouselViewer.tsx`) is a React island — no server-side logic.

### Creating a new carousel

**1. Create the file**

`src/content/carousel/YYYY-MM-DD-<topic-slug>.json` — the filename (without
`.json`) becomes the URL slug.

```json
{
  "publishDate": "YYYY-MM-DD",
  "updatedDate": "YYYY-MM-DD",
  "title": "Short, conversational title",
  "description": "One sentence shown in the listing card.",
  "sourcePost": "blog-post-slug-without-slash",
  "tags": ["thought"],
  "author": "mazipan",
  "lang": "id",
  "draft": false,
  "slides": []
}
```

`sourcePost` is optional — set it to the blog post slug to show a
"Baca artikel lengkap" link on the detail page. `updatedDate` is optional.

**2. Slide types**

Each entry in `slides` needs `type` and `theme`. All other fields are optional.

| Type      | Key fields | Purpose |
|-----------|-----------|---------|
| `cover`   | `icon`, `title`, `subtitle` | Opening title card |
| `content` | `icon`, `title`, `body` | Body text with heading |
| `quote`   | `quote` | Full-bleed pull quote |
| `tip`     | `icon`, `title`, `body` | Highlighted advice box |
| `list`    | `icon`, `title`, `bullets` | Numbered bullet list |
| `closing` | `icon`, `title`, `body`, `cta`, `ctaSlug` | Last slide with optional CTA |

`body` supports `\n` for line breaks. `bullets` is an array of strings.
`ctaSlug` is a blog post slug — the CTA button links to `/blog/<ctaSlug>`.

Recommended order: `cover` → 2–5 middle slides → `closing`.

**3. Themes**

Every slide picks its own `theme` — vary them for visual rhythm.

| Theme      | Background | Text |
|------------|-----------|------|
| `ocean`    | Blue → cyan | white |
| `lavender` | Violet → purple | white |
| `sunset`   | Orange → rose | white |
| `forest`   | Emerald → teal | white |
| `midnight` | Slate 800 → 900 | white |
| `sunrise`  | Amber → orange | **dark** (only light theme) |
| `cherry`   | Rose → pink | white |

**4. Inline text markup**

Supported in `body`, `quote`, `subtitle`, `title`, and `bullets` items.

| Syntax     | Effect | Use for |
|------------|--------|---------|
| `**word**` | Bold + ~10% larger | The single most important claim |
| `==word==` | Stabilo yellow highlight (dark text) | Hook or surprise phrase |
| `__word__` | Amber accent colour | Secondary emphasis |

Keep it sparing — 1–3 marks per text block. Do not nest markers. On the
`sunrise` theme the stabilo switches to a dark overlay automatically.

**5. Naming and tone**

- Filename: `YYYY-MM-DD-<topic>.json`, kebab-case slug
- Title: short and humble — avoid overclaiming ("Cara Nyata", "Ultimate Guide")
- Description: one plain sentence, no hype
- `lang: "id"` for Indonesian (default), `"en"` for English

**6. Key source files**

| Path | Purpose |
|------|---------|
| `src/schemas/carousel.ts` | Zod schema — source of truth for all fields |
| `src/components/CarouselViewer.tsx` | React island (renders + swipe/keyboard) |
| `src/components/CarouselCard.astro` | Grid card on the `/carousel` listing |
| `src/pages/carousel/index.astro` | Listing page |
| `src/pages/carousel/[slug].astro` | Detail page |
| `src/content/carousel/` | JSON source files |

### Zod (v4)

- Use `error.issues` (not `error.errors`).
- `.default(x)` takes the **output** type (after `.transform()`); use
  `.prefault()` if you need the old "default runs through the pipeline" behavior.
- `.refine(check, { error })` — the second arg is an object (or string), not a
  function. Use `{ error: (issue) => \`...${issue.input}...\` }` for dynamic
  messages.

### TypeScript

- Strict (`astro/tsconfigs/strict`). No `baseUrl`; `paths` are relative to the
  repo root with a `./src/` prefix.
- React 19 removed the global `JSX` namespace — import it (`import type { JSX }
  from 'react'`) or use `React.JSX`.
- `tsc` (`pnpm check-types`) only covers `.ts/.tsx`. Use `pnpm astro check` to
  type-check `.astro` files.

### ESLint (flat config)

- Config is `eslint.config.mjs` (flat). `@typescript-eslint` rules apply to
  JS/TS files only (`**/*.{ts,tsx,mjs,cjs,js}`); `.astro` and `.mdx` are handled
  by their own plugin configs. `no-unused-vars` is intentionally off for `.mdx`.
- Use `_`-prefixed names for intentionally-unused vars/args (matched by the
  ignore pattern). Prefer fixing lint issues over adding disable directives.

## CI / Deployment

- **GitHub Actions** (`.github/workflows/`) build with pnpm + Node 24 (via
  `pnpm/action-setup` + `actions/setup-node` reading `.nvmrc`). Keep action
  versions current.
- **Vercel** deploys the static build (`vercel.json` → `buildCommand: pnpm build`).
  Corepack is enabled (`ENABLE_EXPERIMENTAL_COREPACK=1` in project settings), so
  Vercel uses the pnpm version pinned in `packageManager` (pnpm 11) — matching
  local dev. Without Corepack, Vercel would fall back to pnpm 9 and choke on
  `pnpm-workspace.yaml`, so keep Corepack enabled.

## Gotchas

- **`pnpm-workspace.yaml` is committed and required.** pnpm 11 blocks
  dependency build scripts by default, so this file approves the native builds
  (`allowBuilds: { esbuild, sharp }`) — without it, `esbuild`/`sharp` won't
  build and the production build fails. This is a single-package repo, so the
  file has **no `packages:` field**; it must only be used with pnpm 10+/Corepack
  (a pnpm 9 that treats it as a monorepo manifest would fail with "packages
  field missing or empty"). Note: `onlyBuiltDependencies` is *not* honored by
  pnpm 11 — use the `allowBuilds` map. Local installs may inject placeholder
  values or a `minimumReleaseAgeExclude` block (from a machine-global pnpm
  setting); keep the committed file clean (just `allowBuilds` with `true`).
- **OG images** are generated at build time with `satori` + `sharp`
  (`src/pages/api/open-graph/[...route].png.ts`). `satori` is strict about image
  sources — always quote attribute interpolations in the HTML template
  (`src/libs/api/open-graph/template-html.ts`).
- `astro.config.ts` markdown `remarkPlugins`/`rehypePlugins` are deprecated in
  Astro 6 (still functional, emits a warning); they can be migrated to
  `@astrojs/markdown-remark`'s `unified()` later.
- `pnpm generate` fetches external data (talks, awesome-sde lists) and writes
  into the repo; it runs automatically as part of `pnpm build`.
