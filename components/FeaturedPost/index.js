import Link from 'next/link'
import Image from 'next/image'

import DateFormatter from '@/components/Date'

export default function HeroPost ({ title, coverImage, date, excerpt, author, slug, lang = 'id' }) {
  const hrefSlug = lang === 'id' ? '/[slug]' : '/en/[slug]'

  return (
    <section>
      <div className="mb-8 relative">
        <div className="absolute bg-red-400 bottom-0 z-10 text-xs px-2 py-1 mb-4 ml-2 rounded-full">FEATURED</div>
        <Image
          src={coverImage}
          alt={`Cover ${title}`}
          width={1240}
          height={600}
          layout='responsive'
          sizes="100vw"
          priority={true}
          className="w-full rounded-lg object-cover"
        />
      </div>
      <div className="mb-20">
        <h2 className="mb-4 font-heading font-bold  text-gradient text-3xl md:text-4xl tracking-tighter leading-tight">
          <Link as={`/${slug}`} href={hrefSlug}>
            <a className="hover:underline">{title}</a>
          </Link>
        </h2>
        <div className="mb-4 text-sm text-gray-500">
          <DateFormatter dateString={date} />
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
        </div>
      </div>
    </section>
  )
}
