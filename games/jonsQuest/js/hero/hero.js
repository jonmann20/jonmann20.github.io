/*
    The hero singleton object.
*/
var hero = (function () {
    var self = this,
        input = null,           // the hero input component
        physics = null,         // the hero physics component
        graphics = null,        // the hero graphics component

        imgReady = false,
		img = null,
		showRun = true,
		gameOver = false,
		spriteArr = []
	;
	
		
	/*********************** Update ***********************/
    function checkHealth() {
        if (hero.invincible)
            --hero.invincibleTimer;

        if (hero.invincibleTimer <= 0) {
            hero.invincible = false;
            hero.invincibleTimer = hero.initInvincibleTimer;
        }

        if (hero.health <= 0 && !gameOver) {
            audio.heroDeath.play();
            audio.bgMusic.muted = true;

            alert("You died");
            location.reload();
            gameOver = true;
        }
    }

	function getSpritePos(){
		if(game.totalTicks % 12 === 0)
			showRun = !showRun;
			
		var pos = {x: 0, y: 0};
		
		if(hero.isCarrying && hero.vX === 0 && hero.dir == Dir.NONE){
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
				inv === 0 ||
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
		
		
	return {
	    protectedInfo: {
            //...
	    },
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
			img.onload = function () { imgReady = true; };
			img.src = "../dungeon/img/sprites/player/player.png";
			
			// grab texturePacker's sprite coords
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
			
			input = HeroInputComponent();
			    input.init();
			physics = HeroPhysicsComponent();
			graphics = HeroGraphicsComponent();
			    graphics.init();
		},
		
		offObj: function(){
			hero.onObj = false;
			hero.onObjX = -1;
			hero.onObjY = -1;
		},
		
		update: function () {
		    input.check();
			physics.updatePosition();
			physics.checkCollision();
			
			checkHealth();
			getSpritePos();
		},
	
		render: function(){
			drawHero();
	    	graphics.drawBullets();
	    	
			graphics.drawHealth();
			graphics.drawMana();
			graphics.drawXP();
		}
	};
})();
