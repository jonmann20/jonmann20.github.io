jw.BlogModel = (function () {
    return {
        render: function (that) {
            body.removeClass().addClass("blog");

            that.load("/blog/index.html", function (data) {
                main.html(data);
            });

            document.title = "Blog"
        }
    };
})();