jw.PlaygroundModel = (function () {
    return {
        render: function (that, page) {
            if (page === "index") {
                body.removeClass().addClass("absHover playground");

                that.load("/playground/index.html", function (data) {
                    main.html(data);

                    that.load("/playground/playgroundNav.html", function (data) {
                        $(".playgroundNav").html(data);

                        $(".colL ul").hoverCarousel();
                    });

                });

                document.title = "Playground";
            }
            else if (page === "ballPit") {
                body.removeClass().addClass("playground playInner nav3");

                that.load("/playground/ballPit.html", function (data) {
                    main.html(data);
                });

                document.title = "Ball Pit | Playground";
            }
        }
    };
})();