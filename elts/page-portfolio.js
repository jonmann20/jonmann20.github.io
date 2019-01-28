import {html, LitElement} from 'lit-element';
import baseStyles from './styles/base';
import pageStyles from './styles/page';
import carouselStyles from './styles/carousel';
import ListCarousel from '../js/listCarousel';

class PagePortfolio extends LitElement {
	constructor() {
		super();
		document.title = 'Portfolio';
	}

	firstUpdated() {
		new ListCarousel(this.shadowRoot.querySelector('.col-left ul'), this.shadowRoot);
	}

	render() {
		return html`
			<style>
				${baseStyles}
				${pageStyles}
				${carouselStyles}

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
		`;
	}
}

customElements.define('page-portfolio', PagePortfolio);