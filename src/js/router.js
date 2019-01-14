'use strict'; // eslint-disable-line
/* eslint no-unused-vars: ["error", {"varsIgnorePattern": "Router"}] */

class Router {
	static route(slug) {
		Router.resetController(slug);

		switch(slug) {
			case '#games':
				GamesController.index();
				break;
			case '#portfolio':
				PortfolioController.index();
				break;
			case '#playground':
				PlaygroundController.index();
				break;
			case '#playground/ball-pit':
				PlaygroundController.ballPit();
				break;
			case '#playground/breakdancing-cube':
				PlaygroundController.breakdancingCube();
				break;
			case '#playground/starry-background':
				PlaygroundController.starryBackground();
				break;
			case '#home':
				/* falls through */
			default:
				this.loadComponent('page-home');
				break;
		}
	}

	static async load(url) {
		const response = await fetch(url);
		if(response.ok) {
			document.querySelector('main').innerHTML = await response.text();
		}
	}

	static async loadComponent(name) {
		if(await this.componentsReady()) {
			if(await import(`../elts/${name}.js`)) {
				document.querySelector('main').innerHTML = `<${name}></${name}>`;
			}
		}
	}

	static async componentsReady() {
		if(window.componentsReady) {
			return await Promise.resolve(true);
		}
		else {
			return new Promise(resolve => document.addEventListener('WebComponentsReady', resolve, {once: true}));
		}
	}

	static run() {
		Router.route(location.hash);
	}

	static rmMeta(query) {
		const tag = document.head.querySelector(query);
		if(tag) {
			document.head.removeChild(tag);
		}
	}

	static resetController(slug) {
		scrollTo(0, 0);
		document.querySelector('main').innerHTML = '';
		document.body.className = '';
		document.title = '';
		Router.rmMeta('meta[name=description]');
		Router.rmMeta('meta[name=keywords]');

		dispatchEvent(new CustomEvent('route', {detail: slug}));
	}
}

window.onhashchange = () => Router.route(location.hash);