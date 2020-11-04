import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import Link from 'next/link'

import MarkdownParser from '@/components/Markdown/MarkdownParser'
import PostHeader from '@/components/post-header'

import InfoBox from '@/components/InfoBox'
import CommentBox from '@/components/comment-box'
import ShareArticle from '@/components/share-article'
import MoreStories from '@/components/more-stories'

import LayoutArticle from '@/components/layout-article'

import { getPostBySlug, getAllPosts, getPostsByTag } from '@/lib/api'
import { SITE_METADATA } from '@/lib/constants'

export default function Post ({ post, related, preview }) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <>
      <LayoutArticle preview={preview}>
        <>
          <Head>
            <title key="title">{post.title} | mazipan.space</title>
            <meta key="description" name="description" content={post.excerpt} />

            <meta key="article-author" property="article:author" content={'mazipanneh'} />
            <meta key="article-tag" property="article:tag" content={`${post.tags[0]}`} />

            <meta key="og-image" property="og:image" content={`${SITE_METADATA.url}${post.coverImage}`} />
            <meta key="og-type" property="og:type" content="article" />
            <meta key="og-title" property="og:title" content={post.title} />
            <meta key="og-description" property="og:description" content={post.excerpt} />
            <meta key="og-url" property="og:url" content={`${SITE_METADATA.url}/${post.slug}`} />

            <meta key="tw-image" name="twitter:image" content={`${SITE_METADATA.url}${post.coverImage}`} />
            <meta key="tw-title" name="twitter:title" content={post.title} />
            <meta key="tw-description" name="twitter:description" content={post.excerpt} />
            <meta key="tw-url" name="twitter:url" content={`${SITE_METADATA.url}/${post.slug}`} />
            <meta key="tw-creator" name="twitter:creator" content={'@maz_ipan'} />
            <meta key="tw-label1" name="twitter:label1" content="Under tag" />
            <meta key="tw-data1" name="twitter:data1" content={`${post.tags[0]}`} />
          </Head>
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            tags={post.tags}
          />
          {post.enready && (
            <InfoBox>
              Available in other languages:{' '}
              <Link as={`/en/${post.slug}`} href="/en/[slug]">
                <a className="font-bold underline">English</a>
              </Link>
            </InfoBox>
          )}
          <MarkdownParser content={post.content} />
          <ShareArticle text={post.title} url={`${SITE_METADATA.url}/${post.slug}`} />
          <CommentBox />
          <MoreStories posts={related} lang="id" />
        </>
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
    'coverImage',
    'enready'
  ])

  const relatedPost = getPostsByTag(post.tags[0], 'id')

  return {
    props: {
      post: {
        ...post,
        content: post.content
      },
      related: relatedPost.slice(0, 2)
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
