import DateFormatter from '../components/date-formatter';
import CoverImage from '../components/cover-image';
import Link from 'next/link';

export default function HeroPost({ title, coverImage, date, excerpt, author, slug }) {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage title={title} src={coverImage} slug={slug} />
      </div>
      <div className="md:grid md:col-gap-16 lg:col-gap-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 font-bold text-6xl md:text-7xl tracking-tighter leading-tight">
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
  );
}
