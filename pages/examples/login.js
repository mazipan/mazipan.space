import { Fragment, useRef } from 'react'

import Meta from '@/components/Meta/Custom'
import LayoutArticle from '@/components/Layout/Default'
import { SITE_METADATA } from '@/lib/constants'

export default function Login () {
  const emailRef = useRef()
  const passwordRef = useRef()

  function setCookie (cname, cvalue, exdays) {
    const d = new Date()
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
    const expires = 'expires=' + d.toUTCString()
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
  }

  const handleLogin = (e) => {
    e.preventDefault()

    const email = emailRef.current.value
    const password = passwordRef.current.value
    if (email && password) {
      setCookie('__is-login', 1, 7)
      setCookie('__email', email, 7)
      window.location.assign('/examples/only-for-login')
    }
  }

  return (
    <>
      <LayoutArticle>
        <Fragment>
          <Meta
            lang="id"
            title="Login Example // mazipan.space"
            description="Login Example // mazipan.space"
            url={`${SITE_METADATA.url}/examples/login`}
          />
          <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
            Login
          </h2>
          <div className="content">
            <form className="rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
              <div className="mb-4">
                <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="username">
                  Email
                </label>
                <input
                  ref={emailRef}
                  required
                  autoComplete="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker dark:bg-gray-700"
                  id="email"
                  type="text"
                />
              </div>
              <div className="mb-6">
                <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  ref={passwordRef}
                  required
                  autoComplete="new-password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker dark:bg-gray-700 mb-3"
                  id="password"
                  type="password"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  type="submit"
                  onClick={handleLogin}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </Fragment>
      </LayoutArticle>
    </>
  )
}
