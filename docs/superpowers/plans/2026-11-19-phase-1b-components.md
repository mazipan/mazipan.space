# Phase 1b Component Library Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the shared tactile components (Button on keycaps, raised Tag, Book and Shelf, PaperCard, StickyNote, Input) so Phases 2-5 only compose them.

**Architecture:** Reuse the Phase 1 tokens. Books reuse the five `--th-key-*` color sets, so their contrast is already checked. Old `Button` and `Tag` keep their props and markup contract, so the 16 `Button` files and 8 `Tag` files restyle with no edits. New surface tokens get contrast pairs in `scripts/check-contrast.mjs` before any CSS uses them.

**Tech Stack:** Astro 7, Tailwind 4 (`@layer components`), `class-variance-authority`, MDX reference pages.

**Spec:** `docs/superpowers/specs/2026-11-19-site-revamp-design.md`. Mockups: `docs/superpowers/specs/mockups/` (`tactile-components.html`, `f-real-shelf.html`, `keycaps.html`).

## Global Constraints

- Branch `feat/2027-components` off `feat/2027-design`. Merge back into `feat/2027-design` when done. Never touch `master` directly.
- Keep all `--th-*` names. Dark mode stays `:root.dark`.
- Contrast: text 4.5:1, UI borders 3:1. Every new token pair gets a line in `scripts/check-contrast.mjs` first (test-first).
- Depth is decoration. Real text labels, real 2px borders, pressed/current also underlined (Phase 1 rule).
- `prefers-reduced-motion`: no lift, tilt, or hover shift. Static slight tilt (max 1deg) is allowed.
- Reference page for every component under `src/pages/design/`.
- Verify with: `pnpm -s contrast`, `SITE_URL=https://www.mazipan.space pnpm -s astro check --minimumSeverity error`, `pnpm -s lint`, `SITE_URL=https://www.mazipan.space pnpm build`.
- No long-dash characters in code, comments, or copy. Use "-".

## Review Focus

1. **Icon-only ghost buttons** (menu toggle, theme toggle, back-to-top) must keep their flat look and accessible names (task 1 test).
2. **Disabled `Button`** renders a `<span aria-disabled="true">` and still looks pressed-down and dimmed in all 16 usage files (task 1 test).
3. **Tag in dark mode**: text on the dark cream face passes 4.5:1, and hover does not move under reduced motion (task 2 test).
4. **Shelf at 320px**: no horizontal scroll, books wrap, a plank sits under every row (task 3 test).
5. **Heading order**: `Shelf` takes a `level` prop; a page with an `h1` must not get an `h3` first (task 3 test).

## File Structure

| File | Responsibility |
|---|---|
| `scripts/check-contrast.mjs` | New pairs for surface tokens |
| `src/styles/theme/surface-tokens.css` | `--th-wood-*`, `--th-note-*`, `--th-field-*` (light and dark) |
| `src/components/Button.astro`, `src/styles/components/button.css` | Non-ghost variants render as keycaps |
| `src/styles/components/tag.css` | Raised chip look for solid tags |
| `src/components/Book.astro`, `Shelf.astro`, `src/styles/components/shelf.css` | Book cover and shelf with plank |
| `src/components/PaperCard.astro`, `StickyNote.astro`, `src/styles/components/surface.css` | Paper and note surfaces |
| `src/components/Input.astro`, `src/styles/components/input.css` | Inset field with label |
| `src/pages/design/shelf.mdx`, `surfaces.mdx`, `forms.mdx` | Reference pages |
| `AGENTS.md` | "Design system components" section |

---

### Task 1: Button renders as a keycap

**Files:**
- Modify: `src/components/Button.astro`, `src/styles/components/button.css`
- Test: `src/pages/design/buttons.mdx` (existing reference page)

**Interfaces:**
- Consumes: `.keycap`, `.keycap-face`, `.keycap-<color>`, `.keycap-sm` from `src/styles/components/keycap.css`.
- Produces: `Button` keeps its props (`variant: 'outline'|'solid'|'ghost'`, `colors: 'primary'|'default'`, `size: 'sm'|'md'`, `element`, `disabled`, slots `before-icon`, `after-icon`, default). Mapping to keycap color: `solid+primary` = `terracotta`, `solid+default` = `navy`, `outline+primary` = `teal`, `outline+default` = `cream`. `ghost` keeps the old flat classes and markup.

