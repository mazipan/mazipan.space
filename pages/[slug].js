import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import { Fragment } from 'react'

import PostBody from '@/components/post-body'
import PostHeader from '@/components/post-header'

import CommentBox from '@/components/comment-box'
import ShareArticle from '@/components/share-article'

import LayoutArticle from '@/components/layout-article'

import { getPostBySlug, getAllPosts } from '@/lib/api'
import { SITE_METADATA } from '@/lib/constants'

export default function Post ({ post, morePosts, preview }) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <>
      <LayoutArticle preview={preview}>
        <Fragment>
          <Head>
            <title>{post.title} | mazipan.space</title>
            <meta name="description" content={post.excerpt} />
            <meta name="keywords" content={post.tags.join(',')} />

            <meta property="og:site_name" content={SITE_METADATA.title} />
            <meta property="og:image" content={`${SITE_METADATA.url}${post.coverImage}`} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="article:author" content={'mazipanneh'} />
            <meta property="article:tag" content={`${post.tags[0]}`} />
            <meta property="og:type" content="article" />
            <meta property="og:title" content={post.title} />
            <meta property="og:description" content={post.excerpt} />
            <meta property="og:url" content={`${SITE_METADATA.url}/${post.slug}`} />

            <meta name="twitter:image" content={`${SITE_METADATA.url}${post.coverImage}`} />
            <meta name="twitter:image:width" content="1200" />
            <meta name="twitter:image:height" content="630" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={post.title} />
            <meta name="twitter:description" content={post.excerpt} />
            <meta name="twitter:url" content={`${SITE_METADATA.url}/${post.slug}`} />
            <meta name="twitter:creator" content={'@maz_ipan'} />
            <meta name="twitter:label1" content="Under tag" />
            <meta name="twitter:data1" content={`${post.tags[0]}`} />
          </Head>
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            tags={post.tags}
          />
          <PostBody content={post.content} />
          <ShareArticle text={post.title} url={`${SITE_METADATA.url}/${post.slug}`} />
          <CommentBox />
        </Fragment>
      </LayoutArticle>
    </>
  )
}

export async function getStaticProps ({ params }) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'excerpt',
    'slug',
    'author',
    'content',
    'tags',
    'coverImage'
  ])

  return {
    props: {
      post: {
        ...post,
        content: post.content
      }
    }
  }
}

export async function getStaticPaths () {
  const posts = getAllPosts(['slug'])

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
