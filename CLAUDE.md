# mazipan.space — AI Agent Guide

## Tech stack

- **Framework**: Astro 6.4.2 (static output), React 19 islands (`client:load`)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite` plugin, no config file)
- **Content**: Astro Content Layer v2 — Markdown for posts/projects, JSON for carousels
- **Type checking**: `pnpm astro check` (always prefix with `SITE_URL=https://www.mazipan.space`)
- **Package manager**: pnpm

## Adding a new carousel (Slides)

### 1. Create the JSON file

Place it at `src/content/carousel/<YYYY-MM-DD-slug>.json`. The filename becomes the URL slug (`/carousel/<slug>`).

```json
{
  "publishDate": "YYYY-MM-DD",
  "title": "Short, clear title",
  "description": "One sentence shown in the listing card.",
  "sourcePost": "blog-post-slug",
  "tags": ["thought"],
  "author": "mazipan",
  "lang": "id",
  "draft": false,
  "slides": []
}
```

`sourcePost` is optional — set it to the blog post slug (without `/blog/`) to show a "Baca artikel lengkap" CTA on the detail page.

### 2. Slide structure

Each slide is an object in the `slides` array. The `type` field controls the layout. Every slide requires a `theme`.

**Required fields per slide:**

| Field   | Type   | Notes |
|---------|--------|-------|
| `type`  | string | One of the types below |
| `theme` | string | One of the themes below |

**Optional fields (used by different types):**

| Field      | Used by                  | Notes |
|------------|--------------------------|-------|
| `icon`     | all except `quote`       | Emoji |
| `title`    | all except `quote`       | — |
| `subtitle` | `cover`                  | — |
| `body`     | `content`, `tip`, `closing` | Supports `\n` for line breaks |
| `quote`    | `quote`                  | Full quote text |
| `bullets`  | `list`                   | Array of strings |
| `cta`      | `closing`                | Button label |
| `ctaSlug`  | `closing`                | Blog post slug for the CTA link |

### 3. Slide types

| Type      | Purpose | Typical fields |
|-----------|---------|----------------|
| `cover`   | First slide — title card | `icon`, `title`, `subtitle` |
| `content` | Body text with icon and heading | `icon`, `title`, `body` |
| `quote`   | Full-bleed pull quote | `quote` |
| `tip`     | Highlighted advice box | `icon`, `title`, `body` |
| `list`    | Numbered bullet list | `icon`, `title`, `bullets` |
| `closing` | Last slide with optional CTA button | `icon`, `title`, `body`, `cta`, `ctaSlug` |

**Recommended slide order:** `cover` → 2–5 content/tip/quote/list → `closing`

### 4. Themes

Each theme is a gradient with a matching text and accent colour. Every slide can have its own theme — vary them for visual rhythm.

| Theme      | Colours |
|------------|---------|
| `ocean`    | Blue → cyan (dark, white text) |
| `lavender` | Violet → purple (dark, white text) |
| `sunset`   | Orange → rose (dark, white text) |
| `forest`   | Emerald → teal (dark, white text) |
| `midnight` | Slate 800 → Slate 900 (very dark, white text) |
| `sunrise`  | Amber → orange (light, dark text) |
| `cherry`   | Rose → pink (dark, white text) |

`sunrise` is the only light-background theme — the stabilo highlight colour adapts automatically.

### 5. Inline text markup

Text fields (`body`, `quote`, `subtitle`, `title`, `bullets` items) support three inline markers:

| Syntax     | Renders as | Use for |
|------------|------------|---------|
| `**word**` | Bold + ~10% larger | The single most important claim |
| `==word==` | Stabilo yellow highlight, dark text | Hook or surprise phrase |
| `__word__` | Amber accent colour | Secondary emphasis |

Keep markup sparing — 1–3 marks per slide body is enough. Do not nest markers.

### 6. Naming conventions

- Filename: `YYYY-MM-DD-<topic-slug>.json` — date is the publish date, slug is kebab-case
- Title: short and conversational, no "Cara Nyata"-style overclaiming
- Description: one plain sentence, shown in the grid card
- `lang: "id"` for Indonesian content (default), `"en"` for English

### 7. Full example

```json
{
  "publishDate": "2026-07-04",
  "title": "Catatan Mencari Kerja Setelah Layoff",
  "description": "Bukan tips ajaib — hanya catatan jujur dari pengalaman mencari kerja.",
  "sourcePost": "2026-07-02-surat-untuk-diriku-setelah-layoff",
  "tags": ["thought", "experience"],
  "author": "mazipan",
  "lang": "id",
  "draft": false,
  "slides": [
    {
      "type": "cover",
      "icon": "💼",
      "title": "Catatan Mencari Kerja Setelah Layoff",
      "subtitle": "Bukan tips ajaib — hanya yang ==sebenarnya terjadi==",
      "theme": "sunset"
    },
    {
      "type": "content",
      "icon": "⚖️",
      "title": "Situasinya Berbeda Sekarang",
      "body": "__Dulu kamu yang memilih__. Sekarang **kamu yang dipilih**.\n\nTerima kenyataan ini bukan untuk membuatmu tertekan.",
      "theme": "midnight"
    },
    {
      "type": "quote",
      "quote": "Masuk dengan ==rasa ingin tahu== — bukan sekadar membuktikan diri.",
      "theme": "cherry"
    },
    {
      "type": "list",
      "icon": "📋",
      "title": "Yang Perlu Dilakukan",
      "bullets": [
        "Hitung **runway**-mu terlebih dulu",
        "Perbarui ==LinkedIn== sekarang, bukan nanti",
        "Lamar yang __cukup baik__, bukan hanya yang sempurna"
      ],
      "theme": "forest"
    },
    {
      "type": "closing",
      "icon": "🚀",
      "title": "Prosesnya Memang Brutal, dan Itu ==Bukan Salahmu==",
      "body": "Setiap penolakan terasa lebih berat karena kamu sedang **rentan** — bukan karena kamu tidak cukup baik.",
      "cta": "Baca artikel lengkapnya",
      "ctaSlug": "2026-07-02-surat-untuk-diriku-setelah-layoff",
      "theme": "sunset"
    }
  ]
}
```

### 8. Verify before committing

```bash
SITE_URL=https://www.mazipan.space pnpm astro check
```

Expect 0 errors. Warnings and hints are acceptable.

## Key source files

| Path | Purpose |
|------|---------|
| `src/schemas/carousel.ts` | Zod schema — source of truth for all field types |
| `src/components/CarouselViewer.tsx` | React island — renders slides, handles swipe/keyboard |
| `src/components/CarouselCard.astro` | Grid card shown on `/carousel` listing |
| `src/pages/carousel/index.astro` | Listing page |
| `src/pages/carousel/[slug].astro` | Detail page |
| `src/content/carousel/` | JSON files — one file per carousel |
| `src/constants/routes.ts` | `ROUTES.CAROUSEL` = `'/carousel'` |
