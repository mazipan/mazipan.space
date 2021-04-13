import Footer from '@/components/FooterSection'
import Meta from '@/components/Meta/Default'
import Container from '@/components/ContainerBox'
import HeaderDefault from '@/components/Header/Default'
import FloatingNav from '@/components/FloatingNav/Default'

export default function Layout ({ preview, children }) {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <main className="mb-32">
          <Container>
            <HeaderDefault />
            <article className="mt-24">
              {children}
            </article>
            <FloatingNav />
          </Container>
        </main>
      </div>
      <Footer />
    </>
  )
}
