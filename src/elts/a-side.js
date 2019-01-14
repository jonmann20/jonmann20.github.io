import {html, LitElement} from 'lit-element';
import {shellStyles} from './styles/shell';

class ASide extends LitElement {
	static get properties() {
		return {
			active: {type: Boolean}//, attribute: true, reflect: true}
		};
	}

	constructor() {
		super();
		this.active = false;
	}

	render() {
		return html`
			<style>
				${shellStyles}

				:host {
					display: block;
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
					font-size: 1.45em;
					padding: 10px 0 10px 20px;
					text-align: left !important;
					color: #ffd866;
				}

				a:hover {
					color: #ffd866;
					text-shadow: 0 0 6px #ffd866;
				}

				iron-icon {
					float: left;
					margin-right: 20px;
					margin-top: 5px;
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
					Games <iron-icon icon="i:videogame-asset" class="icon-controllernes"></iron-icon>
				</a>
				<a href="#playground">
					Playground <iron-icon icon="i:polymer" class="icon-beaker"></iron-icon>
				</a>
				<div class="playground-nav-wrap">
					<ul class="playground-nav">
						<li><a href="#playground/breakdancing-cube">Breakdancing Cube</a></li>
						<li><a href="#playground/starry-background">Starry Background</a></li>
						<li><a href="#playground/ball-pit">Ball Pit</a></li>
					</ul>
				</div>
				<a href="#portfolio">
					Portfolio <iron-icon icon="i:work" class="icon-briefcase"></iron-icon>
				</a>
			</aside>
		`;
	}
}

customElements.define('a-side', ASide);