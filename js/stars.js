'use strict';

jw.StarryBg = (function() {
	var w,
		color,
		inputColor,
		inputRadio
	;

	function initStar(w, color) {
		$("#html5_star").star_bg({
			window_width: w,
			window_height: 400,
			star_color: color,
			star_count: 1300,
			star_depth: 330,
			container: "html5_star"
		});
	}


	return {
		init: function () {
			w = $(".main").width();
			color = $("input[type=radio]:checked").val();

			// setup modifications
			inputColor = $("input[type=color]").on("change", function () {
				color = $(this).val();

				$.fn.star_bg.destroy();
				initStar(w, color);
			});

			inputRadio = $("input[type=radio]").on("click", function () {
				color = $("input[type=radio]:checked").val();

				$.fn.star_bg.destroy();
				initStar(w, color);
			});

			initStar(w, color);
		},

		deInit: function () {
			$.fn.star_bg.destroy();
			inputColor.off();
			inputRadio.off();
		}
	};
})();