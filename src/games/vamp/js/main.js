/// <reference path="linker.js" />

/*
    The vamp game.
    Declares game as a global.
*/
(function Main() {
    game = new GameEngine();
    game.start();


    var titleView = new TitleView("Vamp: The Great and Powerful", true);
    titleView.then(function () {
        game.utils.switchView(saveView);
    });

    var saveView = new GameSaveView();
    saveView.then(function (key) {
        if (key === KeyCode.ESC) {
            game.utils.switchView(titleView);
        }
        else if (key === KeyCode.ENTER) {
            game.utils.switchView(lvlView);
        }
    });


    var vamp = new Vamp();
    var lvl1 = new Level1();

    var lvlView = new LevelView(vamp, lvl1);

    game.view = titleView;
})();
