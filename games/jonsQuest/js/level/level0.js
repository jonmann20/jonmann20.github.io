lvl0 = function(){
	
	var cyborg = null
	
	return {
		sack: null,
		
		init: function(){
			var sack_g = new GameObj()
			sack_g.init(680, 71, 20, 24, 'img/sack.png')
			
			this.sack = new Sack()
			this.sack.init(sack_g, 5)
			
			
			var cyborg_g = new GameObj()
			cyborg_g.init(600, FULLH - game.padHUD + 3, 28, 38, 'img/cyborgBnW.png')
			
			cyborg = new Enemy()
			cyborg.init(cyborg_g)
			//monster.init()
			
		},
		
		update: function(){
			
			// sack
			if(!this.sack.collected){
				if(utils.isCollision(hero, this.sack, 0)){
					this.sack.collected = true
					
					hero.ammo += this.sack.val
					//util.drawValPopup(hero.ammo, 'ammo')
				}
			}
			
			
			// cyborg
			if(utils.isCollision(hero, cyborg, 0)){
				console.log('hit')
			}
			
			
			
			
			
		},
		
		updateObjs: function(){
			lvl0.sack.x -= hero.vX
			//monster.x -= hero.vX
			cyborg.x -= hero.vX
		},
		
		render: function(){
			
			if(!this.sack.collected)
				this.sack.draw()
				
			cyborg.draw()
		}
	}
	
}()