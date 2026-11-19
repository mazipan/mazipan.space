---
name: project-2027-redesign-branching
description: 2027 redesign of mazipan.space uses central branch feat/2027-design; never merge to master until the owner says all phases are done
metadata:
  type: project
---

Redesign ("Irfan's bookshelf": warm, personal, tactile keycap UI) lives on central branch `feat/2027-design`. Phase 1 was merged to master (squash, PR #321, 59d855a) on 2026-11-19 at the owner's explicit request. Repo allows squash only (no merge commits); after a squash, merge origin/master back into feat/2027-design.

**Why:** Owner wants one big release when everything is done, not piecemeal merges to master.

**How to apply:** Branch each phase off `feat/2027-design` and merge it back into `feat/2027-design` directly, no PR needed (owner said so on 2026-11-19). Merging to master (Vercel deploys it live) only when the owner says so; on 2026-11-19 the owner also said to merge automatically without asking - treat as standing OK to merge finished phases, but confirm if a merge would ship a half-redesigned site. Specs and plans: `docs/superpowers/specs/2026-11-19-site-revamp-design.md`, `docs/superpowers/plans/`. Next: Phase 1b component library (Badge, Button wrapper, Book, Shelf, PaperCard, StickyNote, Input). Builds need `SITE_URL=https://www.mazipan.space`. See [[feedback-design-preferences]].

**Status 2026-11-19:** Phase 1 (PR #321, 59d855a) and Phase 1b component library (PR #322, 6852995) are on master. Owner said "do it, no need to ask": merge finished phases to master via PR + squash without asking. Next: Phase 2 post page, then 3 home, 4 blog lists (filter keys, active tag filter is color-only), 5 other pages, 6 polish, 7 selectable palettes. Deferred minors from review: category icons on /blog/categories shrank; captions contrast on paper/note surfaces; Tag <a> without href looks clickable.

**Status (end of first session):** Phases 1, 1b, 2, 3, 4 merged to master (PRs #321-#325). Phase 5 partly done (checklist in docs/superpowers/HANDOFF.md). Owner continues in a remote session; ALL knowledge lives in docs/superpowers/ (HANDOFF.md, KNOWLEDGE.md, memory/ copy, mockups/). Update HANDOFF.md at every stop.
