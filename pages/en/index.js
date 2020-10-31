import Head from 'next/head'

import Container from '@/components/container'
import MoreStories from '@/components/more-stories'
import HeroPost from '@/components/FeaturedPost'
import HeaderHome from '@/components/Header/Home'
import Pagination from '@/components/Pagination'
import Layout from '@/components/layout'

import { getPagedPost } from '@/lib/api'

export default function Index ({ data }) {
  const heroPost = data[0]
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
              slug={`en/${heroPost.slug}`}
              excerpt={heroPost.excerpt}
              lang="en"
            />
          )}
          <MoreStories posts={data} lang="en" />
          <Pagination next="2" lang="en" />
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps () {
  const { data } = getPagedPost([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
    'tags'
  ], 1, 'en')

  return {
    props: { data }
  }
}
