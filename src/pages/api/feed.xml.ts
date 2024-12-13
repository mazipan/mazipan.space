import { feed } from '@/libs/api/feed';

export const GET = () =>
  new Response(feed.rss2(), { status: 200, headers: { 'content-type': 'application/rss+xml' } });
