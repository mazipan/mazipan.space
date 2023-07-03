import Link from 'next/link'
import Image from 'next/image'

import DateFormatter from '@/components/Date'

export default function FeaturedPost({ posts, lang = 'id' }) {
  const hrefSlug = lang === 'id' ? '/[slug]' : '/en/[slug]';
  const [mainPost, ...restPosts] = posts

  return (
    <div className="relative pb-2 mb-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mb-8 border-bottom-gradient">
        <section key={mainPost.slug} data-test-id="featured-post" className="relative">
          <div className="flex flex-col gap-4 pt-4 px-4 md:px-0">
            <div className="w-full">
              <Image
                src={mainPost.coverImage}
                alt={`${mainPost.title}`}
                width={604}
                height={320}
                layout='responsive'
                className="w-full rounded-lg object-cover"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-gray-600 dark:text-gray-200">
                <DateFormatter dateString={mainPost.date} />
              </div>
              <h2 className="font-heading font-bold text-gradient text-3xl md:text-4xl tracking-tighter leading-tight">
                <Link as={`/${mainPost.slug}`} href={hrefSlug}>
                  <a className="hover:underline">{mainPost.title}</a>
                </Link>
              </h2>
            </div>
            <div>
              <p className="text-lg leading-relaxed">{mainPost.excerpt}</p>
            </div>
          </div>
        </section>

        <div className="flex flex-col w-full">
          {restPosts && restPosts.map(post => {
            const { title, coverImage, date, excerpt, author, slug } = post;
            return (
              <section key={slug} data-test-id="featured-post" className="relative">
                <div className="flex items-start flex-col md:flex-row z-10 p-4">
                  <div className="featured-image">
                    <Image
                      src={coverImage}
                      alt={`${title}`}
                      width={300}
                      height={150}
                      layout='responsive'
                      className="w-full rounded-lg object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-2 flex-grow">
                    <div className="text text-gray-600 dark:text-gray-200">
                      <DateFormatter dateString={date} />
                    </div>
                    <h2 className="font-heading font-bold text-gradient text-2xl tracking-tighter leading-tight">
                      <Link as={`/${slug}`} href={hrefSlug}>
                        <a className="hover:underline">{title}</a>
                      </Link>
                    </h2>
                  </div>
                </div>
              </section>
            )
          })}
        </div>
      </div>
    </div>
  )
}
