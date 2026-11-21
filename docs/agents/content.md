# Content authoring

How to add and change content. Frontmatter and JSON must satisfy the Zod schemas in `src/schemas/`.

## Blog posts and projects

- New post: add an `.mdx` file under `src/content/post/` (tags must be in the allowed `TAGS` list).
  New project: `src/content/project/`; set `featured: true` to show it under "Selected projects" on Home.
- Drafts and sorting are handled in `getAllEntries()` (`@/modules/common`): do not re-implement them.
- The posts are the author's own voice and are often Indonesian: do not rewrite or "improve" them.
  Arrows and symbols inside post bodies are the author's writing: leave them.
- Shelf mapping on the blog: Short reads under 5 minutes, Long stories 5 minutes or more, How-tos by the
  optional `kind: 'how-to'`, Slides = the Carousel collection.

## Site copy

Short sentences, first person, warm, no repeated message across pages (the tagline lives on Home and
About only), no abbreviations in the UI, English UI. Every page needs a real meta description in
`src/constants/metadata.ts`. Keep facts in constants (`src/constants/profile.ts`, `career.ts`,
`friends.ts`, `now.ts`), not hard-coded in pages.

## CodeGroup component

`src/components/CodeGroup.astro` renders a tabbed code block for showing the same
command/snippet across multiple package managers (or any set of tabs).

### Usage in MDX

````mdx
import CodeGroup from '../../components/CodeGroup.astro';

<CodeGroup labels={['npm', 'pnpm', 'yarn', 'bun']}>
  <div data-label="npm">```bash title=zsh frame=terminal npm install foo ```</div>
  <div data-label="pnpm">```bash title=zsh frame=terminal pnpm add foo ```</div>
  <div data-label="yarn">```bash title=zsh frame=terminal yarn add foo ```</div>
  <div data-label="bun">```bash title=zsh frame=terminal bun add foo ```</div>
</CodeGroup>
````

- Each panel is a `<div data-label="<id>">` child (matched to a tab by label string).
- `labels` accepts plain strings **or** `{ id: string; text: string }` objects — plain
  strings are shorthand where `id === text`.
- Package manager ids (`npm`, `pnpm`, `yarn`, `bun`) automatically show their logo icon;
  any other id shows just the text label.
- Implemented as a web component (`<code-group>`) so it works correctly with View
  Transitions — no `astro:page-load` boilerplate needed.
- Icon SVGs live in `src/assets/icons/` with the `pm-` prefix
  (`pm-npm.svg`, `pm-pnpm.svg`, `pm-yarn.svg`, `pm-bun.svg`).

---

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
  "series": "series-slug",
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
`series` is optional — see **Series** below.

**2. Slide types**

Each entry in `slides` needs `type` and `theme`. All other fields are optional.

| Type      | Key fields                                | Purpose                      |
| --------- | ----------------------------------------- | ---------------------------- |
| `cover`   | `icon`, `title`, `subtitle`               | Opening title card           |
| `content` | `icon`, `title`, `body`                   | Body text with heading       |
| `quote`   | `quote`                                   | Full-bleed pull quote        |
| `tip`     | `icon`, `title`, `body`                   | Highlighted advice box       |
| `list`    | `icon`, `title`, `bullets`                | Numbered bullet list         |
| `closing` | `icon`, `title`, `body`, `cta`, `ctaSlug` | Last slide with optional CTA |

`body` supports `\n` for line breaks. `bullets` is an array of strings.
`ctaSlug` is a blog post slug — the CTA button links to `/blog/<ctaSlug>`.

Recommended order: `cover` → 2–5 middle slides → `closing`.

**3. Themes**

Every slide picks its own `theme` — vary them for visual rhythm.

| Theme      | Background      | Text                        |
| ---------- | --------------- | --------------------------- |
| `ocean`    | Blue → cyan     | white                       |
| `lavender` | Violet → purple | white                       |
| `sunset`   | Orange → rose   | white                       |
| `forest`   | Emerald → teal  | white                       |
| `midnight` | Slate 800 → 900 | white                       |
| `sunrise`  | Amber → orange  | **dark** (only light theme) |
| `cherry`   | Rose → pink     | white                       |

**4. Inline text markup**

Supported in `body`, `quote`, `subtitle`, `title`, and `bullets` items.

| Syntax     | Effect                               | Use for                         |
| ---------- | ------------------------------------ | ------------------------------- |
| `**word**` | Bold + ~10% larger                   | The single most important claim |
| `==word==` | Stabilo yellow highlight (dark text) | Hook or surprise phrase         |
| `__word__` | Amber accent colour                  | Secondary emphasis              |

Keep it sparing — 1–3 marks per text block. Do not nest markers. On the
`sunrise` theme the stabilo switches to a dark overlay automatically.

**5. Series**

Group related carousels into a named series. Carousels in a series are shown
together under a section header on the `/carousel` listing page. The series
name also appears as a frosted pill badge on the cover slide and as a label
below `mazipan.space` in the branding footer of every slide.

To add a carousel to a series:

1. Set `"series": "<slug>"` in the JSON file (e.g. `"series": "layoff"`).
2. If the series slug is new, add a matching entry to `SERIES_META` in
   `src/modules/carousel.ts`:

```ts
export const SERIES_META: Record<string, SeriesMeta> = {
  layoff: {
    title: 'Layoff Series',
    description: 'One sentence shown under the series heading on the listing page.',
  },
  // add new series here
};
```

Carousels without a `series` field appear in an "Other" section below all
series groups. If there are no ungrouped carousels, the "Other" section is
omitted.

**6. Naming and tone**

- Filename: `YYYY-MM-DD-<topic>.json`, kebab-case slug
- Title: short and humble — avoid overclaiming ("Cara Nyata", "Ultimate Guide")
- Description: one plain sentence, no hype
- `lang: "id"` for Indonesian (default), `"en"` for English

**6. Key source files**

| Path                                | Purpose                                     |
| ----------------------------------- | ------------------------------------------- |
| `src/schemas/carousel.ts`           | Zod schema — source of truth for all fields |
| `src/modules/carousel.ts`           | Data access + `SERIES_META` registry        |
| `src/components/CarouselViewer.tsx` | React island (renders + swipe/keyboard)     |
| `src/components/CarouselCard.astro` | Grid card on the `/carousel` listing        |
| `src/pages/carousel/index.astro`    | Listing page (groups by series)             |
| `src/pages/carousel/[slug].astro`   | Detail page                                 |
| `src/content/carousel/`             | JSON source files                           |

