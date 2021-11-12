import { Fragment } from 'react'

import Meta from '@/components/Meta/Custom'
import LayoutArticle from '@/components/Layout/Default'
import { SITE_METADATA } from '@/lib/constants'

export default function OnlyForLogin ({ email }) {
  return (
    <>
      <LayoutArticle>
        <Fragment>
          <Meta
            lang="id"
            title="Only For Login Example // mazipan.space"
            description="Only For Login Example // mazipan.space"
            url={`${SITE_METADATA.url}/examples/only-for-login`}
          />
          <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
            Only for logged in user
          </h2>
          <div className="content">
            <h2 className="text-3xl md:text-4xl font-bold">Hi 👋, {email}.</h2>
            <h3 className="text-3xl md:text-4xl font-bold">You are logged in now!</h3>
          </div>
        </Fragment>
      </LayoutArticle>
    </>
  )
}

OnlyForLogin.getInitialProps = async (ctx) => {
  const isLogin = ctx.req.cookies['__is-login'] || 0
  const email = ctx.req.cookies.__email || ''

  if (!isLogin) {
    ctx.res.writeHead(302, { Location: '/examples/unauthorized' })
    ctx.res.end()
  }

  return {
    isLogin: Boolean(isLogin),
    email
  }
}
