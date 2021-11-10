import Link from 'next/link'
import Image from 'next/image'

export default function CoverImage ({ title, src, slug, lang = 'id' }) {
  const hrefSlug = lang === 'id' ? '/[slug]' : '/en/[slug]'

  const image = (
    <Image
      src={src}
      alt={`Cover ${title}`}
      width={604}
      height={300}
      layout='responsive'
      sizes="100vw"
      className={`w-full rounded-t-lg object-cover ${slug}`}
    />
  )

  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link as={`/${slug}`} href={hrefSlug}>
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  )
}
