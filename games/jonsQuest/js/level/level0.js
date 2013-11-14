/// <reference path="../linker.js" />

var lvl0 = (function () {

    var crate,
        cyborg,
		hiddenCash,
		sack,
		door,
        scale
    ;

    function handleCrate() {
        if (!crate.holding) {
            Physics.lvlObjCollision(crate, function (r) {
                if (r.overlapN.y === 1) {    // crate on top of platform
                    crate.vY = 0;      // (wrong location??)
                    level.items.push(crate);
                }
            });

            var idx = level.items.indexOf(crate);
            if (idx < 0 && crate.onGround) {
                level.items.push(crate);
            }
        }
        else {
            if (hero.dir === Dir.RIGHT)
                crate.x = hero.x + 22;
            else
                crate.x = hero.x - 22;

            crate.y = hero.y;
        }
        
        crate.updatePos();
    }


    return {
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
                GameObj(stairs.x + stairs.w + 155, stairs.y - stairs.h - 53, 25, 60, null)
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
            // crate 1            crate = GameItem();
            crate.init(
                GameObj(600, FULLH - game.padFloor - 26, 24, 26, "img/crate.png"),
                0,
                true,
                true
            );
            crate.item_t = "crate";

            // scale
            // TODO: split into 3 scale platforms
            scale = GameItem(); 
            scale.init(
                GameObj(door.x + 330, FULLH - game.padFloor - 210, 450, 210, null),
                0,
                true,
                true
            );


            // add objects to the level
            level.objs.push(
                sack,
                cyborg,
                hiddenCash,
                door,
                scale
            );

            // add movable items to the level
            level.items.push(
                crate
            );
        },

        update: function () {
            hiddenCash.updatePos();
            cyborg.update();


            // crate
            handleCrate();

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
            if (Physics.isCollision(hero, door, 0)) {
                alert("Level 1 completed");
            }
        },

        render: function () {
            // level background
            ctx.fillStyle = Color.LIGHT_GREEN;
            ctx.fillRect(0, 0, FULLW, FULLH - game.padFloor - 1);


            // level objects/items
            if (!sack.collected)
                sack.draw();

            if(hiddenCash.visible)
                hiddenCash.draw();

            if(!cyborg.deadOffScreen)
                cyborg.draw();

            Graphics.drawDoor(door.x, door.y, door.w, door.h);
            scale.draw();

            if (!crate.holding) {
                crate.draw();
            }
            else {
                if (hero.vX === 0) {
                    crate.x = hero.x + 2;
                    crate.y = hero.y + 11;
                }
            }
        }
    };

})();
