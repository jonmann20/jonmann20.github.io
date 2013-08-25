jw.Utils = (function ($, undefined) {

    var srcHash = {
        // src: id
        "//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js": "scriptJqueryUI",
        "//platform.twitter.com/widgets.js": "twitter-wjs",
        "/js/plugins/jquery.cycle.lite.js": "scriptCycleLite",
        "/js/plugins/jquery.hoverIntent.min.js": "scriptHoverIntent",
        "/js/plugins/jquery.hoverCarousel.js": "scriptHoverCarousel",
        "/js/ballPit.js": "scriptBallPit",
        "/js/html5_star.js": "scriptHtml5Star",
        "/js/bouncingObj.js": "scriptBObj",
        "/js/computerGraphics/web/computergraphics.dart.js": "scriptComputerGraphics"
    }


    return {
        require: function (src, callback) { // callback(alreadyCreated)
            var id = srcHash[src];

            if (!$('#' + id).length) {
                $.getScript(src, function (data) {
                    callback(false);
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
            jw.body.removeClass();
            document.title = "";
            $("meta[name=description]").remove();
            $("meta[name=keywords]").remove();
            $("meta[name=robots]").remove();

            $(".dPlaygroundNav").hide();
        }
    };
})(jQuery);