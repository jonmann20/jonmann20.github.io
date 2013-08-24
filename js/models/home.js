jw.HomeModel = (function () {
    return {
        render: function (that) {
            body.removeClass().addClass("home");

            that.load("/home.html", function (data) {
                main.html(data);

                $("#slideshow").cycle();
            });

            document.title = "Jon Wiedmann";
            $("meta[name=description]").remove();
            $("head").append("<meta name='description'" +
                "content='Jon Wiedmann&#700;s personal website.  This site is set up to showcase some of my technical ability." +
	  		        "This site has information regarding my work experience and hobbies.'" +
            ">");
        }
    };
})();