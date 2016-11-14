'use strict';

jw.Main = (() => {
	function onWindowResize() {
		// NOTE: first view h is wrong!
		const h = $('.colR > div:visible').height();
		jw.Main.fixColRHeight(h);
	}
	
	return {
		init: () => {
			jw.listeners = [];
			jw.Routing.init();

			window.addEventListener('resize', onWindowResize);
			//setTimeout(() => onWindowResize, 0);

			document.querySelector('header a').addEventListener('click', () => {
				document.querySelector('.main').style.height = 'auto';
			});

			let hasClass = false;
			function hide() {
				document.querySelector('aside').classList.remove('active');
				hasClass = false;
				document.body.removeEventListener('click', hide);
			}

			document.querySelector('.menu').addEventListener('click', e => {
				e.preventDefault();

				if(!hasClass) {
					document.querySelector('aside').classList.add('active');
					hasClass = true;
					setTimeout(() => {
						document.body.addEventListener('click', hide)
					}, 0);
				}
				else {
					hide();
				}
			});
		},

		// 158: padding + footer height
		fixColRHeight: h => {
			let main = document.querySelector('.main');
			const leftColH = document.querySelector('.colL').clientHeight;
			
			if(window.innerWidth <= 800) {
				main.style.height = 'auto';
			}
			else if(window.innerWidth <= 1265) {
				main.style.height = `${leftColH + h + 158}px`;
			}
			else {
				main.style.height = (leftColH > h) ? 
					`${leftColH}px` : `${h + 158}px`;
			}
		}
	};
})();

$(() => jw.Main.init());