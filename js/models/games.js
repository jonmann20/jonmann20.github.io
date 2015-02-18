﻿jw.GamesModel = (function ($, undefined) {
    return {
        render: function (that, page) {
            jw.Utils.resetModel();

            if (page === "index") {
                that.load("/games/index.html", function (data) {
                    jw.Utils.require("/js/plugins/jquery.hoverIntent.js", function () { });

                    jw.Utils.require("/js/plugins/jquery.listCarousel.js", function () {
                        $("ul").listCarousel();
                    });
                }).swap();

                document.title = "Games";
                jw.body.addClass("absHover games");
            }
        }
    };
})(jQuery);