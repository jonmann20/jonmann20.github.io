function checkInput(){
		
		hero.dir = Dir.NONE
		
		if(!hero.onObj)
			hero.vY = ((hero.vY + game.gravity) > hero.maxVy) ? hero.maxVy : (hero.vY + game.gravity)
		
		if(hero.vX != 0)
			hero.vX += (hero.vX > 0) ? -game.friction : game.friction;
			
			
		//----- left (a)
		if(65 in keysDown){ 			
		    hero.vX = (Math.abs(hero.vX - hero.speed) > hero.maxVx) ? -hero.maxVx : (hero.vX - hero.speed)
		    hero.dirR = false
		    hero.dir = Dir.LEFT
		}
		
		
		//----- right (d)
		if(68 in keysDown){ 			
		    hero.vX = (Math.abs(hero.vX + hero.speed) > hero.maxVx) ? hero.maxVx : (hero.vX + hero.speed)
		    hero.dirR = true
		    hero.dir = Dir.RIGHT
	    }
	    
	    if(Math.abs(hero.vX) < hero.speed)
	    	hero.vX = 0
	    
	    
	    //----- shoot (j)
	    if(74 in keysDown){ 			
	    	
	    	if(hero.ammo > 0 && !hero.isCarrying){
		    	utils.playSound(game.sound.gun)
		        
	            hero.bulletArr[hero.bulletArr.length] = {
	                x: hero.x,
	                y: hero.y,
	                w: bullet.w,
	                h: bullet.h,
	                dirR: hero.dirR
	            }
		    	
		    	--hero.ammo
	    	}
	        
	        delete keysDown[74]
		}
		
		
		//----- jump (k)
		if(75 in keysDown){ 			
		    if(!hero.isJumping){
		    	game.sound.jump.play()
		        
		        hero.vY = 0
		      	hero.isJumping = true
		      	hero.offObj()
		      	
		      	delete keysDown[75]
		    }
		}
		
		if(hero.isJumping){
			if(hero.jumpMod > 0){
				hero.vY -= hero.jumpMod
				--hero.jumpMod
			}
			hero.dir = Dir.TOP
		}
		else{
			hero.jumpMod = hero.jumpPower
		}
		
		
		//----- drop object (spacebar)
		if(32 in keysDown){				
			lvl0.crate.holding = false
			hero.isCarrying = false
		}
		
		
		//----- heal (h)
		if(72 in keysDown){
			if(hero.medKits > 0 && hero.health < hero.maxHealth){
				++hero.health
				--hero.medKits
			}
		}
		
		
		//----- restore (r)
		if(82 in keysDown){
			if(hero.manaKits > 0 && hero.mana < hero.maxMana){
				++hero.mana
				--hero.manaKits
			}
		}
		
	}