import { useRouter } from 'next/router'

const useLang = () => {
  const router = useRouter()
  const currentLang = router.pathname.includes('/en') ? 'en' : 'id'

  return {
    lang: currentLang,
    isEn: currentLang === 'en',
    isId: currentLang === 'id'
  }
}

export default useLang
