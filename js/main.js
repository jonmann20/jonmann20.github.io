jw.Main = (function () {

    function declareGlobals() {
        jw.head = $("head");
        jw.body = $("body");
        jw.main = $(".main");
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
            jw.Main.init();
            clearInterval(waitForScripts);
        }
    }, 10);
});