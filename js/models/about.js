jw.AboutModel = (function () {
    return {
        render: function (that) {
            that.load("/about.html", function (data) {
                main.html(data);
            });

            location.title = "About"
        }
    };
})();