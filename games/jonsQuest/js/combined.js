utils = function(){
	var alpha = 1,
		fadeOut = true
		
	
	return {
		
		/**************** Audio ***************/
		playSound : function(sound, stopPrev) {
			
			stopPrev = (typeof(stopPrev) !== 'undefined') ? stopPrev : true 
			
			if (sound.ended)
				sound.play()
			else {
				
				if(stopPrev || sound.currentTime == 0){
				
					sound.pause()
					sound.currentTime = 0
					sound.play()
				}
			}
		},
		
		muteHelper : function() {
			if ($('.audioState').hasClass('off')) {
				$('.audioState span').removeClass('icon-volume-mute').addClass('icon-volume-medium')
				$('.audioState').removeClass('off')
				$('.audioState').addClass('on')
	
				utils.muteSound(false)
			} 
			else {
				$('.audioState span').removeClass('icon-volume-medium').addClass('icon-volume-mute')
				$('.audioState').removeClass('on')
				$('.audioState').addClass('off')
	
				utils.muteSound(true)
			}
		},
	
		muteSound : function(mute) {
			// not working???
			// for(var i in game.sound){
			// i.muted = val
			// }
	
			game.sound.isOn = !mute
	
			var volumeReduction = mute ? 0 : 0.25
			switch(game.lvl){
				case -1:
				
					game.sound.bgMusic.start.muted = mute
					mute ?
						game.sound.bgMusic.start.pause():
						game.sound.bgMusic.start.play()
					
					//game.sound.bgMusic.start.volume = volumeReduction
				
					break
				case 0:
					game.sound.bgMusic.lvl0.muted = mute
					mute ?
						game.sound.bgMusic.lvl0.pause():
						game.sound.bgMusic.lvl0.play()
					
					//game.sound.bgMusic.lvl0.volume = volumeReduction
				break
			}
	
			game.sound.gun.muted = mute
			game.sound.gun.volume = volumeReduction
	
			game.sound.thud.muted = mute
			game.sound.thud.volume = volumeReduction
	
			game.sound.jump.muted = mute
			game.sound.jump.volume = volumeReduction
	
			game.sound.step.muted = mute
			game.sound.step.volume = volumeReduction
			
			game.sound.death.muted = mute
			game.sound.death.volume = volumeReduction
		},
		
		
		/*************** Interface ***************/
		blinkText: function(fontSize, x, y, str){
			
			str = (typeof(str) !== 'undefined') ? str : 'PRESS ENTER'
			
		    if(alpha <= 0)
		      fadeOut = false
		    else if(alpha > 1.55)
		      fadeOut = true
		    
		    var theDt = game.dt / 1000
		    
		    alpha += fadeOut ? -theDt : theDt
		    
		    // press enter
		    ctx.font = fontSize + "px 'Press Start 2P'"
		    var tmpW = ctx.measureText(str).width
		    ctx.fillStyle = 'rgba(233, 233, 233,' + alpha + ')'
		    ctx.fillText(str, x - tmpW/2, y)
		},
	
		
		/*************** Game Engine ***************/
		isCollision : function(a, b, moe, isLvl) {
			var aX = (typeof(isLvl) !== 'undefined')  ? a.x + a.lvlX : a.x
			
			if ((aX + moe <= (b.x + b.w)) && // a is to the left of the right side of b
				(b.x + moe <= (aX + a.w)) && // a is to the right of the left side of b
				(a.y + moe <= (b.y + b.h)) && // a is higher than the bot of b
				(b.y + moe <= (a.y + a.h)) 	  // a is lower than the top of b
			){
				return true
			}
	
			return false
		},
		
		drawEllipse: function(x, y, w, h) {
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
	}
}()


// global enums
Dir = Object.freeze({
	NONE: 0,
	TOP: 1,
	BOT: 2,
	LEFT: 3,
	RIGHT: 4
})

Inv_e = Object.freeze({
	NOT_HIT: 0,
	HIT_WHITE: 1,
	HIT_RED: 2
})

bullet = {
	color: "rgba(192, 192, 192, .75)",
	w: 19.5,
	h: 9,
	speed: 8
}

window.GameObj = function(){
	var img = null,
		ready = false;
	
	return {
		initX: -1,
		x: -1,
		initY: -1,
		y: -1,
		w: -1,
		h: -1,
		vY: 0,
		
		init: function(xx, yy, ww, hh, src){
			this.initX = this.x = xx;
			this.intiY = this.y = yy;
			this.w = ww;
			this.h = hh;
			
			if(typeof(src) !== "undefined"){
				img = new Image();
				img.onload = function(){ready = true;}
				img.src = src;
			}
		},
		
		updatePos: function(){
			if(this.y < FULLH - game.padFloor - this.h)
				this.y += this.vY;
			else
				this.y = FULLH -game.padFloor - this.h;
		},
		
		draw: function(){
			if(ready){
				ctx.drawImage(img, this.x, this.y);
			}
			else {
				ctx.fillStyle = "red";
				ctx.fillRect(this.x, this.y, this.w, this.h);
			}
		}
	};
}
window.GameItem = function(){
	
	var parentDraw = null;
	
	function _draw(){
		return function(){
			if(this.visible && !this.collected){
				parentDraw.apply(this);
			}
			
		}
	}
	
	
	return {
		collected: false,
		holding: false,
		visible: true,
		val: -1,
		
		
		init: function(g, v, vis){
			$.extend(this, g);
			
			this.val = v;
			
			if(typeof(vis) !== "undefined")
				this.visible = vis;
			
			parentDraw = this.draw;
			this.draw = _draw();	
		}
		
	};
}

Enemy = function(){
	var parentDraw = null,
		initHealth = 0
	
	function drawHealth(that){
							
		var healthLen = (that.w / initHealth)* that.health
							
		ctx.fillStyle = 'red'
		ctx.fillRect(that.x, that.y - 12, healthLen, 4)
	}
	
	function _draw(){
		return function(){
			if(this.health > 0){
				drawHealth(this)
				parentDraw.apply(this)
			}
			
		}
	}
	
	return {
		active: false,
		health: 0,
		
		init: function(g, ht){
			$.extend(this, g)
			this.health = initHealth = ht

			parentDraw = this.draw
			this.draw = _draw()	
		},
		
		update: function(){
			if(this.active && game.totalTicks % 3 == 0){
				if(this.x < hero.x)
					++this.x
				else if(this.x > hero.x)
					--this.x 
			}
		}
		
	}
}
startScreen = function(){
	
	var _time = 0,
		copyTitle = "JON'S QUEST",
		copyLine = "© 2013 JON WIEDMANN"
	
	function update(){
		if(13 in keysDown){
			
			++game.lvl
			
			game.sound.bgMusic.start.pause()			
	        game.sound.bgMusic.lvl0.loop = true
	        
	        game.sound.isOn ?
	           	game.sound.bgMusic.lvl0.play():
	           	game.sound.bgMusic.lvl0.pause()
			
			
			game.loop()		// start game
		}
		else {
			requestAnimFrame(startScreen.loop)
		}
	}
	
	function render(){
		ctx.fillStyle = "#000"
		ctx.fillRect(0,0,FULLW, FULLH+game.padHUD)
		
		ctx.font = "36px 'Press Start 2P'"
		
		// title
		ctx.fillStyle = "#222"
		ctx.fillText(copyTitle, HALFW - ctx.measureText(copyTitle).width / 2 + 4, 94)
		
		ctx.fillStyle = "#ff6a00"
		ctx.fillText(copyTitle, HALFW - ctx.measureText(copyTitle).width / 2, 90)
		
		// p enter
		utils.blinkText(25, HALFW, HALFH + 80)
		
		// copy
		ctx.font = "13px 'Press Start 2P'"
		ctx.fillStyle = "#ddd"
		
		ctx.fillText(copyLine, HALFW - ctx.measureText(copyLine).width / 2, FULLH + 44)		
	}
	
	return {
		loop: function(){
			update()
			render()
			
			var now = new Date().getTime()    
            game.dt = now - (_time || now)		// using game.dt avoids modifying utils method
	    	_time = now
			
		}
	}
}()
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
		
	}level = function() {
	
	var shuriken = null,
		cash = null,
		syringe = null,
		medKit = null,
		
		NUM_LEVELS = 5,
		lvl = new Array(NUM_LEVELS),
		recentLvlUpdate = 0,
		lvlBgImg = {}
	
	function drawHUD(){	// TODO: break out static parts
		// background
		ctx.fillStyle = "#070707"
		ctx.fillRect(0, FULLH, FULLW, game.padHUD)
		
        ctx.fillStyle = "#ddd"
        ctx.font = "12px 'Press Start 2P'"
        	
        	
    	ctx.fillText("HP-" + hero.healthLvl, 15, FULLH + 24)
    	ctx.fillText("MP-" + hero.manaLvl, 15, FULLH + 48)
    	ctx.fillText("XP", 15, FULLH + 71)
    	
		// hp kit
    	ctx.fillText(hero.medKits, 210, FULLH + 50)
    	medKit.draw()
    	
		// mp kit
		ctx.fillText(hero.manaKits, 315, FULLH + 50)
		syringe.draw()
    	
		// ammo
    	ctx.fillText(hero.ammo, 410, FULLH + 50)
    	shuriken.draw()
		
		// money
		ctx.fillText(hero.cash, 515, FULLH + 50)
		cash.draw()
		
		// time
		var min = Math.floor(game.actualTime / 60),
			sec = game.actualTime % 60
		
			if(sec < 10)
				sec = '0' + sec
			
			if(min < 10)
				min = '0' + min
		
		ctx.fillText(min + ':' + sec, FULLW - 84, FULLH + 34)
	}
	
	function loadBgImages(imgArr, callback) {
		var count = 0
		
		for (var key in imgArr) {
			if (imgArr[key] != 'none') {
				lvlBgImg[key] = new Image()
				lvlBgImg[key].onload = function() {
					callback(this.num)
				}

				lvlBgImg[key].src = imgArr[key]
				lvlBgImg[key].num = count
			}
			
			++count
		}
	}
		
		
	return {
		collisionPts: {},
		width: 0,
		
		
		init: function(){
			
			medKit = new GameObj()
			medKit.init(238, FULLH + 31, 25, 24, 'img/medKit.png')
			
			syringe = new GameObj()
			syringe.init(342, FULLH + 31, 25, 25, 'img/syringe.png')
			
			shuriken = new GameObj()
			shuriken.init(447, FULLH + 32, 24, 24, 'img/shuriken.png')
			
			cash = new GameObj()
			cash.init(548, FULLH + 33, 22, 24, 'img/cash.png')
			
			
			level.collisionPts = {
				lvl0: {
					obj0: {
						x: 310,
						y: 161,
						w: 200,
						h: 30
					},
					obj1: {
						x: 600,
						y: 95,
						w: 200,
						h: 30
					},
					obj2: {
						x: 562,
						y: 230,
						w: 300,
						h: 30
					}
				}
			}
			
			for(var i=0; i < NUM_LEVELS; i++){
				lvl[i] = {
					status: false,
					bgColor: '#'+Math.floor(Math.random()*16777215).toString(16)
				}
			}
			
			loadBgImages({
				lvl0: 'img/lvl0.jpg',
				lvl1: 'none'
			}, function(num) {
				lvl[num].status = true
			})
			
			level.reset()
			lvl0.init()
		},
		
		reset : function() {
			level.width = 3198
			
			
			hero.x = 23
			hero.y = canvas.height - hero.h
			hero.isJumping = false
	
			hero.bulletArr.length = 0		// TODO: cache num bullets
		},
		
		/******************** Update ********************/
		update: function(){
			
	    	if(game.lvl == 0)
	    		lvl0.update()
			
			var tempLvl = game.lvl + 1
			
			if(tempLvl >= NUM_LEVELS)
				tempLvl = NUM_LEVELS - 1
				
			// if(	){        should reset level
				// ++game.lvl
			    // recentLvlUpdate = 
// 			    
			    // utils.reset()
		    // }
		},
		
		updateObjs: function(){
			if(game.lvl == 0)
				lvl0.updateObjs()
		},
		
		/******************** Render ********************/
		render: function(){
			// background
	    	if(lvl[game.lvl].status){
	    		ctx.drawImage(lvlBgImg['lvl' + game.lvl], hero.lvlX, 0, FULLW, FULLH, 0, 0, FULLW, FULLH)
	    	}
	    	else{
	    		if(lvl[game.lvl].bgColor)
	    			ctx.fillStyle = lvl[game.lvl].bgColor
	    		else
	    			ctx.fillStyle = '#222'
	    			
	    		ctx.fillRect(0, 0, FULLW, FULLH)
	    	}
	    	
	    	drawHUD()
	    	
	    	if(game.lvl == 0)
	    		lvl0.render()
		},
		
		drawAfterHero: function(){
			if(game.lvl == 0){
				if(lvl0.crate.holding)
					lvl0.crate.draw()
				
			}
		}
		
	}
}()
lvl0 = function() {

	var cyborg = null,
		hiddenCash = null,
		sack = null,
		belt = null
		

	return {

		init: function() {
			var sack_g = GameObj()
			sack_g.init(680, 71, 20, 24, 'img/sack.png')
				sack = GameItem()
				sack.init(sack_g, 5)

			var cyborg_g = GameObj()
			cyborg_g.init(2100, FULLH - game.padFloor - 38 + 3, 28, 38, 'img/cyborgBnW.png')
				cyborg = Enemy()
				cyborg.init(cyborg_g, 5)

			var hCash_g = GameObj()
			hCash_g.init(140, 50, 22, 24, 'img/cash.png')
				hiddenCash = GameItem()
				hiddenCash.init(hCash_g, 10, false)

			var crate_g = GameObj()
			crate_g.init(400, FULLH - game.padFloor - 26, 24, 26, 'img/crate.png')				lvl0.crate = GameItem()
				lvl0.crate.init(crate_g)
				
			belt = GameObj()
			belt.init(1300, 80, 340, 190, 'img/belt.png')
		},

		update: function() {

			hiddenCash.updatePos()
			cyborg.update()

			// sack
			if (!sack.collected) {
				if (utils.isCollision(hero, sack, 0)) {
					sack.collected = true

					hero.ammo += sack.val
					//util.drawValPopup(hero.ammo, 'ammo')
				}
			}

			// hidden cash
			if (!hiddenCash.visible) {
				for (var i = 0; i < hero.bulletArr.length; ++i) {
					if (utils.isCollision(hero.bulletArr[i], hiddenCash, -17)) {
						hiddenCash.visible = true
						hiddenCash.vY = 3
					}
				}
			} 
			else if (!hiddenCash.collected) {
				if (utils.isCollision(hero, hiddenCash, 0)) {
					hiddenCash.collected = true
					hero.cash += hiddenCash.val
				}
			}

			// crate
			if (!lvl0.crate.holding) {
				if (utils.isCollision(hero, lvl0.crate, 12)) {
					hero.isCarrying = true
					lvl0.crate.holding = true
					lvl0.crate.vY = 6.5
				}
			} 
			else {
				if(hero.dirR)				
					lvl0.crate.x = hero.x + 22
				else
					lvl0.crate.x = hero.x - 22
					
				lvl0.crate.y = hero.y
			}
			lvl0.crate.updatePos()
			

			
			if (cyborg.health > 0){
				// hero and cyborg
				if(utils.isCollision(hero, cyborg, 0)) {
					cyborg.active = true
					
					if(!hero.invincible){
						utils.playSound(game.sound.thud, true)
						
						hero.invincible = true
						--hero.health
					}
				}
				
				// bullets and cyborg
			    for(var i=0; i < hero.bulletArr.length; i++){
			    	
		            var wasCollision = false
		                
						if(utils.isCollision(hero.bulletArr[i], cyborg, 0)){
							wasCollision = true
							utils.playSound(game.sound.thud, true)
						}
		                
		            if(wasCollision){
		            	cyborg.active = true
		            	
		            	hero.bulletArr.splice(i, 1) // remove ith item
		            	--cyborg.health
		            	
		            	if(cyborg.health <= 0) {
		            		utils.playSound(game.sound.death, false)
		            		
		            		hero.xp += 2
		            	}
		            }
			    }
			}

		},

		updateObjs: function() {
			sack.x -= hero.vX
			cyborg.x -= hero.vX
			hiddenCash.x -= hero.vX
			belt.x -= hero.vX
			lvl0.crate.x -= hero.vX
		},

		render: function() {

			if (!sack.collected)
				sack.draw()

			hiddenCash.draw()
			cyborg.draw()
			belt.draw()
			
			if(!lvl0.crate.holding){
				lvl0.crate.draw()
			}
			else {
				if(hero.vX == 0){
					lvl0.crate.x += hero.dirR ? -20 : 24
					lvl0.crate.y += 6
				}
			}
		}
	}

}()
game = function(){
	var	avgFPS = 0,
		_time,
		fpsHistory = [0]
	
	function update(){
		hero.update()
		level.update()
	}
	
	function render(){
		level.render()
		hero.render()
		
		level.drawAfterHero()
	}
	
   	function drawFPS(num){
	    //ctx.fillStyle = "rgba(23,23,23, 0.7)"
	    //ctx.fillRect((FULLW - 37), FULLH + game.padHUD - 1, 35, 14)
	    
        ctx.fillStyle = "#ddd"
        ctx.font = "12px 'Press Start 2P'"
        
    	if(num != 'Infinity')
        	fpsHistory.push(num)
        	
        if(game.totalTicks % 20 == 0){
        	var tot = 0
        	for(var i in fpsHistory){
        		tot += fpsHistory[i]
        	}
        	
        	avgFPS = Math.floor(tot / fpsHistory.length)
        	fpsHistory = []
        }
    	
	  	ctx.fillText(avgFPS + " FPS", FULLW - 84, FULLH + 65);
	}
	
	function doTimers(now){
		// dt and fps
        game.dt = now - (_time || now)
    	_time = now
		    	
		drawFPS(Math.round(1000 / game.dt))
		
		// ticks
		++game.totalTicks
		
		if(game.totalTicks % 60 == 0)
			++game.actualTime
	}
	
	
	return {
		gravity: 1,
		friction: 0.4,
		padBot: 119,	/* total padding */
		padHUD: 80,
		padFloor: 39,
		lvl: -1,
		dt: 0,
		fps: 60,
		totalTicks: 0,
		actualTime: 0,
		sound: {
		    bgMusic: {
		         start: new Audio('audio/firstChiptune/firstChiptune.mp3'),
		         lvl0: new Audio('audio/inspiredBySparkMan/sparkBoy.mp3')
		    },
		    gun: new Audio('audio/raygun.mp3'),
		    thud: new Audio('audio/thud.mp3'),
		    step: new Audio('audio/step.mp3'),
		    jump: new Audio('audio/jump.mp3'),
		    death: new Audio('audio/DiscsOfTron_Cascade.mp3'),
		    isOn: false
		},
		
		loop: function(frameTime){
			//setTimeout(function(){
				checkInput()
				
				update()
				render()
				
				doTimers(frameTime)
				
				requestAnimFrame(game.loop)
			//}, 1000 / game.fps)
		}
	}
}()


