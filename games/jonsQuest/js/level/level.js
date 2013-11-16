/// <reference path="../linker.js" />

var level = (function () {

    var shuriken = null,
		cash = null,
		syringe = null,
		medKit = null

		//NUM_LEVELS = 5,
		//recentLvlUpdate = 0
    ;

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
    function drawHUD() {	// TODO: break out static parts
        // background
        ctx.fillStyle = "#070707";
        ctx.fillRect(0, FULLH, FULLW, game.padHUD);

        ctx.fillStyle = "#ddd";
        ctx.font = "12px 'Press Start 2P'";


        ctx.fillText("HP-" + hero.healthLvl, 15, FULLH + 24);
        ctx.fillText("MP-" + hero.manaLvl, 15, FULLH + 48);
        ctx.fillText("XP", 15, FULLH + 71);

        // hp kit
        ctx.fillText(hero.medKits, 210, FULLH + 50);
        medKit.draw();

        // mp kit
        ctx.fillText(hero.manaKits, 315, FULLH + 50);
        syringe.draw();

        // ammo
        ctx.fillText(hero.ammo, 410, FULLH + 50);
        shuriken.draw();

        // money
        ctx.fillText(hero.cash, 515, FULLH + 50);
        cash.draw();

        // time
        var min = Math.floor(game.actualTime / 60),
			sec = game.actualTime % 60;

        if (sec < 10)
            sec = '0' + sec;

        if (min < 10)
            min = '0' + min;

        ctx.fillText(min + ':' + sec, FULLW - 84, FULLH + 34);
    }

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

                if (typeof (level.objs[i].type) !== "undefined" && level.objs[i].type === "ladder") {     // ladder
                    Graphics.drawLadder(level.objs[i]);
                }
                else {
                    Graphics.drawPlatform(
                        level.objs[i].pos.x,
                        level.objs[i].pos.y,
                        level.objs[i].edges[0].x,
                        level.objs[i].edges[1].y
                    );
                }


                if (typeof (level.objs[i].type) !== "undefined" && level.objs[i].type === "scale") {    // scale
                    Graphics.drawPlatformStatus(level.objs[i]);
                }

            }
        }
    }


    return {
        objs: [],       // dynamically holds all of the objects for the level;
        items: [],      // dynamically holds all of the items for the level (movable items)
        curLvl: null,   // alias for the current level object e.g. lvl0
        

        init: function () {
            // HUD icons
            medKit = GameObj(238, FULLH + 31, 25, 24, "img/medKit.png");
            syringe = GameObj(342, FULLH + 31, 25, 25, "img/syringe.png");
            shuriken = GameObj(447, FULLH + 32, 24, 24, "img/shuriken.png");
            cash = GameObj(548, FULLH + 33, 22, 24, "img/cash.png");

            // start level 0
            level.curLvl = lvl0;
            level.curLvl.init();
            level.reset();
        },

        reset: function () {
            hero.x = 23;
            hero.y = canvas.height - hero.h;
            hero.isJumping = false;

            hero.bulletArr.length = 0;		// TODO: cache num bullets
        },

        /******************** Update ********************/
        update: function () {
            level.curLvl.update();

            // var tempLvl = game.lvl+1;
            // if(tempLvl >= NUM_LEVELS)
            //      tempLvl = NUM_LEVELS-1;

            // if(	){        // should reset level
            //      ++game.lvl
            // 			    
            //      utils.reset()
            // }
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

            // HUD
            drawHUD();

            // current level
            drawLvlObjs();
            level.curLvl.render();
        }
    };
})();
