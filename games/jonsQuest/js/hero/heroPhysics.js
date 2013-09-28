/*
    The physics component of hero.
*/
var HeroPhysicsComponent = function () {
    //$.extend(this, hero.protectedInfo);

    function screenCollision() {
        hero.onGround = false;

        if (hero.y < -hero.h) {
            hero.y = -hero.h;
            hero.vY = 0;
        }
        if (hero.y > (canvas.height - game.padBot - hero.h)) { // bottom
            hero.y = canvas.height - game.padBot - hero.h;
            hero.isJumping = false;
            hero.onGround = true;
        }
        else if (hero.onObj) { 						// on top of obj
            hero.y = hero.onObjY;
        }

        if (hero.x < 0) 								// left
            hero.x = 0;
        else if (hero.x > (canvas.width - hero.w)) { 	// right 
            hero.x = canvas.width - hero.w;
        }
    }

    function bulletHandler() {
        for (var i = 0; i < hero.bulletArr.length; i++) {
            hero.bulletArr[i].x += hero.bulletArr[i].dirR ? bullet.speed : -bullet.speed; // update position

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
		    if(hero.isJumping){
			    if(hero.jumpMod > 0){
			        hero.vY -= hero.jumpMod;
			        --hero.jumpMod;
			    }
                hero.dir = Dir.TOP;
            }
            else{
			    hero.jumpMod = hero.jumpPower;
            }
		
            if(hero.x != (hero.x + hero.vX))
                audio.step.play();
		
            hero.y += hero.vY;
		
            if(((hero.dirR && hero.x >= ((canvas.width/2) + 35)) ||
               (!hero.dirR && hero.x <= ((canvas.width/2) - 45))) &&
               (hero.lvlX + hero.vX >= 0) &&
               (hero.lvlX + hero.vX <= level.width - canvas.width)
            ){
                hero.lvlX += hero.vX;
                level.updateObjs();
            }
            else {
                hero.x += hero.vX;
            }
        },

        checkCollision: function () {
	        bulletHandler();		// bullet's and screen
            screenCollision();	    // hero and screen/ top of obj
		
            heroAndLvlCollision();
        },

        /*
            checks collision between hero and k
            returns Dir
        */
        objCollision: function(obj) {
            var collisionDir = Dir.NONE;

            // using player dimensions as the moe
            if (Physics.isCollision(hero, obj, 0, true)) {

                collisionDir = Dir.IN;

                if (hero.dirR && (hero.lvlX - hero.x < obj.x)) {                    // left side of obj
                    collisionDir = Dir.LEFT;
                }
                else if ((hero.x + hero.lvlX + hero.w) > (obj.x + obj.w)) {         // right side of obj
                    collisionDir = Dir.RIGHT;
                }


                if ((hero.x != hero.onObjX) && ((hero.y + hero.h - 17) < obj.y) &&  // top of obj 
                    (hero.vY > 0)	// moving down
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
