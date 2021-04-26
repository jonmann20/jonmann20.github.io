import {css, html, LitElement} from 'lit';
import baseStyles from './styles/base';

class ASide extends LitElement {
	static styles = [
		baseStyles,
		css`
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
				background: var(--black);
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
				color: var(--yellow);
			}

			a:hover {
				color: var(--yellow);
				text-shadow: 0 0 6px var(--yellow);
			}

			i-con {
				float: left;
				margin-right: 13px;
				margin-top: 5px;
				cursor: pointer !important;
			}

			.playground-nav {
				margin-left: 25px;
			}

			.playground-nav a {
				font-size: 1.2em;
			}
		`
	];

	static properties = {
		active: {type: Boolean},
		page: {type: String}
	};

	constructor() {
		super();
		this.active = false;
	}

	render() {
		return html`
			<aside id="${this.active ? 'activated' : ''}">
			<a href="#portfolio">
				Portfolio <i-con name="work" ?selected="${this.page === 'portfolio'}"></i-con>
			</a>
			<a href="#games">
					Games <i-con name="videogameAsset" ?selected="${this.page === 'games'}"></i-con>
				</a>
				<a href="#playground">
					Playground <i-con name="polymer" ?selected="${this.page.includes('playground')}"></i-con>
				</a>
				<div class="playground-nav-wrap">
					<ul class="playground-nav">
						<li><a href="#playground/breakdancing-cube" ?selected="${this.page === 'playground/breakdancing-cube'}">Breakdancing Cube</a></li>
						<li><a href="#playground/starry-background" ?selected="${this.page === 'playground/starry-background'}">Starry Background</a></li>
						<li><a href="#playground/ball-pit" ?selected="${this.page === 'playground/ball-pit'}">Ball Pit</a></li>
					</ul>
				</div>
			</aside>
		`;
	}
}

customElements.define('a-side', ASide);