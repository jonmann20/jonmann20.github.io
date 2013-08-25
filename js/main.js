jw.Main = (function () {

    function declareGlobals() {
        window.body = $("body");
        window.main = $(".main");
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
    jw.Main.init();
});