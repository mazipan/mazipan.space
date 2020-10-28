import Footer from '../components/footer'
import Meta from '../components/meta'
import Container from '@/components/container'
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
