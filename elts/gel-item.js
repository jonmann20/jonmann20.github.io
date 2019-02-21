import {css, html, LitElement} from 'lit-element';

class GelItem extends LitElement {
	static styles = css`
		:host {
			--duration: 0.5s;
			--bezier: cubic-bezier(0, 0, 0.3, 1);
			--transition-props: var(--duration) var(--bezier);
			--header-height: 50px;

			margin: var(--gel-item-margin);
			width: var(--gel-item-width);
			height: var(--gel-item-height);

			transition:
				height var(--duration) var(--bezier),
				left var(--duration) var(--bezier),
				width var(--duration) var(--bezier),
				margin var(--duration) var(--bezier),
				top var(--duration) var(--bezier),
				background var(--duration) var(--bezier),
				box-shadow var(--duration) var(--bezier);

			position: relative;
			z-index: 0;
			white-space: nowrap;
			box-shadow: var(--box-shadow-2);
			cursor: pointer;
			background: var(--black);
			color: var(--white);
			border-radius: 2px;
		}

		:host(:hover) {
			box-shadow: var(--box-shadow-4);
		}

		:host:active {
			-webkit-tap-highlight-color: transparent;
		}

		:host(.expanding),
		:host(.expanded),
		:host(.shrinking) {
			position: absolute;
			box-shadow: none;
			border-radius: 0;
			z-index: 999999;
		}

		:host(.expanding),
		:host(.expanded) {
			z-index: 2;
			width: 100%;
			height: 100%;
			left: 0 !important;
			margin: 0;
		}

		:host(.shrinking) {
			z-index: 1;
		}

		::slotted(img) {
			position: absolute;
			top: var(--header-height);
			left: 0;
			width: var(--gel-item-width);
			height: calc(var(--gel-item-height) - var(--header-height));
			transition:
				left  var(--transition-props),
				transform var(--transition-props),
				opacity var(--duration) var(--bezier);
		}

		:host(.expanding) ::slotted(img),
		:host(.expanded) ::slotted(img) {
			left: 50%;
			transform: translate(-50%, 10px);
		}

		::slotted(header) {
			position: absolute;
			left: 50%;
			transform: translate(-50%);
			z-index: 1;
			margin-top: 15px;
			transition: transform 0.5s var(--bezier);
		}

		:host(.expanding) ::slotted(header),
		:host(.expanded) ::slotted(header) {
			transform: scale(2) translateY(5px);
			transform-origin: right;
		}

		::slotted(div) {
			opacity: 0;
			white-space: normal;
			margin-top: calc(var(--gel-item-height));
			padding-top: 25px;
			padding-left: 25px;
			transition: opacity var(--transition-props);
			width: var(--gel-item-width);
			margin-left: auto;
			margin-right: auto;
		}

		:host(.expanded) ::slotted(div) {
			opacity: 1;
		}

		:host(.shrinking) ::slotted(div) {
			opacity: 0;
			transition: none;
		}
	`;

	firstUpdated() {
		this._id = Array.prototype.indexOf.call(this.parentElement.children, this);
		//const w = this.querySelector('header').offsetWidth;
		//this.style.setProperty('--header-left', `calc(50% - ${w / 2}px`);
		//this.style.setProperty('--margin-left', `${-w / 2}px`);
		const styles = window.getComputedStyle(this);
		const property = styles.getPropertyValue('--gel-item-margin');
		this._margin = parseInt(property.substr(1, 2));
		this.addEventListener('click', () => this._onClick());
		// gel-item: background, height, width, margin-bottom, margin-left, margin-right, margin-top, left, top
		// gel-item img: transform
		// gel-item header: left, transform

		this._numProps = 9;
		if(this.offsetTop === this._margin) {
			// top will not be animated
			--this._numProps;
		}

		if(this.offsetLeft === this._margin) {
			// left will not be animated
			--this._numProps;
		}

		this._expandingPropsCount = 0;
		this._shrinkingPropsCount = 0;
		this.addEventListener('transitionend', e => this._onTransitionEnd(e));
	}

	render() {
		return html`<slot></slot>`;
	}

	_onClick() {
		//console.log(this._id, this.classList);

		if(this.classList.contains('expanding') || this.classList.contains('shrinking')) {
			return;
		}

		if(this.classList.contains('expanded')) {
			this.classList.remove('expanded');
			this.style = `
				top: ${this.dataset.top}px;
				left: ${this.dataset.left}px;
			`;
			this.classList.add('shrinking');
			this.parentElement.removeAttribute('expanded');
		}
		else {
			let clone = this.cloneNode(true);
			clone.dataset.top = this.offsetTop - this._margin;
			clone.dataset.left = this.offsetLeft - this._margin;
			clone.style = `
				position: absolute;
				top: ${clone.dataset.top}px;
				left: ${clone.dataset.left}px;
			`;
			this.parentElement.appendChild(clone);

			requestAnimationFrame(() => {
				clone.style = `
					top: ${this.parentElement.scrollTop}px;
					left: ${this.offsetLeft - this._margin}px;
					background: ${this.dataset.background};
				`;
				clone.classList.add('expanding');
				this.parentElement.setAttribute('expanded', '');
			});
		}
	}

	_onTransitionEnd(e) {
		//console.log(this._id, this.className, e.propertyName, this._expandingPropsCount, this._numProps);

		if(this.classList.contains('expanding') && ++this._expandingPropsCount === this._numProps) {
			this.classList.remove('expanding');
			this.classList.add('expanded');
			this._expandingPropsCount = 0;
		}
		else if(this.classList.contains('shrinking') && ++this._shrinkingPropsCount === this._numProps) {
			this.parentElement.removeChild(this);
		}
	}
}

customElements.define('gel-item', GelItem);