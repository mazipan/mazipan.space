import { createSatteriMarkdownProcessor } from '@astrojs/markdown-satteri';

import type { MarkdownRenderResult } from 'astro/markdown';

export const renderMarkdown = async (content: string): Promise<MarkdownRenderResult> => {
  const processor = await createSatteriMarkdownProcessor();
  return processor.render(content);
};
