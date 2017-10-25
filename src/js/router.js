'use strict';
/* eslint no-unused-vars: ["error", {"varsIgnorePattern": "Router"}] */

class Router {
	constructor() {
		this.main = document.querySelector('main');
		window.onhashchange = () => this.route(location.hash);
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
			case '#playground/ball-pit':
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

	async load(url) {
		const response = await fetch(url);
		if(response.ok) {
			this.main.innerHTML = await response.text();
		}
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
		this.main.innerHTML = '';
		document.body.className = '';
		document.title = '';
		this.rmMeta('meta[name=description]');
		this.rmMeta('meta[name=keywords]');

		dispatchEvent(new CustomEvent('route', {detail: slug}));
	}
}