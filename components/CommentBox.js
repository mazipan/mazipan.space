import React from 'react'
import useIntersect from '@/hooks/useIntersect'

const insertAttribute = (node) => {
  node.setAttribute('data-repo', 'mazipan/blog-comments')
  node.setAttribute('data-repo-id', 'MDEwOlJlcG9zaXRvcnkyOTg3MjA2Mjk=')
  node.setAttribute('data-category', 'Q&A')
  node.setAttribute('data-category-id', 'DIC_kwDOEc4ddc4CcD5P')
  node.setAttribute('data-mapping', 'pathname')
  node.setAttribute('data-strict', '0')
  node.setAttribute('data-reactions-enabled', '1')
  node.setAttribute('data-emit-metadata', '0')
  node.setAttribute('data-input-position', 'top')
  node.setAttribute('data-theme', 'dark')
  node.setAttribute('data-lang', 'id')
  node.setAttribute('data-loading', 'lazy')
  node.setAttribute('crossorigin', 'anonymous')
}

export default function CommentBox () {
  const onIntersect = () => {
    try {
      const script = document.createElement('script')
      insertAttribute(script)

      script.onload = () => {
        const idSkeleton = document.getElementById('comment-skeleton')
        if (idSkeleton) {
          setTimeout(() => {
            idSkeleton.remove()
          }, 1000)
        }
      }

      script.async = true
      script.src = 'https://giscus.app/client.js'

      const idParent = document.getElementById('comments')
      if (idParent) {
        insertAttribute(idParent)
        idParent.appendChild(script)
      }
    } catch (e) {
      console.error('Failed insert utterances.es', e)
    }
  }
  const targetRef = useIntersect(onIntersect, {}, true)

  return (
    <div id="comments" className="relative mt-4" ref={targetRef}>
      <div id="comment-skeleton" className="flex justify-center">
        <div className="w-full max-w-760 rounded-lg p-4 mb-2 overflow-hidden shadow-lg dark:bg-gray-800">
          <div className="flex">
            <div className="rounded w-20 h-8 bg-gray-600 mr-2"></div>
            <div className="rounded w-20 h-8 bg-gray-600"></div>
          </div>
          <div className="rounded w-full h-28 bg-gray-600 my-2 flex items-center justify-center text-xl md:text-2xl">
            Loading comments...
          </div>
          <div className="flex justify-between">
            <div className="rounded w-40 h-4 bg-gray-600 mr-2"></div>
            <div className="rounded w-28 h-10 bg-gray-600"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
