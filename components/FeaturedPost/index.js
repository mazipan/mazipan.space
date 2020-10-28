import Link from 'next/link'

import DateFormatter from '@/components/date-formatter'
import Image from 'next/image'

export default function HeroPost ({ title, coverImage, date, excerpt, author, slug }) {
  return (
    <section>
      <div className="mb-8">
        <Image
          src={coverImage}
          alt={`Cover ${title}`}
          width={1200}
          height={500}
          className="w-full rounded-lg object-cover"
        />
      </div>
      <div className="md:grid md:col-gap-16 lg:col-gap-8 mb-20">
        <div>
          <h3 className="mb-4 font-bold text-3xl md:text-4xl tracking-tighter leading-tight">
            <Link as={`/${slug}`} href="/[slug]">
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
      </div>
    </section>
  )
}
