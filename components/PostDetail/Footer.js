const BASE_LOCATION = 'https://github.com/mazipan/mazipan.space/edit/master/_posts';

export default function PostFooter({ fileLocation }) {
  return (
    <div className='flex gap-2 mb-4'>
      <a
        title="Update article"
        target="_blank"
        rel="noopener noreferrer"
        className='border-dashed border-red-500 border-b-2 text-red-500'
        href={`${BASE_LOCATION}${fileLocation}`}>📝 Edit this page</a>
    </div>
  )
}
