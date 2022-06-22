import Link from 'next/link'
import Image from 'next/image'

import DateFormatter from '@/components/Date'

export default function HeroPost({ title, coverImage, date, excerpt, author, slug, lang = 'id' }) {
  const hrefSlug = lang === 'id' ? '/[slug]' : '/en/[slug]'

  return (
    <section data-test-id="featured-post" className="relative">
      <div className="flex items-start mb-8 z-10 p-4 rounded-lg overflow-hidden shadow-lg hover:shadow-medium transition-shadow duration-200s bg-white dark:bg-gray-800">
        <div style={{ width: 300 }} className="mr-4 hidden md:block">
          <Image
            src={coverImage}
            alt={`${title}`}
            width={300}
            height={300}
            layout='responsive'
            className="w-full rounded-lg object-cover"
          />
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex gap-4">
            <span className="inline-block bg-red-100 text-red-600 rounded-full px-3 py-1 text-xs font-semibold">📌 FEATURED</span>
          </div>
          <div>
            <h2 className="font-heading font-bold  text-gradient text-3xl md:text-4xl tracking-tighter leading-tight">
              <Link as={`/${slug}`} href={hrefSlug}>
                <a className="hover:underline">{title}</a>
              </Link>
            </h2>
            <div className="text-sm text-gray-600 dark:text-gray-200">
              <DateFormatter dateString={date} />
            </div>
          </div>
          <div>
            <p className="text-lg leading-relaxed">{excerpt}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
