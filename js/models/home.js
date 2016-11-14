'use strict';

jw.HomeModel = (() => {

    return {
        render: that => {
            jw.Util.resetModel();

            that.load('/home.html', data => {
                jw.Util.require('https://platform.twitter.com/widgets.js', alreadyCreated => {
                    //if(!alreadyCreated) {
                        twttr.widgets.load();
                    //}
                });
            }).swap();

            document.title = 'Jon Wiedmann';
            jw.Util.addMeta('description', "Jon Wiedmann's personal website.  This site is set up to showcase some of my technical ability.  This site has information regarding my work experience and hobbies.");
            jw.Util.addMeta('keywords', 'Jon Wiedmann, Web Developer, PHP, HTML5, CSS, jQuery, Javascript, sammy.js');
            document.body.classList.add('home');
        }
    };
})();