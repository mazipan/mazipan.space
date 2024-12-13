import Footer from '__components/FooterSection'
import Meta from '__components/Meta/Default'
import ContainerBox from '__components/ContainerBox'
import HeaderDefault from '__components/Header/Default'
import FloatingNav from '__components/FloatingNav/Default'
import Decoration from '__components/Icons/Decoration'

export default function Layout({ preview, children, HeroComponent }) {
  return (
    <>
      <Meta />
      <HeaderDefault />
      <div className="min-h-screen">
        <main className="mb-16 md:mb-0">
          {HeroComponent ? HeroComponent : null}
          <ContainerBox>
            <article className="mt-24 px-4 relative">

              <Decoration className="absolute top-0 left-0 dark:text-emerald-500 text-emerald-500/50" />
              <Decoration
                className="absolute scale-x-[-1] -bottom-60 right-0 dark:text-blue-500 text-blue-500/50"
              />

              <div className='relative'>
                {children}
              </div>
            </article>
            <Footer />
          </ContainerBox>
        </main>
      </div>
      <FloatingNav />
    </>
  )
}
