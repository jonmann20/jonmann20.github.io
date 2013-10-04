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

//@ sourceURL=heroPhysics.js
