'use strict';

class PortfolioController {
	index() {
		jw.Router.load('/portfolio/index.html', succeeded => {
			jw.Util.require('/assets/listCarousel.js', () => {
				new ListCarousel(document.querySelector('.col-left ul'));
			});
		});

		document.title = 'Portfolio';
		document.body.classList.add('portfolio', 'carousel-list-page');
	}
}

jw.PortfolioController = new PortfolioController();