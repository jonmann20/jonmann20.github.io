window.hero = (function(){
	var imgReady = false,
		img = null,
		showRun = true,
		gameOver = false,
		spriteArr = [],
		shuriken = null,
		shurikenReady = false,
		shurikenDeg = 0
	;
	
		
	/*********************** Update ***********************/
	
	function screenCollision(){
		
		hero.onGround = false;
		
		if(hero.y < -hero.h){
			hero.y = -hero.h;
			hero.vY = 0;
		}
		if(hero.y > (canvas.height - game.padBot - hero.h)){ // bottom
		    hero.y = canvas.height - game.padBot - hero.h
		    hero.isJumping = false;
		    hero.onGround = true;
		}
		else if(hero.onObj){ 						// on top of obj
			hero.y = hero.onObjY;
		}
	
		if(hero.x < 0) 								// left
		    hero.x = 0;
		else if(hero.x > (canvas.width - hero.w)){ 	// right 
		    hero.x = canvas.width - hero.w;
	   }
	}
	
	function bulletHandler(){
	    for(var i=0; i < hero.bulletArr.length; i++){
	    	hero.bulletArr[i].x += hero.bulletArr[i].dirR ? bullet.speed : -bullet.speed // update position
	    	
	    	// bullet and level object
            var k, 
                lvl = 'lvl' + game.lvl,
                wasCollision = false
                
    		/* this is not working quickly enough!!!!!
			for(var j in level.collisionPts[lvl]){
				k = level.collisionPts[lvl][j]
										 if(utils.isCollision(hero.bulletArr[i], k, 0)){
					wasCollision = true
				}
			}*/
			
                
            if(wasCollision || hero.bulletArr[i].x > canvas.width || hero.bulletArr[i].x < 0)		// bullet and screen
            	hero.bulletArr.splice(i, 1); // remove ith item
	    }
	}
		
	function checkCollision(){
	    bulletHandler();		// bullet's and screen
		screenCollision();	// hero and screen/ top of obj
		
		//---hero and game objects
		var k, 
			i = "lvl" + game.lvl,
			collisionDir = Dir.NONE;
			
		for(var j in level.collisionPts[i]){
			k = level.collisionPts[i][j];
			
			// using player dimensions as the moe
			if(utils.isCollision(hero, k, 0, true)){
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
					if((hero.y + hero.h) > (k.y + k.h)){
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
	
	function updatePosition(){	
		
		if(hero.isJumping){
			if(hero.jumpMod > 0){
				hero.vY -= hero.jumpMod
				--hero.jumpMod;
			}
			hero.dir = Dir.TOP;
		}
		else{
			hero.jumpMod = hero.jumpPower;
		}
		
		if(hero.x != (hero.x + hero.vX))
			game.sound.step.play();
		
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
		
	}
	
	function getSpritePos(){
		if(game.totalTicks % 12 == 0)
			showRun = !showRun;
			
		var pos = {x: 0, y: 0};
		
		if(hero.isCarrying && hero.vX == 0 && hero.dir == Dir.NONE){
			pos = spriteArr["playerDown"];
		}
		else if(hero.dirR){
			if(hero.dir == Dir.RIGHT){
   				if(Math.abs(hero.vX) <= hero.speed*3.5)
   					pos = spriteArr["playerRight_Step"];
				else if(showRun){
					pos = spriteArr["playerRight_Run1"];
				}
				else 
					pos = spriteArr["playerRight_Run2"]; // testing 2
			}
			else
				pos = spriteArr["playerRight"];
		}
		else{
			if(hero.dir == Dir.LEFT){ 
				
				if(Math.abs(hero.vX) <= hero.speed*3.5)
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
		
		var inv = hero.invincibleTimer % 20;
		
		if(hero.invincible && ( 
				inv == 0 ||
				inv == 1 ||
				inv == 2 ||
				inv == 3 ||
				inv == 4 ||
				inv == 5 ||
				inv == 6
		)){
			pos = {x: -1, y: -1};
		}
		
		
		hero.sx = pos.x;
		hero.sy = pos.y;
	}
	
	/*********************** Render ***********************/
	
	function drawHero(){
		if(imgReady){
    		ctx.drawImage(img, hero.sx, hero.sy, hero.w, hero.h, hero.x, hero.y, hero.w, hero.h);
    	}
	}
	
	function drawBullets(){
		for(var i=0; i < hero.bulletArr.length; ++i){
    	    var dirOffset = hero.bulletArr[i].dirR ?
    							hero.w : 
    							0;
	            
        	hero.bulletArr[i].deg += 5;
            
            utils.drawRotate(
            	shuriken, 
            	hero.bulletArr[i].x + dirOffset,
            	hero.bulletArr[i].y + 20,
        	 	hero.bulletArr[i].deg
    	 	);
            
        }
	}
	
	function drawHealth(){
		for(var i=0; i < hero.health; ++i){
			ctx.fillStyle = "red";
			ctx.fillRect(80 + i*21, FULLH + 14, 19, 8);
		}
	}
	
	function drawMana(){
		for(var i=0; i < hero.mana; ++i){
			ctx.fillStyle = "#00b6ff";
			ctx.fillRect(80 + i*21, FULLH + 37, 19, 8);
		}
	}
	
	function drawXP(){
		ctx.fillStyle = "#ddd";
        ctx.font = "12px 'Press Start 2P'";
        	
    	var zero = (hero.xp < 10) ? '0' : '';
    	ctx.fillText(zero + hero.xp + '/' + hero.xpNeeded, 80, FULLH + 71);
	}
		
		
	return {
		ammo: 20,
		cash: 0,
		x: 0,				// top left of sprite
		y: 0,
		sx: 0,				// sprite pos
		sy: 0,
		lvlX: 0,				
		w: 28,
		h: 38,
		vX: 0,
		vY: 0,
		maxVx: 8,
		maxVy: 15,
		dir: Dir.NONE,
		dirR: true, 
		speed: 0.7,			// actuallly acceleration
		isJumping: false,
		isCarrying: false,
		onGround: true,
		onObj: true,
		onObjX: -1,
		onObjY: -1,
		jumpMod: 5,			// jumpMod must == jumpPower
		jumpPower: 5,
		jumpPowerMax: 10,
		invincible: false,
		invincibleTimer: 120,
		initInvincibleTimer: 120,
		health: 4,
		maxHealth: 5,
		medKits: 1,
		healthLvl: 1,
		mana: 0,
		maxMana: 4,
		manaKits: 1,
		manaLvl: 1,
		lvl: 1,
		xp: 0,
		xpNeeded: 50,
		bulletArr: [],
		
		init: function(){
			img = new Image();
			
			img.onload = function() {imgReady = true;}
			img.src = "../dungeon/img/sprites/player/player.png";
			
			
			$.get('../dungeon/img/sprites/player/player.xml', function(xml){
				var wrap = $(xml).find('sprite');
				
				$(wrap).each(function(){
					var name = $(this).attr('n'),
						x = $(this).attr('x'),
						y = $(this).attr('y');
					
					name = name.substring(0, name.length-4);
					spriteArr[name] = {x: x, y: y};
				});
				
			});
			
			shuriken = new Image();
			shuriken.src = "img/shuriken.png";
			shuriken.onload = function() {shurikenReady = true;}
			
		},
		
		offObj: function(){
			hero.onObj = false;
			hero.onObjX = -1;
			hero.onObjY = -1;
		},
		
		update: function(){
			updatePosition();
			checkCollision();
			
			if(hero.invincible)
				--hero.invincibleTimer;
			
			if(hero.invincibleTimer <= 0){
				hero.invincible = false;
				hero.invincibleTimer = hero.initInvincibleTimer;
			}
			
			if(hero.health <= 0 && !gameOver){
				utils.playSound(game.sound.death, false);
				game.sound.bgMusic.lvl0.muted = true;
				
				alert('You died')
				location.reload();
				gameOver = true;
			}
			
			getSpritePos();
		},
	
		render: function(){
			drawHero();
	    	drawBullets();
	    	
			drawHealth();
			drawMana();
			drawXP();
		}
	};
})();
