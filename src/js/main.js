'use strict';

class Main {
	constructor() {
		jw.Router = new Router();
		jw.Router.run();

		document.querySelector('header a').addEventListener('click', () => {
			document.querySelector('.main').style.height = 'auto';
		});

		let hasClass = false;
		function hide() {
			document.querySelector('aside').classList.remove('active');
			hasClass = false;
			document.body.removeEventListener('click', hide);
		}

		document.querySelector('.menu').addEventListener('click', e => {
			e.preventDefault();

			if(!hasClass) {
				document.querySelector('aside').classList.add('active');
				hasClass = true;
				setTimeout(() => {
					document.body.addEventListener('click', hide)
				}, 0);
			}
			else {
				hide();
			}
		});
	}
}

document.addEventListener('DOMContentLoaded', () => {
	jw.Main = new Main();
});