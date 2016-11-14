'use strict';

class GamesModel {
	render(that, page) {
		jw.Util.resetModel();

		if(page === 'index') {
			that.load('/games/index.html', data => {
				jw.Util.require('/js/plugins/jquery.listCarousel.js', () =>
					$('ul').listCarousel()
				);
			}).swap(() => {
				setTimeout(() => {
					jw.Main.fixColRHeight($('#divDefault').height());
				}, 10);
			});

			document.title = 'Games';
			document.body.classList.add('absHover', 'games');
		}
	}
}

jw.GamesModel = new GamesModel();