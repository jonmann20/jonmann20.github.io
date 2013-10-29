/*
    A place for generic math, set/get methods, and other small functions.
    Also used for global data structures, enums, and functions.
*/
var utils = (function () {
    	


	return {
		degToRad: function(deg){
			return deg * 0.0174532925199432957;
		},

        /**** Debug Printers ****/
		printMouse: function () {
		    $("canvas").on("mousemove", function (e) {
		        console.log(e.offsetX, e.offsetY);
		    });
		},

		printDir: function (dir) {
		    switch (dir) {
		        case 0:
		            console.log("Dir.NONE");
		            break;
		        case 1:
		            console.log("Dir.TOP");
		            break;
		        case 2:
		            console.log("Dir.BOT");
		            break;
		        case 3:
		            console.log("Dir.LEFT");
		            break;
		        case 4:
		            console.log("Dir.RIGHT");
		            break;
		        case 5:
		            console.log("Dir.IN");
		            break;
		        default:
		            console.log("Dir.unknown");
		    }
		}
	};
})();


// global enums
var Dir = Object.freeze({
    NONE: 0,
    TOP: 1,
    BOT: 2,
    LEFT: 3,
    RIGHT: 4,
    IN: 5
});

var Inv_e = Object.freeze({
    NOT_HIT: 0,
    HIT_WHITE: 1,
    HIT_RED: 2
});

var KeyCode = Object.freeze({
    ENTER: 13,
    J: 74,
    K: 75
});

var bullet = {
    color: "rgba(0, 182, 255, .85)",
    w: 19.5,
    h: 9,
    speed: 3.3
};

// global functions
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
		   window.webkitRequestAnimationFrame ||

		   function (callback) {
		       setTimeout(callback, 16.6666666667); // 60fps fallback
		   };
})();

var audio = (function () {

    return {
        bgMusic: new Audio("audio/firstChiptune/firstChiptune.mp3"),
        enterSound: new Audio("audio/synthetic_explosion_1.mp3"),
        itemPickedUp: new Audio("audio/life_pickup.mp3"),
        heartbeat: new Audio("audio/heartbeat.mp3"),
        jump: new Audio("audio/jump.mp3"),
        thud: new Audio("audio/thud.mp3"),
        step: new Audio("audio/step.mp3"),
        effort: new Audio("audio/woosh.mp3"),
        discovery: new Audio("audio/spell3.mp3"),
        enemyDeath: new Audio("audio/death.mp3"),
        heroDeath: new Audio("audio/DiscsOfTron_Cascade.mp3"),
        enchant: new Audio("audio/enchant.mp3"),
        isOn: false,


        play: function (sound, stopPrev) {
            stopPrev = (typeof (stopPrev) !== 'undefined') ? stopPrev : true;

            if (sound.ended)
                sound.play();
            else {
                if (stopPrev || sound.currentTime === 0) {
                    sound.pause();
                    sound.currentTime = 0;
                    sound.play();
                }
            }
        },

        handleMuteButton: function () {
            if ($('.audioState').hasClass('off')) {
                $('.audioState span').removeClass('icon-volume-mute').addClass('icon-volume-medium');
                $('.audioState').removeClass('off');
                $('.audioState').addClass('on');

                audio.mute(false);
            }
            else {
                $('.audioState span').removeClass('icon-volume-medium').addClass('icon-volume-mute');
                $('.audioState').removeClass('on');
                $('.audioState').addClass('off');

                audio.mute(true);
            }
        },

        mute: function (onOrOff) {
            audio.discovery.muted =
            audio.enterSound.muted =
            audio.bgMusic.muted =
            audio.itemPickedUp.muted =
            audio.heartbeat.muted =
            audio.effort.muted = 
            audio.thud.muted = 
            audio.jump.muted = 
            audio.step.muted = 
            audio.enemyDeath.muted =
            audio.heroDeath.muted =
            audio.enchant.muted =
                onOrOff;

            onOrOff ?
                audio.bgMusic.pause() :
                audio.bgMusic.play();

            audio.isOn = !onOrOff;
        }
    };
})();

