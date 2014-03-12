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
    jw.Main.init();

    $("body").stellar({
        responsive: true
    });

    //$(window).scroll(function(){
    //    var scrolled = $(window).scrolltop();
    //    $("body").css("top", -(scrolled * 0.06) + "px");
    //});
});
