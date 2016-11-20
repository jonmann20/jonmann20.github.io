'use strict';

class Router {
	constructor() {
		this.lastPg = null;
		this.root = document.querySelector('.main');
		
		onhashchange = e => this.route(location.hash);
	}
	
	route(slug) {
		jw.Util.resetController();
		
		switch(slug) {
			case '#home':
				jw.HomeController.index();
				jw.Router.lastPg = 'home';
				break;
			case '#about':
				jw.AboutController.index();
				jw.Router.lastPg = 'about';
				break;
			case '#games':
				jw.GamesController.index();
				jw.Router.lastPg = 'games';
				break;
			case '#portfolio':
				jw.PortfolioController.index();
				jw.Router.lastPg = 'portfolio';
				break;
			case '#playground':
				jw.PlaygroundController.index();
				jw.Router.lastPg = 'playground';
				break;
			case '#playground/ballPit':
				jw.PlaygroundController.ballPit();
				jw.Router.lastPg = 'playground/ballPit';
				break;
			case '#playground/breakdancing-cube':
				jw.PlaygroundController.breakdancingCube();
				jw.Router.lastPg = 'playground/breakdancing-cube';
				break;
			case '#playground/starry-background':
				jw.PlaygroundController.starryBackground();
				jw.Router.lastPg = 'playground/starry-background';
				break;
			default:
				jw.HomeController.index();
				jw.Router.lastPg = '/';
				break;
		}
	}
	
	grab(url, callback) {
        let r = new XMLHttpRequest();
        r.onreadystatechange = function() {
            if(this.readyState === 4) {
            	if(this.status === 200) {
					callback(this.responseText);
            	}
            	else {
            		callback();
            	}
            }
        };
        r.open('GET', url, true);
        r.send();
	}
	
	run() {
		this.route(location.hash);
	}
	
	swap(data) {
		this.root.innerHTML = data;
	}
}