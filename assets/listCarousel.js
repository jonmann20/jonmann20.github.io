'use strict'; // eslint-disable-line
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJsaXN0Q2Fyb3VzZWwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbi8qIGVzbGludCBuby11bnVzZWQtdmFyczogW1wiZXJyb3JcIiwge1widmFyc0lnbm9yZVBhdHRlcm5cIjogXCJMaXN0Q2Fyb3VzZWxcIn1dICovXHJcblxyXG5jbGFzcyBMaXN0Q2Fyb3VzZWwge1xyXG5cdGNvbnN0cnVjdG9yKGxpc3QpIHtcclxuXHRcdGxldCBpZCxcclxuXHRcdFx0YWN0aXZlID0gJ2RlZmF1bHQnLFxyXG5cdFx0XHRsaW5rcyA9IEFycmF5LmZyb20obGlzdC5xdWVyeVNlbGVjdG9yQWxsKCdhJykpO1xyXG5cclxuXHRcdGxpbmtzLmZvckVhY2gobGluayA9PiB7XHJcblx0XHRcdGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcclxuXHRcdFx0XHRpZCA9IGUudGFyZ2V0LmlkO1xyXG5cclxuXHRcdFx0XHRpZihpZCAmJiBhY3RpdmUgIT09IGlkKSB7XHJcblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0XHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2Rpdi0ke2FjdGl2ZX1gKS5jbGFzc0xpc3QucmVtb3ZlKCdmYWRlLWluJyk7XHJcblx0XHRcdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZGl2LSR7aWR9YCkuY2xhc3NMaXN0LmFkZCgnZmFkZS1pbicpO1xyXG5cclxuXHRcdFx0XHRcdGFjdGl2ZSA9IGlkO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9XHJcbn0iXSwiZmlsZSI6Imxpc3RDYXJvdXNlbC5qcyJ9
