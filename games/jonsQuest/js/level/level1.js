/// <reference path="../linker.js" />

var lvl1 = (function () {

    var hiddenCash,
		door,
        ladder,
        doLadder = false,
        scales = [],
        vBar,
        hBar
    ;

    function handleScale() {
        var numCratesOnScales = 0;

        for (var i = 0; i < level.objs.length; ++i) {
            if (level.objs[i].type === JQObject.SCALE &&
                typeof (level.objs[i].holdingItem) !== "undefined" && level.objs[i].holdingItem !== null &&
                level.objs[i].holdingItem.type === JQObject.CRATE
            ) {
                ++numCratesOnScales;
            }
        }

        doLadder = (numCratesOnScales === 2);

        if(doLadder) {
            audio.discovery.play();

            var result = $.grep(level.objs, function (e) {
                return e.type === JQObject.LADDER;
            });
            result[0].visible = true;
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
        for(var i = 0; i < 2; ++i) {
            scales[i] = new GameObj(JQObject.SCALE, 1500 + i * 300, FULLH - game.padFloor - 137, 150, 46);
            scales[i].holdingItem = null;//JQObject.EMPTY; // TODO: fix api
        }

        vBar = new GameObj(JQObject.SCALEBG, 
            scales[0].pos.x + scales[0].w + 70, 
            HALFH - game.padFloor,
            10,
            HALFH
        );
        vBar.collidable = false;

        hBar = new GameObj(JQObject.SCALEBG,
            scales[0].pos.x + scales[0].w / 2,
            HALFH,
            300,
            10
        );
        hBar.x2 = hBar.pos.x + hBar.w;
        hBar.y2 = hBar.pos.y;
        hBar.collidable = false;
        hBar.visible = false;

        scales[0].hBar = hBar;
        scales[0].side = Dir.LEFT;
        scales[0].otherSide = scales[1];

        scales[1].hBar = hBar;
        scales[1].side = Dir.RIGHT;
        scales[1].otherSide = scales[0];

        level.objs.push(vBar, hBar, scales[0], scales[1]);


        // stairs, platform, and door
        var stairs = new GameObj(JQObject.SLOPE, 2143, 208, 252, 62, null, Dir.UP_RIGHT);
        var doorPlat = new GameObj(JQObject.PLATFORM, stairs.pos.x + stairs.w - 11, stairs.pos.y - stairs.h - 5, 200, 62);
        door = new GameObj(JQObject.DOOR, doorPlat.pos.x + doorPlat.w - 63, doorPlat.pos.y - 62 - Graphics.projectY / 2, 33, 62);
        level.objs.push(doorPlat, stairs, door);

        // TODO: move to setItems() ??
        ladder = new GameItem(new GameObj(JQObject.LADDER, stairs.pos.x - 37, stairs.pos.y - 1, 38, FULLH - stairs.pos.y - game.padFloor), false, 0, false);
        ladder.collidable = false;      // allows ladder to not be in normal collision detection
        level.objs.push(ladder);

    }

    function setItems() {        // crates        var crate = [];        for (var i = 0; i < 3; ++i) {
            crate.push(
                new GameItem(
                    new GameObj(JQObject.CRATE, 446, FULLH - game.padFloor - 26 + 5, 34, 37, "crate.png"),
                    true
                )
            );
        }
        crate[1].pos.x = scales[0].pos.x + scales[0].w / 2 - crate[0].w / 2;
        crate[2].pos.x = scales[1].pos.x + scales[1].w / 2 - crate[0].w / 2;        // sack
        var sack = new GameItem(new GameObj(JQObject.SACK, 680, 111 + Graphics.projectY / 2, 30, 34, "sack.png"), false, 5);

        // hidden cash; TODO: only add to level.items after visible???
        hiddenCash = new GameItem(new GameObj(JQObject.CASH, 113, 80, 22, 24, "cash.png"), false, 10, false);

        level.items.push(crate[0], crate[1], crate[2], sack, hiddenCash);
    }

    function setEnemies() {
        var cyborg = new Enemy(
            new GameObj(JQObject.ENEMY, 1200, FULLH - game.padFloor - 55 + Graphics.projectY/2, 40, 55, "cyborgBnW.png"),
            JQEnemy.FOLLOW,
            1,
            1087,
            1600,
            false
        );
        cyborg.collidable = false;  // TODO: fix api        level.enemies.push(cyborg);
    }

    function drawScaleChains(x, y, scale) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(scale.pos.x, scale.pos.y);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(scale.pos.x + scale.w / 2, scale.pos.y);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(scale.pos.x + scale.w, scale.pos.y);
        ctx.stroke();
        ctx.closePath();
    }


    return {
        width: 2650,


        init: function () {
            level.hiddenItems = 1;
            setObjs();            setItems();
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

            if(doLadder) {
                hero.onLadder = SAT.testPolygonPolygon(hero, ladder);
            }
            else {
                handleScale();
            }

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

            //hBar.x2 -= hero.vX;
        },

        render: function () {
            ctx.fillStyle = "#000";
            ctx.fillRect(vBar.x, vBar.y, vBar.w, vBar.h);   // vBar

            ctx.strokeStyle = "#000";
            ctx.lineWidth = 10;

            // hBar
            ctx.beginPath();
            ctx.moveTo(hBar.pos.x, hBar.pos.y);
            ctx.lineTo(hBar.x2, hBar.y2);
            ctx.stroke();
            ctx.closePath();
            
            // left scale
            drawScaleChains(hBar.pos.x, hBar.pos.y, scales[0]);

            // right scale
            drawScaleChains(hBar.x2, hBar.y2, scales[1]);
        }
    };

})();
