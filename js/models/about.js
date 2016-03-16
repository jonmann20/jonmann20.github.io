'use strict';

jw.AboutModel = (() => {
    return {
        render: that => {
            jw.Utils.resetModel();

            that.load('/about.html').swap();

            document.title = 'About';
            jw.body.addClass('about');
        }
    };
})();
