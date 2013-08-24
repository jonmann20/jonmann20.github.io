jw.Routing = (function () {
    window.body = $("body");
    window.main = $(".main");

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

        this.get("#games/dungeon", function () {
            jw.GamesModel.render(this, "dungeon");
        });

        this.get("#games/jonsQuest", function () {
            jw.GamesModel.render(this, "jonsQuest");
        });

        //----- Music
        this.get("#music", function () {
            jw.MusicModel.render(this, "index");
        });

        this.get("#music/bass", function () {
            jw.MusicModel.render(this, "bass");
        });

        //----- Playground
        this.get("#playground", function () {
            jw.PlaygroundModel.render(this, "index");
        });

        this.get("#playground/ballPit", function () {
            jw.PlaygroundModel.render(this, "ballPit");
        });

        this.get("#playground/breackdancing-cube", function () {
            jw.PlaygroundModel.render(this, "bCube");
        });

        this.get("#playground/starry-background", function () {
            jw.PlaygroundModel.render(this, "stars");
        });

        

        //----- Portfolio
        this.get("#portfolio", function () {
            jw.PortfolioModel.render(this, "index");
        });
    });

    return {
        init: function () {
            $(".dateYear").text(new Date().getFullYear());

            app.run();
        }
    };
})();

$(function () {
    jw.Routing.init();
});
