import Image from 'next/image'

function MarkdownImage ({ src, alt }) {
  return (
    <figure>
      <Image src={src} alt={alt} unsized />
      <figcaption>{alt}</figcaption>
    </figure>
  )
}

export default MarkdownImage
