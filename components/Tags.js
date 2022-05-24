import Link from 'next/link'

export default function Tags({ tags, useLink, tagBaseLink = '/tag', tagPattern = '/tag/[tag]' }) {
  return (
    <div className="flex gap-4">
      {tags &&
        tags.map((tag) => {
          return (
            <>
              {useLink ? (
                <Link key={tag} as={`${tagBaseLink}/${tag}`} href={tagPattern}>
                  <a className="hover:underline inline-block bg-red-100 text-red-600 rounded-full px-3 py-1 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2">
                    {`#${tag}`}
                  </a>
                </Link>
              ) : (
                <div className="inline-block text-red-500 text-sm font-semibold">
                  {`#${tag}`}
                </div>
              )}
            </>
          )
        }
        )}
    </div>
  )
}
