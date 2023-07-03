import { useRouter } from 'next/router'
import Link from 'next/link'

function ActiveLink({ children, href, inline, left }) {
  const router = useRouter()
  const isActive = router.asPath === href

  return (
    <Link href={href} passHref>
      <a className={`rounded-md p-4 font-bold flex ${inline ? '' : 'flex-col'} items-center ${left ? 'justify-start' : 'justify-center'} ${isActive ? 'text-red-500' : ''}`}>
        {children}
      </a>
    </Link>
  )
}

export default ActiveLink
