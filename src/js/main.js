'use strict';

(() => {
	// Setup Passive Listeners
	window.pListen = false;
	try {
		const opts = Object.defineProperty({}, 'passive', {
			get: () => {
				pListen = true;
			}
		});

		addEventListener('test', null, opts);
	}
	catch(e) {
		// empty
	}

	// Start Router
	Router.run();

	// Handle Leftbar
	let hasClass = false;
	function hide() {
		document.querySelector('aside').classList.remove('active');
		hasClass = false;
		document.body.removeEventListener('click', hide, pListen ? {passive: true} : false);
	}

	window.onresize = () => {
		if(window.innerWidth > 800) {
			hide();
		}
	};

	document.querySelector('.menu').addEventListener('click', e => {
		e.preventDefault();

		if(!hasClass) {
			document.querySelector('aside').classList.add('active');
			hasClass = true;
			requestAnimationFrame(() => {
				document.body.addEventListener('click', hide, pListen ? {passive: true} : false);
			});
		}
		else {
			hide();
		}
	});

	addEventListener('route', () => {
		// if page is not playground inner
		const h = window.location.hash;
		if(typeof(h) === 'undefined' || h.startsWith('#playground') !== 0) {
			let pNav = document.querySelector('.hdr-nav2 .playground-nav-wrap');
			if(pNav.classList.contains('visible')) {
				pNav.classList.remove('visible');
			}
		}
	}, pListen ? {passive: true} : false);
})();