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
- Repo allows **squash merge only**. After a squash to `master`, run `git fetch && git merge origin/master` on `feat/2027-design` and push. GitHub deletes the head branch after merge, so push `feat/2027-design` again.
- `gh` is logged in as `mazipan-wego`; repo is `mazipan/mazipan.space`. PR body uses `.github/pull_request_template.md` sections and ends with `🤖 Generated with [Claude Code](https://claude.com/claude-code)`.

## Progress

- [x] Brainstorm, design spec, mockups (browser prototype approved by owner)
- [x] **Phase 1 foundation** - PR #321, master `59d855a`: warm light/dark palette, fonts (Fraunces display, Atkinson Hyperlegible Next body), skip link, focus ring, reduced-motion rule, `Keycap`, keycap nav with `aria-current`, `pnpm contrast`, header/footer a11y fixes
- [x] **Phase 1b components** - PR #322, master `6852995`: `Button` as keycap (`flat` prop for icon-only), raised `Tag`, `Book`+`Shelf`, `PaperCard`, `StickyNote`, `Input`, reference pages, AGENTS.md table
- [x] **Phase 2 post page** - DONE (PR #323 squashed to master; plan `docs/superpowers/plans/2026-11-19-phase-2-post-page.md`): 50ch measure (about 67 characters per line at 18px, line height 1.78), ToC links 24px, reading progress bar, `PostNav` keys (older/newer), optional `bottomLine` frontmatter in a `StickyNote` (sample on the Intersection Observer post), related-post headings h3, category links underlined, and a Tailwind 4 grid bug fixed (ToC now sits beside the post). Lighthouse a11y 100 (dark).
- [x] **Phase 3 home** - DONE (squashed to master): hello hero with avatar and keys, "Right now" strip from real data (`src/constants/now.ts` lines are hand-edited, empty hides), `Shelf` of the 4 newest posts (`src/modules/post/shelf.ts`: Short read < 5 min), 4 `PaperCard` tiles. Phone shelf is a 2-column grid. Copy written from the About page, owner may reword. Photo is still the avatar.
- [ ] **Phase 4 blog lists**: shelves by intent (Short < 5 min, Long >= 5 min, How-tos via optional `kind: 'how-to'` frontmatter, Slides = Carousel collection), filter keys (`Keycap` toggle, `aria-pressed`), pagination as keys with names, active TAG filter not color-only (pre-existing), category icons size on `/blog/categories` (shrank to 17px, was 32px), category links need underline, featured card heading order, CLS 0.055, `Tag` without `href` should render a `<span>` and not look clickable
- [ ] **Phase 5 other pages**: About (long story), Talks (heading order, date chips are `<a>` without href), Projects, Carousel, Friends, Guest book, Resume, 404, Support, Credits. Also: mobile menu is closed only by translate, so closed keys stay in Tab order (use `inert` or `visibility: hidden`)
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
