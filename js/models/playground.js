jw.PlaygroundModel = (function ($, undefined) {

    return {
        render: function (that, page) {
            jw.Utils.resetModel();

            if (page === "index") {
                that.load("/playground/index.html", function(data) {}).swap();

                document.title = "Playground";
                jw.head.append("<meta name='description' content='An playground area for web tech demos.' />" +
                               "<meta name='keywords' content='canvas, html5' />"
                );
                jw.body.addClass("playground playInner");
            }
            else if (page === "ballPit") {
                that.load("/playground/ballPit.html", function(data) {
                    jw.Utils.require("/js/ballPit.js", function () {
                        jw.BallPit.init();
                    });
                }).swap();

                document.title = "Ball Pit | Playground";
                jw.head.append("<meta name='description' content='A canvas example showcasing a ball pit.' />" +
                               "<meta name='keywords' content='canvas, html5' />"
                );
                jw.body.addClass("playground playInner nav3");
            }
            else if (page === "stars") {
                that.load("/playground/stars.html", function (data) {
                    // TODO: load these async
                    jw.Utils.require("/js/plugins/jquery.star_bg.js", function () {
                        jw.Utils.require("/js/stars.js", function (cached) {
                            jw.StarryBg.init();
                        });
                    });
                }).swap();

                document.title = "Starry Background | Playground";
                jw.head.append("<meta name='description' content='A canvas example showcasing a starry background.' />" +
                               "<meta name='keywords' content='canvas, html5' />"
                );
                jw.body.addClass("playground playInner nav2");
            }
            else if (page === "bObj") {
                that.load("/playground/bouncing-object.html", function (data) {
                    jw.Utils.require("/js/bouncingObj.js", function () {
                        jw.Bounce.init();
                    });
                }).swap();

                document.title = "Bouncing Object | Playground";
                jw.head.append("<meta name='description' content='A canvas example showcasing a bouncing object.' />" +
                               "<meta name='keywords' content='canvas, html5' />"
                );
                jw.body.addClass("playground playInner nav5");
            }
            else if (page === "ustream") {
                that.load("/playground/USTREAM-demo.html", function (data) {
                    jw.Utils.require("/js/ustream.js", function () {
                        jw.Ustream.init();
                    });
                }).swap();

                document.title = "USTREAM demo | Playground";
                jw.head.append("<meta name='description' content='A USTREAM api demo.' />" +
                               "<meta name='keywords' content='USTREAM' />"
                );
                jw.body.addClass("playground playInner uStreamPage nav5");
            }
            else if (page === "bCube") {
                that.load("/playground/breakdancing-cube.html", function (data) {
                    $("#cube").on("click", function (e) {
                        e.preventDefault();
                    });
                }).swap();

                document.title = "Breakdancing Cube | Playground";
                jw.head.append("<meta name='description' content='Pure CSS3 animation demo.' />" +
                               "<meta name='keywords' content='CSS3, HTML5' />"
                );
                jw.body.addClass("playground playInner bDancingCube nav1");
            }

            var pNav = $(".dPlaygroundNav");
            if(!pNav.is(":visible")) {
                pNav.slideDown();
            }
        }
    };
})(jQuery);