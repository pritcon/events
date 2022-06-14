import Logo from '@atoms/images/logo'
import MenuToggle from '@atoms/buttons/menu-toggle'
import MainNav from '@molecules/navigation/main-nav'

export default function Header() {
  return (
    <header id="Header" className="c-header" role="banner">
      <div className="c-header--inner l-container l-wrap">
        <div className="c-header__logo">
          <Logo />
        </div>
        <div className="c-header__nav">
          <MenuToggle />
          <MainNav />
        </div>
      </div>
    </header>
  )
}
