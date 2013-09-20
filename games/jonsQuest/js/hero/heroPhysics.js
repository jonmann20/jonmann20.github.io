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
		
            //---hero and game objects
            var k, 
                i = "lvl" + game.lvl,
                collisionDir = Dir.NONE;
			
            for(var j in level.collisionPts[i]){
                k = level.collisionPts[i][j];
			
                // using player dimensions as the moe
                if(Physics.isCollision(hero, k, 0, true)){
                    if(hero.dirR){								// left side of obj
                        if(hero.lvlX - hero.x < k.x){
                            hero.onObjX = k.x-hero.lvlX - hero.w;
                            hero.onObjLvlX = hero.lvlX;
																		
                            collisionDir = Dir.LEFT;
                        }
                    }
                    else{										// right side of obj
                        if((hero.x + hero.lvlX + hero.w) > (k.x + k.w)){
                            hero.onObjX = k.x-hero.lvlX + k.w;
                            hero.onObjLvlX = hero.lvlX;
                            collisionDir = Dir.RIGHT;
                        }
                    }
				
				
                    if((hero.x != hero.onObjX) && ((hero.y + hero.h - 17) < k.y) && // top of obj 
                        (hero.vY > 0)	// moving down
                    ){		
                        hero.onObjY = hero.y = k.y - hero.h;
                        hero.isJumping = false;
                        hero.onObj = true;
                        collisionDir = Dir.TOP;
                    }
                    else{												// bot of obj
                        if ((hero.y + hero.h) > (k.y + k.h)) {
                            
                            if (hero.vY < -4) {
                                audio.play(audio.thud, true);
                            }

                            hero.onObjY = hero.y = k.y + k.h;
                            hero.jumpMod = 0;
                            hero.vY = 0;
                            collisionDir = Dir.BOT;
                        }
                    }
                }
			
                if(collisionDir != Dir.NONE){
                    if((collisionDir == Dir.LEFT) || (collisionDir == Dir.RIGHT)){
                        hero.x = hero.onObjX;
                        hero.lvlX = hero.onObjLvlX;
                    }
				
                    break;
                }
            }
		
            if(collisionDir == Dir.NONE){
                hero.offObj();
            }
        }
    };
};
