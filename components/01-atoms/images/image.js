import Link from 'next/link'

export default function Image({  src, alt, slug }) {
  const image = (
    <img
      src={`${src}?fit=fill&w=600&h=600`}
      alt={alt}
      className="o-image"
    />
  )
  return (
    <div className="o-image-link">
      {slug ? (
        <Link href={slug}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  )
}
