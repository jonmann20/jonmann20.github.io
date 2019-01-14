'use strict'; // eslint-disable-line
/* eslint no-unused-vars: ["error", {"varsIgnorePattern": "ListCarousel"}] */

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJsaXN0Q2Fyb3VzZWwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbi8qIGVzbGludCBuby11bnVzZWQtdmFyczogW1wiZXJyb3JcIiwge1widmFyc0lnbm9yZVBhdHRlcm5cIjogXCJMaXN0Q2Fyb3VzZWxcIn1dICovXHJcblxyXG5jbGFzcyBMaXN0Q2Fyb3VzZWwge1xyXG5cdGNvbnN0cnVjdG9yKGxpc3QsIGRvYykge1xyXG5cdFx0bGV0IGlkLFxyXG5cdFx0XHRhY3RpdmUgPSAnZGVmYXVsdCcsXHJcblx0XHRcdGxpbmtzID0gQXJyYXkuZnJvbShsaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKSk7XHJcblxyXG5cdFx0ZG9jID0gZG9jID8gZG9jIDogZG9jdW1lbnQ7XHJcblxyXG5cdFx0bGlua3MuZm9yRWFjaChsaW5rID0+IHtcclxuXHRcdFx0bGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xyXG5cdFx0XHRcdGlkID0gZS50YXJnZXQuaWQ7XHJcblxyXG5cdFx0XHRcdGlmKGlkICYmIGFjdGl2ZSAhPT0gaWQpIHtcclxuXHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdFx0XHRkb2MucXVlcnlTZWxlY3RvcihgI2Rpdi0ke2FjdGl2ZX1gKS5jbGFzc0xpc3QucmVtb3ZlKCdmYWRlLWluJyk7XHJcblx0XHRcdFx0XHRkb2MucXVlcnlTZWxlY3RvcihgI2Rpdi0ke2lkfWApLmNsYXNzTGlzdC5hZGQoJ2ZhZGUtaW4nKTtcclxuXHJcblx0XHRcdFx0XHRhY3RpdmUgPSBpZDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59Il0sImZpbGUiOiJsaXN0Q2Fyb3VzZWwuanMifQ==
