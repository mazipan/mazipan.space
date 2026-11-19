# 2027 redesign: handoff, checklist, progress

Last updated: 2026-11-19 (end of session 2 depth pass). Keep this file current: tick boxes and edit "Now" after every phase.

## Standing orders from the owner (follow them)

- **Work until the whole redesign is finished.** Do not stop to ask, do not wait for approval.
- Decide by yourself. Owner said "you decide it" and "no need to ask".
- **ABSOLUTE RULE (owner, end of session 2): NO agent ever merges anything into `master` in this redesign task, not even a revert, not even with a green CI. The owner will merge it themself next year (2027).** The only merges an agent may do are into the central branch.
- **MERGE RULE (owner, corrected in session 2 - this overrides anything older):** `feat/2027-design` is the central branch. Phase and session branches may merge into it (PR base = `feat/2027-design`). **NEVER merge anything into `master`.** `master` is merged only by the owner's explicit approval, when the whole redesign is finished. "Auto merge" from the owner means into the central branch only. After a PR into the central branch is squash-merged, GitHub deletes the head branch, so check that `feat/2027-design` still exists; never use it as the head of a PR into `master` (that deletes it on merge).
- **Build budget (owner, session 2):** do NOT make many commits or PRs, each push triggers a Vercel build. Work in the local tree until satisfied, verify locally (build, axe, screenshots), then push ONCE. Open PR #331 (palettes) is the single carrier; fold later work into it and merge once.
- **Always sync docs:** update this handoff, `AGENTS.md`, `KNOWLEDGE.md` and the spec with every change, so nothing lives only in the conversation.
- **Precision:** when buttons or keys appear together, measure width and height in the browser and make them exactly consistent (same height in a row, square keys really square). No brute-force tweaks: understand the box model first, double check before writing design.
- **Owner taste (session 2, later):** not every selected key needs a lamp, decide by need and looks. No duplicate captions (the home photo has no caption). Appearance icon is a palette SVG (`tabler:palette`), not sun/moon.
- **Owner design taste (session 2):** NOT flat. Bevels, elevation, 3D everywhere (header, cards, buttons, headings). 3D bevelled / extruded heading typography is welcome. A subtle texture / pattern page background is liked. Free to RELAYOUT pages, do not just keep the old layout if the new look is better. The current-page cue on keys must not be a white underline (owner dislikes it): use another non-color cue.
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
| Reference pages | `/design/depth` (new), `/design/keycaps`, `/design/buttons`, `/design/shelf`, `/design/surfaces`, `/design/forms` |
| Tokens | `src/styles/theme/` (`theme-default.css`, `keycap-tokens.css`, `surface-tokens.css`) |
| Contrast test | `scripts/check-contrast.mjs` (`pnpm contrast`) |

## Branches and PRs

