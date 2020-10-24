import Head from 'next/head'
import { Fragment } from 'react'

import PostPreview from '@/components/post-preview'
import LayoutArticle from '@/components/layout-article'

import { getPostsByTag, getAllTags } from '@/lib/api'

export default function Index ({ allPosts, tag }) {
  return (
    <>
      <LayoutArticle>
        <Fragment>
          <Head>
            <title>Artikel dengan tag {tag} | mazipan.space</title>
          </Head>
          <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
            #{tag}
          </h2>

          {allPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 md:col-gap-8 lg:col-gap-16 row-gap-5 md:row-gap-16 mb-16">
              {allPosts.map((post) => (
                <PostPreview
                  key={post.slug}
                  title={post.title}
                  coverImage={post.coverImage}
                  date={post.date}
                  author={post.author}
                  slug={post.slug}
                  excerpt={post.excerpt}
                  tags={post.tags}
                />
              ))}
            </div>
          )}
        </Fragment>
      </LayoutArticle>
    </>
  )
}

export async function getStaticProps ({ params }) {
  const allPosts = getPostsByTag(params.tag)
  return {
    props: {
      allPosts,
      tag: params.tag
    }
  }
}

export async function getStaticPaths () {
  const tags = getAllTags()

  return {
    paths: tags.map((tag) => {
      return {
        params: {
          tag: tag
        }
      }
    }),
    fallback: false
  }
}
