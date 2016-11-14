'use strict';

jw.Routing = (() => {
	let app = $.sammy('.main', function() {
		// Home
		this.route('get','/', function() {
			jw.HomeModel.render(this);
			jw.Routing.lastPg = 'home';
		});

		this.route('get', '#home', function() {
			jw.HomeModel.render(this);
			jw.Routing.lastPg = 'home';
		});

		// About
		this.route('get', '#about', function() {
			jw.AboutModel.render(this);
			jw.Routing.lastPg = 'about';
		});

		// Contact
		this.route('get', '#contact', function () {
			jw.ContactModel.render(this);
			jw.Routing.lastPg = 'contact';
		});

		//// Blog
		//this.route('get', '#blog', function() {
		//    jw.BlogModel.render(this);
		//    jw.Routing.lastPg = 'blog';
		//});

		// Games
		this.route('get', '#games', function () {
			jw.GamesModel.render(this, 'index');
			jw.Routing.lastPg = 'games/index';
		});

		// Playground
		this.route('get', '#playground', function() {
			jw.PlaygroundModel.render(this, 'index');
			jw.Routing.lastPg = 'playground/index';
		});

		this.route('get', '#playground/ballPit', function() {
			jw.PlaygroundModel.render(this, 'ballPit');
			jw.Routing.lastPg = 'ballPit';
		});

		this.route('get', '#playground/breakdancing-cube', function() {
			jw.PlaygroundModel.render(this, 'bCube');
			jw.Routing.lastPg = 'bCube';
		});

		this.route('get', '#playground/starry-background', function() {
			jw.PlaygroundModel.render(this, 'stars');
			jw.Routing.lastPg = 'stars';
		});

		// Portfolio
		this.route('get', '#portfolio', function() {
			jw.PortfolioModel.render(this, 'index');
			jw.Routing.lastPg = 'portfolio/index';
		});
	});

	return {
		lastPg: null,


		init: () => {
			app.run();
		}
	};
})();