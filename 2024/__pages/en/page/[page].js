import Head from 'next/head'

import ContainerBox from '__components/ContainerBox'
import List from '__components/Post/List'
import Pagination from '__components/Pagination'
import Layout from '__components/Layout/Default'

import { getPagedPost, getAvailablePage, DEFAULT_FIELDS } from '__lib/api'

export default function PagedPost ({ data, page, pages, next, prev }) {
  return (
    <>
      <Layout>
        <Head>
          <title>Page {`${page} // mazipan.space`}</title>
        </Head>
        <ContainerBox>
          <section>
            <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-8 gap-y-5 md:gap-y-8 mb-16">
              {data.length > 0 && <List posts={data} lang="en" />}
            </div>
          </section>
          <Pagination prev={prev} next={next} pages={pages} page={page} lang="en" />
        </ContainerBox>
      </Layout>
    </>
  )
}

export async function getStaticProps ({ params }) {
  const { data, next, prev, pages } = await getPagedPost(
    DEFAULT_FIELDS,
    params.page || 1,
    'en'
  )

  return {
    props: { data, page: `${params.page}`, next, prev, pages },
    revalidate: 3
  }
}

export async function getStaticPaths () {
  const pages = await getAvailablePage('en')

  return {
    paths: pages.map((page) => {
      return {
        params: {
          page: `${page}`
        }
      }
    }),
    fallback: false
  }
}
