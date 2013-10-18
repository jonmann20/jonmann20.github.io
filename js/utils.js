jw.Utils = (function ($, undefined) {

    var _main = $(".main");

    var jsSrcHash = {
        // src: id
        "//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js": false,
        "//platform.twitter.com/widgets.js": false,
        "/js/plugins/jquery.cycle.lite.js": false,
        "/js/plugins/jquery.hoverIntent.min.js": false,
        "/js/plugins/jquery.listCarousel.js": false,
        "/js/plugins/jquery.star_bg.js": false,
        "/js/stars.js": false,
        "/js/ballPit.js": false,
        "/js/bouncingObj.js": false,
        "/js/computerGraphics/web/computergraphics.dart.js": false,
        "/js/ustream.js": false
    };

    return {
        require: function (src, callback) { // callback(cached)
            if (!jsSrcHash[src]) {
                $.ajax({
                    url: src,
                    dataType: "script",
                    success: function (data) {
                        jsSrcHash[src] = true;
                        callback(false);
                    }
                });
            }
            else {
                callback(true);
            }
        },

        getYear: function () {
            return new Date().getFullYear();
        },

        resetModel: function () {
            _main.empty();

            if (jw.Routing.lastPg === "ballPit") {
                jw.BallPit.deInit();
            }
            else if (jw.Routing.lastPg === "stars") {
                jw.StarryBg.deInit();
            }
            else if (jw.Routing.lastPg === "bObj") {
                jw.Bounce.deInit();
            }

            jw.body.removeClass();
            document.title = "";
            $("meta[name=description], meta[name=keywords]").remove();
            $("meta[name=robots]").remove();

            // if page not playground inner
            $(".dPlaygroundNav").hide();
        }
    };
})(jQuery);


window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
    		window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
			function (callback) {
			    window.setTimeout(callback, 1000 / 60);
			};
})();

//@ sourceURL=utils.js
