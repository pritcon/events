import MediaBlock from '@molecules/blocks/media-block'
import SectionHeading from '@atoms/text/section-heading'

export default function DiscoverMore({
  events
}) {
  const eventsCount = events.length
  const eventsLayout = eventsCount < 3
    ? '6@lg'
    : eventsCount > 3
      ? '3@lg'
      : '4@lg'
  return (
    <>
      {events && (
        <section className="c-section-discover-more o-section l-container l-wrap u-spacing--triple">
          <a name="discover"></a>
          <SectionHeading
            text="Discover More"
            button={{
              url: "/events",
              text: "See All Events"
            }}
          />
          <div className="c-section-discover-more__items" bp={`grid 6 ${eventsLayout}`}>
            {events.map((event, index) => (
              <MediaBlock
                key={index}
                slug={event.slug}
                image={event.metaImage}
                kicker={event.brand?.title}
                title={event.displayTitle ?? event.title}
                description={event.description}
              />
            ))}
          </div>
        </section>
      )}
    </>
  )
}
