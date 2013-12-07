/// <reference path="../linker.js" />

/*
    The hero object.
*/
var hero = (function () {
    var input = null,           // the hero input component
        graphics = null,        // the hero graphics component
        imgReady = false,       
		img = null,             // TODO: convert to be of GameObj type
        idleTime = 0,
		showRun = true,
		spriteArr = []
	;
	
		
	/*********************** Update ***********************/
    function checkHealth() {
        if (hero.invincible)
            --hero.invincibleTimer;

        if (hero.invincibleTimer <= 0) {
            hero.invincible = false;
            hero.invincibleTimer = hero.invincibleTimer0;
        }
        
        if (hero.health <= 0 && !game.over) {
            audio.heroDeath.play();
            audio.bgMusic.muted = true;

            alert("You died");
            location.reload();
            game.over = true;
        }
    }

	function getSpritePos(){
	    if (game.totalTicks % 30 === 0) {
	        showRun = !showRun;
	    }

		var pos = {x: 0, y: 0};
		
		if(hero.isCarrying && hero.vX === 0){
			pos = spriteArr["playerDown"];
		}
		else if (hero.onLadder) {               // TODO: check if holding crate (shouldn't be allowed on ladder)
		    pos = spriteArr["playerUp"];
		}
		else if(hero.dir == Dir.RIGHT){
			if(hero.vX > 0){
   				if(Math.abs(hero.vX) <= hero.aX*10)
   					pos = spriteArr["playerRight_Step"];
				else if(showRun){
					pos = spriteArr["playerRight_Run1"];
				}
				else 
					pos = spriteArr["playerRight_Run2"];
			}
			else
				pos = spriteArr["playerRight"];
		}
		else if(hero.dir == Dir.LEFT){ 
			if(hero.vX < 0){
				if(Math.abs(hero.vX) <= hero.aX*10)
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
		
        // idle animation
		if (hero.vX === 0 && hero.vY === 0)
		    ++idleTime;
		else
		    idleTime = 0;

		if (idleTime > 210) {
		    var foo = idleTime % 200;
		    
		    if (foo >= 0 && foo <= 50 || foo > 100 && foo <= 150)
		        pos = spriteArr["playerDown"];
		    else if (foo > 50  && foo <= 100)
		        pos = spriteArr["playerDown_breatheIn"];
		    else if (foo > 150 && foo <= 200)
		        pos = spriteArr["playerDown_breatheOut"];
		}

        // invincible
		var inv = hero.invincibleTimer % 40;
		
		if(hero.invincible && (inv >= 0 && inv <= 16)){
			pos = {x: -1, y: -1};
		}

		
		hero.sx = pos.x;
		hero.sy = pos.y;
	}
	
	/*********************** Render ***********************/
	function drawHero(){
		if(imgReady && hero.sx >= 0 && hero.sy >= 0){
		    ctx.drawImage(img, hero.sx, hero.sy, hero.w, hero.h, hero.pos.x, hero.pos.y, hero.w, hero.h);
    	}
	}
		
    // used to draw things over the hero
	function drawAfterHero() {
	    if (hero.isCarrying){
	        hero.curItem.draw();
	    }
	}
		
	return {
		sx: 0,				// sprite position
		sy: 0,
		lvlX: 0,			
		w: 28,
		h: 38,
		vX: 0,
		vY: 0,
		aX: 0.17,
		aY: 0.5,
		jumpMod: 4,
		jumpMod0: 4,            // TODO: should be const
		dir: Dir.RIGHT,
		isJumping: false,
		isCarrying: false,
        onLadder: false,
        curItem: null,          // the item in hand
		onGround: true,
		isOnObj: true,
		invincible: false,
		invincibleTimer: 240,
		invincibleTimer0: 240,  // TODO: should be const
		health: 4,
		maxHealth: 5,
		medKits: 1,
		healthLvl: 1,
		mana: 0,
		maxMana: 4,
		manaKits: 1,
		manaLvl: 1,
		ammo: 20,
		cash: 0,
		lvl: 1,
		xp: 0,
		xpNeeded: 50,
		bulletArr: [],
		physics: null,         // the hero physics component
		

		init: function(){
			img = new Image();
			img.onload = function () { imgReady = true; };
			img.src = "../dungeon/web/img/sprites/player/player.png";
			
			// grab texturePacker's sprite coords
			$.get("../dungeon/web/img/sprites/player/player.xml", function(xml){
				var wrap = $(xml).find("sprite");
				
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

			hero.physics = HeroPhysicsComponent();

			graphics = HeroGraphicsComponent();
			graphics.init();

            // setup hero bounding box for collision detection
			$.extend(hero, new SAT.Box(new SAT.Vector(0, 0), hero.w, hero.h).toPolygon());
		},
		
		update: function () {
		    input.check();                          // updates velocities
			hero.physics.updatePosition();          // updates positions
			hero.physics.checkCollision();          // fix positions
			
			checkHealth();
			getSpritePos();
		},
	
		render: function(){
			drawHero();
			graphics.drawBullets();
			drawAfterHero();
		}
	};
})();
