import Head from 'next/head'

import Container from '@/components/ContainerBox'
import MoreStories from '@/components/Post/Home'
import HeroPost from '@/components/FeaturedPost'
import Pagination from '@/components/Pagination'
import Layout from '@/components/Layout/Default'

import { getPagedPost, getFeaturedPost } from '@/lib/api'

export default function Index ({ data, page, pages, featured }) {
  return (
    <>
      <Layout>
        <Head>
          <title>🏠 Blog Irfan Maulana // mazipan.space</title>
        </Head>
        <Container>
          {featured && (
            <HeroPost
              title={featured.title}
              coverImage={featured.coverImage}
              date={featured.date}
              author={featured.author}
              slug={featured.slug}
              excerpt={featured.excerpt}
              lang="id"
            />
          )}
          <MoreStories posts={data} lang="id" />
          <Pagination next="2" pages={pages} page={page} lang="id" />
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps () {
  const { data: featured } = await getFeaturedPost(
    ['title', 'date', 'slug', 'author', 'featured', 'coverImage', 'excerpt', 'tags'],
    'id'
  )

  const { data, page, pages } = await getPagedPost(
    ['title', 'date', 'slug', 'author', 'coverImage', 'excerpt', 'tags'],
    1,
    'id'
  )

  return {
    props: { data, page, pages, featured }
  }
}
