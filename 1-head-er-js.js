(window.webpackJsonp=window.webpackJsonp||[]).push([[2,4],{11:function(t,e,n){"use strict";n.r(e);e.default="\n\t:host {\n\t\tdisplay: block;\n\t}\n\n\t* {\n\t\tbox-sizing: border-box;\n\t}\n\n\th1,\n\th2,\n\th3 {\n\t\tmargin: 0.4em 0 0.6em;\n\t\tfont-size: 1.75em;\n\t\tfont-weight: 300;\n\t\tcolor: #fcfcfa;\n\t\ttext-shadow: 0 2px 3px #212121;\n\t}\n\n\tul {\n\t\tlist-style-type: none;\n\t\tpadding: 0;\n\t}\n\n\ta {\n\t\tcolor: #66d9ef;\n\t\ttext-decoration: none;\n\t\toutline: none;\n\t\tcursor: pointer;\n\t}\n\n\ta:hover {\n\t\tcolor: #7ddff1;\n\t\ttext-shadow: #7ddff1 0 0 6px;\n\t}\n\n\ta:active {\n\t\tcolor: #4fd3ed;\n\t}\n\n\ta:focus {\n\t\toutline: 0;\n\t}\n\n\tinput {\n\t\toutline-color: #888;\n\t}\n\n\tinput:focus {\n\t\tbox-shadow: 2px 2px 16px 2px rgba(0, 0, 0, 0.45);\n\t}\n\n\t/* utils */\n\n\t.card {\n\t\tdisplay: inline-block;\n\t\tbackground: #2d2a2e;\n\t\tbox-shadow: var(--box-shadow-2);\n\t\tborder-radius: 2px;\n\t\tpadding: 3px 25px 5px;\n\t}\n\n\t.card-light {\n\t\tborder-radius: 2px;\n\t\tbox-shadow: var(--box-shadow-2);\n\t}\n"},5:function(t,e,n){"use strict";n.r(e);var i=n(22),a=n(11);customElements.define("head-er",class extends i.a{static get properties(){return{selectedPage:{type:String}}}constructor(){super(),this.asideIsActive=!1,this.initX=0,this.x=0,this.boundHideAside=(t=>this.hideAside(t)),this.boundSetInitX=(t=>this.hideSetInitX(t)),this.boundSetX=(t=>this.hideSetX(t)),window.onresize=(()=>{window.innerWidth>800&&this.boundHideAside()}),this.navVisible=window.selectedPage.includes("playground")}firstUpdated(){this.pNav=this.shadowRoot.querySelector(".playground-nav-wrap"),addEventListener("route",t=>{t.detail.includes("playground")?this.navVisible=!0:this.navVisible=!1},{passive:!0})}render(){return i.b`
			<style>
				${a.default}

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
			</style>

			<header>
				<nav>
					<a href="#home">
						<i-con name="home" class="icon-home" ?selected="${"home"===this.selectedPage}"></i-con>&nbsp;Jon Wiedmann
					</a>
					<a class="menu" @click="${this.menuClick}">
						<i-con name="menu"></i-con>
					</a>
				</nav>
				<nav class="nav2">
					<a href="#games">
						Games <i-con name="videogameAsset" ?selected="${"games"===this.selectedPage}"></i-con>
					</a>
					<a href="#playground">
						Playground <i-con name="polymer" ?selected="${this.selectedPage.includes("playground")}"></i-con>
					</a>

					<!-- TODO: convert sub nav to a component -->
					<div class="playground-nav-wrap${this.navVisible?" visible":""}">
						<ul class="playground-nav">
							<li><a href="#playground/breakdancing-cube" ?selected="${"playground/breakdancing-cube"===this.selectedPage}">Breakdancing Cube</a></li>
							<li><a href="#playground/starry-background" ?selected="${"playground/starry-background"===this.selectedPage}">Starry Background</a></li>
							<li><a href="#playground/ball-pit" ?selected="${"playground/ball-pit"===this.selectedPage}">Ball Pit</a></li>
						</ul>
					</div>
					<a href="#portfolio">
						Portfolio <i-con name="work" ?selected="${"portfolio"===this.selectedPage}"></i-con>
					</a>
				</nav>
			</header>
		`}menuClick(t){t.preventDefault(),this.asideIsActive?this.hideAside():(document.querySelector("a-side").setAttribute("active",!0),document.querySelector("main").classList.add("leftbar-active"),this.asideIsActive=!0,requestAnimationFrame(()=>{document.body.addEventListener("click",this.boundHideAside,{passive:!0}),document.body.addEventListener("touchstart",this.boundSetInitX,{passive:!0}),document.body.addEventListener("touchmove",this.boundSetX,{passive:!0}),document.body.addEventListener("touchend",this.boundHideAside,{passive:!0})}))}hideAside(t){t&&"touchend"===t.type&&this.initX===this.x||(document.querySelector("a-side").removeAttribute("active"),document.querySelector("main").classList.remove("leftbar-active"),this.asideIsActive=!1,document.body.removeEventListener("click",this.boundHideAside,{passive:!0}),document.body.removeEventListener("touchstart",this.boundSetInitX,{passive:!0}),document.body.removeEventListener("touchmove",this.boundSetX,{passive:!0}),document.body.removeEventListener("touchend",this.boundHideAside,{passive:!0}))}setInitX(t){this.initX=t.touches[0].pageX,this.x=this.initX}setX(t){this.x=t.touches[0].pageX}})}}]);