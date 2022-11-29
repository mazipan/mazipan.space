const BASE_LOCATION = 'https://github.com/mazipan/mazipan.space/edit/master/_posts';

export default function PostFooter({ fileLocation }) {
  return (
    <div className='relative flex gap-2 mb-8'>
      <a
        title="Back to home"
        className='p-2 bg-red-500 text-white rounded'
        href={`/`}>◀️ Back to home</a>
      <a
        title="Update article"
        target="_blank"
        rel="noopener noreferrer"
        className='p-2 bg-red-500 text-white rounded'
        href={`${BASE_LOCATION}${fileLocation}`}>📝 Edit this page</a>
    </div>
  )
}
