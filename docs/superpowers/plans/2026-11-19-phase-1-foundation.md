# Phase 1 Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the new design foundation (warm palette, fonts, accessibility base, keycap component, keycap nav) so later phases only compose it.

**Architecture:** Keep the existing `--th-*` CSS variable names, so every current component re-colors without edits. Add new `--th-key-*` tokens and a `Keycap.astro` component built with `cva`, like `Button.astro`. A Node script checks WCAG contrast on the token file and acts as the test, because the repo has no test runner.

**Tech Stack:** Astro 7, Tailwind 4 (`@config` + CSS variables), `class-variance-authority`, Fontsource, pnpm 12, Node 26.

**Spec:** `docs/superpowers/specs/2026-11-19-site-revamp-design.md` (mockups in `docs/superpowers/specs/mockups/`).

**Scope note:** The spec has 6 phases. This plan covers **Phase 1 only**. Write one plan per later phase, after the previous phase ships. Phases 2-6 depend on what Phase 1 produces (tokens and `Keycap`).

## Global Constraints

- Branch: `feat/revamp-foundation`, one PR. Never commit to `master`.
- Keep all `--th-*` variable names. Dark mode stays `:root.dark`.
- Contrast: text 4.5:1, UI borders 3:1, body text 7:1 (`content` and `headings` on `base-100`).
- Reduced motion must disable press, lift, and tilt effects (`prefers-reduced-motion: reduce`).
- Depth is decoration. Every key has a real border and text label.
- No URL, feed, or content schema change in this phase.
- Palette seed (light): cream `#fdf0e3`, ink `#2b1d14`, terracotta `#b8442a`, teal `#1f6f66`, mustard `#e9c46a`, navy `#264653`.
- Run before every commit: `pnpm lint`. Run before the PR: `pnpm build`, `SITE_URL=https://www.mazipan.space pnpm astro check`, `pnpm lint`, `pnpm contrast`.
- Formatting: Prettier owns it (`pnpm format`). Use `@/*` import aliases.
- No long-dash characters in code comments or copy. Use "-".

## Review Focus

1. **Visited links in dark mode:** `--th-links-visited` must keep 4.5:1 on `base-100` (task 1 test).
2. **Forced colors (Windows high contrast):** keys must stay visible with only borders (task 3 test).
3. **Duplicate `<main>` landmark:** layouts may already render `<main>`; the skip target must exist exactly once per page (task 2 test).
4. **Prose and code blocks:** `tailwind.config.ts` typography and Expressive Code read theme vars. Text must stay readable on `base-code` (task 1 test).
5. **View transitions:** `ClientRouter` swaps the page. The skip link and current-page key state must update on navigation (task 4 test).

## File Structure

| File | Responsibility |
|---|---|
| `scripts/check-contrast.mjs` | Parse tokens, compute WCAG ratios, exit 1 on failure |
| `src/styles/theme/theme-default.css` | Replace values with the warm palette (light and dark) |
| `src/styles/theme/keycap-tokens.css` | `--th-key-*` tokens (light and dark) |
| `src/styles/components/keycap.css` | `.keycap*` classes: bevel, travel, states, forced colors |
| `src/styles/base/a11y.css` | Focus ring, reduced motion, base type scale |
| `src/components/Keycap.astro` | Keycap button/link component |
| `src/components/SkipLink.astro` | Skip to content link |
| `src/layouts/Base.astro` | Mount skip link, one `<main id="main">` |
| `src/components/Header.astro` | Nav as keys with `aria-current` |
| `src/pages/design/keycaps.mdx` | Visual reference page for every variant |
| `tailwind.config.ts`, `BaseHead.astro`, `package.json` | Fonts, `contrast` script |

---

### Task 1: Palette tokens with a contrast test

**Files:**
- Create: `scripts/check-contrast.mjs`
- Create: `src/styles/theme/keycap-tokens.css`
- Modify: `src/styles/theme/theme-default.css` (all values), `src/styles/theme/index.css` (import keycap tokens), `package.json` (script `"contrast": "node ./scripts/check-contrast.mjs"`), `.gitignore` (add `.superpowers/`)

**Interfaces:**
- Produces: CSS variables `--th-*` (same names as today) and `--th-key-<color>-{face-hi,face-lo,side,text}` for `<color>` in `terracotta|teal|mustard|cream|navy`, in `:root` and `:root.dark`.
- Produces: `contrastRatio(fg: string, bg: string): number` and `parseTokens(css: string, scope: ':root' | ':root.dark'): Record<string, string>` inside the script.

