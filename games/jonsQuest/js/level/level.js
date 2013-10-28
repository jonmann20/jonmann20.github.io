var level = (function () {

    var shuriken = null,
		cash = null,
		syringe = null,
		medKit = null,

		NUM_LEVELS = 5,
		lvl = new Array(NUM_LEVELS),
		recentLvlUpdate = 0,
		lvlBgImg = {}
    ;

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

    function loadBgImages(imgArr, callback) {
        var count = 0;

        for (var key in imgArr) {
            if (imgArr[key] !== "none") {
                lvlBgImg[key] = new Image();
                lvlBgImg[key].onload = function () {
                    callback(this.num);
                };

                lvlBgImg[key].src = imgArr[key];
                lvlBgImg[key].num = count;
            }

            ++count;
        }
    }


    return {
        collisionPts: [],
        width: 0,


        init: function () {

            medKit = GameObj(238, FULLH + 31, 25, 24, "img/medKit.png");
            syringe = GameObj(342, FULLH + 31, 25, 25, "img/syringe.png");
            shuriken = GameObj(447, FULLH + 32, 24, 24, "img/shuriken.png");
            cash = GameObj(548, FULLH + 33, 22, 24, "img/cash.png");

            level.collisionPts = [
                // level 0
                {
                    obj0: {
                        x: 310,
                        y: 161,
                        w: 200,
                        h: 30
                    },
                    obj1: {
                        x: 600,
                        y: 95,
                        w: 200,
                        h: 30
                    },
                    obj2: {
                        x: 562,
                        y: 230,
                        w: 300,
                        h: 30
                    }
                }
            ];


            for (var i = 0; i < NUM_LEVELS; ++i) {
                lvl[i] = {
                    status: false,
                    bgColor: '#' + Math.floor(Math.random() * 16777215).toString(16)
                };
            }

            loadBgImages({
                lvl0: "img/lvl0.jpg",
                lvl1: "none"
            }, function (num) {
                lvl[num].status = true;
            });

            level.reset();
            lvl0.init();
        },

        reset: function () {
            level.width = 3198;

            hero.x = 23;
            hero.y = canvas.height - hero.h;
            hero.isJumping = false;

            hero.bulletArr.length = 0;		// TODO: cache num bullets
        },

        /******************** Update ********************/
        update: function () {

            switch (game.lvl) {
                case 0:
                    lvl0.update();
                    break;
            }

            // var tempLvl = game.lvl+1;
            // 			
            // if(tempLvl >= NUM_LEVELS)
            // tempLvl = NUM_LEVELS-1;

            // if(	){        should reset level
            // ++game.lvl
            // recentLvlUpdate = 
            // 			    
            // utils.reset()
            // }
        },

        updateObjs: function () {
            switch (game.lvl) {
                case 0:
                    lvl0.updateObjs();
                    break;
            }
        },

        /******************** Render ********************/
        render: function () {
            // background
            if (lvl[game.lvl].status) {
                ctx.drawImage(lvlBgImg["lvl" + game.lvl], hero.lvlX, 0, FULLW, FULLH, 0, 0, FULLW, FULLH);
            }
            else {
                if (lvl[game.lvl].bgColor)
                    ctx.fillStyle = lvl[game.lvl].bgColor;
                else
                    ctx.fillStyle = "#222";

                ctx.fillRect(0, 0, FULLW, FULLH);
            }

            drawHUD();

            switch (game.lvl) {
                case 0:
                    lvl0.render();
                    break;
            }
        },

        drawAfterHero: function () {
            if (game.lvl === 0) {
                if (lvl0.crate.holding)
                    lvl0.crate.draw();

            }
        }

    };
})();
