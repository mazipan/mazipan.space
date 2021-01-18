function MarkdownImage ({ src, alt }) {
  const nextImage2x = `/_next/image?url=${encodeURIComponent(src)}&w=1200&q=75`
  const nextImage1x = `/_next/image?url=${encodeURIComponent(src)}&w=768&q=75`

  return (
    <div className="flex justify-center items-center">
      <figure>
        <img loading="lazy" src={nextImage2x} alt={alt} srcSet={`${nextImage1x} 1x, ${nextImage2x} 2x`}/>
        <figcaption>{alt}</figcaption>
      </figure>
    </div>
  )
}

export default MarkdownImage
