import Link from 'next/link'
import Avatar from '@atoms/images/avatar'
import Date from '@atoms/text/date'
import Image from '@atoms/images/image'

export default function Hero({
  title,
  image,
  date,
  excerpt,
  author,
  slug,
}) {
  return (
    <section className="c-hero">
      {image && <Image title={title} slug={slug} url={image.url} /> }
      <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      {author && <Avatar name={author.name} picture={author.picture} />}
    </section>
  )
}
