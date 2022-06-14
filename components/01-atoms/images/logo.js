import { SITE_NAME, SITE_URL } from '@lib/constants'
import Link from 'next/link'

export default function Logo() {
  return (
    <Link href={"/"}>
      <a className="o-logo">
        <img src="/logo.svg" alt={SITE_NAME} />
      </a>
    </Link>
  )
}
