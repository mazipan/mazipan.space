import Link from 'next/link'

import ThemeMoon from '@/components/Icons/ThemeMoon'
import LoveIcon from '@/components/Icons/MenuLove'
import ZapIcon from '@/components/Icons/MenuZap'
import MicIcon from '@/components/Icons/MenuMic'
import InfoIcon from '@/components/Icons/MenuInfo'
import MenuBook from '@/components/Icons/MenuBook'

import useLang from '@/hooks/useLang'
import useTheme from '@/hooks/useTheme'

export default function Header() {
  const { isId } = useLang()
  const { NextThemeIcon, onSwitchTheme } = useTheme()

  return (
    <header className="fixed w-full top-0 left-0 p-4 z-30 bg-gray-100 dark:bg-gray-900 flex items-center justify-between shadow-medium border-bottom-gradient">
      <h1 className="h2 font-heading text-gradient">
        <Link href={`${isId ? '/' : '/en'}`}>
          {'<Mazipan />'}
        </Link>
      </h1>
      <div className="flex items-center justify-between">
        <Link href="/til" className="text-link hidden items-center md:flex md:mr-4 font-bold">
          <>
            <MenuBook />
            <span className="pl-2">TIL</span>
          </>
        </Link>
        <Link href="/talks" className="text-link hidden items-center md:flex md:mr-4 font-bold">
          <>
            <MicIcon />
            <span className="pl-2">Talks</span>
          </>
        </Link>
        <Link href="/speed" className="text-link hidden items-center md:flex md:mr-4 font-bold">
          <>
            <ZapIcon />
            <span className="pl-2">Speed</span>
          </>
        </Link>
        <Link href="/support" className="text-link hidden items-center md:flex md:mr-4 font-bold">
          <>
            <LoveIcon />
            <span className="pl-2">Support</span>
          </>
        </Link>
        <Link href="/about" className="text-link hidden items-center md:flex md:mr-4 font-bold">
          <>
            <InfoIcon />
            <span className="pl-2">About</span>
          </>
        </Link>

        <button
          role="button"
          aria-label="Switch theme"
          className="bg-gray-300 dark:bg-gray-700 dark:text-amber-500 font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
          onClick={onSwitchTheme}
        >
          {NextThemeIcon ? NextThemeIcon : <ThemeMoon />}
        </button>
      </div>
    </header>
  )
}
