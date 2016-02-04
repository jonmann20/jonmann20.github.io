jw.MusicModel = (function ($, undefined) {

    var year = jw.Utils.getYear();

    return {
        render: function (that, page) {
            jw.Utils.resetModel();

            if (page === "index") {
                that.load("/music/index.html", function (data) {
                    $(".teaching").text(year - 2008);
                    $(".playing").text(year - 1994);
                }).swap();

                document.title = "Music";
                jw.body.addClass("music musicHome");
            }
            else if (page === "bass") {
                that.load("/music/bass.html", function (data) {
                    $(".playing").text(year - 2009);
                }).swap();

                document.title = "Bass | Music";
                jw.body.addClass("music bass");
            }
            else if (page === "chiptunes") {
                that.load("/music/chiptunes.html", function (data) {}).swap();

                document.title = "Chiptunes | Music";
                jw.body.addClass("music");
            }
            else if (page === "guitar") {
                that.load("/music/guitar.html", function (data) {
                    $(".playing").text(year - 2002);
                }).swap();

                document.title = "Guitar | Music";
                jw.body.addClass("music");
            }
            else if (page === "mandolin") {
                that.load("/music/mandolin.html", function (data) {
                    $(".playing").text(year - 2008);
                }).swap();

                document.title = "Mandolin | Music";
                jw.body.addClass("music mandolin");
            }
            else if (page === "piano") {
                that.load("/music/piano.html", function (data) {
                    $(".playing").text(year - 1994);
                }).swap();

                document.title = "Piano | Music";
                jw.body.addClass("music");
            }
            else if (page === "trumpet") {
                that.load("/music/trumpet.html", function (data) {
                    $(".playing").text(year - 1998);
                }).swap();

                document.title = "Trumpet | Music";
                jw.body.addClass("music trumpet");
            }
            else if (page === "rates") {
                that.load("/music/rates.html", function (data) {}).swap();

                document.title = "Rates | Music";
                jw.head.append("<meta name='description' content='Music Lesson Rates'>" +
                               "<meta name='robots' rel='none' />"
                );
                jw.body.addClass("music rates");
            }
            else if (page === "voice") {
                that.load("/music/voice.html", function (data) {
                    $(".playing").text(year - 2009);
                }).swap();

                document.title = "Voice | Music";
                jw.body.addClass("music");
            }
        }
    };
})(jQuery);