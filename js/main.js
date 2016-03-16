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
			document.getElementById('dateYear').textContent = jw.Utils.getYear();

			$(window).on('resize', () => {
				let h = $('.colR > div:visible').height();
				jw.Main.fixColRHeight(h);
			});

			$('header a').on('click', () => $('.main').height('auto'));

			$('.menu').on('click', e => {
				e.preventDefault();
				let hadClass = false;

				if($('aside').hasClass('active')) {
					hadClass = true;
				}
				else {
					$('aside').addClass('active');
				}

				console.log($('aside'));

				var listener = $(document).on('click', function(e) {
					if($(e.target).hasClass('menu') && !hadClass) {
						console.log('hadCLass');
					}
					else {
						console.log('remove');
						$('aside').removeClass('active');
						listener.off();
					}
				});
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

$(() => {
	jw.Main.init();
});
