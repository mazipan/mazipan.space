import Link from 'next/link'

const getUniqueTags = (tags) => {
  return [...new Set(tags)];
}

const Tag = ({ tag, id, useLink, tagBaseLink = '/tag', tagPattern = '/tag/[tag]' }) => {
  if (useLink) {
    return (
      <Link as={`${tagBaseLink}/${tag}`} href={tagPattern}>
        <a data-key={`${id}-${tag}`} title={tag} className="hover:underline inline-block bg-red-100 text-red-600 rounded-full px-3 py-1 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2">
          {`#${tag}`}
        </a>
      </Link>
    )
  }

  return (
    <div data-key={`${id}-${tag}`} className="inline-block text-red-500 text-sm font-semibold">
      {`#${tag}`}
    </div>
  )
}

export default function Tags({ id = '', tags = [], useLink, tagBaseLink = '/tag', tagPattern = '/tag/[tag]' }) {
  const uniqueTags = getUniqueTags(tags);

  return (
    <div className="flex gap-2">
      {uniqueTags &&
        uniqueTags.map((tag) => {
          return (
            <Tag
              key={`${id}-${tag}`}
              tag={tag}
              useLink={useLink}
              tagBaseLink={tagBaseLink}
              tagPattern={tagPattern} />
          )
        }
        )}
    </div>
  )
}
