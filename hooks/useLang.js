const useLang = () => {
  const isWindow = typeof window !== 'undefined'
  const currentLang = isWindow && window.location.pathname.includes('/en') ? 'en' : 'id'

  return {
    lang: currentLang,
    isEn: currentLang === 'en',
    isId: currentLang === 'id'
  }
}

export default useLang
