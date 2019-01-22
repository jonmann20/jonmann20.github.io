(window.webpackJsonp=window.webpackJsonp||[]).push([[1,11],{5:function(e,i,t){"use strict";t.r(i),t.d(i,"baseStyles",function(){return o});var n=t(0);const o=n["c"]`
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
`},8:function(e,i,t){"use strict";t.r(i);var n=t(0),o=t(5);customElements.define("head-er",class extends n.a{static get properties(){return{selectedPage:{type:String}}}constructor(){super(),this.asideIsActive=!1,this.initX=0,this.x=0,this.boundHideAside=(e=>this.hideAside(e)),this.boundSetInitX=(e=>this.hideSetInitX(e)),this.boundSetX=(e=>this.hideSetX(e)),window.onresize=(()=>{window.innerWidth>800&&this.boundHideAside()})}render(){return n["c"]`
			<style>
				${o.baseStyles}

				header {
					position: fixed;
					z-index: 99999;
					top: 0;
					width: 100%;
					background: #2d2a2e;
				}

				.menu {
					position: absolute;
					display: flex;
					top: 0;
					right: 0;
					padding: 16px 20px 15px 16px;
					width: auto;
					-webkit-user-select: none;
					-moz-user-select: none;
					-ms-user-select: none;
					user-select: none;
				}

				nav {
					font-size: 1.57em;
					text-align: left;
					margin-top: 35px;
					padding: 15px 20px;
					min-width: 165px;
				}

				nav:first-child {
					margin-top: 0;
					height: 55px;
				}

				nav:first-child a {
					display: inline;
					text-align: center;
					line-height: 1.1 !important;
					margin-right: 0;
				}

				ul {
					list-style-type: none;
					font-size: 62%;
					width: 90%;
					margin: 0 auto;
					padding: 0;
					border-radius: 1px;
				}

				ul a {
					margin-right: 0 !important;
				}

				ul a:active {
					margin-bottom: 4px;
				}

				a {
					width: 100%;
					color: #ffd866;
				}

				a:hover {
					color: #ffd866;
					text-shadow: 0 0 6px #ffd866;
				}

				a,
				a:visited {
					text-align: right;
					display: block;
					margin-right: 18px;
					line-height: 1.7;
					transition: none;
				}

				/* TODO: extract template, logic, and styling of nav links between head-er and a-side */
				/* keep in sync with a-side */
				a:hover mwc-icon,
				[selected],
				[selected]:hover {
					color: #ff6188 !important;
					cursor: default;
					text-shadow: none;
				}

				mwc-icon {
					cursor: pointer !important;
				}

				.icon-home {
					margin-right: 7px;
					vertical-align: -3px;
				}

				.nav2 {
					display: none;
					margin-top: 20px;
				}

				.nav2 ul a {
					margin-bottom: 4px;
					text-align: center;
				}

				.nav2 mwc-icon {
					vertical-align: -5px;
				}

				.playground-nav-wrap {
					height: 0;
					opacity: 0;
					visibility: hidden;
					will-change: height, padding, opacity;
					transition: 0.25s ease;
				}

				.playground-nav-wrap.visible {
					padding: 10px 0 10px 40px;
					height: 92px;
					visibility: visible;
					opacity: 1;
				}

				/* > mobile */
				@media (min-width: 801px) {
					header {
						top: auto;
						width: auto;
						background: none;
					}

					nav {
						text-align: center;
						padding: 15px 15px 0 0;
					}

					nav:first-child {
						text-indent: 9px;
						padding-bottom: 20px;
					}

					.menu {
						display: none !important;
					}

					.nav2 {
						display: block;
					}
				}
			</style>

			<header>
				<nav>
					<a href="#home">
						<mwc-icon class="icon-home" ?selected="${"home"===this.selectedPage}">home</mwc-icon>&nbsp;Jon Wiedmann
					</a>
					<a class="menu" @click="${this.menuClick}">
						<mwc-icon>menu</mwc-icon>
					</a>
				</nav>
				<nav class="nav2">
					<a href="#games">
						Games <mwc-icon ?selected="${"games"===this.selectedPage}">videogame_asset</mwc-icon>
					</a>
					<a href="#playground">
						Playground <mwc-icon ?selected="${this.selectedPage.includes("playground")}">polymer</mwc-icon>
					</a>

					<!-- TODO: convert sub nav to a component -->
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
				</nav>
			</header>
		`}menuClick(e){e.preventDefault(),this.asideIsActive?this.hideAside():(document.querySelector("a-side").setAttribute("active",!0),document.querySelector("main").classList.add("leftbar-active"),this.asideIsActive=!0,requestAnimationFrame(()=>{document.body.addEventListener("click",this.boundHideAside,{passive:!0}),document.body.addEventListener("touchstart",this.boundSetInitX,{passive:!0}),document.body.addEventListener("touchmove",this.boundSetX,{passive:!0}),document.body.addEventListener("touchend",this.boundHideAside,{passive:!0})}))}hideAside(e){e&&"touchend"===e.type&&this.initX===this.x||(document.querySelector("a-side").removeAttribute("active"),document.querySelector("main").classList.remove("leftbar-active"),this.asideIsActive=!1,document.body.removeEventListener("click",this.boundHideAside,{passive:!0}),document.body.removeEventListener("touchstart",this.boundSetInitX,{passive:!0}),document.body.removeEventListener("touchmove",this.boundSetX,{passive:!0}),document.body.removeEventListener("touchend",this.boundHideAside,{passive:!0}))}setInitX(e){this.initX=e.touches[0].pageX,this.x=this.initX}setX(e){this.x=e.touches[0].pageX}})}}]);