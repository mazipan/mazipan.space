import Image from 'next/image'

function MarkdownImage ({ src, alt }) {
  return (
    <figure>
      <Image src={src} alt={alt} layout="fill" objectFit />
      <figcaption>{alt}</figcaption>
    </figure>
  )
}

export default MarkdownImage
