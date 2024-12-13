import Head from 'next/head'

import Hero from '__components/Hero'
import ContainerBox from '__components/ContainerBox'
import MoreStories from '__components/Post/Home'
import Pagination from '__components/Pagination'
import Layout from '__components/Layout/Default'

import { DEFAULT_FIELDS, getPagedPost } from '__lib/api'

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
    DEFAULT_FIELDS,
    1,
    'en'
  )

  return {
    props: { data, page, pages }
  }
}
