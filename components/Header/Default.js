import Link from 'next/link'
import useLang from '@/hooks/useLang'

export default function Header () {
  const { isId } = useLang()

  return (
    <header className="header-def">
      <h2 className="h2 text-gradient">
        <Link href={`${isId ? '/' : '/en'}`}>
          <a className="hover:underline">{'<Mazipan />'}</a>
        </Link>
      </h2>
      <div>
        <Link href="/talks">
          <a className="hover:underline pr-2 md:pr-4">{'Talks'}</a>
        </Link>
        <Link href="/support">
          <a className="hover:underline pr-2 md:pr-4">{'Support'}</a>
        </Link>
        <Link href="/about">
          <a className="hover:underline">{'About'}</a>
        </Link>
      </div>
    </header>
  )
}
