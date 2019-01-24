(window.webpackJsonp=window.webpackJsonp||[]).push([[9,2,3,11],{15:function(t,n,e){"use strict";e.r(n);var i=e(0),o=e(6),a=e(7),r=e(8),l=e(18);customElements.define("page-portfolio",class extends i.a{constructor(){super(),document.title="Portfolio"}firstUpdated(){new l.a(this.shadowRoot.querySelector(".col-left ul"),this.shadowRoot)}render(){return i.c`
			<style>
				${o.default}
				${a.default}
				${r.default}

				.big-btn {
					margin-bottom: 20px;
				}

				.big-btn .open-in-new {
					vertical-align: -6px;
					margin-left: 3px;
				}

				.wht-img {
					float: left;
					margin-right: 15px;
				}

				.wht-ele {
					margin-top: 70px;
				}

				.enl-site {
					margin-top: 25px;
					clear: both;
				}

				/* > mobile */
				@media (min-width: 801px) {
					.enl-site {
						float: left;
					}
				}
			</style>

			<div class="col-left card">
				<h1>Porfolio</h1>
				<p>
					I currently work as a fullstack web developer and manager.
					I am a former computer science student at the <a href="https://www.eecs.umich.edu" target="_blank" rel="noopener">University of Michigan &mdash; College of Engineering</a>.
				</p>
				<p>
					My main interest in computer science is in web engineering and game engine development.
					I am also an avid indoor soccer player and musician.
				</p>

				<ul>
					<li><a id="wellopp">Wellopp</a></li>
					<li><a id="perficient">Perficient Digital</a></li>
					<li><a id="pico">PicoCal Inc.</a></li>
					<li><a id="nology">Nology Digital</a></li>
				</ul>
			</div>
			<div class="col-right">
				<div id="div-default" class="fade-in">
					<img class="card-light" src="/img/panama-city.jpg" alt="On vacation on Panama City, FL">
				</div>
				<div id="div-wellopp" class="card">
					<h2>Wellopp</h2>
					<p>
						This is my current job as CIO.  Here I lead the engineering team delivering stable and scalable solutions for the Healthcare industry.  Wellopp is the trade name of Homeward Health, LLC.<br>
						Project technologies are centered around a Docker based microservice architecture with Polymer, Node, and Ruby on Rails.
					</p>

					<a href="https://wellopp.com" class="big-btn" target="_blank" rel="noopener">
						Visit wellopp.com <mwc-icon class="open-in-new">open_in_new</mwc-icon>
					</a>

					<p><img src="/img/portfolio/wellopp.png" alt="Wellopp website"></p>
					<p><img src="/img/portfolio/emr-data-tab.png" alt="EMR Data Tab"></p>
					<p><img src="/img/portfolio/my-rewards.png" alt="MyWellopp rewards"></p>
				</div>
				<div id="div-perficient" class="card">
					<h2>Perficient Digital</h2>
					<p>
						At Perficient (formerly Enlighten Agency), I worked as a front end web development engineer.
						While at Perficient, I was able to work on some high profile sites such as:
						<a href="https://jimmyjohns.com" target="_blank" rel="noopener">Jimmy Johns<sup>&reg;</sup></a>,
						<a href="http://johnfrieda.com" target="_blank" rel="noopener">John Frieda<sup>&reg;</sup></a>,
						<a href="http://jergens.com" target="_blank" rel="noopener">Jergens<sup>&reg;</sup></a>,
						<a href="http://curel.com" target="_blank" rel="noopener">Curel<sup>&reg;</sup></a>, and
						<a href="http://biore.com" target="_blank" rel="noopener">Biore<sup>&reg;</sup></a>.
					</p>
					<p>
						I programmed using HTML, CSS, JS (jQuery), C#, and ASP.NET (Web Forms and MVC).  I was also able to work with elektron, an ASP.NET <abbr title="Content Management System">CMS</abbr>.
					</p>
					<img class="wht-img" src="/img/portfolio/white-elephant.jpg" alt="White Elephant">
					<p class="wht-ele">
						For my last project at Perficient, I helped create White Elephant -- a cross-platform
						<a href="https://itunes.apple.com/us/app/what-white-elephant-gift-would/id783904884?ls=1&mt=8" target="_blank" rel="noopener">ios</a> and
						<a href="https://play.google.com/store/apps/details?id=com.Elighten.AwesomeGame" target="_blank" rel="noopener">android</a> app.
						The app takes you through a quiz, revealing what white elephant gift you are most like.
					</p>
					<a href="https://perficient.com" class="big-btn" target="_blank" rel="noopener">
						Visit perficient.com <mwc-icon class="open-in-new">open_in_new</mwc-icon>
					</a>

					<img class="enl-site" src="/img/portfolio/enlighten.jpg" alt="Enlighten Agency">
				</div>
				<div id="div-pico" class="card">
					<h2>PicoCal Inc.</h2>
					<p>
						My first solo project.  PicoCal Inc. needed a informative website with a simple backend for admin purposes.
						The site query's a MySQL database via PHP to dynamically bring in information.
					</p>

					<a href="http://picocal.com" class="big-btn" target="_blank" rel="noopener">
						Visit picocal.com <mwc-icon class="open-in-new">open_in_new</mwc-icon>
					</a>

					<img src="/img/portfolio/pico.jpg" alt="PicoCal">
				</div>
				<div id="div-nology" class="card">
					<h2>Nology Digital</h2>
					<p>
						My first job in web development was working with <a href="https://twitter.com/Nologydigital" target="_blank" rel="noopener">Nology Digital</a>.
						My last major work there was on <a href="https://www.bowersharbor.com" target="_blank" rel="noopener">Bower's Harbor Vineyard</a>.
						Bower's Harbor Vineyard is built around the open source framework <a href="https://zen-cart.com" target="_blank" rel="noopener">Zen Cart</a>.
					</p>

					<a href="https://twitter.com/Nologydigital" class="big-btn" target="_blank" rel="noopener">
						Visit @Nologydigital <mwc-icon class="open-in-new">open_in_new</mwc-icon>
					</a>

					<img src="/img/portfolio/nology.jpg" alt="Nology Digital">
				</div>
			</div>
		`}})},18:function(t,n,e){"use strict";n.a=class{constructor(t,n){let e,i="default",o=Array.from(t.querySelectorAll("a"));n=n||document,o.forEach(t=>{t.addEventListener("click",t=>{(e=t.target.id)&&i!==e&&(t.preventDefault(),n.querySelector(`#div-${i}`).classList.remove("fade-in"),n.querySelector(`#div-${e}`).classList.add("fade-in"),i=e)})})}}},6:function(t,n,e){"use strict";e.r(n);n.default="\n\t:host {\n\t\tdisplay: block;\n\t}\n\n\t* {\n\t\tbox-sizing: border-box;\n\t}\n\n\th1,\n\th2,\n\th3 {\n\t\tmargin: 0.4em 0 0.6em;\n\t\tfont-size: 1.75em;\n\t\tfont-weight: 300;\n\t\tcolor: #fcfcfa;\n\t\ttext-shadow: 0 2px 3px #212121;\n\t}\n\n\tul {\n\t\tlist-style-type: none;\n\t\tpadding: 0;\n\t}\n\n\ta {\n\t\tcolor: #66d9ef;\n\t\ttext-decoration: none;\n\t\toutline: none;\n\t\tcursor: pointer;\n\t}\n\n\ta:hover {\n\t\tcolor: #7ddff1;\n\t\ttext-shadow: #7ddff1 0 0 6px;\n\t}\n\n\ta:active {\n\t\tcolor: #4fd3ed;\n\t}\n\n\ta:focus {\n\t\toutline: 0;\n\t}\n\n\tinput {\n\t\toutline-color: #888;\n\t}\n\n\tinput:focus {\n\t\tbox-shadow: 2px 2px 16px 2px rgba(0, 0, 0, 0.45);\n\t}\n\n\t/* avoid FOUC, could remove if bundled? */\n\tmwc-icon {\n\t\tdisplay: inline-block;\n\t\twidth: 24px;\n\t\topacity: var(--icon-opacity);\n\t\t/* not working --- font-display: block; */\n\t}\n\n\t/* utils */\n\n\t.card {\n\t\tdisplay: inline-block;\n\t\tbackground: #2d2a2e;\n\t\tbox-shadow: var(--box-shadow-2);\n\t\tborder-radius: 2px;\n\t\tpadding: 3px 25px 5px;\n\t}\n\n\t.card-light {\n\t\tborder-radius: 2px;\n\t\tbox-shadow: var(--box-shadow-2);\n\t}\n"},7:function(t,n,e){"use strict";e.r(n);n.default="\n\t.col-left {\n\t\tmin-width: 121px;\n\t\twidth: 100%;\n\t}\n\n\t.col-left ul {\n\t\tfont-size: 1.15em;\n\t}\n\n\t.col-right {\n\t\tmargin-top: 25px;\n\t\tpadding-bottom: 13px;\n\t}\n\n\t.col-right img {\n\t\tmax-width: 100%;\n\t}\n\n\t.col-right > div {\n\t\tpadding-bottom: 13px !important;\n\t}\n\n\t/* > mobile */\n\t@media (min-width: 801px) {\n\t\t.col-left {\n\t\t\tfloat: left;\n\t\t\twidth: 46%;\n\t\t\tmargin-right: 2%;\n\t\t}\n\n\t\t.col-right {\n\t\t\tfloat: right;\n\t\t\twidth: 50%;\n\t\t\tmargin-top: 0;\n\t\t}\n\t}\n\n\t/* tablet */\n\t@media (min-width: 801px) and (max-width: 1265px) {\n\t\t.col-left {\n\t\t\twidth: 100%;\n\t\t\tmargin-bottom: 0;\n\t\t}\n\n\t\t.col-right {\n\t\t\twidth: 100%;\n\t\t\tmargin-top: 25px;\n\t\t}\n\t}\n"},8:function(t,n,e){"use strict";e.r(n);n.default="\n\t:host {\n\t\tposition: relative;\n\t}\n\n\t.big-btn {\n\t\tdisplay: inline-block;\n\t\tmargin: 10px auto;\n\t\tpadding: 9px 14px;\n\t\tborder-radius: 10px;\n\t\tfont-weight: bold;\n\t\tfont-size: 1.2em;\n\t\tbackground: rgba(107, 107, 107, 0.64);\n\t\tbox-shadow: 0 3px 0 rgba(54, 54, 54, 0.94);\n\t\topacity: 1;\n\t\ttransition: all 0.19s;\n\t\tcolor: #ffd866;\n\t}\n\n\t.big-btn:hover,\n\t.big-btn:focus {\n\t\tcolor: #ffd866;\n\t\tbox-shadow: 0 3px 0 #ffd866;\n\t\ttext-shadow: none;\n\t}\n\n\t.big-btn:active {\n\t\tbox-shadow: none !important;\n\t\ttransform: translateY(3px);\n\t}\n\n\t.big-btn span {\n\t\tpadding-right: 10px;\n\t\tvertical-align: -1px;\n\t}\n\n\t.col-left {\n\t\tdisplay: none;\n\t}\n\n\t.col-right {\n\t\tmargin-top: 0;\n\t}\n\n\t.col-right > div {\n\t\topacity: 1;\n\t\tvisibility: visible;\n\t\ttransition: 450ms opacity;\n\t\tposition: static;\n\t\twidth: 100%;\n\t\tmargin-bottom: 20px;\n\t}\n\n\t.col-right > div:last-child {\n\t\tmargin-bottom: 100px;\n\t}\n\n\t.col-right > div.fade-in {\n\t\topacity: 1 !important;\n\t\tvisibility: visible !important;\n\t\ttransition: 300ms opacity;\n\t}\n\n\t#div-default {\n\t\tdisplay: none;\n\t}\n\n\t/* > mobile */\n\t@media (min-width: 801px) {\n\t\tul {\n\t\t\tlist-style-type: inherit;\n\t\t\tpadding-left: 20px;\n\t\t}\n\n\t\t.col-left {\n\t\t\tdisplay: block;\n\t\t}\n\n\t\t.col-right > div {\n\t\t\topacity: 0;\n\t\t\tvisibility: hidden;\n\t\t\twidth: 44%;\n\t\t\tposition: absolute;\n\t\t\tmax-width: 728px;\n\t\t}\n\n\t\t.col-right > div:last-child {\n\t\t\tmargin-bottom: 20px;\n\t\t}\n\n\t\t#div-default {\n\t\t\tdisplay: block;\n\t\t}\n\t}\n\n\t/* tablet */\n\t@media (min-width: 801px) and (max-width: 1265px) {\n\t\t.col-right {\n\t\t\tmargin-top: 25px;\n\t\t}\n\n\t\t.col-right > div {\n\t\t\twidth: 100%;\n\t\t\tmax-width: 490px;\n\t\t}\n\t}\n"}}]);