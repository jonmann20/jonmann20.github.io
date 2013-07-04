lvl0 = function(){
	
	var cyborg = null,
		hiddenCash = null,
		sack = null,
		belt = null
	
	return {
		
		init: function(){
			var sack_g = new GameObj()
			sack_g.init(680, 71, 20, 24, 'img/sack.png')
			
			sack = new GameItem()
			sack.init(sack_g, 5)
			
			
			var cyborg_g = new GameObj()
			cyborg_g.init(2100, FULLH - game.padHUD + 3, 28, 38, 'img/cyborgBnW.png')
			
			cyborg = new Enemy()
			cyborg.init(cyborg_g)
			
			
			var hCash_g = new GameObj()
			hCash_g.init(140, 50, 22, 24, 'img/cash.png')
			
			hiddenCash = new GameItem()
			hiddenCash.init(hCash_g, 10, false)
			
			
			belt = new GameObj()
			belt.init(1300, 80, 340, 190, 'img/belt.png')

		},
		
		update: function(){
			
			hiddenCash.updatePos()
			cyborg.update()
			
			// sack
			if(!sack.collected){
				if(utils.isCollision(hero, sack, 0)){
					sack.collected = true
					
					hero.ammo += sack.val
					//util.drawValPopup(hero.ammo, 'ammo')
				}
			}
			
			
			// hidden cash
			if(!hiddenCash.visible){
				for(var i=0; i < hero.bulletArr.length; ++i){
					if(utils.isCollision(hero.bulletArr[i], hiddenCash, -17)){
						hiddenCash.visible = true
						hiddenCash.vY = 3
					}
				}
			}
			else if(!hiddenCash.collected){
				if(utils.isCollision(hero, hiddenCash, 0)){
					hiddenCash.collected = true	
					hero.cash += hiddenCash.val
				}
			}
			
			// cyborg
			if(utils.isCollision(hero, cyborg, 0)){
				cyborg.active = true
			}
			
			
			
		},
		
		updateObjs: function(){
			sack.x -= hero.vX
			cyborg.x -= hero.vX
			hiddenCash.x -= hero.vX
			belt.x -= hero.vX
		},
		
		render: function(){
			
			if(!sack.collected)
				sack.draw()
				
			hiddenCash.draw()
			cyborg.draw()
			belt.draw()
		}
	}
	
}()