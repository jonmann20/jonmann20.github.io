'use strict';

class HomeController {
    index() {
        jw.Router.grab('/home.html', data => {
            jw.Router.swap(data);
            
            jw.Util.require('https://platform.twitter.com/widgets.js', alreadyCreated => {
                twttr.widgets.load();
            });
        });

        document.title = 'Jon Wiedmann';
        jw.Util.addMeta('description', "Jon Wiedmann's personal website.  This site is set up to showcase some of my technical ability.  This site has information regarding my work experience and hobbies.");
        jw.Util.addMeta('keywords', 'Jon Wiedmann, Web Developer, PHP, HTML5, CSS, Javascript');
        document.body.classList.add('home');
    }
}

jw.HomeController = new HomeController();