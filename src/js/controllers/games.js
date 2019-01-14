'use strict'; // eslint-disable-line
/* eslint no-unused-vars: ["error", {"varsIgnorePattern": "GamesController"}] */

class GamesController {
	static index() {
		Promise.all([
			Router.load('/games/index.html'),
			Util.require('/assets/listCarousel.js')
		]).then(() =>
			new ListCarousel(document.querySelector('.col-left ul'))
		);

		document.title = 'Games';
		document.body.classList.add('games', 'carousel-list-page');
	}
}