- [ ] **Step 1: Write the failing test.** Create `scripts/check-contrast.mjs`. It reads both CSS token files, resolves each pair for each scope, and prints one line per pair. Pairs and minimum ratios:
  - `content` on `base-100`: 7; `headings` on `base-100`: 7; `content` on `base-200`: 4.5; `captions` on `base-100`: 4.5; `links` on `base-100`: 4.5; `links-visited` on `base-100`: 4.5; `links-hover` on `base-100`: 4.5
  - `primary-content` on `primary`: 4.5; `primary-content` on `primary-hover`: 4.5; `secondary-content` on `secondary`: 4.5; `accent-content` on `accent`: 4.5; `content` on `base-code`: 4.5
  - for each key color: `key-<c>-text` on `key-<c>-face-hi` and on `key-<c>-face-lo`: 4.5
  - Exit code 1 if any pair fails or any token is missing or not a 6-digit hex.
- [ ] **Step 2: Run it.** `node scripts/check-contrast.mjs`. Expected: FAIL (current values use `theme('colors...')`, not hex).
- [ ] **Step 3: Implement the tokens.** Rewrite `theme-default.css` with hex values, same variable names. Starting values (light): `base-100 #fdf0e3`, `base-200 #f3e3d0`, `base-300 #e8d3ba`, `base-code #efe0c8`, `content #2b1d14`, `headings #2b1d14`, `captions #5b4a3d`, `primary #b8442a`, `primary-hover #9a3620`, `primary-content #ffffff`, `links #b8442a`, `links-hover #9a3620`, `links-visited #7d2c19`, `secondary #e9c46a`, `secondary-content #2b1d14`, `accent #1f6f66`, `accent-content #ffffff`, `primary-50/100/200 #fff4ec/#fbe3d3/#f6cdb4`, `primary-base-200/300 #e3eef0/#cfe3e6`. Starting values (dark, warm lamp-lit wood): `base-100 #1c1410`, `base-200 #2a1f18`, `base-300 #120d0a`, `base-code #2a1f18`, `content #eadccb`, `headings #f6d98b`, `captions #b9a590`, `primary #f2b36b`, `primary-content #1c1410`, `links #f2b36b`, `secondary #e9c46a`, `accent #5bc0b0`, `accent-content #1c1410`. Keep radius vars. In `keycap-tokens.css` set key tokens from the mockup (`docs/superpowers/specs/mockups/keycaps.html`): terracotta `#c94f33/#c64b2e/#7d2c19/#ffffff`, teal `#2c8579/#1f6f66/#124540/#ffffff`, mustard `#f2d27c/#e9c46a/#a98a2f/#2b1d14`, cream `#fffdf7/#f1e3c9/#b7a785/#2b1d14`, navy `#37606f/#264653/#14262d/#ffffff` (order: face-hi, face-lo, side, text). Dark overrides: cream becomes `#5a4636/#4a3b30/#1c1410/#f6e9d8`. **Rule:** if a pair fails, darken the face (never lighten the text) until it passes. Keep `face-hi` at most 8% lighter than `face-lo`.
- [ ] **Step 4: Run it.** `pnpm contrast`. Expected: every line PASS, exit code 0. Then `pnpm build`. Expected: build passes, site shows the warm palette.
- [ ] **Step 5: Commit.** `git checkout -b feat/revamp-foundation`, then `git add -A && git commit -m "feat: warm palette tokens with contrast check"`.

---

### Task 2: Fonts and the accessibility base

**Files:**
- Modify: `package.json` (add fonts), `src/components/BaseHead.astro` (imports), `tailwind.config.ts` (`fontFamily`), `src/layouts/Base.astro`, `src/styles/base/index.css` (import `a11y.css`)
- Create: `src/styles/base/a11y.css`, `src/components/SkipLink.astro`

**Interfaces:**
- Produces: Tailwind `font-serif` = Fraunces Variable (display), `font-sans` = Atkinson Hyperlegible Next Variable (body), `font-mono` unchanged. `SkipLink.astro` has no props. The page has exactly one `<main id="main" tabindex="-1">`.

