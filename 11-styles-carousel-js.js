(window.webpackJsonp=window.webpackJsonp||[]).push([[5,7],{11:function(i,t,n){"use strict";n.r(t),n.d(t,"BLACK",function(){return d}),n.d(t,"BLUE",function(){return a}),n.d(t,"GREEN",function(){return e}),n.d(t,"WHITE",function(){return r}),n.d(t,"PURPLE",function(){return c}),n.d(t,"YELLOW",function(){return l}),n.d(t,"GRAY",function(){return p}),n.d(t,"RED",function(){return b});var o=n(23);const d=Object(o.d)("#2d2a2e"),a=Object(o.d)("#66d9ef"),e=Object(o.d)("#a6e22e"),r=Object(o.d)("#fcfcfa"),c=Object(o.d)("#ab9df2"),l=Object(o.d)("#ffd866"),p=Object(o.d)("#919091"),b=Object(o.d)("#ff6188")},14:function(i,t,n){"use strict";n.r(t);var o=n(23),d=n(11);t.default=o.b`
	:host {
		position: relative;
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
		color: ${d.YELLOW};
	}

	.big-btn:hover,
	.big-btn:focus {
		color: ${d.YELLOW};
		box-shadow: 0 3px 0 ${d.YELLOW};
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

	.col-left {
		display: none;
	}

	.col-right {
		margin-top: 0;
	}

	.col-right > div {
		opacity: 1;
		visibility: visible;
		transition: 450ms opacity;
		position: static;
		width: 100%;
		margin-bottom: 20px;
	}

	.col-right > div:last-child {
		margin-bottom: 100px;
	}

	.col-right > div.fade-in {
		opacity: 1 !important;
		visibility: visible !important;
		transition: 300ms opacity;
	}

	#div-default {
		display: none;
	}

	/* > mobile */
	@media (min-width: 801px) {
		ul {
			list-style-type: inherit;
			padding-left: 20px;
		}

		.col-left {
			display: block;
		}

		.col-right > div {
			opacity: 0;
			visibility: hidden;
			width: 44%;
			position: absolute;
			max-width: 728px;
		}

		.col-right > div:last-child {
			margin-bottom: 20px;
		}

		#div-default {
			display: block;
		}
	}

	/* tablet */
	@media (min-width: 801px) and (max-width: 1265px) {
		.col-right {
			margin-top: 25px;
		}

		.col-right > div {
			width: 100%;
			max-width: 490px;
		}
	}
`}}]);