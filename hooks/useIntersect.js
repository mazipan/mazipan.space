import { useRef, useEffect, useCallback } from 'react'

const initialOptions = {
  root: null,
  rootMargin: '0px',
  threshold: [0.05, 0.3, 0.6, 0.95]
}

const useIntersect = (onIntersect, optionsData, onlyOnce = false) => {
  const intersected = useRef(false)
  const targetRef = useRef()
  const observer = useRef(null)

  const options = optionsData || initialOptions

  const handleIntersect = useCallback(
    entries => {
      const isIntersecting = entries[0] ? entries[0].isIntersecting : false

      if (isIntersecting) {
        onIntersect()

        if (!intersected.current && observer.current && onlyOnce) {
          observer.current.disconnect()
          observer.current = null
          intersected.current = true
        }
      }
    },
    [onIntersect, observer, intersected]
  )

  useEffect(() => {
    if (!intersected.current && !observer.current) {
      observer.current = new IntersectionObserver(handleIntersect, options)
      observer.current.observe(targetRef.current)
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect()
        observer.current = null
      }
    }
  }, [handleIntersect, options, targetRef])

  return targetRef
}

export default useIntersect
