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
            FULLH - game.padFloor,
            FULLW / 3 + 40,
            game.padFloor
        );

        var floor2 = new GameObj(
            JQObject.PLATFORM,
            HALFW,
            FULLH - game.padFloor,
            120,
            game.padFloor
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
            colL.pos.y - 135,
            443,
            30
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
            elevator[i] = new GameObj(JQObject.ELEVATOR, colR.pos.x + 200 + i * 300, colR.pos.y - i*50, 200, 40);
            elevator[i].dir = Dir.DOWN;
            level.objs.push(elevator[i]);
        }


        var hillArr = Graphics.getHill(bridge.pos.x + 140, bridge.pos.y + 6, 180, 40);
        for(var i = 0; i < hillArr.length; ++i) {
            hillArr[i].type = JQObject.HILL;
            level.objs.push(hillArr[i]);
        }


        // after elevators
        var aPlat = new GameObj(
            JQObject.PLATFORM,
            elevator[2].pos.x + 270,
            FULLH - game.padFloor,
            943,
            game.padFloor
        );
        level.objs.push(aPlat);

        var hillArr2 = Graphics.getHill(aPlat.pos.x + 400, floor1.pos.y + 6, 280, 70);
        for(var i = 0; i < hillArr.length; ++i) {
            hillArr2[i].type = JQObject.HILL;
            level.objs.push(hillArr2[i]);
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
            new GameObj(JQObject.ENEMY, 834, 404, 40, 55, "cyborgBnW.png"),
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
        width: 4700,


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

                elevator[i].vY = (elevator[i].dir === Dir.DOWN) ? 1 : -1;   // used by hero
                elevator[i].pos.y += elevator[i].vY;
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