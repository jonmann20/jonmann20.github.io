jw.Utils = (function () {

    var srcHash = {
        // src                                      // id
        "http://platform.twitter.com/widgets.js": "twitter-wjs",
        "/js/plugins/jquery.cycle.lite.js": "cycleLite",
        "/js/plugins/jquery.hoverIntent.min.js": "hoverIntent",
        "/js/plugins/jquery.hoverCarousel.js": "hoverCarousel"
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
        }
    };
})();