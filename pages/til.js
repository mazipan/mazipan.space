import Head from 'next/head'
import Link from 'next/link'

import DateFormatter from '@/components/Date'
import Container from '@/components/ContainerBox'
import Layout from '@/components/Layout/Default'

import { getPagedTils } from '@/lib/tils'

export default function TilPage({ data, next, prev }) {
  const hrefSlug = '/til/[slug]'

  return (
    <>
      <Layout>
        <Head>
          <title>🧘‍♂️ TIL // mazipan.space</title>
        </Head>
        <Container>
          {data.map(til => (
            <Link key={til.slug} as={`/til/${til.slug}`} href={hrefSlug}>
              <a className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-medium transition-shadow duration-200s dark:bg-gray-800">
                <div className="text-sm text-gray-500 flex gap-2">
                  <DateFormatter dateString={til.date} />

                  {til.tags && til.tags.length > 0 && (
                    <>
                      {til.tags.map((tag) => (
                        <span key={tag} className="inline-block bg-red-100 text-red-600 rounded-full p-1 text-xs">
                          {`#${tag}`}
                        </span>
                      ))}
                    </>
                  )}
                </div>

                <h2 className="font-heading font-bold text-2xl">
                  {til.title}
                </h2>
              </a>
            </Link>
          ))}

          <div className="flex items-center my-8">
            {prev ? (
              <Link as={`/til/page/${prev}`} href="/til/page/[page]">
                <a aria-label="Previous page">
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-l focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2">
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
        </Container>
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
