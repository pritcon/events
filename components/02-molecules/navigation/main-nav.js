import CondeNastLogo from '@atoms/images/cn-logo'

export default function MainNav() {
  return (
    <nav className="c-main-nav" role="navigation" aria-hidden="true">
      <div className="c-main-nav__logo"><CondeNastLogo /></div>
      <a className="c-main-nav__link link1" aria-hidden="true" href="/events">Explore Our Events</a>
      <a className="c-main-nav__link link2" aria-hidden="true" href="/sponsorship">Partner With Us</a>
      <a className="c-main-nav__link link3" aria-hidden="true" href="https://www.condenast.com/">condenast.com</a>
    </nav>
  )
}
