'use strict';

class ListCarousel {
	constructor(list) {
		let id,
			active = 'default',
			span = document.createElement('span'),
			links = Array.from(list.querySelectorAll('a'));

		span.classList.add('icon-link');
		span.style.paddingLeft = '3px';

		links.forEach(link => {
			link.addEventListener('click', e => {
				id = e.target.id;

				if(id && active !== id) {
					e.preventDefault();

					link.appendChild(span);

					document.querySelector(`#div-${active}`).classList.remove('fade-in');
					document.querySelector(`#div-${id}`).classList.add('fade-in');

					active = id;
				}
			});
		});
	}
}