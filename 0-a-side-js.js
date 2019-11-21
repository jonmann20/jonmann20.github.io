(window.webpackJsonp=window.webpackJsonp||[]).push([[1,4],{11:function(e,a,o){"use strict";o.r(a);var t=o(23);let r;a.default=Object(t.b)(r||(r=(e=>e)`
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
		color: var(--white);
		text-shadow: 0 2px 3px #212121;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	a {
		color: var(--blue);
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
		color: var(--red) !important;
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
		background: var(--black);
		box-shadow: var(--box-shadow-2);
		border-radius: 2px;
		padding: 3px 25px 5px;
	}

	.card-light {
		border-radius: 2px;
		box-shadow: var(--box-shadow-2);
	}
`))},6:function(e,a,o){"use strict";o.r(a);var t=o(23),r=o(11);let i,n,l=e=>e;function d(e,a,o){return a in e?Object.defineProperty(e,a,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[a]=o,e}class s extends t.a{constructor(){super(),this.active=!1}render(){return Object(t.c)(i||(i=l`
			<aside id="${0}">
				<a href="#games">
					Games <i-con name="videogameAsset" ?selected="${0}"></i-con>
				</a>
				<a href="#playground">
					Playground <i-con name="polymer" ?selected="${0}"></i-con>
				</a>
				<div class="playground-nav-wrap">
					<ul class="playground-nav">
						<li><a href="#playground/breakdancing-cube" ?selected="${0}">Breakdancing Cube</a></li>
						<li><a href="#playground/starry-background" ?selected="${0}">Starry Background</a></li>
						<li><a href="#playground/ball-pit" ?selected="${0}">Ball Pit</a></li>
					</ul>
				</div>
				<a href="#portfolio">
					Portfolio <i-con name="work" ?selected="${0}"></i-con>
				</a>
			</aside>
		`),this.active?"activated":"","games"===this.page,this.page.includes("playground"),"playground/breakdancing-cube"===this.page,"playground/starry-background"===this.page,"playground/ball-pit"===this.page,"portfolio"===this.page)}}d(s,"styles",[r.default,Object(t.b)(n||(n=l`
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
				background: var(--black);
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
				color: var(--yellow);
			}

			a:hover {
				color: var(--yellow);
				text-shadow: 0 0 6px var(--yellow);
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
		`))]),d(s,"properties",{active:{type:Boolean},page:{type:String}}),customElements.define("a-side",s)}}]);