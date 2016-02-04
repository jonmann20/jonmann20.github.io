/// <reference path="linker.js" />

/*
    The main class for dormanticide.
    Declares game as a global.
*/
(function Main() {

    game = new GameEngine();
    game.start();

    var curLvl = 1;

    var titleView = new TitleView("Dormanticide");
    titleView.then(function () {
        game.utils.switchView(overworldView);
    });

    var overworldView = new OverworldView();
    overworldView.then(function () {
        if (curLvl === 1)
            game.utils.switchView(lvl1);
        else
            game.utils.switchView(lvl2);
    });


    var actions = [FightAction.TACKLE, FightAction.DRAGONS_BREATH, null, null];

    var malaise = new Dormant("malaise.png", "MALAISE", 12, 8, 27, actions);
    var erabor = new Dormant("erabor.png", "ERABOR", 8, 12, 23, actions);
    var tildamesh = new Dormant("tildamesh.png", "TILDAMESH", 8, 12, 23, actions);


    var lvl1 = new BattleView("#ddd", malaise, erabor);
    lvl1.then(function () {
        ++curLvl;
        game.utils.switchView(overworldView);
    });

    var lvl2 = new BattleView("#ddd", malaise, tildamesh);
    lvl2.then(function () {
        game.utils.switchView(overworldView);
    });


    game.view = titleView;
})();