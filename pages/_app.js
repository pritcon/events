import '../styles/main.scss'
import GoogleTagManager from '@molecules/components/google-tag-manager'
import ErrorBoundary from '../components/ErrorBoundary'

function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary>
    <GoogleTagManager>
      <Component {...pageProps} />
    </GoogleTagManager>
    </ErrorBoundary>
  )
}

export default MyApp
