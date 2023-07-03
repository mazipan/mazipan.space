import Head from 'next/head'

import Hero from '@/components/Hero'
import ContainerBox from '@/components/ContainerBox'
import MoreStories from '@/components/Post/Home'
import Pagination from '@/components/Pagination'
import Layout from '@/components/Layout/Default'

import { getPagedPost } from '@/lib/api'

export default function Index({ data, page, pages }) {
  return (
    <>
      <Head>
        <title>🏠 Home of mazipan.space</title>
      </Head>
      <Layout HeroComponent={<Hero />}>
        <ContainerBox>
          <MoreStories posts={data} lang="en" />
          <Pagination next="2" pages={pages} page={page} lang="en" />
        </ContainerBox>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const { data, page, pages } = await getPagedPost(
    ['title', 'date', 'slug', 'author', 'coverImage', 'excerpt', 'tags'],
    1,
    'en'
  )

  return {
    props: { data, page, pages }
  }
}
