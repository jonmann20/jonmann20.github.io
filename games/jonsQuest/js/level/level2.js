/// <reference path="../linker.js" />

var lvl2 = (function () {

    var floor1,
        hill,
        floorPlat,
        colL,
        colR,
        bridge,
        elevator = [],
        wall,
        slope,
        door
    ;


    function setBackground() {
        level.bgColor.gradX = door.pos.x;
        level.bgColor.gradY = door.pos.y;

        level.bgColor.fillStyle = Graphics.getDoorBgGrad();
        Graphics.setClouds();
    }

    function setObjs() {
        floor1 = new GameObj(
            JQObject.PLATFORM,
            -Graphics.projectX,
            FULLH - game.padFloor,
            FULLW - 250,
            game.padFloor
        );

        hill = new GameObj(
            JQObject.HILL,
            200,
            FULLH - game.padFloor,
            320,
            60
        );

        floorPlat = new GameObj(
            JQObject.PLATFORM,
            floor1.pos.x + floor1.w - Graphics.projectX,
            floor1.pos.y - floor1.h - 30,
            1000,
            180
        );

        colL = new GameObj(
            JQObject.PLATFORM,
            floorPlat.pos.x + 240,
            floorPlat.pos.y - 90 + Graphics.projectY,
            100,
            85
        );

        colR = new GameObj(
            JQObject.PLATFORM,
            floorPlat.pos.x + floorPlat.w - 100,
            floorPlat.pos.y - 90 + Graphics.projectY,
            100,
            85
        );

        bridge = new GameObj(
            JQObject.PLATFORM,
            colL.pos.x + 140,
            colL.pos.y - 137,
            480,
            30
        );

        level.objs.push(
            floorPlat,
            floor1,
            hill,
            colL,
            colR,
            bridge
        );

        // elevators
        for(var i = 0; i < 3; ++i) {
            elevator[i] = new GameObj(JQObject.ELEVATOR, colR.pos.x + 237 + i * 300, colR.pos.y - i*80, 115, 26);
            elevator[i].dir = Dir.DOWN;
            level.objs.push(elevator[i]);
        }

        wall = new GameObj(JQObject.PLATFORM, elevator[2].pos.x + elevator[2].w + 120, 190, 100, FULLH - 190);
        slope = new GameObj(JQObject.SLOPE, wall.pos.x + wall.w - Graphics.projectX, wall.pos.y, 500, FULLH - 190, null, Dir.DOWN_RIGHT);
        
        var platty = new GameObj(JQObject.PLATFORM, slope.pos.x + slope.w - Graphics.projectX - 1, FULLH - game.padFloor, 600, game.padFloor);
        var hilly = new GameObj(JQObject.HILL, platty.pos.x + platty.w - 205, FULLH - game.padFloor, 200, 30);

        var platty2 = new GameObj(JQObject.PLATFORM, platty.pos.x + platty.w + 150, FULLH - game.padFloor, 500, game.padFloor);

        door = new GameObj(JQObject.DOOR, platty2.pos.x + 300, FULLH - game.padFloor - 100, 40, 100);

        level.objs.push(platty, slope, wall, hilly, platty2, door);

    }

    function setItems() {
        var sack = new GameItem(
            new GameObj(JQObject.SACK, colL.pos.x + 300, 302, 30, 36, "sack.png"),
            true,
            5
        );

        level.items.push(sack);
    }

    function setEnemies() {
        var enemy = new Enemy(
            new GameObj(JQObject.ENEMY, colL.pos.x + colL.w, 404, 40, 55, "cyborgBnW.png"),
            JQEnemy.PATROL,
            1,
            colL.pos.x + colL.w,
            colR.pos.x - 55/2,
            true
        );
        enemy.collidable = true;        // TODO: fix api
        level.enemies.push(enemy);
    }

    return {
        width: 4500,


        init: function () {
            level.hiddenItems = 0;

            setObjs();
            setItems();
            setEnemies();

            setBackground();
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

            if(SAT.testPolygonPolygon(hero, door)) {
                level.complete();
            }

        },

        render: function() {

        }
    };
})();