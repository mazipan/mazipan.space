import Link from 'next/link'
import Image from 'next/image'


function SharedImage ({ title, src }) {
  return (
    <Image
      src={src}
      alt={`${title}`}
      width={604}
      height={300}
      layout='responsive'
      sizes="100vw"
      className={`w-full rounded-t-lg object-cover`}
    />
  )
}

export default function CoverImage ({ title, src, slug, lang = 'id' }) {
  const hrefSlug = lang === 'id' ? '/[slug]' : '/en/[slug]'

  return (
    <div className="p-2">
      {slug ? (
        <Link as={`/${slug}`} href={hrefSlug}>
          <a aria-label={title} title={title}>
            <SharedImage title={title} src={src} />
          </a>
        </Link>
      ) : (
        <SharedImage title={title} src={src} />
      )}
    </div>
  )
}
