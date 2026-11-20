---
name: feedback-design-preferences
description: Owner's design taste for mazipan.space - friendly not techy, tactile, accessible, wants to see mockups before deciding
metadata:
  type: feedback
---

- Rejected "techy / engineer" looks (terminal, mission log). Wants warm, personal, friendly for non-technical readers.
- Bored of flat design: likes real 3D bevels like keyboard keycaps, clicky.
- Blog readability, accessibility, easy navigation come first.
- "Hard to decide without seeing the UI": show clickable mockups in the browser, not text plans.
- Wants reusable components first, for consistency (buttons, badges).
- Wants selectable palettes eventually (data-palette + dark/light); repo already has THEMES/data-theme skeleton.

- (Session 2) Wants EVERYTHING non-flat: bevels, elevation, 3D, including headings (3D typography ok) and a texture/pattern page background.
- (Session 2) White underline on the current menu key looks odd to them: use a lamp. Header keys and groups of keys must be exactly the same height (and square keys really square).
- (Session 2) Free to relayout pages for the new look. Fewer commits/PRs (build budget): work locally, verify, push once. Always update handoff and docs.

- (Session 2) HARD RULE: merge only into the central branch `feat/2027-design`, never into `master`. `master` only with the owner's explicit approval when everything is done. "Auto merge" never means master.

**Why:** Said directly during the 2026-11-19 redesign brainstorm.

**How to apply:** Propose visually (mockups), keep a11y checks (pnpm contrast, Lighthouse) on every change. Related: [[project-2027-redesign-branching]].
