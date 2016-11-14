'use strict';

class PortfolioModel {
	render(that, page) {
		jw.Util.resetModel();

		if(page === 'index') {
			that.load('/portfolio/index.html', data => {
				jw.Util.require('/js/plugins/jquery.listCarousel.js', () =>
					$('ul').listCarousel()
				);
			}).swap();

			document.title = 'Portfolio';
			document.body.classList.add('portfolio', 'absHover');
		}
	}
}

jw.PortfolioModel = new PortfolioModel();