jw.ContactModel = (function () {
    return {
        render: function (that) {
            body.removeClass().addClass("contact");

            that.load("/contact.html", function (data) {
                main.html(data);
            });

            document.title = "Contact Me"
        }
    };
})();