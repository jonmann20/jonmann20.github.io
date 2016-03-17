'use strict';

jw.AboutModel = (() => {
    return {
        render: that => {
            jw.Utils.resetModel();

            that.load('/about.html', () => {

            document.getElementById('dateYear').textContent = jw.Utils.getYear();
            }).swap();

            document.title = 'About';
            jw.body.addClass('about');
        }
    };
})();
