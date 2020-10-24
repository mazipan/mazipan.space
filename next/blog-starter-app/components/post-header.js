import Link from 'next/link';

import DateFormatter from '../components/date-formatter';
import PostTitle from '../components/post-title';

export default function PostHeader({ title, tags, coverImage, date, author }) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="mb-6 text-lg">
        <DateFormatter dateString={date} />
        <div className="mt-4">
          {tags &&
            tags.map((tag) => (
              <Link key={tag} as={`/tag/${tag}`} href="/tag/[tag]">
                <a className="hover:underline inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {`#${tag}`}
                </a>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
}
