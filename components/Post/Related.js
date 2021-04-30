import PostList from '@/components/Post/List'

export default function MoreStories ({ posts, lang = 'id' }) {
  return (
    <section>
      <h3 className="mb-4 text-3xl font-heading font-bold tracking-tighter leading-tight">Related post...</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-8 gap-y-5 md:gap-y-8 mb-16">
        <PostList posts={posts} lang={lang} />
      </div>
    </section>
  )
}
