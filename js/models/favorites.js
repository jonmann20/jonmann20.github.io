jw.FavoritesModel = (function ($, undefined) {

    return {
        render: function (that) {
            jw.Utils.resetModel();

            that.load("/favorites.html").swap();

            document.title = "Favorites";
            jw.head.append("<meta name='description' content='Jon Wiedmann&#700;s personal website.  This site is set up to showcase some of my technical ability. " +
                                    "This site has information regarding my work experience and hobbies.' />" +
                           "<meta name='keywords' content='Jon Wiedmann, Web Developer, PHP, HTML5, CSS, jQuery, Javascript, sammy.js' />"
            );
            jw.body.addClass("favs nav0");
        }
    };
})(jQuery);
