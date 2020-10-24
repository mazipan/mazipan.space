import Link from 'next/link'

export default function Header () {
  return (
    <div className="flex justify-between items-center mb-20 mt-8">
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight">
        <Link href="/">
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
    </div>
  )
}
