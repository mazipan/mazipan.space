import { renderMarkdown } from '@/utils/markdown';

import type { PostCollection } from '@/types/post';
import type { MarkdownProcessorRenderResult } from '@astrojs/markdown-remark';

// unused

// more posts with rendered md description
export type CollectionEntryWithRenderedDescription = PostCollection & {
  renderedDescription: MarkdownProcessorRenderResult;
};

/** Don't use this, description without markdown, or must wrap with prose. */
export const getMorePostsWithRenderedMarkdownDescription = async (
  posts: PostCollection[]
): Promise<CollectionEntryWithRenderedDescription[]> => {
  const morePosts: CollectionEntryWithRenderedDescription[] = [];

  for (const post of posts) {
    const renderedDescription = await renderMarkdown(post.data.description ?? '');
    morePosts.push({ ...post, renderedDescription });
  }

  return morePosts;
};
