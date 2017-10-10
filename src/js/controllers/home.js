'use strict';

class HomeController {
	index() {
		Promise.all([
			router.load('/home.html'),
			util.require('https://platform.twitter.com/widgets.js')
		]).then(() => twttr.widgets.load());

		document.title = 'Jon Wiedmann';
		util.addMeta('description', "Jon Wiedmann's personal website.  A site with information on Jon's work experience and hobbies.");
		util.addMeta('keywords', 'Jon Wiedmann, Web Developer, HTML5, CSS, Javascript', 'Polymer');
		document.body.classList.add('home');
	}
}

window.homeController = new HomeController();