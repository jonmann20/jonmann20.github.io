'use strict';

class GamesController {
	index() {
		jw.Router.grab('/games/index.html', data => {
			jw.Router.swap(data);
			
			jw.Util.require('/assets/list-carousel.js', () => {
				new ListCarousel(document.querySelector('.colL ul'));
			});
		});

		document.title = 'Games';
		document.body.classList.add('absHover', 'games');
	}
}

jw.GamesController = new GamesController();