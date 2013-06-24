var level = {
	setup: function(){
		// levels
		recentLvlUpdate = 0;
		NUM_LEVELS = 5;
		lvlBgImg = {};
		lvl = new Array(NUM_LEVELS);
		
		lvlBg = {
			lvl0: '../img/jonsQuest/big_lvl0.jpg',//'../img/jonsQuest/platforms.png',
			lvl1: 'none',
		    lvl2: '../img/jonsQuest/lvl2.jpg',
		    lvl3: '../img/jonsQuest/lvl3.jpg',
		    lvl4: '../img/jonsQuest/lvl4.png'
		};
		
		lvlCollisionPts = {
			/*
			lvl0: {	
							obj0: {
								x: 112,
								y: 119,	
								w: 62,
								h: 61
							},
							obj1: {
								x: 348, 
								y: 95,
								w: 217, 
								h: 21
							}
						},*/
			lvl0: {
				obj0: {
					x: 694,
					y: 308,
					w: 971,
					h: 52
				}
			},
			lvl3: {
				obj0: {
					x: 0,	
					y: 125,
					w: 245,
					h: 55
				},
				obj1: {
					x: 313,	
					y: 125,
					w: 218,	
					h: 55
				},
				obj2: {
					x: 559,
					y: 79,
					w: 71,
					h: 27
				},
				obj3: {
					x: 678,	
					y: 125,
					w: 36,	
					h: 55
				}
				
			}
		};
		
		for(var i=0; i < NUM_LEVELS; i++){
			lvl[i] = {
				monsters: i*2,
				status: false,
				bgColor: '#'+Math.floor(Math.random()*16777215).toString(16)
			}
		}
		
		utils.loadImages(lvlBg, function(num) {
			lvl[num].status = true;		
		});
	},
	
	/******************** Update ********************/
	update: function(){
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
    		//ctx.drawImage(lvlBgImg['lvl' + game.lvl], 0, 0);
    		ctx.drawImage(lvlBgImg['lvl' + game.lvl], hero.lvlX, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
    	}
    	else{
    		if(lvl[game.lvl].bgColor)
    			ctx.fillStyle = lvl[game.lvl].bgColor;
    		else
    			ctx.fillStyle = '#222';
    			
    		ctx.fillRect(0, 0, canvas.width, canvas.height);
    	}
	}
};
