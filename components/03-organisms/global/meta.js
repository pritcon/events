import { useEffect } from 'react'
import Head from 'next/head'
import { SITE_NAME, SITE_URL, HOME_OG_IMAGE_URL } from '@lib/constants'

export default function Meta({bodyClass}) {
  useEffect(() => {
    if (bodyClass) document.querySelector("body").classList.add(bodyClass)
  }, []);
  return (
    <Head>
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta
        name="description"
        content={`Get the latest news and updates from ${SITE_NAME}, a global media company that is home to some of the world’s leading brands including Vogue, GQ, The New Yorker, Vanity Fair, Wired and Architectural Digest (AD), Condé Nast Traveler and La Cucina Italiana.`}
      />
      <meta property="og:image" content={HOME_OG_IMAGE_URL} />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:type" content="website" />
      <link rel="preload" href="/fonts/gothambook-webfont.woff" as="font" crossOrigin="" />
      <link rel="preload" href="/fonts/gothambold-webfont.woff" as="font" crossOrigin="" />
      <link rel="preload" href="/fonts/millerdisplay-roman-webfont.woff" as="font" crossOrigin="" />
    </Head>
  )
}