- [ ] **Step 1: Write the failing check.** `SITE_URL=https://www.mazipan.space pnpm build`, then `grep -c 'keycap-terracotta' dist/design/buttons/index.html`. Expected now: `0` (FAIL).
- [ ] **Step 2: Implement.** In `Button.astro`, add a `KEYCAP_COLOR` lookup keyed `"<variant>-<colors>"`. For non-ghost: classes `keycap keycap-<color>` plus `keycap-sm` when `size === 'sm'`; wrap all three slots in `<span class="keycap-face">`; drop the old `button-*` classes. Disabled: render `span` with `aria-disabled="true"` (no `disabled` attribute on a span). Ghost: unchanged output.
- [ ] **Step 3: Clean `button.css`.** Remove rules for `button-solid-*` and `button-outline-*` that no longer apply; keep `.button`, `.button-ghost*`, `.button-sm`, `.button-md` for ghost.
- [ ] **Step 4: Verify.** Build, then: `grep -c 'keycap-terracotta' dist/design/buttons/index.html` (expect 1 or more), `grep -c 'keycap' dist/index.html` includes the nav keys. In the browser on `/design/buttons/` (preview), `evaluate_script`: the theme-toggle `#theme-switcher` has class `button-ghost` and no `keycap`; its `aria-label` is `Dark mode`. Run `astro check` and `lint`.
- [ ] **Step 5: Commit.** `git checkout -b feat/2027-components` first (once), then `git add -A && git commit -m "feat: Button renders as keycap (ghost unchanged)"`.

---

### Task 2: Raised Tag

**Files:**
- Modify: `scripts/check-contrast.mjs`, `src/styles/components/tag.css`

**Interfaces:**
- Consumes: `--th-key-cream-*`, `--th-key-terracotta-*`, `--th-key-edge`.
- Produces: `Tag` unchanged API. `tag-solid` default = cream chip (border `2px solid var(--th-key-edge)`, gradient `face-hi` to `face-lo`, `box-shadow: 0 2px 0 var(--th-key-edge)`, text `--th-key-cream-text`); `tag-solid-primary` = terracotta tokens. Hover lifts 1px (off under reduced motion). `tag-text` unchanged.

- [ ] **Step 1: Write the failing check.** Add pairs `['key-cream-text','key-cream-face-hi',4.5]` is already covered, so test the new behavior in the browser: after build, on `/blog/tags/` `evaluate_script` reads `getComputedStyle(document.querySelector('.tag-solid')).borderTopWidth`. Expected now: `0px` (FAIL).
- [ ] **Step 2: Implement `tag.css`.** Replace `.tag-solid`, `.tag-solid-primary` rules as above, using plain CSS with the tokens (no `@apply` of custom classes). Add `@media (prefers-reduced-motion: reduce)` removing the hover transform.
- [ ] **Step 3: Verify.** Build; same `evaluate_script` now returns `2px`. Check both modes: `evaluate_script` toggles `document.documentElement.classList.toggle('dark')` and reads `color` and `backgroundColor` of a `.tag-solid`; confirm they differ from the light values. Run `pnpm -s contrast`.
- [ ] **Step 4: Commit.** `git add -A && git commit -m "feat: raised Tag chips"`.

---

### Task 3: Book and Shelf

**Files:**
- Create: `src/components/Book.astro`, `src/components/Shelf.astro`, `src/styles/components/shelf.css`, `src/styles/theme/surface-tokens.css`, `src/pages/design/shelf.mdx`
- Modify: `src/styles/theme/index.css` (import), `src/styles/components/index.css` (import), `scripts/check-contrast.mjs`

