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