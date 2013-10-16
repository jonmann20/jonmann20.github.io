jw.Main = (function () {

    function declareGlobals() {
        jw.head = $("head");
        jw.body = $("body");
    }


    return {
        init: function () {
            declareGlobals();

            jw.Routing.init();
            $(".dateYear").text(jw.Utils.getYear());
        }
    }
})();

$(function () {
    var waitForScripts = setInterval(function () {
        if (jw.scriptsLoaded === jw.numScripts) {
            clearInterval(waitForScripts);
            jw.Main.init();
        }
    }, 20);
});

//@ sourceURL=main.js
