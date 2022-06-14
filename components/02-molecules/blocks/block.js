import Avatar from '@atoms/images/avatar'

export default function Block({
  //key,
  title,
  image,
  date,
  excerpt,
  author,
  slug,
}) {
  return (
    <div className="c-block">
      <h3 className="c-block__title">
        {title}
      </h3>
      <p className="c-block__excerpt">{excerpt}</p>
      {author && <Avatar name={author.name} picture={author.picture} />}
    </div>
  )
}
