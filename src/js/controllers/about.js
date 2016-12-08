'use strict';

class AboutController {
    index() {
        router.load('/about.html').then(() => {
            document.getElementById('dateYear').textContent = util.getYear();
        });

        document.title = 'About';
        document.body.classList.add('about');
    }
}

window.aboutController = new AboutController();