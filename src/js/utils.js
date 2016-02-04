jw.Utils = (function() {
    var _main = $(".main");

    var jsSrcHash = {
        // src: id
        "//platform.twitter.com/widgets.js": false,
        "/js/plugins/jquery.cycle.lite.js": false,
        "/js/plugins/jquery.listCarousel.js": false,
        "/js/plugins/jquery.star_bg.js": false,
        "/js/stars.js": false,
        "/js/ballPit.js": false,
        "/js/bouncingObj.js": false
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

        getYear: function() {
            return new Date().getFullYear();
        },

        resetModel: function() {
            _main.empty();

            for(var i=0; i < jw.listeners.length; ++i) {
                jw.listeners[i].off();
            }
            jw.listeners = [];


            if(jw.Routing.lastPg === "ballPit") {
                jw.BallPit.deInit();
            }
            else if(jw.Routing.lastPg === "stars") {
                jw.StarryBg.deInit();
            }
            else if(jw.Routing.lastPg === "bObj") {
                jw.Bounce.deInit();
            }

            jw.body.removeClass();
            document.title = "";
            $("meta[name=description], meta[name=keywords], meta[name=robots]").remove();

            // if page not playground inner
            var h = window.location.hash;
            if(typeof(h) === "undefined" || h.indexOf("#playground") !== 0) {  // startsWith
                var pNav = $(".dPlaygroundNav");

                if(pNav.is(":visible")) {
                    pNav.slideUp();
                }
            }
        }
    };
})();