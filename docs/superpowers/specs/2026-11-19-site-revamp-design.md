# Site revamp design: "Irfan's bookshelf"

Date: 2026-11-19. Status: draft, awaiting approval.
Mockups: `.superpowers/brainstorm/10293-1795079233/content/` (`personal-home.html`, `keycaps.html`, `tactile-components.html`, `f-real-shelf.html`).

## Intent and why

- mazipan.space is a personal site. The current home is only an avatar, a name, and a tagline. The personal content is hidden on the About page, written like a CV.
- The owner wants it to be original and unusual, but friendly for a normal reader. Not "techy" or "engineer".
- The owner is bored of flat design. They want tactile parts, like real keyboard keycaps: bevels, depth, clicky.
- Blog readability, accessibility, and easy navigation come first.

## Goals

- Home is a warm letter from Irfan: greeting, short story, "Right now", recent writing, what Irfan does.
- Writing is browsed as a **bookshelf**. Readers choose by mood or intent (Short reads, Long stories, How-tos, Slides), not by tech tag.
- Post pages are calm and easy to read.
- Tactile UI: keycap buttons, raised chips, paper cards, 3D books, wood planks.
- WCAG 2.2 AA everywhere. AAA contrast for post body text.

## Non-goals

- No change to the stack (Astro 7, React 19, Tailwind 4, MDX, Content Layer).
- No breaking change to URLs, RSS/JSON feeds, or OG image generation.
- Content schema changes are additive and optional only (`kind`, `bottomLine`). Existing posts must build unchanged.
- No rewrite of existing post content.
- No new backend. The site stays static.

## Anti-goals (a failure even if it works)

- A page that feels like a developer tool or terminal.
- Decoration that lowers contrast, hides text, or slows reading.
- Meaning carried only by color or shadow.
- Sound or motion that plays without the reader asking.

## Visual language

| Element | Decision |
|---|---|
| Mood | Warm paper, wood, ink. Soft and personal. |
| Color | Cream background `#fdf0e3`, ink `#2b1d14`, terracotta `#b8442a`, teal `#1f6f66`, mustard `#e9c46a`, navy `#264653`. Final values must pass the contrast checks below. |
| Type | Display: a warm serif (Georgia-class, or a variable serif web font). Body: friendly sans or serif at 17-19px. Dela Gothic One is dropped, or kept only for tiny labels. Mono only for code. |
| Depth | Layered shadows, bevels, paper grain (CSS only or one small image), wood grain via CSS gradients. |
| Keycap | Base wrapper = deep side, inner face = bevelled top. 6px press travel. 3px focus outline plus white ring. |

## Component set

- **Keycap button** (colors: terracotta, teal, mustard, cream, navy; sizes: md, sm, square). Real `<button>` or `<a>`.
- **Toggle key** for filters. Pressed = selected, plus a check mark.
- **Nav keys.** Current page = pressed in.
- **Arrow keys** for previous/next story.
- **Book** (front-facing cover, spine edge, page edge, hover tilt). A link with a horizontal title.
- **Shelf** = heading + list of books + wood plank. Phone: 2 books per row, a plank per row.
- **Paper card** (tape, ruled lines) for featured items.
- **Sticky note** for "Bottom line" and callouts.
- **Inset input**.

## Pages

**Home**
```
hello hero (big greeting, 1 paragraph, Say hi / Read my story, photo)
Right now strip (making / reading / listening / thinking)
Lately, I wrote  -> one shelf of 4 recent books
What I do besides code -> tiles (talk, 1:1 chat, build in public, lightning round)
footer: contact + sound toggle
```

**Post**
- Plain paper behind the text. No texture under body copy.
- Body 17-19px, 60-70 characters per line, line height 1.7. Text `#241b15` on `#fffdf7` or better.
- Sticky ToC with reading progress. Previous/next as arrow keys.
- "Bottom line" sticky note at the top, from a new optional frontmatter field.
- Breadcrumbs, tags shown as friendly labels.

