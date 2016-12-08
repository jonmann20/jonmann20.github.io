'use strict';

class PortfolioController {
	index() {
		const p0 = router.load('/portfolio/index.html');
		const p1 = util.require('/assets/listCarousel.js');
		Promise.all([p0, p1]).then(() => {
			new ListCarousel(document.querySelector('.col-left ul'));
		});

		document.title = 'Portfolio';
		document.body.classList.add('portfolio', 'carousel-list-page');
	}
}

window.portfolioController = new PortfolioController();