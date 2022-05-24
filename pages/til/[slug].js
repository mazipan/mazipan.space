import { useRouter } from 'next/router'
import Link from 'next/link'
import ErrorPage from 'next/error'

import MarkdownParser from '@/components/Markdown/MarkdownContent'

import Meta from '@/components/Meta/Custom'

import LayoutArticle from '@/components/Layout/Default'
import PostTitle from '@/components/PostDetail/Title'
import DateFormatter from '@/components/Date'
import Tags from '@/components/Tags'

import { getTilBySlug, getAllTils } from '@/lib/tils'
import { SITE_METADATA } from '@/lib/constants'

export default function TilDetail({ til, preview }) {
  const router = useRouter()
  if (!router.isFallback && !til?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <>
      <LayoutArticle preview={preview}>
        <>
          <Meta
            lang="id"
            title={`TIL: ${til.title} // mazipan.space`}
            description={til.excerpt}
            url={`${SITE_METADATA.url}/til/${til.slug}`}
            tag={`${til.tags[0]}`}
          />
          <Link as="/til" href="/til">
            <a aria-label="Previous page">
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2">
                &lt; Back to TIL
              </button>
            </a>
          </Link>

          <PostTitle>{til.title}</PostTitle>

          <div className="text-sm text-gray-500 flex gap-2 justify-center md:justify-start">
            <DateFormatter dateString={til.date} />
            <Tags
              tags={til.tags} />
          </div>

          <MarkdownParser content={til.content} />
        </>
      </LayoutArticle>
    </>
  )
}

export async function getStaticProps({ params }) {
  const til = await getTilBySlug(params.slug)
  return {
    props: {
      til: {
        ...til,
        content: til.content
      },
    },
    revalidate: 3
  }
}

export async function getStaticPaths() {
  const posts = await getAllTils()

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug
        }
      }
    }),
    fallback: false
  }
}
