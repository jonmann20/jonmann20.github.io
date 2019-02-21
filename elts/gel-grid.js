import {css, html, LitElement} from 'lit-element';

class GelGrid extends LitElement {
	static properties = {
		expanded: {type: Boolean}
	};

	constructor() {
		super();
		this.expanded = false;
	}

	static styles = css`
		:host {
			--offset-top: var(--gel-offset-top, 0px);
			--offset-left: var(--gel-offset-left, 0px);

			--gel-item-margin: 25px;
			--gel-item-padding: 15px;
			--gel-item-width: 250px;
			--gel-item-height: 200px;

			--gel-width: calc(100% - var(--offset-left));
			--gel-height: calc(100% - var(--offset-top));

			width: var(--gel-width);
			height: var(--gel-height);

			width: 100%;
			height: 100%;
			padding-top: var(--offset-top);
			padding-left: calc(var(--offset-left) + var(--gel-item-margin));

			position: fixed;

			display: flex;
			flex-direction: row;
			flex-flow: wrap;
			align-content: baseline;
			background: red;
		}
	`;

	render() {
		return html`
			<style>
				:host {
					overflow-y: ${this.expanded ? 'hidden' : 'overlay'};
				}
			</style>
			<slot></slot>
		`;
	}
}

customElements.define('gel-grid', GelGrid);