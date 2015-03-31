jw.ContactModel = (function() {
    return {
        render: function (that) {
            jw.Utils.resetModel();

            that.load("/contact.html").swap();

            document.title = "Contact Me";
            jw.body.addClass("contact");
        }
    };
})();