**Blog index**: shelves by reader intent. Filter keys. Pagination as keys.
**Other pages** (About, Talks, Projects, Carousel, Friends, Guest book, Resume, 404, Support, Credits): restyled with the same parts. About becomes the long version of the home story.

## Accessibility rules

- Skip link first on every page. Landmarks. One `h1` per page.
- Visible focus on every control. Logical tab order. Everything works by keyboard.
- Contrast: 4.5:1 for text, 3:1 for UI borders, AAA (7:1) for post body.
- Depth, tilt, and color are never the only signal.
- `prefers-reduced-motion`: no lift, tilt, press travel, or scroll effects.
- Dark mode is kept (`prefers-color-scheme` + existing toggle), with its own palette that passes the same checks.
- Test targets: Lighthouse accessibility 100, axe with no serious issues, keyboard-only walkthrough, screen reader smoke test.
- Sound is opt-in, off by default, remembers the choice, with a visible toggle.

## Approaches considered (how to build)

| # | Approach | Trade-off |
|---|---|---|
| 1 | One big redesign branch | Consistent, but hard to review and slow to ship |
| 2 | **Phased, one PR per phase (my recommendation)** | Safe, reviewable. Site looks mixed for a short time. |
| 3 | New theme beside the old one, then switch | Clean switch, double CSS while it lasts |

Owner choice: **not yet confirmed**. Plan assumes approach 2.

## Phases (approach 2)

1. Foundation: tokens, fonts, light/dark palettes, skip link, focus, keycap and chip components, contrast checks.
2. Post page: reading layout, ToC, progress, arrow keys, "Bottom line".
3. Home: hero, Right now, shelf, tiles.
4. Blog lists: shelves by intent, filters, pagination.
5. Other pages.
6. Polish: reduced motion, performance, Lighthouse and axe pass, sound toggle.

## Mockups (source of truth for the look)

Tracked copies in `docs/superpowers/specs/mockups/`:
- `personal-home.html`: home layout.
- `f-real-shelf.html`: shelf and book look. Replaces the earlier flat shelf ideas.
- `keycaps.html`: keycap buttons, nav keys, filter keys, arrow keys, sound toggle.
- `tactile-components.html`: paper card, 3D book, sticky note, plank, input.

## Decisions made by the design author (not yet confirmed by the owner)

- **Shelf mapping:** Short reads = reading time under 5 min. Long stories = 5 min or more. How-tos = optional `kind: 'how-to'` frontmatter (additive, defaults to none). Slides = the existing Carousel collection (`/carousel`), each book links to its carousel page. No backfill needed for Short/Long. How-tos need hand-tagging of only the posts that fit.
- **Nav:** keycaps on desktop and in the mobile menu. Current page = pressed in, plus `aria-current="page"`.
- **Dark mode:** the builder designs a warm dark palette (lamp-lit wood, cream text). It must pass the same contrast checks. Bevels and grain get dark variants.
- **Sound:** in scope, opt-in, off by default, one toggle in the footer. Cheap to drop later.
- **Hero photo:** keep the current avatar until the owner supplies a photo. The layout must work with either.
- **Spotify tile:** out of v1. "Right now" is static copy from one data file (`src/content/` or a constants file, builder decides). Can be revisited later.
- **Scribble-on-photo:** skipped.
- **"Bottom line" note:** optional `bottomLine` frontmatter field. Posts without it show no note.
- **URLs and filters:** all existing routes stay. Filter keys work client-side over the pre-rendered list on each page. The existing tag and category routes stay as the crawlable, shareable version. Feeds do not change.

## Open decisions (owner)

- Confirm approach 2 (phased, one PR each), or pick 1 or 3.
- UI copy language: English only (current plan), or English plus Indonesian from Phase 1? Posts are mixed `id`/`en`.

## Left to the builder

- Exact font choice and loading (self-hosted, `font-display: swap`).
- How to build tokens in Tailwind 4 (`@config` file plus CSS variables, as now).
- Component file structure, naming, and tests.
- Paper and wood textures: CSS gradients vs one small optimized image.
- Mapping rule details, once the owner picks one.
- The `.superpowers/` folder must be added to `.gitignore`.
