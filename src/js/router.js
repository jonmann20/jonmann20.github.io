'use strict';

class Router {
	constructor() {
		this.root = document.querySelector('main');
		onhashchange = (e) => this.route(location.hash);
	}

	route(slug) {
		this.resetController(slug);

		switch(slug) {
			case '#about':
				aboutController.index();
				break;
			case '#games':
				gamesController.index();
				break;
			case '#portfolio':
				portfolioController.index();
				break;
			case '#playground':
				playgroundController.index();
				break;
			case '#playground/ballPit':
				playgroundController.ballPit();
				break;
			case '#playground/breakdancing-cube':
				playgroundController.breakdancingCube();
				break;
			case '#playground/starry-background':
				playgroundController.starryBackground();
				break;
			case '#home':
				/* falls through */
			default:
				homeController.index();
				break;
		}
	}

	load(url, callback) {
		// TODO: use Fetch API, (not working with cloud9 cors)
		// console.log('fetching', url);
		// fetch(url, {mode: 'cors'}).then(data => {
		// 	console.log(data);
		// });

		return new Promise((resolve, reject) => {
			let dis = this;

			let r = new XMLHttpRequest();
			r.onreadystatechange = function() {
				if(this.readyState === 4) {
					if(this.status === 200) {
						// swap page
						dis.root.innerHTML = this.responseText;
						resolve();
					}
					else {
						reject();
					}
				}
			};
			r.open('GET', url, true);
			r.send();
		});
	}

	run() {
		this.route(location.hash);
	}

	rmMeta(query) {
		const tag = document.head.querySelector(query);
		if(tag) {
			document.head.removeChild(tag);
		}
	}

	resetController(slug) {
		scrollTo(0, 0);
		this.root.innerHTML = '';
		document.body.className = '';
		document.title = '';
		this.rmMeta('meta[name=description]');
		this.rmMeta('meta[name=keywords]');

		dispatchEvent(new CustomEvent('route', {detail: slug}));
	}
}