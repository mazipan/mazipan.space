import { useState } from 'react'
import dynamic from 'next/dynamic'

const MoonIcon = dynamic(
  () => import('@/components/Icons/ThemeMoon'),
  { ssr: false }
);

const SunIcon = dynamic(
  () => import('@/components/Icons/ThemeSun'),
  { ssr: false }
);

const useTheme = () => {
  const isWindow = typeof window !== 'undefined'
  const currentTheme = isWindow && (localStorage.getItem('theme') || 'light')

  const [theme, setTheme] = useState(currentTheme)

  const onSwitchTheme = () => {
    const nTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(nTheme)
    window.__setPreferredTheme(nTheme)
  }

  return {
    theme,
    nextTheme: theme === 'light' ? 'dark' : 'light',
    NextThemeIcon: theme === 'light' ? <MoonIcon /> : <SunIcon />,
    onSwitchTheme
  }
}

export default useTheme
