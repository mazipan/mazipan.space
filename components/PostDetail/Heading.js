import Link from 'next/link'
import Image from 'next/image'

import DateFormatter from '@/components/Date'
import PostTitle from '@/components/PostDetail/Title'

export default function PostHeader ({ title, tags, coverImage, date, author }) {
  return (
    <>
      <Image
        src={coverImage}
        alt={`Cover ${title}`}
        width={1240}
        height={600}
        layout="responsive"
        sizes="100vw"
        priority={true}
        className="w-full rounded-lg object-cover"
      />
      <PostTitle>{title}</PostTitle>
      <div className="mt-8 mb-6 flex gap-4 text-lg">
        <div className="flex items-center bg-gray-300 dark:bg-gray-700 rounded-sm px-3 py-1 text-sm font-semibold">
          <DateFormatter dateString={date} />
        </div>
        <div className="flex gap-4">
          {tags &&
            tags.map((tag) => (
              <Link key={tag} as={`/tag/${tag}`} href="/tag/[tag]">
                <a className="hover:underline inline-block bg-red-100 text-red-600 rounded-full px-3 py-1 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2">
                  {`#${tag}`}
                </a>
              </Link>
            ))}
        </div>
      </div>
    </>
  )
}
