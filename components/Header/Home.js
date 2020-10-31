import Link from 'next/link'
import useLang from '@/hooks/useLang'

export default function Intro () {
  const { isId } = useLang()

  return (
    <header className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="h1 text-gradient">{'<Mazipan />'}</h1>
      <div>
        <Link href="/talks">
          <a className="text-link font-bold mr-2 md:mr-4">{'Talks'}</a>
        </Link>
        <Link href="/support">
          <a className="text-link font-bold mr-2 md:mr-4">{'Support'}</a>
        </Link>
        <Link href="/about">
          <a className="text-link font-bold mr-2 md:mr-4">{'About'}</a>
        </Link>
        {isId ? (
          <Link href="/en">
            <a className="text-link font-bold">{'EN'}</a>
          </Link>
        ) : (
          <Link href="/">
            <a className="text-link font-bold">{'ID'}</a>
          </Link>
        )}
      </div>
    </header>
  )
}