- Central branch: `feat/2027-design`. Phase branches (for example `feat/2027-post`) are cut from it and merged back directly.
- Repo allows **squash merge only**. A ready-made script that runs the gates, merges, opens the PR, waits for CI, squashes and syncs is `docs/superpowers/ship-phase.sh` (usage in its header; copy it to `.superpowers/tmp/` or run it with `bash`). You need a PR body file; see earlier PRs (#321-#325) for the format.
- Repo allows **squash merge only**. GitHub deletes a PR's head branch after merge. Incident in session 2: PRs #328-#330 were wrongly squash-merged into `master` (and #328 deleted `feat/2027-design`, recreated from the `master` tip). The owner asked to revert them and, explicitly, to merge that revert: PR #332 (revert branch `revert/master-to-central`) was squash-merged into `master` at the owner's direct request (commit 020482a). `master` equals the #326 state again. This was the ONLY merge to master allowed in session 2; the absolute rule above still stands for everything else. All redesign work after #326 (Phase 5b cards, Phase 5 part 2, Phase 6 part 1, and the open depth/palette PR #331) lives ONLY on `feat/2027-design`.
- **When the whole redesign is finished** (owner approves), one PR `feat/2027-design` -> `master`. GOTCHA: `master` contains the revert commit of #328-#330 (020482a). A plain merge or squash of the central branch would NOT bring that reverted work back (the revert wins on the master side). First put the revert of the revert on `master` (or open the final PR from a branch where you `git revert <revert commit>` on top of the central branch work), then verify with `git diff origin/master origin/feat/2027-design` that nothing is lost. Never merge `master` into `feat/2027-design` before that (it would pull the revert into the central branch).
- Older phases #321-#326 were merged to `master` by the first session (under the old rule). The owner has not asked to revert those. Ask before touching them.
- `gh` is logged in as `mazipan-wego`; repo is `mazipan/mazipan.space`. PR body uses `.github/pull_request_template.md` sections and ends with `🤖 Generated with [Claude Code](https://claude.com/claude-code)`.

## Progress

- [x] Brainstorm, design spec, mockups (browser prototype approved by owner)
- [x] **Phase 1 foundation** - PR #321, master `59d855a`: warm light/dark palette, fonts (Fraunces display, Atkinson Hyperlegible Next body), skip link, focus ring, reduced-motion rule, `Keycap`, keycap nav with `aria-current`, `pnpm contrast`, header/footer a11y fixes
- [x] **Phase 1b components** - PR #322, master `6852995`: `Button` as keycap (`flat` prop for icon-only), raised `Tag`, `Book`+`Shelf`, `PaperCard`, `StickyNote`, `Input`, reference pages, AGENTS.md table
- [x] **Phase 2 post page** - DONE (PR #323, 9dd3c8c; plan `docs/superpowers/plans/2026-11-19-phase-2-post-page.md`): 50ch measure (about 67 characters per line at 18px, line height 1.78), ToC links 24px, reading progress bar, `PostNav` keys (older/newer), optional `bottomLine` frontmatter in a `StickyNote` (sample on the Intersection Observer post), related-post headings h3, category links underlined, and a Tailwind 4 grid bug fixed (ToC now sits beside the post). Lighthouse a11y 100 (dark).
- [x] **Phase 3 home** - DONE (PR #324, 63c3603): hello hero with avatar and keys, "Right now" strip from real data (`src/constants/now.ts` lines are hand-edited, empty hides), `Shelf` of the 4 newest posts (`src/modules/post/shelf.ts`: Short read < 5 min), 4 `PaperCard` tiles. Phone shelf is a 2-column grid. Copy written from the About page, owner may reword. Hero photo is now the owner's real photo in a polaroid (session 2).
- [x] **Phase 4 blog lists** - DONE (PR #325, a4f305d): `/blog` shelves by mood (`getPostShelves` in `src/modules/post/shelf.ts`; How-tos = `kind: how-to` or category tutorials; Slides from the carousel collection), pagination as named keys, selected tag filter underlined with `aria-current`, `Tag` without `href` renders a `<span>`, category icons 24px, heading order. Lighthouse `/blog/` 100. Still open for lists: CLS 0.055 not investigated; explore pages not re-audited in light mode.
- [x] **Phase 5b NON-FLAT CARDS - BUILT (session 2, on branch `ccr-a07b67f3-mvt1id`, draft PR; owner has not seen screenshots yet)**. Remaining: Lighthouse on `/blog`, `/projects`, `/talks`, `/carousel`, home (not run, no Lighthouse in the cloud container); `/` has 16px horizontal overflow from `.home-strip -mx-4` (older). Built parts: `StackCard`, `PolaroidCard`, `TicketCard`, `DeckCard` + `.card-link` stretched link, CSS in `surface.css`; `PostCardSmall`/`PostCardFeatured` = index card (tab = category text, tone from `getCardTone`), `ProjectCard` = polaroid, `CarouselCard` = deck, talks = ticket. Cards no longer show tag links (one link per card); `withSeparator` prop removed. `/design/cards` rewritten. Original brief: Owner: "I am bored of flat, cards also need a look, better not to design an ordinary flat card". All card types are still flat: `PostCardSmall`, `PostCardFeatured`, `ProjectCard`, `CarouselCard`, talk list items. Mockup with 4 directions: `docs/superpowers/specs/mockups/cards.html` (open in a browser, has a dark toggle).
  - Default decision (owner said "you decide"): posts = **A index card** (stacked sheets, category tab, punched hole), projects = **B polaroid** (tape, caption, small tilt), talks = **C ticket stub**, slide decks = **D stacked deck**. Show the result to the owner in screenshots.
  - Build as reusable parts first (like Phase 1b): extend `PaperCard` (`variant: 'stack' | 'polaroid' | 'ticket'`, `tab` label prop) or add `StackCard`, `PolaroidCard`, `TicketCard`, `DeckCard`; reference page `/design/cards` (exists, old) rewritten; then swap the card components. Keep: heading level prop, one link per card (stretched link, no nested links), transition names used by `PostCardSmall` (view transitions), image `Image` components.
  - Rules: 2px edge (`--th-key-edge`, 3:1), tilt up to 1.5deg, hover lift and straighten off under reduced motion, no ruled lines behind long text, category/kind shown as text. Add contrast pairs for any new surface (`captions` on paper in dark is 3.74:1, fix with a lighter caption token on paper).
  - Check at 320px (no horizontal scroll, stacked edges do not overflow), Lighthouse 100 on `/blog`, `/projects`, `/talks`, `/carousel`, home.
- [~] **Phase 5 other pages** (part 2 done in session 2: about, alert, carousel contrast, axe audit; header is now a 3D tray with colored keycaps, theme key round) - PARTLY DONE (part 1 = PR #326, 46c7432, on master; branch `feat/2027-pages` can be deleted; start part 2 from `feat/2027-design`). Continue from the checklist below.
  - [x] Global: empty `description: ''` on many pages overrode the site description (SEO). `BaseHead.astro` now falls back to `DEFAULT_METADATA.description`
  - [x] Mobile menu: closed menu is now `invisible` (keys left the Tab order) - `Header.astro`
  - [x] About: headings h3 -> h2. Talks: talk titles h2. `ProjectCard`: h2. Resume: hard-coded grays replaced by `text-captions` / `text-headings`, h3 -> h2
  - [x] Carousel index: faded labels use `text-captions`; `CarouselCard` `aria-label` removed (it did not match the visible text)
  - [x] `CarouselViewer.tsx`: hidden slides are `inert`, dot buttons are 24px targets (8px dot inside), faded text 0.75 opacity
  - [x] `Giscus.astro`: `min-h-[360px]` (guest-book layout shift 0.441 -> 0.247)
  - [x] Lighthouse a11y 100 (dark, navigation mode): `/friends`, `/resume`, `/carousel`, a carousel slide page, `/guest-book`
  - [ ] Re-run Lighthouse on `/about`, `/talks`, `/projects` (fixed but not re-audited; before: 98, 98, 98)
  - [x] Audit with axe-core (script idea: Playwright + `axe-core`, dark and light) on `/`, `/blog`, `/projects`, `/talks`, `/carousel`, `/about`, `/support`, `/credits`, `/friends`, `/resume`, `/guest-book`, `/blog/tags`, `/blog/categories`, 404, two posts: 0 violations after the carousel caption fix. Not yet axe-checked: `/projects/<slug>`, `/blog/explore/*`
  - [ ] Guest-book layout shift is still 0.247 (Giscus iframe loads late): try a taller reserved height or a skeleton
  - [ ] `/projects`: Lighthouse best-practices 96, `image-aspect-ratio` (cards crop images with `aspect-[1.75] object-cover`); fix by setting each image's real ratio or accept and note
  - [x] DONE (ocean, sunset, forest gradient ends darkened to >= 5.18:1 with white) Carousel slide themes (7 gradients in `src/schemas/carousel.ts` / `CarouselViewer.tsx` `THEMES`) use white text; axe skips gradients, so compute contrast of each gradient end against white and darken any below 4.5:1 (large text 3:1)
  - [x] About restyled: sections in `PaperCard` (hire card has tape), photo is a `PolaroidCard`, words unchanged
  - [x] `alert.css` rewritten: warm paper tinted by a key color, thick colored left edge, text from `--th-content` / `--th-headings`
  - [ ] Phase done when every public page has Lighthouse a11y 100 in dark (navigation) and light (snapshot) and the checklist above is ticked
- [x] **Phase 8 DEPTH PASS (owner request in session 2) - DONE, pushed once on PR #331's branch**:
  - Header: bevelled tray, colored keys, every key exactly 48px (`keycap-nav`), theme key round 48x48, burger 48x48, pressed/current = lamp on the rim (underline removed)
  - Page texture (grain + dot grid), raised `.sheet` for long text (post body, ToC, About-style pages via `Page.astro`, resume timeline), contrast derived and checked in `pnpm contrast` (AAA)
  - 3D titles (`.b-h1`, `.title-3d`, prose h1 extruded in palette color; h2/h3/shelf titles letterpress), breadcrumbs `.crumb`, `.link-key`, `.frame` hero image, quote/img depth, prose colors from tokens (no more slate blue), measure `36.5rem`
  - Home: pinboard with pinned notes, hero h1 extruded. Hero image = the owner's photo (`mazipan-in-black.jpg`, same as About) in a `PolaroidCard` with tape; the old blob avatar, `GradientBlob.astro` and the shuffle-gradient key were removed (owner: the blob is the previous design and does not fit). Friends cards = paper cards. Resume: bead dots, raised tags. Pagination, palette and sound keys all 48px. Carousel viewer prev/next = round keycaps, thicker progress track
  - Later in session 2: lamp is opt-in (`NavKey lamp`: header menu + popover state keys only), filters and pagination use color + pressed; fixed header offsets now come from `--header-h`; burger menu panel is a `.sheet`; ToC wrapper has no opaque box; appearance key uses the palette icon; photo captions removed.
  - Verified: contrast (8 scopes), astro check, lint, build, axe on pages and palettes, measured key groups. NOT verified: Lighthouse (not available in the cloud container), keyboard walkthrough by a human
  - Ideas not done: texture variants per palette, 3D on `h2` inside post body (kept plain for readability), footer columns still plain text links
- [x] **Phase 9 appearance popover, featured shelf, shared keys (owner request, session 2)**: one header key (`ThemePopover`) opens one popover with light/dark, palette and key sounds (footer palette picker and sound toggle and the old `ThemeToggle` removed, saves space); `NavKey` is the shared 48px key used by header, pagination, post prev/next, explore filters, ToC button, back-to-top and the popover; selected = pressed + lamp everywhere (tags too); post prev/next are equal-height `.nav-card`s; pagination hides first/last on phones (7 keys do not fit); `/blog` starts with a Featured shelf (frontmatter `featured: true`), the old big featured cards were removed (`FeaturedPostList` deleted). Verified: keyboard (Escape returns focus, outside click closes), theme persists, axe 0 violations, key heights measured.
- [~] **Phase 6 polish** (session 2 done: opt-in key click sound `KeySoundToggle` in the footer with localStorage `key-sound`; `Shelf` accepts `id`; disabled `Button` always has `aria-disabled`; footer is a wood plank with a round keycap back-to-top. Also done (later in session 2): `Keycap` `current` prop and Header use `aria-current="true"` for the section key on sub-pages (`page` only on the page itself), reduced-motion audit (nav key hover, friends card hover), scripted keyboard walkthrough on home (Tab order logical, 3px focus indicator on every control). Still open: Lighthouse and a human keyboard + screen reader pass), original list: opt-in click sound (footer toggle, off by default, remember choice, WebAudio like `keycaps.html` mockup), reduced-motion audit, add `captions`/`links` contrast pairs on `paper-card` and `sticky-note` surfaces (dark captions is 3.74:1 on cream), `Shelf` id uniqueness, disabled ghost/flat `Button` `aria-disabled`, section keys use `aria-current="true"` not `page` on sub-pages, Lighthouse a11y 100 on every page in light AND dark, keyboard walkthrough, axe
- [x] **Phase 7 selectable palettes - DONE (session 2)**: ocean, forest, plum (light and dark) in `src/styles/theme/palettes.css`, `PaletteSwitcher` in the footer, `getNextTheme` keeps the palette and flips the mode, `pnpm contrast` checks 8 scopes (280 pairs), axe clean in every palette. Duplicate `#theme-switcher` id removed (data attribute). Not done: free custom accent color. Original plan: repo already has the skeleton (`src/constants/theme.ts` `THEMES`, commented `green-light/green-dark`, `data-theme` attribute, `src/components/ThemeScript.astro`). Add 3-4 palettes (for example Warm paper default, Ocean, Forest, Plum, High contrast), each with light and dark values, as `[data-theme='<name>-light|dark']` scopes; extend `scripts/check-contrast.mjs` to check every scope; picker as swatch `Keycap`s in the footer; persist in `localStorage` key `theme`. Free custom colors: accent only, guarded by a contrast check
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
