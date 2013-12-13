/// <reference path="../linker.js" />

var lvl2 = (function () {
    var enemy;

    return {
        width: 800,


        init: function () {
            // floor
            var floor1 = new GameObj(
                JQObject.FLOOR,
                -Graphics.projectX,
                FULLH - game.padFloor - 1,
                FULLW / 3,
                game.padFloor + 1
            );
            
            var floor2 = new GameObj(
                JQObject.FLOOR,
                HALFW,
                FULLH - game.padFloor - 1,
                FULLW / 3,
                game.padFloor + 1
            );

            level.objs.push(floor1, floor2);

            // enemy
            enemy = new Enemy(
                new GameObj(JQObject.ENEMY, floor2.pos.x, floor2.pos.y - 38, 28, 38, "cyborgBnW.png"),
                1,
                floor2.pos.x,
                floor2.pos.x + floor2.w - 28,
                JQEnemy.PATROL,
                true
            );
            enemy.collidable = true;
            level.objs.push(enemy);
        },

        deinit: function(){
            enemy = null;
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