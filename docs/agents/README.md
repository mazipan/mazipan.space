# Agent guide

Start here when you pick up a task in this repo. These docs are generic on purpose: they describe how
the repo works today, not a plan. If something here is wrong, fix it in the same change.

## Start here (5 minutes)

1. Read [`../../AGENTS.md`](../../AGENTS.md): stack, commands, structure, code conventions.
2. Read [`workflow.md`](workflow.md): how to branch, verify, open a PR, and what you must never do.
3. Touching UI? Read [`design-system.md`](design-system.md) and the page you change in
   [`pages.md`](pages.md). Touching content? Read [`content.md`](content.md).
4. Look at the live reference pages: run the site and open `/design/depth`, `/design/keycaps`,
   `/design/buttons`, `/design/shelf`, `/design/surfaces`, `/design/cards`, `/design/forms`.

## Map

| Doc | What is in it |
| --- | --- |
| [`../../AGENTS.md`](../../AGENTS.md) | Stack, commands, env, structure, aliases, Tailwind/Zod/TS/ESLint rules, CI, gotchas |
| [`workflow.md`](workflow.md) | Picking up a task, git and PR rules, the verification toolkit, definition of done |
| [`design-system.md`](design-system.md) | Owner's taste, components, tokens and rules (depth, keys, contrast, motion) |
| [`pages.md`](pages.md) | Page-specific notes: Home, About, Resume road, Friends, 404, Footer, profile data |
| [`content.md`](content.md) | Posts, projects, site copy, `CodeGroup`, Carousel (Slides) authoring |

## Where facts live

| Fact | File |
| --- | --- |
| Name, tagline, location, time zone, availability | `src/constants/profile.ts` |
| Career (newest first) | `src/constants/career.ts` |
| Friends | `src/constants/friends.ts` |
| Home "Right now" lines | `src/constants/now.ts` |
| Routes | `src/constants/routes.ts` |
| Page titles and meta descriptions | `src/constants/metadata.ts` |
| Color tokens | `src/styles/theme/*.css` |
| Palettes | `src/constants/theme.ts`, `src/styles/theme/palettes.css` |
| Version shown in the footer | `package.json` `version` |

## Keeping these docs true

Update the doc in the same PR as the change. Prefer short, current statements over history. Do not
add plans, progress ledgers or "session" notes to the repo: use the PR description for that.
