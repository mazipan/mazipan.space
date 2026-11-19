# Knowledge for the next agent (2027 redesign)

Everything the previous session learned that is not obvious from the code. Read `HANDOFF.md` first (orders, checklist), then this file. Update both as you go.

## 1. Owner and decisions (and why)

| Decision | Why |
|---|---|
| Theme "Irfan's bookshelf": warm, personal letter on home, bookshelf for writing | Owner rejected "techy / engineer" (terminal, mission log) as unfriendly to normal readers |
| Tactile "keycap" components (bevel, 6px press travel, 2px edge, optional click) | Owner is bored of flat design, likes real keyboard keys, "clicky, like a real thing" |
| Neumorphism rejected | Low contrast, fails WCAG |
| Glass/blur only rarely | Hurts text contrast and speed |
| Page texture (grain + dots) but long reading text on a solid `.sheet` | Owner likes texture (session 2); readability and AAA contrast first |
| Extruded page titles, letterpress sub headings | Owner asked for 3D bevelled typography (session 2) |
| Current key = lamp on the rim, not an underline | Owner dislikes the white underline (session 2) |
| Header = bevelled tray with colored keys, all 48px tall | Owner asked for non-flat header and exact size consistency |
| Reading measure 65-70ch, body 17-19px, line height 1.7+ | Owner: blog readability first |
| Spotify tile skipped (v1) | Needs credentials and fallback. "Right now" = static data file |
| Scribble-on-photo skipped | Accessibility and effort |
| Hero photo: the owner's photo (`mazipan-in-black.jpg`) in a polaroid; the blob avatar was removed | Owner said the blob is their previous design and looks off in the new one (session 2) |
| UI copy English only | Not answered by owner; posts are mixed `id`/`en`. Revisit if owner wants Indonesian |
| Shelf mapping: Short < 5 min, Long >= 5 min, How-tos by optional `kind: 'how-to'`, Slides = Carousel collection | Chosen by the previous agent, owner accepted "you decide" |
| Selectable palettes as Phase 7 | Owner asked; code already has a theme-name skeleton |
| Components first, then pages | Owner asked for consistency (buttons, badges) |

Owner references they liked (One Page Love): clintbalcom.com (personal voice, Bottom Line callouts, Simple/Detailed toggle, Lightning Round, Now Playing), jasonbriscoe.com (big greeting hero, signature), kuldar (bento grid, signature animation, easter eggs). Take ideas, not copies.

Owner preferences in chat: short answers, bullets, tables, diagrams, no long dashes. They want to see the UI (mockups, screenshots) before deciding. They said: "work until finish", "no need to ask", "you decide".

Session 2 additions: fewer commits and PRs (each push is a Vercel build, push once when satisfied), keep all docs synced, be precise about sizes of buttons shown together, free to relayout pages, prefers non-flat everywhere (bevel, elevation, 3D), likes texture and pattern backgrounds.

## 2. Repo facts (mazipan.space)

