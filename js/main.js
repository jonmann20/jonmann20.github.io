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
    jw.Main.init();
});