'use strict';

class AboutModel {
    render(that) {
        jw.Util.resetModel();

        that.load('/about.html', () => {
            document.getElementById('dateYear').textContent = jw.Util.getYear();
        }).swap();

        document.title = 'About';
        document.body.classList.add('about');
    }
}

jw.AboutModel = new AboutModel();