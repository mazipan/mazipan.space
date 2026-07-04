# CLAUDE.md

See **[AGENTS.md](./AGENTS.md)** for the full project guide — stack, conventions,
commands, and content authoring (including the Carousel/Slides format).

## Claude Code-specific notes

- Type-check command requires the env var:
  `SITE_URL=https://www.mazipan.space pnpm astro check`
- Prefer `pnpm astro check` over `pnpm check-types` — it covers `.astro` files too.
- The active development branch for the carousel feature is
  `claude/interactive-blog-carousel-4raj9m`.
