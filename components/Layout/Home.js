import Footer from '@/components/Footer'
import Meta from '@/components/Meta/Default'

export default function Layout ({ preview, children }) {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}
