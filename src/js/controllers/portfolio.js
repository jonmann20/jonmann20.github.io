'use strict';

class PortfolioController {
	index() {
		Promise.all([
			router.load('/portfolio/index.html'),
			util.require('/assets/listCarousel.js')
		]).then(() =>
			new ListCarousel(document.querySelector('.col-left ul'))
		);

		document.title = 'Portfolio';
		document.body.classList.add('portfolio', 'carousel-list-page');
	}
}

window.portfolioController = new PortfolioController();