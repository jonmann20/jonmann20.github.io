import {html, LitElement} from 'lit-element';
import baseStyles from './styles/base';

class ASide extends LitElement {
	static get properties() {
		return {
			active: {type: Boolean},
			selectedPage: {type: String}
		};
	}

	constructor() {
		super();
		this.active = false;
	}

	render() {
		return html`
			<style>
				${baseStyles}

				/* keep in sync with head-er */
				[selected],
				[selected]:hover {
					color: #ff6188 !important;
					-webkit-text-stroke: 1px #ff6188;
					text-stroke: 1px #ff6188;
					cursor: default;
					text-shadow: none;
				}

				aside {
					transform: translateX(-100%);
					transition: all 0.3s cubic-bezier(0, 0, 0.3, 1);
					padding-top: 60px;
					height: 100%;
					width: 75%;
					min-width: 200px;
					max-width: 260px;
					position: fixed;
					left: 0;
					top: 0;
					background: #2d2a2e;
					z-index: 999;
					will-change: transform;
				}

				aside#activated {
					transform: translateX(0);
				}

				a {
					display: block;
					line-height: 1.7;
					font-size: 1.45em;
					padding: 10px 0 10px 20px;
					text-align: left !important;
					color: #ffd866;
				}

				a:hover {
					color: #ffd866;
					text-shadow: 0 0 6px #ffd866;
				}

				mwc-icon {
					float: left;
					margin-right: 13px;
					margin-top: 5px;
					cursor: pointer !important;
				}

				[selected],
				[selected]:hover {
					color: #ff6188 !important;
					-webkit-text-stroke: 1px #ff6188;
					text-stroke: 1px #ff6188;
					cursor: default;
					text-shadow: none;
				}

				.playground-nav {
					margin-left: 25px;
				}

				.playground-nav a {
					font-size: 1.2em;
				}
			</style>

			<aside id="${this.active ? 'activated' : ''}">
				<a href="#games">
					Games <mwc-icon ?selected="${this.selectedPage === 'games'}">videogame_asset</mwc-icon>
				</a>
				<a href="#playground">
					Playground <mwc-icon ?selected="${this.selectedPage.includes('playground')}">polymer</mwc-icon>
				</a>
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
			</aside>
		`;
	}
}

customElements.define('a-side', ASide);