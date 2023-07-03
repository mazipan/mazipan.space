import Head from 'next/head'
import Link from 'next/link'

import DateFormatter from '@/components/Date'
import ContainerBox from '@/components/ContainerBox'
import Layout from '@/components/Layout/Default'
import Tags from '@/components/Tags'

import { getPagedTils } from '@/lib/tils'

export default function TilPage({ data, next, prev }) {
  const hrefSlug = '/til/[slug]'

  return (
    <>
      <Layout>
        <Head>
          <title>🧘‍♂️ TIL // mazipan.space</title>
        </Head>
        <ContainerBox>

          <h2 className="mb-8 text-6xl md:text-7xl font-heading font-bold tracking-tighter leading-tight">
            📖 TIL
          </h2>

          {data.map(til => (
            <Link key={til.slug} as={`/til/${til.slug}`} href={hrefSlug}>
              <a className="relative block rounded-lg overflow-hidden shadow-lg hover:shadow-medium transition-shadow duration-200s bg-white dark:bg-gray-800 mb-4 p-4">
                <div className="text-sm text-gray-600 dark:text-gray-200 flex gap-2">
                  <DateFormatter dateString={til.date} />
                </div>

                <h3 className="text-gradient font-heading font-bold text-2xl">
                  {til.title}
                </h3>

                <Tags
                  id={til.slug}
                  tags={til.tags} />
              </a>
            </Link>
          ))}

          <div className="relative flex items-center my-8">
            {prev ? (
              <Link as={`/til/page/${prev}`} href="/til/page/[page]">
                <a aria-label="Previous page">
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mr-2 rounded-l focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2">
                    &lt; Prev
                  </button>
                </a>
              </Link>
            ) : (
              <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mr-2 rounded-l cursor-not-allowed">
                &lt; Prev
              </button>
            )}

            {next ? (
              <Link as={`/til/page/${next}`} href="/til/page/[page]">
                <a aria-label="Next page">
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2">
                    Next &gt;
                  </button>
                </a>
              </Link>
            ) : (
              <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r cursor-not-allowed">
                Next &gt;
              </button>
            )}
          </div>
        </ContainerBox>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const { data, next, prev } = await getPagedTils(1)

  return {
    props: { data, next, prev }
  }
}