**Interfaces:**
- Produces: tokens `--th-wood-hi` / `--th-wood-lo` (light `#b17f57`/`#7d5236`, dark `#6b4a33`/`#3d2a1e`), decorative only.
- Produces: `Book.astro` props: `href: string`, `title: string`, `meta?: string`, `colors?: 'terracotta'|'teal'|'mustard'|'cream'|'navy'` (default `'terracotta'`), `height?: 'sm'|'md'|'lg'` (default `'md'`, heights 136/156/176px, decorative). Renders `<li class="book-item"><a class="book book-<c> book-<h>" href><span class="book-title">title</span><span class="book-meta">meta</span></a></li>`. Cover = `face-lo`, spine edge (left 10px) = `side`, text = key text token.
- Produces: `Shelf.astro` props: `title: string`, `level?: 2|3` (default `2`), `href?: string`, `linkLabel?: string`. Renders `<section aria-labelledby>`, heading `h<level>`, optional link, `<ul class="shelf-books">` with the default slot (Books), and a plank. Row height is fixed by `--shelf-row: 210px`; the plank is a repeating background on `.shelf-books` at the bottom of each row, so wrapped rows each get one.

- [ ] **Step 1: Write the failing test.** Create `src/pages/design/shelf.mdx` with two shelves (4 books, 3 books) using real titles ("Intro to Intersection Observer", "Best practice loading a web"). Run `pnpm build`. Expected: FAIL (`Book`/`Shelf` unresolved).
- [ ] **Step 2: Implement.** Create the components and `shelf.css`. Book hover/focus: `translateY(-8px) rotate(-1.5deg)`; focus-visible outline from the global ring; reduced motion removes the transform. `.shelf-books`: `display:flex; flex-wrap:wrap; align-items:flex-end; align-content:flex-start; gap:0 12px; padding:12px 44px 0;` each `.book-item` has `height: var(--shelf-row); padding-bottom: 16px; display:flex; align-items:flex-end`; plank background `repeating` via `background-image: linear-gradient(to bottom, transparent calc(var(--shelf-row) - 16px), var(--th-wood-hi) calc(var(--shelf-row) - 16px), var(--th-wood-lo) var(--shelf-row)); background-size: 100% var(--shelf-row);`. Under 640px: `.book-item { flex: 0 0 calc(50% - 6px); }`.
- [ ] **Step 3: Verify structure.** `pnpm build`, then `grep -c 'class="book book-' dist/design/shelf/index.html` (expect 7) and `grep -c '<ul class="shelf-books"' ...` (expect 2).
- [ ] **Step 4: Verify layout in the browser.** Preview `/design/shelf/`, `resize_page` to 320x700, `evaluate_script`: `document.documentElement.scrollWidth <= window.innerWidth` is `true`; each `.book-item` has height `210px`. Then `emulate` reduced motion and read a `.book` `transitionDuration` (about 0).
- [ ] **Step 5: Verify heading order.** `evaluate_script` lists `h1,h2,h3` text in order; the page has one `h1` then the shelf `h2`s.
- [ ] **Step 6: Commit.** `git add -A && git commit -m "feat: Book and Shelf components"`.

---

### Task 4: PaperCard and StickyNote

**Files:**
- Create: `src/components/PaperCard.astro`, `src/components/StickyNote.astro`, `src/styles/components/surface.css`, `src/pages/design/surfaces.mdx`
- Modify: `src/styles/theme/surface-tokens.css`, `src/styles/components/index.css`, `scripts/check-contrast.mjs`

**Interfaces:**
- Produces: tokens `--th-note-bg` / `--th-note-text` (light `#ffe27a` / `#2b1d14`, dark `#5a4636` / `#f6e9d8`).
- Produces: `PaperCard.astro` props: `as?: 'div'|'article'|'li'` (default `'div'`), `tape?: boolean`, `lines?: boolean`, `tilt?: boolean`; slot. Surface = `--th-key-cream-face-hi`, text `--th-key-cream-text`, border `2px solid var(--th-key-edge)`, layered shadow, tape = 70x20px translucent mustard strip. `lines` adds ruled-line background (off by default, never behind long body text). `tilt` = `rotate(-1deg)`.
- Produces: `StickyNote.astro` props: `label?: string` (visible bold prefix, for example "Bottom line:"); slot. Uses note tokens, `rotate(-0.6deg)`, folded bottom-right corner.

