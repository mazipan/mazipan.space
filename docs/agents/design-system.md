# Design system

The 2027 redesign ("Irfan's bookshelf") is a warm, personal, tactile look: a bookshelf for writing and
a keyboard for the interface. It is live on `master`. Build pages by composing the components below,
never with one-off styles. Every component has a reference page under `/design/*` (source:
`src/pages/design/`, `noindex` on purpose).

## The owner's taste (decisions you should not undo)

- **Warm, friendly, personal, not techy.** Terminal or "engineer" looks were rejected.
- **Not flat, anywhere.** Bevels, elevation, 3D (also 3D heading typography), keycap buttons, a paper
  grain and dot-grid page background. Neumorphism was rejected (low contrast); glass and blur only
  rarely (hurts contrast and speed).
- **Readable first.** Long text sits on a solid `.sheet`, never on the texture. Body 17 to 19px,
  line height 1.7+, one reading column.
- **Precision.** Keys and buttons shown together must have exactly the same height (and square keys
  must really be square). Measure in the browser; do not trust the CSS alone.
- **Not every selected key needs a lamp**, and no white underline on the current key. No duplicate
  captions or repeated messages across a page.
- **Free to relayout.** Do not keep an old layout if the new look is better. The owner wants to SEE
  the UI (screenshots) before deciding on big changes.
- **Selectable palettes** (default, ocean, forest, plum, each light and dark) in one appearance
  popover. Dark is the default mode.

## Components

| Component                                             | Use                                                                                               | Key props                                                                                                             | Reference          |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `Keycap.astro`                                        | Nav, toggles, buttons                                                                             | `colors`, `size` (`md`/`sm`/`square`), `pressed`, `element` (`a`/`button`), `disabled`                                | `/design/keycaps`  |
| `Button.astro`                                        | Old API on keycaps. `solid`/`outline` are keys, `ghost` and `flat` stay flat (icon-only controls) | `variant`, `colors`, `size`, `flat`, `disabled`                                                                       | `/design/buttons`  |
| `Tag.astro`                                           | Raised chip (badge)                                                                               | `variant`, `colors`, `size`                                                                                           | `/design/buttons`  |
| `Shelf.astro` + `Book.astro`                          | List of links on a wood shelf                                                                     | Shelf: `title`, `level`, `href`; Book: `href`, `title`, `meta`, `colors`, `height`                                    | `/design/shelf`    |
| `PaperCard.astro`                                     | Paper surface                                                                                     | `as`, `tape`, `lines`, `tilt`                                                                                         | `/design/surfaces` |
| `StickyNote.astro`                                    | "Bottom line" and callouts                                                                        | `label`                                                                                                               | `/design/surfaces` |
| `Input.astro`                                         | Text field with visible label                                                                     | `label`, `id`, `hint`, `required`                                                                                     | `/design/forms`    |
| `StackCard`, `PolaroidCard`, `TicketCard`, `DeckCard` | Non-flat cards: posts, projects, talks, slide decks. One stretched `.card-link` per card          | `StackCard`: `tab`, `tone`; `TicketCard`: `tone`, slot `stub`; `PolaroidCard`: slot `photo`; `DeckCard`: `background` | `/design/cards`    |
| `PostColophon`                                        | Author note at the end of a post (paper card with a taped photo)                                  | none                                                                                                                  | a blog post        |
| `PaletteSwitcher`, `KeySoundToggle`                   | Footer controls: color palette (keys) and opt-in click sound                                      | none                                                                                                                  | footer             |

## Rules

- **Tokens:** colors live in `src/styles/theme/` (`theme-default.css`, `keycap-tokens.css`,
  `surface-tokens.css`) as `--th-*` variables. Dark mode is `:root.dark`.
- **Contrast is a test:** `pnpm contrast` checks every token pair in light and dark.
  A new token pair needs a new line in `scripts/check-contrast.mjs` **first** (watch it fail,
  then add the token). New token files go into the `FILES` list in that script.
