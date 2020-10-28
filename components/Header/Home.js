import Link from 'next/link'

export default function Intro () {
  return (
    <header className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="h1 text-gradient">
        {'<Mazipan />'}
      </h1>
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
