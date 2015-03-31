jw.Main = (function() {

	function declareGlobals() {
		jw.head = $("head");
		jw.body = $("body");
		jw.listeners = [];
	}

	return {
		init: function() {
			declareGlobals();

			jw.Routing.init();
			document.getElementById("dateYear").textContent = jw.Utils.getYear();

			$(window).on("resize", function() {
				var h = $(".colR > div:visible").height();
				jw.Main.fixColRHeight(h);
			});

			$("header a").on("click", function() {
				$(".main").height("auto");
			});
		},

		// 158: padding + footer height
		fixColRHeight: function(h) {
			if(window.innerWidth <= 800){
				$(".main").height("auto");
			}
			else if(window.innerWidth <= 1265) {
				$(".main").height($(".colL").height() + h + 158);
			}
			else {
				if($(".colL").height() > h) {
					height = $(".colL").height();
					$(".main").height($(".colL").height());
				}
				else {
					$(".main").height(h + 158);
				}
			}
		}
	};
})();

$(function() {
	jw.Main.init();
});