- **Not only depth:** every key has a 2px edge, a selected key is pressed in. Never carry meaning by
  color or shadow alone. The lamp (a white dot with a dark ring on the top rim, opt in with `lamp`) is
  only for wayfinding (header menu) and on/off state (appearance popover). Filters and pagination
  change color instead (selected = terracotta / primary + pressed in). NOT an underline, the owner
  dislikes it. Ask "is it needed, does it look good" before adding a cue.
- **Depth layer** (`src/styles/components/depth.css`, reference `/design/depth`): page background has a
  paper grain plus a dot grid (`--th-grain`, `--th-dot`). Long reading text must sit on a `.sheet`
  (solid `--th-sheet-bg`, contrast checked AAA by `pnpm contrast`), never on the texture. Titles:
  `.b-h1` / `.title-3d` / prose `h1` are extruded (`--th-title-side`), `.b-h2` / `.b-h3` / `.shelf-title`
  are letterpress. Raised small parts: `.crumb` (breadcrumbs), `.link-key` (a link in running
  text), `.frame` (picture mat), `.well` (recessed), `.board` + `.board-note` (pinboard), `.bead`.
- **Key sizes together:** use `NavKey` (never hand-size a `Keycap`): 48px tall, icon keys 48 x 48,
  round optional. A selected / current key is `pressed` (pressed in), identical everywhere.
  Measure groups of keys in the browser, never trust the CSS alone.
- **Header height:** the fixed header's bottom edge is 98px. `--header-h` (base.css, 6.25rem) is the
  one value for the page offset, burger menu, sticky headings, ToC and `scroll-padding-top`. Never
  hard-code `top-16` / `mt-[65px]` style numbers; change `--header-h` if the header changes.
- **Reading column:** every prose sheet (post, project, `Page` layout) is `sheet sheet-prose` (40.5rem wide, centered, text measure 36.5rem), so there is no wide empty padding around text. Do not put long text on a full-width sheet. The post page puts the ToC beside it (`Post.astro` grid `40.5rem + 300px`, centered).
- **Logo:** `Logo.astro` is ONE square keycap with MZP on it and takes its colors from the palette tokens (40px, so the header link is 48px). Static brand copies are `public/logo.svg` and `public/favicon.svg` (same drawing); do not reintroduce the old outline logo.
- **Arrows and chevrons are SVG icons, never text characters** (`→ &rarr; › « ↗`): use `<Icon name="tabler:arrow-right" class="arrow-icon" aria-hidden="true" />` after a link label (`.arrow-icon` aligns it and nudges it on hover), `tabler:chevron(s)-left/right` for pagination keys, `tabler:arrow-up-right` for external links. In React use an inline `<svg>`. Arrows inside post bodies are the author's own writing: leave them. A key that only holds an icon needs an `aria-label`; a disabled link key renders as `span role="link" aria-disabled`.
- **Photos and screenshots** are framed (`.frame`, `PolaroidCard`), serve images with `densities` or `widths`, and keep their natural aspect ratio (never force `aspect-*` without `object-cover`). Long reading text (posts, projects, pages, resume) sits on a `.sheet`.
- **Prose colors** come from the tokens (`--tw-prose-*` in `my-prose.css`), not the slate palette.
- **Reading measure** is `36.5rem` (rem, not `ch`, so headings and text share one column).
- **Reduced motion:** lift, tilt, and press animation must be off under
  `prefers-reduced-motion`.
- **Palettes:** `src/styles/theme/palettes.css` has `[data-theme='<name>-light|dark']` scopes
  (ocean, forest, plum) that only override what differs. A new palette needs entries in
  `THEMES` and `PALETTES` (`src/constants/theme.ts`) and its name in `PALETTES` of
  `scripts/check-contrast.mjs`, so `pnpm contrast` checks it.

## Palettes and tokens in one place

Colors only through `--th-*` variables in `src/styles/theme/*.css`. Contrast targets: text 4.5:1, UI borders 3:1, post body 7:1. `--th-primary-50/100/200` stay light tints in dark mode (black text sits on them). Books reuse the key color tokens (cover = `face-lo`, spine = `side`, text = key text); shelf rows are exactly `--shelf-row: 210px` so one plank fits under each wrapped row. `Button` solid/outline are keycaps (`solid-primary` terracotta, `solid-default` navy, `outline-primary` teal, `outline-default` cream); ghost and `flat` stay flat.
