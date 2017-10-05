'use strict';

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJsaXN0Q2Fyb3VzZWwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBMaXN0Q2Fyb3VzZWwge1xuXHRjb25zdHJ1Y3RvcihsaXN0KSB7XG5cdFx0bGV0IGlkLFxuXHRcdFx0YWN0aXZlID0gJ2RlZmF1bHQnLFxuXHRcdFx0b3BlbkluTmV3ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaXJvbi1pY29uJyksXG5cdFx0XHRsaW5rcyA9IEFycmF5LmZyb20obGlzdC5xdWVyeVNlbGVjdG9yQWxsKCdhJykpO1xuXG5cdFx0b3BlbkluTmV3LnNldEF0dHJpYnV0ZSgnaWNvbicsICdpY29uczpvcGVuLWluLW5ldycpO1xuXHRcdG9wZW5Jbk5ldy5zdHlsZS5tYXJnaW5MZWZ0ID0gJzNweCc7XG5cdFx0b3BlbkluTmV3LnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAnLTRweCc7XG5cdFx0b3BlbkluTmV3LnN0eWxlLndpZHRoID0gJzIwcHgnO1xuXHRcdG9wZW5Jbk5ldy5zdHlsZS5oZWlnaHQgPSAnMjBweCc7XG5cblx0XHRsaW5rcy5mb3JFYWNoKGxpbmsgPT4ge1xuXHRcdFx0bGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuXHRcdFx0XHRpZCA9IGUudGFyZ2V0LmlkO1xuXG5cdFx0XHRcdGlmKGlkICYmIGFjdGl2ZSAhPT0gaWQpIHtcblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdFx0XHRsaW5rLmFwcGVuZENoaWxkKG9wZW5Jbk5ldyk7XG5cblx0XHRcdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZGl2LSR7YWN0aXZlfWApLmNsYXNzTGlzdC5yZW1vdmUoJ2ZhZGUtaW4nKTtcblx0XHRcdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZGl2LSR7aWR9YCkuY2xhc3NMaXN0LmFkZCgnZmFkZS1pbicpO1xuXG5cdFx0XHRcdFx0YWN0aXZlID0gaWQ7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG59Il0sImZpbGUiOiJsaXN0Q2Fyb3VzZWwuanMifQ==
