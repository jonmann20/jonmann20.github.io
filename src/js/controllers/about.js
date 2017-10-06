'use strict';

class AboutController {
	index() {
		router.load('/about.html');

		document.title = 'About';
		document.body.classList.add('about');
	}
}

window.aboutController = new AboutController();