import Footer from '@/components/FooterSection'
import Meta from '@/components/Meta/Default'
import HeaderDefault from '@/components/Header/Default'
import FloatingNav from '@/components/FloatingNav/Default'
import Decoration from '@/components/Icons/Decoration'

export default function Layout({ preview, children }) {
  return (
    <>
      <Meta />
      <HeaderDefault />
      <div className="min-h-screen">
        <main className="mb-16 md:mb-0">
          <div className="content-container mx-auto">
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
          </div>
        </main>
      </div>
      <FloatingNav />
    </>
  )
}
