hero = function(){
	var imgReady = false,
		img = null,
		showStep = true
	
	return {
		x: 0,				// top left of sprite
		y: 0,
		lvlX: 0,				
		w: 28,
		h: 38,
		vX: 0,
		vY: 0,
		maxVx: 6,
		maxVy: 15,
		dirR: true, 
		speed: 1.5,
		speedCost: 8,
		isJumping: false,
		onObj: true,
		onObjX: -1,
		onObjY: -1,
		jumpCost: 8,
		jumpMod: 5,			// jumpMod must == jumpPower
		jumpPower: 5,
		jumpPowerMax: 10,
		ammo: 0,
		
		init: function(){
			img = new Image()
			
			img.onload = function() {imgReady = true}
			img.src = 'img/player.png';
			
		},
		
		update: function(){
			checkInput()
			updatePosition()
			checkCollision()
			
			//console.log({a: hero.lvlX, b: hero.x})
		},
	
		render: function(){
			drawHero()
	    	drawBullets()
		}
	}
	
	/*********************** Update ***********************/
	
	function offObj(){
		hero.onObj = false
		hero.onObjX = -1
		hero.onObjY = -1
	}
	
	function screenCollision(){
		if(hero.y < 0){								// top
		    hero.y = 0
		    hero.vY = 0
		}
		else if(hero.y > (canvas.height - game.padBot - hero.h)){ // bottom
		    hero.y = canvas.height - game.padBot - hero.h
		    hero.isJumping = false
		}
		else if(hero.onObj){ 						// on top of obj
			hero.y = hero.onObjY
		}
	
		if(hero.x < 0) 								// left
		    hero.x = 0
		else if(hero.x > (canvas.width - hero.w)){ 	// right 
		    hero.x = canvas.width - hero.w
	   }
	}
	
	function bulletHandler(){
	    for(var i=0; i < bulletArr.length; i++){
	    	bulletArr[i].x += bulletArr[i].dirR ? bullet.speed : -bullet.speed // update position
	    	
	    	// check collision
	        if(utils.isCollision(bulletArr[i], monster, 0))						// bullet and monster
                utils.reset()
            else if(bulletArr[i].x > canvas.width || bulletArr[i].x < 0)		// bullet and screen
            	bulletArr.splice(i, 1) // remove ith item
	    }
	}
		
	function checkCollision(){
		//---hero and monster
		
		if(utils.isCollision(hero, monster, 0))
			utils.reset()
		
	    
	    bulletHandler()		// bullet's and monster/screen
		screenCollision()	// hero and screen/ top of obj
		
		//---hero and game objects
		var k, 
			i = 'lvl' + game.lvl,
			collisionDir = Dir.NONE
			
		for(var j in lvlCollisionPts[i]){
			k = lvlCollisionPts[i][j]
			
			// using player dimensions as the moe
			if(utils.isCollision(hero, k, 0, true)){
				if(hero.dirR){								// left side of obj
					if(hero.lvlX - hero.x < k.x){
						hero.onObjX = k.x-hero.lvlX - hero.w
						hero.onObjLvlX = hero.lvlX
																		
						collisionDir = Dir.LEFT
						
					}
				}
				else{										// right side of obj
					if((hero.x + hero.lvlX + hero.w) > (k.x + k.w)){
						hero.onObjX = k.x-hero.lvlX + k.w
						hero.onObjLvlX = hero.lvlX
						collisionDir = Dir.RIGHT
					}
				}
				
				
				if((hero.x != hero.onObjX) && ((hero.y + hero.h - 17) < k.y) && // top of obj 
					(hero.vY > 0)	// moving down
				){		
					hero.onObjY = hero.y = k.y - hero.h
					hero.isJumping = false
					hero.onObj = true
					collisionDir = Dir.TOP
				}
				else{												// bot of obj
					if((hero.y + hero.h) > (k.y + k.h)){
						hero.onObjY = hero.y = k.y + k.h
						hero.jumpMod = 0
						hero.vY = 0
						collisionDir = Dir.BOT
					}
				}
			}
			
			if(collisionDir != Dir.NONE){
				if((collisionDir == Dir.LEFT) || (collisionDir == Dir.RIGHT)){
					hero.x = hero.onObjX
					hero.lvlX = hero.onObjLvlX
				}
				
				break
			}
		}
		
		if(collisionDir == Dir.NONE){
			offObj()
		}
	}
	
	function checkInput(){
		if(!hero.onObj)
			hero.vY = ((hero.vY + game.gravity) > hero.maxVy) ? hero.maxVy : (hero.vY + game.gravity)
		
		if(hero.vX != 0)
			hero.vX += (hero.vX > 0) ? -game.friction : game.friction;
		
		if(65 in keysDown){ 			// left (a)
		    hero.vX = (Math.abs(hero.vX - hero.speed) > hero.maxVx) ? -hero.maxVx : (hero.vX - hero.speed)
		    hero.dirR = false
		}
		
		if(68 in keysDown){ 			// right (d)
		    hero.vX = (Math.abs(hero.vX + hero.speed) > hero.maxVx) ? hero.maxVx : (hero.vX + hero.speed)
		    hero.dirR = true
	    }
	    
	    if(Math.abs(hero.vX) < hero.speed)
	    	hero.vX = 0
	    
	    if(74 in keysDown){ 			// shoot (j)
	    	
	    	if(hero.ammo > 0){
	    	
		    	utils.playSound(game.sound.gun)
		        
	            bulletArr[bulletArr.length] = {
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
		
		if(75 in keysDown){ 			// jump (k)
		    if(!hero.isJumping){
		    	game.sound.jump.play()
		        
		        hero.vY = 0
		      	hero.isJumping = true
		      	offObj()
		      	
		      	delete keysDown[75]
		    }
		}
		
		if(hero.isJumping){
			if(hero.jumpMod > 0){
				hero.vY -= hero.jumpMod
				--hero.jumpMod
			}
		}
		else{
			hero.jumpMod = hero.jumpPower
		}
		
	}
	
	function updatePosition(){	
		if(hero.x != (hero.x + hero.vX))
			game.sound.step.play()
		
		//game.sound.thud.play();
		
		hero.y += hero.vY
		
		
		if(((hero.dirR && hero.x >= ((canvas.width/2) + 35)) ||
		   (!hero.dirR && hero.x <= ((canvas.width/2) - 45))) &&
		   (hero.lvlX + hero.vX >= 0)
		   // && hero.lvlX + hero.vX <= canvas.width)
	    ){
			hero.lvlX += hero.vX
			
			
			// TODO: move to better location
			lvl0.sack.x -= hero.vX
			monster.x -= hero.vX
		}
		else {
			hero.x += hero.vX
		}
		
	}
	
	
	/*********************** Render ***********************/
	function drawHero(){
		if(imgReady){
			
			if(game.totalTime % 12 == 0)
				showStep = showStep ? false : true
			
			
			// TODO: move to update
    		if(hero.dirR){
    			hero.sx = 92
    			hero.sy = 2
    			
	   			if(showStep && 68 in keysDown){ 
    				hero.sx = 2
    				hero.sy = 42
    			}
 
    		}
    		else{
    			hero.sx = 32
				hero.sy = 2

    			if(showStep && 65 in keysDown){ 
    				hero.sx = 62
    				hero.sy = 2
    			}
    		}
    		
    		
    		ctx.drawImage(img, hero.sx, hero.sy, hero.w, hero.h, hero.x, hero.y, hero.w, hero.h);
    		
    	}
	}
	
	function drawBullets(){
		for(var i=0; i < bulletArr.length; i++){
    	    var dirOffset = 0 
	    	    
            if(bulletArr[i].dirR)
                dirOffset = hero.w / 2
	            
            ctx.fillStyle = bullet.color
            utils.drawEllipse(bulletArr[i].x + dirOffset, bulletArr[i].y + 4.5, bullet.w, bullet.h)
        }
	}
}()