- [ ] **Step 1: Write the failing test.** In `check-contrast.mjs` add pairs `['note-text','note-bg',4.5]` (tokens do not exist yet). Run `pnpm -s contrast`. Expected: FAIL (missing token, light and dark).
- [ ] **Step 2: Implement tokens.** Add the note tokens to `surface-tokens.css` (light in `:root`, dark in `:root.dark`). Run `pnpm -s contrast`. Expected: PASS.
- [ ] **Step 3: Write the failing page.** Create `surfaces.mdx` with a `PaperCard` (tape, tilt, lines each shown once) and two `StickyNote`s. Build. Expected: FAIL (components missing).
- [ ] **Step 4: Implement components and `surface.css`.** Hover on tilted cards straightens it (removed under reduced motion).
- [ ] **Step 5: Verify.** Build passes. `grep -c 'paper-card' dist/design/surfaces/index.html` (expect 3 or more). Browser: note text contrast is covered by the script; check `evaluate_script` that `.sticky-note` `transform` is a rotation of 1deg or less.
- [ ] **Step 6: Commit.** `git add -A && git commit -m "feat: PaperCard and StickyNote"`.

---

### Task 5: Input

**Files:**
- Create: `src/components/Input.astro`, `src/styles/components/input.css`, `src/pages/design/forms.mdx`
- Modify: `src/styles/theme/surface-tokens.css`, `src/styles/components/index.css`, `scripts/check-contrast.mjs`

**Interfaces:**
- Produces: tokens `--th-field-bg` (light `#fffdf7`, dark `#120d0a`).
- Produces: `Input.astro` props: `label: string` (required, always rendered as a visible `<label>`), `id: string` (required), `name?: string`, `type?: string` (default `'text'`), `placeholder?: string`, `hint?: string` (rendered under the field and tied with `aria-describedby`), `required?: boolean`. Field: `2px solid var(--th-key-edge)`, inset shadow, text `--th-content`, placeholder `--th-captions`, focus ring from the global rule.

- [ ] **Step 1: Write the failing test.** Add pairs `['content','field-bg',4.5]`, `['captions','field-bg',4.5]`, `['key-edge','field-bg',3]`. Run `pnpm -s contrast`. Expected: FAIL (missing token).
- [ ] **Step 2: Implement token and verify.** Add `--th-field-bg`. `pnpm -s contrast`. Expected: PASS. If a pair fails, adjust only the field background.
- [ ] **Step 3: Write the failing page.** `forms.mdx` with one field with hint and one required field. Build. Expected: FAIL (component missing).
- [ ] **Step 4: Implement component and CSS.** Then build. `grep -c '<label' dist/design/forms/index.html` (expect 2) and `grep -c 'aria-describedby' ...` (expect 1).
- [ ] **Step 5: Commit.** `git add -A && git commit -m "feat: Input with visible label"`.

---

### Task 6: Docs and gate

**Files:**
- Modify: `AGENTS.md` (new "Design system components" section), `src/pages/design/index.mdx` (links to the three new pages)

- [ ] **Step 1: Docs.** Add a section to `AGENTS.md`: a table of each component, its props in one line, and its reference page; the token files; the rule "new token pair = new line in `scripts/check-contrast.mjs` first"; `SITE_URL` for builds.
- [ ] **Step 2: Full checks.** Run the four verify commands from Global Constraints. Expected: all pass.
- [ ] **Step 3: Lighthouse.** On `/design/buttons`, `/design/shelf`, `/design/surfaces`, `/design/forms`: accessibility 100 in dark (navigation mode) and in light (set `localStorage.theme` to `{"mode":"light","name":"default-light"}`, reload, snapshot mode). Fix findings caused by the new components. `is-crawlable` on design pages is intended.
- [ ] **Step 4: Visual check.** Screenshot `/`, `/blog/`, `/blog/tags/`, `/projects/` in dark and light. Fix any page that broke from the Button or Tag restyle (clipped text, misaligned icons).
- [ ] **Step 5: Commit and merge.** `git add -A && git commit -m "docs: design system components"`, then `git checkout feat/2027-design && git merge --no-ff feat/2027-components && git push`. Do not touch `master`.

---

## Self-review

- **Spec coverage (Phase 1b rows):** Keycap done in Phase 1; Button (task 1), Badge as raised `Tag` (task 2), Book and Shelf (task 3), PaperCard and StickyNote (task 4), Input (task 5), docs and gate (task 6). The spec's `Badge` name is the existing `Tag`; I did not add a duplicate component.
- **Types:** `Book.colors` and `Button` mapping use the same five key color names as `Keycap`.
- **Deferred:** Pagination as keys and filter keys (Phase 4), post "Bottom line" content wiring (Phase 2), palette selector (Phase 7).
