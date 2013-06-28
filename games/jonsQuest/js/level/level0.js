lvl0 = function(){
	
	//var s = null
	
	return {
		sack: null,
		
		init: function(){
			var g = new GameObject()
			g.init(700, 75, 20, 20)
			
			this.sack = new Sack();
			this.sack.init(g);
		},
		
		update: function(){
			// fix positioning
			
			//console.log(s.x + '--- ' + hero.x + ',' + hero.lvlX)
			
			//s.x -= hero.lvlX
			
			
		},
		
		render: function(){
			this.sack.draw();
		}
	}
	
}()