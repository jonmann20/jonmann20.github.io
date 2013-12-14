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
        // layer 1
        for (var i = 0; i < level.bg[1].length; ++i) {
            level.bg[1][i].pos.x -= hero.vX / 3;
        }

        // layer 0
        for (var i = 0; i < level.bg[0].length; ++i) {
            level.bg[0][i].pos.x -= hero.vX / 2;
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
                    if (r.overlapN.y === 1) {       // on top
                        r.a.isOnObj = true;
                    }
                });

                // item collision
                Physics.testItemItems(level.items[i], function (r) {
                    r.a.isOnObj = true;
                    r.a.onObj = r.b;
                    r.b.grabbable = false;

                    level.items.push(r.a);
                });
            }
        }
    }


    /********** Render **********/
    // the parallax background
    function drawBg() {
        // color background
        ctx.fillStyle = Color.LIGHT_GREEN;
        ctx.fillRect(0, 0, FULLW, FULLH - game.padFloor - 1);

        ctx.fillStyle = "#000";
        ctx.fillRect(0, FULLH - game.padFloor - 1, FULLW, game.padFloor + 1);

        // layer 1
        for (var i = 0; i < level.bg[1].length; ++i) {
            level.bg[1][i].draw();
        }

        // layer 0
        for (var i = 0; i < level.bg[0].length; ++i) {
            level.bg[0][i].draw();
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
            else if(level.objs[i].type === JQObject.PLATFORM || level.objs[i].type === JQObject.FLOOR) {
                Graphics.drawPlatform(level.objs[i]);
            }
            else if (level.objs[i].type === JQObject.DOOR) {
                Graphics.drawDoor(level.objs[i]);
            }
        }
    }

    function drawItems() {
        for (var i = 0; i < level.items.length; ++i) {
            level.items[i].draw();
        }
    }

    return {
        bg: [   // parallax background; TODO: make one array with variable depth (z dimension) and variable scroll speed per entry
            [], // backgorund obj's 1
            []  // background obj's 2
        ],
        objs: [],           // dynamically holds all of the objects for the level;
        items: [],          // dynamically holds all of the items for the level (movable items)
        curLvl: null,       // alias for the current level object e.g. lvl1
        isCutscene: false,
        time: 0,
        hiddenItemsFound: 0,
        hiddenItems: 0,
        isTransitioning: false,
        

        init: function () {
            level.curLvl = startScreen;     // startScreen == level '0'
            level.curLvl.init();
            level.reset();
        },

        // called before start of level
        reset: function () {
            // reset game stats
            game.over = false;
            game.actualTime = 0;

            // reset level
            level.hiddenItemsFound = 0;
            hero.lvlX = 0;
            level.objs = [];
            level.items = [];
            level.crates = [];
            level.bg = [
                [],
                []
            ];

            // reset hero
            hero.pos.x = 23;
            hero.pos.y = FULLH - game.padFloor - hero.h + 4;    // TODO: find out '4' offset??
            hero.vX = hero.vY = 0;
            hero.isJumping = false;
            hero.bulletArr.length = 0;		// prevents leftover thrown shurikens
            hero.invincible = false;
            hero.isCarrying = false;
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

                level.curLvl.update();
            }
        },

        // fix positions relative to the "camera" view
        updateView: function(){
            updateObjsView();
            updateItemsView();
            updateBgView();
        },


        /******************** Render ********************/
        render: function () {
            drawBg();
            drawObjs();
            drawItems();
            
            level.curLvl.render();
        }
    };
})();
