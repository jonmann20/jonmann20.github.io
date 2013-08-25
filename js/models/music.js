jw.MusicModel = (function () {

    var year = jw.Utils.getYear();

    function addNav(that) {
        that.load("/music/musicNav.html", function (data) {
            $(".musicNav").html(data);
        });
    }


    return {
        render: function (that, page) {
            if (page === "index") {
                body.removeClass().addClass("music musicHome");

                that.load("/music/index.html", function (data) {
                    main.html(data);
                    addNav(that);

                    $(".teaching").text(year - 2008);
                    $(".playing").text(year - 1994);
                });

                document.title = "Music";
            }
            else if (page === "bass") {
                body.removeClass().addClass("music bass");

                that.load("/music/bass.html", function (data) {
                    main.html(data);
                    addNav(that);

                    $(".playing").text(year - 2009);
                });

                document.title = "Bass | Music";
            }
            else if (page === "chiptunes") {
                body.removeClass().addClass("music");

                that.load("/music/chiptunes.html", function (data) {
                    main.html(data);
                    addNav(that);
                });

                document.title = "Chiptunes | Music";
            }
            else if (page === "guitar") {
                body.removeClass().addClass("music");

                that.load("/music/guitar.html", function (data) {
                    main.html(data);
                    addNav(that);

                    $(".playing").text(year - 2002);
                });

                document.title = "Guitar | Music";
            }
            else if (page === "mandolin") {
                body.removeClass().addClass("music mandolin");

                that.load("/music/mandolin.html", function (data) {
                    main.html(data);
                    addNav(that);

                    $(".playing").text(year - 2008);
                });

                document.title = "Mandolin | Music";
            }
            else if (page === "piano") {
                body.removeClass().addClass("music");

                that.load("/music/piano.html", function (data) {
                    main.html(data);
                    addNav(that);

                    $(".playing").text(year - 1994);
                });

                document.title = "Piano | Music";
            }
            else if (page === "trumpet") {
                body.removeClass().addClass("music trumpet");

                that.load("/music/trumpet.html", function (data) {
                    main.html(data);
                    addNav(that);

                    $(".playing").text(year - 1998);
                });

                document.title = "Trumpet | Music";
            }
            else if (page === "rates") {
                body.removeClass().addClass("music rates");

                that.load("/music/rates.html", function (data) {
                    main.html(data);
                    addNav(that);

                    $("meta[name=description]").remove();
                    $("meta[name=robots]").remove();        // TODO: fix in other renders
                    $("head").append("<meta name='description' content='Music Lesson Rates'>" +
                                     "<meta name='robots' rel='none' />"
                    );

                });

                document.title = "Rates | Music";
            }
            else if (page === "voice") {
                body.removeClass().addClass("music");

                that.load("/music/voice.html", function (data) {
                    main.html(data);
                    addNav(that);

                    $(".playing").text(year - 2009);
                });

                document.title = "Voice | Music";
            }


        }
    };
})();