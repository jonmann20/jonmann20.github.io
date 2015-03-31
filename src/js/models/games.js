jw.GamesModel = (function() {
	return {
		render: function(that, page) {
			jw.Utils.resetModel();

			if(page === "index") {
				that.load("/games/index.html", function (data) {
					jw.Utils.require("/js/plugins/jquery.listCarousel.js", function () {
						$("ul").listCarousel();
					});
				}).swap(function() {
					setTimeout(function() {
						jw.Main.fixColRHeight($("#divDefault").height());
					}, 10);
				});

				document.title = "Games";
				jw.body.addClass("absHover games");
			}
		}
	};
})();