- Astro 7 static site, React 19 islands, Tailwind 4 via Vite plugin + `@config tailwind.config.ts`, MDX content, Zod 4 schemas, pnpm 12, Node 26. See `AGENTS.md`.
- Env: every build and preview needs `SITE_URL=https://www.mazipan.space` (Zod-validated in `src/config`). `pnpm build` also runs `pnpm generate` (copies talks and awesome-sde data; needs network). A build line `astro-embed fetch failed` is harmless.
- `astro.config.ts`: `trailingSlash: 'ignore'`, directory output, so built pages are `/about/` (with slash). Compare paths after stripping the slash.
- Layout chain: `Base.astro` (head, skip link, header, footer) -> `Centered.astro` / `FullWidth.astro` (each renders `<main id="main" tabindex="-1">`) -> `Page.astro` / `List.astro` / `Post.astro`. Body wrapper has `mt-[65px]` for the fixed header.
- Theme: `ThemeScript.astro` (inline) reads `localStorage.theme` (JSON `{"mode":"dark","name":"default-dark"}`), sets `:root.dark` and `data-theme`. Default mode is dark. Skeleton for more palettes: `src/constants/theme.ts` (`THEMES`, commented `green-*`), `src/utils/theme.ts`.
- Content: 57 posts in `src/content/post/*.mdx` (Indonesian and English), projects, and carousel JSON in `src/content/carousel/`. Post frontmatter schema in `src/schemas/post.ts` (tags must be in `TAGS`). Sorting and draft filter in `getAllEntries()` (`src/modules/common`). Reading time from a remark plugin (`plugins/`). Blog page: `src/pages/blog/[slug].astro`, layout `src/layouts/Post.astro` (`.my-prose` + `.post-detail` inside `<content-wrapper>`), ToC `src/components/ToC.astro`, related posts `PostListMore.astro` + `PostCardSmall.astro`.
- CSS utilities: `.b-h1..b-h4` (heading styles as classes, not tag selectors), `.centered-px`, `.my-prose` (`src/styles/base/my-prose.css`, typography plugin `prose prose-slate dark:prose-invert`).
- OG images are made with satori and the Space Grotesk font. Keep that package.
- Deploy: Vercel builds `master` (production). CI checks: Vercel and kodiak. There is also a GitHub Pages workflow. Repo allows squash merges only; GitHub deletes the head branch after a merge.
- Tailwind 4 arbitrary values: use underscores, not commas (`grid-cols-[minmax(0,1fr)_300px]`). A comma version silently produced one column and put the post ToC below the article.
- In this font (Atkinson Hyperlegible Next) `1ch` is wide: `50ch` gives about 67 characters per line. Measure characters per line in the browser, do not trust `ch` alone.
- Known old quirks: Header mobile menu script looks up `#main-header` but the header id comes from `SELECTORS.SCROLL_TO_TOP_ID`; mobile menu closes by translate only (keys stay in Tab order); two `ThemeToggle` instances share `id="theme-switcher"`.
- Where `Button` is used: Explore filters (sm, icons), about, resume, talks, 404, categories index, plus icon-only controls (menu toggle, theme toggle = ghost; footer back-to-top and home shuffle = `flat`).

## 3. Design system rules (do not break)

- Colors only through `--th-*` variables in `src/styles/theme/*.css`. New pair of text and background = new line in `scripts/check-contrast.mjs` first (watch it fail), then the token. New token file = add it to `FILES` in that script.
- Contrast: text 4.5:1, UI borders 3:1, post body 7:1. `--th-primary-50/100/200` stay light tints in dark mode (black text sits on them).
- Never meaning by depth or color alone: keys have a 2px edge (`--th-key-edge`), pressed/current keys light a lamp (`::after` on the face) and use `aria-pressed` / `aria-current`.
- Reduced motion: no lift, tilt, press animation. Forced colors: keys keep borders.
- `Keycap` props: `colors` (terracotta, teal, mustard, cream, navy), `size` (md, sm, square), `pressed`, `element` (a, button), `disabled`. `Button` solid/outline = keycaps (`solid-primary` terracotta, `solid-default` navy, `outline-primary` teal, `outline-default` cream); ghost and `flat` stay flat.
- Books reuse the key color tokens (cover = `face-lo`, spine = `side`, text = key text). Shelf rows are exactly `--shelf-row: 210px` so one plank fits under each wrapped row.

## 4. Tooling notes (what worked, what did not)

- Preview: `SITE_URL=https://www.mazipan.space nohup pnpm preview --port 4399 &` serves `dist/`. Rebuild with `pnpm build`, the server picks up new files. It dies between sessions: check with `curl localhost:4399`.
- Chrome DevTools MCP: `take_screenshot` cannot write outside the workspace roots (use inline output); `resize_page` did not change the viewport, use `emulate` with `viewport: "320x700x2,mobile,touch"`; every `emulate` call replaces all settings, so repeat `colorScheme`; if a page id disappears call `list_pages` or `new_page`.
- Lighthouse via MCP: "navigation" mode clears storage so it audits dark. For light: set `localStorage.theme` to `{"mode":"light","name":"default-light"}`, reload, use mode "snapshot". SEO `is-crawlable` fails on `/design/*` on purpose (noindex).
- Prettier: run `npx prettier --write <file>` one file at a time (a long file list broke the batch call). Repo rule: Prettier owns formatting (imports order, Tailwind class order).
- `gh`: account `mazipan-wego`, repo `mazipan/mazipan.space`. Create PRs with `--body-file`. Squash merge. After a squash, merge `origin/master` back into `feat/2027-design` and push it again.
- Workflow used in the first session: superpowers skills (brainstorm -> plan -> execute inline -> one fresh reviewer on the most capable model -> fix pass test-first). Progress ledger lived in `.superpowers/sdd/<plan>/progress.md` (git-ignored, deleted after each phase). You may use the same or a lighter loop, but keep the gates: contrast, astro check, lint, build, Prettier, browser check, Lighthouse.
- Mockups were served by a local "visual companion" server; the tracked copies are in `docs/superpowers/specs/mockups/` (open them in a browser).

