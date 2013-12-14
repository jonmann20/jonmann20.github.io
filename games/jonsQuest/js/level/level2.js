/// <reference path="../linker.js" />

var lvl2 = (function () {

    function setBackground() {

    }

    function setObjs() {
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

        return [floor2.pos, floor2.w];
    }

    function setItems() {
        var crate = new GameItem(
            new GameObj(JQObject.CRATE, 206, FULLH - game.padFloor - 26 + 5, 24, 26, "crate.png"),
            true
        );

        level.items.push(crate);
    }

    function setEnemies(f2) {
        // enemy
        var enemy = new Enemy(
            new GameObj(JQObject.ENEMY, f2[0].x, f2[0].y - 38, 28, 38, "cyborgBnW.png"),
            JQEnemy.PATROL,
            1,
            f2[0].x,
            f2[0].x + f2[1] - 28,
            true
        );
        enemy.collidable = true;        // TODO: fix api
        level.enemies.push(enemy);
    }

    return {
        width: 800,


        init: function () {
            level.hiddenItems = 0;

            setBackground();
            var _floor2 = setObjs();
            setItems();
            setEnemies(_floor2);
        },

        deinit: function(){
            
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