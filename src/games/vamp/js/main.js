'use strict';
/* globals game, GameEngine, TitleView, KeyCode, Vamp, Level1, LevelView, GameSaveView */
/*
 *  The vamp game.
 *  Declares game as a global.
 */
(function Main() {
    window.game = new GameEngine();
    game.start();


    let titleView = new TitleView('Vamp: The Great and Powerful', true);
    titleView.then(() => {
        game.utils.switchView(saveView);
    });

    let saveView = new GameSaveView();
    saveView.then(key => {
        if(key === KeyCode.ESC) {
            game.utils.switchView(titleView);
        }
        else if(key === KeyCode.ENTER) {
            game.utils.switchView(lvlView);
        }
    });

    let vamp = new Vamp();
    let lvl1 = new Level1();
    let lvlView = new LevelView(vamp, lvl1);

    game.view = titleView;
})();
