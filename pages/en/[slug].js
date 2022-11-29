import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Link from 'next/link'

import MarkdownParser from '@/components/Markdown/MarkdownContent'
import PostHeader from '@/components/PostDetail/Heading'
import PostFooter from '@/components/PostDetail/Footer'

import Meta from '@/components/Meta/Custom'
import InfoBox from '@/components/InfoBox'
import CommentBox from '@/components/CommentBox'
import ShareArticle from '@/components/ShareBox'
import Related from '@/components/Post/Related'

import LayoutArticle from '@/components/Layout/Article'

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
            lang="en"
            title={`${post.title} // mazipan.space`}
            description={post.excerpt}
            url={`${SITE_METADATA.url}/en/${post.slug}`}
            coverImage={`${SITE_METADATA.url}${post.coverImage}`}
            tag={`${post.tags[0]}`}
          />
          <PostHeader
            lang="en"
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            tags={post.tags}
          />
          <InfoBox>
            Available in other languages: {' '}

              <ul>
                <li>
                  <Link as={`/${post.slug}`} href="/[slug]">
                    <a className="font-bold underline">🇮🇩 Bahasa Indonesia</a>
                  </Link>
                </li>
              </ul>
          </InfoBox>
          <MarkdownParser content={post.content} />
          <PostFooter fileLocation={post.fileLocation} />
          <ShareArticle text={post.title} url={`${SITE_METADATA.url}/en/${post.slug}`} />
          <CommentBox />
          <Related posts={related} lang="en" />
        </>
      </LayoutArticle>
    </>
  )
}

export async function getStaticProps ({ params }) {
  const post = await getPostBySlug(
    params.slug,
    ['title', 'date', 'slug', 'excerpt', 'author', 'content', 'tags', 'coverImage'],
    'en'
  )

  const related = await getRelatedPost(post.tags[0], post.slug, 'en')

  return {
    props: {
      post: {
        ...post,
        content: post.content
      },
      related
    },
    revalidate: 3
  }
}

export async function getStaticPaths () {
  const posts = await getAllPosts(['slug'], 'en')

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
