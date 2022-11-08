import Link from 'next/link'

import DateFormatter from '@/components/Date'
import CoverImage from '@/components/Post/Cover'
import Tags from '@/components/Tags'

export default function PostCard({ title, date, excerpt, slug, coverImage, tags, lang = 'id' }) {
  const hrefSlug = lang === 'id' ? '/[slug]' : '/en/[slug]'
  const hrefSlugTag = lang === 'id' ? '/tag/[tag]' : '/en/tag/[tag]'

  return (
    <div className="relative rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
      <CoverImage title={title} src={coverImage} slug={slug} lang={lang} />
      <div className="p-4">
        <div className="text-gray-600 dark:text-gray-200">
          <DateFormatter dateString={date} />
        </div>
        <h2 className="font-heading font-bold text-gradient text-3xl mb-3">
          <Link as={`/${slug}`} href={hrefSlug}>
            {title}
          </Link>
        </h2>

        {excerpt && <p className="text-lg leading-relaxed mb-4">{excerpt}</p>}

        {tags && tags.length > 0 && (
          <div className="py-2">
            <Tags
              tags={tags}
              id={slug}
              useLink
              tagBaseLink={`${lang === 'id' ? '/tag' : '/en/tag'}`}
              tagPattern={hrefSlugTag} />
          </div>
        )}
      </div>
    </div>
  )
}
