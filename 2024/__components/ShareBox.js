import { useEffect, useState } from 'react'

export default function ShareArticle ({ text, url }) {
  const [isSupportWebShare, setSupportWebShare] = useState(false)

  useEffect(() => {
    if (navigator.share) {
      setSupportWebShare(true)
    }
  }, [])

  const shareMe = (e) => {
    e.preventDefault()

    navigator
      .share({
        title: 'mazipan.space',
        text: text,
        url: url
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error))
  }

  return (
    <div id="share-article" className="relative mb-2 rainbow">
      <div className="flex justify-center items-center mb-2">
        🌟 Thank you for reading
      </div>
      <div className="flex justify-center items-center">
        {isSupportWebShare ? (
          <a
            href={''}
            onClick={shareMe}
            title="Share Article"
            className="flex justify-center items-center text-red-500 rubberBand"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
            Share this article with your friends
          </a>
        ) : (
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              text)}&url=${url}`}
            title="Share to Twitter"
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center text-red-500 rubberBand"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
            </svg>
            Tweet about this article
          </a>
        )}
      </div>
    </div>
  )
}
