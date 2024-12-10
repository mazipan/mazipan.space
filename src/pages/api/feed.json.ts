import { feed } from '@/libs/api/feed';

export const GET = () =>
  new Response(feed.json1(), { status: 200, headers: { 'content-type': 'application/json' } });
