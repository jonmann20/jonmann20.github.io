(window.webpackJsonp=window.webpackJsonp||[]).push([[1,4,7],{11:function(e,t,a){"use strict";a.r(t),a.d(t,"BLACK",function(){return n}),a.d(t,"BLUE",function(){return r}),a.d(t,"GREEN",function(){return i}),a.d(t,"WHITE",function(){return d}),a.d(t,"PURPLE",function(){return c}),a.d(t,"YELLOW",function(){return s}),a.d(t,"GRAY",function(){return l}),a.d(t,"RED",function(){return p});var o=a(23);const n=Object(o.d)("#2d2a2e"),r=Object(o.d)("#66d9ef"),i=Object(o.d)("#a6e22e"),d=Object(o.d)("#fcfcfa"),c=Object(o.d)("#ab9df2"),s=Object(o.d)("#ffd866"),l=Object(o.d)("#919091"),p=Object(o.d)("#ff6188")},12:function(e,t,a){"use strict";a.r(t);var o=a(23),n=a(11);t.default=o.b`
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
		color: ${n.WHITE};
		text-shadow: 0 2px 3px #212121;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	a {
		color: ${n.BLUE};
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

	a[selected] {
		color: ${n.RED} !important;
	}

	input {
		outline-color: #888;
	}

	input:focus {
		box-shadow: 2px 2px 16px 2px rgba(0, 0, 0, 0.45);
	}

	/* utils */

	.card {
		display: inline-block;
		background: ${n.BLACK};
		box-shadow: var(--box-shadow-2);
		border-radius: 2px;
		padding: 3px 25px 5px;
	}

	.card-light {
		border-radius: 2px;
		box-shadow: var(--box-shadow-2);
	}
`},6:function(e,t,a){"use strict";a.r(t);var o=a(23),n=a(12),r=a(11);customElements.define("a-side",class extends o.a{static get styles(){return[n.default,o.b`
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
					background: ${r.BLACK};
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
					color: ${r.YELLOW};
				}

				a:hover {
					color: ${r.YELLOW};
					text-shadow: 0 0 6px ${r.YELLOW};
				}

				i-con {
					float: left;
					margin-right: 13px;
					margin-top: 5px;
					cursor: pointer !important;
				}

				.playground-nav {
					margin-left: 25px;
				}

				.playground-nav a {
					font-size: 1.2em;
				}
			`]}static get properties(){return{active:{type:Boolean},page:{type:String}}}constructor(){super(),this.active=!1}render(){return o.c`
			<aside id="${this.active?"activated":""}">
				<a href="#games">
					Games <i-con name="videogameAsset" ?selected="${"games"===this.page}"></i-con>
				</a>
				<a href="#playground">
					Playground <i-con name="polymer" ?selected="${this.page.includes("playground")}"></i-con>
				</a>
				<div class="playground-nav-wrap">
					<ul class="playground-nav">
						<li><a href="#playground/breakdancing-cube" ?selected="${"playground/breakdancing-cube"===this.page}">Breakdancing Cube</a></li>
						<li><a href="#playground/starry-background" ?selected="${"playground/starry-background"===this.page}">Starry Background</a></li>
						<li><a href="#playground/ball-pit" ?selected="${"playground/ball-pit"===this.page}">Ball Pit</a></li>
					</ul>
				</div>
				<a href="#portfolio">
					Portfolio <i-con name="work" ?selected="${"portfolio"===this.page}"></i-con>
				</a>
			</aside>
		`}})}}]);