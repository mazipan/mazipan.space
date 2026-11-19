---
name: project-2027-redesign-branching
description: 2027 redesign of mazipan.space uses central branch feat/2027-design; never merge to master until the owner says all phases are done
metadata:
  type: project
---

Redesign ("Irfan's bookshelf": warm, personal, tactile keycap UI) lives on central branch `feat/2027-design`. Phase 1 was merged to master (squash, PR #321, 59d855a) on 2026-11-19 at the owner's explicit request. Repo allows squash only (no merge commits); after a squash, merge origin/master back into feat/2027-design.

**Why:** Owner wants one big release when everything is done, not piecemeal merges to master.

**ABSOLUTE (owner, end of session 2): never merge anything into `master` in this redesign task, not even a revert. The owner merges it themself next year.**

**How to apply (CORRECTED by the owner in session 2, overrides every older line):** Work and merge ONLY into the central branch `feat/2027-design` (PR base = `feat/2027-design`). NEVER merge into `master`. `master` is updated once, by one PR from `feat/2027-design`, only when the owner says the whole 2027 redesign is finished and approves. "Auto merge" / "no need to ask" from the owner means merging into the central branch only. Check that `feat/2027-design` still exists after each squash merge (GitHub deletes a merged PR's head branch). Fewer pushes: each push is a Vercel build.

**History:** Phases 1-4 and Phase 5 part 1 (#321-#326) were merged to master by the first session under the older rule; the owner did not ask to revert those. In session 2 PRs #328-#330 were wrongly merged into master, then the owner asked for a revert: PR #332 is open and NOT merged, the owner merges it themself. Phase 5b, Phase 5 part 2, Phase 6 part 1 live on `feat/2027-design`; open PR #331 (depth pass, palettes) targets it. Revert gotcha for the final PR: see HANDOFF.md. Specs and plans: `docs/superpowers/specs/2026-11-19-site-revamp-design.md`, `docs/superpowers/plans/`. Builds need `SITE_URL=https://www.mazipan.space`. See [[feedback-design-preferences]].
