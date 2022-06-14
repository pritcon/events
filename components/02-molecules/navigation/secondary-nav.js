export default function SecondaryNav({
  title,
  brand,
  speaker,
  partner,
}) {
  return (
    <nav id="secondary-nav" className="c-secondary-nav" role="navigation">
      <div className="c-secondary-nav--inner l-container l-wrap">
        <h3 className="c-secondary-nav__title o-heading--s">
          {brand} {title}
        </h3>
        <ul className="c-secondary-nav__list">
          <li><a href="#summary">Summary</a></li>
          {speaker && <li><a href="#speakers">Speakers</a></li>}
          {partner && <li><a href="#partners">Sponsors</a></li>}
          <li><a href="#discover">Discover More</a></li>
        </ul>
      </div>
    </nav>
  )
}
