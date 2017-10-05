'use strict';

class Util {
    constructor() {
        this.jsSrcHash = {
            // src: id
            'https://platform.twitter.com/widgets.js': false,
            '/assets/listCarousel.js': false,
            '/assets/stars.js': false,
            '/assets/ballPit.js': false
        };
    }

    require(src) {
        return new Promise((resolve, reject) => {
            if(!this.jsSrcHash[src]) {
                let script = document.createElement('script');
                script.src = src;
                script.async = 1;

                let firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(script, firstScriptTag);

                script.onload = () => {
                    this.jsSrcHash[src] = true;
                    resolve();
                };

                script.onerror = () => {
                    reject();
                };
            }
            else {
                resolve();
            }
        });
    }

    addMeta(name, content) {
        let meta = document.createElement('meta');
        meta.setAttribute('name', name);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
    }

    getMainWidth() {
        const main = document.querySelector('main');
        const mainStyles = window.getComputedStyle(main, null);
        const paddingLeft = parseFloat(mainStyles.getPropertyValue('padding-left'));
        return main.getBoundingClientRect().width - paddingLeft;
    }
}

window.util = new Util();
'use strict';

class AboutController {
    index() {
        router.load('/about.html');

        document.title = 'About';
        document.body.classList.add('about');
    }
}

window.aboutController = new AboutController();
'use strict';

class GamesController {
	index() {
		Promise.all([
			router.load('/games/index.html'),
			util.require('/assets/listCarousel.js')
		]).then(() =>
			new ListCarousel(document.querySelector('.col-left ul'))
		);

		document.title = 'Games';
		document.body.classList.add('games', 'carousel-list-page');
	}
}

window.gamesController = new GamesController();
'use strict';

class HomeController {
    index() {
        Promise.all([
            router.load('/home.html'),
            util.require('https://platform.twitter.com/widgets.js')
        ]).then(() => twttr.widgets.load());

        document.title = 'Jon Wiedmann';
        util.addMeta('description', "Jon Wiedmann's personal website.  This site is set up to showcase some of my technical ability.  This site has information regarding my work experience and hobbies.");
        util.addMeta('keywords', 'Jon Wiedmann, Web Developer, PHP, HTML5, CSS, Javascript');
        document.body.classList.add('home');
    }
}

window.homeController = new HomeController();
'use strict';

class PlaygroundController {
    openNav() {
        let pNav = document.querySelector('.hdr-nav2 .playground-nav-wrap');
        if(!pNav.classList.contains('visible')) {
            pNav.classList.add('visible');
        }
    }

    index() {
        this.openNav();
        router.load('/playground/index.html');

        document.title = 'Playground';
        util.addMeta('description', 'An playground area for web tech demos.');
        util.addMeta('keywords', 'canvas, html5');
        document.body.classList.add('playground', 'playInner');
    }

    ballPit() {
        this.openNav();

        Promise.all([
            router.load('/playground/ball-pit.html'),
            util.require('/assets/ballPit.js')
        ]).then(() => {
            window.ballPit = new BallPit();
        });

        document.title = 'Ball Pit | Playground';
        util.addMeta('description', 'A canvas example showcasing a ball pit.');
        util.addMeta('keywords', 'canvas, html5');
        document.body.classList.add('playground', 'playInner', 'nav3');
    }

    starryBackground() {
        this.openNav();

        Promise.all([
            router.load('/playground/stars.html'),
            util.require('/assets/stars.js')
        ]).then(() => {
            window.starryBg = new StarryBg();
        });

        document.title = 'Starry Background | Playground';
        util.addMeta('description', 'A canvas example showcasing a starry background.');
        util.addMeta('keywords', 'canvas, html5');
        document.body.classList.add('playground', 'playInner', 'nav2');
    }

    breakdancingCube() {
        this.openNav();
        router.load('/playground/breakdancing-cube.html');

        document.title = 'Breakdancing Cube | Playground';
        util.addMeta('description', 'Pure CSS3 animation demo.');
        util.addMeta('keywords', 'CSS3, HTML5');
        document.body.classList.add('playground', 'playInner', 'nav1');
    }
}

window.playgroundController = new PlaygroundController();
'use strict';

class PortfolioController {
	index() {
		Promise.all([
			router.load('/portfolio/index.html'),
			util.require('/assets/listCarousel.js')
		]).then(() =>
			new ListCarousel(document.querySelector('.col-left ul'))
		);

		document.title = 'Portfolio';
		document.body.classList.add('portfolio', 'carousel-list-page');
	}
}

