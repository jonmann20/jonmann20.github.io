'use strict';

jw.HomeModel = (() => {

    return {
        render: that => {
            jw.Utils.resetModel();

            that.load('/home.html', data => {
                jw.Utils.require('https://platform.twitter.com/widgets.js', alreadyCreated => {
                    //if(!alreadyCreated){
                        twttr.widgets.load();
                    //}
                });
            }).swap();

            document.title = 'Jon Wiedmann';
            jw.head.append(`<meta
                                name="description"
                                content="Jon Wiedmann&#700;s personal website.  This site is set up to showcase some of my technical ability.
                                    This site has information regarding my work experience and hobbies."
                            >
                           <meta name="keywords" content="Jon Wiedmann, Web Developer, PHP, HTML5, CSS, jQuery, Javascript, sammy.js">`
            );
            jw.body.addClass('home');
        }
    };
})();
