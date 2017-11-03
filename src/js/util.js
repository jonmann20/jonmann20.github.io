'use strict';
/* eslint no-unused-vars: ["error", {"varsIgnorePattern": "Util"}] */

let _jsSrcHash = {
	// src: id
	'https://platform.twitter.com/widgets.js': false,
	'/assets/listCarousel.js': false,
	'/assets/stars.js': false,
	'/assets/ballPit.js': false
};

class Util {
	static require(src) {
		return new Promise((resolve, reject) => {
			if(!_jsSrcHash[src]) {
				let script = document.createElement('script');
				script.src = src;
				script.async = 1;

				document.head.appendChild(script);

				script.onload = () => {
					_jsSrcHash[src] = true;
					resolve();
				};

				script.onerror = () => {
					reject();
				};
			}
			else {
				resolve();
			}
		});
	}

	static addMeta(name, content) {
		let meta = document.createElement('meta');
		meta.setAttribute('name', name);
		meta.setAttribute('content', content);
		document.head.appendChild(meta);
	}

	static get getMainWidth() {
		const main = document.querySelector('main');
		const mainStyles = window.getComputedStyle(main, null);
		const paddingLeft = parseFloat(mainStyles.getPropertyValue('padding-left'));
		return main.getBoundingClientRect().width - paddingLeft;
	}
}