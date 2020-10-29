import Head from 'next/head'

import Container from '@/components/container'
import MoreStories from '@/components/more-stories'
import HeroPost from '@/components/FeaturedPost'
import HeaderHome from '@/components/Header/Home'
import Layout from '@/components/layout'

import { getAllPosts } from '@/lib/api'

export default function Index ({ allPosts }) {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)
  return (
    <>
      <Layout>
        <Head>
          <title>Home | mazipan.space</title>
        </Head>
        <Container>
          <HeaderHome />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} lang="id" />}
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps () {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
    'tags'
  ])

  return {
    props: { allPosts }
  }
}
