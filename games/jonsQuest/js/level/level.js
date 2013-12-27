/// <reference path="../linker.js" />

var level = (function () {

    var maxVy = 10; // applys to GameObj's and GameItem's


    /********** Update **********/
    function updateObjsView() {
        for (var i = 0; i < level.objs.length; ++i) {
            level.objs[i].pos.x -= hero.vX;
        }
    }

    function updateItemsView() {
        for (var i = 0; i < level.items.length; ++i) {
            level.items[i].pos.x -= hero.vX;
        }
    }

    function updateBgView() {
        // color layer
        level.bgColor.gradX -= hero.vX;
        level.bgColor.fillStyle = Graphics.getDoorBgGrad();

        // objects
        for(var i = 0; i < level.bg.length; ++i) {
            level.bg[i].pos.x -= hero.vX / level.bg[i].speed;
        }

    }

    function updateEnemiesView() {
        for (var i = 0; i < level.enemies.length; ++i) {
            level.enemies[i].pos.x -= hero.vX;
        }
    }


    function updateItems() {
        for (var i = 0; i < level.items.length; ++i) {
            if (level.items[i].visible && !level.items[i].isOnObj) {
                // gravity/position
                if (level.items[i].vY < maxVy)
                    level.items[i].vY += game.gravity;
                else
                    level.items[i].vY = maxVy;

                level.items[i].pos.y += level.items[i].vY;

                // obj collision
                Physics.testObjObjs(level.items[i], function (r) {
                    if (r.overlapN.y === 1) {    // on top of platform
                        audio.thud.play();
                        r.a.vY = 0;
                        r.a.isOnObj = true;
                        r.a.recentlyHeld = false;

                        if (r.b.type === JQObject.SCALE) {
                            r.a.grabbable = false;
                            r.b.holdingItem = JQObject.CRATE;

                            utils.repeatAction(70, 8, function () {
                                ++r.a.pos.y;
                                ++r.b.pos.y;
                            });
                        }
                    }

                });

                // item collision
                Physics.testItemItems(level.items[i], function (r) {
                    r.a.isOnObj = true;
                    r.a.onObj = r.b;
                    r.b.grabbable = false;
                    r.a.recentlyHeld = false;
                });
            }
        }
    }

    function updateEnemies() {
        for (var i = 0; i < level.enemies.length; ++i) {
            level.enemies[i].update();

            // TODO: move to hero??

            if(level.enemies[i].health > 0) {
                // hero and enemy
                if(SAT.testPolygonPolygon(hero, level.enemies[i])) {
                    level.enemies[i].active = true;

                    if(!hero.invincible) {
                        audio.play(audio.heartbeat, true);

                        hero.invincible = true;
                        --hero.health;
                    }
                }

                // projectiles and enemy
                for (var j = 0; j < hero.bulletArr.length; ++j) {
                    if(SAT.testPolygonPolygon(hero.bulletArr[j], level.enemies[i])) {
                        audio.play(audio.thud, true);
                        level.enemies[i].active = true;

                        hero.bulletArr.splice(j, 1); // remove jth item
                        --level.enemies[i].health;

                        if (level.enemies[i].health <= 0) {
                            level.enemies[i].death();
                        }
                    }
                }
            }
        }
    }

    /********** Render **********/
    // the parallax background
    function drawBg() {
        // color background
        ctx.fillStyle = "#000";
        ctx.fillRect(0, FULLH - game.padFloor, FULLW, game.padFloor);
        ctx.fillStyle = level.bgColor.fillStyle;
        ctx.fillRect(0, 0, FULLW, FULLH - game.padFloor);

        // background objects
        for (var i = 0; i < level.bg.length; ++i) {
            //level.bg[i].draw();
            var t = level.bg[i];
            var scale = utils.speed2scale(t.speed);

            ctx.drawImage(t.img, t.pos.x, t.pos.y, t.w * scale, t.h * scale);
        }
    }

    // all of the collision rectangles in the level
    function drawObjs() {
        for (var i = 0; i < level.objs.length; ++i) {
            // check if visible
            if (typeof (level.objs[i].visible) !== "undefined" &&   // TODO: all objs should have visible property (fix api)
                !level.objs[i].visible
            ) {
                continue;
            }
            
            if (level.objs[i].type === JQObject.LADDER) {           // ladder
                Graphics.drawLadder(level.objs[i]);
            }
            else if (level.objs[i].type === JQObject.SCALE) {       // scale
                Graphics.drawScale(level.objs[i]);
                Graphics.drawPlatformStatus(level.objs[i]);
            }
            else if(level.objs[i].type === JQObject.PLATFORM || level.objs[i].type === JQObject.STAIR) {
                Graphics.drawPlatform(level.objs[i]);
            }
            else if (level.objs[i].type === JQObject.DOOR) {
                Graphics.drawDoor(level.objs[i]);
            }
            else {
                ctx.fillStyle = Color.DARK_BROWN;
                ctx.fillRect(level.objs[i].pos.x, level.objs[i].pos.y, level.objs[i].w, level.objs[i].h);
            }
        }
    }

    function drawItems() {
        for (var i = 0; i < level.items.length; ++i) {
            level.items[i].draw();
        }
    }

    function drawEnemies() {
        for (var i = 0; i < level.enemies.length; ++i) {
            if (!level.enemies[i].deadOffScreen) {
                level.enemies[i].draw();
            }
        }
    }


    return {
        bgColor: {},
        bg: [],             // dynamically holds all of the background objects for the level
        objs: [],           // dynamically holds all of the objects for the level
        items: [],          // dynamically holds all of the items for the level
        enemies: [],        // dynamically holds all of the enemies for the level
        curLvl: null,       // alias for the current level object e.g. lvl1
        isCutscene: false,
        time: 0,
        hiddenItemsFound: 0,
        hiddenItems: 0,
        isTransitioning: false,
        

        init: function() {
            level.reset();
            level.curLvl = new StartScreen();     // level '0'
        },

        // called before start of level
        reset: function () {
            // reset game stats
            game.over = false;
            game.actualTime = 0;

            // reset level
            level.hiddenItemsFound = 0;
            hero.lvlX = 0;
            level.bgColor = {
                fillStyle: "#000"
            };
            level.bg = [];
            level.objs = [];
            level.items = [];
            level.enemies = [];

            // reset hero
            hero.pos.x = 23;
            hero.pos.y = FULLH - game.padFloor - hero.h + 4;    // TODO: find out '4' offset??
            hero.vX = hero.vY = 0;
            hero.isJumping = false;
            hero.bulletArr.length = 0;		// prevents leftover thrown shurikens
            hero.invincible = false;
            hero.isHolding = false;
            hero.curItem = null;
            hero.dir = Dir.RIGHT;
            hero.health = hero.maxHealth;
        },

        // called at end of level
        complete: function () {
            level.isTransitioning = true;
            audio.lvlComplete();

            // reset graphics timers (to fix blink text)
            Graphics.ticker = 1;
            Graphics.fadeOut = true;

            Graphics.fadeCanvas(function () {
                level.isTransitioning = false;

                level.reset();
                level.curLvl = lvlComplete;
                level.isCutscene = true;
                level.time = game.actualTime;

                // TODO: audio.lvlCompleted.play()
            });
        },

        /******************** Update ********************/
        update: function () {
            if (!level.isTransitioning) {
                updateItems();
                updateEnemies();

                level.curLvl.update();
            }
        },

        // fix positions relative to the "camera" view
        updateView: function(){
            updateObjsView();
            updateItemsView();
            updateBgView();
            updateEnemiesView();
        },


        /******************** Render ********************/
        render: function () {
            drawBg();
            drawObjs();
            drawItems();
            drawEnemies();
            
            level.curLvl.render();
        }
    };
})();
