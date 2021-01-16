import Image from 'next/image'

function MarkdownImage ({ src, alt }) {
  return (
    <div className="flex justify-center items-center">
      <figure>
        <Image src={src} alt={alt} layout="fill" className="object-cover"/>
        <figcaption>{alt}</figcaption>
      </figure>
    </div>
  )
}

export default MarkdownImage
