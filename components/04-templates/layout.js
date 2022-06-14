import Meta from '@organisms/global/meta'
import Header from '@organisms/global/header'
import Footer from '@organisms/global/footer'

export default function Layout({ children, bodyClass }) {
  return (
    <>
      <Meta bodyClass={bodyClass} />
      <Header />
      <main className="l-main">{children}</main>
      <Footer />
    </>
  )
}
