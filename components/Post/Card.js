import Link from 'next/link'

import DateFormatter from '@/components/Date'
import CoverImage from '@/components/Post/Cover'

export default function PostCard ({ title, date, excerpt, slug, coverImage, tags, lang }) {
  const hrefSlug = lang === 'id' ? '/[slug]' : '/en/[slug]'
  const hrefSlugTag = lang === 'id' ? '/tag/[tag]' : '/en/tag/[tag]'

  return (
    <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-medium transition-shadow duration-200s dark:bg-gray-800">
      <div className="mb-2 md:mb-4">
        <CoverImage title={title} src={coverImage} slug={slug} lang={lang} />
      </div>
      <div className="px-6 py-4">
        <h2 className="font-bold text-3xl mb-3 leading-snug">
          <Link as={`/${slug}`} href={hrefSlug}>
            <a className="hover:underline">{title}</a>
          </Link>
        </h2>
        <div className="text-sm text-gray-500 mb-4">
          <DateFormatter dateString={date} />
        </div>

        {excerpt && <p className="text-lg leading-relaxed mb-4">{excerpt}</p>}

        {tags && tags.length > 0 && (
          <div className="py-2">
            {tags.map((tag) => (
              <Link key={tag} as={`${lang === 'id' ? '/tag/' : '/en/tag/'}${tag}`} href={hrefSlugTag}>
                <a className="hover:underline inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {`#${tag}`}
                </a>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
