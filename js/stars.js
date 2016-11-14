'use strict';

jw.StarryBg = (function() {
	function initStar(color) {
		$('#html5_star').star_bg({
			window_width: $('.main').width(),
			window_height: 400,
			star_color: color,
			star_count: 1300,
			star_depth: 330,
			container: 'html5_star'
		});
	}

	function onColorChange() {
		var color = this.value;
		$.fn.star_bg.destroy();
		initStar(color);
	}


	return {
		init: function() {
			var color = document.querySelector('input[type=radio]:checked').value;
			initStar(color);
			
			var radios = document.querySelectorAll('input[type=radio]');
			for(var i=0; i < radios.length; ++i) {
				radios[i].addEventListener('click', onColorChange);	
			}
			
			// TODO: not working in Chrome or FF??
			// document.getElementById('custom').addEventListener('change', onColorChange);
		},

		deInit: function() {
			$.fn.star_bg.destroy();
			
			var radios = document.querySelectorAll('input[type=radio]');
			for(var i=0; i < radios.length; ++i) {
				radios[i].removeEventListener('click', onColorChange);	
			}
			
			//document.getElementById('custom').removeEventListener('change', onColorChange);
		}
	};
})();