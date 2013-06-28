var level = {
	setup: function(){
		// levels
		recentLvlUpdate = 0;
		NUM_LEVELS = 5;
		lvlBgImg = {};
		lvl = new Array(NUM_LEVELS);
		
		lvlBg = {
			lvl0: 'img/lvl0.jpg',
			lvl1: 'none'
		}
		
		lvlCollisionPts = {
			lvl0: {
				obj0: {
					x: 310,
					y: 160,
					w: 200,
					h: 30
				},
				obj1: {
					x: 600,
					y: 94,
					w: 200,
					h: 30
				},
				obj2: {
					x: 562,
					y: 229,
					w: 300,
					h: 30
				}
			}
		}
		
		for(var i=0; i < NUM_LEVELS; i++){
			lvl[i] = {
				monsters: i*2,
				status: false,
				bgColor: '#'+Math.floor(Math.random()*16777215).toString(16)
			}
		}
		
		utils.loadImages(lvlBg, function(num) {
			lvl[num].status = true
		})
	},
	
	/******************** Update ********************/
	update: function(){
		
    	if(game.lvl == 0)
    		lvl0.update()
		
		var tempLvl = game.lvl + 1;
		
		if(tempLvl >= NUM_LEVELS)
			tempLvl = NUM_LEVELS - 1;
			
		if(lvl[tempLvl].monsters != 0 && 
			monster.numCaught != recentLvlUpdate &&
			monster.numCaught == lvl[tempLvl].monsters
		){
			++game.lvl;
		    recentLvlUpdate = monster.numCaught;
		    
		    --monster.numCaught;
			upgrade.points -= 2;
		    
		    utils.reset();
	    }
	},
	
	/******************** Render ********************/
	render: function(){
		// background
    	if(lvl[game.lvl].status){
    		ctx.drawImage(lvlBgImg['lvl' + game.lvl], hero.lvlX, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
    	}
    	else{
    		if(lvl[game.lvl].bgColor)
    			ctx.fillStyle = lvl[game.lvl].bgColor;
    		else
    			ctx.fillStyle = '#222';
    			
    		ctx.fillRect(0, 0, canvas.width, canvas.height);
    	}
    	
    	if(game.lvl == 0)
    		lvl0.render()
    	
	}
};
