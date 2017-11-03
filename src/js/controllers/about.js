'use strict';
/* eslint no-unused-vars: ["error", {"varsIgnorePattern": "AboutController"}] */

class AboutController {
	static index() {
		Router.load('/about.html');

		document.title = 'About';
		document.body.classList.add('about');
	}
}