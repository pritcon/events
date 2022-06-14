import Button from '@atoms/buttons/button'

export default function SponsorshipContent({
  link,
  name,
  body,
  type,
  buttons,
  image
}) {
  return (
    <section className="c-section-sponsorship-content o-section l-container l-wrap u-spacing--sections--less">
      <div bp="grid 6@md">
        <div className="c-section-sponsorship-content__header u-spacing">
          <div className="c-section-sponsorship-content__heading">
            {name && <h1>{name}</h1> }
          </div>
        </div>
        <div className="c-section-sponsorship-content__content u-spacing--triple">
          {body && (
            <div className="c-section-sponsorship-content__body">{body}</div>
          )}
          {image && (
            <img src={image.src} alt={image.alt} />
          )}
          {buttons && (
            <div className="c-section-sponsorship-content__button u-spacing u-spacing--right">
              {buttons.map((button) => (
                <Button
                  key={button && button.key}
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
