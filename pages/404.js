import Layout from '@templates/layout'

export default function MissingPage() {
  return (
    <Layout>
    <div className="c-404">
      <h1 className="u-space--double--bottom">404</h1>
      <h2 className="u-space--double--bottom">Oops! The page you are looking for doesn't exist.</h2>
      <a className="o-button" href="/">Back to Homepage</a>
    </div>
    </Layout>
  )
}