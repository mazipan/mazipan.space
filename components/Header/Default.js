import Link from 'next/link'

import LoveIcon from '@/components/Icons/MenuLove'
import ZapIcon from '@/components/Icons/MenuZap'
import MicIcon from '@/components/Icons/MenuMic'
import InfoIcon from '@/components/Icons/MenuInfo'

import useLang from '@/hooks/useLang'
import useTheme from '@/hooks/useTheme'

export default function Header () {
  const { isId } = useLang()
  const { NextThemeIcon, nextTheme, onSwitchTheme } = useTheme()

  return (
    <header className="fixed w-full top-0 left-0 p-4 z-20 bg-gray-100 dark:bg-gray-900 flex items-center justify-between shadow-medium border-bottom-gradient">
      <h1 className="h2 font-heading text-gradient">
        <Link href={`${isId ? '/' : '/en'}`}>
          <a>{'<Mazipan />'}</a>
        </Link>
      </h1>
      <div className="flex items-center justify-between">
        <Link href="/talks">
          <a className="text-link hidden items-center md:flex md:mr-4 font-bold">
            <MicIcon />
            {'  Talks'}
          </a>
        </Link>
        <Link href="/speed">
          <a className="text-link hidden items-center md:flex md:mr-4 font-bold">
            <ZapIcon />
            {'  Speed'}
          </a>
        </Link>
        <Link href="/support">
          <a className="text-link hidden items-center md:flex md:mr-4 font-bold">
            <LoveIcon />
            {'  Support'}
          </a>
        </Link>
        <Link href="/about">
          <a className="text-link hidden items-center md:flex md:mr-4 font-bold">
            <InfoIcon />
            {'  About'}
          </a>
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
