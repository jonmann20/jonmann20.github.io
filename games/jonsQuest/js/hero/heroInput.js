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
                else if (e.keyCode == 75 &&			//----- jump (k)
                       (!hero.isJumping && ((lastKeyDown != 75) || !(75 in keysDown))) &&
                       (hero.onObj || hero.onGround)
                ) {
                    audio.jump.play();
                    hero.vY = 0;
                    hero.isJumping = true;
                    hero.offObj();

                    //delete keysDown[75];
                }
                else if (e.keyCode == 74 &&		//----- shoot (j) 			
                        ((lastKeyDown != 74) || !(74 in keysDown))
                ) {
                    if (hero.ammo > 0 && !hero.isCarrying) {
                        audio.play(audio.effort);

                        utils.printDir(hero.dir);

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

                    //delete keysDown[74]
                }

                lastKeyDown = e.keyCode;

                keysDown[e.keyCode] = true;
            }, false);
	
            addEventListener("keyup", function (e) { delete keysDown[e.keyCode];}, false);
        },

        check: function(){
            if (!hero.onObj)
                hero.vY = ((hero.vY + game.gravity) > hero.maxVy) ? hero.maxVy : (hero.vY + game.gravity);



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
