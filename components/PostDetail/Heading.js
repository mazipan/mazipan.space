import Link from 'next/link'
import Image from 'next/image'

import DateFormatter from '@/components/Date'
import PostTitle from '@/components/PostDetail/Title'

export default function PostHeader ({ title, tags, coverImage, date, author }) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <Image
        src={coverImage}
        alt={`Cover ${title}`}
        width={1240}
        height={600}
        className="w-full rounded-lg object-cover"
      />
      <div className="mt-8 mb-6 text-lg">
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
  )
}
