import PostList from '@/components/Post/List'

export default function MoreStories ({ posts, lang = 'id' }) {
  return (
    <section>
      <h3 className="mb-4 text-3xl font-bold tracking-tighter leading-tight">Related post...</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 md:col-gap-8 row-gap-5 md:row-gap-8 mb-16">
        <PostList posts={posts} lang={lang} />
      </div>
    </section>
  )
}
