# Knowledge for the next agent (2027 redesign)

Everything the previous session learned that is not obvious from the code. Read `HANDOFF.md` first (orders, checklist), then this file. Update both as you go.

## 1. Owner and decisions (and why)

| Decision | Why |
|---|---|
| Theme "Irfan's bookshelf": warm, personal letter on home, bookshelf for writing | Owner rejected "techy / engineer" (terminal, mission log) as unfriendly to normal readers |
| Tactile "keycap" components (bevel, 6px press travel, 2px edge, optional click) | Owner is bored of flat design, likes real keyboard keys, "clicky, like a real thing" |
| Neumorphism rejected | Low contrast, fails WCAG |
| Glass/blur only rarely | Hurts text contrast and speed |
| Post body on plain paper, no texture | Readability first |
| Reading measure 65-70ch, body 17-19px, line height 1.7+ | Owner: blog readability first |
| Spotify tile skipped (v1) | Needs credentials and fallback. "Right now" = static data file |
| Scribble-on-photo skipped | Accessibility and effort |
| Hero photo: keep current avatar until owner sends one | Not supplied |
| UI copy English only | Not answered by owner; posts are mixed `id`/`en`. Revisit if owner wants Indonesian |
| Shelf mapping: Short < 5 min, Long >= 5 min, How-tos by optional `kind: 'how-to'`, Slides = Carousel collection | Chosen by the previous agent, owner accepted "you decide" |
| Selectable palettes as Phase 7 | Owner asked; code already has a theme-name skeleton |
| Components first, then pages | Owner asked for consistency (buttons, badges) |

Owner references they liked (One Page Love): clintbalcom.com (personal voice, Bottom Line callouts, Simple/Detailed toggle, Lightning Round, Now Playing), jasonbriscoe.com (big greeting hero, signature), kuldar (bento grid, signature animation, easter eggs). Take ideas, not copies.

Owner preferences in chat: short answers, bullets, tables, diagrams, no long dashes. They want to see the UI (mockups, screenshots) before deciding. They said: "work until finish", "no need to ask", "you decide".

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
- Known old quirks: Header mobile menu script looks up `#main-header` but the header id comes from `SELECTORS.SCROLL_TO_TOP_ID`; mobile menu closes by translate only (keys stay in Tab order); two `ThemeToggle` instances share `id="theme-switcher"`.
- Where `Button` is used: Explore filters (sm, icons), about, resume, talks, 404, categories index, plus icon-only controls (menu toggle, theme toggle = ghost; footer back-to-top and home shuffle = `flat`).

## 3. Design system rules (do not break)

- Colors only through `--th-*` variables in `src/styles/theme/*.css`. New pair of text and background = new line in `scripts/check-contrast.mjs` first (watch it fail), then the token. New token file = add it to `FILES` in that script.
- Contrast: text 4.5:1, UI borders 3:1, post body 7:1. `--th-primary-50/100/200` stay light tints in dark mode (black text sits on them).
- Never meaning by depth or color alone: keys have a 2px edge (`--th-key-edge`), pressed/current keys are underlined and use `aria-pressed` / `aria-current`.
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

## 5. State right now

- `master` has Phase 1 (#321) and Phase 1b (#322). `feat/2027-design` equals master plus docs (plan, handoff, this file).
- Phase 2 branch `feat/2027-post` exists with the plan committed, no code yet. Task 1 RED was not measured yet: `document.querySelector('.post-detail > p')` returned null, so paragraphs sit inside `content-wrapper`. Inspect the DOM before writing the CSS selector.
- Phase 2 sample copy: `bottomLine` for `2018-04-16-intro-to-intersection-observer.mdx`: "Pakai IntersectionObserver untuk tahu kapan elemen masuk layar, tanpa scroll listener." (Indonesian, matches the post).

## 6. Open questions (use the defaults; owner can change later)

- Hero photo (default: current avatar), Indonesian UI copy (default: English), exact palette list for Phase 7 (default: Warm paper, Ocean, Forest, Plum, High contrast), whether to keep click sound (default: keep, opt-in).
