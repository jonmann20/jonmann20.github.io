/// <reference path="../linker.js" />

var lvl2 = (function () {

    var elevator = [];

    function setBackground() {
        level.bgColor.gradX = 0;
        level.bgColor.gradY = 0;

        level.bgColor.fillStyle = Graphics.getDoorBgGrad();
        Graphics.setClouds();
    }

    function setObjs() {
        // floor
        var floor1 = new GameObj(
            JQObject.PLATFORM,
            -Graphics.projectX,
            FULLH - game.padFloor - 1,
            FULLW / 3 + 40,
            game.padFloor + 1
        );

        var floor2 = new GameObj(
            JQObject.PLATFORM,
            HALFW,
            FULLH - game.padFloor - 1,
            120,
            game.padFloor + 1
        );

        var floorPlat = new GameObj(
            JQObject.PLATFORM,
            floor2.pos.x + floor2.w - Graphics.projectX,
            floor2.pos.y - floor2.h - 30,
            900,
            180
        );

        var colL = new GameObj(
            JQObject.PLATFORM,
            floorPlat.pos.x + floor2.w,
            floorPlat.pos.y - 90 + Graphics.projectY,
            100,
            85
        );

        var colR = new GameObj(
            JQObject.PLATFORM,
            floorPlat.pos.x + floor2.w + 680,
            floorPlat.pos.y - 90 + Graphics.projectY,
            100,
            85
        );

        var bridge = new GameObj(
            JQObject.PLATFORM,
            colL.pos.x + 170,
            colL.pos.y - 125,
            443,
            50
        );

        level.objs.push(
            floorPlat,
            floor1,
            floor2,
            colL,
            colR,
            bridge
        );

        // elevators
        for(var i = 0; i < 3; ++i) {
            elevator[i] = new GameObj(JQObject.PLATFORM, colR.pos.x + 200 + i * 300, colR.pos.y - i*50, 200, 40);
            elevator[i].dir = Dir.DOWN;
            level.objs.push(elevator[i]);
        }

    }

    function setItems() {
        //var crate = new GameItem(
        //    new GameObj(JQObject.CRATE, 206, FULLH - game.padFloor - 26 + 5, 24, 26, "crate.png"),
        //    true
        //);

        var sack = new GameItem(
            new GameObj(JQObject.SACK, 1200, 302, 30, 36, "sack.png"),
            true,
            5
        );

        level.items.push(sack);
    }

    function setEnemies(f2) {
        var enemy = new Enemy(
            new GameObj(JQObject.ENEMY, 834, 391 - Graphics.projectY, 55, 76, "cyborgBnW.png"),
            JQEnemy.PATROL,
            1,
            834,
            1369,
            true
        );
        enemy.collidable = true;        // TODO: fix api
        level.enemies.push(enemy);
    }

    return {
        width: 2700,


        init: function () {
            level.hiddenItems = 0;

            setBackground();
            setObjs();
            setItems();
            setEnemies();
        },

        deinit: function(){
            
        },

        update: function() {
            // elevators
            for(var i = 0; i < elevator.length; ++i) {
                if(elevator[i].dir === Dir.UP && elevator[i].pos.y < 100) {
                    elevator[i].dir = Dir.DOWN;
                }
                else if(elevator[i].dir === Dir.DOWN && elevator[i].pos.y > 400) {
                    elevator[i].dir = Dir.UP;
                }

                elevator[i].pos.y += (elevator[i].dir === Dir.DOWN) ? 1 : -1;
            }
        },

        render: function() {
            if(!window.DEBUG) {
                ctx.font = "18px 'Press Start 2P'";
                var lvlTxt = "LEVEL 2 -- COMING SOON";
                var lvlTxtW = ctx.measureText(lvlTxt).width;
                ctx.fillStyle = "#e1e1e1";
                ctx.fillText(lvlTxt, HALFW - lvlTxtW / 2, 150);
            }
        }
    };
})();