import {css, html, LitElement} from 'lit';
import baseStyles from './styles/base';
import pageStyles from './styles/page';
import Util from '../js/util';

class PagePlayground extends LitElement {
	static styles = [
		baseStyles,
		pageStyles,
		css`
			h2 {
				font-size: 1.15em;
				margin: 0.5em 0 0.3em;
			}
		`
	];

	constructor() {
		super();

		document.title = 'Playground';
		Util.addMeta('description', 'An playground area for web tech demos.');
		Util.addMeta('keywords', 'canvas, html5');
	}

	render() {
		return html`
			<div class="col-left card">
				<h1>Playground</h1>
				<p>This area contains small tech demos and web technology prototypes.</p>
			</div>

			<div class="col-right">
				<img class="card-light" src="/img/megaman-cross-stitch.jpg" alt="Megaman cross stitch">
			</div>
    `;
	}
}

customElements.define('page-playground', PagePlayground);