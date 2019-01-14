'use strict'; // eslint-disable-line
/* eslint no-unused-vars: ["error", {"varsIgnorePattern": "Util"}] */

class Util {
	static require(src) {
		return new Promise((resolve, reject) => {
			if(!Util.constructor._jsSrc.includes(src)) {
				let script = document.createElement('script');
				script.src = src;
				script.async = 1;

				document.head.appendChild(script);

				script.onload = () => {
					Util.constructor._jsSrc.push(src);
					resolve();
				};

				script.onerror = () => reject();
			}
			else {
				resolve();
			}
		});
	}

	static addMeta(name, content) {
		let meta = document.createElement('meta');
		meta.setAttribute('name', name);
		meta.setAttribute('content', content);
		document.head.appendChild(meta);
	}

	static get getMainWidth() {
		const main = document.querySelector('main');
		const mainStyles = window.getComputedStyle(main, null);
		const paddingLeft = parseFloat(mainStyles.getPropertyValue('padding-left'));
		return main.getBoundingClientRect().width - paddingLeft;
	}
}
Util.constructor._jsSrc = [];
'use strict'; // eslint-disable-line
/* eslint no-unused-vars: ["error", {"varsIgnorePattern": "GamesController"}] */

class GamesController {
	static index() {
		Promise.all([
			Router.load('/games/index.html'),
			Util.require('/assets/listCarousel.js')
		]).then(() =>
			new ListCarousel(document.querySelector('.col-left ul'))
		);

		document.title = 'Games';
		document.body.classList.add('games', 'carousel-list-page');
	}
}
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
'use strict'; // eslint-disable-line
/* eslint no-unused-vars: ["error", {"varsIgnorePattern": "PortfolioController"}] */

class PortfolioController {
	static index() {
		Promise.all([
			Router.load('/portfolio/index.html'),
			Util.require('/assets/listCarousel.js')
		]).then(() =>
			new ListCarousel(document.querySelector('.col-left ul'))
		);

		document.title = 'Portfolio';
		document.body.classList.add('portfolio', 'carousel-list-page');
	}
}
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
'use strict'; // eslint-disable-line

