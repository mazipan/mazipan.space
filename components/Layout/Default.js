import Footer from '@/components/FooterSection'
import Meta from '@/components/Meta/Default'
import Container from '@/components/ContainerBox'
import HeaderDefault from '@/components/Header/Default'
import FloatingNav from '@/components/FloatingNav/Default'

export default function Layout ({ preview, children }) {
  return (
    <>
      <Meta />
      <HeaderDefault />
      <div className="min-h-screen">
        <main className="mb-16 md:mb-0">
          <Container>
            <article className="mt-24 px-4">{children}</article>
            <Footer />
          </Container>
        </main>
      </div>
      <FloatingNav />
    </>
  )
}
