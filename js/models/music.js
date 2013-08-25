jw.MusicModel = (function ($, undefined) {

    var year = jw.Utils.getYear();

    function addNav(that) {
        that.load("/music/musicNav.html", function (data) {
            $(".musicNav").html(data);
        });
    }


    return {
        render: function (that, page) {
            jw.Utils.resetModel();

            if (page === "index") {
                that.load("/music/index.html", function (data) {
                    jw.main.html(data);
                    addNav(that);

                    $(".teaching").text(year - 2008);
                    $(".playing").text(year - 1994);
                });

                document.title = "Music";
                jw.body.addClass("music musicHome");
            }
            else if (page === "bass") {
                that.load("/music/bass.html", function (data) {
                    jw.main.html(data);
                    addNav(that);

                    $(".playing").text(year - 2009);
                });

                document.title = "Bass | Music";
                jw.body.addClass("music bass");
            }
            else if (page === "chiptunes") {
                that.load("/music/chiptunes.html", function (data) {
                    jw.main.html(data);
                    addNav(that);
                });

                document.title = "Chiptunes | Music";
                jw.body.addClass("music");
            }
            else if (page === "guitar") {
                that.load("/music/guitar.html", function (data) {
                    jw.main.html(data);
                    addNav(that);

                    $(".playing").text(year - 2002);
                });

                document.title = "Guitar | Music";
                jw.body.addClass("music");
            }
            else if (page === "mandolin") {
                that.load("/music/mandolin.html", function (data) {
                    jw.main.html(data);
                    addNav(that);

                    $(".playing").text(year - 2008);
                });

                document.title = "Mandolin | Music";
                jw.body.addClass("music mandolin");
            }
            else if (page === "piano") {
                that.load("/music/piano.html", function (data) {
                    jw.main.html(data);
                    addNav(that);

                    $(".playing").text(year - 1994);
                });

                document.title = "Piano | Music";
                jw.body.addClass("music");
            }
            else if (page === "trumpet") {
                that.load("/music/trumpet.html", function (data) {
                    jw.main.html(data);
                    addNav(that);

                    $(".playing").text(year - 1998);
                });

                document.title = "Trumpet | Music";
                jw.body.addClass("music trumpet");
            }
            else if (page === "rates") {
                that.load("/music/rates.html", function (data) {
                    jw.main.html(data);
                    addNav(that);
                });

                document.title = "Rates | Music";
                jw.head.append("<meta name='description' content='Music Lesson Rates'>" +
                               "<meta name='robots' rel='none' />"
                );
                jw.body.addClass("music rates");
            }
            else if (page === "voice") {
                that.load("/music/voice.html", function (data) {
                    jw.main.html(data);
                    addNav(that);

                    $(".playing").text(year - 2009);
                });

                document.title = "Voice | Music";
                jw.body.addClass("music");
            }


        }
    };
})(jQuery);