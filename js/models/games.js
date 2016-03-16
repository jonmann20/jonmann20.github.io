'use strict';

jw.GamesModel = (() => {
	return {
		render: (that, page) => {
			jw.Utils.resetModel();

			if(page === 'index') {
				that.load('/games/index.html', data => {
					jw.Utils.require('/js/plugins/jquery.listCarousel.js', () => {
						$('ul').listCarousel();
					});
				}).swap(() => {
					setTimeout(() => {
						jw.Main.fixColRHeight($('#divDefault').height());
					}, 10);
				});

				document.title = 'Games';
				jw.body.addClass('absHover games');
			}
		}
	};
})();
