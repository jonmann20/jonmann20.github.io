level = function() {
	
	var shuriken = null,
		cash = null,
		syringe = null,
		medKit = null
	
	return {
		setup: function(){
			
			medKit = new GameObj()
			medKit.init(238, FULLH + 31, 25, 22, 'img/medKit.png')
			
			syringe = new GameObj()
			syringe.init(342, FULLH + 31, 30, 30, 'img/syringe.png')
			
			shuriken = new GameObj()
			shuriken.init(446, FULLH + 33, 20, 20, 'img/shuriken.png')
			
			cash = new GameObj()
			cash.init(548, FULLH + 33, 21, 18, 'img/cash.png')
			
			
			// levels
			recentLvlUpdate = 0;
			NUM_LEVELS = 5
			lvlBgImg = {}
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
			
			var tempLvl = game.lvl + 1
			
			if(tempLvl >= NUM_LEVELS)
				tempLvl = NUM_LEVELS - 1
				
			if(lvl[tempLvl].monsters != 0 && 
				monster.numCaught != recentLvlUpdate &&
				monster.numCaught == lvl[tempLvl].monsters
			){
				++game.lvl
			    recentLvlUpdate = monster.numCaught
			    
			    --monster.numCaught
				upgrade.points -= 2
			    
			    utils.reset()
		    }
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
	    	
	    	this.drawHUD()
	    	
	    	if(game.lvl == 0)
	    		lvl0.render()
	    	
		},
		
		drawHUD: function(){
			// background
			ctx.fillStyle = "#070707"
			ctx.fillRect(0, FULLH, FULLW, game.padHUD)
			
	        ctx.fillStyle = "#ddd"
	        ctx.font = "12px 'Press Start 2P'"
	        	
	    	// hp
	    	ctx.fillText("HP: |---|", 15, FULLH + 33)
			
			// hp kit
	    	ctx.fillText("0", 210, FULLH + 50)
	    	medKit.draw()
	    	
			// mp
	    	ctx.fillText("MP: |---|", 15, FULLH + 63)
			
			// mp kit
			ctx.fillText("0", 315, FULLH + 50)
			syringe.draw()
	    	
			// ammo
	    	ctx.fillText(hero.ammo, 420, FULLH + 50)
	    	shuriken.draw()
			
			// money
			ctx.fillText("0", 525, FULLH + 50)
			cash.draw()
			
			// level name
			
			// time
			var sec = Math.floor(game.totalTime / 60),
				min = Math.floor(sec / 60)
				
				if(sec < 10)
					sec = '0' + sec
				
				if(min < 10)
					min = '0' + min
			
			ctx.fillText(min + ':' + sec, FULLW - 85, FULLH + 35)
		}
	}
}()
