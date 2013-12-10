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

    function updateBg() {
        // layer 1
        for (var i = 0; i < level.bg[1].length; ++i) {
            level.bg[1][i].pos.x -= hero.vX / 3;
            //level.bg[1][i].pos.y += hero.vY / 10;
        }

        // layer 0
        for (var i = 0; i < level.bg[0].length; ++i) {
            level.bg[0][i].pos.x -= hero.vX / 2;
            //level.bg[0][i].pos.y += hero.vY / 8;
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
            level.bg[1][i].draw();
        }

        // layer 0
        for (var i = 0; i < level.bg[0].length; ++i) {
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

            
            if (level.objs[i].type === JQObject.LADDER) {           // ladder
                Graphics.drawLadder(level.objs[i]);
            }
            else if (level.objs[i].type === JQObject.SCALE) {       // scale
                Graphics.drawScale(level.objs[i]);
                Graphics.drawPlatformStatus(level.objs[i]);
            }
            else if(level.objs[i].type === JQObject.PLATFORM) {
                Graphics.drawPlatform(level.objs[i]);
            }
        }
    }


    return {
        bg: [   // parallax background
            [], // backgorund obj's 1
            []  // background obj's 2
        ],
        crates: [],         // special handling of crate objects
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
                Crate.update();
                level.curLvl.update();
            }
        },

        // fix positions relative to the "camera" view
        updateView: function(){
            updateObjs();
            updateItems();
            updateBg();
        },


        /******************** Render ********************/
        render: function () {
            // floor
            ctx.fillStyle = Color.LIGHT_BROWN;
            ctx.fillRect(0, FULLH - game.padFloor - 1, FULLW, 1);
            ctx.fillStyle = Color.DARK_BROWN;
            ctx.fillRect(0, FULLH - game.padFloor, FULLW, game.padFloor);

            // current level
            drawLvlBg();
            drawLvlObjs();
            level.curLvl.render();
        }
    };
})();
