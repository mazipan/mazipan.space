import Link from 'next/link'
import Image from 'next/image'

import DateFormatter from '@/components/Date'
import PostTitle from '@/components/PostDetail/Title'
import Tags from '@/components/Tags'

export default function PostHeader({ title, tags, coverImage, date, author, lang }) {
  return (
    <header className="relative">
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

        <Tags
          id="post-detail"
          tags={tags}
          useLink
          tagBaseLink={`${lang === 'id' ? '/tag' : '/en/tag'}`}
          tagPattern={`${lang === 'id' ? '/tag/[tag]' : '/en/tag/[tag]'}`} />

      </div>
    </header>
  )
}
