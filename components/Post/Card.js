import Link from 'next/link'

import DateFormatter from '@/components/Date'
import CoverImage from '@/components/Post/Cover'
import Tags from '@/components/Tags'

export default function PostCard({ title, date, excerpt, slug, coverImage, tags, lang = 'id' }) {
  const hrefSlug = lang === 'id' ? '/[slug]' : '/en/[slug]'
  const hrefSlugTag = lang === 'id' ? '/tag/[tag]' : '/en/tag/[tag]'

  return (
    <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-medium transition-shadow duration-200s dark:bg-gray-800">
      <div className="mb-2 md:mb-4">
        <CoverImage title={title} src={coverImage} slug={slug} lang={lang} />
      </div>
      <div className="p-4">
        <h2 className="font-heading font-bold text-gradient text-3xl mb-3">
          <Link as={`/${slug}`} href={hrefSlug}>
            <a>{title}</a>
          </Link>
        </h2>
        <div className="text-sm text-gray-500 mb-4">
          <DateFormatter dateString={date} />
        </div>

        {excerpt && <p className="text-lg leading-relaxed mb-4">{excerpt}</p>}

        {tags && tags.length > 0 && (
          <div className="py-2">
            <Tags
              tags={tags}
              useLink
              tagBaseLink={`${lang === 'id' ? '/tag' : '/en/tag'}`}
              tagPattern={hrefSlugTag} />
          </div>
        )}
      </div>
    </div>
  )
}
