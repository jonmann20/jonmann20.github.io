(window.webpackJsonp=window.webpackJsonp||[]).push([[13,4,5,6],{11:function(e,t,i){"use strict";i.r(t);var a=i(23);let o;t.default=Object(a.b)(o||(o=(e=>e)`
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
`))},12:function(e,t,i){"use strict";i.r(t);var a=i(23);let o;t.default=Object(a.b)(o||(o=(e=>e)`
	.col-left ul {
		font-size: 1.15em;
	}

	.col-right {
		margin-top: 25px;
		padding-bottom: 13px;
	}

	.col-right img {
		max-width: 100%;
	}

	.col-right > div {
		padding-bottom: 13px !important;
	}

	/* > mobile */
	@media (min-width: 801px) {
		.col-left {
			float: left;
			width: 46%;
			margin-right: 2%;
		}

		.col-right {
			float: right;
			width: 50%;
			margin-top: 0;
		}
	}

	/* tablet */
	@media (min-width: 801px) and (max-width: 1265px) {
		.col-left {
			width: 100%;
			margin-bottom: 0;
		}

		.col-right {
			width: 100%;
			margin-top: 25px;
		}
	}
`))},14:function(e,t,i){"use strict";i.r(t);var a=i(23);let o;t.default=Object(a.b)(o||(o=(e=>e)`
	:host {
		position: relative;
	}

	.big-btn {
		display: inline-block;
		margin: 10px auto;
		padding: 9px 14px;
		border-radius: 10px;
		font-weight: bold;
		font-size: 1.2em;
		background: rgba(107, 107, 107, 0.64);
		box-shadow: 0 3px 0 rgba(54, 54, 54, 0.94);
		opacity: 1;
		transition: all 0.19s;
		color: var(--yellow);
	}

	.big-btn:hover,
	.big-btn:focus {
		color: var(--yellow);
		box-shadow: 0 3px 0 var(--yellow);
		text-shadow: none;
	}

	.big-btn:active {
		box-shadow: none !important;
		transform: translateY(3px);
	}

	.big-btn span {
		padding-right: 10px;
		vertical-align: -1px;
	}

	.col-left {
		display: none;
	}

	.col-right {
		margin-top: 0;
	}

	.col-right > div {
		opacity: 1;
		visibility: visible;
		transition: 450ms opacity;
		position: static;
		width: 100%;
		margin-bottom: 20px;
	}

	.col-right > div:last-child {
		margin-bottom: 100px;
	}

	.col-right > div.fade-in {
		opacity: 1 !important;
		visibility: visible !important;
		transition: 300ms opacity;
	}

	#div-default {
		display: none;
	}

	/* > mobile */
	@media (min-width: 801px) {
		ul {
			list-style-type: inherit;
			padding-left: 20px;
		}

		.col-left {
			display: block;
		}

		.col-right > div {
			opacity: 0;
			visibility: hidden;
			width: 44%;
			position: absolute;
			max-width: 728px;
		}

		.col-right > div:last-child {
			margin-bottom: 20px;
		}

		#div-default {
			display: block;
		}
	}

	/* tablet */
	@media (min-width: 801px) and (max-width: 1265px) {
		.col-right {
			margin-top: 25px;
		}

		.col-right > div {
			width: 100%;
			max-width: 490px;
		}
	}
`))},20:function(e,t,i){"use strict";i.r(t);var a=i(23),o=i(11),n=i(12),r=i(14),l=i(25);let p,s,c=e=>e;class d extends a.a{constructor(){super(),document.title="Portfolio"}firstUpdated(){new l.a(this.shadowRoot.querySelector(".col-left ul"),this.shadowRoot)}render(){return Object(a.c)(p||(p=c`
			<div class="col-left card">
				<h1>Porfolio</h1>
				<p>
					I currently work as a fullstack web engineer in the healthcare and machine learning industry.
				</p>
				<p>
					I am a former computer science student at the <a href="https://www.eecs.umich.edu" target="_blank" rel="noopener">University of Michigan &mdash; College of Engineering</a>.
				</p>
				<p>
					My main interest in computer science is in UI/UX and highly performant web development.
					I am also an avid CrossFitter, Rocket League&reg; player, indoor soccer player, and musician.
				</p>

				<ul>
					<li><a id="endpoint">Endpoint Health</a></li>
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
				<div id="div-endpoint" class="card">
					<h2>Endpoint Health</h2>
					<p>
						This is my current job as a senior engineer.  Here I work on a suite of software products interacting with EHR systems and providing a dashboard for research and development in machine learning on urgent clinical issues.
					</p>
					<p>
						Project technologies are centered around a Docker/Kubernetes based microservice architecture with Python and AWS.
					</p>

					<a href="https://endpointhealth.com" class="big-btn" target="_blank" rel="noopener">
						Visit endpointhealth.com <i-con name="openInNew" class="open-in-new"></i-con>
					</a>

					<p><img src="/img/portfolio/eph-logo.png" alt="Endpoint Health logo"></p>
				</div>
				<div id="div-wellopp" class="card">
					<h2>Wellopp</h2>
					<p>
						A former job as CIO.  Here I was an early employee (#3) and had the opportunity and priveledge to lead the engineering team delivering stable and scalable solutions for the Healthcare industry.  Wellopp is the trade name of Homeward Health, LLC.
					</p>
					<p>
						Project technologies are centered around a Docker based service architecture with ~~Polymer~~ LitElement, Node, and Ruby on Rails.
					</p>

					<a href="https://wellopp.com" class="big-btn" target="_blank" rel="noopener">
						Visit wellopp.com <i-con name="openInNew" class="open-in-new"></i-con>
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
						Visit perficient.com <i-con name="openInNew" class="open-in-new"></i-con>
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
						Visit picocal.com <i-con name="openInNew" class="open-in-new"></i-con>
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
						Visit @Nologydigital <i-con name="openInNew" class="open-in-new"></i-con>
					</a>

					<img src="/img/portfolio/nology.jpg" alt="Nology Digital">
				</div>
			</div>
		`))}}var h,g,m;h=d,g="styles",m=[o.default,n.default,r.default,Object(a.b)(s||(s=c`
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
		`))],g in h?Object.defineProperty(h,g,{value:m,enumerable:!0,configurable:!0,writable:!0}):h[g]=m,customElements.define("page-portfolio",d)},25:function(e,t,i){"use strict";t.a=class{constructor(e,t){let i,a="default",o=Array.from(e.querySelectorAll("a"));t=t||document,o.forEach(e=>{e.addEventListener("click",e=>{i=e.target.id,i&&a!==i&&(e.preventDefault(),t.querySelector("#div-"+a).classList.remove("fade-in"),t.querySelector("#div-"+i).classList.add("fade-in"),a=i)})})}}}}]);