export default function MenuToggle() {
  function toggleMenu(e) {
    e.preventDefault();
    document.querySelector('.o-menu-toggle').classList.toggle('menu-is-active');
    document.body.classList.toggle('menu-is-active');
    document.body.classList.toggle('lock-scroll');
      var navAria = document.querySelector('.c-main-nav').getAttribute('aria-hidden'); 
      if (navAria == 'false') 
      {
        navAria = 'true'
      } else {
        navAria = 'false'
      }
      document.querySelector('.c-main-nav').setAttribute('aria-hidden', navAria);

      var link1Aria = document.querySelector('.link1').getAttribute('aria-hidden'); 
      if (link1Aria == 'false') 
      {
        link1Aria = 'true'
      } else {
        link1Aria = 'false'
      }
      document.querySelector('.link1').setAttribute('aria-hidden', link1Aria);

      

      var link2Aria = document.querySelector('.link2').getAttribute('aria-hidden'); 
      if (link2Aria == 'false') 
      {
        link2Aria = 'true'
      } else {
        link2Aria = 'false'
      }
      document.querySelector('.link2').setAttribute('aria-hidden', link2Aria);

      var link3Aria = document.querySelector('.link3').getAttribute('aria-hidden'); 
      if (link3Aria == 'false') 
      {
        link3Aria = 'true'
      } else {
        link3Aria = 'false'
      }
      document.querySelector('.link3').setAttribute('aria-hidden', link3Aria);
      
      var mainAria = document.querySelector('.l-main').getAttribute('aria-hidden');
      var mainTabindex = document.querySelector('.l-main').getAttribute('tabindex'); 
      if (mainAria == 'false') 
      {
        mainAria = 'true',
        mainTabindex = ''
      } else {
        mainAria = 'false',
        mainTabindex = '-1'
      }
      document.querySelector('.l-main').setAttribute('aria-hidden', mainAria);
      document.querySelector('.l-main').setAttribute('tabindex', mainTabindex);
      
    }
  return (
    <a className="o-menu-toggle js-toggle" data-toggled="c-header" data-prefix="main-nav" onClick={(e) => {toggleMenu(e)}}>
      <span></span>
      <span></span>
      <span></span>
    </a>
  )
}
