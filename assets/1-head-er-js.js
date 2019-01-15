(window.webpackJsonp=window.webpackJsonp||[]).push([[2,12],{29:function(e,i,t){"use strict";t.r(i);var n=t(47),a=t(37);customElements.define("head-er",class extends n.a{static get properties(){return{selectedPage:{type:String}}}constructor(){super(),this.asideIsActive=!1,this.initX=0,this.x=0,this.boundHideAside=(e=>this.hideAside(e)),this.boundSetInitX=(e=>this.hideSetInitX(e)),this.boundSetX=(e=>this.hideSetX(e)),window.onresize=(()=>{window.innerWidth>800&&this.boundHideAside()})}render(){return n["b"]`
			<style>
				${a.baseStyles}

				header {
					position: fixed;
					z-index: 99999;
					top: 0;
					width: 100%;
					background: #2d2a2e;
				}

				header .menu {
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

				header nav {
					font-size: 1.57em;
					text-align: left;
					margin-top: 35px;
					padding: 15px 20px;
					min-width: 165px;
				}

				header nav:first-child {
					margin-top: 0;
					height: 55px;
				}

				header nav:first-child a {
					display: inline;
					text-align: center;
					line-height: 1.1 !important;
					margin-right: 0;
				}

				header nav.hdr-nav2 iron-icon {
					font-size: 0.6em;
					margin-left: 15px;
				}

				header nav ul {
					list-style-type: none;
					font-size: 62%;
					width: 90%;
					margin: 0 auto;
					padding: 0;
					border-radius: 1px;
				}

				header nav ul a {
					margin-right: 0 !important;
				}

				header nav ul a:active {
					margin-bottom: 4px;
				}

				header nav a {
					width: 100%;
					color: #ffd866;
				}

				header nav a:hover {
					color: #ffd866;
					text-shadow: 0 0 6px #ffd866;
				}

				header nav a,
				aside a,
				header nav a:visited,
				aside a:visited {
					text-align: right;
					display: block;
					margin-right: 18px;
					line-height: 1.7;
					transition: none;
				}

				/* TODO: extract template, logic, and styling of nav links between head-er and a-side */
				/* keep in sync with a-side */
				header nav a:hover iron-icon,
				aside a:hover iron-icon,
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

				.hdr-nav2 {
					display: none;
					margin-top: 20px;
				}

				.hdr-nav2 ul a {
					margin-bottom: 4px;
					text-align: center;
				}

				.hdr-nav2 .icon-controllernes {
					font-size: 0.72em;
				}

				.hdr-nav2 .playground-nav-wrap {
					height: 0;
					opacity: 0;
					visibility: hidden;
					will-change: height, padding, opacity;
					transition: 0.25s ease;
				}

				.hdr-nav2 .playground-nav-wrap.visible {
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

					header nav {
						text-align: center;
						padding: 15px 15px 0 0;
					}

					header nav:first-child {
						text-indent: 9px;
						padding-bottom: 20px;
					}

					header .menu {
						display: none !important;
					}

					.hdr-nav2 {
						display: block;
					}
				}
			</style>

			<header>
				<nav>
					<a href="#home">
						<iron-icon icon="i:home" class="icon-home" ?selected="${"home"===this.selectedPage}"></iron-icon>&nbsp;Jon Wiedmann
					</a>
					<a class="menu" @click="${this.menuClick}">
						<iron-icon icon="i:menu"></iron-icon>
					</a>
				</nav>
				<nav class="hdr-nav2">
					<a href="#games">
						Games <iron-icon icon="i:videogame-asset" class="icon-controllernes" ?selected="${"games"===this.selectedPage}"></iron-icon>
					</a>
					<a href="#playground">
						Playground <iron-icon icon="i:polymer" class="icon-beaker" ?selected="${this.selectedPage.includes("playground")}"></iron-icon>
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
						Portfolio <iron-icon icon="i:work" class="icon-briefcase" ?selected="${"portfolio"===this.selectedPage}"></iron-icon>
					</a>
				</nav>
			</header>
		`}menuClick(e){e.preventDefault(),this.asideIsActive?this.hideAside():(document.querySelector("a-side").setAttribute("active",!0),document.querySelector("main").classList.add("leftbar-active"),this.asideIsActive=!0,requestAnimationFrame(()=>{document.body.addEventListener("click",this.boundHideAside,{passive:!0}),document.body.addEventListener("touchstart",this.boundSetInitX,{passive:!0}),document.body.addEventListener("touchmove",this.boundSetX,{passive:!0}),document.body.addEventListener("touchend",this.boundHideAside,{passive:!0})}))}hideAside(e){e&&"touchend"===e.type&&this.initX===this.x||(document.querySelector("a-side").removeAttribute("active"),document.querySelector("main").classList.remove("leftbar-active"),this.asideIsActive=!1,document.body.removeEventListener("click",this.boundHideAside,{passive:!0}),document.body.removeEventListener("touchstart",this.boundSetInitX,{passive:!0}),document.body.removeEventListener("touchmove",this.boundSetX,{passive:!0}),document.body.removeEventListener("touchend",this.boundHideAside,{passive:!0}))}setInitX(e){this.initX=e.touches[0].pageX,this.x=this.initX}setX(e){this.x=e.touches[0].pageX}})},37:function(e,i,t){"use strict";t.r(i),t.d(i,"baseStyles",function(){return a});var n=t(47);const a=n["b"]`
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