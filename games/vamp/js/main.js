(function Main() {
    var game = new GameEngine();
    game.start();

    var titleView = new TitleView("Vamp: The Great and Powerful", true);
    titleView.then(function () {
        view = saveView;
    });

    var saveView = new GameSaveView();
    saveView.then(function (key) {
        if (key === KeyCode.ESC) {
            view = titleView;
        }
        else if (key === KeyCode.ENTER) {
            view = lvlView;
        }
    });

    var lvlView = new LevelView();

    view = titleView;
})();