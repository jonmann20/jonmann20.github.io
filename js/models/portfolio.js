jw.PortfolioModel = (function ($, undefined) {
    return {
        render: function (that, page) {
            jw.Utils.resetModel();

            if (page === "index") {
                that.load("/portfolio/index.html", function (data) {
                    jw.Utils.require("/js/plugins/jquery.hoverIntent.min.js", function () { });

                    jw.Utils.require("/js/plugins/jquery.hoverCarousel.js", function(){
                        $("ul").hoverCarousel();
                    });
                }).swap();

                document.title = "Portfolio";
                jw.body.addClass("portfolio absHover");
            }
        }
    };
})(jQuery);