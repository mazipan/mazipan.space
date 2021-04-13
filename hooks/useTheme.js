import { useState } from 'react'

import MoonIcon from '@/components/Icons/ThemeMoon'
import SunIcon from '@/components/Icons/ThemeSun'

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
