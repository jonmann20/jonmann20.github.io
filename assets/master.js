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
/* eslint no-unused-vars: ["error", {"varsIgnorePattern": "HomeController"}] */

class HomeController {
	static index() {
		Router.loadComponent(
			'../elts/page-home.js',
			'<page-home></page-home>'
		);

		document.title = 'Jon Wiedmann';
		Util.addMeta('description', "Jon Wiedmann's personal website.  A site with information on Jon's work experience and hobbies.");
		Util.addMeta('keywords', 'Jon Wiedmann, Web Developer, HTML5, CSS, Javascript', 'Polymer');
		//document.body.classList.add('home');
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
				HomeController.index();
				break;
		}
	}

	static async load(url) {
		const response = await fetch(url);
		if(response.ok) {
			document.querySelector('main').innerHTML = await response.text();
		}
	}

	static async loadComponent(url, html) {
		if(await this.componentsReady()) {
			if(await import(url)) {
				document.querySelector('main').innerHTML = html;
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwuanMiLCJnYW1lcy5qcyIsImhvbWUuanMiLCJwbGF5Z3JvdW5kLmpzIiwicG9ydGZvbGlvLmpzIiwicm91dGVyLmpzIiwibWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1hc3Rlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JzsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4vKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFtcImVycm9yXCIsIHtcInZhcnNJZ25vcmVQYXR0ZXJuXCI6IFwiVXRpbFwifV0gKi9cclxuXHJcbmNsYXNzIFV0aWwge1xyXG5cdHN0YXRpYyByZXF1aXJlKHNyYykge1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0aWYoIVV0aWwuY29uc3RydWN0b3IuX2pzU3JjLmluY2x1ZGVzKHNyYykpIHtcclxuXHRcdFx0XHRsZXQgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XHJcblx0XHRcdFx0c2NyaXB0LnNyYyA9IHNyYztcclxuXHRcdFx0XHRzY3JpcHQuYXN5bmMgPSAxO1xyXG5cclxuXHRcdFx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XHJcblxyXG5cdFx0XHRcdHNjcmlwdC5vbmxvYWQgPSAoKSA9PiB7XHJcblx0XHRcdFx0XHRVdGlsLmNvbnN0cnVjdG9yLl9qc1NyYy5wdXNoKHNyYyk7XHJcblx0XHRcdFx0XHRyZXNvbHZlKCk7XHJcblx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSAoKSA9PiByZWplY3QoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRyZXNvbHZlKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGFkZE1ldGEobmFtZSwgY29udGVudCkge1xyXG5cdFx0bGV0IG1ldGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdtZXRhJyk7XHJcblx0XHRtZXRhLnNldEF0dHJpYnV0ZSgnbmFtZScsIG5hbWUpO1xyXG5cdFx0bWV0YS5zZXRBdHRyaWJ1dGUoJ2NvbnRlbnQnLCBjb250ZW50KTtcclxuXHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobWV0YSk7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0IGdldE1haW5XaWR0aCgpIHtcclxuXHRcdGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJyk7XHJcblx0XHRjb25zdCBtYWluU3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUobWFpbiwgbnVsbCk7XHJcblx0XHRjb25zdCBwYWRkaW5nTGVmdCA9IHBhcnNlRmxvYXQobWFpblN0eWxlcy5nZXRQcm9wZXJ0eVZhbHVlKCdwYWRkaW5nLWxlZnQnKSk7XHJcblx0XHRyZXR1cm4gbWFpbi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCAtIHBhZGRpbmdMZWZ0O1xyXG5cdH1cclxufVxyXG5VdGlsLmNvbnN0cnVjdG9yLl9qc1NyYyA9IFtdOyIsIid1c2Ugc3RyaWN0JzsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4vKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFtcImVycm9yXCIsIHtcInZhcnNJZ25vcmVQYXR0ZXJuXCI6IFwiR2FtZXNDb250cm9sbGVyXCJ9XSAqL1xyXG5cclxuY2xhc3MgR2FtZXNDb250cm9sbGVyIHtcclxuXHRzdGF0aWMgaW5kZXgoKSB7XHJcblx0XHRQcm9taXNlLmFsbChbXHJcblx0XHRcdFJvdXRlci5sb2FkKCcvZ2FtZXMvaW5kZXguaHRtbCcpLFxyXG5cdFx0XHRVdGlsLnJlcXVpcmUoJy9hc3NldHMvbGlzdENhcm91c2VsLmpzJylcclxuXHRcdF0pLnRoZW4oKCkgPT5cclxuXHRcdFx0bmV3IExpc3RDYXJvdXNlbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29sLWxlZnQgdWwnKSlcclxuXHRcdCk7XHJcblxyXG5cdFx0ZG9jdW1lbnQudGl0bGUgPSAnR2FtZXMnO1xyXG5cdFx0ZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdnYW1lcycsICdjYXJvdXNlbC1saXN0LXBhZ2UnKTtcclxuXHR9XHJcbn0iLCIndXNlIHN0cmljdCc7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBbXCJlcnJvclwiLCB7XCJ2YXJzSWdub3JlUGF0dGVyblwiOiBcIkhvbWVDb250cm9sbGVyXCJ9XSAqL1xyXG5cclxuY2xhc3MgSG9tZUNvbnRyb2xsZXIge1xyXG5cdHN0YXRpYyBpbmRleCgpIHtcclxuXHRcdFJvdXRlci5sb2FkQ29tcG9uZW50KFxyXG5cdFx0XHQnLi4vZWx0cy9wYWdlLWhvbWUuanMnLFxyXG5cdFx0XHQnPHBhZ2UtaG9tZT48L3BhZ2UtaG9tZT4nXHJcblx0XHQpO1xyXG5cclxuXHRcdGRvY3VtZW50LnRpdGxlID0gJ0pvbiBXaWVkbWFubic7XHJcblx0XHRVdGlsLmFkZE1ldGEoJ2Rlc2NyaXB0aW9uJywgXCJKb24gV2llZG1hbm4ncyBwZXJzb25hbCB3ZWJzaXRlLiAgQSBzaXRlIHdpdGggaW5mb3JtYXRpb24gb24gSm9uJ3Mgd29yayBleHBlcmllbmNlIGFuZCBob2JiaWVzLlwiKTtcclxuXHRcdFV0aWwuYWRkTWV0YSgna2V5d29yZHMnLCAnSm9uIFdpZWRtYW5uLCBXZWIgRGV2ZWxvcGVyLCBIVE1MNSwgQ1NTLCBKYXZhc2NyaXB0JywgJ1BvbHltZXInKTtcclxuXHRcdC8vZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdob21lJyk7XHJcblx0fVxyXG59IiwiJ3VzZSBzdHJpY3QnOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbi8qIGVzbGludCBuby11bnVzZWQtdmFyczogW1wiZXJyb3JcIiwge1widmFyc0lnbm9yZVBhdHRlcm5cIjogXCJQbGF5Z3JvdW5kQ29udHJvbGxlclwifV0gKi9cclxuXHJcbmNsYXNzIFBsYXlncm91bmRDb250cm9sbGVyIHtcclxuXHRzdGF0aWMgb3Blbk5hdigpIHtcclxuXHRcdGxldCBwTmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhkci1uYXYyIC5wbGF5Z3JvdW5kLW5hdi13cmFwJyk7XHJcblx0XHRpZighcE5hdi5jbGFzc0xpc3QuY29udGFpbnMoJ3Zpc2libGUnKSkge1xyXG5cdFx0XHRwTmF2LmNsYXNzTGlzdC5hZGQoJ3Zpc2libGUnKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHN0YXRpYyBpbmRleCgpIHtcclxuXHRcdFBsYXlncm91bmRDb250cm9sbGVyLm9wZW5OYXYoKTtcclxuXHRcdFJvdXRlci5sb2FkKCcvcGxheWdyb3VuZC9pbmRleC5odG1sJyk7XHJcblxyXG5cdFx0ZG9jdW1lbnQudGl0bGUgPSAnUGxheWdyb3VuZCc7XHJcblx0XHRVdGlsLmFkZE1ldGEoJ2Rlc2NyaXB0aW9uJywgJ0FuIHBsYXlncm91bmQgYXJlYSBmb3Igd2ViIHRlY2ggZGVtb3MuJyk7XHJcblx0XHRVdGlsLmFkZE1ldGEoJ2tleXdvcmRzJywgJ2NhbnZhcywgaHRtbDUnKTtcclxuXHRcdGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgncGxheWdyb3VuZCcsICdwbGF5SW5uZXInKTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBiYWxsUGl0KCkge1xyXG5cdFx0UGxheWdyb3VuZENvbnRyb2xsZXIub3Blbk5hdigpO1xyXG5cclxuXHRcdFByb21pc2UuYWxsKFtcclxuXHRcdFx0Um91dGVyLmxvYWQoJy9wbGF5Z3JvdW5kL2JhbGwtcGl0Lmh0bWwnKSxcclxuXHRcdFx0VXRpbC5yZXF1aXJlKCcvYXNzZXRzL2JhbGxQaXQuanMnKVxyXG5cdFx0XSkudGhlbigoKSA9PiB7XHJcblx0XHRcdHdpbmRvdy5iYWxsUGl0ID0gbmV3IEJhbGxQaXQoKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGRvY3VtZW50LnRpdGxlID0gJ0JhbGwgUGl0IHwgUGxheWdyb3VuZCc7XHJcblx0XHRVdGlsLmFkZE1ldGEoJ2Rlc2NyaXB0aW9uJywgJ0EgY2FudmFzIGV4YW1wbGUgc2hvd2Nhc2luZyBhIGJhbGwgcGl0LicpO1xyXG5cdFx0VXRpbC5hZGRNZXRhKCdrZXl3b3JkcycsICdjYW52YXMsIGh0bWw1Jyk7XHJcblx0XHRkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ3BsYXlncm91bmQnLCAncGxheUlubmVyJywgJ25hdjMnKTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBzdGFycnlCYWNrZ3JvdW5kKCkge1xyXG5cdFx0UGxheWdyb3VuZENvbnRyb2xsZXIub3Blbk5hdigpO1xyXG5cclxuXHRcdFByb21pc2UuYWxsKFtcclxuXHRcdFx0Um91dGVyLmxvYWQoJy9wbGF5Z3JvdW5kL3N0YXJzLmh0bWwnKSxcclxuXHRcdFx0VXRpbC5yZXF1aXJlKCcvYXNzZXRzL3N0YXJzLmpzJylcclxuXHRcdF0pLnRoZW4oKCkgPT4ge1xyXG5cdFx0XHR3aW5kb3cuc3RhcnJ5QmcgPSBuZXcgU3RhcnJ5QmcoKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGRvY3VtZW50LnRpdGxlID0gJ1N0YXJyeSBCYWNrZ3JvdW5kIHwgUGxheWdyb3VuZCc7XHJcblx0XHRVdGlsLmFkZE1ldGEoJ2Rlc2NyaXB0aW9uJywgJ0EgY2FudmFzIGV4YW1wbGUgc2hvd2Nhc2luZyBhIHN0YXJyeSBiYWNrZ3JvdW5kLicpO1xyXG5cdFx0VXRpbC5hZGRNZXRhKCdrZXl3b3JkcycsICdjYW52YXMsIGh0bWw1Jyk7XHJcblx0XHRkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ3BsYXlncm91bmQnLCAncGxheUlubmVyJywgJ25hdjInKTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBicmVha2RhbmNpbmdDdWJlKCkge1xyXG5cdFx0UGxheWdyb3VuZENvbnRyb2xsZXIub3Blbk5hdigpO1xyXG5cdFx0Um91dGVyLmxvYWQoJy9wbGF5Z3JvdW5kL2JyZWFrZGFuY2luZy1jdWJlLmh0bWwnKTtcclxuXHJcblx0XHRkb2N1bWVudC50aXRsZSA9ICdCcmVha2RhbmNpbmcgQ3ViZSB8IFBsYXlncm91bmQnO1xyXG5cdFx0VXRpbC5hZGRNZXRhKCdkZXNjcmlwdGlvbicsICdQdXJlIENTUzMgYW5pbWF0aW9uIGRlbW8uJyk7XHJcblx0XHRVdGlsLmFkZE1ldGEoJ2tleXdvcmRzJywgJ0NTUzMsIEhUTUw1Jyk7XHJcblx0XHRkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ3BsYXlncm91bmQnLCAncGxheUlubmVyJywgJ25hdjEnKTtcclxuXHR9XHJcbn0iLCIndXNlIHN0cmljdCc7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBbXCJlcnJvclwiLCB7XCJ2YXJzSWdub3JlUGF0dGVyblwiOiBcIlBvcnRmb2xpb0NvbnRyb2xsZXJcIn1dICovXHJcblxyXG5jbGFzcyBQb3J0Zm9saW9Db250cm9sbGVyIHtcclxuXHRzdGF0aWMgaW5kZXgoKSB7XHJcblx0XHRQcm9taXNlLmFsbChbXHJcblx0XHRcdFJvdXRlci5sb2FkKCcvcG9ydGZvbGlvL2luZGV4Lmh0bWwnKSxcclxuXHRcdFx0VXRpbC5yZXF1aXJlKCcvYXNzZXRzL2xpc3RDYXJvdXNlbC5qcycpXHJcblx0XHRdKS50aGVuKCgpID0+XHJcblx0XHRcdG5ldyBMaXN0Q2Fyb3VzZWwoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbC1sZWZ0IHVsJykpXHJcblx0XHQpO1xyXG5cclxuXHRcdGRvY3VtZW50LnRpdGxlID0gJ1BvcnRmb2xpbyc7XHJcblx0XHRkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ3BvcnRmb2xpbycsICdjYXJvdXNlbC1saXN0LXBhZ2UnKTtcclxuXHR9XHJcbn0iLCIndXNlIHN0cmljdCc7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBbXCJlcnJvclwiLCB7XCJ2YXJzSWdub3JlUGF0dGVyblwiOiBcIlJvdXRlclwifV0gKi9cclxuXHJcbmNsYXNzIFJvdXRlciB7XHJcblx0c3RhdGljIHJvdXRlKHNsdWcpIHtcclxuXHRcdFJvdXRlci5yZXNldENvbnRyb2xsZXIoc2x1Zyk7XHJcblxyXG5cdFx0c3dpdGNoKHNsdWcpIHtcclxuXHRcdFx0Y2FzZSAnI2dhbWVzJzpcclxuXHRcdFx0XHRHYW1lc0NvbnRyb2xsZXIuaW5kZXgoKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnI3BvcnRmb2xpbyc6XHJcblx0XHRcdFx0UG9ydGZvbGlvQ29udHJvbGxlci5pbmRleCgpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICcjcGxheWdyb3VuZCc6XHJcblx0XHRcdFx0UGxheWdyb3VuZENvbnRyb2xsZXIuaW5kZXgoKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnI3BsYXlncm91bmQvYmFsbC1waXQnOlxyXG5cdFx0XHRcdFBsYXlncm91bmRDb250cm9sbGVyLmJhbGxQaXQoKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnI3BsYXlncm91bmQvYnJlYWtkYW5jaW5nLWN1YmUnOlxyXG5cdFx0XHRcdFBsYXlncm91bmRDb250cm9sbGVyLmJyZWFrZGFuY2luZ0N1YmUoKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnI3BsYXlncm91bmQvc3RhcnJ5LWJhY2tncm91bmQnOlxyXG5cdFx0XHRcdFBsYXlncm91bmRDb250cm9sbGVyLnN0YXJyeUJhY2tncm91bmQoKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnI2hvbWUnOlxyXG5cdFx0XHRcdC8qIGZhbGxzIHRocm91Z2ggKi9cclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRIb21lQ29udHJvbGxlci5pbmRleCgpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGFzeW5jIGxvYWQodXJsKSB7XHJcblx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCk7XHJcblx0XHRpZihyZXNwb25zZS5vaykge1xyXG5cdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJykuaW5uZXJIVE1MID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGFzeW5jIGxvYWRDb21wb25lbnQodXJsLCBodG1sKSB7XHJcblx0XHRpZihhd2FpdCB0aGlzLmNvbXBvbmVudHNSZWFkeSgpKSB7XHJcblx0XHRcdGlmKGF3YWl0IGltcG9ydCh1cmwpKSB7XHJcblx0XHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpLmlubmVySFRNTCA9IGh0bWw7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHN0YXRpYyBhc3luYyBjb21wb25lbnRzUmVhZHkoKSB7XHJcblx0XHRpZih3aW5kb3cuY29tcG9uZW50c1JlYWR5KSB7XHJcblx0XHRcdHJldHVybiBhd2FpdCBQcm9taXNlLnJlc29sdmUodHJ1ZSk7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0cmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignV2ViQ29tcG9uZW50c1JlYWR5JywgcmVzb2x2ZSwge29uY2U6IHRydWV9KSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgcnVuKCkge1xyXG5cdFx0Um91dGVyLnJvdXRlKGxvY2F0aW9uLmhhc2gpO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIHJtTWV0YShxdWVyeSkge1xyXG5cdFx0Y29uc3QgdGFnID0gZG9jdW1lbnQuaGVhZC5xdWVyeVNlbGVjdG9yKHF1ZXJ5KTtcclxuXHRcdGlmKHRhZykge1xyXG5cdFx0XHRkb2N1bWVudC5oZWFkLnJlbW92ZUNoaWxkKHRhZyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgcmVzZXRDb250cm9sbGVyKHNsdWcpIHtcclxuXHRcdHNjcm9sbFRvKDAsIDApO1xyXG5cdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpLmlubmVySFRNTCA9ICcnO1xyXG5cdFx0ZG9jdW1lbnQuYm9keS5jbGFzc05hbWUgPSAnJztcclxuXHRcdGRvY3VtZW50LnRpdGxlID0gJyc7XHJcblx0XHRSb3V0ZXIucm1NZXRhKCdtZXRhW25hbWU9ZGVzY3JpcHRpb25dJyk7XHJcblx0XHRSb3V0ZXIucm1NZXRhKCdtZXRhW25hbWU9a2V5d29yZHNdJyk7XHJcblxyXG5cdFx0ZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ3JvdXRlJywge2RldGFpbDogc2x1Z30pKTtcclxuXHR9XHJcbn1cclxuXHJcbndpbmRvdy5vbmhhc2hjaGFuZ2UgPSAoKSA9PiBSb3V0ZXIucm91dGUobG9jYXRpb24uaGFzaCk7IiwiJ3VzZSBzdHJpY3QnOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcblxyXG4oKCkgPT4ge1xyXG5cdC8vIFN0YXJ0IFJvdXRlclxyXG5cdFJvdXRlci5ydW4oKTtcclxuXHJcblx0Ly8gSGFuZGxlIExlZnRiYXJcclxuXHRsZXQgaGFzQ2xhc3MgPSBmYWxzZTtcclxuXHRsZXQgaW5pdFgsIHg7XHJcblx0ZnVuY3Rpb24gaGlkZShlKSB7XHJcblx0XHRpZihlICYmIGUudHlwZSA9PT0gJ3RvdWNoZW5kJyAmJiBpbml0WCA9PT0geCkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYXNpZGUnKS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKS5jbGFzc0xpc3QucmVtb3ZlKCdsZWZ0YmFyLWFjdGl2ZScpO1xyXG5cdFx0aGFzQ2xhc3MgPSBmYWxzZTtcclxuXHRcdGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoaWRlLCB7cGFzc2l2ZTogdHJ1ZX0pO1xyXG5cdFx0ZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0Jywgc2V0SW5pdFgsIHtwYXNzaXZlOiB0cnVlfSk7XHJcblx0XHRkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHNldFgsIHtwYXNzaXZlOiB0cnVlfSk7XHJcblx0XHRkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgaGlkZSwge3Bhc3NpdmU6IHRydWV9KTtcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHNldEluaXRYKGUpIHtcclxuXHRcdGluaXRYID0gZS50b3VjaGVzWzBdLnBhZ2VYO1xyXG5cdFx0eCA9IGluaXRYO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gc2V0WChlKSB7XHJcblx0XHR4ID0gZS50b3VjaGVzWzBdLnBhZ2VYO1xyXG5cdH1cclxuXHJcblx0d2luZG93Lm9ucmVzaXplID0gKCkgPT4ge1xyXG5cdFx0aWYod2luZG93LmlubmVyV2lkdGggPiA4MDApIHtcclxuXHRcdFx0aGlkZSgpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRpZighaGFzQ2xhc3MpIHtcclxuXHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYXNpZGUnKS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuXHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpLmNsYXNzTGlzdC5hZGQoJ2xlZnRiYXItYWN0aXZlJyk7XHJcblx0XHRcdGhhc0NsYXNzID0gdHJ1ZTtcclxuXHRcdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuXHRcdFx0XHRkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGlkZSwge3Bhc3NpdmU6IHRydWV9KTtcclxuXHRcdFx0XHRkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBzZXRJbml0WCwge3Bhc3NpdmU6IHRydWV9KTtcclxuXHRcdFx0XHRkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHNldFgsIHtwYXNzaXZlOiB0cnVlfSk7XHJcblx0XHRcdFx0ZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIGhpZGUsIHtwYXNzaXZlOiB0cnVlfSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdGhpZGUoKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0YWRkRXZlbnRMaXN0ZW5lcigncm91dGUnLCAoKSA9PiB7XHJcblx0XHQvLyBpZiBwYWdlIGlzIG5vdCBwbGF5Z3JvdW5kIGlubmVyXHJcblx0XHRjb25zdCBoID0gd2luZG93LmxvY2F0aW9uLmhhc2g7XHJcblx0XHRpZih0eXBlb2YoaCkgPT09ICd1bmRlZmluZWQnIHx8IGguc3RhcnRzV2l0aCgnI3BsYXlncm91bmQnKSAhPT0gMCkge1xyXG5cdFx0XHRsZXQgcE5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZHItbmF2MiAucGxheWdyb3VuZC1uYXYtd3JhcCcpO1xyXG5cdFx0XHRpZihwTmF2LmNsYXNzTGlzdC5jb250YWlucygndmlzaWJsZScpKSB7XHJcblx0XHRcdFx0cE5hdi5jbGFzc0xpc3QucmVtb3ZlKCd2aXNpYmxlJyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9LCB7cGFzc2l2ZTogdHJ1ZX0pO1xyXG59KSgpOyJdfQ==
