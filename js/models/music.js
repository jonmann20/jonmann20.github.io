jw.MusicModel = (function () {
    return {
        render: function (that, page) {
            if (page === "index") {

                body.removeClass().addClass("music musicHome");

                that.load("/music/index.html", function (data) {
                    main.html(data);
                });

                location.title = "Music";
            }
            else if (page === "bass") {


                location.title = "Bass | Music";
            }
        }
    };
})();