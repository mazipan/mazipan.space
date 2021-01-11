import Link from 'next/link'
import Image from 'next/image'

import DateFormatter from '@/components/Date'

export default function HeroPost ({ title, coverImage, date, excerpt, author, slug, lang }) {
  const hrefSlug = lang === 'id' ? '/[slug]' : '/en/[slug]'

  return (
    <section>
      <div className="mb-8">
        <Image
          src={coverImage}
          alt={`Cover ${title}`}
          width={1240}
          height={500}
          layout='intrinsic'
          sizes="100vw"
          priority={true}
          className="w-full rounded-lg object-cover"
        />
      </div>
      <div className="mb-20">
        <h3 className="mb-4 font-bold text-3xl md:text-4xl tracking-tighter leading-tight">
          <Link as={`/${slug}`} href={hrefSlug}>
            <a className="hover:underline">{title}</a>
          </Link>
        </h3>
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
