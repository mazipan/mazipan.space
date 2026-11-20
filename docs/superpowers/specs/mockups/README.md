# Mockups

Static HTML. Open any file in a browser (double click or `open <file>`). Written in the first design session, in this order. All copy is placeholder except real post titles.

| File | What it shows | Status |
|---|---|---|
| `directions.html` | Home in 3 directions: A Zine collage, B "Mission Log" (space/terminal), C Field Notebook | Rejected: owner said B is too techy and engineer-like |
| `directions-v2-friendly.html` | 3 friendlier directions: D Sunday Paper, E Postcards, F Bookshelf | F chosen (D style for post page) |
| `f-accessible-and-reading.html` | F made accessible (horizontal labels, checked contrast) plus a reading page in D style | Reading page style adopted |
| `f-real-shelf.html` | Real bookshelf: front-facing books on wooden planks | Adopted, built as `Shelf` and `Book` |
| `personal-home.html` | Personal home: hello hero, "Right now", shelf, "What I do" tiles | **Home spec for Phase 3** |
| `tactile-components.html` | Buttons that press, chips, paper card with tape, 3D book, plank, input, sticky note | Adopted |
| `keycaps.html` | Keycap buttons, nav keys, filter toggles, arrow keys, opt-in click sound (WebAudio) | Adopted, built as `Keycap`. Sound code is the model for Phase 6 |
| `prototype-home-and-post.html` | Clickable prototype of Home and a Post with dark mode toggle, hover books, keys | The one the owner approved. Visual reference for Phases 2 and 3 |

| `cards.html` | Four non-flat card directions: A index card, B polaroid, C ticket stub, D stacked deck, with dark toggle | Owner asked for non-flat cards (Phase 5b). Recommended A for posts, B for projects, C for talks, D for slides |

Notes:

- The mockups use fixed colors (cream `#fdf0e3`, ink `#2b1d14`, terracotta, teal, mustard, navy). Real code uses the `--th-*` tokens in `src/styles/theme/`.
- Some mockup colors fail contrast (for example white on the lighter terracotta). The real tokens were darkened until `pnpm contrast` passed.
