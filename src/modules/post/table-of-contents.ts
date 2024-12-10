import type { MarkdownHeading } from 'astro';

export interface Heading extends Pick<MarkdownHeading, 'slug' | 'text'> {
  headings: Heading[];
}

export const getHeadingsForTableOfContents = (postHeadings: MarkdownHeading[]): Heading[] => {
  // get subtitles for TOC
  const headings: Heading[] = [];

  for (let index = 0; index < postHeadings.length; index++) {
    const { slug, text, depth } = postHeadings[index];

    if (depth !== 2) continue;

    // get subsequent depth 3 subheadings
    // handle 2
    const subHeadings: Heading[] = [];

    // handle 3+
    while (index + 1 < postHeadings.length && postHeadings[index + 1].depth > 2) {
      index++;

      // take only depth 3
      if (postHeadings[index].depth !== 3) continue;

      const { slug, text } = postHeadings[index];
      subHeadings.push({ slug, text, headings: [] });
    }

    headings.push({ slug, text, headings: subHeadings });
  }

  return headings;
};
