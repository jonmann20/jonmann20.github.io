jw.PortfolioModel = (function () {
    return {
        render: function (that, page) {
            if (page === "index") {

                body.removeClass().addClass("portfolio absHover");

                that.load("/portfolio/index.html", function (data) {
                    main.html(data);

                    jw.Utils.require("/js/plugins/jquery.hoverIntent.min.js", function () { });

                    jw.Utils.require("/js/plugins/jquery.hoverCarousel.js", function(){
                        $("ul").hoverCarousel();
                    });

                });

                document.title = "Portfolio";
            }
            else if (page === "bass") {


                document.title = "Bass | Music";
            }
        }
    };
})();