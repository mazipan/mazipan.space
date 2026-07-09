import { defineMdastPlugin } from 'satteri';
import getReadingTime from 'reading-time';

/** @returns {import('satteri').MdastPluginDefinition} */
export function satteriReadingTime() {
  return defineMdastPlugin({
    name: 'reading-time',

    yaml(node, ctx) {
      // Fires for .md files — YAML frontmatter node is present in the MDAST.
      // Use textContent(root) for clean text (strips markdown syntax).
      const root = ctx.parent(node);
      const textOnPage = ctx.textContent(root);
      const readingTime = getReadingTime(textOnPage);
      console.log(
        '[satteri-reading-time] yaml visitor →',
        ctx.fileURL?.pathname ?? '<unknown>',
        '→', readingTime.minutes.toFixed(2), 'min',
      );
      if (ctx.data.astro?.frontmatter) {
        ctx.data.astro.frontmatter.readingTime = readingTime.minutes;
      }
    },

    heading(node, ctx) {
      // Fallback for .mdx files: no yaml node exists because the frontmatter
      // is pre-parsed and stripped before Sätteri sees the source. The first
      // heading (or paragraph, below) that fires sets readingTime from the
      // raw source; subsequent visits are no-ops thanks to the guard.
      if (ctx.data.astro?.frontmatter?.readingTime != null) return;
      const textOnPage = ctx.source;
      const readingTime = getReadingTime(textOnPage);
      console.log(
        '[satteri-reading-time] heading visitor →',
        ctx.fileURL?.pathname ?? '<unknown>',
        '→', readingTime.minutes.toFixed(2), 'min',
      );
      if (ctx.data.astro?.frontmatter) {
        ctx.data.astro.frontmatter.readingTime = readingTime.minutes;
      }
    },

    paragraph(node, ctx) {
      // Same fallback as heading — whichever fires first wins.
      if (ctx.data.astro?.frontmatter?.readingTime != null) return;
      const textOnPage = ctx.source;
      const readingTime = getReadingTime(textOnPage);
      console.log(
        '[satteri-reading-time] paragraph visitor →',
        ctx.fileURL?.pathname ?? '<unknown>',
        '→', readingTime.minutes.toFixed(2), 'min',
      );
      if (ctx.data.astro?.frontmatter) {
        ctx.data.astro.frontmatter.readingTime = readingTime.minutes;
      }
    },
  });
}
