import {html, LitElement} from 'lit-element';
import {baseStyles} from './styles/base';
import {pageStyles} from './styles/page';
import Util from '../js/util';
import PlaygroundController from '../js/controllers/playground';

class PageBreakdancingCube extends LitElement {
	constructor() {
		super();

		document.title = 'Breakdancing Cube | Playground';
		Util.addMeta('description', 'Pure CSS3 animation demo.');
		Util.addMeta('keywords', 'CSS3, HTML5');
	}

	firstUpdated() {
		PlaygroundController.openNav();
	}

	render() {
		return html`
			<style>
				${baseStyles}
				${pageStyles}

				main {
					min-height: 38em;
				}

				.iframe-wrap {
					display: none;
					margin-top: -480px;
				}

				@media (min-width: 801px) {
					.iframe-wrap {
						display: block;
					}
				}

				.iframe-wrap iframe {
					padding: 15px;
				}

				.container {
					perspective: 1000px;
					perspective-origin: 50% 50%;
					font-size: 2.25em;
					margin: 110px 0 140px;
					display: block;
					-webkit-box-reflect: below 165px linear-gradient(to bottom, transparent, transparent 42%, rgba(255, 255, 255, 0.5));
				}

				@media (min-width: 801px) {
					.container {
						margin: 65px 0 290px 360px;
					}
				}

				.animate {
					animation: spinningH 5s infinite linear;
				}

				#cube {
					position: relative;
					margin: 0 auto;
					height: 160px;
					width: 160px;
					transform-style: preserve-3d;
				}

				#cube > div {
					position: absolute;
					height: 164px;
					width: 164px;
					padding: 10px;
					opacity: 0.87;
					background-position: center center;
					background-color: rgba(20, 20, 20, 0.7);
				}

				#cube > div span {
					padding-top: 52px;
					display: block;
					text-align: center;
				}

				#cube > div span.long {
					transform: rotate(41deg);
					font-size: 0.75em;
					padding: 49px 0 0 21px;
					display: block;
					letter-spacing: 3px;
				}

				#cube div:nth-child(1) {
					transform: translateZ(82px);
				}

				#cube div:nth-child(2) {
					transform: rotateY(90deg) translateZ(82px);
				}

				#cube div:nth-child(3) {
					transform: rotateY(180deg) translateZ(82px);
				}

				#cube div:nth-child(4) {
					transform: rotateY(-90deg) translateZ(82px);
				}

				#cube div:nth-child(5) {
					transform: rotateX(-90deg) translateZ(82px) rotate(180deg);
				}

				#cube div:nth-child(6) {
					transform: rotateX(90deg) translateZ(82px);
				}

				@keyframes spinningH {
					0% {
						transform: rotateX(0deg) rotateY(0deg);
					}

					25% {
						transform: rotateX(180deg) rotateY(180deg);
					}

					50% {
						transform: rotateX(90deg) rotateY(0deg);
					}

					75% {
						transform: rotateX(270deg) rotateY(270deg);
					}

					100% {
						transform: rotateX(360deg) rotateY(360deg);
					}
				}
			</style>

			<div class="card">
				<h2>Breakdancing Cube</h2>
				<p>A pure CSS<sub>3</sub> animation demo.</p>
			</div>

			<section class="container">
			<div id="cube" class="animate">
					<div><span>Code</span></div>
					<div><span class="long">Wiedmann</span></div>
					<div><span>.com</span></div>
					<div><span>Games</span></div>
					<div><span>Soccer</span></div>
					<div><span>Jon</span></div>
			</div>
			</section>

			<div class="iframe-wrap">
				<iframe class="card" width="300" height="410" src="https://bandcamp.com/EmbeddedPlayer/v=2/album=1886256771/size=grande3/bgcol=FFFFFF/linkcol=5dafd7/transparent=true/" allowtransparency="true" frameborder="0"></iframe>
			</div>
        `;
	}
}

customElements.define('page-breakdancing-cube', PageBreakdancingCube);