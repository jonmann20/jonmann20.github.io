/// <reference path="../linker.js" />

var lvl2 = (function () {
    var enemy;

    return {
        width: 800,


        init: function () {
            // floor
            var floor1 = new GameObj(
                -Graphics.projectX,
                FULLH - game.padFloor - 1,
                FULLW / 3,
                game.padFloor + 1,
                JQObject.FLOOR
            );
            
            var floor2 = new GameObj(
                HALFW,
                FULLH - game.padFloor - 1,
                FULLW / 3,
                game.padFloor + 1,
                JQObject.FLOOR
            );

            level.objs.push(floor1, floor2);

            // enemy
            enemy = new Enemy(
                new GameObj(floor2.pos.x, floor2.pos.y - 38, 28, 38, JQObject.ENEMY, "img/cyborgBnW.png"),
                1,
                floor2.pos.x,
                floor2.pos.x + floor2.w - 28,
                true
            );
            enemy.collidable = false;
            level.objs.push(enemy);
        },

        update: function(){
            enemy.update();
        },

        render: function () {
            ctx.font = "18px 'Press Start 2P'";
            
            var lvlTxt = "LEVEL 2 -- COMING SOON";
            var lvlTxtW = ctx.measureText(lvlTxt).width;
            ctx.fillStyle = "#e1e1e1";
            ctx.fillText(lvlTxt, HALFW - lvlTxtW / 2, 150);





            if (!enemy.deadOffScreen)
                enemy.draw();
        }
    };
})();