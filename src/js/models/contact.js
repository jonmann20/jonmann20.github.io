'use strict';

jw.ContactModel = (() => {
    return {
        render: that => {
            jw.Utils.resetModel();

            that.load('/contact.html').swap();

            document.title = 'Contact Me';
            jw.body.addClass('contact');
        }
    };
})();
