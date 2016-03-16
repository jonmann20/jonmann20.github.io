'use strict';

jw.Utils = (() => {
    let _main = $('.main');

    let jsSrcHash = {
        // src: id
        'https://platform.twitter.com/widgets.js': false,
        '/js/plugins/jquery.cycle.lite.js': false,
        '/js/plugins/jquery.listCarousel.js': false,
        '/js/plugins/jquery.star_bg.js': false,
        '/js/stars.js': false,
        '/js/ballPit.js': false,
        '/js/bouncingObj.js': false
    };

    return {
        require: (src, callback) => { // callback(cached)
            if(!jsSrcHash[src]) {
                $.ajax({
                    url: src,
                    dataType: 'script',
                    success: (data) => {
                        jsSrcHash[src] = true;
                        callback(false);
                    }
                });
            }
            else {
                callback(true);
            }
        },

        getYear: () => {
            return new Date().getFullYear();
        },

        resetModel: () => {
            _main.empty();

            for(let listener of jw.listeners) {
                listener.off();
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
            document.title = '';
            $("meta[name=description], meta[name=keywords], meta[name=robots]").remove();

            // if page not playground inner
            let h = window.location.hash;
            if(typeof(h) === "undefined" || h.indexOf("#playground") !== 0) {  // startsWith
                let pNav = $(".dPlaygroundNav");

                if(pNav.is(":visible")) {
                    pNav.slideUp();
                }
            }
        }
    };
})();