import { Feed } from 'feed';

import { getAllPosts } from '@/modules/post/common';
import { ROUTES } from '@/constants/routes';
import { CONFIG_CLIENT } from '@/config/client';
import { renderMarkdown } from '@/utils/markdown';

import type { Item } from 'feed';

const { SITE_DESCRIPTION, SITE_TITLE, SITE_URL, AUTHOR_NAME, AUTHOR_EMAIL } = CONFIG_CLIENT;

export const getFeed = async (): Promise<Feed> => {
  const author = {
    name: AUTHOR_NAME,
    email: AUTHOR_EMAIL,
    link: `${SITE_URL}${ROUTES.ABOUT}`,
  };

  const copyright = (date: Date) =>
    `&copy;${date.getFullYear()} ${AUTHOR_NAME}. All rights reserved.`;

  const feed = new Feed({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    id: SITE_URL,
    link: SITE_URL,
    language: 'en',
    image: `${SITE_URL}/images/favicons/favicon-32x32.png`,
    favicon: `${SITE_URL}/favicon.ico`,
    copyright: copyright(new Date()),
    updated: new Date(),
    feedLinks: {
      json: `${SITE_URL}${ROUTES.API.FEED_JSON}`,
      rss: `${SITE_URL}${ROUTES.API.FEED_RSS}`,
    },
    author,
  });

  // this handles omitting draft posts and preview mode by default
  const sortedPosts = await getAllPosts();

  const itemPromises = sortedPosts.map(async (post) => {
    const { data, body, slug } = post;
    const { title, description, publishDate, heroImage, noHero } = data;

    const url = `${SITE_URL}${ROUTES.BLOG}${slug}/`;
    const { code: content } = await renderMarkdown(body);

    const item: Item = {
      title,
      description,
      id: url,
      link: url,
      date: publishDate,
      published: publishDate,
      author: [author],
      copyright: copyright(publishDate),
      content,
      ...(noHero ? { image: `${SITE_URL}${heroImage.src}` } : {}),
    };

    return item;
  });

  const items = await Promise.all(itemPromises);

  items.forEach((item) => feed.addItem(item));

  return feed;
};

export const feed = await getFeed();
