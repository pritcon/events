export default function Button({
  url,
  text,
  newWindow,
  rel
}) {
  return (
    <a
      role="button"
      className="o-button"
      href={url}
      target={newWindow ? '_blank' : '_self'}
      rel={newWindow ? 'noopener noreferrer' : null}
    >
      {text}
    </a>
  )
}