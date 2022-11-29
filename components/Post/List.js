import PostCard from '@/components/Post/Card'

export default function PostList ({ posts, showExcerpt, lang = 'id', small = false }) {
  return (
    <>
      {posts.map((post) => (
        <PostCard
          key={post.slug}
          title={post.title}
          coverImage={post.coverImage}
          date={post.date}
          author={post.author}
          slug={`${lang === 'id' ? '' : 'en/'}${post.slug}`}
          excerpt={showExcerpt ? post.excerpt : ''}
          tags={post.tags}
          lang={lang}
          small={small}
        />
      ))}
    </>
  )
}
