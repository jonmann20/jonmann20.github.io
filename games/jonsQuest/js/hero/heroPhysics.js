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
        else if (hero.onObj) { 						// on top of obj
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
            var fixBs = (bullet.speed / game.fps);

            hero.bulletArr[i].x += hero.bulletArr[i].dirR ? fixBs : -fixBs; // update position

            // bullet and level object
            var k,
                lvl = 'lvl' + game.lvl,
                wasCollision = false;

            /* this is not working quickly enough!!!!!
			for(var j in level.collisionPts[lvl]){
				k = level.collisionPts[lvl][j]
										 if(physics.isCollision(hero.bulletArr[i], k, 0)){
					wasCollision = true
				}
			}*/


            if (wasCollision || hero.bulletArr[i].x > canvas.width || hero.bulletArr[i].x < 0)		// bullet and screen
                hero.bulletArr.splice(i, 1); // remove ith item
        }
    }

    function heroAndLvlCollision() {
        var i = game.lvl;

        for (var j in level.collisionPts[i]) {
            var k = level.collisionPts[i][j];
            var collisionDir = hero.physics.objCollision(k);

            // TODO: move this to a "solid rectangle object"
            if (collisionDir != Dir.NONE) {

                if (collisionDir == Dir.LEFT) {
                    hero.onObjX = k.x - hero.lvlX - hero.w;
                    hero.onObjLvlX = hero.lvlX;
                }
                else if (collisionDir == Dir.RIGHT) {
                    hero.onObjX = k.x - hero.lvlX + k.w;
                    hero.onObjLvlX = hero.lvlX;
                }
                else if (collisionDir == Dir.TOP) {
                    hero.onObjY = hero.y = k.y - hero.h;
                    hero.isJumping = false;
                    hero.onObj = true;
                }
                else if (collisionDir == Dir.BOT) {
                    if (hero.vY < -4) {
                        audio.play(audio.thud, true);
                    }

                    hero.onObjY = hero.y = k.y + k.h;
                    hero.jumpMod = 0;
                    hero.vY = 0;
                }

                if ((collisionDir == Dir.LEFT) || (collisionDir == Dir.RIGHT)) {
                    hero.x = hero.onObjX;
                    hero.lvlX = hero.onObjLvlX;
                }

                break;
            }
        }

        if (collisionDir == Dir.NONE) {
            hero.offObj();
        }
    }


    return {
        updatePosition: function (){	
            hero.y += (hero.vY / game.fps);


            var fixVx = (hero.vX / game.fps);

            if (hero.x != (hero.x + fixVx)) {
                audio.step.play();
            }

            if(((hero.dir == Dir.RIGHT && hero.x >= ((canvas.width/2) + 35)) ||
               (hero.dir == Dir.LEFT && hero.x <= ((canvas.width/2) - 45))) &&
               (hero.lvlX + fixVx >= 0) &&
               (hero.lvlX + fixVx <= level.width - canvas.width)
            ){
                hero.lvlX += fixVx;
                level.updateObjs();
            }
            else {
                hero.x += fixVx;
            }
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


                if ((hero.x != hero.onObjX) && ((hero.y + hero.h - 17) < obj.y) &&  // top of obj 
                    (hero.vY > 0) ||	// moving down 
                    hero.onObj
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
