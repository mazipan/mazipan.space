import PostCard from '@/components/Post/Card'

export default function PostList ({ posts, lang = 'id' }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:col-gap-8 row-gap-5 md:row-gap-8 mb-16">
      {posts.map((post) => (
        <PostCard
          key={post.slug}
          title={post.title}
          coverImage={post.coverImage}
          date={post.date}
          author={post.author}
          slug={`${lang === 'id' ? '' : 'en/'}${post.slug}`}
          excerpt={post.excerpt}
          tags={post.tags}
          lang={lang}
        />
      ))}
    </div>
  )
}
