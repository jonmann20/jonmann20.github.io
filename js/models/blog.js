jw.BlogModel = (function () {
    return {
        render: function (that) {
            that.load("/blog/index.html", function (data) {
                main.html(data);
            });

            location.title = "Blog"
        }
    };
})();