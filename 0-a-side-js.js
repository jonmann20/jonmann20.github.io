(window.webpackJsonp=window.webpackJsonp||[]).push([[1,12],[,function(t,e,n){"use strict";n.r(e);var a=n(16),o=n(4);customElements.define("a-side",class extends a.a{static get properties(){return{active:{type:Boolean},selectedPage:{type:String}}}constructor(){super(),this.active=!1}render(){return a.c`
			<style>
				${o.default}

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
		`}})},,,function(t,e,n){"use strict";n.r(e);e.default="\n\t:host {\n\t\tdisplay: block;\n\t}\n\n\t* {\n\t\tbox-sizing: border-box;\n\t}\n\n\th1,\n\th2,\n\th3 {\n\t\tmargin: 0.4em 0 0.6em;\n\t\tfont-size: 1.75em;\n\t\tfont-weight: 300;\n\t\tcolor: #fcfcfa;\n\t\ttext-shadow: 0 2px 3px #212121;\n\t}\n\n\tul {\n\t\tlist-style-type: none;\n\t\tpadding: 0;\n\t}\n\n\ta {\n\t\tcolor: #66d9ef;\n\t\ttext-decoration: none;\n\t\toutline: none;\n\t\tcursor: pointer;\n\t}\n\n\ta:hover {\n\t\tcolor: #7ddff1;\n\t\ttext-shadow: #7ddff1 0 0 6px;\n\t}\n\n\ta:active {\n\t\tcolor: #4fd3ed;\n\t}\n\n\ta:focus {\n\t\toutline: 0;\n\t}\n\n\tinput {\n\t\toutline-color: #888;\n\t}\n\n\tinput:focus {\n\t\tbox-shadow: 2px 2px 16px 2px rgba(0, 0, 0, 0.45);\n\t}\n\n\t/* avoid FOUC, could remove if bundled? */\n\tmwc-icon {\n\t\tdisplay: inline-block;\n\t\twidth: 24px;\n\t\topacity: var(--icon-opacity);\n\t\t/* not working --- font-display: block; */\n\t}\n\n\t/* utils */\n\n\t.card {\n\t\tdisplay: inline-block;\n\t\tbackground: #2d2a2e;\n\t\tbox-shadow: var(--box-shadow-2);\n\t\tborder-radius: 2px;\n\t\tpadding: 3px 25px 5px;\n\t}\n\n\t.card-light {\n\t\tborder-radius: 2px;\n\t\tbox-shadow: var(--box-shadow-2);\n\t}\n"}]]);