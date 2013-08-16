function setupInput(){
	// global key vars
	keysDown = {};
	lastKeyDown = -1;
	
	addEventListener('keydown', function (e) {

	    if (e.keyCode == 32)
	        e.preventDefault(); 			//----- space bar (scrolling to bottom of page)
	    else if (e.keyCode == 77)			//----- mute/unmute (m)
	        utils.muteHelper();
	    else if (e.keyCode == 75 &&			//----- jump (k)
    		   (!hero.isJumping && ((lastKeyDown != 75) || !(75 in keysDown))) &&
    		   (hero.onObj || hero.onGround)
		) {
	        game.sound.jump.play();
	        hero.vY = 0;
	        hero.isJumping = true;
	        hero.offObj();

	        //delete keysDown[75];
	    }
	    else if (e.keyCode == 74 &&		//----- shoot (j) 			
   				((lastKeyDown != 74) || !(74 in keysDown))
   		) {
	        if (hero.ammo > 0 && !hero.isCarrying) {
	            utils.playSound(game.sound.gun);

	            hero.bulletArr[hero.bulletArr.length] = {
	                x: hero.x,
	                y: hero.y,
	                w: bullet.w,
	                h: bullet.h,
	                dirR: hero.dirR,
	                deg: 0
	            };

	            --hero.ammo;
	        }

	        //delete keysDown[74]
	    }

	    lastKeyDown = e.keyCode;

	    keysDown[e.keyCode] = true;
	}, false);
	
	addEventListener('keyup', function (e) { delete keysDown[e.keyCode];}, false);
}


function checkInput(){
		
    hero.dir = Dir.NONE;
		
    if (!hero.onObj)
        hero.vY = ((hero.vY + game.gravity) > hero.maxVy) ? hero.maxVy : (hero.vY + game.gravity);
		
		if(hero.vX !== 0)
			hero.vX += (hero.vX > 0) ? -game.friction : game.friction;
			
			
			
		// --------- keys pressed --------
			
		//----- left (a)
		if(65 in keysDown){ 			
		    hero.vX = (Math.abs(hero.vX - hero.speed) > hero.maxVx) ? -hero.maxVx : (hero.vX - hero.speed);
		    hero.dirR = false;
		    hero.dir = Dir.LEFT;
		}

		
		
		//----- right (d)
		if(68 in keysDown){ 			
		    hero.vX = (Math.abs(hero.vX + hero.speed) > hero.maxVx) ? hero.maxVx : (hero.vX + hero.speed);
		    hero.dirR = true;
		    hero.dir = Dir.RIGHT;
	    }
	    
	    if(Math.abs(hero.vX) < hero.speed){    
	    	hero.vX = 0;
	    }
	    else if(((hero.dir != Dir.LEFT) && (hero.dir != Dir.RIGHT))){
	    	hero.vX /= 1.2;
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
			}
		}
		
		
		//----- restore (r)
		if(82 in keysDown && !(17 in keysDown)){	// 17 = ctrl
			if(hero.manaKits > 0 && hero.mana < hero.maxMana){
				++hero.mana;
				--hero.manaKits;
			}
		}
		
	}