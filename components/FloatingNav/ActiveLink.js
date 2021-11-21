import { useRouter } from 'next/router'
import Link from 'next/link'

function ActiveLink({ children, href, flex }) {
  const router = useRouter()
  const isActive = router.asPath === href

  return (
    <Link href={href} passHref>
      <a className={`py-2 px-4 font-bold flex items-center ${flex ? '' : 'flex-col'} ${isActive ? 'text-red-500' : ''}`}>
        {children}
      </a>
    </Link>
  )
}

export default ActiveLink
