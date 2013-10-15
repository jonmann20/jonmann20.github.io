jw.Main = (function () {

    function declareGlobals() {
        jw.head = $("head");
        jw.body = $("body");
        jw.main = $(".main");
    }


    return {
        init: function () {
            declareGlobals();

            var waitForScriptEval = setInterval(function () {
                if (typeof(jw.Utils) !== "undefined" && typeof (jw.Routing) !== "undefined") {
                    $(".dateYear").text(jw.Utils.getYear());
                    jw.Routing.init();

                    clearInterval(waitForScriptEval);
                }
            }, 25);
        }
    }
})();

$(function () {
    var waitForScripts = setInterval(function () {
        if (jw.scriptsLoaded === jw.numScripts) {
            clearInterval(waitForScripts);
            jw.Main.init();
        }
    }, 25);
});

//@ sourceURL=main.js
