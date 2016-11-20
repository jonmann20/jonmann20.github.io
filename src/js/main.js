'use strict';

class Main {
	constructor() {
		// Setup Passive Listeners
		window.pListen = false;
		try {
			const opts = Object.defineProperty({}, 'passive', {
				get: () => {
					pListen = true;
				}
			});

			addEventListener('test', null, opts);
		}
		catch(e) {}

		// Start Router
		jw.Router = new Router();
		jw.Router.run();

		// Handle Leftbar
		let hasClass = false;
		function hide() {
			document.querySelector('aside').classList.remove('active');
			hasClass = false;
			document.body.removeEventListener('click', hide, pListen ? {passive: true} : false);
		}

		document.querySelector('.menu').addEventListener('click', e => {
			e.preventDefault();

			if(!hasClass) {
				document.querySelector('aside').classList.add('active');
				hasClass = true;
				setTimeout(() => {
					document.body.addEventListener('click', hide, pListen ? {passive: true} : false);
				}, 0);
			}
			else {
				hide();
			}
		});
	}
}

document.addEventListener('DOMContentLoaded', new Main());