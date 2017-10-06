'use strict';
/* eslint no-unused-vars: ["error", {"varsIgnorePattern": "ListCarousel"}] */

class ListCarousel {
	constructor(list) {
		let id,
			active = 'default',
			openInNew = document.createElement('iron-icon'),
			links = Array.from(list.querySelectorAll('a'));

		openInNew.setAttribute('icon', 'icons:open-in-new');
		openInNew.style.marginLeft = '3px';
		openInNew.style.verticalAlign = '-4px';
		openInNew.style.width = '20px';
		openInNew.style.height = '20px';

		links.forEach(link => {
			link.addEventListener('click', e => {
				id = e.target.id;

				if(id && active !== id) {
					e.preventDefault();

					link.appendChild(openInNew);

					document.querySelector(`#div-${active}`).classList.remove('fade-in');
					document.querySelector(`#div-${id}`).classList.add('fade-in');

					active = id;
				}
			});
		});
	}
}