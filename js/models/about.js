jw.AboutModel = (function () {
    return {
        render: function (that) {
            body.removeClass().addClass("about");

            that.load("/about.html", function (data) {
                main.html(data);
            });

            document.title = "About"
        }
    };
})();