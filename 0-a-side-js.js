(window.webpackJsonp=window.webpackJsonp||[]).push([[0,11],{5:function(e,t,o){"use strict";o.r(t),o.d(t,"baseStyles",function(){return a});const a=o(0).c`
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

	/* avoid FOUC, could remove if bundled? */
	mwc-icon {
		display: inline-block;
		width: 24px;
		opacity: var(--icon-opacity);
		/* not working --- font-display: block; */
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
`},9:function(e,t,o){"use strict";o.r(t);var a=o(0),i=o(5);customElements.define("a-side",class extends a.a{static get properties(){return{active:{type:Boolean},selectedPage:{type:String}}}constructor(){super(),this.active=!1}render(){return a.c`
			<style>
				${i.baseStyles}

				/* keep in sync with head-er */
				[selected],
				[selected]:hover {
					color: #ff6188 !important;
					-webkit-text-stroke: 1px #ff6188;
					text-stroke: 1px #ff6188;
					cursor: default;
					text-shadow: none;
				}

				aside {
					transform: translateX(-100%);
					transition: all 0.3s cubic-bezier(0, 0, 0.3, 1);
					padding-top: 60px;
					height: 100%;
					width: 75%;
					min-width: 200px;
					max-width: 260px;
					position: fixed;
					left: 0;
					top: 0;
					background: #2d2a2e;
					z-index: 999;
					will-change: transform;
				}

				aside#activated {
					transform: translateX(0);
				}

				a {
					display: block;
					line-height: 1.7;
					font-size: 1.45em;
					padding: 10px 0 10px 20px;
					text-align: left !important;
					color: #ffd866;
				}

				a:hover {
					color: #ffd866;
					text-shadow: 0 0 6px #ffd866;
				}

				mwc-icon {
					float: left;
					margin-right: 13px;
					margin-top: 5px;
					cursor: pointer !important;
				}

				[selected],
				[selected]:hover {
					color: #ff6188 !important;
					-webkit-text-stroke: 1px #ff6188;
					text-stroke: 1px #ff6188;
					cursor: default;
					text-shadow: none;
				}

				.playground-nav {
					margin-left: 25px;
				}

				.playground-nav a {
					font-size: 1.2em;
				}
			</style>

			<aside id="${this.active?"activated":""}">
				<a href="#games">
					Games <mwc-icon ?selected="${"games"===this.selectedPage}">videogame_asset</mwc-icon>
				</a>
				<a href="#playground">
					Playground <mwc-icon ?selected="${this.selectedPage.includes("playground")}">polymer</mwc-icon>
				</a>
				<div class="playground-nav-wrap">
					<ul class="playground-nav">
						<li><a href="#playground/breakdancing-cube" ?selected="${"playground/breakdancing-cube"===this.selectedPage}">Breakdancing Cube</a></li>
						<li><a href="#playground/starry-background" ?selected="${"playground/starry-background"===this.selectedPage}">Starry Background</a></li>
						<li><a href="#playground/ball-pit" ?selected="${"playground/ball-pit"===this.selectedPage}">Ball Pit</a></li>
					</ul>
				</div>
				<a href="#portfolio">
					Portfolio <mwc-icon ?selected="${"portfolio"===this.selectedPage}">work</mwc-icon>
				</a>
			</aside>
		`}})}}]);