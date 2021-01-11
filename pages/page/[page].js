import Head from 'next/head'

import Container from '@/components/ContainerBox'
import List from '@/components/Post/List'
import Header from '@/components/Header/Default'
import Pagination from '@/components/Pagination'
import Layout from '@/components/Layout/Home'

import { getPagedPost, getAvailablePage } from '@/lib/api'

export default function PagedPost ({ data, page, next, prev }) {
  return (
    <>
      <Layout>
        <Head>
          <title>Halaman {page} | mazipan.space</title>
        </Head>
        <Container>
          <Header />

          <section>
           <div className="grid grid-cols-1 md:grid-cols-2 md:col-gap-8 row-gap-5 md:row-gap-8 mb-16">
             {data.length > 0 && <List posts={data} lang="id" />}
           </div>
          </section>

          <Pagination prev={prev} next={next} lang="id"/>
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps ({ params }) {
  const { data, next, prev } = getPagedPost(
    ['title', 'date', 'slug', 'author', 'coverImage', 'excerpt', 'tags'],
    params.page,
    'id'
  )

  return {
    props: { data, page: `${params.page}`, next, prev }
  }
}

export async function getStaticPaths () {
  const pages = getAvailablePage('id')

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
