class ListCarousel {
	constructor(list) {
		let active = 'default';
		
		let span = document.createElement('span');
		span.classList.add('icon-link');
		span.style.paddingLeft = '3px';
		
		let id, links = list.querySelectorAll('a');
		links.forEach(link => {
			link.addEventListener('click', e => {
				id = e.target.id;
				
				if(active !== id && id) {
					e.preventDefault();
					
					link.appendChild(span);
					
					document.querySelector(`#div${this.capitalize(active)}`)
						.classList.remove('fade-in');
					
					document.querySelector(`#div${this.capitalize(id)}`)
						.classList.add('fade-in');
					
					active = id;
				}
			});
		});
	}
	
	capitalize(s) {
		return s.replace(/(?:^|\s)\S/g, a => {
			return a.toUpperCase();
		});
	}
}