'use strict';

class GamesController {
	index() {
		jw.Router.load('/games/index.html', succeeded => {
			jw.Util.require('/assets/listCarousel.js', () => {
				new ListCarousel(document.querySelector('.colL ul'));
			});
		});

		document.title = 'Games';
		document.body.classList.add('games', 'carousel-list-page');
	}
}

jw.GamesController = new GamesController();