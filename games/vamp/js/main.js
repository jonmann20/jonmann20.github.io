(function Main() {
    var game = new GameEngine();
    game.start();

    view = new TitleView(function () {
        view = new LevelView();
    });

})();