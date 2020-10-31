import PostList from '@/components/Post/List'

export default function MoreStories ({ posts, lang = 'id' }) {
  return (
    <section>
      <h2 className="mb-8 text-6xl font-bold tracking-tighter leading-tight">More Stories...</h2>
      <PostList posts={posts} lang={lang} />
    </section>
  )
}
