jw.AboutModel = (function ($, undefined) {
    return {
        render: function (that) {
            jw.Utils.resetModel();

            that.load("/about.html").swap();

            document.title = "About";
            jw.body.addClass("about");
        }
    };
})(jQuery);