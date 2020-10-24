import Footer from '../components/footer';
import Meta from '../components/meta';
import Container from '@/components/container';
import Header from '@/components/header';

export default function Layout({ preview, children }) {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <main className="mb-32">
          <Container>
            <Header />
            <article>
              {children}
            </article>
          </Container>
        </main>
      </div>
      <Footer />
    </>
  );
}
