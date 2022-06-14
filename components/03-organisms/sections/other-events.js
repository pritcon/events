import moment from 'moment'
import SectionHeading from '@atoms/text/section-heading'

export default function OtherEvents({
  events
}) {
  return (
    <>
      {events && (
        <section className="c-section-other-events o-section l-container l-wrap u-spacing">
          <a name="other"></a>
          <SectionHeading
            text="Other Events"
          />
          <div className="c-section-other-events__items">
            {events.map((event, index) => (
              <a className="c-section-other-events__item o-stat o-stat__value" key={index} href={event.slug}>
                {moment(event.startDate).format('MMMM YYYY')}&nbsp;
                <span className="o-stat__description o-heading--m">{event.market?.title}</span>
              </a>
            ))}
          </div>
        </section>
      )}
    </>
  )
}
