#!/usr/bin/env bash
# WARNING (owner rule, session 2): this script opens a PR into master and squash-merges it. Do NOT run it.
# Merging into master needs the owner's explicit approval, only when the whole redesign is done.
# usage: ship.sh <phase-branch> <pr-title> <body-file> <commit-message-subject>
# Runs the gates, commits, merges into feat/2027-design, opens a PR to master, waits for CI, squashes, syncs.
set -u
BR="$1"; TITLE="$2"; BODY="$3"; MSG="$4"
cd /Users/mzp/Documents/workspace-work/mazipan.space || exit 1

for f in $(git status --porcelain | awk '{print $2}' | grep -E '\.(astro|css|mjs|md|ts|tsx)$'); do
  npx prettier --check "$f" >/dev/null 2>&1 || { npx prettier --write "$f" >/dev/null 2>&1; echo "formatted $f"; }
done
pnpm -s contrast | tail -1 || exit 1
SITE_URL=https://www.mazipan.space pnpm -s astro check --minimumSeverity error 2>&1 | grep -E "errors"
pnpm -s lint | tail -1

git add -A
git commit -q -m "$MSG

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
git checkout -q feat/2027-design || exit 1
git merge -q --no-ff "$BR" -m "Merge $BR

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>" || exit 1
git push 2>&1 | tail -1

PR=$(gh pr create --base master --head feat/2027-design --title "$TITLE" --body-file "$BODY" 2>&1 | tail -1)
echo "$PR"
N=${PR##*/}
for i in $(seq 1 24); do
  gh pr checks "$N" 2>&1 | grep -qE "pending|queued|in_progress" && sleep 20 || break
done
gh pr checks "$N" 2>&1 | head -3
MS=$(gh pr view "$N" --json mergeStateStatus --jq .mergeStateStatus)
echo "merge state: $MS"
if [ "$MS" = "CLEAN" ]; then gh pr merge "$N" --squash 2>&1 | tail -1; fi
gh pr view "$N" --json state,mergeCommit --jq '{state, sha: .mergeCommit.oid[0:7]}'
git fetch -q origin && git merge --no-edit origin/master 2>&1 | tail -1
echo "diff vs master: $(git diff origin/master --stat | wc -l)"
git push -u origin feat/2027-design 2>&1 | tail -1
echo "PR_NUMBER=$N"
