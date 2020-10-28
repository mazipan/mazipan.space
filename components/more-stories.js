import PostCard from '@/components/Post/Card'

export default function MoreStories ({ posts }) {
  return (
    <section>
      <h2 className="mb-8 text-6xl font-bold tracking-tighter leading-tight">
        More Stories...
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:col-gap-8 row-gap-5 md:row-gap-8 mb-16">
        {posts.map((post) => (
          <PostCard
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
            tags={post.tags}
          />
        ))}
      </div>
    </section>
  )
}
