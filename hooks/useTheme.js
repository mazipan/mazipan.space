import { useState } from 'react'

import MoonIcon from '@/components/icons/Moon'
import SunIcon from '@/components/icons/Sun'

const useTheme = () => {
  const isWindow = typeof window !== 'undefined'
  const currentTheme = isWindow && (localStorage.getItem('theme') || 'light')

  const [theme, setTheme] = useState(currentTheme)

  const onSwitchTheme = () => {
    const nTheme = theme === 'light' ? 'dark' : 'light'
    window.__setPreferredTheme(nTheme)
    setTheme(nTheme)
  }

  return {
    theme,
    nextTheme: theme === 'light' ? 'dark' : 'light',
    NextThemeIcon: theme === 'light' ? <MoonIcon /> : <SunIcon />,
    onSwitchTheme
  }
}

export default useTheme
