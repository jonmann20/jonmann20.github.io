'use strict';

class GamesController {
	index() {
		const p0 = router.load('/games/index.html');
		const p1 = util.require('/assets/listCarousel.js');
		Promise.all([p0, p1]).then(() => {
			new ListCarousel(document.querySelector('.col-left ul'));
		});

		document.title = 'Games';
		document.body.classList.add('games', 'carousel-list-page');
	}
}

window.gamesController = new GamesController();