/*
    A library of generic graphics functions.
*/
var Graphics = (function () {

    var alpha = 1;

    return {
        ticker: 1,              // 1.0 --> 0.0 --> 1.0 --> ...
        tickerStep: 0.01,
        fadeOut: false,


        blinkText: function (fontSize, x, y, str) {
            str = (typeof (str) !== "undefined") ? str : "PRESS ENTER";

            if (Graphics.ticker >= 1.35 || Graphics.ticker <= Graphics.tickerStep) {
                Graphics.fadeOut = !Graphics.fadeOut;
            }

            if (Graphics.ticker >= 1) {
                alpha = 1;
            }
            else if (Graphics.ticker <= Graphics.tickerStep) {
                alpha = 0;
            }
            else {
                alpha = Graphics.ticker;
            }

            ctx.font = fontSize + "px 'Press Start 2P'";
            var tmpW = ctx.measureText(str).width;
            ctx.fillStyle = "rgba(233, 233, 233," + alpha + ')';
            ctx.fillText(str, x - tmpW / 2, y);
        },

        drawEllipse: function (x, y, w, h) {
            var kappa = 0.5522848,
				ox = (w / 2) * kappa, // control point offset horizontal
				oy = (h / 2) * kappa, // control point offset vertical
				xe = x + w, // x-end
				ye = y + h, // y-end
				xm = x + w / 2, // x-middle
				ym = y + h / 2 // y-middle
            ;

            ctx.beginPath();
            ctx.moveTo(x, ym);
            ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
            ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
            ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
            ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
            ctx.closePath();
            ctx.fill();
        },

        drawRotate: function (img, x, y, angle) {
            ctx.save();

            ctx.translate(x, y);								// move co-ord sys to img origin
            ctx.rotate(utils.degToRad(angle));
            ctx.translate(-img.width * 0.5, -img.height * 0.5); // move to top left of img

            //ctx.scale(0.75, 0.75);
            ctx.drawImage(img, 0, 0);

            ctx.restore();
        }
    };
})();

/// <reference path="../hero/heroInput.js" />
/// <reference path="../hero/heroGraphics.js" />
/// <reference path="../hero/heroPhysics.js" />
/// <reference path="../hero/hero.js" />

/*
    A library of generic physics functions.
*/
var Physics = (function () {


    return {
        blah: 12,

        isCollision: function (a, b, moe, isLvl) {
            var aX = (typeof (isLvl) !== "undefined") ? a.x + a.lvlX : a.x;

            if ((aX + moe <= (b.x + b.w)) && // a is to the left of the right side of b
				(b.x + moe <= (aX + a.w)) && // a is to the right of the left side of b
				(a.y + moe <= (b.y + b.h)) && // a is higher than the bot of b
				(b.y + moe <= (a.y + a.h)) 	  // a is lower than the top of b
			) {
                return true;
            }

            return false;
        },

        solidRectCollision: function (collisionDir, obj) {
            if (collisionDir != Dir.NONE) {
                if (collisionDir == Dir.LEFT) {
                    hero.onObjX = obj.x - hero.lvlX - hero.w;
                    hero.onObjLvlX = hero.lvlX;
                }
                else if (collisionDir == Dir.RIGHT) {
                    hero.onObjX = obj.x - hero.lvlX + obj.w;
                    hero.onObjLvlX = hero.lvlX;
                }
                else if (collisionDir == Dir.TOP) {
                    hero.onObjY = hero.y = obj.y - hero.h;
                    hero.isJumping = false;
                    hero.isOnObj = true;
                }
                else if (collisionDir == Dir.BOT) {
                    if (hero.vY < -4) {
                        audio.play(audio.thud, true);
                    }

                    hero.onObjY = hero.y = obj.y + obj.h;
                    hero.jumpMod = 0;
                    hero.vY = 0;
                }

                if ((collisionDir == Dir.LEFT) || (collisionDir == Dir.RIGHT)) {
                    hero.x = hero.onObjX;
                    hero.lvlX = hero.onObjLvlX;
                }
            }
        }
    };
})();

var GameObj = function (xx, yy, ww, hh, src) {
    var img = null,
		ready = false;

    if (typeof (src) !== "undefined") {
        img = new Image();
        img.onload = function () { ready = true; };
        img.src = src;
    }

    return {
        initX: xx,
        x: xx,
        initY: yy,
        y: yy,
        w: ww,
        h: hh,
        vY: 0,


        updatePos: function () {
            if (this.y < FULLH - game.padFloor - this.h)
                this.y += this.vY;
            else
                this.y = FULLH - game.padFloor - this.h;
        },

        draw: function () {
            if (ready) {
                ctx.drawImage(img, this.x, this.y);
            }
            else {
                ctx.fillStyle = "red";
                ctx.fillRect(this.x, this.y, this.w, this.h);
            }
        },

        getImg: function () {
            return img;
        }
    };
};

var GameItem = function () {

    var parentDraw = null;

    function _draw() {
        return function () {
            if (this.visible && !this.collected) {
                parentDraw.apply(this);
            }

        };
    }


    return {
        collected: false,
        holding: false,
        visible: true,
        val: -1,


        init: function (g, v, vis) {
            $.extend(this, g);

            this.val = v;

            if (typeof (vis) !== "undefined")
                this.visible = vis;

            parentDraw = this.draw;
            this.draw = _draw();
        }

    };
};

