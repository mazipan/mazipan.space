# 2027 redesign: handoff, checklist, progress

Last updated: 2026-11-19. Keep this file current: tick boxes and edit "Now" after every phase.

## Standing orders from the owner (follow them)

- **Work until the whole redesign is finished.** Do not stop to ask, do not wait for approval.
- Decide by yourself. Owner said "you decide it" and "no need to ask".
- Merge finished phases **without asking**: phase branch -> `feat/2027-design` (no PR), then PR `feat/2027-design` -> `master`, wait for CI green, **squash merge**. Never push to `master` directly.
- Output style: short, bullets, tables for 3+ items, no long dashes (use "-"). Commit messages end with the Co-Authored-By trailer from the system reminder.
- Owner wants to SEE UI before deciding: show mockups or screenshots, not walls of text.
- Owner taste: warm, friendly, personal, NOT techy. Tactile 3D "keycap" look (bevels, clicky), not flat. Blog readability and accessibility first. Wants reusable components, consistent look. Wants selectable palettes eventually.

## Goal

Redesign mazipan.space ("Irfan's bookshelf"): home is a warm personal letter, writing is browsed on bookshelves by mood (Short reads, Long stories, How-tos, Slides), post pages are calm and easy to read, UI is built from tactile keycap parts. WCAG 2.2 AA, AAA contrast for post body.

## Where things are

| What | Path |
|---|---|
| Design spec (decisions, rules) | `docs/superpowers/specs/2026-11-19-site-revamp-design.md` |
| Mockups (look and feel), with a README | `docs/superpowers/specs/mockups/` (`prototype-home-and-post.html` = approved prototype, `personal-home.html` = home spec) |
| Deep knowledge (decisions, repo facts, tooling) | `docs/superpowers/KNOWLEDGE.md` |
| Previous agent's memory notes (copy) | `docs/superpowers/memory/` |
| Plans | `docs/superpowers/plans/` (phase 1, 1b, 2 written; write one per later phase) |
| Component docs | `AGENTS.md` section "Design system components" |
| Reference pages | `/design/keycaps`, `/design/buttons`, `/design/shelf`, `/design/surfaces`, `/design/forms` |
| Tokens | `src/styles/theme/` (`theme-default.css`, `keycap-tokens.css`, `surface-tokens.css`) |
| Contrast test | `scripts/check-contrast.mjs` (`pnpm contrast`) |

## Branches and PRs

