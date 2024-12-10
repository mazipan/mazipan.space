import Link from 'next/link'

export default function Pagination ({ prev, next, page, pages, lang = 'id' }) {
  const hrefSlug = lang === 'id' ? '/page/[page]' : '/en/page/[page]'
  const asSlug = lang === 'id' ? '/page/' : '/en/page/'
  const homeLink = lang === 'id' ? '/' : '/en/'

  return (
    <div className="flex justify-between items-center mb-8">
      {prev ? (
        <Link as={prev === 1 ? homeLink : `${asSlug}${prev}`} href={prev === 1 ? homeLink : hrefSlug}>
          <a aria-label="Previous page">
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-l focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2">
              &lt; Prev
            </button>
          </a>
        </Link>
      ) : (
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l cursor-not-allowed">
          &lt; Prev
        </button>
      )}

      <div className="hidden md:flex">
        {pages &&
          pages.length > 0 &&
          pages.map((p, idx) => (
            <Link as={p === 1 ? homeLink : `${asSlug}${p}`} href={p === 1 ? homeLink : hrefSlug} key={p}>
              <a aria-label={`Page ${p}`}>
                <button
                  className={`${
                    p.toString() === page.toString()
                      ? 'bg-red-500 hover:bg-red-700 text-white'
                      : 'text-red-500'
                  } border-2 border-red-500 font-bold py-2 px-4 rounded  focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 ${
                    idx !== pages.length - 1 ? 'mr-2' : ''
                  }`}
                >
                  {p}
                </button>
              </a>
            </Link>
          ))}
      </div>

      {next ? (
        <Link as={`${asSlug}${next}`} href={hrefSlug}>
          <a aria-label="Next page">
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2">
              Next &gt;
            </button>
          </a>
        </Link>
      ) : (
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r cursor-not-allowed">
          Next &gt;
        </button>
      )}
    </div>
  )
}
