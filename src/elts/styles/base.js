import {html} from 'lit-element';

export const baseStyles = html`
	:host {
		display: block;
	}

	* {
		box-sizing: border-box;
	}

	h1,
	h2,
	h3 {
		margin: 0.4em 0 0.6em;
		font-size: 1.75em;
		font-weight: 300;
		color: #fcfcfa;
		text-shadow: 0 2px 3px #212121;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	a {
		color: #66d9ef;
		text-decoration: none;
		outline: none;
		cursor: pointer;
	}

	a:hover {
		color: #7ddff1;
		text-shadow: #7ddff1 0 0 6px;
	}

	a:active {
		color: #4fd3ed;
	}

	a:focus {
		outline: 0;
	}

	input {
		outline-color: #888;
	}

	input:focus {
		box-shadow: 2px 2px 16px 2px rgba(0, 0, 0, 0.45);
	}

	iron-icon {
		display: inline-block;
		width: 24px;
	}

	/* utils */

	.card {
		display: inline-block;
		background: #2d2a2e;
		box-shadow: var(--box-shadow-2);
		border-radius: 2px;
		padding: 3px 25px 5px;
	}

	.card-light {
		border-radius: 2px;
		box-shadow: var(--box-shadow-2);
	}
`;

/* vars

// Monakai theme
$black: #2d2a2e;
$blue: #66d9ef;
$green: #a6e22e;
$white: #fcfcfa;
$red: #ff6188;
$purple: #ab9df2;
$yellow: #ffd866;
$gray: #919091;

$html-background: darken($black, 6%);
$card-background: $black;
$txt-color: $white;
$link-color: $blue;
$link-color-hover: lighten($link-color, 5%);
$link-color-active: darken($link-color, 5%);
$nav-link-color: $yellow;
$nav-link-active-color: $red;
$header-txt-color: $white;

@mixin desktop {
	@media (min-width: 801px) {
		@content;
	}
}

@mixin tablet {
	@media (min-width: 801px) and (max-width: 1265px) {
		@content;
	}
}
*/