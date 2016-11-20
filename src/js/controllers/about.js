'use strict';

class AboutController {
    index() {
        jw.Router.load('/about.html', succeeded => {
            document.getElementById('dateYear').textContent = jw.Util.getYear();
        });

        document.title = 'About';
        document.body.classList.add('about');
    }
}

jw.AboutController = new AboutController();