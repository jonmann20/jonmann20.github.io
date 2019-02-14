import {css, html, LitElement} from 'lit-element';
import baseStyles from './styles/base';

class HeadEr extends LitElement {
	static styles = [
		baseStyles,
		css`
			header {
				position: fixed;
				z-index: 99999;
				top: 0;
				width: 100%;
				background: var(--black);
			}

			.menu {
				position: absolute;
				display: flex;
				top: 0;
				right: 0;
				padding: 16px 20px 15px 16px;
				width: auto;
				-webkit-user-select: none;
				-moz-user-select: none;
				-ms-user-select: none;
				user-select: none;
			}

			nav {
				font-size: 1.57em;
				text-align: left;
				margin-top: 35px;
				padding: 15px 20px;
				min-width: 165px;
			}

			nav:first-child {
				margin-top: 0;
				height: 55px;
			}

			nav:first-child a {
				display: inline;
				text-align: center;
				line-height: 1.1 !important;
				margin-right: 0;
			}

			ul {
				list-style-type: none;
				font-size: 62%;
				width: 90%;
				margin: 0 auto;
				padding: 0;
				border-radius: 1px;
			}

			ul a {
				margin-right: 0 !important;
			}

			ul a:active {
				margin-bottom: 4px;
			}

			a {
				width: 100%;
				color: var(--yellow);
			}

			a:hover {
				color: var(--yellow);
				text-shadow: 0 0 6px var(--yellow);
			}

			a,
			a:visited {
				text-align: right;
				display: block;
				margin-right: 18px;
				line-height: 1.7;
				transition: none;
			}

			.icon-home {
				margin-right: 7px;
				vertical-align: -3px;
			}

			.nav2 {
				display: none;
				margin-top: 20px;
			}

			.nav2 ul a {
				margin-bottom: 4px;
				text-align: center;
			}

			.nav2 i-con {
				vertical-align: -6px;
				margin-left: 7px;
			}

			.playground-nav-wrap {
				height: 0;
				opacity: 0;
				visibility: hidden;
				will-change: height, padding, opacity;
				transition: 0.25s ease;
			}

			.playground-nav-wrap.visible {
				padding: 10px 0 10px 40px;
				height: 92px;
				visibility: visible;
				opacity: 1;
			}

			/* > mobile */
			@media (min-width: 801px) {
				header {
					top: auto;
					width: auto;
					background: none;
				}

				nav {
					text-align: center;
					padding: 15px 15px 0 0;
				}

				nav:first-child {
					text-indent: 9px;
					padding-bottom: 20px;
				}

				.menu {
					display: none !important;
				}

				.nav2 {
					display: block;
				}
			}
		`
	];

	static properties = {
		page: {type: String}
	};

	constructor() {
		super();

		this.asideIsActive = false;
		this.initX = 0;
		this.x = 0;

		this.boundHideAside = (e) => this.hideAside(e);
		this.boundSetInitX = (e) => this.hideSetInitX(e);
		this.boundSetX = (e) => this.hideSetX(e);

		window.onresize = () => {
			if(window.innerWidth > 800) {
				this.boundHideAside();
			}
		};

		this.navVisible = window.page.includes('playground');
	}

	firstUpdated() {
		this.pNav = this.shadowRoot.querySelector('.playground-nav-wrap');

		addEventListener('route', e => {
			const slug = e.detail;
			if(!slug.includes('playground')) {
				this.navVisible = false;
			}
			else {
				this.navVisible = true;
			}
		}, {passive: true});
	}

	render() {
		return html`
			<header>
				<nav>
					<a href="#home">
						<i-con name="home" class="icon-home" ?selected="${this.page === 'home'}"></i-con>&nbsp;Jon Wiedmann
					</a>
					<a class="menu" @click="${this.menuClick}">
						<i-con name="menu"></i-con>
					</a>
				</nav>
				<nav class="nav2">
					<a href="#games">
						Games <i-con name="videogameAsset" ?selected="${this.page === 'games'}"></i-con>
					</a>
					<a href="#playground">
						Playground <i-con name="polymer" ?selected="${this.page.includes('playground')}"></i-con>
					</a>

					<!-- TODO: convert sub nav to a component -->
					<div class="playground-nav-wrap${this.navVisible ? ' visible' : ''}">
						<ul class="playground-nav">
							<li><a href="#playground/breakdancing-cube" ?selected="${this.page === 'playground/breakdancing-cube'}">Breakdancing Cube</a></li>
							<li><a href="#playground/starry-background" ?selected="${this.page === 'playground/starry-background'}">Starry Background</a></li>
							<li><a href="#playground/ball-pit" ?selected="${this.page === 'playground/ball-pit'}">Ball Pit</a></li>
						</ul>
					</div>
					<a href="#portfolio">
						Portfolio <i-con name="work" ?selected="${this.page === 'portfolio'}"></i-con>
					</a>
				</nav>
			</header>
		`;
	}

	menuClick(e) {
		e.preventDefault();

		if(!this.asideIsActive) {
			document.querySelector('a-side').setAttribute('active', true);
			document.querySelector('main').classList.add('leftbar-active');
			this.asideIsActive = true;

			requestAnimationFrame(() => {
				document.body.addEventListener('click', this.boundHideAside, {passive: true});
				document.body.addEventListener('touchstart', this.boundSetInitX, {passive: true});
				document.body.addEventListener('touchmove', this.boundSetX, {passive: true});
				document.body.addEventListener('touchend', this.boundHideAside, {passive: true});
			});
		}
		else {
			this.hideAside();
		}
	}

	hideAside(e) {
		if(e && e.type === 'touchend' && this.initX === this.x) {
			return;
		}

		document.querySelector('a-side').removeAttribute('active');
		document.querySelector('main').classList.remove('leftbar-active');
		this.asideIsActive = false;
		document.body.removeEventListener('click', this.boundHideAside, {passive: true});
		document.body.removeEventListener('touchstart', this.boundSetInitX, {passive: true});
		document.body.removeEventListener('touchmove', this.boundSetX, {passive: true});
		document.body.removeEventListener('touchend', this.boundHideAside, {passive: true});
	}

	setInitX(e) {
		this.initX = e.touches[0].pageX;
		this.x = this.initX;
	}

	setX(e) {
		this.x = e.touches[0].pageX;
	}
}

customElements.define('head-er', HeadEr);