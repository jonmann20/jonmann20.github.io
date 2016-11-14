'use strict';

jw.PortfolioModel = (function() {
	return {
		render: function (that, page) {
			jw.Util.resetModel();

			if (page === 'index') {
				that.load('/portfolio/index.html', function (data) {
					jw.Util.require('/js/plugins/jquery.listCarousel.js', function () {
						$('ul').listCarousel();
					});
				}).swap();

				document.title = 'Portfolio';
				document.body.classList.add('portfolio', 'absHover');
			}
		}
	};
})();