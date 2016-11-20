'use strict';

class PortfolioController {
	index() {
		jw.Router.grab('/portfolio/index.html', data => {
			jw.Router.swap(data);
			
			jw.Util.require('/assets/list-carousel.js', () => {
				new ListCarousel(document.querySelector('.colL ul'));
			});
		});

		document.title = 'Portfolio';
		document.body.classList.add('portfolio', 'absHover');
	}
}

jw.PortfolioController = new PortfolioController();