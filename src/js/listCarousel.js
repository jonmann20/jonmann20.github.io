'use strict';
/* eslint no-unused-vars: ["error", {"varsIgnorePattern": "ListCarousel"}] */

class ListCarousel {
	constructor(list) {
		let id,
			active = 'default',
			links = Array.from(list.querySelectorAll('a'));

		links.forEach(link => {
			link.addEventListener('click', e => {
				id = e.target.id;

				if(id && active !== id) {
					e.preventDefault();

					document.querySelector(`#div-${active}`).classList.remove('fade-in');
					document.querySelector(`#div-${id}`).classList.add('fade-in');

					active = id;
				}
			});
		});
	}
}