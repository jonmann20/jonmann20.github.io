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


            $(window).on("resize", function () {
                var h = $(".colR > div:visible").height();
                jw.Main.fixColRHeight(h);
            });

            $("header a").on("click", function () {
                $(".main").height("auto");
            });
        },

        fixColRHeight: function (h) {
            var height = h + 120;

            if($(window).width() <= 800){
                height = 0;
            }
            else if ($(window).width() <= 1265) {
                height += $(".colL").height() + 38; // colR margin-top + height
            }
            //console.log(height);

            if(height == 0) {
                $(".main").height("auto");
            }
            else {
                $(".main").height(height);
            }
        }
    }
})();

$(function () {
    jw.Main.init();

    $("body").stellar({
        responsive: true
    });
});
