import {html, LitElement} from 'lit-element';
import baseStyles from './styles/base';
import pageStyles from './styles/page';
import Util from '../js/util';
import BallPit from '../js/ballPit';

class PageBallPit extends LitElement {
	constructor() {
		super();

		document.title = 'Ball Pit | Playground';
		Util.addMeta('description', 'A canvas example showcasing a ball pit.');
		Util.addMeta('keywords', 'canvas, html5');
	}

	firstUpdated() {
		window.ballPit = new BallPit(this.shadowRoot);
	}

	render() {
		return html`
			<style>
				${baseStyles}
				${pageStyles}

				.range-inputs > div {
					margin: 0 0 30px;
				}

				.range-inputs label {
					display: block;
					margin-bottom: 5px;
				}

				.range-inputs input {
					cursor: ew-resize;
				}

				.range-inputs input:focus {
					box-shadow: none;
					outline-color: transparent;
				}

				canvas {
					margin: 20px 0;
				}
			</style>

			<div class="card">
				<h2>Ball Pit</h2>
				<p>A Javascript and HTML<sub>5</sub> canvas example with balls colliding into the edges of a box.</p>
			</div>

			<div class="ball-pit">
				<canvas class="card-light"></canvas>

				<div class="range-inputs">
					<div>
						<label>Number of Balls: <span class="litNumBalls">20</span></label>
						<input type="range" value="20" min="1" class="numBalls">
					</div>
					<div>
						<label>Size of Balls (radius): <span class="litSizeBalls">16.5</span></label>
						<input type="range" value="16.5" min="3" step="0.5" max="40" class="sizeBalls">
					</div>
					<div>
						<label>Speed of Balls: <span class="litSpeedBalls">1</span></label>
						<input type="range" value="1" min="0.05" step="0.05" max="2.5" class="speedBalls">
					</div>
				</div>
			</div>
        `;
	}
}

customElements.define('page-ball-pit', PageBallPit);