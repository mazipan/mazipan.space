import cn from 'classnames'
import Link from 'next/link'
import Image from 'next/image'

export default function CoverImage ({ title, src, slug }) {
  const image = (
    <Image
      src={src}
      alt={`Cover ${title}`}
      width={588}
      height={300}
      className={cn('', {
        'w-full rounded-t-lg object-cover': slug
      })}
    />
  )
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link as={`/${slug}`} href="/[slug]">
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  )
}
