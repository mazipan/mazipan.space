# CLAUDE.md

See **[AGENTS.md](./AGENTS.md)** for the project guide (stack, conventions, commands) and
**[docs/agents/README.md](./docs/agents/README.md)** for how to work in the repo: workflow, design system,
page notes and content authoring (including the Carousel/Slides format).

## Claude Code-specific notes

- Type-check command requires the env var:
  `SITE_URL=https://www.mazipan.space pnpm astro check`
- Prefer `pnpm astro check` over `pnpm check-types` — it covers `.astro` files too.
