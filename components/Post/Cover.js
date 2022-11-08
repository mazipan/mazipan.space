import Link from 'next/link'
import Image from 'next/image'


function SharedImage ({ title, src }) {
  return (
    <div style={{ width: "100%", height: "222px" }}>
      <Image
        src={src}
        alt={`${title}`}
        width={448}
        height={222}
        sizes="100vw"
        style={{ width: "100%", height: "222px" }}
        className={`w-full rounded-t-md object-cover`}
      />
    </div>
  )
}

export default function CoverImage ({ title, src, slug, lang = 'id' }) {
  const hrefSlug = lang === 'id' ? '/[slug]' : '/en/[slug]'

  return (
    <div className="p-4">
      {slug ? (
        <Link as={`/${slug}`} href={hrefSlug} aria-label={title} title={title}>
            <SharedImage title={title} src={src} />
        </Link>
      ) : (
        <SharedImage title={title} src={src} />
      )}
    </div>
  )
}
