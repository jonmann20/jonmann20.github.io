'use strict'; // eslint-disable-line

(() => {
	// Start Router
	Router.run();

	// Handle Leftbar
	let hasClass = false;
	let initX, x;
	function hide(e) {
		if(e && e.type === 'touchend' && initX === x) {
			return;
		}

		document.querySelector('a-side').removeAttribute('active');
		document.querySelector('main').classList.remove('leftbar-active');
		hasClass = false;
		document.body.removeEventListener('click', hide, {passive: true});
		document.body.removeEventListener('touchstart', setInitX, {passive: true});
		document.body.removeEventListener('touchmove', setX, {passive: true});
		document.body.removeEventListener('touchend', hide, {passive: true});
	}

	function setInitX(e) {
		initX = e.touches[0].pageX;
		x = initX;
	}

	function setX(e) {
		x = e.touches[0].pageX;
	}

	window.onresize = () => {
		if(window.innerWidth > 800) {
			hide();
		}
	};

	document.querySelector('.menu').addEventListener('click', e => {
		e.preventDefault();

		if(!hasClass) {
			document.querySelector('a-side').setAttribute('active', true);
			document.querySelector('main').classList.add('leftbar-active');
			hasClass = true;
			requestAnimationFrame(() => {
				document.body.addEventListener('click', hide, {passive: true});
				document.body.addEventListener('touchstart', setInitX, {passive: true});
				document.body.addEventListener('touchmove', setX, {passive: true});
				document.body.addEventListener('touchend', hide, {passive: true});
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
	}, {passive: true});
})();