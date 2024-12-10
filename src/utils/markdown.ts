import { createMarkdownProcessor } from '@astrojs/markdown-remark';

import type { MarkdownProcessorRenderResult } from '@astrojs/markdown-remark';

export const renderMarkdown = async (content: string): Promise<MarkdownProcessorRenderResult> => {
  const { render } = await createMarkdownProcessor();
  const renderedResult = await render(content);
  return renderedResult;
};
