import {css, html, LitElement} from 'lit';
import baseStyles from './styles/base';
import pageStyles from './styles/page';
import Util from '../js/util';
import StarryBg from '../js/stars';
import {WHITE, YELLOW} from './styles/vars';

class PageStarryBackground extends LitElement {
	static styles = [
		baseStyles,
		pageStyles,
		css`
			canvas {
				z-index: -1;
				position: absolute;
				top: 0;
				right: 0;
				left: 0;
				bottom: 0;
				width: 100%;
				height: 100%;
			}

			.color-wrap {
				margin-top: 25px;
			}

			label {
				cursor: pointer;
				margin-right: 15px;
			}

			input {
				cursor: pointer;
				vertical-align: -2px;
			}

			input:focus {
				box-shadow: none;
				outline-color: transparent;
			}

			input:last-child {
				margin-right: 0;
			}
		`
	];

	constructor() {
		super();

		document.title = 'Starry Background | Playground';
		Util.addMeta('description', 'A canvas example showcasing a starry background.');
		Util.addMeta('keywords', 'canvas, html5');
	}

	firstUpdated() {
		window.starryBg = new StarryBg(this.shadowRoot);
	}

	render() {
		return html`
			<div class="card">
				<h2>Starry Background</h2>
				<p>A Javascript and HTML<sub>5</sub> canvas example showcasing an interactive starry background.</p>
			</div>
			<canvas id="starry-canvas"></canvas>
			<br>
			<div class="card color-wrap">
				<h3>Change Color</h3>

				<p class="color-picker">
					<label>
						White <input type="radio" value="${WHITE}" name="colors" checked>
					</label>
					<label>
						Green <input type="radio" value="#a6e22e" name="colors">
					</label>
					<label>
						Yellow <input type="radio" value="${YELLOW}" name="colors">
					</label>
					<label>
						Purple <input type="radio" value="#ab9df2" name="colors">
					</label>
				</p>
			</div>
        `;
	}
}

customElements.define('page-starry-background', PageStarryBackground);