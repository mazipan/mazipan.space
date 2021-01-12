import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Link from 'next/link'

import MarkdownParser from '@/components/Markdown/MarkdownParser'
import PostHeader from '@/components/PostDetail/Heading'

import Meta from '@/components/Meta/Custom'
import InfoBox from '@/components/InfoBox'
import CommentBox from '@/components/CommentBox'
import ShareArticle from '@/components/ShareBox'
import Related from '@/components/Post/Related'

import LayoutArticle from '@/components/Layout/Default'

import { getPostBySlug, getAllPosts, getRelatedPost } from '@/lib/api'
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
          <Meta
            lang="id"
            title={`${post.title} | mazipan.space`}
            description={post.excerpt}
            url={`${SITE_METADATA.url}/${post.slug}`}
            coverImage={`${SITE_METADATA.url}${post.coverImage}`}
            tag={`${post.tags[0]}`}
          />
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
          <Related posts={related} lang="id" />
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

  const related = getRelatedPost(post.tags[0], post.slug, 'id')

  return {
    props: {
      post: {
        ...post,
        content: post.content
      },
      related
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
