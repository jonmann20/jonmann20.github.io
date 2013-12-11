/// <reference path="../linker.js" />

var lvl2 = (function () {


    return {
        width: 800,


        init: function () {
            var floor1 = new GameObj(0 - 9, FULLH - game.padFloor - 1, FULLW / 3, game.padFloor, JQObject.FLOOR);
            var floor2 = new GameObj(0 - 9 + HALFW, FULLH - game.padFloor - 1, FULLW / 3, game.padFloor, JQObject.FLOOR);
            level.objs.push(floor1, floor2);
        },

        update: function(){

        },

        render: function () {
            ctx.font = "18px 'Press Start 2P'";
            
            var lvlTxt = "LEVEL 2 -- COMING SOON";
            var lvlTxtW = ctx.measureText(lvlTxt).width;
            ctx.fillStyle = "#e1e1e1";
            ctx.fillText(lvlTxt, HALFW - lvlTxtW / 2, 150);
        }
    };
})();