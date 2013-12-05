/// <reference path="../linker.js" />

var level = (function () {

    /********** Update **********/
    function updateObjs() {
        for (var i = 0; i < level.objs.length; ++i) {
            level.objs[i].pos.x -= hero.vX;
        }
    }

    function updateItems() {
        for (var i = 0; i < level.items.length; ++i) {
            level.items[i].pos.x -= hero.vX;
        }
    }


    /********** Render **********/
    // the parallax background
    function drawLvlBg() {
        // color background
        ctx.fillStyle = Color.LIGHT_GREEN;
        ctx.fillRect(0, 0, FULLW, FULLH - game.padFloor - 1);

        // layer 1
        for (var i = 0; i < level.bg[1].length; ++i) {
            // update position
            level.bg[1][i].pos.x -= hero.vX / 3;

            // draw
            level.bg[1][i].draw();
        }

        // layer 0
        for (var i = 0; i < level.bg[0].length; ++i) {
            // update position
            level.bg[0][i].pos.x -= hero.vX/2;

            // draw
            level.bg[0][i].draw();
        }
    }

    // all of the collision rectangles in the level
    function drawLvlObjs() {
        for (var i = 0; i < level.objs.length; ++i) {
            // check if visible
            if (typeof (level.objs[i].visible) !== "undefined" &&   // TODO: all objs should have visible property (fix api)
                !level.objs[i].visible
            ) {
                continue;
            }

            if (typeof (level.objs[i].type) !== "undefined") {
                if (level.objs[i].type === "ladder") {           // ladder
                    Graphics.drawLadder(level.objs[i]);
                }
                else if (level.objs[i].type === "scale") {      // scale
                    Graphics.drawScale(level.objs[i]);
                }
            }
            else {
                Graphics.drawPlatform(
                    level.objs[i].pos.x,
                    level.objs[i].pos.y,
                    level.objs[i].edges[0].x,
                    level.objs[i].edges[1].y
                );
            }


            if (typeof (level.objs[i].type) !== "undefined" && level.objs[i].type === "scale") {    // scale status
                Graphics.drawPlatformStatus(level.objs[i]);
            }
        }
    }


    return {
        bg: [   // parallax background
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
            level.hiddenItemsFound = 0;
            
            hero.pos.x = 23;
            hero.pos.y = canvas.height - hero.h;
            hero.vX = hero.vY = 0;
            hero.isJumping = false;
            hero.bulletArr.length = 0;		// prevents leftover thrown shurikens
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

                level.objs = [];
                level.items = [];
                level.curLvl = lvlComplete;
                level.isCutscene = true;
                level.time = game.actualTime;

                // TODO: audio.lvlCompleted.play()
            });
        },

        /******************** Update ********************/
        update: function () {
            if (!level.isTransitioning) {
                level.curLvl.update();
            }
        },

        // fix positions relative to the "camera" view
        updateView: function(){
            updateObjs();
            updateItems();
        },


        /******************** Render ********************/
        render: function () {
            // floor
            Graphics.drawPlatform(0, FULLH - game.padFloor, FULLW, game.padFloor);

            // current level
            drawLvlBg();
            drawLvlObjs();
            level.curLvl.render();
        }
    };
})();