var Enemy = function () {
    var parentDraw = null,
		initHealth = 0,
		alive = true,
		deadOnScreen = false,
		clearDir = true;		// true = right; false = left;

    function drawHealth(that) {
        var healthLen = (that.w / initHealth) * that.health;

        ctx.fillStyle = "red";
        ctx.fillRect(that.x, that.y - 12, healthLen, 4);
    }

    function _draw() {
        return function () {

            if (alive || deadOnScreen) {
                if (initHealth > 1)
                    drawHealth(this);


                ctx.save();
                if (deadOnScreen)
                    ctx.globalAlpha = 0.3;


                parentDraw.apply(this);

                ctx.restore();

            }
        }
    }

    return {
        active: false,
        health: 0,

        init: function (g, ht) {
            $.extend(this, g);
            this.health = initHealth = ht;

            parentDraw = this.draw;
            this.draw = _draw();
        },

        update: function () {
            if (deadOnScreen) {
                this.x += clearDir ? 2 : -2;
                this.y -= 14;

                if (this.x < 0 || this.x > FULLW)
                    deadOnScreen = false;
            }
            else if (!alive)
                return;
            else if (this.active && game.totalTicks % 3 === 0) {
                if (this.x < hero.x)
                    ++this.x;
                else if (this.x > hero.x)
                    --this.x;
            }

        },

        death: function () {
            clearDir = (hero.dir == Dir.RIGHT);

            audio.enemyDeath.play();
            hero.xp += 2;
            alive = false;
            deadOnScreen = true;
        }

    };
};

var startScreen = (function () {

    var copyTitle1 = "JON'S",
		copyTitle2 = "QUEST",
		copyLine = String.fromCharCode("169") + " 2013 JON WIEDMANN",
        updateSetInterval = null,
        renderAnimFrame = null
    ;

    function update() {
        if (lastKeyDown == KeyCode.ENTER) {
            ++game.lvl;

            audio.enterSound.play();
            audio.bgMusic.pause();

            setTimeout(function(){
                audio.bgMusic = new Audio("audio/inspiredBySparkMan/sparkBoy.mp3");
                audio.bgMusic.loop = true;
                audio.bgMusic.volume = 0.45;

                audio.isOn ?
                    audio.bgMusic.play() :
                    audio.bgMusic.pause();
            }, 1000);

            clearInterval(updateSetInterval);
            cancelAnimationFrame(renderAnimFrame);
            game.start();
        }
    }

    function render() {
        renderAnimFrame = requestAnimFrame(render);
        
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, FULLW, FULLH + game.padHUD);

        //---- title

        // title 1
        ctx.font = "29px 'Press Start 2P'";
        var startX = HALFW - ctx.measureText(copyTitle1).width / 2 + 11,
			startY = 58;

        ctx.setTransform(1, 0, -0.4, 1.4, 0, 0);
        ctx.fillStyle = "#222";
        ctx.fillText('J', startX + 4, startY + 3);
        ctx.fillStyle = "#ff6a00";
        ctx.fillText('J', startX, startY);
        ctx.setTransform(1, 0, -0.2, 1.4, 0, 0);
        ctx.fillStyle = "#222";
        ctx.fillText('O', startX + 32, startY + 3);
        ctx.fillStyle = "#ff6a00";
        ctx.fillText('O', startX + 28, startY);
        ctx.setTransform(1, 0, 0.05, 1.41, 0, -1);
        ctx.fillStyle = "#222";
        ctx.fillText('N', startX + 58, startY + 3);
        ctx.fillStyle = "#ff6a00";
        ctx.fillText('N', startX + 54, startY);
        ctx.setTransform(1, 0, 0.23, 1.4, 0, 0);
        ctx.fillStyle = "#222";
        ctx.fillText("'", startX + 78, startY + 3);
        ctx.fillStyle = "#ff6a00";
        ctx.fillText("'", startX + 74, startY);
        ctx.setTransform(1, 0, 0.42, 1.4, 0, 0);
        ctx.fillStyle = "#222";
        ctx.fillText('S', startX + 95, startY + 3);
        ctx.fillStyle = "#ff6a00";
        ctx.fillText('S', startX + 91, startY);


        // title 2
        ctx.font = "36px 'Press Start 2P'";
        startX = HALFW - ctx.measureText(copyTitle2).width / 2 + 30;
        startY = 98;

        ctx.setTransform(1, 0, -0.5, 1.6, 0, 0);
        ctx.fillStyle = "#222";
        ctx.fillText('Q', startX + 4, startY + 3);
        ctx.fillStyle = "#ff6a00";
        ctx.fillText('Q', startX, startY);
        ctx.setTransform(1, 0, -0.25, 1.6, 0, 0);
        ctx.fillStyle = "#222";
        ctx.fillText('U', startX + 26, startY + 3);
        ctx.fillStyle = "#ff6a00";
        ctx.fillText('U', startX + 22, startY);
        ctx.setTransform(1, 0, 0.03, 1.6, 0, 0);
        ctx.fillStyle = "#222";
        ctx.fillText('E', startX + 50, startY + 3);
        ctx.fillStyle = "#ff6a00";
        ctx.fillText('E', startX + 46, startY);
        ctx.setTransform(1, 0, 0.25, 1.6, 0, 0);
        ctx.fillStyle = "#222";
        ctx.fillText('S', startX + 74, startY + 3);
        ctx.fillStyle = "#ff6a00";
        ctx.fillText('S', startX + 70, startY);
        ctx.setTransform(1, 0, 0.5, 1.6, 0, 0);
        ctx.fillStyle = "#222";
        ctx.fillText('T', startX + 90, startY + 4);
        ctx.fillStyle = "#ff6a00";
        ctx.fillText('T', startX + 86, startY);
        ctx.setTransform(1, 0, 0, 1, 0, 0);	// reset

        //---- press enter
        Graphics.blinkText(22, HALFW, HALFH + 81);

        //---- copyright
        ctx.font = "13px 'Press Start 2P'";
        ctx.fillStyle = "#ddd";

        ctx.fillText(copyLine, HALFW - ctx.measureText(copyLine).width / 2, FULLH + 44);
    }

    return {
        start: function () {
            updateSetInterval = setInterval(function () {
                Graphics.ticker += Graphics.fadeOut ? -Graphics.tickerStep : Graphics.tickerStep;
                update();
            }, game.updateFPS);

            render();
        }
    };
})();

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

