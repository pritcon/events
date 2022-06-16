import '../styles/main.scss'
import GoogleTagManager from '@molecules/components/google-tag-manager'

function MyApp({ Component, pageProps }) {
  return (
    <GoogleTagManager>
      <Component {...pageProps} />
    </GoogleTagManager>
  )
}

export default MyApp
