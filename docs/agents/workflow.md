# Workflow

## Picking up a task

1. `git fetch` and cut a branch from the latest `master` (or use the branch your environment gives you).
2. Read the docs for the area you will touch (see [`README.md`](README.md)).
3. Look at the real thing before deciding: run the site, open the page, take a screenshot. For a big
   visual change, show the owner screenshots before and after.
4. Make the change with the existing components and tokens. Add a reference page entry when you add a
   component.
5. Verify (below), update the docs that your change makes wrong, push once, open a PR.

## Git and PR rules

- `master` is production (Vercel builds it). **Only the owner merges into `master`.** An agent opens a
  PR (as a draft unless told otherwise) and never merges it without the owner's explicit approval in
  that conversation.
- The repo allows **squash merges only**, and GitHub deletes the head branch after a merge. After a
  squash, restart your branch from the new `master` instead of merging the old branch again.
- **Do not make many commits or PRs.** Every push triggers a Vercel preview build and the owner pays
  for builds. Work locally until satisfied, verify, then push once.
- Never force-push a branch somebody else may use. Never skip hooks or checks to get green.
- PR body follows `.github/pull_request_template.md`. Say plainly what you did not verify.
- Check a PR's `Vercel` commit status (not only the check-suite event, which does not cover legacy
  commit statuses) before saying it is ready.
- Commit messages: short imperative subject, then the attribution lines your environment asks for.

## Verification toolkit

Run these before pushing (`SITE_URL` is required by every build and preview):

```bash
pnpm contrast                                           # every token pair, light and dark, all palettes
SITE_URL=https://www.mazipan.space pnpm astro check     # types incl. .astro (0 errors)
pnpm lint                                               # eslint src
SITE_URL=https://www.mazipan.space pnpm build           # needs network for `generate`; "astro-embed fetch failed" is harmless
npx prettier --check <changed files>                    # one file at a time; a long list breaks
SITE_URL=https://www.mazipan.space pnpm preview --port 4399   # then open pages
```

Browser checks that have found real bugs (script them with Playwright, which is installed in cloud
environments):

- **axe-core** over the pages you touched, in dark and light, with
  `runOnly: ['wcag2a','wcag2aa','wcag21aa','wcag22aa','best-practice']`. Light mode:
  set `localStorage.theme` to `{"mode":"light","name":"default-light"}` and reload (dark is the default).
- **Phone overflow sweep**: load representative pages at 320, 375 and 768px and compare
  `document.documentElement.scrollWidth` with the viewport width.
- **Key groups**: collect `.keycap` and `.tag` bounding boxes, group by vertical center, flag different
  heights.
- **Pixel checks for alignment**: layout rects are not pixel-snapped; to check that two parts line up,
  screenshot at 2x and scan the pixels.
- **Lighthouse** (accessibility, best practices, SEO) works in the cloud container:
  `npm i lighthouse` in a scratch folder and point `CHROME_PATH` at the preinstalled Chromium with
  `--headless --no-sandbox`. "Navigation" mode clears storage, so it audits dark.
- **Animations**: to look at a frame, pause the animation and set a negative `animation-delay`.
- A human keyboard and screen-reader pass is not automated: say when it was not done.

## Gotchas when working

- Prettier reformats code: after a scripted or string edit, grep that the change really landed.
- Tailwind 4 fails silently on unknown utilities; arbitrary values use underscores, not commas
  (`grid-cols-[minmax(0,1fr)_300px]`).
- `ch` units scale with font size: use `rem` for a column shared by headings and text.
- A negative margin on a flex item can let a `flex-basis: 100%` sibling share its row.
- `.astro` `<style>` blocks are processed in isolation (`@reference` for `@apply`).
- A dev server left running from an earlier step can serve stale code: stop it and restart before you
  trust a screenshot.
- Never leave debugging output, scratch scripts or screenshots in the repo.

## Definition of done

- Checks above pass; the pages you touched were looked at in light, dark and on a phone width.
- Components are measured, not eyeballed, when sizes must match.
- Docs that your change makes wrong are updated (this folder and `AGENTS.md`).
- The PR says what was verified and what was not.
