import Head from 'next/head'
import Link from 'next/link'

import Container from '@/components/container'
import List from '@/components/Post/List'
import Header from '@/components/Header/Default'
import Layout from '@/components/layout'

import { getPagedPost, getAvailablePage } from '@/lib/api'

export default function PagedPost ({ data, page, next, prev }) {
  return (
    <>
      <Layout>
        <Head>
          <title>Page {page} | mazipan.space</title>
        </Head>
        <Container>
          <Header />

          {data.length > 0 && <List posts={data} lang="en" />}
          <div className="flex justify-between items-center mb-16">
            {prev ? (
              <Link as={`/en/page/${prev}`} href={'/en/page/[page]'}>
                <a aria-label="Previous page">
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-l">
                    &lt; Prev
                  </button>
                </a>
              </Link>
            ) : (
              <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l cursor-not-allowed">
                &lt; Prev
              </button>
            )}

            {next ? (
              <Link as={`/en/page/${next}`} href={'/en/page/[page]'}>
                <a aria-label="Next page">
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-r">
                    Next &gt;
                  </button>
                </a>
              </Link>
            ) : (
              <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r  cursor-not-allowed">
                Next &gt;
              </button>
            )}
          </div>
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps ({ params }) {
  const { data, next, prev } = getPagedPost(
    ['title', 'date', 'slug', 'author', 'coverImage', 'excerpt', 'tags'],
    params.page,
    'en'
  )

  return {
    props: { data, page: `${params.page}`, next, prev }
  }
}

export async function getStaticPaths () {
  const pages = getAvailablePage('en')

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
