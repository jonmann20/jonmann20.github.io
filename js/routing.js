jw.Routing = (function ($, undefined) {
    var app = $.sammy(function () {
        //----- Home
        this.get('/', function () {
            jw.HomeModel.render(this);
        });

        this.get("#home", function () {
            jw.HomeModel.render(this);
        });

        //----- About
        this.get("#about", function () {
            jw.AboutModel.render(this);
        });

        //----- Contact
        this.get("#contact", function () {
            jw.ContactModel.render(this);
        });

        //----- Blog
        this.get("#blog", function () {
            jw.BlogModel.render(this);
        });

        //----- Games
        this.get("#games", function () {
            jw.GamesModel.render(this, "index");
        });

        //this.get("#games/dungeon", function () {
        //    jw.GamesModel.render(this, "dungeon");
        //});

        //this.get("#games/jonsQuest", function () {
        //    jw.GamesModel.render(this, "jonsQuest");
        //});

        //----- Music
        this.get("#music", function () {
            jw.MusicModel.render(this, "index");
        });

        this.get("#music/bass", function () {
            jw.MusicModel.render(this, "bass");
        });

        this.get("#music/chiptunes", function () {
            jw.MusicModel.render(this, "chiptunes");
        });

        this.get("#music/guitar", function () {
            jw.MusicModel.render(this, "guitar");
        });

        this.get("#music/mandolin", function () {
            jw.MusicModel.render(this, "mandolin");
        });

        this.get("#music/piano", function () {
            jw.MusicModel.render(this, "piano");
        });

        this.get("#music/trumpet", function () {
            jw.MusicModel.render(this, "trumpet");
        });

        this.get("#music/rates", function () {
            jw.MusicModel.render(this, "rates");
        });

        this.get("#music/voice", function () {
            jw.MusicModel.render(this, "voice");
        });
        

        //----- Playground
        this.get("#playground", function () {
            jw.PlaygroundModel.render(this, "index");
        });

        this.get("#playground/ballPit", function () {
            jw.PlaygroundModel.render(this, "ballPit");
        });

        this.get("#playground/breakdancing-cube", function () {
            jw.PlaygroundModel.render(this, "bCube");
        });

        this.get("#playground/floating-sun", function () {
            jw.PlaygroundModel.render(this, "fSun");
        });

        this.get("#playground/bouncing-object", function () {
            jw.PlaygroundModel.render(this, "bObj");
        });

        this.get("#playground/starry-background", function () {
            jw.PlaygroundModel.render(this, "stars");
        });

        this.get("#playground/USTREAM-demo", function () {
            jw.PlaygroundModel.render(this, "ustream");
        });
        

        //----- Portfolio
        this.get("#portfolio", function () {
            jw.PortfolioModel.render(this, "index");
        });
    });

    return {
        init: function () {
            app.run();
        }
    };
})(jQuery);
