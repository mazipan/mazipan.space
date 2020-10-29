import { useState } from 'react'

const useTheme = () => {
  const isWindow = typeof window !== 'undefined'
  const currentTheme = isWindow && localStorage.getItem('theme')

  const [theme, setTheme] = useState(currentTheme)

  const onSwitchTheme = () => {
    const nTheme = theme === 'light' ? 'dark' : 'light'
    window.__setPreferredTheme(nTheme)
    setTheme(nTheme)
  }

  return {
    theme,
    nextTheme: theme === 'light' ? 'dark' : 'light',
    nextThemeIcon: theme === 'light' ? '🌛' : '☀️',
    onSwitchTheme
  }
}

export default useTheme
