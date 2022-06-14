import Speaker from '@molecules/blocks/speaker'
import SectionHeading from '@atoms/text/section-heading'

export default function Speakers({
  speakers
}) {
  const speakerCount = speakers.length
  const speakerLayout = speakerCount < 3
    ? '6@lg'
    : speakerCount > 3 
      ? '3@lg' 
      : '4@lg' 

  return (
    <>
      {speakers && (
        <section className="c-section-speakers o-section l-container l-wrap u-spacing--triple">
          <a name="speakers"></a>
          <SectionHeading text="Speakers" />
          <div className="c-section-speakers__items" bp={`grid 6 ${speakerLayout}`}>
            {speakers.filter(speaker => speaker).map((speaker) => (
              <Speaker
                key={speaker.key}
                headshot={speaker.headshot}
                firstName={speaker.firstName}
                lastName={speaker.lastName}
                positionTitle={speaker.positionTitle}
              />
            ))}
          </div>
        </section>
      )}
    </>
  )
}
