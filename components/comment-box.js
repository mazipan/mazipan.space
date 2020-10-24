import React from 'react'
import useIntersect from '@/hooks/useIntersect'

const insertAttribute = (node) => {
  node.setAttribute('issue-term', 'url')
  node.setAttribute('repo', 'mazipan/blog-comments')
  node.setAttribute('theme', 'github-dark-orange')
  node.setAttribute('crossorigin', 'anonymous')
}

export default function CommentBox () {
  const onIntersect = () => {
    try {
      const script = document.createElement('script')
      insertAttribute(script)
      // @ts-ignore
      script.onload = () => {
        console.debug('> utteranc.es script loaded', script)
      }

      script.async = true
      script.src = 'https://utteranc.es/client.js'

      const id = document.getElementById('comment-block')
      if (id) {
        insertAttribute(id)
        id.appendChild(script)
      }
    } catch (e) {
      console.error('Failed insert utterances.es', e)
    }
  }
  const targetRef = useIntersect(onIntersect, {}, true)

  return <div id="comment-block" ref={targetRef} />
}
