/// <reference path="../linker.js" />

var level = (function () {

    /********** Update **********/
    function updateObjs() {
        for (var i = 0; i < level.objs.length; ++i) {
            if (typeof (level.objs[i].pos) !== "undefined") {       // TODO: update SAT api
                level.objs[i].pos.x -= hero.vX;
            }
            else {
                level.objs[i].x -= hero.vX;
            }
        }
    }

    function updateItems() {
        for (var i = 0; i < level.items.length; ++i) {
            //if (typeof (level.items[i].pos) !== "undefined") {
            //    level.items[i].pos.x -= hero.vX;
            //}
            //else {
                level.items[i].x -= hero.vX;
            //}
        }
    }


    /********** Render **********/

    // all of the collision rectangles in the level
    function drawLvlObjs() {
        //---- level background
        ctx.fillStyle = Color.LIGHT_GREEN;
        ctx.fillRect(0, 0, FULLW, FULLH - game.padFloor - 1);

        for (var i = 0; i < level.objs.length; ++i) {
            if (typeof (level.objs[i].pos) !== "undefined") {       // TODO: fix SAT api

                // check if visible
                if (typeof (level.objs[i].visible) !== "undefined" &&   // TODO: all objs should have visible property (fix SAT api)
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
    }


    return {
        objs: [],           // dynamically holds all of the objects for the level;
        items: [],          // dynamically holds all of the items for the level (movable items)
        curLvl: null,       // alias for the current level object e.g. lvl1
        isCutscene: false,
        time: 0,
        hiddenItemsFound: 0,
        hiddenItems: 0,
        

        init: function () {
            level.curLvl = startScreen;     // startScreen == level '0'
            level.curLvl.init();
            level.reset();
        },

        // called at end of level
        complete: function () {
            level.objs = [];
            level.items = [];
            level.curLvl = lvlComplete;
            level.isCutscene = true;
            level.time = game.actualTime;

            // TODO: audio.lvlCompleted.play()
        },

        // called before start of level
        reset: function () {
            level.hiddenItemsFound = 0;

            hero.x = 23;
            hero.y = canvas.height - hero.h;
            hero.isJumping = false;
            hero.bulletArr.length = 0;		// TODO: cache num bullets
        },

        /******************** Update ********************/
        update: function () {
            level.curLvl.update();
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
            drawLvlObjs();
            level.curLvl.render();
        }
    };
})();
