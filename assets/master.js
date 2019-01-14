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
				this.loadComponent('page-games');
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

		document.querySelector('a-side').removeAttribute('active');
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
			document.querySelector('a-side').setAttribute('active', true);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwuanMiLCJwbGF5Z3JvdW5kLmpzIiwicG9ydGZvbGlvLmpzIiwicm91dGVyLmpzIiwibWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFzdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbi8qIGVzbGludCBuby11bnVzZWQtdmFyczogW1wiZXJyb3JcIiwge1widmFyc0lnbm9yZVBhdHRlcm5cIjogXCJVdGlsXCJ9XSAqL1xyXG5cclxuY2xhc3MgVXRpbCB7XHJcblx0c3RhdGljIHJlcXVpcmUoc3JjKSB7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRpZighVXRpbC5jb25zdHJ1Y3Rvci5fanNTcmMuaW5jbHVkZXMoc3JjKSkge1xyXG5cdFx0XHRcdGxldCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuXHRcdFx0XHRzY3JpcHQuc3JjID0gc3JjO1xyXG5cdFx0XHRcdHNjcmlwdC5hc3luYyA9IDE7XHJcblxyXG5cdFx0XHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcclxuXHJcblx0XHRcdFx0c2NyaXB0Lm9ubG9hZCA9ICgpID0+IHtcclxuXHRcdFx0XHRcdFV0aWwuY29uc3RydWN0b3IuX2pzU3JjLnB1c2goc3JjKTtcclxuXHRcdFx0XHRcdHJlc29sdmUoKTtcclxuXHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRzY3JpcHQub25lcnJvciA9ICgpID0+IHJlamVjdCgpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdHJlc29sdmUoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgYWRkTWV0YShuYW1lLCBjb250ZW50KSB7XHJcblx0XHRsZXQgbWV0YSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ21ldGEnKTtcclxuXHRcdG1ldGEuc2V0QXR0cmlidXRlKCduYW1lJywgbmFtZSk7XHJcblx0XHRtZXRhLnNldEF0dHJpYnV0ZSgnY29udGVudCcsIGNvbnRlbnQpO1xyXG5cdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChtZXRhKTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBnZXQgZ2V0TWFpbldpZHRoKCkge1xyXG5cdFx0Y29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKTtcclxuXHRcdGNvbnN0IG1haW5TdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShtYWluLCBudWxsKTtcclxuXHRcdGNvbnN0IHBhZGRpbmdMZWZ0ID0gcGFyc2VGbG9hdChtYWluU3R5bGVzLmdldFByb3BlcnR5VmFsdWUoJ3BhZGRpbmctbGVmdCcpKTtcclxuXHRcdHJldHVybiBtYWluLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoIC0gcGFkZGluZ0xlZnQ7XHJcblx0fVxyXG59XHJcblV0aWwuY29uc3RydWN0b3IuX2pzU3JjID0gW107IiwiJ3VzZSBzdHJpY3QnOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbi8qIGVzbGludCBuby11bnVzZWQtdmFyczogW1wiZXJyb3JcIiwge1widmFyc0lnbm9yZVBhdHRlcm5cIjogXCJQbGF5Z3JvdW5kQ29udHJvbGxlclwifV0gKi9cclxuXHJcbmNsYXNzIFBsYXlncm91bmRDb250cm9sbGVyIHtcclxuXHRzdGF0aWMgb3Blbk5hdigpIHtcclxuXHRcdGxldCBwTmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhkci1uYXYyIC5wbGF5Z3JvdW5kLW5hdi13cmFwJyk7XHJcblx0XHRpZighcE5hdi5jbGFzc0xpc3QuY29udGFpbnMoJ3Zpc2libGUnKSkge1xyXG5cdFx0XHRwTmF2LmNsYXNzTGlzdC5hZGQoJ3Zpc2libGUnKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHN0YXRpYyBpbmRleCgpIHtcclxuXHRcdFBsYXlncm91bmRDb250cm9sbGVyLm9wZW5OYXYoKTtcclxuXHRcdFJvdXRlci5sb2FkKCcvcGxheWdyb3VuZC9pbmRleC5odG1sJyk7XHJcblxyXG5cdFx0ZG9jdW1lbnQudGl0bGUgPSAnUGxheWdyb3VuZCc7XHJcblx0XHRVdGlsLmFkZE1ldGEoJ2Rlc2NyaXB0aW9uJywgJ0FuIHBsYXlncm91bmQgYXJlYSBmb3Igd2ViIHRlY2ggZGVtb3MuJyk7XHJcblx0XHRVdGlsLmFkZE1ldGEoJ2tleXdvcmRzJywgJ2NhbnZhcywgaHRtbDUnKTtcclxuXHRcdGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgncGxheWdyb3VuZCcsICdwbGF5SW5uZXInKTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBiYWxsUGl0KCkge1xyXG5cdFx0UGxheWdyb3VuZENvbnRyb2xsZXIub3Blbk5hdigpO1xyXG5cclxuXHRcdFByb21pc2UuYWxsKFtcclxuXHRcdFx0Um91dGVyLmxvYWQoJy9wbGF5Z3JvdW5kL2JhbGwtcGl0Lmh0bWwnKSxcclxuXHRcdFx0VXRpbC5yZXF1aXJlKCcvYXNzZXRzL2JhbGxQaXQuanMnKVxyXG5cdFx0XSkudGhlbigoKSA9PiB7XHJcblx0XHRcdHdpbmRvdy5iYWxsUGl0ID0gbmV3IEJhbGxQaXQoKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGRvY3VtZW50LnRpdGxlID0gJ0JhbGwgUGl0IHwgUGxheWdyb3VuZCc7XHJcblx0XHRVdGlsLmFkZE1ldGEoJ2Rlc2NyaXB0aW9uJywgJ0EgY2FudmFzIGV4YW1wbGUgc2hvd2Nhc2luZyBhIGJhbGwgcGl0LicpO1xyXG5cdFx0VXRpbC5hZGRNZXRhKCdrZXl3b3JkcycsICdjYW52YXMsIGh0bWw1Jyk7XHJcblx0XHRkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ3BsYXlncm91bmQnLCAncGxheUlubmVyJywgJ25hdjMnKTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBzdGFycnlCYWNrZ3JvdW5kKCkge1xyXG5cdFx0UGxheWdyb3VuZENvbnRyb2xsZXIub3Blbk5hdigpO1xyXG5cclxuXHRcdFByb21pc2UuYWxsKFtcclxuXHRcdFx0Um91dGVyLmxvYWQoJy9wbGF5Z3JvdW5kL3N0YXJzLmh0bWwnKSxcclxuXHRcdFx0VXRpbC5yZXF1aXJlKCcvYXNzZXRzL3N0YXJzLmpzJylcclxuXHRcdF0pLnRoZW4oKCkgPT4ge1xyXG5cdFx0XHR3aW5kb3cuc3RhcnJ5QmcgPSBuZXcgU3RhcnJ5QmcoKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGRvY3VtZW50LnRpdGxlID0gJ1N0YXJyeSBCYWNrZ3JvdW5kIHwgUGxheWdyb3VuZCc7XHJcblx0XHRVdGlsLmFkZE1ldGEoJ2Rlc2NyaXB0aW9uJywgJ0EgY2FudmFzIGV4YW1wbGUgc2hvd2Nhc2luZyBhIHN0YXJyeSBiYWNrZ3JvdW5kLicpO1xyXG5cdFx0VXRpbC5hZGRNZXRhKCdrZXl3b3JkcycsICdjYW52YXMsIGh0bWw1Jyk7XHJcblx0XHRkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ3BsYXlncm91bmQnLCAncGxheUlubmVyJywgJ25hdjInKTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBicmVha2RhbmNpbmdDdWJlKCkge1xyXG5cdFx0UGxheWdyb3VuZENvbnRyb2xsZXIub3Blbk5hdigpO1xyXG5cdFx0Um91dGVyLmxvYWQoJy9wbGF5Z3JvdW5kL2JyZWFrZGFuY2luZy1jdWJlLmh0bWwnKTtcclxuXHJcblx0XHRkb2N1bWVudC50aXRsZSA9ICdCcmVha2RhbmNpbmcgQ3ViZSB8IFBsYXlncm91bmQnO1xyXG5cdFx0VXRpbC5hZGRNZXRhKCdkZXNjcmlwdGlvbicsICdQdXJlIENTUzMgYW5pbWF0aW9uIGRlbW8uJyk7XHJcblx0XHRVdGlsLmFkZE1ldGEoJ2tleXdvcmRzJywgJ0NTUzMsIEhUTUw1Jyk7XHJcblx0XHRkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ3BsYXlncm91bmQnLCAncGxheUlubmVyJywgJ25hdjEnKTtcclxuXHR9XHJcbn0iLCIndXNlIHN0cmljdCc7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBbXCJlcnJvclwiLCB7XCJ2YXJzSWdub3JlUGF0dGVyblwiOiBcIlBvcnRmb2xpb0NvbnRyb2xsZXJcIn1dICovXHJcblxyXG5jbGFzcyBQb3J0Zm9saW9Db250cm9sbGVyIHtcclxuXHRzdGF0aWMgaW5kZXgoKSB7XHJcblx0XHRQcm9taXNlLmFsbChbXHJcblx0XHRcdFJvdXRlci5sb2FkKCcvcG9ydGZvbGlvL2luZGV4Lmh0bWwnKSxcclxuXHRcdFx0VXRpbC5yZXF1aXJlKCcvYXNzZXRzL2xpc3RDYXJvdXNlbC5qcycpXHJcblx0XHRdKS50aGVuKCgpID0+XHJcblx0XHRcdG5ldyBMaXN0Q2Fyb3VzZWwoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbC1sZWZ0IHVsJykpXHJcblx0XHQpO1xyXG5cclxuXHRcdGRvY3VtZW50LnRpdGxlID0gJ1BvcnRmb2xpbyc7XHJcblx0XHRkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ3BvcnRmb2xpbycsICdjYXJvdXNlbC1saXN0LXBhZ2UnKTtcclxuXHR9XHJcbn0iLCIndXNlIHN0cmljdCc7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBbXCJlcnJvclwiLCB7XCJ2YXJzSWdub3JlUGF0dGVyblwiOiBcIlJvdXRlclwifV0gKi9cclxuXHJcbmNsYXNzIFJvdXRlciB7XHJcblx0c3RhdGljIHJvdXRlKHNsdWcpIHtcclxuXHRcdFJvdXRlci5yZXNldENvbnRyb2xsZXIoc2x1Zyk7XHJcblxyXG5cdFx0c3dpdGNoKHNsdWcpIHtcclxuXHRcdFx0Y2FzZSAnI2dhbWVzJzpcclxuXHRcdFx0XHR0aGlzLmxvYWRDb21wb25lbnQoJ3BhZ2UtZ2FtZXMnKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnI3BvcnRmb2xpbyc6XHJcblx0XHRcdFx0UG9ydGZvbGlvQ29udHJvbGxlci5pbmRleCgpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICcjcGxheWdyb3VuZCc6XHJcblx0XHRcdFx0UGxheWdyb3VuZENvbnRyb2xsZXIuaW5kZXgoKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnI3BsYXlncm91bmQvYmFsbC1waXQnOlxyXG5cdFx0XHRcdFBsYXlncm91bmRDb250cm9sbGVyLmJhbGxQaXQoKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnI3BsYXlncm91bmQvYnJlYWtkYW5jaW5nLWN1YmUnOlxyXG5cdFx0XHRcdFBsYXlncm91bmRDb250cm9sbGVyLmJyZWFrZGFuY2luZ0N1YmUoKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnI3BsYXlncm91bmQvc3RhcnJ5LWJhY2tncm91bmQnOlxyXG5cdFx0XHRcdFBsYXlncm91bmRDb250cm9sbGVyLnN0YXJyeUJhY2tncm91bmQoKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnI2hvbWUnOlxyXG5cdFx0XHRcdC8qIGZhbGxzIHRocm91Z2ggKi9cclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHR0aGlzLmxvYWRDb21wb25lbnQoJ3BhZ2UtaG9tZScpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGFzeW5jIGxvYWQodXJsKSB7XHJcblx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCk7XHJcblx0XHRpZihyZXNwb25zZS5vaykge1xyXG5cdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJykuaW5uZXJIVE1MID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGFzeW5jIGxvYWRDb21wb25lbnQobmFtZSkge1xyXG5cdFx0aWYoYXdhaXQgdGhpcy5jb21wb25lbnRzUmVhZHkoKSkge1xyXG5cdFx0XHRpZihhd2FpdCBpbXBvcnQoYC4uL2VsdHMvJHtuYW1lfS5qc2ApKSB7XHJcblx0XHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpLmlubmVySFRNTCA9IGA8JHtuYW1lfT48LyR7bmFtZX0+YDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGFzeW5jIGNvbXBvbmVudHNSZWFkeSgpIHtcclxuXHRcdGlmKHdpbmRvdy5jb21wb25lbnRzUmVhZHkpIHtcclxuXHRcdFx0cmV0dXJuIGF3YWl0IFByb21pc2UucmVzb2x2ZSh0cnVlKTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdXZWJDb21wb25lbnRzUmVhZHknLCByZXNvbHZlLCB7b25jZTogdHJ1ZX0pKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHN0YXRpYyBydW4oKSB7XHJcblx0XHRSb3V0ZXIucm91dGUobG9jYXRpb24uaGFzaCk7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgcm1NZXRhKHF1ZXJ5KSB7XHJcblx0XHRjb25zdCB0YWcgPSBkb2N1bWVudC5oZWFkLnF1ZXJ5U2VsZWN0b3IocXVlcnkpO1xyXG5cdFx0aWYodGFnKSB7XHJcblx0XHRcdGRvY3VtZW50LmhlYWQucmVtb3ZlQ2hpbGQodGFnKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHN0YXRpYyByZXNldENvbnRyb2xsZXIoc2x1Zykge1xyXG5cdFx0c2Nyb2xsVG8oMCwgMCk7XHJcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJykuaW5uZXJIVE1MID0gJyc7XHJcblx0XHRkb2N1bWVudC5ib2R5LmNsYXNzTmFtZSA9ICcnO1xyXG5cdFx0ZG9jdW1lbnQudGl0bGUgPSAnJztcclxuXHRcdFJvdXRlci5ybU1ldGEoJ21ldGFbbmFtZT1kZXNjcmlwdGlvbl0nKTtcclxuXHRcdFJvdXRlci5ybU1ldGEoJ21ldGFbbmFtZT1rZXl3b3Jkc10nKTtcclxuXHJcblx0XHRkaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgncm91dGUnLCB7ZGV0YWlsOiBzbHVnfSkpO1xyXG5cdH1cclxufVxyXG5cclxud2luZG93Lm9uaGFzaGNoYW5nZSA9ICgpID0+IFJvdXRlci5yb3V0ZShsb2NhdGlvbi5oYXNoKTsiLCIndXNlIHN0cmljdCc7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuXHJcbigoKSA9PiB7XHJcblx0Ly8gU3RhcnQgUm91dGVyXHJcblx0Um91dGVyLnJ1bigpO1xyXG5cclxuXHQvLyBIYW5kbGUgTGVmdGJhclxyXG5cdGxldCBoYXNDbGFzcyA9IGZhbHNlO1xyXG5cdGxldCBpbml0WCwgeDtcclxuXHRmdW5jdGlvbiBoaWRlKGUpIHtcclxuXHRcdGlmKGUgJiYgZS50eXBlID09PSAndG91Y2hlbmQnICYmIGluaXRYID09PSB4KSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdhLXNpZGUnKS5yZW1vdmVBdHRyaWJ1dGUoJ2FjdGl2ZScpO1xyXG5cdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpLmNsYXNzTGlzdC5yZW1vdmUoJ2xlZnRiYXItYWN0aXZlJyk7XHJcblx0XHRoYXNDbGFzcyA9IGZhbHNlO1xyXG5cdFx0ZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGhpZGUsIHtwYXNzaXZlOiB0cnVlfSk7XHJcblx0XHRkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBzZXRJbml0WCwge3Bhc3NpdmU6IHRydWV9KTtcclxuXHRcdGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgc2V0WCwge3Bhc3NpdmU6IHRydWV9KTtcclxuXHRcdGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBoaWRlLCB7cGFzc2l2ZTogdHJ1ZX0pO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gc2V0SW5pdFgoZSkge1xyXG5cdFx0aW5pdFggPSBlLnRvdWNoZXNbMF0ucGFnZVg7XHJcblx0XHR4ID0gaW5pdFg7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBzZXRYKGUpIHtcclxuXHRcdHggPSBlLnRvdWNoZXNbMF0ucGFnZVg7XHJcblx0fVxyXG5cclxuXHR3aW5kb3cub25yZXNpemUgPSAoKSA9PiB7XHJcblx0XHRpZih3aW5kb3cuaW5uZXJXaWR0aCA+IDgwMCkge1xyXG5cdFx0XHRoaWRlKCk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdGlmKCFoYXNDbGFzcykge1xyXG5cdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdhLXNpZGUnKS5zZXRBdHRyaWJ1dGUoJ2FjdGl2ZScsIHRydWUpO1xyXG5cdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJykuY2xhc3NMaXN0LmFkZCgnbGVmdGJhci1hY3RpdmUnKTtcclxuXHRcdFx0aGFzQ2xhc3MgPSB0cnVlO1xyXG5cdFx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG5cdFx0XHRcdGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoaWRlLCB7cGFzc2l2ZTogdHJ1ZX0pO1xyXG5cdFx0XHRcdGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHNldEluaXRYLCB7cGFzc2l2ZTogdHJ1ZX0pO1xyXG5cdFx0XHRcdGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgc2V0WCwge3Bhc3NpdmU6IHRydWV9KTtcclxuXHRcdFx0XHRkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgaGlkZSwge3Bhc3NpdmU6IHRydWV9KTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0aGlkZSgpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHRhZGRFdmVudExpc3RlbmVyKCdyb3V0ZScsICgpID0+IHtcclxuXHRcdC8vIGlmIHBhZ2UgaXMgbm90IHBsYXlncm91bmQgaW5uZXJcclxuXHRcdGNvbnN0IGggPSB3aW5kb3cubG9jYXRpb24uaGFzaDtcclxuXHRcdGlmKHR5cGVvZihoKSA9PT0gJ3VuZGVmaW5lZCcgfHwgaC5zdGFydHNXaXRoKCcjcGxheWdyb3VuZCcpICE9PSAwKSB7XHJcblx0XHRcdGxldCBwTmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhkci1uYXYyIC5wbGF5Z3JvdW5kLW5hdi13cmFwJyk7XHJcblx0XHRcdGlmKHBOYXYuY2xhc3NMaXN0LmNvbnRhaW5zKCd2aXNpYmxlJykpIHtcclxuXHRcdFx0XHRwTmF2LmNsYXNzTGlzdC5yZW1vdmUoJ3Zpc2libGUnKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sIHtwYXNzaXZlOiB0cnVlfSk7XHJcbn0pKCk7Il19