- [ ] **Step 1: Confirm packages.** Run `pnpm view @fontsource-variable/fraunces version` and `pnpm view @fontsource-variable/atkinson-hyperlegible-next version`. Expected: both print a version. If one does not exist, use the nearest Fontsource variable font with the same role (warm serif display; highly legible sans) and note the change in the PR.
- [ ] **Step 2: Write the failing check.** Run `pnpm build && grep -c 'href="#main"' dist/index.html && grep -c '<main' dist/index.html`. Expected now: first count 0 (FAIL).
- [ ] **Step 3: Install and wire.** `pnpm add @fontsource-variable/fraunces @fontsource-variable/atkinson-hyperlegible-next`; `pnpm remove @fontsource/dela-gothic-one`. In `BaseHead.astro` swap the imports. In `tailwind.config.ts` set `sans` and `serif` families. Run `grep -rn "dela-gothic\|Dela Gothic" src tailwind.config.ts` and fix every hit.
- [ ] **Step 4: Skip link and landmark.** Run `grep -rn "<main" src/layouts src/pages src/components` to find existing landmarks. Keep exactly one `<main id="main" tabindex="-1">` per rendered page: put it in `Base.astro` around `<slot />` and change any nested `<main>` in layouts to `<div>`. `SkipLink.astro` renders `<a href="#main">Skip to content</a>`, visually hidden until focused, then shown at the top-left with a solid background and 3px outline. Mount it first inside `<body>`.
- [ ] **Step 5: `a11y.css`.** Add: (a) `:focus-visible` rule: `outline: 3px solid var(--th-headings); outline-offset: 3px;` plus a `box-shadow: 0 0 0 6px var(--th-base-100)` ring; (b) base type: `body { font-size: 1.0625rem; line-height: 1.7; }` and a `.prose` rule for `1.125rem` with `max-width: 65ch`; (c) `@media (prefers-reduced-motion: reduce)` setting `animation-duration: .01ms !important; transition-duration: .01ms !important; scroll-behavior: auto !important` on `*`.
- [ ] **Step 6: Verify.** `pnpm build`. Run `grep -c 'href="#main"' dist/index.html` (expect 1) and loop `for f in $(find dist -name index.html | head -50); do grep -c '<main' $f; done | sort -u` (expect only `1`). Then `pnpm lint`.
- [ ] **Step 7: Commit.** `git commit -am "feat: fonts, skip link, focus and reduced-motion base"` (use `git add -A` for new files).

---

### Task 3: Keycap component and reference page

**Files:**
- Create: `src/components/Keycap.astro`, `src/styles/components/keycap.css`, `src/pages/design/keycaps.mdx`
- Modify: `src/styles/components/index.css` (import), `src/pages/design/index.mdx` (link to the new page; mirror how `buttons.mdx` is linked)

**Interfaces:**
- Produces: `Keycap.astro` with props `colors?: 'terracotta'|'teal'|'mustard'|'cream'|'navy'` (default `'terracotta'`), `size?: 'md'|'sm'|'square'` (default `'md'`), `pressed?: boolean`, `element?: 'a'|'button'` (default `'button'`), `disabled?: boolean`, plus anchor/button attributes pass-through. `pressed` sets `aria-pressed` on buttons and `aria-current="page"` on links.
- CSS classes: `.keycap`, `.keycap-face`, `.keycap-<color>`, `.keycap-sm`, `.keycap-square`.

- [ ] **Step 1: Write the failing check.** Create `src/pages/design/keycaps.mdx` first. Mirror the layout of `src/pages/design/buttons.mdx`. It renders every color, every size, `pressed`, and `disabled`. Run `pnpm build`. Expected: FAIL (`Keycap` import missing).
- [ ] **Step 2: Implement `Keycap.astro`** with `cva` like `Button.astro`. Markup: outer element (class `keycap`, holds the deep side) wrapping `<span class="keycap-face">` (holds the slot). Disabled link renders a `<span aria-disabled="true">`; disabled button gets `disabled`.
- [ ] **Step 3: Implement `keycap.css`.** Use the mockup `docs/superpowers/specs/mockups/keycaps.html` as the visual spec: side color from `--th-key-<c>-side` as the outer background with `padding-bottom: 8px`; face is a radial gradient from `face-hi` to `face-lo`, with 2px light top and left borders and darker bottom and right borders, inset highlight and shadow. Press: face `translateY(6px)` on `:active`, `[aria-pressed="true"]`, and `[aria-current="page"]`. `.keycap-sm` and `.keycap-square` follow the mockup sizes. `:focus-visible` uses the global ring from task 2, with extra `outline-offset: 4px`. Add `@media (forced-colors: active)` giving `.keycap-face` `border: 2px solid ButtonText` and disabled `GrayText`. Add `@media (prefers-reduced-motion: reduce)` removing the face transition and the hover shift.
- [ ] **Step 4: Verify.** `pnpm build` (expect pass). `pnpm dev`, open `/design/keycaps`. Check by hand: Tab reaches every key, Enter and Space press it, focus ring is visible, `pressed` keys look pushed in, and DevTools "Emulate prefers-reduced-motion" stops all movement. Run `pnpm contrast`.
- [ ] **Step 5: Commit.** `git add -A && git commit -m "feat: keycap component and design reference page"`.

