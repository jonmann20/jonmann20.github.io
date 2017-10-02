'use strict';

class GamesController {
	index() {
		Promise.all([
			router.load('/games/index.html'),
			util.require('/assets/listCarousel.js')
		]).then(() =>
			new ListCarousel(document.querySelector('.col-left ul'))
		);

		document.title = 'Games';
		document.body.classList.add('games', 'carousel-list-page');
	}
}

window.gamesController = new GamesController();