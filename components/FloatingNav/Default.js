import LoveIcon from '@/components/Icons/Love'
import ZapIcon from '@/components/icons/Zap'
import MicIcon from '@/components/icons/Mic'
import InfoIcon from '@/components/icons/Info'

import ActiveLink from './ActiveLink'

export default function FloatingNav () {
  return (
    <nav className="md:hidden fixed w-full bottom-0 left-0 p-4 z-10 bg-gray-100 dark:bg-gray-900 flex items-center justify-between shadow-medium border-top-gradient">
      <div className="w-full flex items-center justify-between">
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
        <ActiveLink href="/support">
          <>
            <LoveIcon />
            {'Support'}
          </>
        </ActiveLink>
        <ActiveLink href="/about">
          <>
            <InfoIcon />
            {'About'}
          </>
        </ActiveLink>
      </div>
    </nav>
  )
}
