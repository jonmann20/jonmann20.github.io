'use strict';
/* globals game, GameEngine, TitleView, KeyCode, Vamp, Level1, LevelView, GameSaveView */

(() => {
    window.game = new GameEngine();
    game.start();

    let titleView = new TitleView('Vamp: The Great and Powerful', true);
    let saveView = new GameSaveView();

    const vamp = new Vamp();
    const lvl1 = new Level1();
    const lvlView = new LevelView(vamp, lvl1);

    titleView.then(() => {
        game.utils.switchView(saveView);
    });

    saveView.then(key => {
        if(key === KeyCode.ESC) {
            game.utils.switchView(titleView);
        }
        else if(key === KeyCode.ENTER) {
            game.utils.switchView(lvlView);
        }
    });

    game.view = titleView;
})();