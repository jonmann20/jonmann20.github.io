(window.webpackJsonp=window.webpackJsonp||[]).push([[1,12],{30:function(e,o,t){"use strict";t.r(o);var a=t(47),i=t(37);customElements.define("a-side",class extends a.a{static get properties(){return{active:{type:Boolean},selectedPage:{type:String}}}constructor(){super(),this.active=!1}render(){return a["b"]`
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

				iron-icon {
					float: left;
					margin-right: 20px;
					margin-top: 5px;
					cursor: pointer
				}

				[selected],
				[selected]:hover {
					color: #ff6188 !important;
					-webkit-text-stroke: 1px #ff6188;
					text-stroke: 1px #ff6188;
					cursor: default;
					text-shadow: none;
				}

				iron-icon {
					cursor: pointer !important;
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
					Games <iron-icon icon="i:videogame-asset" class="icon-controllernes" ?selected="${"games"===this.selectedPage}"></iron-icon>
				</a>
				<a href="#playground">
					Playground <iron-icon icon="i:polymer" class="icon-beaker" ?selected="${this.selectedPage.includes("playground")}"></iron-icon>
				</a>
				<div class="playground-nav-wrap">
					<ul class="playground-nav">
						<li><a href="#playground/breakdancing-cube" ?selected="${"playground/breakdancing-cube"===this.selectedPage}">Breakdancing Cube</a></li>
						<li><a href="#playground/starry-background" ?selected="${"playground/starry-background"===this.selectedPage}">Starry Background</a></li>
						<li><a href="#playground/ball-pit" ?selected="${"playground/ball-pit"===this.selectedPage}">Ball Pit</a></li>
					</ul>
				</div>
				<a href="#portfolio">
					Portfolio <iron-icon icon="i:work" class="icon-briefcase" ?selected="${"portfolio"===this.selectedPage}"></iron-icon>
				</a>
			</aside>
		`}})},37:function(e,o,t){"use strict";t.r(o),t.d(o,"baseStyles",function(){return i});var a=t(47);const i=a["b"]`
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
`}}]);