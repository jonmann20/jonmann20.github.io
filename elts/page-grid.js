import {css, html, LitElement} from 'lit-element';
import baseStyles from './styles/base';
import pageStyles from './styles/page';
import './gel-grid';
import './gel-item';

class PageGrid extends LitElement {
	static styles = [
		baseStyles,
		pageStyles,
		css`
			:host {
				--gel-offset-top: 40px;
				--gel-offset-left: 284px;
			}
		`
	];

	render() {
		return html`
			<gel-grid>
				<gel-item>
					<header>Header Item #1</header>
					<img src="img/jon-icon.png">
					<div>Div Item #1</div>
				</gel-item>
				<gel-item>
					<header>Header Item #2</header>
					<img src="img/player-down-large.png">
					<div>Div Item #2</div>
				</gel-item>
			</gel-grid>
        `;
	}
}

customElements.define('page-grid', PageGrid);