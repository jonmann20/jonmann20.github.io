jw.ContactModel = (function ($, undefined) {
    return {
        render: function (that) {
            jw.Utils.resetModel();

            that.load("/contact.html").swap();

            document.title = "Contact Me";
            jw.body.addClass("contact");
        }
    };
})(jQuery);