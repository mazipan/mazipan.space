import { useState } from 'react'

import LoveIcon from '@/components/Icons/MenuLove'
import ZapIcon from '@/components/Icons/MenuZap'
import MicIcon from '@/components/Icons/MenuMic'
import InfoIcon from '@/components/Icons/MenuInfo'
import HomeIcon from '@/components/Icons/Home'
import MenuBook from '@/components/Icons/MenuBook'
import MenuBookmark from '@/components/Icons/MenuBookmark'
import MenuVertical from '@/components/Icons/MenuVertical'

import ActiveLink from './ActiveLink'

export default function FloatingNav() {
  const [showMoreMenu, setShowMoreMenu] = useState(false)

  const handleClickMore = () => {
    setShowMoreMenu(!showMoreMenu)
  }

  return (
    <nav className="md:hidden fixed w-full bottom-0 left-0 z-20 bg-gray-100 dark:bg-gray-900 flex items-center justify-between shadow-medium border-top-gradient">
      <div className="w-full flex items-center justify-between text-sm">
        <ActiveLink href="/">
          <>
            <HomeIcon /> {'Home'}
          </>
        </ActiveLink>
        <ActiveLink href="/til">
          <>
            <MenuBook /> {'TIL'}
          </>
        </ActiveLink>
        <ActiveLink href="/bookmarks">
          <>
            <MenuBookmark /> {'Bookmarks'}
          </>
        </ActiveLink>
        <ActiveLink href="/about">
          <>
            <InfoIcon /> {'About'}
          </>
        </ActiveLink>
        <button onClick={handleClickMore} className="relative py-2 px-4 font-bold flex flex-col items-center">
          <MenuVertical />
          {'More'}

          <div className={`${showMoreMenu ? 'block' : 'hidden'} absolute flex flex-col justify-start bottom-20 right-4 bg-gray-100 dark:bg-gray-900 shadow-lg rounded-md`}>
            <ActiveLink href="/talks" left inline>
              <>
                <MicIcon />
                <span className="pl-2">Talks</span>
              </>
            </ActiveLink>
            <ActiveLink href="/speed" left inline>
              <>
                <ZapIcon />
                <span className="pl-2">Speed</span>
              </>
            </ActiveLink>
            <ActiveLink href="/support" left inline>
              <>
                <LoveIcon />
                <span className="pl-2">Support</span>
              </>
            </ActiveLink>
          </div>
        </button>
      </div>
    </nav>
  )
}
