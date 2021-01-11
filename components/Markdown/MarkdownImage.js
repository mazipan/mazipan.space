import Image from 'next/image'

function MarkdownImage ({ src, alt }) {
  return (
    <figure>
      <Image src={src} alt={alt} layout="intrinsic" objectFit sizes="100vw" width={604} height={300} />
      <figcaption>{alt}</figcaption>
    </figure>
  )
}

export default MarkdownImage