---

### Task 4: Navigation as keys

**Files:**
- Modify: `src/components/Header.astro` (desktop nav and mobile menu), `src/components/HeaderLink.astro` (switch `aria-selected` to `aria-current`, only if still used by the logo link)

**Interfaces:**
- Consumes: `Keycap` from task 3 (`element="a"`, `colors="cream"`, `size="sm"`, `pressed={path === activeNavItemPath}`).
- Produces: nav links with `aria-current="page"` on the active item, in both desktop and mobile menus.

- [ ] **Step 1: Write the failing check.** `pnpm build && grep -c 'aria-current="page"' dist/blog/index.html`. Expected now: 0 (FAIL). Also check `grep -c 'keycap' dist/index.html` returns 0.
- [ ] **Step 2: Implement.** Replace each `HeaderLink` in the two `NAVIGATION_ITEMS.map` blocks with `Keycap`. Keep the `ThemeToggle`, the logo link, and the menu toggle. The mobile menu keys stack in one column, full width. Keep the header's existing open and close script working: do not rename `menu-toggle`, `menu-mobile`, or the `data-menu` attributes.
- [ ] **Step 3: Verify the view-transition case.** `pnpm dev`. In the browser, click `Blog`, then `About`, using the nav. Expected: the pressed key and `aria-current` move to the new page each time without a reload. If the state stays stale, compute `activeNavItemPath` from the new URL inside an `astro:after-swap` handler.
- [ ] **Step 4: Verify.** `pnpm build`, `SITE_URL=https://www.mazipan.space pnpm astro check`, `pnpm lint`, `pnpm contrast`. Expected: all pass. Check the grep from step 1 now returns 1 or more for `/blog/` and 0 for `/`.
- [ ] **Step 5: Commit.** `git add -A && git commit -m "feat: keycap navigation with aria-current"`.

---

### Task 5: Phase gate

**Files:** none new.

- [ ] **Step 1: Full checks.** `pnpm build && SITE_URL=https://www.mazipan.space pnpm astro check && pnpm lint && pnpm contrast`. Expected: all pass.
- [ ] **Step 2: Lighthouse.** Run the Lighthouse accessibility audit on `/`, `/blog/`, one post, and `/design/keycaps` in light and dark mode. Expected: accessibility score 100 on each. Fix any finding that comes from the new tokens or components.
- [ ] **Step 3: Keyboard walkthrough.** Using only the keyboard, on `/` and one post: skip link appears first and jumps to `main`; every nav key, the theme toggle, and the menu toggle show a visible focus ring; the mobile menu opens and closes by keyboard at 375px width.
- [ ] **Step 4: Visual pass.** Scroll `/`, `/blog/`, one post, `/about` in light and dark. List any page that looks broken (low contrast text on an old hard-coded color, for example) in the PR description. Fix only what the tokens broke. Leave layout work to later phases.
- [ ] **Step 5: Open the PR.** Push the branch and open a PR titled `feat: design foundation (revamp phase 1)`. Describe: tokens, fonts, skip link, `Keycap`, keycap nav, `pnpm contrast`, and known mixed-style pages. Use the `gh` skill rules.

---

## Self-review

- **Spec coverage (Phase 1 line):** tokens + light/dark (task 1), fonts (task 2), skip link and focus (task 2), keycap component and toggle keys (task 3), contrast checks (task 1, 5), nav keys decision (task 4), `.gitignore` for `.superpowers/` (task 1). Chip styling for `Tag.astro` is not in this plan: it moves to Phase 4 with the filters.
- **Deferred on purpose:** click sound (Phase 6), post layout (2), home (3), shelves (4), other pages (5).
- **Types:** `Keycap` props in task 3 match the use in task 4.
