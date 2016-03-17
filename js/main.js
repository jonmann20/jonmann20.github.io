'use strict';
/*
 * Main
 */
jw.Main = (() => {
	return {
		init: () => {
			jw.head = $('head');
			jw.body = $('body');
			jw.listeners = [];

			jw.Routing.init();

			$(window).on('resize', () => {
				let h = $('.colR > div:visible').height();
				jw.Main.fixColRHeight(h);
			});

			$('header a').on('click', () => $('.main').height('auto'));

			let listener, hasClass = false;
			function hide() {
				$('aside').removeClass('active');
				hasClass = false;
				listener.off();
			}

			$('.menu').on('click', e => {
				e.preventDefault();

				if(!hasClass) {
					$('aside').addClass('active');
					hasClass = true;

					setTimeout(() => {
						listener = $('body').on('click', hide);
					}, 0);
				}
				else {
					hide();
				}
			});
		},

		// 158: padding + footer height
		fixColRHeight: h => {
			if(window.innerWidth <= 800){
				$('.main').height('auto');
			}
			else if(window.innerWidth <= 1265) {
				$('.main').height($('.colL').height() + h + 158);
			}
			else {
				if($('.colL').height() > h) {
					$('.main').height($('.colL').height());
				}
				else {
					$('.main').height(h + 158);
				}
			}
		}
	};
})();

$(() => jw.Main.init());
