'use strict';

jw.Routing = (function() {
    var app = $.sammy(".main", function () {
        // Home
        this.route("get",'/', function () {
            jw.HomeModel.render(this);
            jw.Routing.lastPg = "home";
        });

        this.route("get", "#home", function () {
            jw.HomeModel.render(this);
            jw.Routing.lastPg = "home";
        });

        // About
        this.route("get", "#about", function () {
            jw.AboutModel.render(this);
            jw.Routing.lastPg = "about";
        });

        // Contact
        this.route("get", "#contact", function () {
            jw.ContactModel.render(this);
            jw.Routing.lastPg = "contact";
        });

        //// Favorites
        //this.route("get", "#favorites", function () {
        //    jw.FavoritesModel.render(this);
        //    jw.Routing.lastPg = "favorites";
        //});

        //// Blog
        //this.route("get", "#blog", function () {
        //    jw.BlogModel.render(this);
        //    jw.Routing.lastPg = "blog";
        //});

        // Games
        this.route("get", "#games", function () {
            jw.GamesModel.render(this, "index");
            jw.Routing.lastPg = "games/index";
        });

        // Music
        this.route("get", "#music", function () {
            jw.MusicModel.render(this, "index");
            jw.Routing.lastPg = "music/index";
        });

        this.route("get", "#music/bass", function () {
            jw.MusicModel.render(this, "bass");
            jw.Routing.lastPg = "music/bass";
        });

        this.route("get", "#music/chiptunes", function () {
            jw.MusicModel.render(this, "chiptunes");
            jw.Routing.lastPg = "music/chiptunes";
        });

        this.route("get", "#music/guitar", function () {
            jw.MusicModel.render(this, "guitar");
            jw.Routing.lastPg = "music/guitar";
        });

        this.route("get", "#music/mandolin", function () {
            jw.MusicModel.render(this, "mandolin");
            jw.Routing.lastPg = "music/mandolin";
        });

        this.route("get", "#music/piano", function () {
            jw.MusicModel.render(this, "piano");
            jw.Routing.lastPg = "music/piano";
        });

        this.route("get", "#music/trumpet", function () {
            jw.MusicModel.render(this, "trumpet");
            jw.Routing.lastPg = "music/trumpet";
        });

        this.route("get", "#music/rates", function () {
            jw.MusicModel.render(this, "rates");
            jw.Routing.lastPg = "music/rates";
        });

        this.route("get", "#music/voice", function () {
            jw.MusicModel.render(this, "voice");
            jw.Routing.lastPg = "music/voice";
        });

        // Playground
        this.route("get", "#playground", function () {
            jw.PlaygroundModel.render(this, "index");
            jw.Routing.lastPg = "playground/index";
        });

        this.route("get", "#playground/ballPit", function () {
            jw.PlaygroundModel.render(this, "ballPit");
            jw.Routing.lastPg = "ballPit";
        });

        this.route("get", "#playground/breakdancing-cube", function () {
            jw.PlaygroundModel.render(this, "bCube");
            jw.Routing.lastPg = "bCube";
        });

        this.route("get", "#playground/bouncing-object", function () {
            jw.PlaygroundModel.render(this, "bObj");
            jw.Routing.lastPg = "bObj";
        });

        this.route("get", "#playground/starry-background", function () {
            jw.PlaygroundModel.render(this, "stars");
            jw.Routing.lastPg = "stars";
        });

        // Portfolio
        this.route("get", "#portfolio", function () {
            jw.PortfolioModel.render(this, "index");
            jw.Routing.lastPg = "portfolio/index";
        });
    });

    return {
        lastPg: null,


        init: function() {
            app.run();
        }
    };
})();