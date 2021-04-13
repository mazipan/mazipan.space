import { useRouter } from 'next/router'
import Link from 'next/link'

function ActiveLink ({ children, href }) {
  const router = useRouter()
  const isActive = router.asPath === href

  return (
    <Link href={href} passHref>
      <a className={`font-bold flex flex-col items-center ${isActive ? 'text-red-500' : ''}`}>
        {children}
      </a>
    </Link>
  )
}

export default ActiveLink
