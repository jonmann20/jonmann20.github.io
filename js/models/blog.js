jw.BlogModel = (function ($, undefined) {
    return {
        render: function (that) {
            jw.Utils.resetModel();

            that.load("/blog/index.html", function (data) {
                jw.main.html(data);
            });

            document.title = "Blog";
            jw.body.addClass("blog");
        }
    };
})(jQuery);