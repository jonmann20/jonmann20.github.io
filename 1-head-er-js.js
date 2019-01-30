(window.webpackJsonp=window.webpackJsonp||[]).push([[2,4,7],{11:function(e,t,i){"use strict";i.r(t),i.d(t,"BLACK",function(){return a}),i.d(t,"BLUE",function(){return o}),i.d(t,"GREEN",function(){return d}),i.d(t,"WHITE",function(){return s}),i.d(t,"PURPLE",function(){return r}),i.d(t,"YELLOW",function(){return c}),i.d(t,"GRAY",function(){return l}),i.d(t,"RED",function(){return u});var n=i(23);const a=Object(n.d)("#2d2a2e"),o=Object(n.d)("#66d9ef"),d=Object(n.d)("#a6e22e"),s=Object(n.d)("#fcfcfa"),r=Object(n.d)("#ab9df2"),c=Object(n.d)("#ffd866"),l=Object(n.d)("#919091"),u=Object(n.d)("#ff6188")},12:function(e,t,i){"use strict";i.r(t);var n=i(23),a=i(11);t.default=n.b`
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
		color: ${a.WHITE};
		text-shadow: 0 2px 3px #212121;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	a {
		color: ${a.BLUE};
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
		color: ${a.RED} !important;
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
		background: ${a.BLACK};
		box-shadow: var(--box-shadow-2);
		border-radius: 2px;
		padding: 3px 25px 5px;
	}

	.card-light {
		border-radius: 2px;
		box-shadow: var(--box-shadow-2);
	}
`},5:function(e,t,i){"use strict";i.r(t);var n=i(23),a=i(12),o=i(11);customElements.define("head-er",class extends n.a{static get styles(){return[a.default,n.b`
				header {
					position: fixed;
					z-index: 99999;
					top: 0;
					width: 100%;
					background: ${o.BLACK};
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
					color: ${o.YELLOW};
				}

				a:hover {
					color: ${o.YELLOW};
					text-shadow: 0 0 6px ${o.YELLOW};
				}

				a,
				a:visited {
					text-align: right;
					display: block;
					margin-right: 18px;
					line-height: 1.7;
					transition: none;
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

				.nav2 i-con {
					vertical-align: -6px;
					margin-left: 7px;
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
			`]}static get properties(){return{page:{type:String}}}constructor(){super(),this.asideIsActive=!1,this.initX=0,this.x=0,this.boundHideAside=(e=>this.hideAside(e)),this.boundSetInitX=(e=>this.hideSetInitX(e)),this.boundSetX=(e=>this.hideSetX(e)),window.onresize=(()=>{window.innerWidth>800&&this.boundHideAside()}),this.navVisible=window.page.includes("playground")}firstUpdated(){this.pNav=this.shadowRoot.querySelector(".playground-nav-wrap"),addEventListener("route",e=>{e.detail.includes("playground")?this.navVisible=!0:this.navVisible=!1},{passive:!0})}render(){return n.c`
			<header>
				<nav>
					<a href="#home">
						<i-con name="home" class="icon-home" ?selected="${"home"===this.page}"></i-con>&nbsp;Jon Wiedmann
					</a>
					<a class="menu" @click="${this.menuClick}">
						<i-con name="menu"></i-con>
					</a>
				</nav>
				<nav class="nav2">
					<a href="#games">
						Games <i-con name="videogameAsset" ?selected="${"games"===this.page}"></i-con>
					</a>
					<a href="#playground">
						Playground <i-con name="polymer" ?selected="${this.page.includes("playground")}"></i-con>
					</a>

					<!-- TODO: convert sub nav to a component -->
					<div class="playground-nav-wrap${this.navVisible?" visible":""}">
						<ul class="playground-nav">
							<li><a href="#playground/breakdancing-cube" ?selected="${"playground/breakdancing-cube"===this.page}">Breakdancing Cube</a></li>
							<li><a href="#playground/starry-background" ?selected="${"playground/starry-background"===this.page}">Starry Background</a></li>
							<li><a href="#playground/ball-pit" ?selected="${"playground/ball-pit"===this.page}">Ball Pit</a></li>
						</ul>
					</div>
					<a href="#portfolio">
						Portfolio <i-con name="work" ?selected="${"portfolio"===this.page}"></i-con>
					</a>
				</nav>
			</header>
		`}menuClick(e){e.preventDefault(),this.asideIsActive?this.hideAside():(document.querySelector("a-side").setAttribute("active",!0),document.querySelector("main").classList.add("leftbar-active"),this.asideIsActive=!0,requestAnimationFrame(()=>{document.body.addEventListener("click",this.boundHideAside,{passive:!0}),document.body.addEventListener("touchstart",this.boundSetInitX,{passive:!0}),document.body.addEventListener("touchmove",this.boundSetX,{passive:!0}),document.body.addEventListener("touchend",this.boundHideAside,{passive:!0})}))}hideAside(e){e&&"touchend"===e.type&&this.initX===this.x||(document.querySelector("a-side").removeAttribute("active"),document.querySelector("main").classList.remove("leftbar-active"),this.asideIsActive=!1,document.body.removeEventListener("click",this.boundHideAside,{passive:!0}),document.body.removeEventListener("touchstart",this.boundSetInitX,{passive:!0}),document.body.removeEventListener("touchmove",this.boundSetX,{passive:!0}),document.body.removeEventListener("touchend",this.boundHideAside,{passive:!0}))}setInitX(e){this.initX=e.touches[0].pageX,this.x=this.initX}setX(e){this.x=e.touches[0].pageX}})}}]);