hero = function(){
	var imgReady = false,
		img = null,
		showStep = true,
		bullet = {
			color : "rgba(192, 192, 192, .75)",
			w : 19.5,
			h : 9,
			speed : 8
		},
		Dir = Object.freeze({
			NONE : 0,
			TOP : 1,
			BOT : 2,
			LEFT : 3,
			RIGHT : 4
		}),
		Inv_e = Object.freeze({
			NOT_HIT: 0,
			HIT_WHITE: 1,
			HIT_RED: 2
		}),
		gameOver = false
	
		
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
	    for(var i=0; i < hero.bulletArr.length; i++){
	    	hero.bulletArr[i].x += hero.bulletArr[i].dirR ? bullet.speed : -bullet.speed // update position
	    	
	    	// bullet and level object
            var k, 
                lvl = 'lvl' + game.lvl,
                wasCollision = false
                
    		for(var j in level.collisionPts[lvl]){
				k = level.collisionPts[lvl][j]
			
				if(utils.isCollision(hero.bulletArr[i], k, 0)){
					wasCollision = true
				}
			}
                
            if(wasCollision || hero.bulletArr[i].x > canvas.width || hero.bulletArr[i].x < 0)		// bullet and screen
            	hero.bulletArr.splice(i, 1) // remove ith item
	    }
	}
		
	function checkCollision(){
		//---hero and monster
		
		/*
		if(!hero.invincible && utils.isCollision(hero, monster, 0)){
					// level.reset()
					
					utils.playSound(game.sound.thud, false)
					
					hero.invincible = true
					
					if(--hero.health <= 0){
						utils.playSound(game.sound.death, false)
						
						
						alert('you died')
						location.reload()
					}
					
				}*/
		
		
	    
	    bulletHandler()		// bullet's and screen
		screenCollision()	// hero and screen/ top of obj
		
		//---hero and game objects
		var k, 
			i = 'lvl' + game.lvl,
			collisionDir = Dir.NONE
			
		for(var j in level.collisionPts[i]){
			k = level.collisionPts[i][j]
			
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
		
		hero.dir = Dir.NONE
		
		if(!hero.onObj)
			hero.vY = ((hero.vY + game.gravity) > hero.maxVy) ? hero.maxVy : (hero.vY + game.gravity)
		
		if(hero.vX != 0)
			hero.vX += (hero.vX > 0) ? -game.friction : game.friction;
		
		if(65 in keysDown){ 			// left (a)
		    hero.vX = (Math.abs(hero.vX - hero.speed) > hero.maxVx) ? -hero.maxVx : (hero.vX - hero.speed)
		    hero.dirR = false
		    hero.dir = Dir.LEFT
		}
		
		if(68 in keysDown){ 			// right (d)
		    hero.vX = (Math.abs(hero.vX + hero.speed) > hero.maxVx) ? hero.maxVx : (hero.vX + hero.speed)
		    hero.dirR = true
		    hero.dir = Dir.RIGHT
	    }
	    
	    if(Math.abs(hero.vX) < hero.speed)
	    	hero.vX = 0
	    
	    if(74 in keysDown){ 			// shoot (j)
	    	
	    	if(hero.ammo > 0){
	    	
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
		
		if(75 in keysDown){ 			// jump (k)
		    if(!hero.isJumping){
		    	game.sound.jump.play()
		        
		        hero.vY = 0
		      	hero.isJumping = true
		      	offObj()
		      	
		      	delete keysDown[75]
		    }
		}
		
		if(32 in keysDown){				// dropObject (spacebar)
			lvl0.crate.holding = false
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
		
	}
	
	function updatePosition(){	
		if(hero.x != (hero.x + hero.vX))
			game.sound.step.play()
		
		//game.sound.thud.play();
		
		hero.y += hero.vY
		
		if(((hero.dirR && hero.x >= ((canvas.width/2) + 35)) ||
		   (!hero.dirR && hero.x <= ((canvas.width/2) - 45))) &&
		   (hero.lvlX + hero.vX >= 0) &&
		   (hero.lvlX + hero.vX <= level.width - canvas.width)
	    ){
			hero.lvlX += hero.vX
			level.updateObjs()
		}
		else {
			hero.x += hero.vX
		}
		
	}
	
	
	/*********************** Render ***********************/
	
	var playerD = {x: 2, y: 2},
		playerL = {x: 32, y: 2},
		playerLRed = {x: 62, y: 2},
		playerLStep = {x: 92, y: 2},
		playerLWhite = {x: 2, y: 42},
		playerR = {x:32, y: 42},
		playerRRed = {x:62, y: 42},
		playerRStep = {x: 92, y: 42},
		playerRWhite = {x: 2, y: 82},
		playerU = {x: 32, y: 82},
		player_picked = {x: 62, y: 82}
		
	
	function drawHero(){
		if(imgReady){
			if(game.totalTicks % 12 == 0)
				showStep = showStep ? false : true
			
			var inv = Inv_e.NOT_HIT
			if(hero.invincible)
				inv = (hero.invincibleTimer % 5 == 0) ? Inv_e.HIT_WHITE : Inv_e.HIT_RED		// TODO: allow for separate 'hit' and 'invincible' states
			
			var pos = {x: 0, y: 0}
			
			// TODO: move to update
			
			
			if(hero.vX == 0 && hero.dir == Dir.NONE){
				pos = playerD
			}
			// else if(hero.dir == Dir.TOP){ // jumping
				// pos = playerU
			// }
    		else if(hero.dirR){
    			pos = playerR
    			
	   			if(showStep && 68 in keysDown){ 
    				pos = playerRStep
    			}
 
 				if(inv == Inv_e.HIT_WHITE){
 					pos = playerRWhite
 				}
 				else if(inv == Inv_e.HIT_RED){
 					pos = playerRRed
 				}
 
    		}
    		else{
    			pos = playerL

    			if(showStep && 65 in keysDown){ 
    				pos = playerLStep
    			}
    			
    			if(inv == Inv_e.HIT_WHITE){
					pos = playerLWhite
    			}
    			else if(inv == Inv_e.HIT_RED){
					pos = playerLRed
    			}
    			
    		}
    		
    		ctx.drawImage(img, pos.x, pos.y, hero.w, hero.h, hero.x, hero.y, hero.w, hero.h);
    	}
	}
	
	function drawHealth(){
		for(var i=0; i < hero.health; ++i){
			ctx.fillStyle = "red"
			ctx.fillRect(80 + i*21, FULLH + 14, 19, 8)
		}
	}
	
	function drawMana(){
		for(var i=0; i < hero.mana; ++i){
			ctx.fillStyle = "#00b6ff"
			ctx.fillRect(80 + i*21, FULLH + 37, 19, 8)
		}
	}
	
	function drawXP(){
		ctx.fillStyle = "#ddd"
        ctx.font = "12px 'Press Start 2P'"
        	
    	var zero = (hero.xp < 10) ? '0' : ''
        	
    	ctx.fillText(zero + hero.xp + '/' + hero.xpNeeded, 80, FULLH + 71)
	}
	
	function drawBullets(){
		for(var i=0; i < hero.bulletArr.length; ++i){
    	    var dirOffset = 0 
	    	    
            if(hero.bulletArr[i].dirR)
                dirOffset = hero.w / 2
	            
            ctx.fillStyle = bullet.color
            drawEllipse(hero.bulletArr[i].x + dirOffset, hero.bulletArr[i].y + 4.5, bullet.w, bullet.h)
        }
	}
	
	function drawEllipse(x, y, w, h) {
		var kappa = .5522848,
			ox = (w / 2) * kappa, // control point offset horizontal
			oy = (h / 2) * kappa, // control point offset vertical
			xe = x + w, // x-end
			ye = y + h, // y-end
			xm = x + w / 2, // x-middle
			ym = y + h / 2 // y-middle

		ctx.beginPath()
		ctx.moveTo(x, ym)
		ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y)
		ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym)
		ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye)
		ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym)
		ctx.closePath()
		ctx.fill()
	}
		
		
	return {
		ammo: 20,
		cash: 0,
		x: 0,				// top left of sprite
		y: 0,
		lvlX: 0,				
		w: 28,
		h: 38,
		vX: 0,
		vY: 0,
		maxVx: 6,
		maxVy: 15,
		dir: Dir.NONE,
		dirR: true, 
		speed: 1.5,
		isJumping: false,
		isCarrying: false,
		onObj: true,
		onObjX: -1,
		onObjY: -1,
		jumpMod: 5,			// jumpMod must == jumpPower
		jumpPower: 5,
		jumpPowerMax: 10,
		invincible: false,
		invincibleTimer: 40,
		initInvincibleTimer: 40,
		health: 4,
		maxHealth: 4,
		healthLvl: 1,
		mana: 0,
		maxMana: 4,
		manaLvl: 1,
		lvl: 1,
		xp: 0,
		xpNeeded: 50,
		medKits: 1,
		bulletArr: [],
		
		init: function(){
			img = new Image()
			
			img.onload = function() {imgReady = true}
			img.src = 'img/player.png';
			
		},
		
		update: function(){
			checkInput()
			updatePosition()
			checkCollision()
			
			
			if(hero.invincible)
				--hero.invincibleTimer
			
			if(hero.invincibleTimer <= 0){
				hero.invincible = false
				hero.invincibleTimer = hero.initInvincibleTimer
			}
			
			if(hero.health <= 0 && !gameOver){
				utils.playSound(game.sound.death, false)
				game.sound.bgMusic.lvl0.muted = true
				
				alert('You died')
				location.reload()
				gameOver = true
			}
			
			//console.log({a: hero.lvlX, b: hero.x})
		},
	
		render: function(){
			drawHero()
	    	drawBullets()
	    	
			drawHealth()
			drawMana()
			drawXP()
		}
	}
}()
