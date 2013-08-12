Enemy = function(){
	var parentDraw = null,
		initHealth = 0,
		alive = true,
		deadOnScreen = false,
		clearDir = true;		// true = right; false = left;
	
	function drawHealth(that){
		var healthLen = (that.w / initHealth)* that.health;
							
		ctx.fillStyle = "red";
		ctx.fillRect(that.x, that.y - 12, healthLen, 4);
	}
	
	function _draw(){
		return function(){
			
			if(alive || deadOnScreen){
				if(initHealth > 1)
					drawHealth(this);


				ctx.save();
				if(deadOnScreen)
					ctx.globalAlpha = 0.3;
				
				
				parentDraw.apply(this);
				
				ctx.restore();
				
			}
		}
	}
	
	return {
		active: false,
		health: 0,
		
		init: function(g, ht){
			$.extend(this, g);
			this.health = initHealth = ht;

			parentDraw = this.draw;
			this.draw = _draw();
		},
		
		update: function(){
			if(deadOnScreen){
				this.x += clearDir ? 2 : -2;
				this.y -= 14;
				
				if(this.x < 0 || this.x > FULLW)
					deadOnScreen = false;
			}
			else if(!alive)
				return;
			else if(this.active && game.totalTicks % 3 == 0){
				if(this.x < hero.x)
					++this.x;
				else if(this.x > hero.x)
					--this.x ;
			}
			
		},
		
		death: function(){
			clearDir = hero.dirR;
			
			utils.playSound(game.sound.death, false);
    		hero.xp += 2;
    		alive = false;
    		deadOnScreen = true;
		}
		
	}
}
