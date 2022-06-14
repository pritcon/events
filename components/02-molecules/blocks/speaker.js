import Image from '@atoms/images/image'

export default function Speaker({
  headshot,
  firstName,
  lastName,
  positionTitle,
}) {
  return (
    <div className="c-speaker u-spacing--half">
      {headshot && (
        <Image src={headshot.url} alt={headshot.alt} />
     )}
       <div className="c-speaker__details u-font--s-m">
        {firstName && lastName && (
          <div className="c-speaker__name u-text-transform--upper">
            <strong>{firstName}{` ` + lastName}</strong>
          </div>
        )}
        {positionTitle && (
          <div className="c-speaker__position-title">
            <em>{positionTitle}</em>
          </div>
        )}
      </div>
    </div>
  )
}
