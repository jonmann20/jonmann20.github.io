'use strict';
/* eslint no-unused-vars: ["error", {"varsIgnorePattern": "HomeController"}] */

class HomeController {
	static index() {
		Promise.all([
			Router.load('/home.html'),
			Util.require('https://platform.twitter.com/widgets.js')
		]).then(() => twttr.widgets.load());

		document.title = 'Jon Wiedmann';
		Util.addMeta('description', "Jon Wiedmann's personal website.  A site with information on Jon's work experience and hobbies.");
		Util.addMeta('keywords', 'Jon Wiedmann, Web Developer, HTML5, CSS, Javascript', 'Polymer');
		document.body.classList.add('home');
	}
}