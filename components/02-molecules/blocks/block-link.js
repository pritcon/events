import Link from 'next/link'

export default function BlockLink({
  key,
  title,
  link,
}) {
  return (
    <Link href='/'>
      <a className="c-block-link" data-key={key}>
        <h2 className="c-block-link__title">{title}</h2>
      </a>
    </Link>
  )
}
