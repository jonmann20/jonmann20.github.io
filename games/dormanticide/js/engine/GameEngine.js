/// <reference path="../linker.js" />

var GameEngine = function () {

    canvas = document.getElementsByTagName("canvas")[0];
    ctx = canvas.getContext("2d");

    input = new Input();

    var actions = [FightAction.TACKLE, FightAction.DRAGONS_BREATH, null, null];

    var malaise = new Dormant("malaise.png", "MALAISE", 12, 8, 27, actions);
    var erabor = new Dormant("erabor.png", "ERABOR", 8, 12, 23, actions);
    view = new BattleView("#ddd", malaise, erabor);




    function update() {
        //input.update();
        view.update();
    }

    function render() {
        requestAnimationFrame(render);
        view.render();
    }

    return {
        start: function () {
            setInterval(update, 1000 / 60);
            requestAnimationFrame(render);
        },

        stop: function () {

        }
    };
};