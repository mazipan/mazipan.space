import { useState, useEffect } from 'react'

import Container from '@/components/container'
import useTheme from '@/hooks/useTheme'

export default function Footer () {
  const [isMounted, setIsMounted] = useState(false)
  const { nextThemeIcon, nextTheme, onSwitchTheme } = useTheme()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <footer className="bg-accent-1 border-t border-accent-2">
      <Container>
        <div className="pt-8 pb-4 flex justify-center items-center">
          <a
            href="https://www.facebook.com/mazipanneh"
            target="_blank"
            title="Facebook"
            rel="noopener noreferrer"
            className="mx-2 text-gray-700 hover:text-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
          </a>
          <a
            href="https://twitter.com/maz_ipan"
            title="Twitter"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2 text-gray-700 hover:text-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
            </svg>
          </a>
          <a
            href="https://github.com/mazipan"
            title="Github"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2 text-gray-700 hover:text-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/mazipan"
            title="Linkedin"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2 text-gray-700 hover:text-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
          <a
            href="/rss.xml"
            title="RSS"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2 text-gray-700 hover:text-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 11a9 9 0 0 1 9 9" />
              <path d="M4 4a16 16 0 0 1 16 16" />
              <circle cx="5" cy="19" r="1" />
            </svg>
          </a>
        </div>
        {isMounted && (
          <div className="p-2 flex justify-center items-center" onClick={onSwitchTheme}>
            Switch to {nextTheme} {nextThemeIcon}
          </div>
        )}
        <div className="pb-8 flex justify-center items-center">© 2020 All rights reserved</div>
      </Container>
    </footer>
  )
}
