/// <reference path="../linker.js" />

var lvl1 = (function () {

    var hiddenCash,
		door,
        ladder,
        doLadder = false,
        scaleBg
    ;

    function handle_crates_scale_ladder() {
        // all crates on scale
        if (doLadder) {
            hero.onLadder = SAT.testPolygonPolygon(hero, ladder);
        }
        else {
            var numCratesOnScales = 0;
            for (var i = 0; i < level.objs.length; ++i) {
                if (level.objs[i].type === JQObject.SCALE &&
                    typeof (level.objs[i].holdingItem) !== "undefined" && level.objs[i].holdingItem === JQObject.CRATE
                ) {
                    ++numCratesOnScales;
                }
            }

            doLadder = (numCratesOnScales === 3);

            if (doLadder) {
                var result = $.grep(level.objs, function (e) {
                    return e.type === JQObject.LADDER;
                });
                result[0].visible = true;
            }
        }
    }


    function setBackground() {
        //---- color layer
        level.bgColor.gradX = door.pos.x + door.w/2;
        level.bgColor.gradY = door.pos.y + door.h/2;

        level.bgColor.fillStyle = Graphics.getDoorBgGrad();

        //---- objects
        Graphics.setClouds();
    }

    function setObjs() {

        // floor + 3 initial platforms
        level.objs.push(
            new GameObj(JQObject.PLATFORM, -Graphics.projectX, FULLH - game.padFloor - 1, lvl1.width + Graphics.projectX * 2, game.padFloor + 1),
            new GameObj(JQObject.PLATFORM, 200, 206, 267, 62),
            new GameObj(JQObject.PLATFORM, 575, 310, 300, 62),
            new GameObj(JQObject.PLATFORM, 605, 125, 220, 62)
        );

        // scales
        scaleBg = new GameObj(JQObject.EMPTY, 1950, 160, 519, 337, "scales.png");
        scaleBg.collidable = false;
        level.objs.push(scaleBg);

        var scales = [];
        for (var i = 0; i < 3; ++i) {
            scales[i] = new GameObj(JQObject.SCALE, lvl1.width - 330 - i * 230, FULLH - game.padFloor - 137, 150, 46);
            scales[i].holdingItem = JQObject.EMPTY; // TODO: fix api
            level.objs.push(scales[i]);
        }


        // stairs, platform, and door
        var stairs = new GameObj(JQObject.SLOPE, 1243, 208, 252, 62);
        var doorPlat = new GameObj(JQObject.PLATFORM, stairs.pos.x + stairs.w - 11, stairs.pos.y - stairs.h - 5, 200, 62);
        door = new GameObj(JQObject.DOOR, doorPlat.pos.x + doorPlat.w - 63, doorPlat.pos.y - 62 - Graphics.projectY / 2, 33, 62);
        level.objs.push(doorPlat, stairs, door);

        // TODO: move to setItems()
        ladder = new GameItem(new GameObj(JQObject.LADDER, stairs.pos.x - 37, stairs.pos.y - 1, 38, FULLH - stairs.pos.y - game.padFloor), false, 0, false);
        ladder.collidable = false;      // allows ladder to not be in normal collision detection
        level.objs.push(ladder);

        return [scales[1].pos.x + scales[1].w / 2, scales[2].pos.x + scales[2].w / 2];
    }

    function setItems(scalePos) {        // crates        var crate = [];        for (var i = 0; i < 3; ++i) {
            crate.push(
                new GameItem(
                    new GameObj(JQObject.CRATE, 446, FULLH - game.padFloor - 26 + 5, 34, 37, "crate.png"),
                    true
                )
            );
        }
        crate[1].pos.x = scalePos[0] - crate[0].w / 2;
        crate[2].pos.x = scalePos[1] - crate[0].w / 2;        // sack
        var sack = new GameItem(new GameObj(JQObject.SACK, 680, 111 + Graphics.projectY / 2, 30, 34, "sack.png"), false, 5);

        // hidden cash; TODO: only add to level.items after visible???
        hiddenCash = new GameItem(new GameObj(JQObject.CASH, 113, 80, 22, 24, "cash.png"), false, 10, false);

        level.items.push(crate[0], crate[1], crate[2], sack, hiddenCash);
    }

    function setEnemies() {
        var cyborg = new Enemy(
            new GameObj(JQObject.ENEMY, 1600, FULLH - game.padFloor - 55 + Graphics.projectY/2, 40, 55, "cyborgBnW.png"),
            JQEnemy.FOLLOW,
            1,
            1087,
            1600,
            false
        );
        cyborg.collidable = false;  // TODO: fix api        level.enemies.push(cyborg);
    }


    return {
        width: 2700,


        init: function () {
            level.hiddenItems = 1;
            var scalePos = setObjs();            setItems(scalePos);
            setEnemies();

            setBackground();
        },

        deinit: function(){
            hiddenCash = null;
            door = null;
            ladder = null;
            doLadder = false;
        },

        update: function () {
            // TODO: move to better location
            if (window.DEBUG) {
                level.complete();
            }

            handle_crates_scale_ladder();

            // hidden cash
            if (!hiddenCash.visible) {
                for (var i = 0; i < hero.bulletArr.length; ++i) {
                    if (Physics.isCollision(hero.bulletArr[i], hiddenCash, -17)) {
                        hiddenCash.visible = true;
                        audio.discovery.play();
                        ++level.hiddenItemsFound;
                    }
                }
            }

            // door
            if (!game.over && Physics.isCollision(hero, door, 0)) {     // TODO: why checking game.over???
                level.complete();
            }
        },

        render: function () {
           
        }
    };

})();
