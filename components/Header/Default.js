import Link from 'next/link'
import useLang from '@/hooks/useLang'

export default function Header () {
  const { isId } = useLang()

  return (
    <header className="header-def">
      <h2 className="h2 text-gradient rubberBand">
        <Link href={`${isId ? '/' : '/en'}`}>
          <a>{'<Mazipan />'}</a>
        </Link>
      </h2>
      <div>
        <Link href="/talks">
          <a className="text-link mr-2 md:mr-4 font-bold">{'Talks'}</a>
        </Link>
        <Link href="/support">
          <a className="text-link mr-2 md:mr-4 font-bold">{'Support'}</a>
        </Link>
        <Link href="/about">
          <a className="text-link font-bold">{'About'}</a>
        </Link>
      </div>
    </header>
  )
}
