class ListCarousel {
	constructor(list, doc) {
		let id,
			active = 'default',
			links = Array.from(list.querySelectorAll('a'));

		doc = doc ? doc : document;

		links.forEach(link => {
			link.addEventListener('click', e => {
				id = e.target.id;

				if(id && active !== id) {
					e.preventDefault();

					doc.querySelector(`#div-${active}`).classList.remove('fade-in');
					doc.querySelector(`#div-${id}`).classList.add('fade-in');

					active = id;
				}
			});
		});
	}
}

export default ListCarousel;