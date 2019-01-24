import {html, LitElement} from 'lit-element';
import baseStyles from './styles/base';
import pageStyles from './styles/page';
import Util from '../js/util';
import PlaygroundController from '../js/controllers/playground';

class PagePlayground extends LitElement {
	constructor() {
		super();

		document.title = 'Playground';
		Util.addMeta('description', 'An playground area for web tech demos.');
		Util.addMeta('keywords', 'canvas, html5');
	}

	firstUpdated() {
		PlaygroundController.openNav();
	}

	render() {
		return html`
			<style>
				${baseStyles}
				${pageStyles}

				h2 {
					font-size: 1.15em;
					margin: 0.5em 0 0.3em;
				}
			</style>

			<div class="col-left card">
				<h1>Playground</h1>
				<p>This area contains small tech demos.  Including some web technology prototypes, various snippets, and extractions from other projects I have worked on.</p>
			</div>

			<div class="col-right">
				<img class="card-light" src="/img/megaman-cross-stitch.jpg" alt="Megaman cross stitch">
			</div>
        `;
	}
}

customElements.define('page-playground', PagePlayground);