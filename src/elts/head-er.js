import {html, LitElement} from 'lit-element';
import {baseStyles} from './styles/base';

class HeadEr extends LitElement {
	static get properties() {
		return {
			selectedPage: {type: String}
		};
	}

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
	}

	render() {
		return html`
			<style>
				${baseStyles}

				header {
					position: fixed;
					z-index: 99999;
					top: 0;
					width: 100%;
					background: #2d2a2e;
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
					color: #ffd866;
				}

				a:hover {
					color: #ffd866;
					text-shadow: 0 0 6px #ffd866;
				}

				a,
				a:visited {
					text-align: right;
					display: block;
					margin-right: 18px;
					line-height: 1.7;
					transition: none;
				}

				/* TODO: extract template, logic, and styling of nav links between head-er and a-side */
				/* keep in sync with a-side */
				a:hover mwc-icon,
				[selected],
				[selected]:hover {
					color: #ff6188 !important;
					cursor: default;
					text-shadow: none;
				}

				mwc-icon {
					cursor: pointer !important;
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

				.nav2 mwc-icon {
					vertical-align: -5px;
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
			</style>

			<header>
				<nav>
					<a href="#home">
						<mwc-icon class="icon-home" ?selected="${this.selectedPage === 'home'}">home</mwc-icon>&nbsp;Jon Wiedmann
					</a>
					<a class="menu" @click="${this.menuClick}">
						<mwc-icon>menu</mwc-icon>
					</a>
				</nav>
				<nav class="nav2">
					<a href="#games">
						Games <mwc-icon ?selected="${this.selectedPage === 'games'}">videogame_asset</mwc-icon>
					</a>
					<a href="#playground">
						Playground <mwc-icon ?selected="${this.selectedPage.includes('playground')}">polymer</mwc-icon>
					</a>

					<!-- TODO: convert sub nav to a component -->
					<div class="playground-nav-wrap">
						<ul class="playground-nav">
							<li><a href="#playground/breakdancing-cube" ?selected="${this.selectedPage === 'playground/breakdancing-cube'}">Breakdancing Cube</a></li>
							<li><a href="#playground/starry-background" ?selected="${this.selectedPage === 'playground/starry-background'}">Starry Background</a></li>
							<li><a href="#playground/ball-pit" ?selected="${this.selectedPage === 'playground/ball-pit'}">Ball Pit</a></li>
						</ul>
					</div>
					<a href="#portfolio">
						Portfolio <mwc-icon ?selected="${this.selectedPage === 'portfolio'}">work</mwc-icon>
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