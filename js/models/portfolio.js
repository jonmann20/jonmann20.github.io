jw.PortfolioModel = (function () {
    return {
        render: function (that, page) {
            if (page === "index") {

                body.removeClass().addClass("portfolio absHover");

                that.load("/portfolio/index.html", function (data) {
                    main.html(data);

                    $("ul").hoverCarousel();
                });

                location.title = "Portfolio";
            }
            else if (page === "bass") {


                location.title = "Bass | Music";
            }
        }
    };
})();