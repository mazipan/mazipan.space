import Meta from '@/components/Meta/Custom'
import LayoutArticle from '@/components/Layout/Default'
import { SITE_METADATA } from '@/lib/constants'
import BOOKMARKS from '@/lib/bookmarks'

const BADGE_COLOR_MAP = {
  website: "bg-red-100 text-red-600",
  article: "bg-blue-100 text-blue-600",
  newletter: "bg-green-100 text-green-600",
  tools: "bg-violet-100 text-violet-600"
}

export default function BookamrksPage() {
  return (
    <>
      <LayoutArticle>
        <>
          <Meta
            lang="id"
            title="Bookmarks // mazipan.space"
            description="Useful websites and articles, curated by mazipan"
            url={`${SITE_METADATA.url}/bookmarks`}
          />
          <h2 className="mb-8 text-6xl md:text-7xl font-heading font-bold tracking-tighter leading-tight">
            📌 Bookmarks
          </h2>
          <div className="content">
            <p className="mb-4">
              Useful websites and articles, curated by mazipan
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {BOOKMARKS.map(bookmark => (
                <li
                  key={bookmark.link}
                  className="rounded-lg p-4 overflow-hidden shadow-lg border-2 border-red-500 bg-white dark:bg-gray-800"
                >
                  <h4 className="text-sm text-red-500 font-bold mb-2">
                    {bookmark.title}
                  </h4>
                  <div className="text-gray-600 dark:text-gray-200">
                    <a
                      className="underline"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={bookmark.link}>
                      <small>{new URL(bookmark.link).hostname}</small>
                    </a>
                  </div>
                  <div className="flex mt-4">
                    <span
                      className={`hover:underline inline-block rounded-full px-3 py-1 text-xs font-semibold mr-2 ${BADGE_COLOR_MAP[bookmark.type] || "bg-cyan-100 text-cyan-600"}`}
                    >
                      {bookmark.type}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      </LayoutArticle>
    </>
  )
}
