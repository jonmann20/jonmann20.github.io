jw.ContactModel = (function () {
    return {
        render: function (that) {
            that.load("/contact.html", function (data) {
                main.html(data);
            });

            location.title = "Contact Me"
        }
    };
})();