window.portfolioController = new PortfolioController();
'use strict';

class Router {
	constructor() {
		this.main = document.querySelector('main');
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

	load(url) {
		return fetch(url).then(response => {
			if(response.ok) {
				return response.text().then(text => {
					// swap page
					this.main.innerHTML = text;
				});
			}
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
		this.main.innerHTML = '';
		document.body.className = '';
		document.title = '';
		this.rmMeta('meta[name=description]');
		this.rmMeta('meta[name=keywords]');

		dispatchEvent(new CustomEvent('route', {detail: slug}));
	}
}
'use strict';

(() => {
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
	window.router = new Router();
	router.run();

	// Handle Leftbar
	let hasClass = false;
	function hide() {
		document.querySelector('aside').classList.remove('active');
		hasClass = false;
		document.body.removeEventListener('click', hide, pListen ? {passive: true} : false);
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
			hasClass = true;
			requestAnimationFrame(() => {
				document.body.addEventListener('click', hide, pListen ? {passive: true} : false);
			});
		}
		else {
			hide();
		}
	});

	addEventListener('route', e => {
		// if page is not playground inner
		const h = window.location.hash;
		if(typeof(h) === 'undefined' || h.startsWith('#playground') !== 0) {
			let pNav = document.querySelector('.hdr-nav2 .playground-nav-wrap');
			if(pNav.classList.contains('visible')) {
				pNav.classList.remove('visible');
			}
		}
	}, pListen ? {passive: true} : false);
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwuanMiLCJhYm91dC5qcyIsImdhbWVzLmpzIiwiaG9tZS5qcyIsInBsYXlncm91bmQuanMiLCJwb3J0Zm9saW8uanMiLCJyb3V0ZXIuanMiLCJtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYXN0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNsYXNzIFV0aWwge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmpzU3JjSGFzaCA9IHtcbiAgICAgICAgICAgIC8vIHNyYzogaWRcbiAgICAgICAgICAgICdodHRwczovL3BsYXRmb3JtLnR3aXR0ZXIuY29tL3dpZGdldHMuanMnOiBmYWxzZSxcbiAgICAgICAgICAgICcvYXNzZXRzL2xpc3RDYXJvdXNlbC5qcyc6IGZhbHNlLFxuICAgICAgICAgICAgJy9hc3NldHMvc3RhcnMuanMnOiBmYWxzZSxcbiAgICAgICAgICAgICcvYXNzZXRzL2JhbGxQaXQuanMnOiBmYWxzZVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJlcXVpcmUoc3JjKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBpZighdGhpcy5qc1NyY0hhc2hbc3JjXSkge1xuICAgICAgICAgICAgICAgIGxldCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgICAgICAgICAgICBzY3JpcHQuc3JjID0gc3JjO1xuICAgICAgICAgICAgICAgIHNjcmlwdC5hc3luYyA9IDE7XG5cbiAgICAgICAgICAgICAgICBsZXQgZmlyc3RTY3JpcHRUYWcgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF07XG4gICAgICAgICAgICAgICAgZmlyc3RTY3JpcHRUYWcucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc2NyaXB0LCBmaXJzdFNjcmlwdFRhZyk7XG5cbiAgICAgICAgICAgICAgICBzY3JpcHQub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmpzU3JjSGFzaFtzcmNdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBzY3JpcHQub25lcnJvciA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYWRkTWV0YShuYW1lLCBjb250ZW50KSB7XG4gICAgICAgIGxldCBtZXRhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbWV0YScpO1xuICAgICAgICBtZXRhLnNldEF0dHJpYnV0ZSgnbmFtZScsIG5hbWUpO1xuICAgICAgICBtZXRhLnNldEF0dHJpYnV0ZSgnY29udGVudCcsIGNvbnRlbnQpO1xuICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKG1ldGEpO1xuICAgIH1cblxuICAgIGdldE1haW5XaWR0aCgpIHtcbiAgICAgICAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKTtcbiAgICAgICAgY29uc3QgbWFpblN0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG1haW4sIG51bGwpO1xuICAgICAgICBjb25zdCBwYWRkaW5nTGVmdCA9IHBhcnNlRmxvYXQobWFpblN0eWxlcy5nZXRQcm9wZXJ0eVZhbHVlKCdwYWRkaW5nLWxlZnQnKSk7XG4gICAgICAgIHJldHVybiBtYWluLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoIC0gcGFkZGluZ0xlZnQ7XG4gICAgfVxufVxuXG53aW5kb3cudXRpbCA9IG5ldyBVdGlsKCk7IiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBBYm91dENvbnRyb2xsZXIge1xuICAgIGluZGV4KCkge1xuICAgICAgICByb3V0ZXIubG9hZCgnL2Fib3V0Lmh0bWwnKTtcblxuICAgICAgICBkb2N1bWVudC50aXRsZSA9ICdBYm91dCc7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnYWJvdXQnKTtcbiAgICB9XG59XG5cbndpbmRvdy5hYm91dENvbnRyb2xsZXIgPSBuZXcgQWJvdXRDb250cm9sbGVyKCk7IiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBHYW1lc0NvbnRyb2xsZXIge1xuXHRpbmRleCgpIHtcblx0XHRQcm9taXNlLmFsbChbXG5cdFx0XHRyb3V0ZXIubG9hZCgnL2dhbWVzL2luZGV4Lmh0bWwnKSxcblx0XHRcdHV0aWwucmVxdWlyZSgnL2Fzc2V0cy9saXN0Q2Fyb3VzZWwuanMnKVxuXHRcdF0pLnRoZW4oKCkgPT5cblx0XHRcdG5ldyBMaXN0Q2Fyb3VzZWwoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbC1sZWZ0IHVsJykpXG5cdFx0KTtcblxuXHRcdGRvY3VtZW50LnRpdGxlID0gJ0dhbWVzJztcblx0XHRkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ2dhbWVzJywgJ2Nhcm91c2VsLWxpc3QtcGFnZScpO1xuXHR9XG59XG5cbndpbmRvdy5nYW1lc0NvbnRyb2xsZXIgPSBuZXcgR2FtZXNDb250cm9sbGVyKCk7IiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBIb21lQ29udHJvbGxlciB7XG4gICAgaW5kZXgoKSB7XG4gICAgICAgIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgIHJvdXRlci5sb2FkKCcvaG9tZS5odG1sJyksXG4gICAgICAgICAgICB1dGlsLnJlcXVpcmUoJ2h0dHBzOi8vcGxhdGZvcm0udHdpdHRlci5jb20vd2lkZ2V0cy5qcycpXG4gICAgICAgIF0pLnRoZW4oKCkgPT4gdHd0dHIud2lkZ2V0cy5sb2FkKCkpO1xuXG4gICAgICAgIGRvY3VtZW50LnRpdGxlID0gJ0pvbiBXaWVkbWFubic7XG4gICAgICAgIHV0aWwuYWRkTWV0YSgnZGVzY3JpcHRpb24nLCBcIkpvbiBXaWVkbWFubidzIHBlcnNvbmFsIHdlYnNpdGUuICBUaGlzIHNpdGUgaXMgc2V0IHVwIHRvIHNob3djYXNlIHNvbWUgb2YgbXkgdGVjaG5pY2FsIGFiaWxpdHkuICBUaGlzIHNpdGUgaGFzIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBteSB3b3JrIGV4cGVyaWVuY2UgYW5kIGhvYmJpZXMuXCIpO1xuICAgICAgICB1dGlsLmFkZE1ldGEoJ2tleXdvcmRzJywgJ0pvbiBXaWVkbWFubiwgV2ViIERldmVsb3BlciwgUEhQLCBIVE1MNSwgQ1NTLCBKYXZhc2NyaXB0Jyk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnaG9tZScpO1xuICAgIH1cbn1cblxud2luZG93LmhvbWVDb250cm9sbGVyID0gbmV3IEhvbWVDb250cm9sbGVyKCk7IiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBQbGF5Z3JvdW5kQ29udHJvbGxlciB7XG4gICAgb3Blbk5hdigpIHtcbiAgICAgICAgbGV0IHBOYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGRyLW5hdjIgLnBsYXlncm91bmQtbmF2LXdyYXAnKTtcbiAgICAgICAgaWYoIXBOYXYuY2xhc3NMaXN0LmNvbnRhaW5zKCd2aXNpYmxlJykpIHtcbiAgICAgICAgICAgIHBOYXYuY2xhc3NMaXN0LmFkZCgndmlzaWJsZScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5kZXgoKSB7XG4gICAgICAgIHRoaXMub3Blbk5hdigpO1xuICAgICAgICByb3V0ZXIubG9hZCgnL3BsYXlncm91bmQvaW5kZXguaHRtbCcpO1xuXG4gICAgICAgIGRvY3VtZW50LnRpdGxlID0gJ1BsYXlncm91bmQnO1xuICAgICAgICB1dGlsLmFkZE1ldGEoJ2Rlc2NyaXB0aW9uJywgJ0FuIHBsYXlncm91bmQgYXJlYSBmb3Igd2ViIHRlY2ggZGVtb3MuJyk7XG4gICAgICAgIHV0aWwuYWRkTWV0YSgna2V5d29yZHMnLCAnY2FudmFzLCBodG1sNScpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ3BsYXlncm91bmQnLCAncGxheUlubmVyJyk7XG4gICAgfVxuXG4gICAgYmFsbFBpdCgpIHtcbiAgICAgICAgdGhpcy5vcGVuTmF2KCk7XG5cbiAgICAgICAgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgcm91dGVyLmxvYWQoJy9wbGF5Z3JvdW5kL2JhbGwtcGl0Lmh0bWwnKSxcbiAgICAgICAgICAgIHV0aWwucmVxdWlyZSgnL2Fzc2V0cy9iYWxsUGl0LmpzJylcbiAgICAgICAgXSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB3aW5kb3cuYmFsbFBpdCA9IG5ldyBCYWxsUGl0KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRvY3VtZW50LnRpdGxlID0gJ0JhbGwgUGl0IHwgUGxheWdyb3VuZCc7XG4gICAgICAgIHV0aWwuYWRkTWV0YSgnZGVzY3JpcHRpb24nLCAnQSBjYW52YXMgZXhhbXBsZSBzaG93Y2FzaW5nIGEgYmFsbCBwaXQuJyk7XG4gICAgICAgIHV0aWwuYWRkTWV0YSgna2V5d29yZHMnLCAnY2FudmFzLCBodG1sNScpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ3BsYXlncm91bmQnLCAncGxheUlubmVyJywgJ25hdjMnKTtcbiAgICB9XG5cbiAgICBzdGFycnlCYWNrZ3JvdW5kKCkge1xuICAgICAgICB0aGlzLm9wZW5OYXYoKTtcblxuICAgICAgICBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICByb3V0ZXIubG9hZCgnL3BsYXlncm91bmQvc3RhcnMuaHRtbCcpLFxuICAgICAgICAgICAgdXRpbC5yZXF1aXJlKCcvYXNzZXRzL3N0YXJzLmpzJylcbiAgICAgICAgXSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB3aW5kb3cuc3RhcnJ5QmcgPSBuZXcgU3RhcnJ5QmcoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZG9jdW1lbnQudGl0bGUgPSAnU3RhcnJ5IEJhY2tncm91bmQgfCBQbGF5Z3JvdW5kJztcbiAgICAgICAgdXRpbC5hZGRNZXRhKCdkZXNjcmlwdGlvbicsICdBIGNhbnZhcyBleGFtcGxlIHNob3djYXNpbmcgYSBzdGFycnkgYmFja2dyb3VuZC4nKTtcbiAgICAgICAgdXRpbC5hZGRNZXRhKCdrZXl3b3JkcycsICdjYW52YXMsIGh0bWw1Jyk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgncGxheWdyb3VuZCcsICdwbGF5SW5uZXInLCAnbmF2MicpO1xuICAgIH1cblxuICAgIGJyZWFrZGFuY2luZ0N1YmUoKSB7XG4gICAgICAgIHRoaXMub3Blbk5hdigpO1xuICAgICAgICByb3V0ZXIubG9hZCgnL3BsYXlncm91bmQvYnJlYWtkYW5jaW5nLWN1YmUuaHRtbCcpO1xuXG4gICAgICAgIGRvY3VtZW50LnRpdGxlID0gJ0JyZWFrZGFuY2luZyBDdWJlIHwgUGxheWdyb3VuZCc7XG4gICAgICAgIHV0aWwuYWRkTWV0YSgnZGVzY3JpcHRpb24nLCAnUHVyZSBDU1MzIGFuaW1hdGlvbiBkZW1vLicpO1xuICAgICAgICB1dGlsLmFkZE1ldGEoJ2tleXdvcmRzJywgJ0NTUzMsIEhUTUw1Jyk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgncGxheWdyb3VuZCcsICdwbGF5SW5uZXInLCAnbmF2MScpO1xuICAgIH1cbn1cblxud2luZG93LnBsYXlncm91bmRDb250cm9sbGVyID0gbmV3IFBsYXlncm91bmRDb250cm9sbGVyKCk7IiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBQb3J0Zm9saW9Db250cm9sbGVyIHtcblx0aW5kZXgoKSB7XG5cdFx0UHJvbWlzZS5hbGwoW1xuXHRcdFx0cm91dGVyLmxvYWQoJy9wb3J0Zm9saW8vaW5kZXguaHRtbCcpLFxuXHRcdFx0dXRpbC5yZXF1aXJlKCcvYXNzZXRzL2xpc3RDYXJvdXNlbC5qcycpXG5cdFx0XSkudGhlbigoKSA9PlxuXHRcdFx0bmV3IExpc3RDYXJvdXNlbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29sLWxlZnQgdWwnKSlcblx0XHQpO1xuXG5cdFx0ZG9jdW1lbnQudGl0bGUgPSAnUG9ydGZvbGlvJztcblx0XHRkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ3BvcnRmb2xpbycsICdjYXJvdXNlbC1saXN0LXBhZ2UnKTtcblx0fVxufVxuXG53aW5kb3cucG9ydGZvbGlvQ29udHJvbGxlciA9IG5ldyBQb3J0Zm9saW9Db250cm9sbGVyKCk7IiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBSb3V0ZXIge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLm1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJyk7XG5cdFx0b25oYXNoY2hhbmdlID0gKGUpID0+IHRoaXMucm91dGUobG9jYXRpb24uaGFzaCk7XG5cdH1cblxuXHRyb3V0ZShzbHVnKSB7XG5cdFx0dGhpcy5yZXNldENvbnRyb2xsZXIoc2x1Zyk7XG5cblx0XHRzd2l0Y2goc2x1Zykge1xuXHRcdFx0Y2FzZSAnI2Fib3V0Jzpcblx0XHRcdFx0YWJvdXRDb250cm9sbGVyLmluZGV4KCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnI2dhbWVzJzpcblx0XHRcdFx0Z2FtZXNDb250cm9sbGVyLmluZGV4KCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnI3BvcnRmb2xpbyc6XG5cdFx0XHRcdHBvcnRmb2xpb0NvbnRyb2xsZXIuaW5kZXgoKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICcjcGxheWdyb3VuZCc6XG5cdFx0XHRcdHBsYXlncm91bmRDb250cm9sbGVyLmluZGV4KCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnI3BsYXlncm91bmQvYmFsbC1waXQnOlxuXHRcdFx0XHRwbGF5Z3JvdW5kQ29udHJvbGxlci5iYWxsUGl0KCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnI3BsYXlncm91bmQvYnJlYWtkYW5jaW5nLWN1YmUnOlxuXHRcdFx0XHRwbGF5Z3JvdW5kQ29udHJvbGxlci5icmVha2RhbmNpbmdDdWJlKCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnI3BsYXlncm91bmQvc3RhcnJ5LWJhY2tncm91bmQnOlxuXHRcdFx0XHRwbGF5Z3JvdW5kQ29udHJvbGxlci5zdGFycnlCYWNrZ3JvdW5kKCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnI2hvbWUnOlxuXHRcdFx0XHQvKiBmYWxscyB0aHJvdWdoICovXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRob21lQ29udHJvbGxlci5pbmRleCgpO1xuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblxuXHRsb2FkKHVybCkge1xuXHRcdHJldHVybiBmZXRjaCh1cmwpLnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0aWYocmVzcG9uc2Uub2spIHtcblx0XHRcdFx0cmV0dXJuIHJlc3BvbnNlLnRleHQoKS50aGVuKHRleHQgPT4ge1xuXHRcdFx0XHRcdC8vIHN3YXAgcGFnZVxuXHRcdFx0XHRcdHRoaXMubWFpbi5pbm5lckhUTUwgPSB0ZXh0O1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdHJ1bigpIHtcblx0XHR0aGlzLnJvdXRlKGxvY2F0aW9uLmhhc2gpO1xuXHR9XG5cblx0cm1NZXRhKHF1ZXJ5KSB7XG5cdFx0Y29uc3QgdGFnID0gZG9jdW1lbnQuaGVhZC5xdWVyeVNlbGVjdG9yKHF1ZXJ5KTtcblx0XHRpZih0YWcpIHtcblx0XHRcdGRvY3VtZW50LmhlYWQucmVtb3ZlQ2hpbGQodGFnKTtcblx0XHR9XG5cdH1cblxuXHRyZXNldENvbnRyb2xsZXIoc2x1Zykge1xuXHRcdHNjcm9sbFRvKDAsIDApO1xuXHRcdHRoaXMubWFpbi5pbm5lckhUTUwgPSAnJztcblx0XHRkb2N1bWVudC5ib2R5LmNsYXNzTmFtZSA9ICcnO1xuXHRcdGRvY3VtZW50LnRpdGxlID0gJyc7XG5cdFx0dGhpcy5ybU1ldGEoJ21ldGFbbmFtZT1kZXNjcmlwdGlvbl0nKTtcblx0XHR0aGlzLnJtTWV0YSgnbWV0YVtuYW1lPWtleXdvcmRzXScpO1xuXG5cdFx0ZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ3JvdXRlJywge2RldGFpbDogc2x1Z30pKTtcblx0fVxufSIsIid1c2Ugc3RyaWN0JztcblxuKCgpID0+IHtcblx0Ly8gU2V0dXAgUGFzc2l2ZSBMaXN0ZW5lcnNcblx0d2luZG93LnBMaXN0ZW4gPSBmYWxzZTtcblx0dHJ5IHtcblx0XHRjb25zdCBvcHRzID0gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAncGFzc2l2ZScsIHtcblx0XHRcdGdldDogKCkgPT4ge1xuXHRcdFx0XHRwTGlzdGVuID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGFkZEV2ZW50TGlzdGVuZXIoJ3Rlc3QnLCBudWxsLCBvcHRzKTtcblx0fVxuXHRjYXRjaChlKSB7fVxuXG5cdC8vIFN0YXJ0IFJvdXRlclxuXHR3aW5kb3cucm91dGVyID0gbmV3IFJvdXRlcigpO1xuXHRyb3V0ZXIucnVuKCk7XG5cblx0Ly8gSGFuZGxlIExlZnRiYXJcblx0bGV0IGhhc0NsYXNzID0gZmFsc2U7XG5cdGZ1bmN0aW9uIGhpZGUoKSB7XG5cdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYXNpZGUnKS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcblx0XHRoYXNDbGFzcyA9IGZhbHNlO1xuXHRcdGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoaWRlLCBwTGlzdGVuID8ge3Bhc3NpdmU6IHRydWV9IDogZmFsc2UpO1xuXHR9XG5cblx0d2luZG93Lm9ucmVzaXplID0gKCkgPT4ge1xuXHRcdGlmKHdpbmRvdy5pbm5lcldpZHRoID4gODAwKSB7XG5cdFx0XHRoaWRlKCk7XG5cdFx0fVxuXHR9O1xuXG5cdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRpZighaGFzQ2xhc3MpIHtcblx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2FzaWRlJykuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG5cdFx0XHRoYXNDbGFzcyA9IHRydWU7XG5cdFx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuXHRcdFx0XHRkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGlkZSwgcExpc3RlbiA/IHtwYXNzaXZlOiB0cnVlfSA6IGZhbHNlKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdGhpZGUoKTtcblx0XHR9XG5cdH0pO1xuXG5cdGFkZEV2ZW50TGlzdGVuZXIoJ3JvdXRlJywgZSA9PiB7XG5cdFx0Ly8gaWYgcGFnZSBpcyBub3QgcGxheWdyb3VuZCBpbm5lclxuXHRcdGNvbnN0IGggPSB3aW5kb3cubG9jYXRpb24uaGFzaDtcblx0XHRpZih0eXBlb2YoaCkgPT09ICd1bmRlZmluZWQnIHx8IGguc3RhcnRzV2l0aCgnI3BsYXlncm91bmQnKSAhPT0gMCkge1xuXHRcdFx0bGV0IHBOYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGRyLW5hdjIgLnBsYXlncm91bmQtbmF2LXdyYXAnKTtcblx0XHRcdGlmKHBOYXYuY2xhc3NMaXN0LmNvbnRhaW5zKCd2aXNpYmxlJykpIHtcblx0XHRcdFx0cE5hdi5jbGFzc0xpc3QucmVtb3ZlKCd2aXNpYmxlJyk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LCBwTGlzdGVuID8ge3Bhc3NpdmU6IHRydWV9IDogZmFsc2UpO1xufSkoKTsiXX0=
