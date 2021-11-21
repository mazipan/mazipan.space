import { useState } from 'react'

import LoveIcon from '@/components/Icons/MenuLove'
import ZapIcon from '@/components/Icons/MenuZap'
import MicIcon from '@/components/Icons/MenuMic'
import InfoIcon from '@/components/Icons/MenuInfo'
import HomeIcon from '@/components/Icons/Home'
import MenuBook from '@/components/Icons/MenuBook'
import MenuVertical from '@/components/Icons/MenuVertical'

import ActiveLink from './ActiveLink'

export default function FloatingNav() {
  const [showMoreMenu, setShowMoreMenu] = useState(false)

  const handleClickMore = () => {
    setShowMoreMenu(!showMoreMenu)
  }

  return (
    <nav className="md:hidden fixed w-full bottom-0 left-0 z-20 bg-gray-100 dark:bg-gray-900 flex items-center justify-between shadow-medium border-top-gradient">
      <div className="w-full flex items-center justify-between">
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
        <ActiveLink href="/talks">
          <>
            <MicIcon /> {'Talks'}
          </>
        </ActiveLink>
        <ActiveLink href="/speed">
          <>
            <ZapIcon />
            {'Speed'}
          </>
        </ActiveLink>
        <button onClick={handleClickMore} className="relative py-2 px-4 font-bold flex flex-col items-center">
          <MenuVertical />
          {'More'}

          <div className={`${showMoreMenu ? 'block' : 'hidden'} absolute bottom-16 right-0 bg-gray-100 dark:bg-gray-900`}>
            <ActiveLink href="/support" flex>
              <>
                <LoveIcon />
                <span className="pl-2">Support</span>
              </>
            </ActiveLink>
            <ActiveLink href="/about" flex>
              <>
                <InfoIcon />
                <span className="pl-2">About</span>
              </>
            </ActiveLink>
          </div>
        </button>
      </div>
    </nav>
  )
}
