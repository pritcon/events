import Button from '@atoms/buttons/button'

export default function EventContent({
  link,
  eyebrow,
  name,
  body,
  date,
  location,
  type,
  buttons,
  image,
  upcoming
}) {
  return (
    <section id="event-content" className="c-section-event-content o-section l-container l-wrap u-spacing--sections--less">
      <div bp="grid 6@md">
        <div className="c-section-event-content__header u-spacing">
          <div className="c-section-event-content__heading u-spacing">
            {eyebrow && (
              <span className="o-eyebrow">{eyebrow}</span>
            )}
            {name && <h1>{name}</h1> }
          </div>
          <div className="c-section-event-content__description u-spacing--half">
            {date && (
              <div className="o-date o-heading--m">
                {date}
              </div>
            )}
            <div className="o-location-type o-heading--m u-text-transform--none">
              {location && <span>{location}</span>}
              {type?.length && <span>{`  |  ` + type.join(', ')}</span>}
            </div>
          </div>
          {upcoming && (
            <div className="c-section-event-content__description u-spacing--half u-padding--top">
              <h3 className="u-font--m">
                See you at the next event <strong>{upcoming}</strong>!
              </h3>
            </div>
          )}
        </div>
        <div className="c-section-event-content__content u-spacing--triple">
          {body ? (
              <p className="c-section-event-content__body">{body}</p>
            ) : image ? (
              <div className="c-section-event-content__img">
                <img src={image.url} alt={image.title} />
              </div>
            ) : ""
          }
          {buttons && (
            <div className="c-section-event-content__button u-spacing u-spacing--right">
              {buttons.map((button, index) => (
                <Button
                  key={index}
                  text={button && button.buttonText}
                  url={button && button.buttonUrl}
                  newWindow={button && button.newWindow}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
