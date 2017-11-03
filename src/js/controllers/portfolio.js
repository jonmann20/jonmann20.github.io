'use strict';
/* eslint no-unused-vars: ["error", {"varsIgnorePattern": "PortfolioController"}] */

class PortfolioController {
	static index() {
		Promise.all([
			Router.load('/portfolio/index.html'),
			Util.require('/assets/listCarousel.js')
		]).then(() =>
			new ListCarousel(document.querySelector('.col-left ul'))
		);

		document.title = 'Portfolio';
		document.body.classList.add('portfolio', 'carousel-list-page');
	}
}