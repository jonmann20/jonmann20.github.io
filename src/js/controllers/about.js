'use strict';

class AboutController {
    index() {
        jw.Router.grab('/about.html', data => {
            jw.Router.swap(data);
            document.getElementById('dateYear').textContent = jw.Util.getYear();
        });

        document.title = 'About';
        document.body.classList.add('about');
    }
}

jw.AboutController = new AboutController();