- Central branch: `feat/2027-design`. Phase branches (for example `feat/2027-post`) are cut from it and merged back directly.
- Repo allows **squash merge only**. A ready-made script that runs the gates, merges, opens the PR, waits for CI, squashes and syncs is `docs/superpowers/ship-phase.sh` (usage in its header; copy it to `.superpowers/tmp/` or run it with `bash`). You need a PR body file; see earlier PRs (#321-#325) for the format.
- Repo allows **squash merge only**. After a squash to `master`, run `git fetch && git merge origin/master` on `feat/2027-design` and push. GitHub deletes the head branch after merge, so push `feat/2027-design` again.
- `gh` is logged in as `mazipan-wego`; repo is `mazipan/mazipan.space`. PR body uses `.github/pull_request_template.md` sections and ends with `🤖 Generated with [Claude Code](https://claude.com/claude-code)`.

## Progress

- [x] Brainstorm, design spec, mockups (browser prototype approved by owner)
- [x] **Phase 1 foundation** - PR #321, master `59d855a`: warm light/dark palette, fonts (Fraunces display, Atkinson Hyperlegible Next body), skip link, focus ring, reduced-motion rule, `Keycap`, keycap nav with `aria-current`, `pnpm contrast`, header/footer a11y fixes
- [x] **Phase 1b components** - PR #322, master `6852995`: `Button` as keycap (`flat` prop for icon-only), raised `Tag`, `Book`+`Shelf`, `PaperCard`, `StickyNote`, `Input`, reference pages, AGENTS.md table
- [x] **Phase 2 post page** - DONE (PR #323, 9dd3c8c; plan `docs/superpowers/plans/2026-11-19-phase-2-post-page.md`): 50ch measure (about 67 characters per line at 18px, line height 1.78), ToC links 24px, reading progress bar, `PostNav` keys (older/newer), optional `bottomLine` frontmatter in a `StickyNote` (sample on the Intersection Observer post), related-post headings h3, category links underlined, and a Tailwind 4 grid bug fixed (ToC now sits beside the post). Lighthouse a11y 100 (dark).
- [x] **Phase 3 home** - DONE (PR #324, 63c3603): hello hero with avatar and keys, "Right now" strip from real data (`src/constants/now.ts` lines are hand-edited, empty hides), `Shelf` of the 4 newest posts (`src/modules/post/shelf.ts`: Short read < 5 min), 4 `PaperCard` tiles. Phone shelf is a 2-column grid. Copy written from the About page, owner may reword. Photo is still the avatar.
- [x] **Phase 4 blog lists** - DONE (PR #325, a4f305d): `/blog` shelves by mood (`getPostShelves` in `src/modules/post/shelf.ts`; How-tos = `kind: how-to` or category tutorials; Slides from the carousel collection), pagination as named keys, selected tag filter underlined with `aria-current`, `Tag` without `href` renders a `<span>`, category icons 24px, heading order. Lighthouse `/blog/` 100. Still open for lists: CLS 0.055 not investigated; explore pages not re-audited in light mode.
- [ ] **Phase 5b NON-FLAT CARDS - TOP PRIORITY (owner request, end of session 1)**. Owner: "I am bored of flat, cards also need a look, better not to design an ordinary flat card". All card types are still flat: `PostCardSmall`, `PostCardFeatured`, `ProjectCard`, `CarouselCard`, talk list items. Mockup with 4 directions: `docs/superpowers/specs/mockups/cards.html` (open in a browser, has a dark toggle).
  - Default decision (owner said "you decide"): posts = **A index card** (stacked sheets, category tab, punched hole), projects = **B polaroid** (tape, caption, small tilt), talks = **C ticket stub**, slide decks = **D stacked deck**. Show the result to the owner in screenshots.
  - Build as reusable parts first (like Phase 1b): extend `PaperCard` (`variant: 'stack' | 'polaroid' | 'ticket'`, `tab` label prop) or add `StackCard`, `PolaroidCard`, `TicketCard`, `DeckCard`; reference page `/design/cards` (exists, old) rewritten; then swap the card components. Keep: heading level prop, one link per card (stretched link, no nested links), transition names used by `PostCardSmall` (view transitions), image `Image` components.
  - Rules: 2px edge (`--th-key-edge`, 3:1), tilt up to 1.5deg, hover lift and straighten off under reduced motion, no ruled lines behind long text, category/kind shown as text. Add contrast pairs for any new surface (`captions` on paper in dark is 3.74:1, fix with a lighter caption token on paper).
  - Check at 320px (no horizontal scroll, stacked edges do not overflow), Lighthouse 100 on `/blog`, `/projects`, `/talks`, `/carousel`, home.
- [~] **Phase 5 other pages** - PARTLY DONE (part 1 = PR #326, 46c7432, on master; branch `feat/2027-pages` can be deleted; start part 2 from `feat/2027-design`). Continue from the checklist below.
  - [x] Global: empty `description: ''` on many pages overrode the site description (SEO). `BaseHead.astro` now falls back to `DEFAULT_METADATA.description`
  - [x] Mobile menu: closed menu is now `invisible` (keys left the Tab order) - `Header.astro`
  - [x] About: headings h3 -> h2. Talks: talk titles h2. `ProjectCard`: h2. Resume: hard-coded grays replaced by `text-captions` / `text-headings`, h3 -> h2
  - [x] Carousel index: faded labels use `text-captions`; `CarouselCard` `aria-label` removed (it did not match the visible text)
  - [x] `CarouselViewer.tsx`: hidden slides are `inert`, dot buttons are 24px targets (8px dot inside), faded text 0.75 opacity
  - [x] `Giscus.astro`: `min-h-[360px]` (guest-book layout shift 0.441 -> 0.247)
  - [x] Lighthouse a11y 100 (dark, navigation mode): `/friends`, `/resume`, `/carousel`, a carousel slide page, `/guest-book`
  - [ ] Re-run Lighthouse on `/about`, `/talks`, `/projects` (fixed but not re-audited; before: 98, 98, 98)
  - [ ] Audit and fix: `/support`, `/credits`, a 404 page, `/blog/tags`, `/blog/categories`, `/projects/<slug>`, `/blog/explore/*` (also in light mode, snapshot)
  - [ ] Guest-book layout shift is still 0.247 (Giscus iframe loads late): try a taller reserved height or a skeleton
  - [ ] `/projects`: Lighthouse best-practices 96, `image-aspect-ratio` (cards crop images with `aspect-[1.75] object-cover`); fix by setting each image's real ratio or accept and note
  - [ ] Carousel slide themes (7 gradients in `src/schemas/carousel.ts` / `CarouselViewer.tsx` `THEMES`) use white text; axe skips gradients, so compute contrast of each gradient end against white and darken any below 4.5:1 (large text 3:1)
  - [ ] About: only headings changed. Restyle with `PaperCard` (for "Available for hire" and sections), keep the owner's words
  - [ ] `src/styles/components/alert.css:33` uses `text-slate-900 dark:text-slate-100` (hard-coded); switch to tokens and add a contrast pair
  - [ ] Phase done when every public page has Lighthouse a11y 100 in dark (navigation) and light (snapshot) and the checklist above is ticked
- [ ] **Phase 6 polish**: opt-in click sound (footer toggle, off by default, remember choice, WebAudio like `keycaps.html` mockup), reduced-motion audit, add `captions`/`links` contrast pairs on `paper-card` and `sticky-note` surfaces (dark captions is 3.74:1 on cream), `Shelf` id uniqueness, disabled ghost/flat `Button` `aria-disabled`, section keys use `aria-current="true"` not `page` on sub-pages, Lighthouse a11y 100 on every page in light AND dark, keyboard walkthrough, axe
- [ ] **Phase 7 selectable palettes**: repo already has the skeleton (`src/constants/theme.ts` `THEMES`, commented `green-light/green-dark`, `data-theme` attribute, `src/components/ThemeScript.astro`). Add 3-4 palettes (for example Warm paper default, Ocean, Forest, Plum, High contrast), each with light and dark values, as `[data-theme='<name>-light|dark']` scopes; extend `scripts/check-contrast.mjs` to check every scope; picker as swatch `Keycap`s in the footer; persist in `localStorage` key `theme`. Free custom colors: accent only, guarded by a contrast check
- [ ] Final: whole-site review, update `AGENTS.md`, update this file, announce done

## How to verify (every phase)

```bash
pnpm -s contrast
SITE_URL=https://www.mazipan.space pnpm -s astro check --minimumSeverity error
pnpm -s lint
SITE_URL=https://www.mazipan.space pnpm build          # needs SITE_URL; "astro-embed fetch failed" is a harmless network line
npx prettier --check <each changed file>                 # run per file; batch with a long list breaks
SITE_URL=https://www.mazipan.space pnpm preview --port 4399   # then check pages in a browser
```

- Lighthouse "navigation" mode clears storage, so it audits **dark** (site default). For light: set `localStorage.theme` to `{"mode":"light","name":"default-light"}`, reload, run "snapshot" mode.
- Resize with viewport emulation (`320x700x2,mobile,touch`), not window resize.
- TDD here = reference page or contrast pair first, watch it fail, then implement. New token pair = new line in `scripts/check-contrast.mjs` first. New token file = add to `FILES` in that script.

## Rules and gotchas learned

- Depth is decoration: every key has a 2px edge (`--th-key-edge`, 3:1), pressed/current keys are underlined, never meaning by color or shadow alone.
- `--th-primary-50/100/200` stay LIGHT tints in dark mode (black text sits on them).
- Dark mode is the site default; light needs the stored theme.
- Tailwind 4: `@apply` only real utilities; custom classes via `@utility`. `theme('fontFamily.serif')` works in CSS.
- Layouts `Centered` and `FullWidth` already render `<main id="main" tabindex="-1">`. Do not add another.
- Built paths end with `/`; compare after stripping it (`src/utils/navigation.ts`).
- Reduced motion: lift, tilt, hover shift off. Static tilt up to 1deg is fine.
- Space Grotesk package is kept on purpose (OG image generation uses it).

## Deferred minors (from reviews)

- `Shelf` id built from title only (duplicates possible); `Book`/`PaperCard as="li"` only valid inside a list (documented).
- Disabled ghost/flat `Button` has no `aria-disabled`.
- Talks emoji `mr-2` doubles with keycap face gap.
- `link-in-text-block` on category links (Phase 4), ToC and related-card issues (Phase 2).