## 4b. Session 2 tooling and lessons

- No Lighthouse in the cloud container. Use axe-core in Playwright instead: `npm i axe-core` in a scratch folder, `page.addScriptTag`, `axe.run({runOnly:['wcag2a','wcag2aa','wcag21aa','wcag22aa','best-practice']})`, both modes (set `localStorage.theme`). Run over every route from `dist/**/index.html`.
- Measure key groups: collect `.keycap, .tag` bounding boxes, group by vertical center, flag different heights. This found pagination (50x66 arrows vs 43x46 numbers), wrapped tags and a 46 vs 48 footer mismatch.
- `ch` units scale with the element font: a heading with `max-width: 50ch` is wider than a paragraph. Use rem for a shared column.
- Prose used `prose-slate`, so pages not using tokens looked blue-grey. `my-prose.css` now maps `--tw-prose-*` to tokens.
- `text-shadow` in `em` scales the 3D title extrusion with font size (px looked muddy on small titles).
- Axe reports `color-contrast` on aria-hidden decorative text: render decoration through `::after { content: attr(data-x) }`.
- `getNextTheme` used to cycle through the whole theme list; it now flips light/dark inside the same palette.
- Merge flow without force push: squash merges make `master` diverge from the session branch. Merge `origin/master` into the branch and resolve `HANDOFF.md` / `Footer.astro` with `--ours`.

- Appearance lives in `ThemePopover` (one popover, three groups). It is rendered twice in the header (phone and desktop) so ids must be unique: pass `id`. `getThemeFor(palette, mode)` and the `theme-change` event are the only way to change theme.
- `NavKey` wraps `Keycap`; never hand-size keys. The Astro `tight` prop adds `keycap-nav-tight` (less side padding) for two-column grids.
- After editing JSX with Prettier, string `replace` edits may silently miss: always grep the result (this bit us twice with `tight`).

## 5. State right now

- **Merge rule: central branch `feat/2027-design` only, never `master` without the owner's approval** (see HANDOFF). In session 2 PRs #328-#330 were wrongly merged into `master`; the central branch was recreated from the `master` tip and the three merges were reverted on `master` by PR #332 (020482a), merged at the owner's explicit request (the only allowed master merge). Master equals the #326 state. Never merge `master` into `feat/2027-design`; read the revert gotcha in HANDOFF before the final PR. Open PR #331 targets `feat/2027-design`.

- `master` has Phases 1, 1b, 2, 3, 4 (PRs #321 to #325) and the first part of Phase 5. `feat/2027-design` equals master after each merge. Local mirror branches `feat/2027-post|home|lists|pages` can be deleted.
- Phase 2 (post page) is done and merged. Paragraphs in posts are direct children of `<content-wrapper>` inside `.post-detail`.

## 5b. Lessons from Phases 3-5 (accessibility audits find real bugs)

- Run Lighthouse on every page type, not only the ones you edited. Typical real findings: heading order (a page starts with `h3` under `h1`; use `h2`), hard-coded Tailwind grays like `text-gray-400 dark:text-gray-500` (use `text-captions` / `text-headings`), `opacity-40` on text (use `text-captions`), `aria-label` that differs from visible text, 8px click targets (wrap in a 24px button), hidden content that is still focusable (use `inert` / `invisible`), anchors without `href` (use `<span>`).
- Many pages pass `description: ''` in `src/constants/metadata.ts`. `BaseHead.astro` now falls back to the site description; write real descriptions when you have time.
- Layout shift: Giscus (comments iframe) loads late. A reserved `min-h` helps but does not remove it fully.
- Shelf on phones is a CSS grid (2 columns); two half-width flex items wrapped because of subpixel rounding.
- Pages built in this redesign: home (`src/pages/index.astro`), blog index (`src/pages/blog/[...page].astro`, shelves from `src/modules/post/shelf.ts`), post (`src/pages/blog/[slug].astro` + `PostNav`, `ToC`), pagination keys (`Pagination.astro`).

## 6. Open questions (use the defaults; owner can change later)

- Hero photo (default: current avatar), Indonesian UI copy (default: English), exact palette list for Phase 7 (default: Warm paper, Ocean, Forest, Plum, High contrast), whether to keep click sound (default: keep, opt-in).
