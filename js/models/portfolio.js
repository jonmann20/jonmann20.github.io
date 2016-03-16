'use strict';

jw.PortfolioModel = (function() {
	return {
		render: function (that, page) {
			jw.Utils.resetModel();

			if (page === 'index') {
				that.load('/portfolio/index.html', function (data) {
					jw.Utils.require('/js/plugins/jquery.listCarousel.js', function () {
						$('ul').listCarousel();
					});
				}).swap();

				document.title = 'Portfolio';
				jw.body.addClass('portfolio absHover');
			}
		}
	};
})();
