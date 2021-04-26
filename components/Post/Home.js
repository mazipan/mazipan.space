import PostList from '@/components/Post/List'

export default function MoreStories ({ posts, lang = 'id' }) {
  return (
    <section>
      <h2 className="mb-8 text-6xl font-bold tracking-tighter leading-tight">More articles...</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-8 gap-y-5 md:gap-y-8 mb-16">
        <PostList posts={posts} lang={lang} showExcerpt />
      </div>
    </section>
  )
}
