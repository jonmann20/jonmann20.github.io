jw.GamesModel = (function () {
    return {
        render: function (that, page) {
            if (page === "index") {

                body.removeClass().addClass("absHover games");

                that.load("/games/index.html", function (data) {
                    main.html(data);

                    jw.Utils.require("/js/plugins/jquery.hoverIntent.min.js", function () { });

                    jw.Utils.require("/js/plugins/jquery.hoverCarousel.js", function () {
                        $("ul").hoverCarousel();
                    });
                });

                location.title = "Games";
            }
            else if (page === "dungeon") {
                

                location.title = "Dungeon | Games";
            }
            else if (page === "jonsQuest") {

                body.removeClass().addClass("games pageFullW jonsQuest");

                that.load("/games/jonsQuest/index.html", function (data) {
                    body.html(data);
                });

                location.title = "Jon's Quest | Games";
            }
        }
    };
})();