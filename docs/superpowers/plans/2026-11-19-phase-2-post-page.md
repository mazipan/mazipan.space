# Phase 2 Post Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans. Steps use checkbox syntax.

**Goal:** A post page that reads easily: 70-character lines, big text, a ToC with 24px targets and a progress bar, previous/next keys, and an optional "Bottom line" note.

**Architecture:** Compose Phase 1/1b parts (`Keycap`, `StickyNote`). Only additive, optional frontmatter (`bottomLine`). No URL or feed change.

**Spec:** `docs/superpowers/specs/2026-11-19-site-revamp-design.md` (section "Post"). **Branch:** `feat/2027-post` off `feat/2027-design`, merged back, then PR to `master`.

## Global Constraints

- Body text 17-19px, about 70 characters per line, line height 1.7 or more. Contrast checks stay green (`pnpm contrast`).
- Touch targets 24px or more. `prefers-reduced-motion`: no animated progress.
- Verify: `SITE_URL=https://www.mazipan.space pnpm build`, `pnpm -s astro check --minimumSeverity error`, `pnpm -s lint`, `pnpm -s contrast`, Prettier on changed files.
- New `.mdx` frontmatter fields are optional. Existing posts build unchanged.

## Review Focus

1. Long code blocks and tables must not be squeezed by the 70ch measure.
2. The progress bar must not move layout and must work with view transitions (no leaked scroll listeners).
3. First and last post have only one nav key; screen readers get a labeled `nav`.
4. Posts without `bottomLine` show no note.

---

### Task 1: Reading measure
- [ ] RED: on a built post, `getComputedStyle(p).maxWidth` is `none`.
- [ ] Implement: in `src/styles/base/my-prose.css`, `.post-detail > :where(p, ul, ol, blockquote, h2, h3, h4)` get `max-width: 70ch`; `pre`, `.expressive-code`, tables, figures keep full width.
- [ ] GREEN: maxWidth is a pixel value between 560 and 800 for `p`; code block width is wider than the paragraph.

### Task 2: ToC targets and progress bar
- [ ] RED: `.toc-link` height is below 24px; no `#reading-progress`.
- [ ] Implement: `.toc-link { display: inline-block; min-height: 24px; padding-block: 2px }`; add `<div id="reading-progress" role="progressbar" aria-label="Reading progress" aria-valuemin="0" aria-valuemax="100">` in `ToC.astro`; in its script, one passive `scroll` listener updates `aria-valuenow` and a width; remove it in `disconnectedCallback`; no transition under reduced motion.
- [ ] GREEN: every `.toc-link` height is 24px or more; `aria-valuenow` changes after `scrollTo`.

### Task 3: Previous and next keys
- [ ] RED: built post has no `.post-nav`.
- [ ] Implement: `getStaticPaths` in `src/pages/blog/[slug].astro` adds `prevPost` (older) and `nextPost` (newer) from the sorted list; new `src/components/PostNav.astro` (props `prev?: Post`, `next?: Post`) renders `<nav aria-label="More posts">` with `Keycap` arrow keys (`element="a"`, `colors="navy"`, `size="square"`, `aria-label="Older post: <title>"`) and the titles as text links; mount in the `after-content` slot above Share.
- [ ] GREEN: the newest post has only an older key; the oldest only a newer key; a middle post has both.

### Task 4: Bottom line
- [ ] RED: sample post page has no `.sticky-note`.
- [ ] Implement: `bottomLine: z.string().optional()` in `src/schemas/post.ts`; render `<StickyNote label="Bottom line:">` under the description in `[slug].astro` when set; add one sample line to `2018-04-16-intro-to-intersection-observer.mdx` ("Pakai IntersectionObserver untuk tahu kapan elemen masuk layar, tanpa scroll listener.").
- [ ] GREEN: only that post shows a note.

### Task 5: Heading order of related posts
- [ ] RED: Lighthouse `heading-order` fails on a post page (h4 cards under h2).
- [ ] Implement: `PostCardSmall` gets `headingLevel?: 'h3'|'h4'` (default `'h4'`); `PostListMore` passes `'h3'`.
- [ ] GREEN: `h1 > h2 > h3` order on a post page.

### Task 6: Gate and merge
- [ ] Full checks, Lighthouse a11y on a post in dark and light, screenshots at 320px and 1280px, review, merge into `feat/2027-design`, PR to `master`, squash after CI.