(() => {
	// Start Router
	Router.run();

	// Handle Leftbar
	let hasClass = false;
	let initX, x;
	function hide(e) {
		if(e && e.type === 'touchend' && initX === x) {
			return;
		}

		document.querySelector('aside').classList.remove('active');
		document.querySelector('main').classList.remove('leftbar-active');
		hasClass = false;
		document.body.removeEventListener('click', hide, {passive: true});
		document.body.removeEventListener('touchstart', setInitX, {passive: true});
		document.body.removeEventListener('touchmove', setX, {passive: true});
		document.body.removeEventListener('touchend', hide, {passive: true});
	}

	function setInitX(e) {
		initX = e.touches[0].pageX;
		x = initX;
	}

	function setX(e) {
		x = e.touches[0].pageX;
	}

	window.onresize = () => {
		if(window.innerWidth > 800) {
			hide();
		}
	};

	document.querySelector('.menu').addEventListener('click', e => {
		e.preventDefault();

		if(!hasClass) {
			document.querySelector('aside').classList.add('active');
			document.querySelector('main').classList.add('leftbar-active');
			hasClass = true;
			requestAnimationFrame(() => {
				document.body.addEventListener('click', hide, {passive: true});
				document.body.addEventListener('touchstart', setInitX, {passive: true});
				document.body.addEventListener('touchmove', setX, {passive: true});
				document.body.addEventListener('touchend', hide, {passive: true});
			});
		}
		else {
			hide();
		}
	});

	addEventListener('route', () => {
		// if page is not playground inner
		const h = window.location.hash;
		if(typeof(h) === 'undefined' || h.startsWith('#playground') !== 0) {
			let pNav = document.querySelector('.hdr-nav2 .playground-nav-wrap');
			if(pNav.classList.contains('visible')) {
				pNav.classList.remove('visible');
			}
		}
	}, {passive: true});
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwuanMiLCJnYW1lcy5qcyIsInBsYXlncm91bmQuanMiLCJwb3J0Zm9saW8uanMiLCJyb3V0ZXIuanMiLCJtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1hc3Rlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JzsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4vKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFtcImVycm9yXCIsIHtcInZhcnNJZ25vcmVQYXR0ZXJuXCI6IFwiVXRpbFwifV0gKi9cclxuXHJcbmNsYXNzIFV0aWwge1xyXG5cdHN0YXRpYyByZXF1aXJlKHNyYykge1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0aWYoIVV0aWwuY29uc3RydWN0b3IuX2pzU3JjLmluY2x1ZGVzKHNyYykpIHtcclxuXHRcdFx0XHRsZXQgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XHJcblx0XHRcdFx0c2NyaXB0LnNyYyA9IHNyYztcclxuXHRcdFx0XHRzY3JpcHQuYXN5bmMgPSAxO1xyXG5cclxuXHRcdFx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XHJcblxyXG5cdFx0XHRcdHNjcmlwdC5vbmxvYWQgPSAoKSA9PiB7XHJcblx0XHRcdFx0XHRVdGlsLmNvbnN0cnVjdG9yLl9qc1NyYy5wdXNoKHNyYyk7XHJcblx0XHRcdFx0XHRyZXNvbHZlKCk7XHJcblx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSAoKSA9PiByZWplY3QoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRyZXNvbHZlKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGFkZE1ldGEobmFtZSwgY29udGVudCkge1xyXG5cdFx0bGV0IG1ldGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdtZXRhJyk7XHJcblx0XHRtZXRhLnNldEF0dHJpYnV0ZSgnbmFtZScsIG5hbWUpO1xyXG5cdFx0bWV0YS5zZXRBdHRyaWJ1dGUoJ2NvbnRlbnQnLCBjb250ZW50KTtcclxuXHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobWV0YSk7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0IGdldE1haW5XaWR0aCgpIHtcclxuXHRcdGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJyk7XHJcblx0XHRjb25zdCBtYWluU3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUobWFpbiwgbnVsbCk7XHJcblx0XHRjb25zdCBwYWRkaW5nTGVmdCA9IHBhcnNlRmxvYXQobWFpblN0eWxlcy5nZXRQcm9wZXJ0eVZhbHVlKCdwYWRkaW5nLWxlZnQnKSk7XHJcblx0XHRyZXR1cm4gbWFpbi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCAtIHBhZGRpbmdMZWZ0O1xyXG5cdH1cclxufVxyXG5VdGlsLmNvbnN0cnVjdG9yLl9qc1NyYyA9IFtdOyIsIid1c2Ugc3RyaWN0JzsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4vKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFtcImVycm9yXCIsIHtcInZhcnNJZ25vcmVQYXR0ZXJuXCI6IFwiR2FtZXNDb250cm9sbGVyXCJ9XSAqL1xyXG5cclxuY2xhc3MgR2FtZXNDb250cm9sbGVyIHtcclxuXHRzdGF0aWMgaW5kZXgoKSB7XHJcblx0XHRQcm9taXNlLmFsbChbXHJcblx0XHRcdFJvdXRlci5sb2FkKCcvZ2FtZXMvaW5kZXguaHRtbCcpLFxyXG5cdFx0XHRVdGlsLnJlcXVpcmUoJy9hc3NldHMvbGlzdENhcm91c2VsLmpzJylcclxuXHRcdF0pLnRoZW4oKCkgPT5cclxuXHRcdFx0bmV3IExpc3RDYXJvdXNlbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29sLWxlZnQgdWwnKSlcclxuXHRcdCk7XHJcblxyXG5cdFx0ZG9jdW1lbnQudGl0bGUgPSAnR2FtZXMnO1xyXG5cdFx0ZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdnYW1lcycsICdjYXJvdXNlbC1saXN0LXBhZ2UnKTtcclxuXHR9XHJcbn0iLCIndXNlIHN0cmljdCc7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBbXCJlcnJvclwiLCB7XCJ2YXJzSWdub3JlUGF0dGVyblwiOiBcIlBsYXlncm91bmRDb250cm9sbGVyXCJ9XSAqL1xyXG5cclxuY2xhc3MgUGxheWdyb3VuZENvbnRyb2xsZXIge1xyXG5cdHN0YXRpYyBvcGVuTmF2KCkge1xyXG5cdFx0bGV0IHBOYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGRyLW5hdjIgLnBsYXlncm91bmQtbmF2LXdyYXAnKTtcclxuXHRcdGlmKCFwTmF2LmNsYXNzTGlzdC5jb250YWlucygndmlzaWJsZScpKSB7XHJcblx0XHRcdHBOYXYuY2xhc3NMaXN0LmFkZCgndmlzaWJsZScpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGluZGV4KCkge1xyXG5cdFx0UGxheWdyb3VuZENvbnRyb2xsZXIub3Blbk5hdigpO1xyXG5cdFx0Um91dGVyLmxvYWQoJy9wbGF5Z3JvdW5kL2luZGV4Lmh0bWwnKTtcclxuXHJcblx0XHRkb2N1bWVudC50aXRsZSA9ICdQbGF5Z3JvdW5kJztcclxuXHRcdFV0aWwuYWRkTWV0YSgnZGVzY3JpcHRpb24nLCAnQW4gcGxheWdyb3VuZCBhcmVhIGZvciB3ZWIgdGVjaCBkZW1vcy4nKTtcclxuXHRcdFV0aWwuYWRkTWV0YSgna2V5d29yZHMnLCAnY2FudmFzLCBodG1sNScpO1xyXG5cdFx0ZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdwbGF5Z3JvdW5kJywgJ3BsYXlJbm5lcicpO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGJhbGxQaXQoKSB7XHJcblx0XHRQbGF5Z3JvdW5kQ29udHJvbGxlci5vcGVuTmF2KCk7XHJcblxyXG5cdFx0UHJvbWlzZS5hbGwoW1xyXG5cdFx0XHRSb3V0ZXIubG9hZCgnL3BsYXlncm91bmQvYmFsbC1waXQuaHRtbCcpLFxyXG5cdFx0XHRVdGlsLnJlcXVpcmUoJy9hc3NldHMvYmFsbFBpdC5qcycpXHJcblx0XHRdKS50aGVuKCgpID0+IHtcclxuXHRcdFx0d2luZG93LmJhbGxQaXQgPSBuZXcgQmFsbFBpdCgpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZG9jdW1lbnQudGl0bGUgPSAnQmFsbCBQaXQgfCBQbGF5Z3JvdW5kJztcclxuXHRcdFV0aWwuYWRkTWV0YSgnZGVzY3JpcHRpb24nLCAnQSBjYW52YXMgZXhhbXBsZSBzaG93Y2FzaW5nIGEgYmFsbCBwaXQuJyk7XHJcblx0XHRVdGlsLmFkZE1ldGEoJ2tleXdvcmRzJywgJ2NhbnZhcywgaHRtbDUnKTtcclxuXHRcdGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgncGxheWdyb3VuZCcsICdwbGF5SW5uZXInLCAnbmF2MycpO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIHN0YXJyeUJhY2tncm91bmQoKSB7XHJcblx0XHRQbGF5Z3JvdW5kQ29udHJvbGxlci5vcGVuTmF2KCk7XHJcblxyXG5cdFx0UHJvbWlzZS5hbGwoW1xyXG5cdFx0XHRSb3V0ZXIubG9hZCgnL3BsYXlncm91bmQvc3RhcnMuaHRtbCcpLFxyXG5cdFx0XHRVdGlsLnJlcXVpcmUoJy9hc3NldHMvc3RhcnMuanMnKVxyXG5cdFx0XSkudGhlbigoKSA9PiB7XHJcblx0XHRcdHdpbmRvdy5zdGFycnlCZyA9IG5ldyBTdGFycnlCZygpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZG9jdW1lbnQudGl0bGUgPSAnU3RhcnJ5IEJhY2tncm91bmQgfCBQbGF5Z3JvdW5kJztcclxuXHRcdFV0aWwuYWRkTWV0YSgnZGVzY3JpcHRpb24nLCAnQSBjYW52YXMgZXhhbXBsZSBzaG93Y2FzaW5nIGEgc3RhcnJ5IGJhY2tncm91bmQuJyk7XHJcblx0XHRVdGlsLmFkZE1ldGEoJ2tleXdvcmRzJywgJ2NhbnZhcywgaHRtbDUnKTtcclxuXHRcdGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgncGxheWdyb3VuZCcsICdwbGF5SW5uZXInLCAnbmF2MicpO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGJyZWFrZGFuY2luZ0N1YmUoKSB7XHJcblx0XHRQbGF5Z3JvdW5kQ29udHJvbGxlci5vcGVuTmF2KCk7XHJcblx0XHRSb3V0ZXIubG9hZCgnL3BsYXlncm91bmQvYnJlYWtkYW5jaW5nLWN1YmUuaHRtbCcpO1xyXG5cclxuXHRcdGRvY3VtZW50LnRpdGxlID0gJ0JyZWFrZGFuY2luZyBDdWJlIHwgUGxheWdyb3VuZCc7XHJcblx0XHRVdGlsLmFkZE1ldGEoJ2Rlc2NyaXB0aW9uJywgJ1B1cmUgQ1NTMyBhbmltYXRpb24gZGVtby4nKTtcclxuXHRcdFV0aWwuYWRkTWV0YSgna2V5d29yZHMnLCAnQ1NTMywgSFRNTDUnKTtcclxuXHRcdGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgncGxheWdyb3VuZCcsICdwbGF5SW5uZXInLCAnbmF2MScpO1xyXG5cdH1cclxufSIsIid1c2Ugc3RyaWN0JzsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4vKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFtcImVycm9yXCIsIHtcInZhcnNJZ25vcmVQYXR0ZXJuXCI6IFwiUG9ydGZvbGlvQ29udHJvbGxlclwifV0gKi9cclxuXHJcbmNsYXNzIFBvcnRmb2xpb0NvbnRyb2xsZXIge1xyXG5cdHN0YXRpYyBpbmRleCgpIHtcclxuXHRcdFByb21pc2UuYWxsKFtcclxuXHRcdFx0Um91dGVyLmxvYWQoJy9wb3J0Zm9saW8vaW5kZXguaHRtbCcpLFxyXG5cdFx0XHRVdGlsLnJlcXVpcmUoJy9hc3NldHMvbGlzdENhcm91c2VsLmpzJylcclxuXHRcdF0pLnRoZW4oKCkgPT5cclxuXHRcdFx0bmV3IExpc3RDYXJvdXNlbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29sLWxlZnQgdWwnKSlcclxuXHRcdCk7XHJcblxyXG5cdFx0ZG9jdW1lbnQudGl0bGUgPSAnUG9ydGZvbGlvJztcclxuXHRcdGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgncG9ydGZvbGlvJywgJ2Nhcm91c2VsLWxpc3QtcGFnZScpO1xyXG5cdH1cclxufSIsIid1c2Ugc3RyaWN0JzsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4vKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFtcImVycm9yXCIsIHtcInZhcnNJZ25vcmVQYXR0ZXJuXCI6IFwiUm91dGVyXCJ9XSAqL1xyXG5cclxuY2xhc3MgUm91dGVyIHtcclxuXHRzdGF0aWMgcm91dGUoc2x1Zykge1xyXG5cdFx0Um91dGVyLnJlc2V0Q29udHJvbGxlcihzbHVnKTtcclxuXHJcblx0XHRzd2l0Y2goc2x1Zykge1xyXG5cdFx0XHRjYXNlICcjZ2FtZXMnOlxyXG5cdFx0XHRcdEdhbWVzQ29udHJvbGxlci5pbmRleCgpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICcjcG9ydGZvbGlvJzpcclxuXHRcdFx0XHRQb3J0Zm9saW9Db250cm9sbGVyLmluZGV4KCk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJyNwbGF5Z3JvdW5kJzpcclxuXHRcdFx0XHRQbGF5Z3JvdW5kQ29udHJvbGxlci5pbmRleCgpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICcjcGxheWdyb3VuZC9iYWxsLXBpdCc6XHJcblx0XHRcdFx0UGxheWdyb3VuZENvbnRyb2xsZXIuYmFsbFBpdCgpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICcjcGxheWdyb3VuZC9icmVha2RhbmNpbmctY3ViZSc6XHJcblx0XHRcdFx0UGxheWdyb3VuZENvbnRyb2xsZXIuYnJlYWtkYW5jaW5nQ3ViZSgpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICcjcGxheWdyb3VuZC9zdGFycnktYmFja2dyb3VuZCc6XHJcblx0XHRcdFx0UGxheWdyb3VuZENvbnRyb2xsZXIuc3RhcnJ5QmFja2dyb3VuZCgpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICcjaG9tZSc6XHJcblx0XHRcdFx0LyogZmFsbHMgdGhyb3VnaCAqL1xyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdHRoaXMubG9hZENvbXBvbmVudCgncGFnZS1ob21lJyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgYXN5bmMgbG9hZCh1cmwpIHtcclxuXHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsKTtcclxuXHRcdGlmKHJlc3BvbnNlLm9rKSB7XHJcblx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKS5pbm5lckhUTUwgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgYXN5bmMgbG9hZENvbXBvbmVudChuYW1lKSB7XHJcblx0XHRpZihhd2FpdCB0aGlzLmNvbXBvbmVudHNSZWFkeSgpKSB7XHJcblx0XHRcdGlmKGF3YWl0IGltcG9ydChgLi4vZWx0cy8ke25hbWV9LmpzYCkpIHtcclxuXHRcdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJykuaW5uZXJIVE1MID0gYDwke25hbWV9PjwvJHtuYW1lfT5gO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgYXN5bmMgY29tcG9uZW50c1JlYWR5KCkge1xyXG5cdFx0aWYod2luZG93LmNvbXBvbmVudHNSZWFkeSkge1xyXG5cdFx0XHRyZXR1cm4gYXdhaXQgUHJvbWlzZS5yZXNvbHZlKHRydWUpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ1dlYkNvbXBvbmVudHNSZWFkeScsIHJlc29sdmUsIHtvbmNlOiB0cnVlfSkpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c3RhdGljIHJ1bigpIHtcclxuXHRcdFJvdXRlci5yb3V0ZShsb2NhdGlvbi5oYXNoKTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBybU1ldGEocXVlcnkpIHtcclxuXHRcdGNvbnN0IHRhZyA9IGRvY3VtZW50LmhlYWQucXVlcnlTZWxlY3RvcihxdWVyeSk7XHJcblx0XHRpZih0YWcpIHtcclxuXHRcdFx0ZG9jdW1lbnQuaGVhZC5yZW1vdmVDaGlsZCh0YWcpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c3RhdGljIHJlc2V0Q29udHJvbGxlcihzbHVnKSB7XHJcblx0XHRzY3JvbGxUbygwLCAwKTtcclxuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKS5pbm5lckhUTUwgPSAnJztcclxuXHRcdGRvY3VtZW50LmJvZHkuY2xhc3NOYW1lID0gJyc7XHJcblx0XHRkb2N1bWVudC50aXRsZSA9ICcnO1xyXG5cdFx0Um91dGVyLnJtTWV0YSgnbWV0YVtuYW1lPWRlc2NyaXB0aW9uXScpO1xyXG5cdFx0Um91dGVyLnJtTWV0YSgnbWV0YVtuYW1lPWtleXdvcmRzXScpO1xyXG5cclxuXHRcdGRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdyb3V0ZScsIHtkZXRhaWw6IHNsdWd9KSk7XHJcblx0fVxyXG59XHJcblxyXG53aW5kb3cub25oYXNoY2hhbmdlID0gKCkgPT4gUm91dGVyLnJvdXRlKGxvY2F0aW9uLmhhc2gpOyIsIid1c2Ugc3RyaWN0JzsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG5cclxuKCgpID0+IHtcclxuXHQvLyBTdGFydCBSb3V0ZXJcclxuXHRSb3V0ZXIucnVuKCk7XHJcblxyXG5cdC8vIEhhbmRsZSBMZWZ0YmFyXHJcblx0bGV0IGhhc0NsYXNzID0gZmFsc2U7XHJcblx0bGV0IGluaXRYLCB4O1xyXG5cdGZ1bmN0aW9uIGhpZGUoZSkge1xyXG5cdFx0aWYoZSAmJiBlLnR5cGUgPT09ICd0b3VjaGVuZCcgJiYgaW5pdFggPT09IHgpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2FzaWRlJykuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJykuY2xhc3NMaXN0LnJlbW92ZSgnbGVmdGJhci1hY3RpdmUnKTtcclxuXHRcdGhhc0NsYXNzID0gZmFsc2U7XHJcblx0XHRkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGlkZSwge3Bhc3NpdmU6IHRydWV9KTtcclxuXHRcdGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHNldEluaXRYLCB7cGFzc2l2ZTogdHJ1ZX0pO1xyXG5cdFx0ZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBzZXRYLCB7cGFzc2l2ZTogdHJ1ZX0pO1xyXG5cdFx0ZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIGhpZGUsIHtwYXNzaXZlOiB0cnVlfSk7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBzZXRJbml0WChlKSB7XHJcblx0XHRpbml0WCA9IGUudG91Y2hlc1swXS5wYWdlWDtcclxuXHRcdHggPSBpbml0WDtcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHNldFgoZSkge1xyXG5cdFx0eCA9IGUudG91Y2hlc1swXS5wYWdlWDtcclxuXHR9XHJcblxyXG5cdHdpbmRvdy5vbnJlc2l6ZSA9ICgpID0+IHtcclxuXHRcdGlmKHdpbmRvdy5pbm5lcldpZHRoID4gODAwKSB7XHJcblx0XHRcdGhpZGUoKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0aWYoIWhhc0NsYXNzKSB7XHJcblx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2FzaWRlJykuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKS5jbGFzc0xpc3QuYWRkKCdsZWZ0YmFyLWFjdGl2ZScpO1xyXG5cdFx0XHRoYXNDbGFzcyA9IHRydWU7XHJcblx0XHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcblx0XHRcdFx0ZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhpZGUsIHtwYXNzaXZlOiB0cnVlfSk7XHJcblx0XHRcdFx0ZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0Jywgc2V0SW5pdFgsIHtwYXNzaXZlOiB0cnVlfSk7XHJcblx0XHRcdFx0ZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBzZXRYLCB7cGFzc2l2ZTogdHJ1ZX0pO1xyXG5cdFx0XHRcdGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBoaWRlLCB7cGFzc2l2ZTogdHJ1ZX0pO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRoaWRlKCk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdGFkZEV2ZW50TGlzdGVuZXIoJ3JvdXRlJywgKCkgPT4ge1xyXG5cdFx0Ly8gaWYgcGFnZSBpcyBub3QgcGxheWdyb3VuZCBpbm5lclxyXG5cdFx0Y29uc3QgaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xyXG5cdFx0aWYodHlwZW9mKGgpID09PSAndW5kZWZpbmVkJyB8fCBoLnN0YXJ0c1dpdGgoJyNwbGF5Z3JvdW5kJykgIT09IDApIHtcclxuXHRcdFx0bGV0IHBOYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGRyLW5hdjIgLnBsYXlncm91bmQtbmF2LXdyYXAnKTtcclxuXHRcdFx0aWYocE5hdi5jbGFzc0xpc3QuY29udGFpbnMoJ3Zpc2libGUnKSkge1xyXG5cdFx0XHRcdHBOYXYuY2xhc3NMaXN0LnJlbW92ZSgndmlzaWJsZScpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSwge3Bhc3NpdmU6IHRydWV9KTtcclxufSkoKTsiXX0=
