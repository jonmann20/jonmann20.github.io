/// <reference path="linker.js" />

var game = new GameEngine();
game.start();


var actions = [FightAction.TACKLE, FightAction.DRAGONS_BREATH, null, null];

var malaise = new Dormant("malaise.png", "MALAISE", 12, 8, 27, actions);
var erabor = new Dormant("erabor.png", "ERABOR", 8, 12, 23, actions);

var titleView = new TitleView("Dormanticide");
titleView.then(function () {
    view = battleView;
});

var battleView = new BattleView("#ddd", malaise, erabor);

view = titleView;