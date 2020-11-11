import Footer from '@/components/Footer'
import Meta from '@/components/Meta/Default'
import Container from '@/components/ContainerBox'
import HeaderDefault from '@/components/Header/Default'

export default function Layout ({ preview, children }) {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <main className="mb-32">
          <Container>
            <HeaderDefault />
            <article>
              {children}
            </article>
          </Container>
        </main>
      </div>
      <Footer />
    </>
  )
}
