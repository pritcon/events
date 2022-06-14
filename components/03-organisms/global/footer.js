import CondeNastLogo from '@atoms/images/cn-logo'

export default function Footer() {
  return (
    <footer id="Footer" className="c-footer">
	    <div className="l-container l-wrap">
	      <div className="c-footer__image">
	      	<CondeNastLogo />
	      </div>
	      <div bp="grid 6@md">
			<div className="c-footer__legal">
		    	<a href="https://www.condenast.com/user-agreement">user agreement</a>
		      	<a href="https://www.condenast.com/privacy-policy">privacy policy</a>
		    </div>
	      	<div className="c-footer__copyright u-align--right">
	       		Copyright {new Date().getFullYear()} Condé Nast. All rights reserved.
	      	</div>
	      </div>
	    </div>
    </footer>
  )
}
