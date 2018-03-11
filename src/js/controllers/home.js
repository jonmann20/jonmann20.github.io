'use strict';
/* eslint no-unused-vars: ["error", {"varsIgnorePattern": "HomeController"}] */

class HomeController {
	static index() {
		Promise.all([
			Router.load('/home.html'),
			Util.require('https://platform.twitter.com/widgets.js')
		]).then(() => {
			twttr.widgets.load();

			// Keep in sync with vars.scss
			let styles = document.createElement('style');
			styles.type = 'text/css';
			styles.innerHTML = `
				body {
					color: #fcfcfa;
				}
				.timeline-Widget {
					background: #2d2a2e;
				}
				.customisable-highlight {
					color: #66d9ef;
				}
			`;

			twttr.events.bind('loaded', e => {
				let widget = e.widgets[0];
				if(widget) {
					let iframeDoc = widget.contentDocument;
					iframeDoc.head.appendChild(styles);

					widget.classList.add('twitter-timline-custom-styled');
				}
			});
		});

		document.title = 'Jon Wiedmann';
		Util.addMeta('description', "Jon Wiedmann's personal website.  A site with information on Jon's work experience and hobbies.");
		Util.addMeta('keywords', 'Jon Wiedmann, Web Developer, HTML5, CSS, Javascript', 'Polymer');
		document.body.classList.add('home');
	}
}