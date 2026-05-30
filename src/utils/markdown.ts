import { createMarkdownProcessor } from '@astrojs/markdown-remark';

import type { MarkdownRenderResult } from '@astrojs/markdown-remark';

export const renderMarkdown = async (content: string): Promise<MarkdownRenderResult> => {
  const { render } = await createMarkdownProcessor();
  const renderedResult = await render(content);
  return renderedResult;
};
