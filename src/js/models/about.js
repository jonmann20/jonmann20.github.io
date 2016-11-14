'use strict';

jw.AboutModel = (() => {
    return {
        render: that => {
            jw.Util.resetModel();

            that.load('/about.html', () => {
                document.getElementById('dateYear').textContent = jw.Util.getYear();
            }).swap();

            document.title = 'About';
            document.body.classList.add('about');
        }
    };
})();