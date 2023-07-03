import Head from 'next/head'

import Hero from '@/components/Hero'
import ContainerBox from '@/components/ContainerBox'
import Home from '@/components/Post/Home'
import FeaturedPost from '@/components/FeaturedPost'
import Pagination from '@/components/Pagination'
import Layout from '@/components/Layout/Default'

import { getPagedPost, getFeaturedPost } from '@/lib/api'

export default function Index({ data, page, pages, featuredPosts }) {
  return (
    <>
      <Head>
        <title>🏠 Blog Irfan Maulana // mazipan.space</title>
      </Head>

      <Layout HeroComponent={<Hero />}>
        <ContainerBox>
          {featuredPosts && (
            <>
              <h2 className="mb-2 text-3xl md:text-4xl font-heading font-bold tracking-tighter leading-tight">PERSONAL STORIES</h2>
              <FeaturedPost
                posts={featuredPosts}
                lang="id"
              />
            </>
          )}
          <Home posts={data} lang="id" />
          <Pagination next="2" pages={pages} page={page} lang="id" />
        </ContainerBox>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const { data: featuredPosts } = await getFeaturedPost(
    ['title', 'date', 'slug', 'author', 'featured', 'coverImage', 'excerpt', 'tags'],
    'id'
  )

  const { data, page, pages } = await getPagedPost(
    ['title', 'date', 'slug', 'author', 'coverImage', 'excerpt', 'tags'],
    1,
    'id'
  )

  return {
    props: { data, page, pages, featuredPosts }
  }
}
