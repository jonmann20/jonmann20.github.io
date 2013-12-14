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
            var floor = new GameObj(JQObject.FLOOR, -Graphics.projectX, FULLH - game.padFloor - 1, lvl1.width + Graphics.projectX * 2, game.padFloor + 1);
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
                level.bg[0].push(new GameObj(JQObject.CLOUD, x, 60 + fixY, 0, 0, "cloud.png"));        // TODO: convert api to get w/h
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
                level.bg[1].push(new GameObj(JQObject.SMALL_CLOUD, x, 100 + fixY, 0, 0, "cloud_small.png"));        // TODO: convert api to get w/h
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
            door = new GameItem(new GameObj(JQObject.DOOR, stairs.x + stairs.w + 155, stairs.y - stairs.h - 53, 25, 53));

            // cyborg
            cyborg = new Enemy(
                new GameObj(JQObject.ENEMY, 1600, FULLH - game.padFloor - 38 + 5, 28, 38, "cyborgBnW.png"),
                1,
                1087,
                1600,
                JQEnemy.FOLLOW,
                false
            );
            cyborg.collidable = false;

            // add objects to the level
            level.objs.push(
                cyborg
                //door
            );

            ladder = new GameItem(new GameObj(JQObject.LADDER, stairs.x - 37, stairs.y - 1, 38, FULLH - stairs.y - game.padFloor), false, 0, false);
            //ladder.collidable = false;      // allows ladder to not be in normal collision detection; TODO: make better api
            //level.objs.push(ladder);

            // scales; TODO: shouldn't be GameItem??
            for (var i = 0; i < 3; ++i) {
                scales[i] = new GameItem(
                    new GameObj(JQObject.SCALE, door.pos.x + 350 + i * 220, FULLH - game.padFloor - 107, 150, 36),
                    false,
                    0,
                    true
                );
                scales[i].holdingItem = JQObject.EMPTY; // TODO: make better api
                //level.objs.push(scales[i]);
            }            //--------------- Game Items ---------------\\            // sack
            sack = new GameItem(new GameObj(JQObject.SACK, 680, 111 + Graphics.projectY / 2, 20, 24, "sack.png"), false, 5);
            hiddenCash = new GameItem(new GameObj(JQObject.CASH, 113, 80, 22, 24, "cash.png"), false, 10, false);            // crates            for (var i = 0; i < 1; ++i) {
                level.crates[i] = new GameItem(
                    new GameObj(JQObject.CRATE, 446, FULLH - game.padFloor - 26 + 5, 24, 26, "crate.png"),
                    true,
                    0,
                    true
                );
            }
            //level.crates[1].pos.x = scales[1].pos.x + scales[1].w / 2 - level.crates[0].w / 2;
            //level.crates[2].pos.x = scales[2].pos.x + scales[2].w / 2 - level.crates[0].w / 2;

            for (var i = 0; i < level.crates.length; ++i) {
                level.items.push(level.crates[i]);
            }
            level.items.push(sack, hiddenCash);
        },

        deinit: function(){
            cyborg = null;
            hiddenCash = null;
            sack = null;
            door = null;
            scales = [];
            ladder = null;
            doLadder = false;
        },

        update: function () {
            if (window.DEBUG) {
                level.complete();
            }

            cyborg.update();

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

            // cyborg; TODO: should be a level.enemies[]
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
            if(!cyborg.deadOffScreen)
                cyborg.draw();

            Graphics.drawDoor(door.pos.x, door.pos.y, door.w, door.h);
        }
    };

})();
