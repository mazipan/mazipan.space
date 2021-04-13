import Link from 'next/link'

import useLang from '@/hooks/useLang'
import useTheme from '@/hooks/useTheme'

export default function Header () {
  const { isId } = useLang()
  const { NextThemeIcon, nextTheme, onSwitchTheme } = useTheme()

  return (
    <header className="fixed w-full top-0 left-0 p-4 z-10 bg-gray-100 dark:bg-gray-900 flex items-center justify-between shadow-medium border-bottom-gradient">
      <h1 className="h2 text-gradient">
        <Link href={`${isId ? '/' : '/en'}`}>
          <a>{'<Mazipan />'}</a>
        </Link>
      </h1>
      <div className="flex items-center justify-between">
        <Link href="/talks">
          <a className="text-link hidden md:inline-block md:mr-4 font-bold">{'Talks'}</a>
        </Link>
        <Link href="/speed">
          <a className="text-link hidden md:inline-block md:mr-4 font-bold">{'Speed'}</a>
        </Link>
        <Link href="/support">
          <a className="text-link hidden md:inline-block md:mr-4 font-bold">{'Support'}</a>
        </Link>
        <Link href="/about">
          <a className="text-link hidden md:inline-block md:mr-4 font-bold">{'About'}</a>
        </Link>

        <button
          className="bg-gray-300 dark:bg-gray-800 dark:text-yellow-500 font-bold py-2 px-4 rounded"
          onClick={onSwitchTheme}
          alt={`Switch to ${nextTheme}`}
        >
          {NextThemeIcon}
        </button>
      </div>
    </header>
  )
}
