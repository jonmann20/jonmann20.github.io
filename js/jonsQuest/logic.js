var update = {
	init:function(){
		this.inputHandler();
		this.bulletHandler();
		this.heroHandler();
		this.monsterHandler();
		this.screenHandler();
		this.collisionHandler();
		this.lvlHandler();
	},
	
	inputHandler:function(){
		if (87 in keysDown) { // Player holding up (w)
			//hero.y -= hero.speed;
		}
		
		if (83 in keysDown) { // Player holding down (s)
			//hero.y += hero.speed;
		}
		
		if (65 in keysDown) { // Player holding left (a)
		    hero.x -= hero.speed;
		    hero.dirL = true;
		    hero.dirR = false;
		    
		    if(hero.x % 2 == 0)
		      game.sound.step.play();
		}
		
		if (68 in keysDown) { // Player holding right (d)
		    hero.x += hero.speed;
		    hero.dirL = false;
		    hero.dirR = true;
		    
		    if(hero.x % 2 == 0)
		      game.sound.step.play();
	    }
	    
	    if (74 in keysDown) { // Player holding shoot (j)
	        
	        if(game.sound.gun.ended)
                game.sound.gun.play();
            else {
                game.sound.gun.pause();
                game.sound.gun.currentTime = 0;
                game.sound.gun.play();
            }
	        
            bulletArr[bulletArr.length] = {
                fired: true,
                x: hero.x,
                y: hero.y,
                dirL: hero.dirL,
                dirR: hero.dirR
            };
	        
	        delete keysDown[74];
		}
		
		if (75 in keysDown) { // Player holding jump (k)
		    
		    if(hero.ground){
		        
		      game.sound.jump.play();
		        
		      hero.jump = true;
		      hero.ground = false;
		      delete keysDown[75];
		    }
		}
	},

	bulletHandler:function(){
	    for(var i=0; i < bulletArr.length; i++){
	        if(bulletArr[i].fired){
                if (bulletArr[i].dirR) {
                    bulletArr[i].x += bullet.speed;
                }  
                else{ // left
                    bulletArr[i].x -= bullet.speed;
                }
	        }
	        
	        if(bulletArr[i].x <= (monster.x + monster.width)
                && monster.x <= (bulletArr[i].x + bullet.width)
                && bulletArr[i].y <= (monster.y + monster.height)
                && monster.y <= (bulletArr[i].y + bullet.height)
            ){
                monster.numCaught++;
                upgrade.points += 2;
                reset();
            }
            else{
                if(bulletArr[i].x >= (canvas.width + game.padding)|| bulletArr[i].x <= (0 - game.padding)){
                    bulletArr.splice(i, 1); // remove 1 item at the ith index
                }
            }
	        
	    }
	},
	
	lvlHandler:function(){
		var tempLvl = game.lvl + 1;
		if(tempLvl >= NUM_LEVELS)
			tempLvl = NUM_LEVELS - 1;
			
		if (lvl[tempLvl].monsters != 0 && monster.numCaught != recentLvlUpdate &&
				monster.numCaught == lvl[tempLvl].monsters) {
			game.lvl++;
		    recentLvlUpdate = monster.numCaught;
		    reset();
	    }
	},
	
	heroHandler:function(){
		if(hero.jump){
			hero.y -= hero.jumpMod;
			hero.jumpMod--;
			
			// not being used yet
			if(hero.jumpMod > 0){
				hero.dirU = true;
				hero.dirD = false;
			}
			else{
				hero.dirU = false;
				hero.dirD = true;
			}
		}
		else {
			hero.jumpMod = hero.jumpPower;
		}
	
		if(hero.y >= (canvas.height - hero.height - game.padding)){
			
			if(hero.jump)
			     game.sound.thud.play();
			
			hero.ground = true;
			hero.jump = false;	
			
		}
		
		switch(hero.collision.status){
			case 'top':
				hero.y = hero.collision.y1 - 1; 
				break;
			case 'right':
                hero.x = hero.collision.x2 + 1; 
                break;
            case 'bot':
                hero.y = hero.collision.y2 + 1;
                hero.collision.y2 += game.gravity;
                hero.jump = false; 
                break;
			case 'left':
				hero.x = hero.collision.x1 - 1; 
				break;
			case 'none':
				hero.y += game.gravity;
				break;
			default:
				console.log('in defualt');
				break;
		}
			
	},
	
	monsterHandler:function(){
		if(monster.down)
			monster.y += monster.movement;
		else	
			monster.y -= monster.movement;

		if(monster.y == (monster.initY + monster.offset))
			monster.down = false;
		else if(monster.y == (monster.initY - monster.offset))
			monster.down = true;
			
			
		if(hoverCraft.x >= 190){
			hoverCraft.dirR = false;
			hoverCraft.dirL = true;
			hoverCraft.x--;
		}	
		else if(hoverCraft.x <= 10){
			hoverCraft.dirR = true;
			hoverCraft.dirL = false;
			hoverCraft.x++;
		}
		else{
			if(hoverCraft.dirR)
				hoverCraft.x++;
			else
				hoverCraft.x--;
		}
		
		if(hoverCraft.x >= 70 && hoverCraft.x <= 100){
			hoverCraft.fire = true;
		}
		
			
		
	},
	
	screenHandler:function(){
		if (hero.y <= game.padding)	// top
		    hero.y = game.padding;
		else if(hero.y >= (canvas.height - hero.height - game.padding)) // bottom
		    hero.y = canvas.height - hero.height - game.padding;
	
		if (hero.x <= game.padding){ // left
		    hero.x = game.padding;
		}
		else if (hero.x >= (canvas.width - hero.width - game.padding)) // right 
		    hero.x = canvas.width - hero.width - game.padding;
	},
	
	collisionHandler:function(){ // bullet collision moved to bulletHandler
		// level objects
		hero.collision.status = 'none';
		var marginOfError = 5;
		var i = 'lvl' + game.lvl;
		
		for(var j in lvlCollisionPts[i]){
			if(hero.x >= lvlCollisionPts[i][j].x1 &&	
			   hero.x <= lvlCollisionPts[i][j].x2 && 
			   hero.y >= lvlCollisionPts[i][j].y1 - marginOfError && 
			   hero.y <= lvlCollisionPts[i][j].y2 + marginOfError - lvlCollisionPts[i][j].h 
			){
				hero.collision.status = 'top';
				hero.collision.y1 = lvlCollisionPts[i][j].y1;
			}
			else if(hero.dirL && 
			        hero.y >= lvlCollisionPts[i][j].y1 - marginOfError &&
			        hero.y <= lvlCollisionPts[i][j].y2 - marginOfError &&
					hero.x >= lvlCollisionPts[i][j].x1 &&
			   		hero.x <= lvlCollisionPts[i][j].x2 + marginOfError
			){
				hero.collision.status = 'right'; 
				hero.collision.x2 = lvlCollisionPts[i][j].x2;
			}
			else if(hero.jump &&
			        hero.x >= lvlCollisionPts[i][j].x1 &&    
                    hero.x <= lvlCollisionPts[i][j].x2 && 
                    hero.y >= lvlCollisionPts[i][j].y1 - marginOfError && 
                    hero.y <= lvlCollisionPts[i][j].y2 + marginOfError + hero.height
            ){
				hero.collision.status = 'bot';  
				hero.collision.y2 = lvlCollisionPts[i][j].y2 + hero.height;
			}
			else if(hero.dirR && 
			        hero.y >= lvlCollisionPts[i][j].y1 - marginOfError &&
			        hero.y <= lvlCollisionPts[i][j].y2 - marginOfError &&
					hero.x >= lvlCollisionPts[i][j].x1 - marginOfError &&
			   		hero.x <= lvlCollisionPts[i][j].x2
			){ 
				hero.collision.status = 'left'; 
				hero.collision.x1 = lvlCollisionPts[i][j].x1;
			}
			
		}
		
		
		// hero/monster
		if (hero.x <= (monster.x + monster.width)
			&& monster.x <= (hero.x + hero.width)
			&& hero.y <= (monster.y + monster.height)
			&& monster.y <= (hero.y + hero.height)
		) {
			monster.numCaught++;
			upgrade.points += 2;
			reset();
	    }    
	}
	
};// end update
