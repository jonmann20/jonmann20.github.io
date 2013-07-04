Enemy = function(){
	
	
	return {
		active: false,
		
		init: function(g){
			$.extend(this, g)
			

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
