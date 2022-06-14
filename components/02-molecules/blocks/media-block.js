import Image from '@atoms/images/image'

export default function MediaBlock({
  slug,
  image,
  kicker,
  title,
  description
}) {
  return (
    <div className="c-media-block u-spacing--half">
      <a href={`${slug}`}>
        {image && (
          <Image src={image.url} alt={image.title} />
        )}
        <div className="c-media-block__details u-font--s-m u-spacing--quarter">
          {kicker && (
            <div className="c-media-block__kicker o-heading--s">
              {kicker}
            </div>
          )}
          {title && (
            <div className="c-media-block__title">
              <h3 className="u-font--m"><strong>{title}</strong></h3>
            </div>
          )}
          {description && (
            <div className="c-media-block__description">
              {description}
            </div>
          )}
        </div>
      </a>
    </div>
  )
}