/// <reference path="../hero/hero.js" />
/// <reference path="../hero/heroInput.js" />
/// <reference path="../hero/heroGraphics.js" />
/// <reference path="../hero/heroPhysics.js" />
/// <reference path="../physics/physics.js" />

var lvl0 = (function () {

    var cyborg = null,
		hiddenCash = null,
		sack = null,
		belt = null,
		belt2 = null
    ;
    //var k = [];
    var m = -0.52845528455;
    
    function beltPhysics() {
        if (Physics.isCollision(hero, belt, 0)) {
            var b = belt.initY + belt.h - hero.h;
            var x = Math.abs(hero.lvlX - 680); // 680 is the init hero.lvlX when you enter the box from the left

            hero.onObj(m * x + b);
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
                GameObj(1700, FULLH - game.padFloor - 38 + 1, 28, 38, "img/cyborgBnW.png"), 
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

            // crate
            if (!lvl0.crate.holding) {
                if (Physics.isCollision(hero, lvl0.crate, 12)) {
                    hero.isCarrying = true;
                    lvl0.crate.holding = true;
                    lvl0.crate.vY = 6.5;
                }

                //var collisionDir = hero.physics.objCollision(lvl0.crate);
                
                //if (collisionDir != Dir.TOP && collisionDir != Dir.NONE) {
                //    hero.isCarrying = true;
                //    lvl0.crate.holding = true;
                //    lvl0.crate.vY = 6.5;
                //}
                //else if(collisionDir == Dir.TOP){
                //    hero.onObj(hero.y -1);
                //}
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
            sack.x -= hero.vX;
            cyborg.x -= hero.vX;
            hiddenCash.x -= hero.vX;
            belt.x -= hero.vX;
            lvl0.crate.x -= hero.vX;
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

            //for(var i=0; i < k.length; ++i){
            //    k[i].draw();
            //}

        }
    };

})();

var game = (function(){
	var	avgFPS = 0,
		//updateTimePrev = 0,
        renderTimePrev = 0,
        lag = 0,
		fpsHistory = [0]
	;
	
	function update() {
		hero.update();
		level.update();
	}
	
	function render(renderTimeCur) {
        // timers
	    if ((renderTimeCur - renderTimePrev) > 0) {
	        game.renderTimeBtw = renderTimeCur - renderTimePrev;
	    }
	    renderTimePrev = renderTimeCur;


	    requestAnimFrame(render);
        
	    // drawing
		level.render();
		hero.render();
		
		level.drawAfterHero();
		drawFPS();
	}
	
	function drawFPS(fps) {

	    var actualFPS = (1000 / game.renderTimeBtw);

	    if (actualFPS != "Infinity") {
	        fpsHistory.push(actualFPS);
	    }
	    
    	if (game.totalTicks % 120 === 0) {
    	    var tot = 0;
            
    	    for (var i in fpsHistory) {
        		tot += fpsHistory[i];
        	}
    	    
    	    if (fpsHistory.length > 0) {
    	        avgFPS = Math.floor(tot / fpsHistory.length);
    	    }
    	    else {
    	        avgFPS = 0;
    	    }
        	fpsHistory = [];
        }
    	
    	ctx.fillStyle = "#ddd";
    	ctx.font = "12px 'Press Start 2P'";
	  	ctx.fillText(avgFPS + " FPS", FULLW - 84, FULLH + 65);
	}
   	
	return {
	    gravity: 0.07,
	    //friction: 35,
	    padBot: 119,	// total padding
	    padHUD: 80,
	    padFloor: 39,
	    lvl: -1,
	    updateFPS: 1000 / 120,  // 1000 / 120 ==> 2x target rate of 60fps
	    //updateTimeBtw: 0,
	    renderTimeBtw: 0,
	    totalTicks: 0,      // ticks are update iterations
	    actualTime: 0,

	    start: function () {

            // update at fixed time interval
	        setInterval(function () {
	            ++game.totalTicks;
	            Graphics.ticker += Graphics.fadeOut ? -Graphics.tickerStep : Graphics.tickerStep;

	            //var updateTimeCur = new Date().getTime();

	            //if ((updateTimeCur - updateTimePrev) > 0) {
	                //game.updateTimeBtw = updateTimeCur - updateTimePrev;
	            //}

	            //updateTimePrev = updateTimeCur;
	            //lag += game.updateTimeBtw;
	            
	            //while (lag >= game.updateTimeBtw) {      // TODO: interpolate if needed
	                update();
	                //lag -= game.updateTimeBtw;
	            //}
	        }, game.updateFPS); 


            // render w/vsync (let browser decide)
	        render();
	    }
	};
})();

/// <reference path="heroInput.js" />
/// <reference path="heroGraphics.js" />
/// <reference path="heroInput.js" />
/// <reference path="../physics/physics.js" />

/*
    The hero singleton object.
*/
var hero = (function () {
    var //self = this,
        input = null,           // the hero input component
        graphics = null,        // the hero graphics component

        imgReady = false,
		img = null,
		showRun = true,
		gameOver = false,
		spriteArr = []
	;
	
		
	/*********************** Update ***********************/
    function checkHealth() {
        if (hero.invincible)
            --hero.invincibleTimer;

        if (hero.invincibleTimer <= 0) {
            hero.invincible = false;
            hero.invincibleTimer = hero.invincibleTimer0;
        }
        
        if (hero.health <= 0 && !gameOver) {
            audio.heroDeath.play();
            audio.bgMusic.muted = true;

            alert("You died");
            location.reload();
            gameOver = true;
        }
    }

	function getSpritePos(){
	    if (game.totalTicks % 30 === 0) {
	        showRun = !showRun;
	    }

		var pos = {x: 0, y: 0};
		
		if(hero.isCarrying && hero.vX === 0){
			pos = spriteArr["playerDown"];
		}
		else if(hero.dir == Dir.RIGHT){
			if(hero.vX > 0){
   				if(Math.abs(hero.vX) <= hero.aX*3.5)
   					pos = spriteArr["playerRight_Step"];
				else if(showRun){
					pos = spriteArr["playerRight_Run1"];
				}
				else 
					pos = spriteArr["playerRight_Run2"];
			}
			else
				pos = spriteArr["playerRight"];
		}
		else if(hero.dir == Dir.LEFT){ 
			if(hero.vX < 0){
				if(Math.abs(hero.vX) <= hero.aX*3.5)
   					pos = spriteArr["playerLeft_Step"];
				else if(showRun){
					pos = spriteArr["playerLeft_Run1"];
				}
				else 
					pos = spriteArr["playerLeft_Run2"];
			}
			else
				pos = spriteArr["playerLeft"];
		}
		
		var inv = hero.invincibleTimer % 40;
		
		if(hero.invincible && (inv >= 0 && inv <= 16)){
			pos = {x: -1, y: -1};
		}
		
		hero.sx = pos.x;
		hero.sy = pos.y;
	}
	
	/*********************** Render ***********************/
	function drawHero(){
		if(imgReady && hero.sx >= 0 && hero.sy >= 0){
    		ctx.drawImage(img, hero.sx, hero.sy, hero.w, hero.h, hero.x, hero.y, hero.w, hero.h);
    	}
	}
		
		
	return {
	    //protectedInfo: {
            //...
	    //},

		x: 0,				// top left of sprite
		y: 0,
		sx: 0,				// sprite position
		sy: 0,
		lvlX: 0,			
		w: 28,
		h: 38,
		vX: 0,
		vY: 0,
		maxVx: 3.6,         // TODO: should be const
		maxVy: 10,         // TODO: should be const
		aX: 0.17,
		aY: 0.5,
		jumpMod: 4,
		jumpMod0: 4,            // TODO: should be const
		dir: Dir.RIGHT,
		isJumping: false,
		isCarrying: false,
		onGround: true,
		isOnObj: true,
		onObjX: -1,
		onObjY: -1,
		invincible: false,
		invincibleTimer: 120,
		invincibleTimer0: 120,  // TODO: should be const
		health: 4,
		maxHealth: 5,
		medKits: 1,
		healthLvl: 1,
		mana: 0,
		maxMana: 4,
		manaKits: 1,
		manaLvl: 1,
		ammo: 20,
		cash: 0,
		lvl: 1,
		xp: 0,
		xpNeeded: 50,
		bulletArr: [],
		physics: null,         // the hero physics component
		

		init: function(){
			img = new Image();
			img.onload = function () { imgReady = true; };
			img.src = "../dungeon/web/img/sprites/player/player.png";
			
			// grab texturePacker's sprite coords
			$.get('../dungeon/web/img/sprites/player/player.xml', function(xml){
				var wrap = $(xml).find('sprite');
				
				$(wrap).each(function(){
					var name = $(this).attr('n'),
						x = $(this).attr('x'),
						y = $(this).attr('y');
					
					name = name.substring(0, name.length-4);
					spriteArr[name] = {x: x, y: y};
				});
				
			});
			
			input = HeroInputComponent();
			    input.init();
			hero.physics = HeroPhysicsComponent();
			graphics = HeroGraphicsComponent();
			    graphics.init();
		},
		
		onObj: function(y){
		    hero.isJumping = false;
		    hero.isOnObj = true;

		    hero.y = y;
		    hero.onObjY = y;
		},

		offObj: function(){
		    hero.isOnObj = false;
			hero.onObjX = -1;
			hero.onObjY = -1;
		},
		
		update: function () {
		    input.check();                          // updates velocities
			hero.physics.updatePosition();          // updates positions
			hero.physics.checkCollision();          // checks new positions
			
			checkHealth();
			getSpritePos();
		},
	
		render: function(){
			drawHero();
	    	graphics.drawBullets();
	    	
			graphics.drawHealth();
			graphics.drawMana();
			graphics.drawXP();
		}
	};
})();

/*
    The graphics component of hero.
*/
var HeroGraphicsComponent = function () {
    //$.extend(this, hero.protectedInfo);

    var shuriken = null,
        shurikenReady = false
    ;


    return {
        init: function(){
            shuriken = new Image();
            shuriken.src = "img/shuriken.png";
            shuriken.onload = function () { shurikenReady = true; };
        },

        drawBullets: function(){
		    for(var i=0; i < hero.bulletArr.length; ++i){
		        var dirOffset = hero.bulletArr[i].dirR ?
    							    hero.w : 
    							    0;
	            
		        hero.bulletArr[i].deg += 5;
            
		        Graphics.drawRotate(
            	    shuriken, 
            	    hero.bulletArr[i].x + dirOffset,
            	    hero.bulletArr[i].y + 20,
        	 	    hero.bulletArr[i].deg
    	 	    );
            
		    }
        },

        drawHealth: function (){
		    for(var i=0; i < hero.health; ++i){
		        ctx.fillStyle = "red";
		        ctx.fillRect(80 + i*21, FULLH + 14, 19, 8);
		    }
        },
	
        drawMana: function(){
            for(var i=0; i < hero.mana; ++i){
                ctx.fillStyle = "#00b6ff";
                ctx.fillRect(80 + i*21, FULLH + 37, 19, 8);
            }
        },
	
        drawXP: function () {
            ctx.fillStyle = "#ddd";
            ctx.font = "12px 'Press Start 2P'";
        	
            var zero = (hero.xp < 10) ? '0' : '';
            ctx.fillText(zero + hero.xp + '/' + hero.xpNeeded, 80, FULLH + 71);
        }
    };
};

/// <reference path="hero.js" />
/// <reference path="heroInput.js" />
/// <reference path="heroGraphics.js" />
/// <reference path="../physics/physics.js" />

/*
    The physics component of hero.
*/
var HeroPhysicsComponent = function () {
    //$.extend(this, hero.protectedInfo);

    function screenCollision() {
        hero.onGround = false;

        if (hero.y < -hero.h) {                     // feet above top of screen
            hero.y = -hero.h;
            hero.vY = 0;
        }
        else if (hero.y >= (canvas.height - game.padBot - hero.h)) { // bottom
            hero.y = canvas.height - game.padBot - hero.h;
            hero.isJumping = false;
            hero.onGround = true;

            hero.vY = 0;
        }
        else if (hero.isOnObj) { 						// on top of obj
            hero.y = hero.onObjY;
            hero.vY = 0;
        }

        if (hero.x < 0) { 								// left
            hero.x = 0;
            hero.vX = 0;
        }
        else if (hero.x > (canvas.width - hero.w)) { 	// right 
            hero.x = canvas.width - hero.w;
            hero.vX = 0;
        }
    }

    function bulletHandler() {
        for (var i = 0; i < hero.bulletArr.length; ++i) {
            hero.bulletArr[i].x += hero.bulletArr[i].dirR ? bullet.speed : -bullet.speed; // update position

            if (hero.bulletArr[i].x > canvas.width || hero.bulletArr[i].x < 0) {		// bullet and screen
                hero.bulletArr.splice(i, 1); // remove ith item
            }
        }
    }

    function heroAndLvlCollision() {
        var i = game.lvl,
            collisionDir = Dir.NONE;

        for (var j in level.collisionPts[i]) {
            var k = level.collisionPts[i][j];
            collisionDir = hero.physics.objCollision(k);

            Physics.solidRectCollision(collisionDir, k);

            if (collisionDir != Dir.NONE)
                break;
        }

        if (collisionDir == Dir.NONE) {
            hero.offObj();
        }
    }


    return {
        updatePosition: function (){	
            if (hero.x != (hero.x + hero.vX)) {
                audio.step.play();
            }

            if(((hero.dir == Dir.RIGHT && hero.x >= ((canvas.width/2) + 35)) ||
               (hero.dir == Dir.LEFT && hero.x <= ((canvas.width/2) - 45))) &&
               (hero.lvlX + hero.vX >= 0) &&
               (hero.lvlX + hero.vX <= level.width - canvas.width)
            ){
                hero.lvlX += hero.vX;
                level.updateObjs();
            }
            else {
                hero.x += hero.vX;
            }

            hero.y += hero.vY;
        },

        checkCollision: function () {
	        bulletHandler();		// bullet's and screen
            screenCollision();	    // hero and screen/ top of obj
		
            heroAndLvlCollision();
        },

        /*
            Checks for a collision between hero and obj.
            Returns a collision direction.
        */
        objCollision: function(obj) {
            var collisionDir = Dir.NONE;

            // using player dimensions as the moe
            if (Physics.isCollision(hero, obj, 0, true)) {

                collisionDir = Dir.IN;

                if (hero.dir == Dir.RIGHT && (hero.lvlX - hero.x < obj.x)) {        // left side of obj
                    collisionDir = Dir.LEFT;
                }
                else if ((hero.x + hero.lvlX + hero.w) > (obj.x + obj.w)) {         // right side of obj
                    collisionDir = Dir.RIGHT;
                }


                if ((hero.x != hero.onObjX) && ((hero.y + hero.h - ((obj.h / 2) + 1)) < obj.y) &&  // top of obj
                    (hero.vY > 0) || hero.isOnObj   // moving down OR already on
                ) {
                    collisionDir = Dir.TOP;
                }
                else if ((hero.y + hero.h) > (obj.y + obj.h)) {                     // bot of obj
                    collisionDir = Dir.BOT;
                }
            }

            return collisionDir;
        }
    };
};

/// <reference path="hero.js" />
/// <reference path="heroGraphics.js" />
/// <reference path="heroPhysics.js" />
/// <reference path="../physics/physics.js" />

/*
    The input component of hero.
*/
var HeroInputComponent = function () {

    return {
        init: function () {
            // global key vars
	        keysDown = {};
            lastKeyDown = -1;
	
            addEventListener("keydown", function (e) {

                if (e.keyCode == 32)
                    e.preventDefault(); 			//----- space bar (scrolling to bottom of page)
                else if (e.keyCode == 77)			//----- mute/unmute (m)
                    audio.handleMuteButton();
                else if(e.keyCode == 66)            //----- resize (b)
                    $(".resize").trigger("click");
                else if (e.keyCode == 75 &&			//----- jump (k);       TODO: move to check() function
                       (!hero.isJumping && ((lastKeyDown != 75) || !(75 in keysDown))) &&
                       (hero.isOnObj || hero.onGround)
                ) {
                    audio.jump.play();
                    hero.vY = 0;
                    hero.isJumping = true;
                    hero.offObj();
                }
                else if (e.keyCode == 74 &&		//----- shoot (j);          TODO: move to check() function
                        ((lastKeyDown != 74) || !(74 in keysDown))
                ) {
                    if (hero.ammo > 0 && !hero.isCarrying) {
                        audio.play(audio.effort);

                        hero.bulletArr[hero.bulletArr.length] = {
                            x: hero.x,
                            y: hero.y,
                            w: bullet.w,
                            h: bullet.h,
                            dirR: (hero.dir == Dir.RIGHT),
                            deg: 0
                        };

                        --hero.ammo;
                    }
                }

                lastKeyDown = e.keyCode;
                keysDown[e.keyCode] = true;
            }, false);
	
            addEventListener("keyup", function (e) { delete keysDown[e.keyCode];}, false);
        },

        check: function () {
            var doGravity = false;

            if (hero.isJumping) {
                if (hero.jumpMod > 0) {
                    hero.vY -= hero.aY * hero.jumpMod--;
                }
                else {
                    doGravity = true;
                }
            }
            else {
                hero.jumpMod = hero.jumpMod0;
                doGravity = true;
            }

            if (doGravity) {
                var fixVy = hero.vY + game.gravity*2;

                if (fixVy > hero.maxVY) {
                    hero.vY = hero.maxVy;
                }
                else {
                    hero.vY = fixVy;
                }
            }


            // --------- keys pressed --------
            var leftOrRight = false;
            //----- left (a)
            if(65 in keysDown){ 			
                hero.vX = (Math.abs(hero.vX - hero.aX) > hero.maxVx) ? -hero.maxVx : (hero.vX - hero.aX);
                hero.dir = Dir.LEFT;
                leftOrRight = true;
            }

		
            //----- right (d)
            if (68 in keysDown) {
                hero.vX = (Math.abs(hero.vX + hero.aX) > hero.maxVx) ? hero.maxVx : (hero.vX + hero.aX);
                hero.dir = Dir.RIGHT;
                leftOrRight = true;
            }
	    
            if(Math.abs(hero.vX) < hero.aX){    
                hero.vX = 0;
            }
            else if(!leftOrRight){
                //hero.vX += (hero.vX > 0) ? -game.friction : game.friction;
                hero.vX /= 1.26;
            }
	    
	    
            //----- drop object (spacebar)
            if(32 in keysDown){				
                lvl0.crate.holding = false;
                hero.isCarrying = false;
            }

		
            //----- heal (h)
            if(72 in keysDown){
                if(hero.medKits > 0 && hero.health < hero.maxHealth){
                    ++hero.health;
                    --hero.medKits;

                    audio.play(audio.enchant, true);
                }
            }
		
		
            //----- restore (r)
            if(82 in keysDown && !(17 in keysDown)){	// 17 = ctrl
                if(hero.manaKits > 0 && hero.mana < hero.maxMana){
                    ++hero.mana;
                    --hero.manaKits;

                    audio.play(audio.enchant, true);
                }
            }
		
        }
    };
};

var Main = (function () {

    function setCanvasGlobals() {
        canvas = $("canvas")[0];
        ctx = canvas.getContext("2d");

        FULLW = canvas.width;
        FULLH = canvas.height;
        FULLH -= game.padHUD;

        HALFW = FULLW / 2;
        HALFH = FULLH / 2;
    }

    function setAudio() {
        audio.bgMusic.loop = true;
        audio.bgMusic.volume = 0.7;
        audio.bgMusic.pause();

        audio.enemyDeath.volume = 0.6;
        audio.jump.volume = 0.4;
        audio.thud.volume = 0.78;
        audio.discovery.volume = 0.7;

        audio.mute(true);
        $(".audioState").on("click", audio.handleMuteButton);

        var wasClicked = false;
        $(".resize").on("click", function(){
            if (wasClicked) {
                $(canvas).css({ width: "", height: "" });
                $(this).attr("class", "resize off");
                $(this).children("span").attr("class", "icon-expand");
            }
            else {
                $(canvas).css({ width: "100%" });

                // fix for IE
                var width = $(canvas).width();
                $(canvas).css({ height: 0.611 * width });


                $(this).attr("class", "resize on");
                $(this).children("span").attr("class", "icon-contract");
            }

            wasClicked = !wasClicked;
        });

        //----- enable audio on start -----
        audio.handleMuteButton()
    }

    function setupLoadingScreen() {
        ctx.fillStyle = "#e1e1e1";
        ctx.font = "25px 'Press Start 2P'";
        ctx.fillText("LOADING...", HALFW - 80, HALFH + 20);
    }

    return {
        /*
			REQUIRES: game and hero singleton objects already instantiated
		*/
        init: function () {
            setCanvasGlobals();

            setAudio();
            setupLoadingScreen();

            level.init();
            hero.init();
            

            // game timer
            setInterval(function () {
                ++game.actualTime;

                //console.log(game.actualTime + 's', hero.x + "px");
                //console.log(game.actualTime + 's', hero.y + "px");

            }, 1000);

            console.log("which file2");
            startScreen.start();
        }
    }
})();

$(function () {
    Main.init();
});

//@ sourceMappingURL=pageJonsQuest.js.map