import {html} from 'lit-element';

export const shellStyles = html`
	* {
		box-sizing: border-box;
	}

	h1,
	h2,
	h3,
	h4 {
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

	button {
		transition: all 0.35s ease-out;
		cursor: pointer;
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

	.caption {
		color: #919091;
	}

	.big-btn {
		display: inline-block;
		margin: 10px auto;
		padding: 9px 14px;
		border-radius: 10px;
		font-weight: bold;
		font-size: 1.2em;
		background: rgba(107, 107, 107, 0.64);
		box-shadow: 0 3px 0 rgba(54, 54, 54, 0.94);
		opacity: 1;
		transition: all 0.19s;
		color: #ffd866;
	}

	.big-btn:hover,
	.big-btn:focus {
		color: #ffd866;
		box-shadow: 0 3px 0 #ffd866;
		text-shadow: none;
	}

	.big-btn:active {
		box-shadow: none !important;
		transform: translateY(3px);
	}

	.big-btn span {
		padding-right: 10px;
		vertical-align: -1px;
	}

	/* layouts */

	.col-left {
		min-width: 121px;
		width: 100%;
	}

	.col-left ul {
		font-size: 1.15em;
	}

	.col-right {
		margin-top: 25px;
		padding-bottom: 13px;
	}

	.col-right img {
		max-width: 100%;
	}

	.col-right > div {
		padding-bottom: 13px !important;
	}

	.carousel-list-page .col-left {
		display: none;
	}

	.carousel-list-page .col-right {
		margin-top: 0;
	}

	.carousel-list-page .col-right > div {
		opacity: 1;
		visibility: visible;
		transition: 450ms opacity;
		position: static;
		width: 100%;
		margin-bottom: 20px;
	}

	.carousel-list-page .col-right > div:last-child {
		margin-bottom: 100px;
	}

	.carousel-list-page .col-right > div.fade-in {
		opacity: 1 !important;
		visibility: visible !important;
		transition: 300ms opacity;
	}

	#div-default {
		display: none;
	}

	/* > mobile */
	@media (min-width: 458px) {
		#div-default {
			display: block;
		}
	}

/*
@media (min-width: 801px) {
	.col-left {
		float: left;
		width: 37%;
	}

	.col-right {
		float: right;
		width: 58%;
		margin-top: 0;
	}

	.carousel-list-page .col-left {
		display: block;
	}

	.carousel-list-page .col-right > div {
		opacity: 0;
		visibility: hidden;
		width: 44%;
		position: absolute;
		max-width: 728px;
	}

	.carousel-list-page .col-right > div:last-child {
		margin-bottom: 20px;
	}
}

@media (min-width: 801px) and (max-width: 1265px) {
	.col-left {
		width: 100%;
		margin-bottom: 0;
	}

	.col-right {
		width: 100%;
		margin-top: 25px;
	}

	.carousel-list-page .col-right {
		margin-top: 25px;
	}

	.carousel-list-page .col-right > div {
		width: 100%;
		max-width: 490px;
	}
}
*/
`;