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