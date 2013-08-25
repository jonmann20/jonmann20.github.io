jw.AboutModel = (function ($, undefined) {
    return {
        render: function (that) {
            jw.Utils.resetModel();

            that.load("/about.html", function (data) {
                jw.main.html(data);
            });

            document.title = "About";
            jw.body.addClass("about");
        }
    };
})(jQuery);