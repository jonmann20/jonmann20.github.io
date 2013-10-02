var lvl0 = (function () {

    var cyborg = null,
		hiddenCash = null,
		sack = null,
		belt = null,
		belt2 = null
    ;
    var k = [];
    var m = -0.52845528455;
    
    function beltPhysics() {
        if (Physics.isCollision(hero, belt, 0)) {
            hero.isJumping = false;
            hero.onObj = true;

            var b = belt.initY + belt.h - hero.h;
            var x = Math.abs(hero.lvlX - 680); // 680 is the init hero.lvlX when you enter the box from the left
            
            hero.y = m * x + b;
            hero.onObjY = hero.y;
        }
    }


    return {
        init: function () {
            sack = GameItem();
            sack.init(
                GameObj(680, 71, 20, 24, "img/sack.png"),
                5
            );

            cyborg = Enemy();
            cyborg.init(
                GameObj(2100, FULLH - game.padFloor - 38 + 1, 28, 38, "img/cyborgBnW.png"), 
                1
            );

            hiddenCash = GameItem();
            hiddenCash.init(
                GameObj(140, 50, 22, 24, "img/cash.png"), 
                10, 
                false
            );
            lvl0.crate = GameItem();
            lvl0.crate.init(
                GameObj(500, FULLH - game.padFloor - 26, 24, 26, "img/crate.png")
            );

            belt = GameObj(1100, 80, 340, 190, "img/belt.png");
        },

        update: function () {
            
            hiddenCash.updatePos();
            cyborg.update();

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
                        hiddenCash.vY = 4;

                        audio.discovery.play();
                    }
                }
            }
            else if (!hiddenCash.collected) {
                if (Physics.isCollision(hero, hiddenCash, 0)) {
                    hiddenCash.collected = true;
                    audio.itemPickedUp.play();
                    hero.cash += hiddenCash.val;
                }
            }

            // crate
            if (!lvl0.crate.holding) {
                if (Physics.isCollision(hero, lvl0.crate, 12)) {
                    hero.isCarrying = true;
                    lvl0.crate.holding = true;
                    lvl0.crate.vY = 6.5;
                }
            }
            else {
                if (hero.dir == Dir.RIGHT)
                    lvl0.crate.x = hero.x + 22;
                else
                    lvl0.crate.x = hero.x - 22;

                lvl0.crate.y = hero.y;
            }
            lvl0.crate.updatePos();



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


                beltPhysics();
            }

        },

        updateObjs: function () {
            var fix = (hero.vX / game.fps);
            
            sack.x -= fix;
            cyborg.x -= fix;
            hiddenCash.x -= fix;
            belt.x -= fix;
            lvl0.crate.x -= fix;
        },

        render: function () {

            if (!sack.collected)
                sack.draw();

            hiddenCash.draw();
            cyborg.draw();

            //if (game.totalTicks % 60 === 0)
            //    belt.draw(with differnt sprite);
            //else
                belt.draw();

            if (!lvl0.crate.holding) {
                lvl0.crate.draw();
            }
            else {
                if (hero.vX === 0) {
                    lvl0.crate.x += (hero.dir == Dir.RIGHT) ? -20 : 24;
                    lvl0.crate.y += 6;
                }
            }

            for(var i=0; i < k.length; ++i){
                k[i].draw();
            }

        }
    };

})();

//@ sourceURL=level0.js
