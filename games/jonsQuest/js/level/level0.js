lvl0 = function(){
	
	return {
		sack: null,
		
		init: function(){
			var g = new GameObj()
			g.init(680, 71, 20, 24, 'img/sack.png')
			
			this.sack = new Sack();
			this.sack.init(g, 5);
		},
		
		update: function(){
			
			if(!this.sack.collected){
			
				if(utils.isCollision(hero, this.sack, 0)){
					this.sack.collected = true
					
					hero.ammo += this.sack.val
					//util.drawValPopup(hero.ammo, 'ammo')
				}
			}
			
			
		},
		
		render: function(){
			
			if(!this.sack.collected)
				this.sack.draw();
		}
	}
	
}()