window.requestAnimFrame = function() {
	return window.requestAnimationFrame || 
		   window.webkitRequestAnimationFrame || 
		   window.mozRequestAnimationFrame || 
		   window.oRequestAnimationFrame ||
		   
		   function(callback) {
		       setTimeout(callback, 1000 / game.fps)
	}
}()
hero = function(){
	var imgReady = false,
		img = null,
		showStep = true,
		gameOver = false
	
		
	/*********************** Update ***********************/
	
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
                
    		/* this is not working quickly enough!!!!!
			for(var j in level.collisionPts[lvl]){
				k = level.collisionPts[lvl][j]
										 if(utils.isCollision(hero.bulletArr[i], k, 0)){
					wasCollision = true
				}
			}*/
			
                
            if(wasCollision || hero.bulletArr[i].x > canvas.width || hero.bulletArr[i].x < 0)		// bullet and screen
            	hero.bulletArr.splice(i, 1) // remove ith item
	    }
	}
		
	function checkCollision(){
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
			hero.offObj()
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
			
			
			if(hero.isCarrying && hero.vX == 0 && hero.dir == Dir.NONE){
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
	
	function drawBullets(){
		for(var i=0; i < hero.bulletArr.length; ++i){
    	    var dirOffset = 0 
	    	    
            if(hero.bulletArr[i].dirR)
                dirOffset = hero.w / 2
	            
            ctx.fillStyle = bullet.color
            utils.drawEllipse(hero.bulletArr[i].x + dirOffset, hero.bulletArr[i].y + 4.5, bullet.w, bullet.h)
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
			img = new Image()
			
			img.onload = function() {imgReady = true}
			img.src = 'img/player.png';
			
		},
		
		offObj: function(){
			hero.onObj = false
			hero.onObjX = -1
			hero.onObjY = -1
		},
		
		update: function(){
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
load = function(){
	function setupMeta(){
		canvas = $('canvas')[0]
		ctx = canvas.getContext('2d')
		FULLW = canvas.width = 720
		FULLH = canvas.height = 440
		
		FULLH -= game.padHUD
		
		HALFW = FULLW / 2
		HALFH = FULLH / 2
		
		game.sound.bgMusic.start.loop = true
		game.sound.bgMusic.start.pause()
		
        utils.muteSound(true)
        
        $('.audioState').on('click', function(){
			utils.muteHelper()
        })
        
        //----- for testing audio -----
        //utils.muteHelper()
        
		// loading screen
		ctx.fillStyle = "#e1e1e1"
		ctx.font = "25px Helvetica"
		ctx.fillText('Loading...', 150, canvas.height/2)
		
		setupInput()
	}
	
	function setupInput(){
		// global key input
		keysDown = {}
		
		addEventListener('keydown', function (e) {
		    if(e.keyCode == 32)
		    	e.preventDefault() 		// space bar scrolling to bottom of page
		    else if(e.keyCode == 77)	// 'm' => mute/unmute
		    	utils.muteHelper()
		    	
		    	
		    keysDown[e.keyCode] = true
		}, false)
		
		addEventListener('keyup', function (e) {delete keysDown[e.keyCode]}, false)
	}
	
	return {
		
		/*
			REQUIRES: game and hero singleton objects already instantiated
		*/
		init: function(){
			setupMeta()
			
			level.init()
			hero.init()
			
	    	startScreen.loop()
	    	//game.loop()
		}
	}
}()


$(function(){
	load.init()		// pre-load game
})
