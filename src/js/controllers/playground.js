'use strict'; // eslint-disable-line
/* eslint no-unused-vars: ["error", {"varsIgnorePattern": "PlaygroundController"}] */

class PlaygroundController {
	static openNav() {
		let pNav = document.querySelector('.hdr-nav2 .playground-nav-wrap');
		if(!pNav.classList.contains('visible')) {
			pNav.classList.add('visible');
		}
	}

	static index() {
		PlaygroundController.openNav();
		Router.load('/playground/index.html');

		document.title = 'Playground';
		Util.addMeta('description', 'An playground area for web tech demos.');
		Util.addMeta('keywords', 'canvas, html5');
		document.body.classList.add('playground', 'playInner');
	}

	static ballPit() {
		PlaygroundController.openNav();

		Promise.all([
			Router.load('/playground/ball-pit.html'),
			Util.require('/assets/ballPit.js')
		]).then(() => {
			window.ballPit = new BallPit();
		});

		document.title = 'Ball Pit | Playground';
		Util.addMeta('description', 'A canvas example showcasing a ball pit.');
		Util.addMeta('keywords', 'canvas, html5');
		document.body.classList.add('playground', 'playInner', 'nav3');
	}

	static starryBackground() {
		PlaygroundController.openNav();

		Promise.all([
			Router.load('/playground/stars.html'),
			Util.require('/assets/stars.js')
		]).then(() => {
			window.starryBg = new StarryBg();
		});

		document.title = 'Starry Background | Playground';
		Util.addMeta('description', 'A canvas example showcasing a starry background.');
		Util.addMeta('keywords', 'canvas, html5');
		document.body.classList.add('playground', 'playInner', 'nav2');
	}

	static breakdancingCube() {
		PlaygroundController.openNav();
		Router.load('/playground/breakdancing-cube.html');

		document.title = 'Breakdancing Cube | Playground';
		Util.addMeta('description', 'Pure CSS3 animation demo.');
		Util.addMeta('keywords', 'CSS3, HTML5');
		document.body.classList.add('playground', 'playInner', 'nav1');
	}
}