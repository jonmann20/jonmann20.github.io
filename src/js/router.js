'use strict';

class Router {
	constructor() {
		this.lastPg = null;
		this.root = document.querySelector('main');

		onhashchange = e => this.route(location.hash);
	}

	route(slug) {
		this.resetController();

		switch(slug) {
			case '#home':
				jw.HomeController.index();
				this.lastPg = 'home';
				break;
			case '#about':
				jw.AboutController.index();
				this.lastPg = 'about';
				break;
			case '#games':
				jw.GamesController.index();
				this.lastPg = 'games';
				break;
			case '#portfolio':
				jw.PortfolioController.index();
				this.lastPg = 'portfolio';
				break;
			case '#playground':
				jw.PlaygroundController.index();
				this.lastPg = 'playground';
				break;
			case '#playground/ballPit':
				jw.PlaygroundController.ballPit();
				this.lastPg = 'playground/ballPit';
				break;
			case '#playground/breakdancing-cube':
				jw.PlaygroundController.breakdancingCube();
				this.lastPg = 'playground/breakdancing-cube';
				break;
			case '#playground/starry-background':
				jw.PlaygroundController.starryBackground();
				this.lastPg = 'playground/starry-background';
				break;
			default:
				jw.HomeController.index();
				this.lastPg = '/';
				break;
		}
	}

	load(url, callback) {
		let that = this;

        let r = new XMLHttpRequest();
        r.onreadystatechange = function() {
			if(this.readyState === 4) {
				if(this.status === 200) {
					// swap page
					that.root.innerHTML = this.responseText;

					if(callback) {
						callback(true);
					}
				}
				else {
					if(callback) {
						callback(false);
					}
				}
            }
        };
        r.open('GET', url, true);
        r.send();
	}

	run() {
		this.route(location.hash);
	}

    resetController() {
		scrollTo(0, 0);
		this.root.innerHTML = '';
        document.body.className = '';
        document.title = '';

        function rmMeta(query) {
			const tag = document.head.querySelector(query);
			if(tag) {
				document.head.removeChild(tag);
			}
        }

        rmMeta('meta[name=description]');
        rmMeta('meta[name=keywords]');

        switch(this.lastPg) {
			case 'ballPit':
				jw.BallPit.destroy();
				delete jw.BallPit;
				break;
			case 'stars':
				jw.StarryBg.destroy();
				delete jw.StarryBg;
				break;
		}

        // if page is not playground inner
        let h = window.location.hash;
        if(typeof(h) === 'undefined' || h.indexOf('#playground') !== 0) {  // startsWith
            let pNav = document.querySelector('.hdr-nav2 .playground-nav-wrap');
            if(pNav.classList.contains('visible')) {
                pNav.classList.remove('visible');
            }
        }
    }
}