/// <reference path="../linker.js" />

var lvl0 = (function () {

    var crates = [],
        cyborg,
		hiddenCash,
		sack,
		door,
        scales = [],
        ladder,
        doLadder = false
    ;

    function handleCrates() {   // TODO: abstract to any item (not just crates)
        // crates and crates
        var response = new SAT.Response();
        for (var i = 0; i < crates.length; ++i) {
            for (var j = 0; j < crates.length; ++j) {
                if (i !== j && !crates[i].holding && !crates[j].holding) {
                    var collided = SAT.testPolygonPolygon(crates[i], crates[j], response);

                    if (collided) {
                        if (response.overlapN.y === 1) {   // a is on top of b
                            response.a.x = response.a.pos.x - response.overlapV.x;
                            response.a.y = response.a.pos.y - response.overlapV.y;

                            response.a.isOnObj = true;
                            response.a.onObj = response.b;
                            response.b.grabbable = false;

                            level.items.push(response.a);
                        }
                        else {
                            //response.a.isOnObj = false;
                        }
                    }

                    response.clear();
                }
            }
        }

        // crates and level; hero and crates
        for (var i = 0; i < crates.length; ++i) {

            if (!crates[i].holding) {
                Physics.lvlObjCollision(crates[i], function (r) {
                    if (r.overlapN.y === 1) {    // crate on top of platform
                        r.a.vY = 0;
                        level.items.push(r.a);
                        r.a.onPlatform = true;
                        r.b.holdingItem = "crate";
                    }
                    //else {
                    //    r.b.holdingItem = "none";
                    //}
                });

                var idx = level.items.indexOf(crates[i]);
                if (idx < 0 && crates[i].onGround) {
                    level.items.push(crates[i]);
                }
            }
            else {
                if (hero.dir === Dir.RIGHT)
                    crates[i].x = hero.x + 22;
                else
                    crates[i].x = hero.x - 22;

                crates[i].y = hero.y;
            }

            crates[i].updatePos();
        }


        // all crates on scale
        if (doLadder) {
            var collided = SAT.testPolygonPolygon(hero, ladder);

            if (collided) {
                hero.onLadder = true;
            }
            else {
                hero.onLadder = false;
            }
        }
        else {
            var numCratesOnScales = 0;
            for (var i = 0; i < level.objs.length; ++i) {
                if (typeof (level.objs[i].type) !== "undefined" && level.objs[i].type === "scale" &&
                    typeof (level.objs[i].holdingItem) !== "undefined" && level.objs[i].holdingItem === "crate") {
                    ++numCratesOnScales;
                }
            }

            doLadder = (numCratesOnScales === 3);
            
            if (doLadder) {
                var result = $.grep(level.objs, function(e){
                    return e.collidable === false;
                });
                result[0].visible = true;
            }

        }
    }


    return {
        width: 2700,


        init: function () {
            // 3 initial platforms
            level.objs.push(
                new SAT.Box(new SAT.Vector(200, 196), 267, 40).toPolygon(),
                new SAT.Box(new SAT.Vector(562, 290), 300, 40).toPolygon(),
                new SAT.Box(new SAT.Vector(600, 95), 200, 40).toPolygon()
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
                level.objs.push(new SAT.Box(new SAT.Vector(stairs.x + run * i, stairs.y - rise * i), run+1, 50).toPolygon());
                stairs.w += run;
                stairs.h += rise;
            }
            
            // platform + door
            level.objs.push(new SAT.Box(new SAT.Vector(stairs.x + stairs.w, stairs.y - stairs.h), 200, 50).toPolygon());
            door = GameItem();
            door.init(
                GameObj(stairs.x + stairs.w + 155, stairs.y - stairs.h - 53, 25, 53, null)
            );

            // sack
            sack = GameItem();
            sack.init(
                GameObj(680, 71, 20, 24, "img/sack.png"),
                5
            );

            // cyborg
            cyborg = Enemy();
            cyborg.init(
                GameObj(1700, FULLH - game.padFloor - 38 + 1, 28, 38, "img/cyborgBnW.png"), 
                1
            );
            

            // hidden cash
            hiddenCash = GameItem();
            hiddenCash.init(
                GameObj(140, 50, 22, 24, "img/cash.png"), 
                10, 
                false
            );

            // add objects to the level
            level.objs.push(
                sack,
                cyborg,
                hiddenCash,
                door
            );

            ladder = GameItem();
            ladder.init(
                GameObj(stairs.x - 67, stairs.y-1, 68, FULLH - stairs.y - game.padFloor , null),
                0,
                false,
                true
            );
            ladder.collidable = false;      // TODO: make better api; allows ladder to not be in normal collision detection
            ladder.type = "ladder";
            level.objs.push(ladder);

            // scales; TODO: shouldn't be GameItem??
            for (var i = 0; i < 3; ++i) {
                scales[i] = new GameItem();
                scales[i].init(
                    GameObj(door.x + 350 + i*220, FULLH - game.padFloor - 110, 150, 40, null),
                    0,
                    true,
                    true
                );
                scales[i].type = "scale";
                scales[i].holdingItem = "none";
                level.objs.push(scales[i]);
            }                        // crates            for (var i = 0; i < 3; ++i) {
                crates[i] = GameItem();
                crates[i].init(
                    GameObj(700, FULLH - game.padFloor - 26, 24, 26, "img/crate.png"),
                    0,
                    true,
                    true
                );
                crates[i].item_t = "crate";     // TODO: make better api
            }
            crates[1].x = scales[1].x + scales[1].w / 2 - crates[0].w/2;
            crates[2].x = scales[2].x + scales[2].w / 2 - crates[0].w / 2;

            for (var i = 0; i < crates.length; ++i) {
                level.items.push(crates[i]);
            }
        },

        update: function () {
            hiddenCash.updatePos();
            cyborg.update();


            // crates
            handleCrates();

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
                alert("Level 1 completed");
                location.reload();
                game.over = true;
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

            Graphics.drawDoor(door.x, door.y, door.w, door.h);

            // crates
            for (var i = 0; i < crates.length; ++i) {
                if (!crates[i].holding) {
                    crates[i].draw();
                }
                else {
                    if (hero.vX === 0) {
                        crates[i].x = hero.x + 2;
                        crates[i].y = hero.y + 11;
                    }
                }
            }
        }
    };

})();
