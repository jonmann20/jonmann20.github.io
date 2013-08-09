Enemy = function(){
	var parentDraw = null,
		initHealth = 0
	
	function drawHealth(that){
							
		var healthLen = (that.w / initHealth)* that.health
							
		ctx.fillStyle = 'red'
		ctx.fillRect(that.x, that.y - 12, healthLen, 4)
	}
	
	function _draw(){
		return function(){
			if(this.health > 0){
				
				drawHealth(this)
				
				parentDraw.apply(this)
			}
			
		}
	}
	
	return {
		active: false,
		health: 0,
		
		init: function(g, ht){
			$.extend(this, g)
			this.health = initHealth = ht

			this.x = 240
			parentDraw = this.draw
			this.draw = _draw()	
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
