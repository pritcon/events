import Button from '@atoms/buttons/button'

export default function SectionHeading({
  text,
  extraClass,
  button
}) {
  return (
    <>
      {text && (
        <div className={`o-section-heading o-heading--m ${extraClass ?? ''}`}>
          <div className="o-section-heading__text"><span>{text}</span></div>
          <div className="o-section-heading__line"></div>
          {button && (
            <div className="o-section-heading__button">
              <Button
                text={button.text}
                url={button.url}
              />
            </div>
          )}
        </div>
      )}
    </>
  )
}
