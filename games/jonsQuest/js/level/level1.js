/// <reference path="../linker.js" />

var lvl1 = (function () {

    var cyborg,
		hiddenCash,
		sack,
		door,
        scales = [],
        ladder,
        doLadder = false
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

    return {
        width: 2700,


        init: function () {
            level.hiddenItems = 1;

            // floor
            // x/y dep on projectX/Y
            var floor = new GameObj(-Graphics.projectX, FULLH - game.padFloor - 1, lvl1.width + Graphics.projectX*2, game.padFloor + 1, JQObject.FLOOR);
            level.objs.push(floor);

            // background
            var i = 0,
                x1offset = HALFW/1.2,
                x2offset = HALFW/2.7,
                x = 60 - x1offset,
                fixY
            ;

            while (x < this.width) {
                fixY = (++i % 2 == 0) ? 100 : 0;
                x += x1offset;
                level.bg[0].push(new GameObj(x, 60 + fixY, 0, 0, JQObject.CLOUD, "img/cloud.png"));        // TODO: convert api to get w/h and auto look in /img
            }

            x = 0;
            while (x < this.width) {
                if (++i % 2 == 0)
                    fixY = 70
                else if (i % 3 == 0)
                    fixY = 140
                else
                    fixY = 10
                
                x += x2offset;
                level.bg[1].push(new GameObj(x, 100 + fixY, 0, 0, JQObject.SMALL_CLOUD, "img/cloud_small.png"));        // TODO: convert api to get w/h and auto look in /img
            }


            // 3 initial platforms
            level.objs.push(
                Graphics.getSkewedRect(200, 216, 267, 50),
                Graphics.getSkewedRect(562, 315, 300, 50),
                Graphics.getSkewedRect(585, 135, 220, 50)
            );

            // stairs
            var stairs = {
                x: 1160,
                y: 210,
                w: 0,
                h: 0
            };

            var rise = 5,   // delta h between steps
                run = 17    // delta w between steps
            ;

            for (var i = 0; i < 15; ++i) {
                level.objs.push(Graphics.getSkewedRect(stairs.x + run * i, stairs.y - rise * i, run+1, 50));
                stairs.w += run;
                stairs.h += rise;
            }

            // platform + door
            level.objs.push(Graphics.getSkewedRect(stairs.x + stairs.w, stairs.y - stairs.h, 200, 50));
            door = new GameItem(new GameObj(stairs.x + stairs.w + 155, stairs.y - stairs.h - 53, 25, 53, JQObject.DOOR));

            // sack
            sack = new GameItem(new GameObj(680, 111 + Graphics.projectY/2, 20, 24, JQObject.SACK, "img/sack.png"), 5);
            sack.collidable = false;
            
            // cyborg
            cyborg = new Enemy(
                new GameObj(1600, FULLH - game.padFloor - 38 + 5, 28, 38, JQObject.ENEMY, "img/cyborgBnW.png"),
                1,
                1087,
                1600,
                true
            );
            cyborg.collidable = false;

            // hidden cash
            hiddenCash = new GameItem(new GameObj(113, 80, 22, 24, JQObject.CASH, "img/cash.png"), 10, false);
            hiddenCash.collidable = false;  // TODO: should remove from level.objs after collected

            // add objects to the level
            level.objs.push(
                sack,
                cyborg,
                hiddenCash,
                door
            );

            ladder = new GameItem(new GameObj(stairs.x - 37, stairs.y - 1, 38, FULLH - stairs.y - game.padFloor, JQObject.LADDER), 0, false, true);
            ladder.collidable = false;      // allows ladder to not be in normal collision detection; TODO: make better api
            level.objs.push(ladder);

            // scales; TODO: shouldn't be GameItem??
            for (var i = 0; i < 3; ++i) {
                scales[i] = new GameItem(
                    new GameObj(door.pos.x + 350 + i*220, FULLH - game.padFloor - 107, 150, 36, JQObject.SCALE),
                    0,
                    true,
                    true
                );
                scales[i].holdingItem = JQObject.EMPTY; // TODO: make better api
                level.objs.push(scales[i]);
            }            // crates            for (var i = 0; i < 3; ++i) {
                level.crates[i] = new GameItem(
                    new GameObj(446, FULLH - game.padFloor - 26 + 5, 24, 26, JQObject.CRATE, "img/crate.png"),
                    0,
                    true,
                    true
                );
            }
            level.crates[1].pos.x = scales[1].pos.x + scales[1].w / 2 - level.crates[0].w / 2;
            level.crates[2].pos.x = scales[2].pos.x + scales[2].w / 2 - level.crates[0].w / 2;

            for (var i = 0; i < level.crates.length; ++i) {
                level.items.push(level.crates[i]);
            }
        },

        update: function () {

            if (window.DEBUG) level.complete();

            hiddenCash.updatePos();
            cyborg.update();

            handle_crates_scale_ladder();

            // sack
            if (!sack.collected) {
                if (Physics.isCollision(hero, sack, 0)) {
                    sack.collected = true;
                    audio.itemPickedUp.play();

                    hero.ammo += sack.val;
                }
            }

            // hidden cash
            if (!hiddenCash.visible) {
                for (var i = 0; i < hero.bulletArr.length; ++i) {
                    if (Physics.isCollision(hero.bulletArr[i], hiddenCash, -17)) {
                        hiddenCash.visible = true;
                        audio.discovery.play();
                    }
                }
            }
            else if (!hiddenCash.collected) {

                if (hiddenCash.visible) {
                    hiddenCash.vY += game.gravity;
                }

                if (Physics.isCollision(hero, hiddenCash, 0)) {
                    hiddenCash.collected = true;
                    audio.itemPickedUp.play();
                    hero.cash += hiddenCash.val;
                    ++level.hiddenItemsFound;
                }
            }

            // cyborg
            if (cyborg.health > 0) {
                // hero and cyborg
                if (Physics.isCollision(hero, cyborg, 0)) {
                    cyborg.active = true;
                    
                    if (!hero.invincible) {
                        audio.play(audio.heartbeat, true);

                        hero.invincible = true;
                        --hero.health;
                    }
                }

                // bullets and cyborg
                for (var i = 0; i < hero.bulletArr.length; ++i) {
                    var wasCollision = false;

                    if (Physics.isCollision(hero.bulletArr[i], cyborg, 0)) {
                        wasCollision = true;
                        audio.play(audio.thud, true);
                    }

                    if (wasCollision) {
                        cyborg.active = true;

                        hero.bulletArr.splice(i, 1); // remove ith item
                        --cyborg.health;

                        if (cyborg.health <= 0) {
                            cyborg.death();
                        }
                    }
                }
            }

            // door
            if (!game.over && Physics.isCollision(hero, door, 0)) {
                level.complete();
            }
        },

        render: function () {
            //---- level objects/items
            if (!sack.collected)
                sack.draw();

            if(hiddenCash.visible)
                hiddenCash.draw();

            if(!cyborg.deadOffScreen)
                cyborg.draw();

            Graphics.drawDoor(door.pos.x, door.pos.y, door.w, door.h);

            // crates
            for (var i = 0; i < level.crates.length; ++i) {
                if (!level.crates[i].holding) {
                    level.crates[i].draw();
                }
                else {
                    if (hero.vX === 0) {
                        level.crates[i].pos.x = hero.pos.x + 2;
                        level.crates[i].pos.y = hero.pos.y + 11;
                    }
                }
            }
        }
    };

})();
