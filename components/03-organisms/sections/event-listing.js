import Button from '@atoms/buttons/button'
import {getDateRange, getEventUrl} from '@lib/util'


export default function SectionEventListing({
  events,
}) {
  console.log('dddd');
  console.log(JSON.stringify(events));
  return (
    <section className="c-section-event-listing o-section l-container l-wrap">
      {events?.length && events.map(event => (
      <div key={event.slug}>
        <div className="c-section-event-listing__date o-section-heading o-heading--m">
          <div className="o-section-heading__text"><span>{getDateRange(event.startDate, event.endDate, event.approximateDate)}</span></div>
          <div className="o-section-heading__line"></div>
        </div>
        <div className="c-section-event-listing__item" bp="grid 6@md">
          <div className="c-section-event-listing__header u-spacing">
            <div className="c-section-event-listing__heading u-spacing">
              {event.brand?.title && (
              <span className="o-eyebrow">{event.brand?.title}</span>
              )}
              {event.title && <h1>
                <a href={event.slug ? getEventUrl(event.slug) : ""}>
                  {event.title}
                </a>
              </h1> }
            </div>
            <div className="c-section-event-listing__description u-spacing--half">
              <div className="o-location-type o-heading--m u-text-transform--none">
                {event.market?.title && <span>{event.market.title}</span>}
              </div>
            </div>
          </div>
          {event.metaImage && (
            <a href={event.slug ? getEventUrl(event.slug) : ""}>
              <div className="c-section-event-listing__img" style={{ backgroundImage: "url(" + event.metaImage.url + ")" }} />
            </a>)}
        </div>
      </div>
       ))}
    </section>
  )
}
