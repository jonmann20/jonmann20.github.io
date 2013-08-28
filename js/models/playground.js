jw.PlaygroundModel = (function ($, undefined) {

    return {
        render: function (that, page) {
            jw.Utils.resetModel();

            if (page === "index") {
                that.load("/playground/index.html", function (data) {
                    jw.main.html(data);

                    that.load("/playground/playgroundNav.html", function (data) {
                        $(".playgroundNav").html(data);

                        $(".colL ul").hoverCarousel();
                    });
                });

                document.title = "Playground";
                jw.head.append("<meta name='description' content='A canvas example showcasing a ball pit.' />" +
                               "<meta name='keywords' content='canvas, html5' />"
                );
                jw.body.addClass("absHover playground");
            }
            else if (page === "ballPit") {
                that.load("/playground/ballPit.html", function (data) {
                    jw.main.html(data);

                    jw.Utils.require("/js/ballPit.js", function () {
                        console.log("init ballpit");

                            jw.BallPit.init();
                    });
                });

                document.title = "Ball Pit | Playground";
                jw.head.append("<meta name='description' content='A canvas example showcasing a ball pit.' />" +
                               "<meta name='keywords' content='canvas, html5' />"
                );
                jw.body.addClass("playground playInner nav3");
            }
            else if (page === "stars") {
                that.load("/playground/stars.html", function (data) {
                    jw.main.html(data);

                    // TODO: load these async
                    jw.Utils.require("/js/plugins/jquery.star_bg.js", function () {
                        jw.Utils.require("/js/stars.js", function (cached) {
                            jw.StarryBg.init();
                        });
                    });
                });

                document.title = "Starry Background | Playground";
                jw.head.append("<meta name='description' content='A canvas example showcasing a starry background.' />" +
                               "<meta name='keywords' content='canvas, html5' />"
                );
                jw.body.addClass("playground playInner nav2");
            }
            else if (page === "bObj") {
                that.load("/playground/bouncing-object.html", function (data) {
                    jw.main.html(data);

                    jw.Utils.require("/js/bouncingObj.js", function () {
                        jw.Bounce.init();
                    });
                });

                document.title = "Bouncing Object | Playground";
                jw.head.append("<meta name='description' content='A canvas example showcasing a bouncing object.' />" +
                               "<meta name='keywords' content='canvas, html5' />"
                );
                jw.body.addClass("playground playInner nav6");
            }
            else if (page === "ustream") {
                that.load("/playground/USTREAM-demo.html", function (data) {
                    jw.main.html(data);

                    jw.Utils.require("/js/ustream.js", function () {
                        jw.Ustream.init();
                    });
                });

                document.title = "USTREAM demo | Playground";
                jw.head.append("<meta name='description' content='A USTREAM api demo.' />" +
                               "<meta name='keywords' content='USTREAM' />"
                );
                jw.body.addClass("playground playInner uStreamPage nav5");
            }
            else if (page === "bCube") {
                that.load("/playground/breakdancing-cube.html", function (data) {
                    jw.main.html(data);

                    $("#cube").on("click", function (e) {
                        e.preventDefault();
                    });
                });

                document.title = "Breakdancing Cube | Playground";
                jw.head.append("<meta name='description' content='Pure CSS3 animation demo.' />" +
                               "<meta name='keywords' content='CSS3, HTML5' />"
                );
                jw.body.addClass("playground playInner bDancingCube nav1");
            }
            else if (page === "fSun") {
                that.load("/playground/floating-sun.html", function (data) {
                    jw.main.html(data);

                    jw.Utils.require("/js/computerGraphics/web/computergraphics.dart.js", function () { });
                });

                document.title = "Floating Sun | Playground";
                jw.head.append("<meta name='description' content='A canvas example showcasing a computer graphics simulation.' />" +
                               "<meta name='keywords' content='canvas, html5, computer graphics' />"
                );
                jw.body.addClass("playground playInner nav4");
            }


            if (page !== "index") {
                $(".dPlaygroundNav").show();

                that.load("/playground/playgroundNav.html", function (data) {
                    $(".dPlaygroundNav").html(data);
                });
            }
        }
    };
})(jQuery);